CREATE TABLE coba_person_investor_profile (
    id INT(11) NOT NULL auto_increment,
    PRIMARY KEY (id)
);

ALTER TABLE coba_person_investor_profile CHANGE COLUMN investor_id id INT(11) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN id id INT(11) NOT NULL auto_increment;

ALTER TABLE coba_person_investor_profile ADD COLUMN coba_person_id INT(11) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN coba_person_id modx_user_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_investor_profile ADD COLUMN is_completed INT(2) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_investor_profile ADD COLUMN completed_dt DATE NOT NULL DEFAULT '0000-00-00';

ALTER TABLE coba_person_investor_profile ADD COLUMN started_dt DATE NOT NULL DEFAULT '0000-00-00';

ALTER TABLE coba_person_investor_profile ADD COLUMN dependent_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_investor_profile ADD COLUMN info_year_invest_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_investor_profile ADD COLUMN info_is_leveraged INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN info_is_leveraged info_is_leveraged INT(2) NOT NULL DEFAULT -1;

ALTER TABLE coba_person_investor_profile ADD COLUMN info_income_require_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_investor_profile ADD COLUMN info_to_do_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_investor_profile ADD COLUMN info_regular_invest_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_investor_profile ADD COLUMN info_rate_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_investor_profile ADD COLUMN exp_type_id INT(11) NOT NULL DEFAULT 0;

-- ALTER TABLE coba_person_investor_profile ADD COLUMN exp_currency_primary_id INT(11) NOT NULL DEFAULT '';
-- ALTER TABLE coba_person_investor_profile ADD COLUMN exp_currency_primary VARCHAR(8) NOT NULL DEFAULT '';
UPDATE coba_person_investor_profile SET exp_currency_primary = (SELECT name FROM core_enum WHERE id = exp_currency_primary_id ) WHERE  exp_currency_primary_id > 0;
ALTER TABLE coba_person_investor_profile DROP COLUMN exp_currency_primary_id;

-- ALTER TABLE coba_person_investor_profile ADD COLUMN exp_currency_second_id INT(11) NOT NULL DEFAULT '';
-- ALTER TABLE coba_person_investor_profile ADD COLUMN exp_currency_second VARCHAR(8) NOT NULL DEFAULT '';
UPDATE coba_person_investor_profile SET exp_currency_second = (SELECT name FROM core_enum WHERE id = exp_currency_second_id ) WHERE  exp_currency_second_id > 0;
ALTER TABLE coba_person_investor_profile DROP COLUMN exp_currency_second_id;

ALTER TABLE coba_person_investor_profile ADD COLUMN exp_household_currency VARCHAR(128) NOT NULL DEFAULT '';
UPDATE coba_person_investor_profile SET exp_household_currency = CONCAT(exp_currency_primary,IF(exp_currency_second!='' AND exp_currency_primary!='',',',''),IF(exp_currency_second!='',exp_currency_second,''));
ALTER TABLE coba_person_investor_profile DROP COLUMN exp_currency_primary;
ALTER TABLE coba_person_investor_profile DROP COLUMN exp_currency_second;
ALTER TABLE coba_person_investor_profile ADD COLUMN exp_pri_cur VARCHAR(128) NOT NULL DEFAULT '';
ALTER TABLE coba_person_investor_profile ADD COLUMN exp_sec_cur VARCHAR(128) NOT NULL DEFAULT '';


ALTER TABLE coba_person_investor_profile ADD COLUMN risk_fluctuate_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_investor_profile ADD COLUMN risk_more_risk_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_investor_profile ADD COLUMN risk_willing_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_investor_profile ADD COLUMN risk_risk_taker_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_investor_profile ADD COLUMN risk_familiar_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_investor_profile ADD COLUMN risk_security_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_investor_profile ADD COLUMN risk_suit_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_investor_profile ADD COLUMN risk_year_income_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_investor_profile ADD COLUMN risk_goal_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_investor_profile ADD COLUMN risk_expect_normal_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_investor_profile ADD COLUMN risk_expect_poor_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_investor_profile ADD COLUMN risk_attitude_year_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_investor_profile ADD COLUMN risk_attitude_month_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_investor_profile ADD COLUMN know_is_derivative INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_is_derivative know_is_derivative INT(2) NOT NULL DEFAULT -1;

