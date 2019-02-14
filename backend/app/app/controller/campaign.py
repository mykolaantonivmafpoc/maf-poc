from .. import app, spec, basic_auth # NOQA
from .. import db, func, url_for, jsonify, request
from ..model import kpi_list, create_frame # NOQA
from ..model import CampaignType # NOQA
from ..model import Campaign
from ..model import Product
from ..model import Supplier
from ..model import Department
from ..model import Section
from ..model import FamilyCategory
from ..model import SubFamilyCategory
from ..model import PromoMechanic # NOQA
from ..model import KpiFact


@app.route('/v1/Campaign', methods=['GET'])
@basic_auth.required
def listCampaign():
    """Campaign dimmension.
    ---
    get:
        summary: Foo-Bar endpoint.
        description: Get all avaialble campaigns.
        responses:
            200:
                description: Returns list of all campaigns.
    """
    frame = create_frame() # NOQA

    frame['meta']['type'] = 'Campaign'

    ml = Campaign.query.all()
    content = [
        {
            'id': x.id,
            'name': x.name,
            'description': x.description,
            'date_from': x.date_from,
            'date_to': x.date_to,
            'campaign_type': x.campaign_type.name,
            'kpis': {
                j: (
                    float(getattr(y, j))
                    if getattr(y, j) is not None
                    else 0
                )
                for j in kpi_list for y in db.session.query(
                    func.sum(getattr(KpiFact, j)).label(j)
                ).filter_by(campaign_id=x.id)
            },
            '_links': {
                'self': url_for('listCampaignItem', id=x.id),
                'collection': url_for('listCampaign')
            }
        } for x in ml
    ]

    for x in content:
        kpis = x['kpis']
        del x['kpis']
        elem = {**x, **kpis} # NOQA
        frame['content'].append(elem)

    frame['_links'] = {
        'self': url_for('listCampaign')
    }

    return jsonify(frame)


