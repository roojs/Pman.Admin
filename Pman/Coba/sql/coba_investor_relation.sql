
CREATE TABLE coba_investor_relation (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY  (id)
) ;

ALTER TABLE coba_investor_relation ADD COLUMN modx_user_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_investor_relation CHANGE COLUMN primary_id modx_user_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_investor_relation ADD COLUMN coba_person_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_investor_relation ADD COLUMN relation VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_investor_relation ADD COLUMN parent_company_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_investor_relation CHANGE COLUMN primary_company_id parent_company_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_investor_relation ADD COLUMN coba_company_id INT(11) NOT NULL DEFAULT 0;


DROP TRIGGER IF EXISTS coba_investor_relation_before_insert; 

DELIMITER $$
CREATE TRIGGER coba_investor_relation_before_insert 
    BEFORE INSERT ON coba_investor_relation
FOR EACH ROW
BEGIN

    DECLARE mid INT(1);
    
    SELECT is_submit INTO mid FROM ext_data WHERE userdata_id = NEW.modx_user_id LIMIT 1;

    IF mid > 0 THEN
        UPDATE `Fail: INSERT referenced ext_data:is_submit` SET x = 1;
    END IF;
    
END$$
DELIMITER ;


DROP TRIGGER IF EXISTS coba_investor_relation_before_update; 

DELIMITER $$
CREATE TRIGGER coba_investor_relation_before_update
    BEFORE UPDATE ON coba_investor_relation
FOR EACH ROW
BEGIN

    DECLARE mid INT(1);
    
    SELECT is_submit INTO mid FROM ext_data WHERE userdata_id = NEW.modx_user_id LIMIT 1;
    
    IF mid > 0 THEN
        UPDATE `Fail: UPDATE referenced ext_data:is_submit` SET x = 1;
    END IF;
    
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS coba_investor_relation_before_delete; 

DELIMITER $$
CREATE TRIGGER coba_investor_relation_before_delete
    BEFORE DELETE ON coba_investor_relation
FOR EACH ROW
BEGIN

    DECLARE mid INT(1);
    
    SELECT is_submit INTO mid FROM ext_data WHERE userdata_id = OLD.modx_user_id LIMIT 1;
    
    IF mid > 0 THEN
        UPDATE `Fail: DELETE referenced ext_data:is_submit` SET x = 1;
    END IF;
    
END$$
DELIMITER ;
