
CREATE TABLE coba_declarations (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY  (id)
) ;

ALTER TABLE coba_declarations ADD COLUMN fund_id INT(11) NOT NULL DEFAULT 0;
ALTER TABLE coba_declarations ADD COLUMN dec_type VARCHAR(128) NOT NULL DEFAULT '';
ALTER TABLE coba_declarations ADD COLUMN nickname VARCHAR(128) NOT NULL DEFAULT '';
ALTER TABLE coba_declarations ADD COLUMN title TEXT NOT NULL DEFAULT '';
ALTER TABLE coba_declarations ADD COLUMN created_dt DATE NOT NULL DEFAULT '0000-00-00';
ALTER TABLE coba_declarations ADD COLUMN created_by INT(11) NOT NULL DEFAULT 0;
ALTER TABLE coba_declarations ADD COLUMN is_active INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_declarations ADD COLUMN used_by VARCHAR(128) NOT NULL DEFAULT '';
ALTER TABLE coba_declarations ADD COLUMN seq_order INT(11) NOT NULL DEFAULT 0;

