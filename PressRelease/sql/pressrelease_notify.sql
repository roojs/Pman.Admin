

-- actually the same as core_notify, except our person_id points to press_release contact..

CREATE TABLE  pressrelease_notify  (
  id int(11)  NOT NULL AUTO_INCREMENT,
  act_when DATETIME NOT NULL,
  act_start DATETIME NOT NULL,
  onid int(11)  NOT NULL DEFAULT 0,
  ontable varchar(128)  NOT NULL DEFAULT '',
  person_id int(11)  NOT NULL DEFAULT 0,
  msgid varchar(128)  NOT NULL  DEFAULT '',
  sent DATETIME  NOT NULL,
  event_id int(11)  NOT NULL DEFAULT 0,
  PRIMARY KEY (id) 
);
ALTER TABLE pressrelease_notify CHANGE COLUMN bounced event_id INT(11) DEFAULT 0;
ALTER TABLE pressrelease_notify ADD COLUMN event_id INT(11) DEFAULT 0;
ALTER TABLE pressrelease_notify ADD COLUMN evtype VARCHAR(16) DEFAULT '';
ALTER TABLE pressrelease_notify ADD COLUMN field VARCHAR(16) DEFAULT 'email';
ALTER TABLE pressrelease_notify ADD COLUMN  act_start DATETIME NOT NULL;

ALTER TABLE pressrelease_notify ADD COLUMN  to_email varchar(255)  NOT NULL  DEFAULT '';
ALTER TABLE pressrelease_notify ADD COLUMN  fail_reviewed int(4) NOT NULL  DEFAULT 0;

ALTER TABLE pressrelease_notify ADD COLUMN is_open INT(2) NOT NULL DEFAULT 0;

-- used to send manually
ALTER TABLE pressrelease_notify ADD COLUMN  firstname varchar(255)  NOT NULL  DEFAULT '';
ALTER TABLE pressrelease_notify ADD COLUMN  contact_language varchar(8)  NOT NULL  DEFAULT '';
 



ALTER TABLE pressrelease_notify ADD INDEX is_open_idx(is_open);


-- ALTER TABLE pressrelease_notify ADD INDEX lookup_a(onid, ontable, person_id, act_when, msgid, to_email); -- too long..
ALTER TABLE pressrelease_notify DROP INDEX lookup_a;

ALTER TABLE pressrelease_notify ADD INDEX lookup_b(onid, ontable, person_id, act_when, msgid); 
ALTER TABLE pressrelease_notify ADD INDEX lookup_e(onid, ontable, person_id, act_when, to_email); 

alter table pressrelease_notify add index evtype_idx (evtype);
alter table pressrelease_notify add index evtype_a_idx (evtype, person_id, act_when);
alter table pressrelease_notify add index journalistlookup (person_id, event_id, evtype, act_when);

alter table pressrelease_notify Drop index lookup;
