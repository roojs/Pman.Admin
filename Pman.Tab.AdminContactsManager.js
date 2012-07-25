//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Pman.Tab.AdminContactsManager = new Roo.XComponent({
    part     :  ["Admin","ContactsManager"],
    order    : '060-Pman.Tab.AdminContactsManager',
    region   : 'center',
    parent   : 'Pman.Tab.Admin',
    name     : "Pman.Tab.AdminContactsManager",
    disabled : false, 
    permname : 'Core.Person', 
    _tree : function()
    {
        var _this = this;
        var MODULE = this;
        return {
            xtype: 'NestedLayoutPanel',
            xns: Roo,
            background : true,
            region : 'center',
            title : (function() {
                return _this.title || "Contacts Manager";
            })(),
            layout : {
                xtype: 'BorderLayout',
                xns: Roo,
                west : {
                    xtype: 'LayoutRegion',
                    xns: Roo,
                    split : true,
                    width : 250
                },
                center : {
                    xtype: 'LayoutRegion',
                    xns: Roo,
                    tabPosition : 'top'
                }
            }
        };
    }
});
