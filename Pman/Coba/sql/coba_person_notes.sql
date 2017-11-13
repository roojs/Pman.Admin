
CREATE TABLE coba_person_notes (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`id`)
);

ALTER TABLE coba_person_notes ADD COLUMN `coba_person_id` INT(11) NOT NULL DEFAULT 0;

ALTER TABLE coba_person_notes ADD COLUMN `date_created` DATE NOT NULL DEFAULT '0000-00-00' ;

ALTER TABLE coba_person_notes ADD COLUMN `notes` LONGTEXT CHARACTER SET 'utf8' NOT NULL ;
