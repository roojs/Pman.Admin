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
            center
 : {
                '|xns' : 'Roo',
                xtype : 'LayoutRegion',
                xns : Roo
            },
            '|xns' : 'Roo',
            modal : true,
            width : 480,
            xtype : 'LayoutDialog',
            height : 160,
            resizable : false,
            xns : Roo,
            title : "Edit",
            buttons : [
            	 {
            	        '|xns' : 'Roo',
            	        xtype : 'Button',
            	        text : "Save",
            	        xns : Roo,
            	        listeners : {
            	        	click : function (_self, e)
            	        	   {
            	        	       //this.url = baseURL + '/Roo/Core_enum.php';
            	        	       //_this.dialog.el.mask("Saving");
            	        	       _this.form.doAction("submit");
            	        	   }
            	        }
            	    },
{
            	        '|xns' : 'Roo',
            	        xtype : 'Button',
            	        text : "Cancel",
            	        xns : Roo,
            	        listeners : {
            	        	click : function (_self, e)
            	        	   {
            	        	       _this.dialog.hide();
            	        	   }
            	        }
            	    }
            ],
            items : [
            	{
                    '|xns' : 'Roo',
                    xtype : 'ContentPanel',
                    xns : Roo,
                    region : 'center',
                    items : [
                    	{
                            '|xns' : 'Roo.form',
                            url : baseURL + '/Roo/Core_enum',
                            xtype : 'Form',
                            xns : Roo.form,
                            listeners : {
                            	actioncomplete : function (_self, action)
                            	   {
                            	       if(action.type == 'submit'){
                            	           _this.dialog.hide();
                            	           
                            	           if(_this.callback){
                            	               _this.callback.call(_this, _this.form.getValues());
                            	           }
                            	           return
                            	       }
                            	   },
                            	rendered : function (form)
                            	   {
                            	       _this.form = this;
                            	   }
                            },
                            items : [
                            	{
                                    '|xns' : 'Roo.form',
                                    name : 'name',
                                    width : 270,
                                    xtype : 'TextField',
                                    fieldLabel : 'Name',
                                    xns : Roo.form
                                },
                            	{
                                    '|xns' : 'Roo.form',
                                    name : 'id',
                                    xtype : 'Hidden',
                                    xns : Roo.form
                                },
                            	{
                                    '|xns' : 'Roo.form',
                                    name : 'etype',
                                    xtype : 'Hidden',
                                    xns : Roo.form
                                },
                            	{
                                    '|xns' : 'Roo.form',
                                    name : 'display_name',
                                    width : 270,
                                    xtype : 'TextField',
                                    fieldLabel : 'Display Name',
                                    xns : Roo.form
                                }
                            ]

                        }
                    ]

                }
            ]

        });
    }
};
