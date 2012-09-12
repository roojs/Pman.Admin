//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Pman.Tab.AdminContactsGroupRight = new Roo.XComponent({
    part     :  ["Admin","ContactsGroupRight"],
    order    : '001-Pman.Tab.AdminContactsGroupRight',
    region   : 'center',
    parent   : 'Pman.Tab.AdminContactsManager',
    name     : "unnamed module",
    disabled : false, 
    permname : '', 
    _tree : function()
    {
        var _this = this;
        var MODULE = this;
        return {
            xtype: 'GridPanel',
            xns: Roo,
            region : 'center',
            title : "Rights",
            grid : {
                xtype: 'EditorGrid',
                xns: Roo.grid,
                ds : {
                    xtype: 'Store',
                    xns: Roo.data
                }
            }
        };
    }
});
