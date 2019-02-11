--create analytics schema
CREATE SCHEMA IF NOT EXISTS analytics;

CREATE table analytics.products(
   PRODUCT_ID integer,
   PRODUCT_DESC varchar(50),
   DEPARTMENT_CAT varchar(50),
   SECTION_CAT varchar(50),
   FAMILY_CAT varchar(50),
   SUBFAMILY_CAT varchar(50),
   PROMO_MECHANIC varchar(50),
   SUPPLIER_ID integer,
primary key (PRODUCT_ID, PROMO_MECHANIC)
)
;

CREATE table analytics.campaigns (
   CAMPAIGN_NAME varchar(50),
   CAMPAIGN_TYPE varchar(50),
   CAMPAIGN_DATE date,
primary key (CAMPAIGN_NAME, CAMPAIGN_TYPE, CAMPAIGN_DATE)
)
;

CREATE table analytics.product_kpis(
   PRODUCT_ID integer,
   CAMPAIGN_NAME varchar(50),
   CAMPAIGN_DATE date,
   INCR_SALES numeric(20,5),
   INCR_SALES_PER numeric(12,4),
   INCR_MARGIN numeric(20,5),
   INCR_TRAFFIC numeric(20,5),
   INCR_BASKET numeric(20,5),
   INCR_TSE numeric(20,5),
   IPROMO_DEPTH numeric(20,5),
   TOTAL_SALES numeric(20,5),
   VOLUME_SOLD numeric(20,5),
   PROMO_PRICE numeric(12,4),
   SLASH_PRICE numeric(12,4),
   COST_PRICE numeric(20,5),
   INCR_TRAFFIC_PER numeric(12,4),
   INCR_BASKET_PER numeric(12,4),
   INCR_TSE_PER numeric(12,4),
primary key (PRODUCT_ID,CAMPAIGN_NAME, CAMPAIGN_DATE)
)
;

--load data from csv files
COPY analytics.products
FROM '/data/products.csv' delimiter ',' CSV header;

COPY analytics.campaigns
FROM '/data/campaigns.csv' delimiter ',' CSV header;

COPY analytics.product_kpis
FROM '/data/product_kpis.csv' delimiter ',' CSV header;
