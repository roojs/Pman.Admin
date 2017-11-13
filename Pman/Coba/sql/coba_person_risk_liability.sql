
CREATE TABLE coba_person_risk_liability (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY   (id)
);

ALTER TABLE coba_person_risk_liability ADD COLUMN name_liability	VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk_liability ADD COLUMN amount	NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk_liability ADD COLUMN name_bank	VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk_liability ADD COLUMN coba_person_risk_id	INT(11) NOT NULL DEFAULT 0;
