ALTER TABLE reader_article add COLUMN campaign_id INT(11) DEFAULT 0;



 alter table reader_article add index lookup_b(extid, src_id, language, campaign_id);
