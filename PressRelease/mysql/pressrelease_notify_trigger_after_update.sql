

-- updating of pressrelease_notify causes updates of email*_fails

 

DROP TRIGGER IF EXISTS pressrelease_notify_trigger_after_update;

DELIMITER $$
 
CREATE TRIGGER pressrelease_notify_trigger_after_update AFTER UPDATE on pressrelease_notify
    FOR EACH ROW
        BEGIN
            
            IF
                    NEW.person_id > 0
                    AND
                    OLD.sent < '1980-01-01 00:00:00'  -- sent is not null in pressrelease_notify?
                    AND
                    NEW.sent > '1980-01-01 00:00:00'
                THEN
                -- we have a result...
                IF NEW.msgid = '' THEN
                   -- it's an error condition.
                    IF new.field = 'email' THEN
                        UPDATE pressrelease_contact set email_fails = email_fails + 1 WHERE id = NEW.person_id;
                    END IF;   
                    IF new.field = 'email2' THEN
                        UPDATE pressrelease_contact set email2_fails = email2_fails + 1 WHERE id = NEW.person_id;
                    END IF;
                    IF new.field = 'email3' THEN
                        UPDATE pressrelease_contact set email3_fails = email3_fails + 1 WHERE id = NEW.person_id;
                    END IF;
                ELSE
                 
                   -- it's an error condition.
                    IF new.field = 'email' THEN
                        UPDATE pressrelease_contact set email_fails =  0 WHERE id = NEW.person_id;
                    END IF;   
                    IF new.field = 'email2' THEN
                        UPDATE pressrelease_contact set email2_fails = 0 WHERE id = NEW.person_id;
                    END IF;
                    IF new.field = 'email3' THEN
                        UPDATE pressrelease_contact set email3_fails = 0  WHERE id = NEW.person_id;
                    END IF;
                END IF;
                
                
            END IF;
        END;

$$
 

DELIMITER ;
