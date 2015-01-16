//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminEnumType = {

    dialog : false,
    callback:  false,

    show : function(data, cb)
    {
        if (!this.dialog) {
            this.create();
        }

        this.callback = cb;
        this.data = data;
        this.dialog.show(this.data._el);
        if (this.form) {
           this.form.reset();
           this.form.setValues(data);
           this.form.fireEvent('actioncomplete', this.form,  { type: 'setdata', data: data });
        }

    },

    create : function()
    {
        var _this = this;
        this.dialog = Roo.factory({
            '|xns' : 'Roo',
            xtype : 'LayoutDialog',
            xns : Roo,
            items : [
            	{
                    '|xns' : 'Roo',
                    xtype : 'LayoutRegion',
                    xns : Roo,
                    title : "Edit"
                },
            	{
                    '|xns' : 'Roo',
                    xtype : 'ContentPanel',
                    xns : Roo,
                    items : [
                    	{
                            '|xns' : 'Roo.form',
                            xtype : 'Form',
                            xns : Roo.form
                        }
                    ]

                },
            	{
                    '|xns' : 'Roo',
                    xtype : 'Button',
                    text : "Save",
                    xns : Roo
                }
            ]

        });
    }
};
