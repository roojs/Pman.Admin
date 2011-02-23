//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)



// register the module first
Pman.on('beforeload', function()
{
    Pman.register({
        modKey : '700-Pman.Tab.AdminPermManager',
        module : Pman.Tab.AdminPermManager,
        region : 'center',
        parent : Pman.Tab.Admin,
        name : "Pman.Tab.AdminPermManager",
        disabled : false, 
        permname: 'Core.Groups' 
    });
});

Pman.Tab.AdminPermManager = new Roo.util.Observable({

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
            region : 'center',
            title : "Permission Manager",
            layout : {
                xtype: 'BorderLayout',
                xns: Roo,
                center : {
                    xtype: 'LayoutRegion',
                    xns: Roo
                },
                west : {
                    xtype: 'LayoutRegion',
                    xns: Roo,
                    width : 200
                }
            }
        });
        this.layout = this.panel.layout;

    }
});
