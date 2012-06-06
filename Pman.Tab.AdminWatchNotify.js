//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Pman.Tab.AdminWatchNotify = new Roo.XComponent({
    part     :  ["Admin","WatchNotify"],
    order    : '860-Pman.Tab.AdminWatchNotify',
    region   : 'center',
    parent   : 'Pman.Tab.Admin',
    name     : "Notifications",
    disabled : false, 
    permname : '', 
    _tree : function()
    {
        var _this = this;
        var MODULE = this;
        return {
            xtype: 'NestedLayoutPanel',
            xns: Roo,
            background : true,
            region : 'center',
            title : "Notifications ",
            layout : {
                xtype: 'BorderLayout',
                xns: Roo,
                center : {
                    xtype: 'LayoutRegion',
                    xns: Roo,
                    tabPosition : 'top'
                }
            }
        };
    }
});
