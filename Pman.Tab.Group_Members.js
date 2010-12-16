//<script type="text/javascript">
/**
 *  group membershipg - for permissions..
 */
 
 
 Pman.on('beforeload', function()
{
    //                case 1 : Pman.Tab.Projects.add(this.mainLayout, 'west'); break;
    
   
    
    Pman.register({
        modKey : '001-pman-tab-groups-members',
        module : Pman.Tab.Group_Members,
        region : 'center',
        parent : Pman.Tab.GroupMgr,
        name : "Permission Group Membership"
    });

    
});

Pman.Tab.Group_Members = new  Pman.Tab.PersonList({
    id : 'group_members',
    type: 0,
    title : "Staff Membership",
    permName : 'Core.Staff',
    hideDelete: true, // as it's confusing..
    getLeftSelections : function() {
        return Pman.Tab.Groups.grid.getSelectionModel().getSelections();
    },
    
    // beforeload handler... -- override on extended versions..
    beforeload: function(t, o) {
        //console.log(o.params);
        // teams!?!
        var tms = this.getLeftSelections();
        
        if (tms.length) {
            o.params['query[in_group]'] = tms[0].data.id;
        }
        o.params['query[name]'] = this.searchBox.getValue();
        o.params['query[type]'] = this.type; // group type..
        o.params['query[person_internal_only_all]'] = 1;
        o.params['query[person_inactive]'] = this.showInActive ? 0  : 1;
        
    },
    
    columns : function()
    {
        return [
            this.c_name(),
            this.c_office_id_name(),
            this.c_role(),
            this.c_phone(),
            this.c_fax(),
            this.c_email(),
            this.c_active()
        ]
    },
    
    dialog: function () {
        return Pman.Dialog.PersonStaff;
    },
    bulkAdd : function() {
        //return Pman.Dialog.PersonBulkAdd
        return false;
    },
    newDefaults : function() {
        return {
            
            id : 0,
            company_id : Pman.Login.authUser.company_id,
            company_id_name : Pman.Login.authUser.company_id_name,
            company_id_address : Pman.Login.authUser.company_id_address,
            company_id_tel : Pman.Login.authUser.company_id_tel,
            company_id_fax : Pman.Login.authUser.company_id_fax
        };
    }
    
});