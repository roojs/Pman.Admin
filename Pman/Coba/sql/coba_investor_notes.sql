
CREATE TABLE coba_investor_notes (
    id INT(11) NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id)
);

ALTER TABLE coba_investor_notes ADD COLUMN investor_id INT(11) NOT NULL DEFAULT 0;
ALTER TABLE coba_investor_notes ADD COLUMN created_by INT(11) NOT NULL DEFAULT 0;
ALTER TABLE coba_investor_notes ADD COLUMN created_dt DATE NOT NULL DEFAULT '0000-00-00';
ALTER TABLE coba_investor_notes ADD COLUMN notes LONGTEXT NOT NULL DEFAULT '';
ALTER TABLE coba_investor_notes ADD COLUMN note_type VARCHAR(254) NOT NULL DEFAULT '';

