//<script type="text/javascript">

// Groupmanager 
// left - list of groups.
// right - Permissions | Members..
Pman.on('beforeload', function()
{
 
 
    Pman.register({
        part :  ["Admin","StaffManager"],
        modKey : '020-pman-tab-staffmgr',
        module : Pman.Tab.StaffMgr,
        region : 'center',
        parent : Pman.Tab.Admin,
        name : "Staff Manager",
        permname : 'Admin.Teams',
        finalize : function() {
            
            var _this = Pman.Tab.StaffMgr;
            if (!_this.layout) {
                return;
            }
            
            _this.layout.endUpdate(); 
            
        }
    });
    
});

Pman.Tab.StaffMgr = {
    grid : false,
    panel : false,
    title: false,
    add : function(parentLayout, region) {
        
        Roo.log('StaffMgr add called!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        
        var _this = this;
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
        
        Roo.log(parentLayout);
        Roo.log(region);
        Roo.log(this);
        
        this.tab = parentLayout.add(region,  new Ext.NestedLayoutPanel(
            this.layout, {title: this.title || "Staff / Teams", background: true}));
        
        this.tab.on('activate', function() {
            _this.layout.getRegion('center').showPanel(0);
            
            if (_this.layout.getRegion('west').panels.length) {
                _this.layout.getRegion('west').showPanel(0); // forces a refresh..
                Pman.Tab.Teams.refresh();
              // Pman.Tab.Teams.refresh();
            } else {
                 Pman.Tab.PersonStaff.loadFirst();
                
            }
            
            
        });
        this.layout.beginUpdate();

    }  
};