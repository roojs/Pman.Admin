
CREATE TABLE coba_investor_lexis_results (
    id int(11) NOT NULL auto_increment,
    PRIMARY KEY  (id)
);

ALTER TABLE coba_investor_lexis_results ADD COLUMN investor_id INT(11) NOT NULL DEFAULT 0;
ALTER TABLE coba_investor_lexis_results ADD COLUMN match_id BIGINT(20) NOT NULL DEFAULT 0;
ALTER TABLE coba_investor_lexis_results ADD COLUMN updated_by INT(11) NOT NULL DEFAULT 0;
ALTER TABLE coba_investor_lexis_results ADD COLUMN updated_dt DATE NOT NULL DEFAULT '0000-00-00';
ALTER TABLE coba_investor_lexis_results ADD COLUMN reason TEXT NOT NULL DEFAULT '';
ALTER TABLE coba_investor_lexis_results ADD COLUMN is_active INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_investor_lexis_results ADD COLUMN status INT(2) NOT NULL DEFAULT 0;

ALTER TABLE coba_investor_lexis_results CHANGE COLUMN person_id updated_by INT(11) NOT NULL DEFAULT 0;
ALTER TABLE coba_investor_lexis_results CHANGE COLUMN when_dt updated_dt DATE NOT NULL DEFAULT '0000-00-00';

ALTER TABLE coba_investor_lexis_results CHANGE COLUMN match_id match_id VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_investor_lexis_results ADD COLUMN json_detail TEXT NOT NULL DEFAULT '';
