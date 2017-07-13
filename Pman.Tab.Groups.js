//<script type="text/javascript">


// fixme - needs a delayed create..


Pman.on('beforeload', function()
{ 
    
    Pman.Tab.Groups.title = "Groups";
    
 
    Pman.register({
        modKey : '00-pman-tab-groups',
        module : Pman.Tab.Groups,
        region : 'west',
        parent : Pman.Tab.GroupMgr,
        name : "Permission Groups"
    });
});   

Pman.Tab.Groups = new Pman.Tab.GroupsList({
    id : 'groups',
    title:  "Groups", // fixme change to method!!!
    type : 0,
    getDialog : function () { return Pman.Dialog.Groups; }
});