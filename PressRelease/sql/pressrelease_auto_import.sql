
CREATE TABLE pressrelease_auto_import (
  id INT(11) NOT NULL AUTO_INCREMENT,
  url TEXT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE pressrelease_auto_import ADD COLUMN language VARCHAR(5) NULL DEFAULT '';
ALTER TABLE pressrelease_auto_import ADD COLUMN local_search_url TEXT NOT NULL DEFAULT '';
ALTER TABLE pressrelease_auto_import ADD COLUMN use_local_search INT(2) NOT NULL DEFAULT 0;
ALTER TABLE pressrelease_auto_import ADD COLUMN local_search_allow TEXT NOT NULL DEFAULT '';
ALTER TABLE pressrelease_auto_import ADD COLUMN is_active INT(2) NOT NULL DEFAULT 1;
