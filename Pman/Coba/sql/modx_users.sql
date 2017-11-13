-- schema modifications for modx_users

-- ALTER TABLE modx_users ADD COLUMN investment_advisor TEXT DEFAULT '';
ALTER TABLE modx_users DROP COLUMN investment_advisor;
