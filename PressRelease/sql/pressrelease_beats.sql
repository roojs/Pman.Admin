
CREATE TABLE  pressrelease_beats (
  id int(11)  NOT NULL,
  contact_id int(11)  NOT NULL,
  category_id int(11)  NOT NULL,
  PRIMARY KEY (id),
  INDEX lookup(contact_id, category_id)
);

 
