
CREATE TABLE coba_person_risk_asset (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY   (id)
);

ALTER TABLE coba_person_risk_asset ADD COLUMN name_asset VARCHAR(254) NOT NULL DEFAULT	'';

ALTER TABLE coba_person_risk_asset ADD COLUMN name_owner VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk_asset ADD COLUMN currency VARCHAR(8) NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk_asset ADD COLUMN country	VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk_asset ADD COLUMN amount_usd NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk_asset ADD COLUMN coba_person_risk_id INT(11) NOT NULL DEFAULT 0;
