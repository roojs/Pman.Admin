//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)



// register the module first
Pman.on('beforeload', function()
{
    Pman.register({
        modKey : '950-Pman.Tab.AdminTranslations',
        module : Pman.Tab.AdminTranslations,
        region : 'center',
        parent : Pman.Tab.Admin,
        name : "Admin - Translations",
        disabled : false, 
        permname: 'Admin.Translations' 
    });
});

Pman.Tab.AdminTranslations = new Roo.util.Observable({

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
            region : 'center'
        });
        this.layout = this.panel.layout;

    }
});
