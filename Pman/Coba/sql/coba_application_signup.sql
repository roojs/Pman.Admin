
CREATE TABLE coba_application_signup (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY  (id)
) ;

ALTER TABLE coba_application_signup ADD COLUMN   firstname varchar(128) NOT NULL DEFAULT '';

ALTER TABLE coba_application_signup ADD COLUMN   middlename varchar(128) NOT NULL DEFAULT '';

ALTER TABLE coba_application_signup ADD COLUMN   lastname varchar(128) NOT NULL DEFAULT '';

ALTER TABLE coba_application_signup ADD COLUMN   firstname_sec_ap varchar(128) NOT NULL DEFAULT '';

ALTER TABLE coba_application_signup ADD COLUMN   middlename_sec_ap varchar(128) NOT NULL DEFAULT '';

ALTER TABLE coba_application_signup ADD COLUMN   lastname_sec_ap varchar(128) NOT NULL DEFAULT '';

ALTER TABLE coba_application_signup ADD COLUMN   email varchar(256)  NOT NULL DEFAULT '';

ALTER TABLE coba_application_signup ADD COLUMN   adviser_id int(11) NOT NULL  default 0;

ALTER TABLE coba_application_signup ADD COLUMN   fund_id int(11) NOT NULL  default 0;
ALTER TABLE coba_application_signup CHANGE COLUMN fund_id fund_code varchar(128) NOT NULL DEFAULT '';

ALTER TABLE coba_application_signup ADD COLUMN   account_type varchar(32) NOT NULL DEFAULT '';

ALTER TABLE coba_application_signup ADD COLUMN   verify_key varchar(256)  NOT NULL DEFAULT '';

ALTER TABLE coba_application_signup ADD COLUMN   created_dt DATETIME  NOT NULL;
