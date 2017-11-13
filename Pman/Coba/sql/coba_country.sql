
CREATE TABLE coba_country (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY  (id)
) ;

ALTER TABLE coba_country ADD COLUMN name VARCHAR(254) NOT NULL DEFAULT '';
ALTER TABLE coba_country ADD COLUMN abbrv VARCHAR(254) NOT NULL DEFAULT '';

