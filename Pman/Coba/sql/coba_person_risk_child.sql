
CREATE TABLE coba_person_risk_child (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY   (id)
);

ALTER TABLE coba_person_risk_child ADD COLUMN firstname VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk_child ADD COLUMN lastname VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk_child ADD COLUMN relationship VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk_child ADD COLUMN gender ENUM('male','female','') NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk_child ADD COLUMN level_edu ENUM('elementary school','high school','tertiary education','post-graduate','') NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk_child ADD COLUMN dob DATE NOT NULL DEFAULT '0000-00-00';

ALTER TABLE coba_person_risk_child ADD COLUMN is_dependent INT(2) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk_child ADD COLUMN requirement MEDIUMTEXT NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk_child ADD COLUMN amount_sponsor NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk_child ADD COLUMN age_to INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk_child ADD COLUMN expense_current NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk_child ADD COLUMN expense_future NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk_child ADD COLUMN saving NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk_child ADD COLUMN rate_inflat_protect NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk_child ADD COLUMN coba_person_risk_id INT(11) NOT NULL DEFAULT 0;
