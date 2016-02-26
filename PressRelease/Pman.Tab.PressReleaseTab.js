//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)



// register the module first
Pman.on('beforeload', function()
{
    Pman.register({
        modKey : '001-Pman.Tab.PressReleaseTab',
        module : Pman.Tab.PressReleaseTab,
        region : 'center',
        parent : Pman,
        name : "Press Release Tab",
        disabled : false, 
        permname: 'PressRelease.MainTab' 
    });
});

Pman.Tab.PressReleaseTab = new Roo.util.Observable({

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
            title : "Press Releases",
            layout : {
                xtype: 'BorderLayout',
                xns: Roo,
                west : {
                    xtype: 'LayoutRegion',
                    xns: Roo,
                    titlebar : false,
                    split : true,
                    width : '200'
                },
                center : {
                    xtype: 'LayoutRegion',
                    xns: Roo,
                    alwaysShowTabs : true,
                    tabPosition : 'top',
                    titlebar : false
                }
            }
        });
        this.layout = this.panel.layout;

    }
});
