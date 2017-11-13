
CREATE TABLE coba_state (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY  (id)
) ;

ALTER TABLE coba_state ADD COLUMN country_id INT(11) NOT NULL DEFAULT 0;
ALTER TABLE coba_state ADD COLUMN name VARCHAR(254) NOT NULL DEFAULT '';

