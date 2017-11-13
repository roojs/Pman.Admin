
-- ALTER TABLE Events ADD COLUMN coba_investor_id int(11)  NOT NULL;

ALTER TABLE Events DROP COLUMN coba_investor_id;

ALTER TABLE Events ADD COLUMN modx_users_id int(11)  NOT NULL;