ALTER TABLE coba_person_investor_profile ADD COLUMN know_training INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_training know_training INT(2) NOT NULL DEFAULT -1;

ALTER TABLE coba_person_investor_profile ADD COLUMN know_exp INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_exp know_exp INT(2) NOT NULL DEFAULT -1;

ALTER TABLE coba_person_investor_profile ADD COLUMN know_work_exp INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_work_exp know_work_exp INT(2) NOT NULL DEFAULT -1;

ALTER TABLE coba_person_investor_profile ADD COLUMN know_acquire_is_qualified INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_acquire_is_qualified know_acquire_is_qualified INT(2) NOT NULL DEFAULT -1;

ALTER TABLE coba_person_investor_profile ADD COLUMN know_acquire_hksi INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_acquire_hksi know_acquire_hksi INT(2) NOT NULL DEFAULT -1;

ALTER TABLE coba_person_investor_profile ADD COLUMN know_acquire_iiqe INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_acquire_iiqe know_acquire_iiqe INT(2) NOT NULL DEFAULT -1;

ALTER TABLE coba_person_investor_profile ADD COLUMN know_acquire_frme INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_acquire_frme know_acquire_frme INT(2) NOT NULL DEFAULT -1;

ALTER TABLE coba_person_investor_profile ADD COLUMN know_acquire_cfae INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_acquire_cfae know_acquire_cfae INT(2) NOT NULL DEFAULT -1;

ALTER TABLE coba_person_investor_profile ADD COLUMN know_from_caiae INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_from_caiae know_from_caiae INT(2) NOT NULL DEFAULT -1;

ALTER TABLE coba_person_investor_profile ADD COLUMN know_from_cert_planner INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_from_cert_planner know_from_cert_planner INT(2) NOT NULL DEFAULT -1;

ALTER TABLE coba_person_investor_profile ADD COLUMN know_from_master_degree INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_from_master_degree know_from_master_degree INT(2) NOT NULL DEFAULT -1;

ALTER TABLE coba_person_investor_profile ADD COLUMN know_from_degree INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_from_degree know_from_degree INT(2) NOT NULL DEFAULT -1;

ALTER TABLE coba_person_investor_profile ADD COLUMN know_acquire_diploma INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_acquire_diploma know_acquire_diploma INT(2) NOT NULL DEFAULT -1;

ALTER TABLE coba_person_investor_profile ADD COLUMN know_acquire_qualified_other TEXT NOT NULL DEFAULT '';
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_acquire_qualified_other know_acquire_qualified_other VARCHAR(64) NOT NULL DEFAULT '';

ALTER TABLE coba_person_investor_profile ADD COLUMN know_exp_equity_linked INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_exp_equity_linked know_exp_equity_linked INT(2) NOT NULL DEFAULT -1;

ALTER TABLE coba_person_investor_profile ADD COLUMN know_exp_credit_linked INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_exp_credit_linked know_exp_credit_linked INT(2) NOT NULL DEFAULT -1;

ALTER TABLE coba_person_investor_profile ADD COLUMN know_exp_structured_deposit INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_exp_structured_deposit know_exp_structured_deposit INT(2) NOT NULL DEFAULT -1;

ALTER TABLE coba_person_investor_profile ADD COLUMN know_exp_currency_link INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_exp_currency_link know_exp_currency_link INT(2) NOT NULL DEFAULT -1;

ALTER TABLE coba_person_investor_profile ADD COLUMN know_exp_currency_forward INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_exp_currency_forward know_exp_currency_forward INT(2) NOT NULL DEFAULT -1;

ALTER TABLE coba_person_investor_profile ADD COLUMN know_exp_warrant INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_exp_warrant know_exp_warrant INT(2) NOT NULL DEFAULT -1;

ALTER TABLE coba_person_investor_profile ADD COLUMN know_exp_stock_option INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_exp_stock_option know_exp_stock_option INT(2) NOT NULL DEFAULT -1;

ALTER TABLE coba_person_investor_profile ADD COLUMN know_exp_index_future INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_exp_index_future know_exp_index_future INT(2) NOT NULL DEFAULT -1;

ALTER TABLE coba_person_investor_profile ADD COLUMN know_exp_non_auth INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_exp_non_auth know_exp_non_auth INT(2) NOT NULL DEFAULT -1;

