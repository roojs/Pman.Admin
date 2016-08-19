//<script type="text/javascript">


// fixme - needs a delayed create..


Pman.on('beforeload', function()
{ 
    Roo.log('team beforeLoad????????????????????????????????????');
    
    Pman.register({
        modKey : '00-pman-tab-teams',
        module : Pman.Tab.Teams,
        region : 'west',
        parent : Pman.Tab.StaffMgr,
        name : "Staff Teams"
    });
 
});
Pman.Tab.Teams = new Pman.Tab.GroupsList({
    id : 'teams',
    title:  "Teams",
    type : 1,
    getDialog : function () { return Pman.Dialog.Groups; }
});
    