from .. import app, spec, basic_auth # NOQA
from .. import db, func, url_for, jsonify, request # NOQA
from ..model import kpi_list, buildMetaOptionsQuery # NOQA
from ..model import create_frame, buildMetaOptions # NOQA
from ..model import buildArgumentFilter # NOQA
from ..model import CampaignType # NOQA
from ..model import Campaign # NOQA
from ..model import Product # NOQA
from ..model import Supplier # NOQA
from ..model import Department # NOQA
from ..model import Section # NOQA
from ..model import FamilyCategory # NOQA
from ..model import SubFamilyCategory # NOQA
from ..model import PromoMechanic # NOQA
from ..model import KpiFact # NOQA


@app.route('/v1/Campaigns', methods=['GET'])
@app.route('/v1/Campaigns/', methods=['GET'])
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

    frame['meta']['type'] = 'Campaigns'
    frame['meta']['kpis'] = kpi_list
    frame['meta']['kpi_options'] = {}
    argsFilter = buildArgumentFilter()

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
                ).filter(*argsFilter + [KpiFact.campaign_id == x.id])
            },
            '_links': {
                'self': url_for('listCampaignItem', id=x.id),
                'collection': url_for('listCampaign')
            }
        } for x in ml
    ]

    frame['meta']['kpi_options'] = buildMetaOptions(
        buildMetaOptionsQuery(
            model=db.session,
            query_args=[],
            argsFilter=argsFilter
        )
    )

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
@app.route('/v1/Campaign/<int:id>/', methods=['GET'])
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

    ml = Campaign.query.filter_by(**args).first()

    frame['meta']['type'] = 'Campaign'
    frame['meta']['filter'] = []
    frame['meta']['campaign_type'] = ml.campaign_type.name
    frame['meta']['id'] = ml.id
    frame['meta']['name'] = ml.name
    frame['meta']['description'] = ml.description
    frame['meta']['date_from'] = ml.date_from
    frame['meta']['date_to'] = ml.date_to

    aggregates = [
        func.sum(getattr(KpiFact, j)).label(j) for j in kpi_list
    ]

    if hasattr(ml, 'kpi_fact'):

        meta_options_query = buildMetaOptionsQuery(
            model=db.session,
            query_args=aggregates,
            argsFilter=buildArgumentFilter()
        )

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
                'incr_sales': str(x.incr_sales),
                'incr_sales_per': str(x.incr_sales_per),
                'incr_margin': str(x.incr_margin),
                'incr_traffic': str(x.incr_traffic),
                'incr_basket': str(x.incr_basket),
                'incr_tse': str(x.incr_tse),
                'ipromo_depth': str(x.ipromo_depth),
                'total_sales': str(x.total_sales),
                'volume_sold': str(x.volume_sold),
                'promo_price': str(x.promo_price),
                'slash_price': str(x.slash_price),
                'cost_price': str(x.cost_price),
                'incr_traffic_per': str(x.incr_traffic_per),
                'incr_basket_per': str(x.incr_basket_per),
                'incr_tse_per': str(x.incr_tse_per),
                # 'timestamp': x.timestamp
                # '_links': {}
            } for x in meta_options_query
        ]

        frame['meta']['kpi'] = {
            j: (
                float(getattr(y, j)) if getattr(y, j) is not None else 0
            )
            for j in kpi_list
            for y in db.session.query(
                func.sum(getattr(KpiFact, j)).label(j)
            ).filter_by(campaign_id=id)
        }

        frame['meta']['kpi_options'] = buildMetaOptions(meta_options_query)

    frame['_links'] = {
        'self': url_for('listCampaignItem', **args),
        'collection': url_for('listCampaign')
    }

    return jsonify(frame)


with app.test_request_context():
    spec.path(view=listCampaign)
    spec.path(view=listCampaignItem)
