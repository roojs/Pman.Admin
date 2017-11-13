
CREATE TABLE coba_company (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY  (id)
) ;

ALTER TABLE coba_company ADD COLUMN name VARCHAR(254) NOT NULL DEFAULT '';
ALTER TABLE coba_company ADD COLUMN domicile VARCHAR(254) NOT NULL DEFAULT '';
ALTER TABLE coba_company ADD COLUMN registration_number VARCHAR(254) NOT NULL DEFAULT '';
ALTER TABLE coba_company ADD COLUMN date_of_incorporation DATE NOT NULL DEFAULT '0000-00-00';
ALTER TABLE coba_company ADD COLUMN not_domociled_usa INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_company ADD COLUMN giin_number VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_company ADD COLUMN other_domicile VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_company ADD COLUMN coba_address_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_company ADD COLUMN exchange_traded_on VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_company ADD COLUMN stock_symbol VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_company ADD COLUMN is_listed_company INT(2) NOT NULL DEFAULT 0;

ALTER TABLE coba_company CHANGE COLUMN not_domociled_usa not_domociled_usa INT(2) NOT NULL DEFAULT -1;
ALTER TABLE coba_company CHANGE COLUMN is_listed_company is_listed_company INT(2) NOT NULL DEFAULT -1;



-- DROP TRIGGER IF EXISTS coba_company_before_insert; 
-- 
-- DELIMITER $$
-- CREATE TRIGGER coba_company_before_insert 
--     BEFORE INSERT ON coba_company
-- FOR EACH ROW
-- BEGIN
-- 
--     DECLARE user_id INT(11);
--     DECLARE mid INT(1);
--     
--     SELECT modx_user_id INTO user_id FROM coba_investor_relation WHERE coba_company_id = NEW.id LIMIT 1;
--     SELECT is_submit INTO mid FROM ext_data WHERE userdata_id = NEW.modx_user_id LIMIT 1;
-- 
--     IF mid > 0 THEN
--         UPDATE `Fail: INSERT referenced ext_data:is_submit` SET x = 1;
--     END IF;
--     
-- END$$
-- DELIMITER ;


DROP TRIGGER IF EXISTS coba_company_before_update; 

DELIMITER $$
CREATE TRIGGER coba_company_before_update
    BEFORE UPDATE ON coba_company
FOR EACH ROW
BEGIN

    DECLARE user_id INT(11);
    DECLARE mid INT(1);
    
    SELECT modx_user_id INTO user_id FROM coba_investor_relation WHERE coba_company_id = NEW.id LIMIT 1;
    SELECT is_submit INTO mid FROM ext_data WHERE userdata_id = user_id LIMIT 1;
    
    IF mid > 0 THEN
        UPDATE `Fail: UPDATE referenced ext_data:is_submit` SET x = 1;
    END IF;
    
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS coba_company_before_delete; 

DELIMITER $$
CREATE TRIGGER coba_company_before_delete
    BEFORE DELETE ON coba_company
FOR EACH ROW
BEGIN

    DECLARE user_id INT(11);
    DECLARE mid INT(1);
    
    SELECT modx_user_id INTO user_id FROM coba_investor_relation WHERE coba_company_id = OLD.id LIMIT 1;
    SELECT is_submit INTO mid FROM ext_data WHERE userdata_id = user_id LIMIT 1;
    
    IF mid > 0 THEN
        UPDATE `Fail: DELETE referenced ext_data:is_submit` SET x = 1;
    END IF;
    
END$$
DELIMITER ;
