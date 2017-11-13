
CREATE TABLE coba_person_risk_pension (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY   (id)
);

ALTER TABLE coba_person_risk_pension ADD COLUMN name_client VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk_pension ADD COLUMN is_employer INT(2) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk_pension ADD COLUMN name_company VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk_pension ADD COLUMN policy_no INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk_pension ADD COLUMN value NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk_pension ADD COLUMN amount_contribute NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk_pension ADD COLUMN coba_person_risk_id INT(11) NOT NULL DEFAULT 0;
