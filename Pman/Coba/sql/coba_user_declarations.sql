
RENAME TABLE coba_user_declarations TO coba_investor_declarations;

CREATE TABLE coba_investor_declarations (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY  (id)
) ;

ALTER TABLE coba_investor_declarations ADD COLUMN user_id INT(11) NOT NULL DEFAULT 0;
ALTER TABLE coba_investor_declarations ADD COLUMN dec_id INT(11) NOT NULL DEFAULT 0;
ALTER TABLE coba_investor_declarations ADD COLUMN is_agreed INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_investor_declarations ADD COLUMN agreed_dt DATE NOT NULL DEFAULT '0000-00-00';

