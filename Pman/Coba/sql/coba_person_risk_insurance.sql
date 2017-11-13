
CREATE TABLE coba_person_risk_insurance (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY   (id)
);

ALTER TABLE coba_person_risk_insurance ADD COLUMN name_company VARCHAR(254) NOT NULL DEFAULT "";

ALTER TABLE coba_person_risk_insurance ADD COLUMN policy_no INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk_insurance ADD COLUMN type_policy VARCHAR(254) NOT NULL DEFAULT "";

ALTER TABLE coba_person_risk_insurance ADD COLUMN name_owner VARCHAR(254) NOT NULL DEFAULT "";

ALTER TABLE coba_person_risk_insurance ADD COLUMN insure_life INT(2) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk_insurance ADD COLUMN insure_sum NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk_insurance ADD COLUMN premium_annual NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk_insurance ADD COLUMN coba_person_risk_id INT(11) NOT NULL DEFAULT 0;
