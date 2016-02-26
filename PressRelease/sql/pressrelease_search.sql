
CREATE TABLE pressrelease_search (
  id int(11)  NOT NULL AUTO_INCREMENT,
  person_id int(11)  NOT NULL,
  title text  NOT NULL,
  data text  NOT NULL,
  PRIMARY KEY (id),
  INDEX lookup(person_id)
);

 