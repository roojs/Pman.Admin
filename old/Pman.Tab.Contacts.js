//<script type="text/javascript">
/**
 * 
 * The contacts..
 * 
 * -- this should implement personlist.!!!!
 */
Pman.on('beforeload', function()
{
    if (!Pman.hasPerm('Core.Person', 'E')) {
        return;
    }
   
    
    
    Pman.register({
        modKey : '040-pman-tab-contacts',
        module : Pman.Tab.Contacts,
        region : 'center',
        parent : Pman.Tab.ContactsMgr,
        name : "Contacts List"
    });

    
});
Pman.Tab.Contacts = new Pman.Tab.PersonList({
        id: 'contacts',
        type: 2,
        title : "Contacts",
        itemDisplayName : "Contact",
        permName : 'Core.Person',
        getLeftSelections : function() {
        
            return Pman.Tab.ContactGrps.grid ? 
                Pman.Tab.ContactGrps.grid.getSelectionModel().getSelections() : [];
        },
        beforeload: function(t, o) {
                //console.log(o.params);
            var _this= Pman.Tab.Contacts;
            o.params['query[person_not_internal]'] = 1;
            o.params['query[search]'] = _this.searchBox.getValue();
            
            var tms = _this.getLeftSelections();
            
            if (tms.length) {
                o.params['query[in_group]'] = tms[0].data.id;
            }
            //o.params['query[name]'] = _this.searchBox.getValue();
            o.params['query[type]'] = _this.type; // group type..
            
            
            
        }, 
        columns : function()
        {
            return [
                this.c_project_id_code(),
                this.c_company_id_name(),
                this.c_name(),
                this.c_role(),
                this.c_phone(),
                this.c_fax(),
                this.c_email() 
            ]
        },
        dialog: function () {
            return Pman.Dialog.PersonEdit;
        },
        bulkAdd : function() {
            return Pman.Dialog.PersonBulkAdd;
        },  
        newDefaults : function() {  return { id : 0 }; }

    
    });