
CREATE TABLE coba_address (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY  (id)
) ;

ALTER TABLE coba_address ADD COLUMN country VARCHAR(254) NOT NULL DEFAULT '';
ALTER TABLE coba_address ADD COLUMN other_country VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_address ADD COLUMN state INT(11) NOT NULL DEFAULT 0;
ALTER TABLE coba_address ADD COLUMN other_state VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_address ADD COLUMN city VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_address ADD COLUMN without_post_code INT(2) NOT NULL DEFAULT 0;
ALTER TABLE coba_address ADD COLUMN post_code VARCHAR(254) NOT NULL DEFAULT '';

ALTER TABLE coba_address ADD COLUMN address_line_1 TEXT NOT NULL DEFAULT '';
ALTER TABLE coba_address ADD COLUMN address_line_2 TEXT NOT NULL DEFAULT '';
