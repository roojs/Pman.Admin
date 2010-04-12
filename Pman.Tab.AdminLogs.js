//<script type="text/javascript"> 
       
// Auto generated file build Builder

            
       
// register the module first       
Pman.on('beforeload', function()
{

    if (Pman.Login.authUser.company_id_comptype != 'OWNER') {
        return;
    }
    
    
    if (!Pman.hasPerm('Admin.Logs', 'S')) {
        return;
    }
    
    Pman.register({
        modKey : '901-pman_tab_adminlogs',
        module : Pman.Tab.AdminLogs,
        region : 'center',
        parent : Pman,
        name : "Logs"
    });
});

Pman.Tab.AdminLogs = {
    
    panel : false,
    disabled : false,
    parentLayout:  false,

    add : function(parentLayout, region)
    {
        
        if (this.disabled) {
            return;
        }
        var _this = this;
        this.parentLayout = parentLayout;
        
        this.panel = this.parentLayout.addxtype({
            xtype : 'NestedLayoutPanel',
            background : true,
            fitToFrame : true,
            region : 'center',
            title : "Logs",
            layout : {
                xtype : 'BorderLayout',
                center : {
                    titlebar : false,
                    tabPosition : 'top'
                }
            }
        });

        this.layout = this.panel.layout;

        
        
    }
}
