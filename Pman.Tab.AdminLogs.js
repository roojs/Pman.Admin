//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)



// register the module first
Pman.on('beforeload', function()
{
    Pman.register({
        modKey : '999-Pman.Tab.AdminLogs',
        module : Pman.Tab.AdminLogs,
        region : 'center',
        parent : false,
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
