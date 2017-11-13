
CREATE TABLE coba_person_risk_property (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY   (id)
);

ALTER TABLE coba_person_risk_property ADD COLUMN name_property VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk_property ADD COLUMN address VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk_property ADD COLUMN amount NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk_property ADD COLUMN price_purchase NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk_property ADD COLUMN date_acquire DATE NOT NULL DEFAULT '0000-00-00';

ALTER TABLE coba_person_risk_property ADD COLUMN name_owner VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk_property ADD COLUMN income_rental NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk_property ADD COLUMN amount_loan NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk_property ADD COLUMN rate_loan_to_value NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk_property ADD COLUMN month_loan INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk_property ADD COLUMN rate_current_interest NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk_property ADD COLUMN name_bank VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk_property ADD COLUMN date_started DATE NOT NULL DEFAULT '0000-00-00';

ALTER TABLE coba_person_risk_property ADD COLUMN date_sale DATE NOT NULL DEFAULT '0000-00-00';

ALTER TABLE coba_person_risk_property ADD COLUMN rate_growth NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk_property ADD COLUMN renovation MEDIUMTEXT NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk_property ADD COLUMN break_even INT NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk_property ADD COLUMN coba_person_risk_id INT(11) NOT NULL DEFAULT 0;
