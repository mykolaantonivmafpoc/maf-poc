import datetime, random, time, os # NOQA
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'SQLALCHEMY_DATABASE_URI', default='sqlite:////tmp/test.db'
)

db = SQLAlchemy(app)
migrate = Migrate(app, db)


# fact tables
class Product(db.Model):
    __tablename__ = 'product'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    description = db.Column(db.String(128))
    supplier_id = db.Column(
        db.Integer,
        db.ForeignKey('supplier.id')
    )

    timestamp = db.Column(
        db.DateTime(timezone=True),
        default=datetime.datetime.utcnow
    )


class Supplier(db.Model):
    __tablename__ = 'supplier'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    description = db.Column(db.String(128))
    timestamp = db.Column(
        db.DateTime(timezone=True),
        default=datetime.datetime.utcnow
    )


class Department(db.Model):
    __tablename__ = 'department'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    description = db.Column(db.String(128))
    timestamp = db.Column(
        db.DateTime(timezone=True),
        default=datetime.datetime.utcnow
    )


class Section(db.Model):
    __tablename__ = 'section'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    description = db.Column(db.String(128))
    timestamp = db.Column(
        db.DateTime(timezone=True),
        default=datetime.datetime.utcnow
    )


class FamilyCategory(db.Model):
    __tablename__ = 'family_category'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    description = db.Column(db.String(128))
    timestamp = db.Column(
        db.DateTime(timezone=True),
        default=datetime.datetime.utcnow
    )


class SubFamilyCategory(db.Model):
    __tablename__ = 'sub_family_category'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    description = db.Column(db.String(128))
    timestamp = db.Column(
        db.DateTime(timezone=True),
        default=datetime.datetime.utcnow
    )


class PromoMechanic(db.Model):
    __tablename__ = 'promo_mechanic'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    description = db.Column(db.String(128))
    timestamp = db.Column(
        db.DateTime(timezone=True),
        default=datetime.datetime.utcnow
    )


class Campaign(db.Model):
    __tablename__ = 'campaign'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    description = db.Column(db.String(128))
    campaign_type_id = db.Column(
        db.Integer,
        db.ForeignKey('campaign_type.id')
    )

    date_from = db.Column(db.Date)
    date_to = db.Column(db.Date)
    timestamp = db.Column(
        db.DateTime(timezone=True),
        default=datetime.datetime.utcnow
    )


class CampaignType(db.Model):
    __tablename__ = 'campaign_type'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    description = db.Column(db.String(128))
    timestamp = db.Column(
        db.DateTime(timezone=True),
        default=datetime.datetime.utcnow
    )


# Fact table
class KpiFact(db.Model):
    __tablename__ = 'kpi_fact'
    campaign_id = db.Column(
        db.Integer,
        db.ForeignKey('campaign.id')
    )
    department_id = db.Column(
        db.Integer,
        db.ForeignKey('department.id')
    )
    family_category_id = db.Column(
        db.Integer,
        db.ForeignKey('family_category.id')
    )
    product_id = db.Column(
        db.Integer,
        db.ForeignKey('product.id')
    )
    promo_mechanic_id = db.Column(
        db.Integer,
        db.ForeignKey('promo_mechanic.id')
    )
    section_id = db.Column(
        db.Integer,
        db.ForeignKey('section.id')
    )
    sub_family_category_id = db.Column(
        db.Integer,
        db.ForeignKey('sub_family_category.id')
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
    timestamp = db.Column(
        db.DateTime(timezone=True),
        default=datetime.datetime.utcnow
    )

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
        )
    )


db.create_all()


def char_range(c1, c2):
    for c in range(ord(c1), ord(c2) + 1):
        yield chr(c)


items = {
    'PromoMechanic': 'Promo mechanic {}',
    'CampaignType': 'Campaign type {}',
    'Supplier': 'Supplier {}',
    'Campaign': 'Campaign {}',
    'Department': 'Department {}',
    'FamilyCategory': 'Family category {}',
    'Product': 'Product {}',
    'Section': 'Section {}',
    'SubFamilyCategory': 'Sub family category {}',
}


def strTimeProp(start, end, format, prop):
    """Get a time at a proportion of a range of two formatted times.

    start and end should be strings specifying times formated in the
    given format (strftime-style), giving an interval [start, end].
    prop specifies how a proportion of the interval to be taken after
    start.  The returned time will be in the specified format.
    """

    stime = time.mktime(time.strptime(start, format))
    etime = time.mktime(time.strptime(end, format))

    ptime = stime + prop * (etime - stime)

    return time.strftime(format, time.localtime(ptime))


def randomDate(year):
    try:
        return datetime.datetime.strptime('{} {}'.format(
            random.randint(1, 366), year), '%j %Y')

    except ValueError:
        randomDate(year)

# camp_type = CampaignType(**{
#     "name" : "Campaign 1",
#     "description" : "Campaign 1 description",
#     });
# db.session.add(camp_type)


# globals()["class_name"]
for x in char_range('A', 'Z'):
    for z, y in items.items():
        print(z)
        print(y.format(x))
        im = globals()[z]()
        im.name = y.format(x)
        im.description = im.name + ' description'
        if 'Campaign' == z:
            im.date_from = randomDate(2015)
            im.date_to = randomDate(2017)
            im.campaign_type_id = int(random.triangular(1, 26))
            # print("asd: {}".format(im.campaign_type_id))
        if 'Product' == z:
            im.supplier_id = int(random.triangular(1, 26))
            # print("asd: {}".format(im.campaign_type_id))
        db.session.add(im)
        db.session.commit()

db.session.commit()

for x in range(1, 10000):
    try:
        db.session.add(
            KpiFact(
                **{
                    'campaign_id': int(random.triangular(1, 26)),
                    'department_id': int(random.triangular(1, 26)),
                    'family_category_id': int(random.triangular(1, 26)),
                    'product_id': int(random.triangular(1, 26)),
                    'promo_mechanic_id': int(random.triangular(1, 26)),
                    'section_id': int(random.triangular(1, 26)),
                    'sub_family_category_id': int(random.triangular(1, 26)),
                    'incr_sales': random.triangular(500.1111, 6000.1111),
                    'incr_sales_per': random.triangular(-0.1313, 44.7023),
                    'incr_margin': random.triangular(500.1111, 6000.1111),
                    'incr_traffic': random.triangular(500.1111, 6000.1111),
                    'incr_basket': random.triangular(-0.0111, 0.0999),
                    'incr_tse': random.triangular(-5000.1111, 6000.1111),
                    'ipromo_depth': random.triangular(0.0001, 0.03),
                    'total_sales': random.triangular(1000, 500000),
                    'volume_sold': random.triangular(1000, 11000),
                    'promo_price': random.triangular(0, 10.5),
                    'slash_price': random.triangular(6.0001, 16.0001),
                    'cost_price': random.triangular(5, 15),
                    'incr_traffic_per': 0,
                    'incr_basket_per': 0,
                    'incr_tse_per': 0,
                    'timestamp': randomDate(2016)
                }
            )
        )
        db.session.commit()
    except Exception as e: # NOQA
        pass