@app.route('/v1/Campaign/<int:id>', methods=['GET'])
@basic_auth.required
def listCampaignItem(id):
    """Campaign single item.
    ---
    get:
        summary: Foo-Bar endpoint.
        description: Get a single foo with the bar ID.
        parameters:
            - name: id
              in: path
              description: id of the campaign, displayed from the listing
              type: integer
              required: true
        responses:
            200:
                description: single campaignCollection to be returned.
    """
    frame = create_frame() # NOQA
    args = {
        'id': id
    }

    argsFilter = []

    filter_kpi_ids = {
        'department': 'department_id',
        'family_category': 'family_category_id',
        'sub_family_category': 'sub_family_category_id',
        'section': 'section_id',
        'date_from': 'date_from',
        'date_to': 'date_from',
    }

    date_from = request.args.get('date_from', default=False)
    date_to = request.args.get('date_to', default=False)

    if False is not date_from and False is not date_to:
        argsFilter.append(KpiFact.timestamp.between(date_from, date_to))

    for k, v in filter_kpi_ids.items():
        data = request.args.getlist(k)
        if data:
            argsFilter.append(getattr(KpiFact, v).in_(tuple(map(int, data))))

    ml = Campaign.query.filter_by(**args).first()

    frame['meta']['type'] = 'Campaign'
    frame['meta']['filter'] = []
    frame['meta']['campaign_type'] = ml.campaign_type.name
    frame['meta']['id'] = ml.id
    frame['meta']['name'] = ml.name
    frame['meta']['description'] = ml.description
    frame['meta']['date_from'] = ml.date_from
    frame['meta']['date_to'] = ml.date_to

    columns = [
        KpiFact.product_id.label('product_id'),
        Product.name.label('product_name'),
        Product.supplier_id.label('supplier_id'),
        Supplier.name.label('supplier_name'),
        KpiFact.department_id.label('department_id'),
        Department.name.label('department_name'),
        KpiFact.section_id.label('section_id'),
        Section.name.label('section_name'),
        KpiFact.family_category_id.label('family_category_id'),
        FamilyCategory.name.label('family_category_name'),
        KpiFact.sub_family_category_id.label('sub_family_category_id'),
        SubFamilyCategory.name.label('sub_family_category_name'),
        KpiFact.timestamp.label('timestamp')
    ]

    aggregates = [
        func.sum(getattr(KpiFact, j)).label(j) for j in kpi_list
    ]

    query_args = columns + aggregates

    if hasattr(ml, 'kpi_fact'):
        frame['content'] = [
            {
                'product_id': x.product_id,
                'product_name': x.product_name,
                'supplier_id': x.supplier_id,
                'supplier_name': x.supplier_name,
                'department_id': x.department_id,
                'department_name': x.department_name,
                'section_id': x.section_id,
                'section_name': x.section_name,
                'family_category_id': x.family_category_id,
                'family_category_name': x.family_category_name,
                'sub_family_category_id': x.sub_family_category_id,
                'sub_family_category_name': x.sub_family_category_name,
                'incr_sales': float(x.incr_sales),
                'incr_sales_per': float(x.incr_sales_per),
                'incr_margin': float(x.incr_margin),
                'incr_traffic': float(x.incr_traffic),
                'incr_basket': float(x.incr_basket),
                'incr_tse': float(x.incr_tse),
                'ipromo_depth': float(x.ipromo_depth),
                'total_sales': float(x.total_sales),
                'volume_sold': float(x.volume_sold),
                'promo_price': float(x.promo_price),
                'slash_price': float(x.slash_price),
                'cost_price': float(x.cost_price),
                'incr_traffic_per': float(x.incr_traffic_per),
                'incr_basket_per': float(x.incr_basket_per),
                'incr_tse_per': float(x.incr_tse_per),
                'timestamp': x.timestamp
                # '_links': {}
            } for x in db.session.query(
                *query_args
            )
            .join(Product, Product.id == KpiFact.product_id)
            .join(Supplier, Supplier.id == Product.supplier_id)
            .join(Department, Department.id == KpiFact.department_id)
            .join(Section, Section.id == KpiFact.section_id)
            .join(FamilyCategory,
                  FamilyCategory.id == KpiFact.family_category_id)
            .join(SubFamilyCategory,
                  SubFamilyCategory.id == KpiFact.sub_family_category_id)
            .filter(*argsFilter)
            .group_by(KpiFact.product_id).all()
        ]

        meta_options = [
            # 'campaign',
            # 'product',
            # 'supplier',
            'department',
            'section',
            'family_category',
            'sub_family_category',
            'timestamp',
            # 'promo_mechanic',
            # 'campaign_kpi_metric'
        ]

        frame['meta']['kpi_options'] = {}

        frame['meta']['kpi'] = {
            j: (
                float(getattr(y, j)) if getattr(y, j) is not None else 0
            )
            for j in kpi_list
            for y in db.session.query(
                func.sum(getattr(KpiFact, j)).label(j)
            ).filter_by(campaign_id=id)
        }

        for i in meta_options:
            if i not in frame['meta']['kpi_options']:
                if 'timestamp' == i:
                    frame['meta']['kpi_options'][i] = []
                else:
                    frame['meta']['kpi_options'][i] = {}

            for x in frame['content']:
                if 'timestamp' == i:
                    if x[i] not in frame['meta']['kpi_options'][i]:
                        frame['meta']['kpi_options'][i].append(x[i])
                    continue

                if x[i + '_id'] not in frame['meta']['kpi_options'][i]:
                    frame['meta']['kpi_options'][i][x[i + '_id']] = {
                        "id": x[i + '_id'],
                        "name": x[i + '_name'],
                    }

    frame['_links'] = {
        'self': url_for('listCampaignItem', **args),
        'collection': url_for('listCampaign')
    }

    return jsonify(frame)


with app.test_request_context():
    spec.path(view=listCampaign)
    spec.path(view=listCampaignItem)
