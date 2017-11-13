-- schema modifications for ext_data ... since modx does not appear to have a 'update database' method..

ALTER TABLE ext_data ADD COLUMN date_of_issue DATE NOT NULL DEFAULT '0000-00-00';

ALTER TABLE ext_data ADD COLUMN date_of_issue_partner DATE NOT NULL DEFAULT '0000-00-00';

ALTER TABLE ext_data ADD COLUMN in_lived_in_us enum('yes','no', '') NOT NULL DEFAULT '';

ALTER TABLE ext_data CHANGE COLUMN in_lived_in_us in_lived_in_us enum('yes','no', '') NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN in_owner_of_us_business enum('yes','no', '') NOT NULL DEFAULT '';

ALTER TABLE ext_data CHANGE COLUMN in_owner_of_us_business in_owner_of_us_business enum('yes','no', '') NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN in_filing_us_tax_return enum('yes','no', '') NOT NULL DEFAULT '';

ALTER TABLE ext_data CHANGE COLUMN in_filing_us_tax_return in_filing_us_tax_return enum('yes','no', '') NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN in_have_us_tax_id enum('yes','no', '') NOT NULL DEFAULT '';

ALTER TABLE ext_data CHANGE COLUMN in_have_us_tax_id in_have_us_tax_id enum('yes','no', '') NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN in_lived_in_us_second enum('yes','no', '') NOT NULL DEFAULT '';

ALTER TABLE ext_data CHANGE COLUMN in_lived_in_us_second in_lived_in_us_second enum('yes','no', '') NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN in_owner_of_us_business_second enum('yes','no', '') NOT NULL DEFAULT '';

ALTER TABLE ext_data CHANGE COLUMN in_owner_of_us_business in_owner_of_us_business enum('yes','no', '') NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN in_filing_us_tax_return_second enum('yes','no', '') NOT NULL DEFAULT '';

ALTER TABLE ext_data CHANGE COLUMN in_filing_us_tax_return_second in_filing_us_tax_return_second enum('yes','no', '') NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN in_have_us_tax_id_second enum('yes','no', '') NOT NULL DEFAULT '';

ALTER TABLE ext_data CHANGE COLUMN in_have_us_tax_id_second in_have_us_tax_id_second enum('yes','no', '') NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN companies_domicile VARCHAR(100) NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN companies_registration_number VARCHAR(100) NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN date_of_incorporation DATE NOT NULL;

ALTER TABLE ext_data ADD COLUMN exchange_traded_on VARCHAR(100) NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN stock_symbol VARCHAR(100) NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN is_listed_company enum('yes','no', '') NOT NULL DEFAULT '';

ALTER TABLE ext_data CHANGE COLUMN is_listed_company is_listed_company enum('yes','no', '') NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN other_companies_domicile VARCHAR(100) NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN countries_of_tax_residence TEXT NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN countries_of_tax_residence_second TEXT NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN countries_of_tax_residence_other TEXT NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN countries_of_tax_residence_second_other TEXT NOT NULL DEFAULT '';

ALTER TABLE ext_data CHANGE COLUMN date_of_expiry date_of_expiry DATE NOT NULL DEFAULT '0000-00-00';

ALTER TABLE ext_data CHANGE COLUMN date_of_expiry_partner date_of_expiry_partner DATE NOT NULL DEFAULT '0000-00-00';

ALTER TABLE ext_data CHANGE COLUMN name_of_director name_of_director TEXT NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN kyc_industry TEXT NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN kyc_product_services TEXT NOT NULL DEFAULT '';

-- ALTER TABLE ext_data ADD COLUMN investment_advisor TEXT NOT NULL DEFAULT '';
--
-- ALTER TABLE ext_data ADD COLUMN investment_advisor_second_ap TEXT NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN social_security_number VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN social_security_number_second_ap VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN id_card_number VARCHAR(100) NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN id_card_date_of_issue DATE NOT NULL DEFAULT '0000-00-00';

ALTER TABLE ext_data ADD COLUMN not_have_passport INT(1) NOT NULL DEFAULT 0;

ALTER TABLE ext_data ADD COLUMN not_have_id_card INT(1) NOT NULL DEFAULT 0;

ALTER TABLE ext_data ADD COLUMN id_card_number_ap2 VARCHAR(100) NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN id_card_date_of_issue_ap2 DATE NOT NULL DEFAULT '0000-00-00';

ALTER TABLE ext_data ADD COLUMN not_have_passport_ap2 INT(1) NOT NULL DEFAULT 0;

ALTER TABLE ext_data ADD COLUMN not_have_id_card_ap2 INT(1) NOT NULL DEFAULT 0;

ALTER TABLE ext_data ADD COLUMN current_occupation VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN employers_name VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN current_occupation_ap2 VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN employers_name_ap2 VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN anti_money_laundering VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN anti_money_laundering_second_ap VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN is_third_party_account enum('yes','no', '') NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN is_third_party_account_second_ap enum('yes','no', '') NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN third_party_account_explanation TEXT NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN third_party_account_explanation_second_ap TEXT NOT NULL DEFAULT '';

