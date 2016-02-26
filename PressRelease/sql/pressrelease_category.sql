
CREATE TABLE pressrelease_category (
  id int(11) NOT NULL auto_increment,
  parent_id int(11) NOT NULL default '0',
   name varchar(128) NOT NULL default '',
  display_order int(11) NOT NULL default '0',
  visible tinyint(1) NOT NULL default '1',
  PRIMARY KEY  (id)
) ;
ALTER TABLE  pressrelease_category ADD COLUMN hgroup varchar(128) NOT NULL DEFAULT '';

ALTER TABLE  pressrelease_category ADD COLUMN clist text NOT NULL DEFAULT '';


ALTER TABLE  pressrelease_category DROP INDEX lookup;
ALTER TABLE  pressrelease_category DROP INDEX lookuph;
ALTER TABLE  pressrelease_category ADD INDEX lookupf (hgroup, parent_id, name, display_order, visible);
