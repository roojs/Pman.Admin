
CREATE TABLE  pressrelease_entry_related (
  id int(11)  NOT NULL AUTO_INCREMENT,
  entry_id int(11) default 0,
  relationship varchar(128) default 0,
  table_name varchar(128) default '',
  table_id int(11) default 0,
  PRIMARY KEY (id)
);
