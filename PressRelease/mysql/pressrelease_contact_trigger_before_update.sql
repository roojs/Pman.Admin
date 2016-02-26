
-- this fixes the fails counter if you modify the email address...

-- NOTE - Press release does not currently use GLOBAL triggers ... so we can do this.
-- however if we install that code - we will have to rework this..
 

DROP TRIGGER IF EXISTS pressrelease_contact_trigger_before_update;

DELIMITER $$
 
CREATE TRIGGER pressrelease_contact_trigger_before_update BEFORE UPDATE on pressrelease_contact
    FOR EACH ROW
        BEGIN
            
            IF
                    NEW.email != OLD.email
                    AND
                    NEW.email_fails > 0
                THEN
                    SET NEW.email_fails = 0;
                    
            END IF;
            
             IF
                    NEW.email2 != OLD.email2
                    AND
                    NEW.email2_fails > 0
                THEN
                    SET NEW.email2_fails = 0;
                    
            END IF;
            
             IF
                    NEW.email3 != OLD.email3
                    AND
                    NEW.email3_fails > 0
                THEN
                    SET NEW.email3_fails = 0;
                    
            END IF;
            
            
        END;

$$

DELIMITER ;
