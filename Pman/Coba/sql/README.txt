Database Overview for coba.


api_result: - Probably related to api queries.. '
see: core/components/extendeduser/processors/mgr/custom/checkapi.php


Applications
-----------------------------
ext_data:
Currently where the 'user' data is stored.
userdata_id -> points to modx_user.

** will be replaced eventually by coba_person
(a dual account will involve 2 'coba_person')
?? coba_company ?? = for the company ones?

coba_application ?? core holder of application ?
??? big rethink here...

modx_accounts:
-- appears to be the upload of user documents related to finds
-- also appears to map the fund???

?? modx_documents ?? not sure where it's used..

Access control / User managmenet
----------------------------
modx_access_* - can be removed..
modx_member_groups (membership of groups)
modx_membergroups_names (groups and their names)
modx_user_attributes - includes email / session id / login count...
modx_user_group_rules = groups?
modx_users - passwords + username


Fund Descriptions
--------------------------------
modx_accountmgmts => rename to coba_fund_types + core_images ???
--> 
  Describes the account name / documents / terms_text
  
---------------------------

Notifications / Messages
----------------------------------
modx_backend_notifications
-> appears to notifications to admin generally?
modx_frontned_notifications
-> appears to be notifications targeted at specific users?
modx_loginfos
-> a generic log of events?
modx_manager_log
-> log of management operations , eg. update XXx/ login ...
modx_user_messages ?
-> user to user messaging?



Old content mangement
--------------------------
categories  - the nav tree...
modx_media_* - relates to how resources are found on file system etc.
modx_menus - backend menu tree..
modx_site_*