ALTER TABLE ext_data DROP COLUMN stepfour;
ALTER TABLE ext_data DROP COLUMN stepfive;
ALTER TABLE ext_data DROP COLUMN stepsix;
ALTER TABLE ext_data DROP COLUMN stepseven;

ALTER TABLE ext_data ADD COLUMN is_submit INT(1) NOT NULL DEFAULT 0;

ALTER TABLE ext_data ADD COLUMN submit_dt DATE NOT NULL DEFAULT '0000-00-00';


ALTER TABLE ext_data CHANGE COLUMN in_username in_username VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN in_middlename in_middlename VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN company_name company_name VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN in_other_nationality in_other_nationality VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN in_district in_district VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN in_other_country in_other_country VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN in_correspondence_addressline1 in_correspondence_addressline1 VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN in_correspondence_addressline2 in_correspondence_addressline2 VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN in_correspondence_district in_correspondence_district VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN in_correspondence_city in_correspondence_city VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN in_correspondence_country in_correspondence_country VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN in_other_corrcountry in_other_corrcountry VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN in_correspondence_postalcode in_correspondence_postalcode VARCHAR(25) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN in_usa_tin_number in_usa_tin_number VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN in_professional_investor_file in_professional_investor_file VARCHAR(254) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN in_pro_investor_original_file in_pro_investor_original_file VARCHAR(254) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN in_hk_sfc_file in_hk_sfc_file VARCHAR(254) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN in_hk_sfc_original_file in_hk_sfc_original_file VARCHAR(254) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN in_capital_summary in_capital_summary TEXT NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN in_bank_swift_code in_bank_swift_code VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN in_bank_iba in_bank_iba VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN in_bank_iban in_bank_iban VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN in_bank_district in_bank_district VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN in_bank_othercountry in_bank_othercountry VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN middlename_second_ap middlename_second_ap VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN other_nationality_second_ap other_nationality_second_ap VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN district_second_ap district_second_ap VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN other_country_second_ap other_country_second_ap VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN other_corr_country_second_ap other_corr_country_second_ap VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN usa_tnumber_second_ap usa_tnumber_second_ap VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN pofessional_investor_file_second_ap pofessional_investor_file_second_ap VARCHAR(254) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN pro_investor_original_file_second_ap pro_investor_original_file_second_ap VARCHAR(254) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN hk_sfc_file_second_ap hk_sfc_file_second_ap VARCHAR(254) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN hk_sfc_original_file_second_ap hk_sfc_original_file_second_ap VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN capital_summary_second_ap capital_summary_second_ap TEXT NOT NULL DEFAULT '';


ALTER TABLE ext_data DROP COLUMN investment_advisor;
ALTER TABLE ext_data DROP COLUMN investment_advisor_second_ap;
ALTER TABLE ext_data DROP COLUMN investment_advisor_second_id;

ALTER TABLE ext_data ADD COLUMN investment_advisor_id INT(11) NOT NULL DEFAULT 0;



ALTER TABLE ext_data ADD COLUMN risk_profile_is_invest_acc_to_score INT(2) NOT NULL DEFAULT -1;

ALTER TABLE ext_data ADD COLUMN risk_profile_is_invest_to_diff_profile INT(2) NOT NULL DEFAULT -1;

ALTER TABLE ext_data ADD COLUMN risk_profile_invest_profile_id INT(11) NOT NULL DEFAULT 0;

ALTER TABLE ext_data ADD COLUMN risk_profile_is_consider_satellite INT(2) NOT NULL DEFAULT -1;

ALTER TABLE ext_data ADD COLUMN risk_profile_is_impose_restriction INT(2) NOT NULL DEFAULT -1;

ALTER TABLE ext_data ADD COLUMN risk_profile_restriction TEXT NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN risk_profile_restriction risk_profile_restriction VARCHAR(64) NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN risk_profile_agreed_currency_id TEXT NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN risk_profile_agreed_currency_id risk_profile_agreed_currency_ids VARCHAR(64) NOT NULL DEFAULT '';

ALTER TABLE ext_data ADD COLUMN risk_profile_agreed_portfolio TEXT NOT NULL DEFAULT '';
ALTER TABLE ext_data CHANGE COLUMN risk_profile_agreed_portfolio risk_profile_agreed_portfolio VARCHAR(64) NOT NULL DEFAULT '';

-- old version..
ALTER TABLE ext_data DROP COLUMN mark_deleted_by;
ALTER TABLE ext_data DROP COLUMN mark_deleted_date;

ALTER TABLE ext_data ADD COLUMN deleted_by INT(11) NOT NULL DEFAULT 0;
ALTER TABLE ext_data ADD COLUMN deleted_dt DATETIME NOT NULL DEFAULT '0000-00-00';

