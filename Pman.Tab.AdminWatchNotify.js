//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)



// register the module first
Pman.on('beforeload', function()
{
    Pman.register({
        part :  ["Admin","WatchNotify"],
        modKey : '860-Pman.Tab.AdminWatchNotify',
        module : Pman.Tab.AdminWatchNotify,
        region : 'center',
        parent : Pman.Tab.Admin,
        name : "Notifications",
        disabled : false, 
        permname: '' 
    });
});

Pman.Tab.AdminWatchNotify = new Roo.util.Observable({

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
            region : 'center',
            title : "Notifications",
            layout : {
                xtype: 'BorderLayout',
                xns: Roo,
                center : {
                    xtype: 'LayoutRegion',
                    xns: Roo,
                    tabPosition : 'top'
                }
            }
        });
        this.layout = this.panel.layout;

    }
});