ALTER TABLE coba_person_investor_profile ADD COLUMN know_exp_auth INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_exp_auth know_exp_auth INT(2) NOT NULL DEFAULT -1;

ALTER TABLE coba_person_investor_profile ADD COLUMN know_exp_auth_with_know INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_exp_auth_with_know know_exp_auth_with_know INT(2) NOT NULL DEFAULT -1;

ALTER TABLE coba_person_investor_profile ADD COLUMN know_is_licensed INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_is_licensed know_is_licensed INT(2) NOT NULL DEFAULT -1;


ALTER TABLE coba_person_investor_profile ADD COLUMN know_is_read_disclosure INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN know_is_read_disclosure know_is_read_disclosure INT(2) NOT NULL DEFAULT -1;

ALTER TABLE coba_person_investor_profile ADD COLUMN is_second_ap INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_person_investor_profile CHANGE COLUMN is_second_ap  is_second_ap  INT(2) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_investor_profile ADD UNIQUE unique_index (modx_user_id, is_second_ap);

-- moved to ext_data
-- ALTER TABLE coba_person_investor_profile ADD COLUMN sum_is_invest_irp INT(2) NOT NULL DEFAULT 0;
-- ALTER TABLE coba_person_investor_profile ADD COLUMN sum_is_joint_invest INT(2) NOT NULL DEFAULT 0;
-- ALTER TABLE coba_person_investor_profile ADD COLUMN sum_joint_invest_profile VARCHAR(254) NOT NULL DEFAULT '';
-- ALTER TABLE coba_person_investor_profile ADD COLUMN sum_is_invest_diff INT(2) NOT NULL DEFAULT 0;
-- ALTER TABLE coba_person_investor_profile ADD COLUMN sum_invest_diff_profile VARCHAR(254) NOT NULL DEFAULT '';
-- ALTER TABLE coba_person_investor_profile ADD COLUMN sum_is_invest_more INT(2) NOT NULL DEFAULT 0;
-- ALTER TABLE coba_person_investor_profile ADD COLUMN sum_invest_more_profile VARCHAR(254) NOT NULL DEFAULT '';
-- ALTER TABLE coba_person_investor_profile ADD COLUMN sum_is_satellite INT(2) NOT NULL DEFAULT 0;
-- ALTER TABLE coba_person_investor_profile ADD COLUMN sum_is_impose INT(2) NOT NULL DEFAULT 0;
-- ALTER TABLE coba_person_investor_profile ADD COLUMN sum_impose MEDIUMTEXT NOT NULL DEFAULT '';
-- ALTER TABLE coba_person_investor_profile ADD COLUMN sum_license MEDIUMTEXT NOT NULL DEFAULT '';
-- ALTER TABLE coba_person_investor_profile ADD COLUMN sum_recommend VARCHAR(254) NOT NULL DEFAULT '';
-- ALTER TABLE coba_person_investor_profile ADD COLUMN sum_recommend_currency_id INT(11) NOT NULL DEFAULT 0;
-- ALTER TABLE coba_person_investor_profile ADD COLUMN sum_agreed_currency_id TEXT NOT NULL DEFAULT "";

ALTER TABLE coba_person_investor_profile DROP COLUMN sum_is_invest_irp;
ALTER TABLE coba_person_investor_profile DROP COLUMN sum_is_joint_invest;
ALTER TABLE coba_person_investor_profile DROP COLUMN sum_joint_invest_profile;
ALTER TABLE coba_person_investor_profile DROP COLUMN sum_is_invest_diff;
ALTER TABLE coba_person_investor_profile DROP COLUMN sum_invest_diff_profile;
ALTER TABLE coba_person_investor_profile DROP COLUMN sum_is_invest_more;
ALTER TABLE coba_person_investor_profile DROP COLUMN sum_invest_more_profile;
ALTER TABLE coba_person_investor_profile DROP COLUMN sum_is_satellite;
ALTER TABLE coba_person_investor_profile DROP COLUMN sum_is_impose;
ALTER TABLE coba_person_investor_profile DROP COLUMN sum_impose;
ALTER TABLE coba_person_investor_profile DROP COLUMN sum_license;
ALTER TABLE coba_person_investor_profile DROP COLUMN sum_recommend;
ALTER TABLE coba_person_investor_profile DROP COLUMN sum_recommend_currency_id;
ALTER TABLE coba_person_investor_profile DROP COLUMN sum_agreed_currency_id;
