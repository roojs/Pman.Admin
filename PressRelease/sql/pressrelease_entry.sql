
CREATE TABLE  pressrelease_entry (
  id int(11)  NOT NULL AUTO_INCREMENT,
  client_id int(11)  NOT NULL  DEFAULT 0, 
  language varchar(5)  NOT NULL,
  publish_dt date  NOT NULL,

  publish_dt_tz int(11) NOT NULL DEFAULT 8,
  headline varchar(254)  NOT NULL,
  content longtext  NOT NULL,
  content_data longtext  NOT NULL,
  content_links longtext  NOT NULL,
  updated datetime  NOT NULL,
  created datetime  NOT NULL,
  created_by int(11)  NOT NULL  DEFAULT 0,
  updated_by int(11)  NOT NULL  DEFAULT 0,
  owner_id int(11)  NOT NULL  DEFAULT 0,
  publish_status int(11) DEFAULT 0,
  word_count INT(11) DEFAULT 0,
  PRIMARY KEY (id)
)
ENGINE = MyISAM;


ALTER TABLE  pressrelease_entry ADD COLUMN subheadline text  NOT NULL DEFAULT '';
ALTER TABLE  pressrelease_entry MODIFY COLUMN subheadline text  NOT NULL DEFAULT '';
ALTER TABLE  pressrelease_entry MODIFY COLUMN headline text  NOT NULL DEFAULT '';

ALTER TABLE  pressrelease_entry MODIFY COLUMN publish_dt DATETIME  NOT NULL;
ALTER TABLE  pressrelease_entry MODIFY COLUMN publish_dt_tz DECIMAL(4,2)  NOT NULL DEFAULT 8.0;

ALTER TABLE  pressrelease_entry DROP COLUMN   publish_dt_hour;
ALTER TABLE  pressrelease_entry ADD INDEX lookup(client_id, publish_dt, publish_dt_tz);
 
 
 ALTER TABLE pressrelease_entry MODIFY COLUMN publish_status INTEGER  NOT NULL DEFAULT 0;
 ALTER TABLE pressrelease_entry ADD COLUMN stockcode varchar(64)  NOT NULL;
 ALTER TABLE pressrelease_entry ADD COLUMN contact1_id int(11)  NOT NULL;
 ALTER TABLE pressrelease_entry ADD COLUMN contact2_id int(11)  NOT NULL;
 ALTER TABLE pressrelease_entry ADD COLUMN contact3_id int(11)  NOT NULL;
 
 ALTER TABLE pressrelease_entry ADD COLUMN contact1_displaytype int(4)  NOT NULL;
 ALTER TABLE pressrelease_entry ADD COLUMN contact2_displaytype int(4)  NOT NULL;
 ALTER TABLE pressrelease_entry ADD COLUMN contact3_displaytype int(4)  NOT NULL;
 
 
 ALTER TABLE pressrelease_entry ADD COLUMN content_about longtext  NOT NULL;
 ALTER TABLE pressrelease_entry ADD COLUMN content_forward longtext  NOT NULL;

ALTER TABLE pressrelease_entry ADD COLUMN company_name_alt varchar(254)  NOT NULL DEFAULT '';
ALTER TABLE pressrelease_entry ADD COLUMN country varchar(4)  NOT NULL DEFAULT '';
ALTER TABLE pressrelease_entry ADD COLUMN industry varchar(254)  NOT NULL DEFAULT '';
ALTER TABLE pressrelease_entry ADD COLUMN contact_txt text  NOT NULL;
ALTER TABLE pressrelease_entry ADD COLUMN publish_sum varchar(64)  NOT NULL DEFAULT '';
ALTER TABLE pressrelease_entry ADD COLUMN published datetime  NOT NULL;
ALTER TABLE pressrelease_entry ADD COLUMN distribution_contacts longtext NOT NULL;
ALTER TABLE pressrelease_entry ADD COLUMN distribution_config text NOT NULL;
ALTER TABLE pressrelease_entry ADD COLUMN distribution_countries text NOT NULL;

ALTER TABLE pressrelease_entry ADD COLUMN parent_id int(11)  NOT NULL;
ALTER TABLE pressrelease_entry ADD COLUMN  best_contact_days  VARCHAR(8)   NOT NULL ;


ALTER TABLE pressrelease_entry ADD COLUMN  stock_exchange_id  INT(11)   NOT NULL ;
ALTER TABLE pressrelease_entry ADD COLUMN  source_name  varchar(254)   NOT NULL ;
ALTER TABLE pressrelease_entry ADD COLUMN  email2  varchar(254)   NOT NULL ;
ALTER TABLE pressrelease_entry ADD COLUMN  email3  varchar(254)   NOT NULL ;

ALTER TABLE pressrelease_entry ADD COLUMN  word_count  INT(11)   NOT NULL DEFAULT 0;

ALTER TABLE pressrelease_entry ADD COLUMN  blacklist_ids TEXT;
ALTER TABLE pressrelease_entry ADD COLUMN  distribute_to_feed int(2) NOT NULL  DEFAULT 1;


ALTER TABLE pressrelease_entry ADD COLUMN  same_as_id int(11) NOT NULL  DEFAULT 0;

ALTER TABLE pressrelease_entry ADD COLUMN  revisions INT(11) NOT NULL  DEFAULT 0;

--ALTER TABLE pressrelease_entry CONVERT TO CHARACTER SET u
ALTER TABLE pressrelease_entry  CONVERT TO CHARACTER SET utf8;
