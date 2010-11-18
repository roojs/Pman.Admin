//<script type="text/javascript">

/**
 * 
 * Staff list with General Group adding ability.
 * 
 */
Pman.on('beforeload', function()
{
     
    Pman.register({
        modKey : '001-pman-tab-personlist',
        module : Pman.Tab.PersonStaff,
        region : 'center',
        parent : Pman.Tab.StaffMgr,
        name : "Staff",
        permname : 'Admin.Teams'
    });
   
    // where is this loaded into??? - by staffmgr - ** fix this...
      
   
    
});

Pman.Tab.PersonStaff = new  Pman.Tab.PersonList({
    id : 'personstaff',
    type: 1,
    permName : 'Admin.Teams', // or 'Core.Staff'
    getLeftSelections : function() {
        
        return Pman.Tab.Teams.grid ? Pman.Tab.Teams.grid.getSelectionModel().getSelections() : [];
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