//<script type="text/javascript">

// Groupmanager 
// left - list of groups.
// right - Permissions | Members..


Pman.on('beforeload', function()
{
    
  
    if (!Pman.hasPerm('Core.Groups', 'E')) {
        return;
    }
    Pman.register({
        modKey : '060-pman-tab-groupmgr',
        module : Pman.Tab.GroupMgr,
        region : 'center',
        parent : Pman.Tab.Admin,
        name : "Groups and Permissions",
        finalize : function() {
            
            var _this = Pman.Tab.GroupMgr;
            if (!_this.layout) {
                return;
            }
            
            _this.layout.endUpdate(); 
            
        }
    });
    
        
});


Pman.Tab.GroupMgr = {
    grid : false,
    panel : false,
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
            this.layout, {title: "Permissions", background : true}));
        var _this = this;
        this.tab.on('activate', function() {
            //console.log('groupmgr.activate');
            //Pman.Tab.Group_Members.disableReload = true;
            Roo.log(_this.layout.getRegion('center'));
            _this.layout.getRegion('center').showPanel(0);
            Pman.Tab.Groups.refresh();
            //Pman.Tab.Group_Members.disableReload = false;
            
            //Pman.Tab.Groups.grid.getDataSource().reload();
            
        });
        this.layout.beginUpdate();
    } 
     
};