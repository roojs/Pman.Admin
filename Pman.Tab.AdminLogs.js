//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)



// register the module first
Pman.on('beforeload', function()
{
    Pman.register({
        part :  ["Admin","Logs"],
        modKey : '999-Pman.Tab.AdminLogs',
        module : Pman.Tab.AdminLogs,
        region : 'center',
        parent : Pman,
        name : "Logs",
        disabled : false, 
        permname: '' 
    });
});

Pman.Tab.AdminLogs = new Roo.util.Observable({

    panel : false,
    disabled : false,
    parentLayout:  false,

    add : function(parentLayout, region)
    {

        var _this = this;
        this.parentLayout = parentLayout;

        this.panel = parentLayout.addxtype({
            xtype: 'NestedLayoutPanel',
            xns: Roo,
            listeners : {
                activate : function (_self)
                {
                    var cr = this.layout.getRegion('center');
                    if (cr) {
                        cr.showPanel(cr.activePanel);
                    }
                }
            },
            background : true,
            fitToFrame : true,
            region : 'center',
            title : "Logs",
            layout : {
                xtype: 'BorderLayout',
                xns: Roo,
                center : {
                    xtype: 'LayoutRegion',
                    xns: Roo,
                    titlebar : false,
                    tabPosition : 'top'
                }
            }
        });
        this.layout = this.panel.layout;

    }
});
