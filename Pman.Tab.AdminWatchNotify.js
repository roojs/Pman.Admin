//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)



// register the module first
Pman.on('beforeload', function()
{
    Pman.register({
        part :  ["Admin","WatchNotify"],
        modKey : '001-Pman.Tab.AdminWatchNotify',
        module : Pman.Tab.AdminWatchNotify,
        region : '',
        parent : false,
        name : "unnamed module",
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
            layout : {
                xtype: 'BorderLayout',
                xns: Roo
            }
        });
        this.layout = this.panel.layout;

    }
});
