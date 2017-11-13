
CREATE TABLE coba_person_risk_advisor (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY   (id)
);

ALTER TABLE coba_person_risk_advisor ADD COLUMN profession VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk_advisor ADD COLUMN name_advisor VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk_advisor ADD COLUMN name_company VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk_advisor ADD COLUMN address VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk_advisor ADD COLUMN phone VARCHAR(32) NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk_advisor ADD COLUMN coba_person_risk_id INT(11) NOT NULL DEFAULT 0;
