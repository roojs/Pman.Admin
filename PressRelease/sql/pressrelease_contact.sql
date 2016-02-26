
CREATE TABLE  pressrelease_contact (
    id                                INT(11)              NOT NULL AUTO_INCREMENT ,
    category_type_id                  INT(11)              NOT NULL DEFAULT 0,
    honor                             VARCHAR(8)           DEFAULT '',
    name                              VARCHAR(255)         NOT NULL DEFAULT '',
    name_alt                          VARCHAR(255)         NOT NULL DEFAULT '',
    company_id_name                   VARCHAR(255)         NOT NULL DEFAULT '',
    role                              VARCHAR(255)         NOT NULL DEFAULT '',
    email                             VARCHAR(255)         NOT NULL DEFAULT '',
    email_personal                    VARCHAR(255)         NOT NULL DEFAULT '',
    phone                             VARCHAR(255)         NOT NULL DEFAULT '',
    fax                               VARCHAR(128)         NOT NULL DEFAULT '',
    address                           TEXT                ,
    category_media_id                 INT(11)              NOT NULL DEFAULT 0,
    submission_time                   VARCHAR(64)          NOT NULL DEFAULT '',
    media_language                    VARCHAR(8)           DEFAULT '',
    url                               VARCHAR(255)         NOT NULL DEFAULT '',
    remarks                           TEXT                ,
    PRIMARY KEY (id)
);


ALTER TABLE pressrelease_contact ADD COLUMN phone_mobile varchar(255)  NOT NULL;
ALTER TABLE pressrelease_contact ADD COLUMN phone_direct varchar(255)  NOT NULL ;
ALTER TABLE pressrelease_contact ADD COLUMN firstname varchar(255)  NOT NULL ;
ALTER TABLE pressrelease_contact ADD COLUMN lastname varchar(255)  NOT NULL ;
ALTER TABLE pressrelease_contact ADD COLUMN firstname_alt varchar(255)  NOT NULL ;
ALTER TABLE pressrelease_contact ADD COLUMN lastname_alt varchar(255)  NOT NULL ;
ALTER TABLE pressrelease_contact ADD COLUMN publication_name varchar(255)  NOT NULL;
ALTER TABLE pressrelease_contact ADD COLUMN publication_name_alt varchar(255)  NOT NULL;

ALTER TABLE pressrelease_contact CHANGE COLUMN publication_scope category_scope_id int(11)  NOT NULL ;
ALTER TABLE pressrelease_contact ADD COLUMN  category_scope_id int(11)  NOT NULL ;

ALTER TABLE pressrelease_contact CHANGE COLUMN media_language publication_lang VARCHAR(8)   NOT NULL ;
ALTER TABLE pressrelease_contact ADD COLUMN publication_lang VARCHAR(8)   NOT NULL ;
ALTER TABLE pressrelease_contact ADD COLUMN publication_lang_alt VARCHAR(8)   NOT NULL ;



ALTER TABLE pressrelease_contact ADD COLUMN  contact_language  VARCHAR(8)   NOT NULL ;
ALTER TABLE pressrelease_contact ADD COLUMN  contact_language_alt  VARCHAR(8)   NOT NULL ;
ALTER TABLE pressrelease_contact ADD COLUMN  country  VARCHAR(8)   NOT NULL ;
ALTER TABLE pressrelease_contact ADD COLUMN  best_contact_method  VARCHAR(32)   NOT NULL ;
ALTER TABLE pressrelease_contact ADD COLUMN  best_contact_from  VARCHAR(8)   NOT NULL ;
ALTER TABLE pressrelease_contact ADD COLUMN  best_contact_to  VARCHAR(8)   NOT NULL ;
ALTER TABLE pressrelease_contact ADD COLUMN  best_contact_days  VARCHAR(8)   NOT NULL ;

ALTER TABLE pressrelease_contact ADD COLUMN city varchar(255)  NOT NULL;
ALTER TABLE pressrelease_contact ADD COLUMN  email2  varchar(254)   NOT NULL DEFAULT '';
ALTER TABLE pressrelease_contact ADD COLUMN  email3  varchar(254)   NOT NULL  DEFAULT '' ;

ALTER TABLE pressrelease_contact ADD COLUMN  email_fails INT(11) NOT NULL DEFAULT 0;
ALTER TABLE pressrelease_contact ADD COLUMN  email2_fails INT(11) NOT NULL DEFAULT 0;
ALTER TABLE pressrelease_contact ADD COLUMN  email3_fails INT(11) NOT NULL DEFAULT 0;





-- created by accident.
ALTER TABLE pressrelease_contact DROP COLUMN stock_exchange_id;
ALTER TABLE pressrelease_contact DROP COLUMN source_name;

  alter table pressrelease_contact add index lookup (category_type_id, category_media_id, category_scope_id, country);

