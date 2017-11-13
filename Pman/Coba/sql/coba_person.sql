
CREATE TABLE coba_person (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY  (id)
) ;

ALTER TABLE coba_person ADD COLUMN name VARCHAR(128)  NOT NULL DEFAULT '';
ALTER TABLE coba_person ADD COLUMN honor VARCHAR(32) NOT NULL DEFAULT '';
ALTER TABLE coba_person ADD COLUMN firstname VARCHAR(128) NOT NULL DEFAULT '';
ALTER TABLE coba_person ADD COLUMN middlename VARCHAR(128) NOT NULL DEFAULT '';
ALTER TABLE coba_person ADD COLUMN lastname VARCHAR(128) NOT NULL DEFAULT '';
ALTER TABLE coba_person ADD COLUMN firstname_alt VARCHAR(128) NOT NULL DEFAULT '';
ALTER TABLE coba_person ADD COLUMN lastname_alt VARCHAR(128) NOT NULL DEFAULT '';
ALTER TABLE coba_person ADD COLUMN chosen_title TEXT NOT NULL DEFAULT ''; 
ALTER TABLE coba_person ADD COLUMN role VARCHAR(254)  NOT NULL DEFAULT '';
ALTER TABLE coba_person ADD COLUMN remarks TEXT NOT NULL DEFAULT '';
ALTER TABLE coba_person ADD COLUMN lang VARCHAR(8) DEFAULT 'en';
ALTER TABLE coba_person ADD COLUMN country VARCHAR(8) DEFAULT '';
ALTER TABLE coba_person ADD COLUMN birth_date DATE NOT NULL DEFAULT '0000-00-00';
ALTER TABLE coba_person ADD COLUMN email VARCHAR(254) NOT NULL DEFAULT '';
ALTER TABLE coba_person ADD COLUMN phone VARCHAR(32) NOT NULL  DEFAULT '';
ALTER TABLE coba_person ADD COLUMN phone_mobile VARCHAR(32) NOT NULL  DEFAULT '';
ALTER TABLE coba_person ADD COLUMN phone_direct VARCHAR(32) NOT NULL  DEFAULT '';
ALTER TABLE coba_person ADD COLUMN fax VARCHAR(32) NOT NULL DEFAULT '';
ALTER TABLE coba_person ADD COLUMN alt_email VARCHAR(254) NULL DEFAULT '' ;
ALTER TABLE coba_person ADD COLUMN office_id INT(11) NOT NULL DEFAULT 0;
ALTER TABLE coba_person ADD COLUMN company_id INT(11) NOT NULL DEFAULT 0;
ALTER TABLE coba_person ADD COLUMN owner_id INT(11) NOT NULL DEFAULT 0;
ALTER TABLE coba_person ADD COLUMN active INT(11) NOT NULL DEFAULT 1;
ALTER TABLE coba_person ADD COLUMN project_id INT(11) DEFAULT 0;
ALTER TABLE coba_person ADD COLUMN passwd VARCHAR(64) NOT NULL DEFAULT '';
ALTER TABLE coba_person ADD COLUMN no_reset_sent int(11) DEFAULT 0;
ALTER TABLE coba_person ADD COLUMN deleted_by INT(11) NOT NULL default 0 ;
ALTER TABLE coba_person ADD COLUMN deleted_dt DATETIME NOT NULL DEFAULT '0000-00-00 00-00-00';
ALTER TABLE coba_person ADD COLUMN name_facebook VARCHAR(128) NOT NULL DEFAULT '';
ALTER TABLE coba_person ADD COLUMN url_blog VARCHAR(254) NOT NULL DEFAULT '' ;
ALTER TABLE coba_person ADD COLUMN url_twitter VARCHAR(254) NOT NULL DEFAULT '';
ALTER TABLE coba_person ADD COLUMN linkedin_id VARCHAR(254) NOT NULL DEFAULT '';
ALTER TABLE coba_person ADD COLUMN url_linkedin VARCHAR(254) NOT NULL DEFAULT '';
ALTER TABLE coba_person ADD COLUMN url_google_plus TEXT NOT NULL DEFAULT ''; 
ALTER TABLE coba_person ADD COLUMN url_blog2 TEXT NOT NULL DEFAULT ''; 
ALTER TABLE coba_person ADD COLUMN url_blog3 TEXT NOT NULL DEFAULT '';
ALTER TABLE coba_person ADD COLUMN countries VARCHAR(128) NOT NULL DEFAULT ''; 
ALTER TABLE coba_person ADD COLUMN action_type VARCHAR(32) NOT NULL DEFAULT ''; 
ALTER TABLE coba_person ADD COLUMN point_score INT(11) NOT NULL DEFAULT 0; 
ALTER TABLE coba_person ADD COLUMN authorize_md5 VARCHAR(254)  NOT NULL DEFAULT '';
ALTER TABLE coba_person ADD COLUMN post_code VARCHAR(254) NOT NULL DEFAULT '';
ALTER TABLE coba_person ADD COLUMN passport_number VARCHAR(254) NOT NULL DEFAULT '';
ALTER TABLE coba_person ADD COLUMN passport_date_of_issue DATE NOT NULL DEFAULT '0000-00-00';
ALTER TABLE coba_person ADD COLUMN passport_date_of_expiry DATE NOT NULL DEFAULT '0000-00-00';
ALTER TABLE coba_person ADD COLUMN nationality VARCHAR(254) NOT NULL DEFAULT '';
ALTER TABLE coba_person ADD COLUMN place_of_birth VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_person ADD COLUMN investor_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person ADD COLUMN other_nationality VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_person ADD COLUMN credentials_type VARCHAR(128) NOT NULL DEFAULT '';

