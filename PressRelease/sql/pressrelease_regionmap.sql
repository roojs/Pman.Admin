
CREATE TABLE pressrelease_regionmap (
  id int(11)  NOT NULL AUTO_INCREMENT,
  category_id int(11)  NOT NULL default 0,
  country  varchar(8)  NOT NULL default '',
  PRIMARY KEY (id)
);
ALTER TABLE pressrelease_regionmap ADD INDEX lookup(category_id, country);




