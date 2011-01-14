//<script type="text/javascript">


// fixme - needs a delayed create..


Pman.on('beforeload', function()
{ 
    
    

    Pman.Tab.ContactGrps = new Pman.Tab.GroupsList({
        id : 'cgroups',
        title:  "Groups",
        type : 2,
        getDialog : function () { return Pman.Dialog.Groups; }
    });
    Pman.register({
        modKey : '060-pman-tab-contactgrps',
        module : Pman.Tab.ContactGrps,
        region : 'west',
        parent : Pman.Tab.ContactsMgr,
        name : "Contacts Groups"
    });
        
});