ALTER TABLE coba_person ADD COLUMN coba_address_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person ADD COLUMN id_card_number VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_person ADD COLUMN id_card_date_of_issue DATE NOT NULL DEFAULT '0000-00-00';

ALTER TABLE coba_person ADD COLUMN not_have_passport INT(1) NOT NULL DEFAULT 0;

ALTER TABLE coba_person ADD COLUMN not_have_id_card INT(1) NOT NULL DEFAULT 0; 


ALTER TABLE coba_person ADD INDEX lookup_authorize_md5_active(authorize_md5, active);
ALTER TABLE coba_person ADD INDEX lookup_a(email, active);
ALTER TABLE coba_person ADD INDEX lookup_b(email, active, company_id);
ALTER TABLE coba_person ADD INDEX lookup_owner(owner_id);


DROP TRIGGER IF EXISTS coba_person_before_insert; 

DELIMITER $$
CREATE TRIGGER coba_person_before_insert 
    BEFORE INSERT ON coba_person
FOR EACH ROW
BEGIN

    DECLARE mid INT(1);
    
    SELECT is_submit INTO mid FROM ext_data WHERE userdata_id = NEW.investor_id LIMIT 1;
    
    IF mid > 0 THEN
        UPDATE `Fail: INSERT referenced ext_data:is_submit` SET x = 1;
    END IF;
    
END$$
DELIMITER ;


DROP TRIGGER IF EXISTS coba_person_before_update; 

DELIMITER $$
CREATE TRIGGER coba_person_before_update
    BEFORE UPDATE ON coba_person
FOR EACH ROW
BEGIN

    DECLARE mid INT(1);
    
    SELECT is_submit INTO mid FROM ext_data WHERE userdata_id = NEW.investor_id LIMIT 1;
    
    IF mid > 0 THEN
        UPDATE `Fail: UPDATE referenced ext_data:is_submit` SET x = 1;
    END IF;
    
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS coba_person_before_delete; 

DELIMITER $$
CREATE TRIGGER coba_person_before_delete
    BEFORE DELETE ON coba_person
FOR EACH ROW
BEGIN

    DECLARE mid INT(1);
    
    SELECT is_submit INTO mid FROM ext_data WHERE userdata_id = OLD.investor_id LIMIT 1;
    
    IF mid > 0 THEN
        UPDATE `Fail: DELETE referenced ext_data:is_submit` SET x = 1;
    END IF;
    
END$$
DELIMITER ;