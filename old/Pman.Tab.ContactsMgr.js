//<script type="text/javascript">

// Contacts Manager 
// left - list of groups.
// right - People...


Pman.on('beforeload', function()
{
    
    if (!Pman.hasPerm('Core.Person', 'E')) {
        return;
    }
    // anyone with admin can see this.....
    
    Pman.register({
        modKey : '060-pman-tab-contactsmgr',
        module : Pman.Tab.ContactsMgr,
        region : 'center',
        parent : Pman.Tab.Admin,
        name : "Contacts Manager",
        permname : 'Admin.Contacts',
    });
        
});


Pman.Tab.ContactsMgr = {
    grid : false,
    panel : false,
    title : false, 
    add : function(parentLayout, region) {
        

        if (this.panel) {
            parentLayout.getRegion(region).showPanel(this.panel);
            return;
        }
     
        
        this.layout = new Ext.BorderLayout(
            parentLayout.getEl().createChild({tag:'div'}),
            {
               
                west : {
                    autoScroll:true,
                    hideTabs: true,
                    titlebar: true,
                    split:true,
                    initialSize: 250
                },
                center: {
                    autoScroll:true,
                    hideTabs: false,
                     tabPosition: 'top'
                   
                }
            }
        );
        
        
       
        this.tab = parentLayout.add(region,  new Ext.NestedLayoutPanel(
            this.layout, {title: this.title || "Contacts Manager", background : true}));
        var _this = this;
        this.tab.on('activate', function() {
            if (_this.layout.getRegion('west').panels.length) {
                _this.layout.getRegion('west').showPanel(0);
                Pman.Tab.ContactGrps.refresh();
            } else {
                Pman.Tab.Contacts.loadFirst();
            }
            _this.layout.getRegion('center').showPanel(0);
            
            
            
             
            
        });
    },
    donelayout : false //,
    
    //show: function (parentLayout, region)
   // {
     //   this.add(parentLayout, region);
   //     

    //} 
};