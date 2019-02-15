create schema analytics;

-- Table: promo_mechanic
CREATE TABLE analytics.promo_mechanic (
    id          INTEGER       NOT NULL,
    name        VARCHAR (128),
    description VARCHAR (128),
    timestamp   timestamp,
    PRIMARY KEY (
        id
    )
);

-- Table: section
CREATE TABLE analytics.section (
    id          INTEGER       NOT NULL,
    name        VARCHAR (128),
    description VARCHAR (128),
    timestamp   timestamp,
    PRIMARY KEY (
        id
    )
);

-- Table: sub_family_category
CREATE TABLE analytics.sub_family_category (
    id          INTEGER       NOT NULL,
    name        VARCHAR (128),
    description VARCHAR (128),
    timestamp   timestamp,
    PRIMARY KEY (
        id
    )
);

-- Table: supplier
CREATE TABLE analytics.supplier (
    id          INTEGER       NOT NULL,
    name        VARCHAR (128),
    description VARCHAR (128),
    timestamp   timestamp,
    PRIMARY KEY (
        id
    )
);

-- Table: campaign_type
CREATE TABLE analytics.campaign_type (
    id          INTEGER       NOT NULL,
    name        VARCHAR (128),
    description VARCHAR (128),
    timestamp   timestamp,
    PRIMARY KEY (
        id
    )
);

-- Table: department
CREATE TABLE analytics.department (
    id          INTEGER       NOT NULL,
    name        VARCHAR (128),
    description VARCHAR (128),
    timestamp   timestamp,
    PRIMARY KEY (
        id
    )
);

-- Table: family_category
CREATE TABLE analytics.family_category (
    id          INTEGER       NOT NULL,
    name        VARCHAR (128),
    description VARCHAR (128),
    timestamp   timestamp,
    PRIMARY KEY (
        id
    )
);

-- Table: campaign
CREATE TABLE analytics.campaign (
    id               INTEGER       NOT NULL,
    name             VARCHAR (128),
    description      VARCHAR (128),
    campaign_type_id INTEGER,
    date_from        DATE,
    date_to          DATE,
    timestamp        timestamp,
    PRIMARY KEY (
        id
    ),
    FOREIGN KEY (
        campaign_type_id
    )
    REFERENCES analytics.campaign_type (id)
);

-- Table: product
CREATE TABLE analytics.product (
    id          INTEGER       NOT NULL,
    name        VARCHAR (128),
    description VARCHAR (128),
    supplier_id INTEGER,
    timestamp   timestamp,
    PRIMARY KEY (
        id
    ),
    FOREIGN KEY (
        supplier_id
    )
    REFERENCES analytics.supplier (id)
);

-- Table: kpi_fact
CREATE TABLE analytics.kpi_fact (
    campaign_id            INTEGER         NOT NULL,
    department_id          INTEGER         NOT NULL,
    family_category_id     INTEGER         NOT NULL,
    product_id             INTEGER         NOT NULL,
    promo_mechanic_id      INTEGER         NOT NULL,
    section_id             INTEGER         NOT NULL,
    sub_family_category_id INTEGER         NOT NULL,
    incr_sales             NUMERIC (20, 5),
    incr_sales_per         NUMERIC (20, 4),
    incr_margin            NUMERIC (20, 5),
    incr_traffic           NUMERIC (20, 4),
    incr_basket            NUMERIC (20, 4),
    incr_tse               NUMERIC (20, 4),
    ipromo_depth           NUMERIC (20, 4),
    total_sales            NUMERIC (20, 4),
    volume_sold            NUMERIC (20, 4),
    promo_price            NUMERIC (20, 4),
    slash_price            NUMERIC (20, 4),
    cost_price             NUMERIC (20, 5),
    incr_traffic_per       NUMERIC (20, 4),
    incr_basket_per        NUMERIC (20, 4),
    incr_tse_per           NUMERIC (20, 4),
    timestamp              timestamp,
    CONSTRAINT kpi_fact_pk PRIMARY KEY (
        campaign_id,
        department_id,
        family_category_id,
        product_id,
        promo_mechanic_id,
        section_id,
        sub_family_category_id,
        timestamp
    ),
    FOREIGN KEY (
        campaign_id
    )
    REFERENCES analytics.campaign (id),
    FOREIGN KEY (
        department_id
    )
    REFERENCES analytics.department (id),
    FOREIGN KEY (
        family_category_id
    )
    REFERENCES analytics.family_category (id),
    FOREIGN KEY (
        product_id
     )
    REFERENCES analytics.product (id),
    FOREIGN KEY (
        promo_mechanic_id
    )
    REFERENCES analytics.promo_mechanic (id),
    FOREIGN KEY (
        section_id
    )
    REFERENCES analytics.section (id),
    FOREIGN KEY (
        sub_family_category_id
    )
    REFERENCES analytics.sub_family_category (id)
);

-- Load data from csv files
COPY analytics.promo_mechanic
FROM '/data/promo_mechanic.csv' delimiter ',' CSV header;

COPY analytics.section
FROM '/data/section.csv' delimiter ',' CSV header;

COPY analytics.sub_family_category
FROM '/data/subfamily.csv' delimiter ',' CSV header;

COPY analytics.supplier
FROM '/data/supplier.csv' delimiter ',' CSV header;

COPY analytics.campaign_type
FROM '/data/campaign_type.csv' delimiter ',' CSV header;

COPY analytics.department
FROM '/data/department.csv' delimiter ',' CSV header;

COPY analytics.family_category
FROM '/data/family_category.csv' delimiter ',' CSV header;

COPY analytics.campaign
FROM '/data/campaign.csv' delimiter ',' CSV header;

COPY analytics.product
FROM '/data/product.csv' delimiter ',' CSV header;

COPY analytics.kpi_fact
FROM '/data/kpi_fact.csv' delimiter ',' CSV header;
