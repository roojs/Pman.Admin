
CREATE TABLE coba_person_risk (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY   (id)
);

ALTER TABLE coba_person_risk ADD COLUMN coba_person_risk_dependent_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN modx_user_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN info_year_lived_asia INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN info_year_to_live_asia INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN info_marital ENUM('single','married','divorced','widowed', '') NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN info_level_edu ENUM('elementary school','high school','tertiary education','post-graduate','') NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN info_is_smoker INT(2) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN info_phone_business VARCHAR(32) NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN info_phone_fax VARCHAR(32) NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN info_status_employ ENUM('employee','self-employed','unemployed','') NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN info_occupation MEDIUMTEXT NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN info_name_employer VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN health_age_retire INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN health_status MEDIUMTEXT NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN health_is_aware_underwrite INT(2) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN health_aware_underwrite VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN health_is_aware INT(2) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN health_aware VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN health_name_insurance ENUM('none','standard health','decline or defer','loading','exclusion','') NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN health_is_private_patient INT(2) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN tax_name_company MEDIUMTEXT NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN tax_name_trust MEDIUMTEXT NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN tax_name_fund MEDIUMTEXT NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN tax_name_business MEDIUMTEXT NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN tax_note MEDIUMTEXT NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN income_salary NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN income_house_allowance NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN income_bonus NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN income_investment NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN income_rental NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN income_other NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN income_expense NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN income_surplus NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN income_currency VARCHAR(8) NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN income_note MEDIUMTEXT NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN property_note MEDIUMTEXT NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN future_reason_advice MEDIUMTEXT NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN future_reason_short_term MEDIUMTEXT NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN future_reason_medium_term MEDIUMTEXT NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN future_reason_longterm MEDIUMTEXT NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN future_age_retire INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN future_place_retire VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN future_income_retire NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN future_intend_retire ENUM('yes','full-time','part-time','no','') NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN future_expense_retire MEDIUMTEXT NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN future_reserve_retire NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN future_note MEDIUMTEXT NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN insurance_liability_family NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN insurance_expense_edu_family NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN insurance_income_replace_family NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN insurance_year_replace_family INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN insurance_expense_funeral_family NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN insurance_fund_emergency_family NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN insurance_liability_critical NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN insurance_expense_critical NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN insurance_income_replace_critical NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN insurance_income_other_critical NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN insurance_income_cover_serious NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN insurance_year_sustain_serious INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN insurance_year_benefit_serious INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN insurance_income_other_serious NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN insurance_expense_share_business NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN insurance_expense_guarantor_business NUMERIC NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN insurance_is_require_keyperson INT(2) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN estate_is_will INT(2) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN estate_year_will INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN estate_is_testamentary INT(2) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN estate_is_enduring_power INT(2) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN estate_is_health_directive INT(2) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN estate_is_special_need INT(2) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN estate_reason_special_need MEDIUMTEXT NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN estate_is_charitable INT(2) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN client_best_investment MEDIUMTEXT NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN client_worst_investment MEDIUMTEXT NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN client_areas_help MEDIUMTEXT NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN client_plan MEDIUMTEXT NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN client_sell_property MEDIUMTEXT NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN client_happy_about MEDIUMTEXT NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN client_things_to_do MEDIUMTEXT NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN client_expect_advisor MEDIUMTEXT NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk ADD COLUMN acknowledge_is_accurate INT(2) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN acknowledge_is_not_proceed INT(2) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN acknowledge_is_receive_copy INT(2) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN acknowledge_is_full_financial_info INT(2) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN acknowledge_is_limited_financial_info INT(2) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN acknowledge_is_limited_advise INT(2) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_risk ADD COLUMN notes_note MEDIUMTEXT NOT NULL DEFAULT '';

ALTER TABLE coba_person_risk CHANGE health_age_retire info_age_retire INT(11) NOT NULL DEFAULT 0;
