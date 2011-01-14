//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)



// register the module first
Pman.on('beforeload', function()
{
    Pman.register({
        modKey : '001-Pman.Tab.ContactsMgr',
        module : Pman.Tab.ContactsMgr,
        region : 'center',
        parent : Pman.Tab.Admin,
        name : "Pman.Tab.AdminContactsManager",
        disabled : false, 
        permname: 'Core.Person' 
    });
});

Pman.Tab.ContactsMgr = new Roo.util.Observable({

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
            title : "Contacts Manager",
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
        });
        this.layout = this.panel.layout;

    }
});
