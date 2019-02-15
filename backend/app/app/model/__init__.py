from .. import app, basic_auth, db, ma, spec, dt, PrimaryKeyConstraint # NOQA
from marshmallow import fields # NOQA


def create_frame():
    return {
        'meta': {},
        'content': [],
        '_links': {}
    }


kpi_list = [
    'incr_sales',
    'incr_sales_per',
    'incr_margin',
    'incr_traffic',
    'incr_basket',
    'incr_tse',
    'ipromo_depth',
    'total_sales',
    'volume_sold',
    'promo_price',
    'slash_price',
    'cost_price',
    'incr_traffic_per',
    'incr_basket_per',
    'incr_tse_per'
]


class BaseModel():
    __table_args__ = {'schema': 'analytics'}
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    description = db.Column(db.String(128))
    timestamp = db.Column(db.DateTime(timezone=True), default=dt.utcnow)


class CampaignType(BaseModel, db.Model):
    __tablename__ = 'campaign_type'
    campaign = db.relationship(
        'Campaign',
        backref=__tablename__,
        lazy='dynamic'
    )


class Campaign(BaseModel, db.Model):
    __tablename__ = 'campaign'
    campaign_type_id = db.Column(
        db.Integer,
        db.ForeignKey('analytics.campaign_type.id')
    )
    kpi_fact = db.relationship(
        'KpiFact',
        backref=__tablename__,
        lazy='dynamic'
    )
    date_from = db.Column(db.Date)
    date_to = db.Column(db.Date)


class Product(BaseModel, db.Model):
    __tablename__ = 'product'
    supplier_id = db.Column(
        db.Integer,
        db.ForeignKey('analytics.supplier.id')
    )
    kpi_fact = db.relationship(
        'KpiFact',
        backref=__tablename__,
        lazy='dynamic'
    )


class Supplier(BaseModel, db.Model):
    __tablename__ = 'supplier'
    product = db.relationship(
        'Product',
        backref=__tablename__,
        lazy='dynamic'
    )


class Department(BaseModel, db.Model):
    __tablename__ = 'department'
    kpi_fact = db.relationship(
        'KpiFact',
        backref=__tablename__,
        lazy='dynamic'
    )


class Section(BaseModel, db.Model):
    __tablename__ = 'section'
    kpi_fact = db.relationship(
        'KpiFact',
        backref=__tablename__,
        lazy='dynamic'
    )


class FamilyCategory(BaseModel, db.Model):
    __tablename__ = 'family_category'
    kpi_fact = db.relationship(
        'KpiFact',
        backref=__tablename__,
        lazy='dynamic'
    )


class SubFamilyCategory(BaseModel, db.Model):
    __tablename__ = 'sub_family_category'
    kpi_fact = db.relationship(
        'KpiFact',
        backref=__tablename__,
        lazy='dynamic'
    )


class PromoMechanic(BaseModel, db.Model):
    __tablename__ = 'promo_mechanic'
    kpi_fact = db.relationship(
        'KpiFact',
        backref=__tablename__,
        lazy='dynamic'
    )


class KpiFact(db.Model):
    __tablename__ = 'kpi_fact'

    campaign_id = db.Column(
        db.Integer,
        db.ForeignKey('analytics.campaign.id')
    )

    department_id = db.Column(
        db.Integer,
        db.ForeignKey('analytics.department.id')
    )
    family_category_id = db.Column(
        db.Integer,
        db.ForeignKey('analytics.family_category.id')
    )
    product_id = db.Column(
        db.Integer,
        db.ForeignKey('analytics.product.id')
    )
    promo_mechanic_id = db.Column(
        db.Integer,
        db.ForeignKey('analytics.promo_mechanic.id')
    )
    section_id = db.Column(
        db.Integer,
        db.ForeignKey('analytics.section.id')
    )
    sub_family_category_id = db.Column(
        db.Integer,
        db.ForeignKey('analytics.sub_family_category.id')
    )
    incr_sales = db.Column(db.Numeric(10, 4))
    incr_sales_per = db.Column(db.Numeric(10, 4))
    incr_margin = db.Column(db.Numeric(10, 4))
    incr_traffic = db.Column(db.Numeric(10, 4))
    incr_basket = db.Column(db.Numeric(10, 4))
    incr_tse = db.Column(db.Numeric(10, 4))
    ipromo_depth = db.Column(db.Numeric(10, 4))
    total_sales = db.Column(db.Numeric(10, 4))
    volume_sold = db.Column(db.Numeric(10, 4))
    promo_price = db.Column(db.Numeric(10, 4))
    slash_price = db.Column(db.Numeric(10, 4))
    cost_price = db.Column(db.Numeric(10, 4))
    incr_traffic_per = db.Column(db.Numeric(10, 4))
    incr_basket_per = db.Column(db.Numeric(10, 4))
    incr_tse_per = db.Column(db.Numeric(10, 4))

    timestamp = db.Column(db.DateTime(timezone=True), default=dt.utcnow)
    __table_args__ = (
        db.PrimaryKeyConstraint(
            'campaign_id',
            'department_id',
            'family_category_id',
            'product_id',
            'promo_mechanic_id',
            'section_id',
            'sub_family_category_id',
            name='kpi_fact_pk'
        ),
        db.UniqueConstraint(
            'campaign_id',
            'department_id',
            'family_category_id',
            'product_id',
            'promo_mechanic_id',
            'section_id',
            'sub_family_category_id',
            name='kpi_fact_uix_1'
        ),
        {'schema': 'analytics'}
    )
