
CREATE TABLE  pressrelease_saved (
  id int(11)  NOT NULL AUTO_INCREMENT,
  name varchar(255)  NOT NULL,
  json text  NOT NULL,
  PRIMARY KEY (id),
  INDEX lookup(name)
) ;
