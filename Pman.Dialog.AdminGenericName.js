//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminGenericName = {

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
            center : {
                '|xns' : 'Roo',
                xtype : 'LayoutRegion',
                xns : Roo
            },
            '|xns' : 'Roo',
            modal : true,
            collapsible : false,
            title : "Edit",
            xtype : 'LayoutDialog',
            width : 400,
            xns : Roo,
            closable : false,
            resizable : false,
            height : 120,
            buttons : [
            	 {
            	        '|xns' : 'Roo',
            	        text : "Cancel",
            	        xtype : 'Button',
            	        xns : Roo,
            	        listeners : {
            	        	click : function (_self, e)
            	        	   {
            	        	       _this.dialog.hide();
            	        	   }
            	        }
            	    },
{
            	        '|xns' : 'Roo',
            	        text : "Save",
            	        xtype : 'Button',
            	        xns : Roo,
            	        listeners : {
            	        	click : function (_self, e)
            	        	   {
            	        	       // do some checks?
            	        	        
            	        	        this.url = baseURL + '/Roo/' + _this.data._table;
            	        	       _this.dialog.el.mask("Saving");
            	        	       _this.form.doAction("submit");
            	        	   
            	        	   }
            	        }
            	    }
            ],
            items : [
            	{
                    '|xns' : 'Roo',
                    region : 'center',
                    xtype : 'ContentPanel',
                    xns : Roo,
                    items : [
                    	{
                            '|xns' : 'Roo.form',
                            url : baseURL + '/Roo/core_company_type.php',
                            style : 'margin:10px;',
                            method : 'POST',
                            xtype : 'Form',
                            labelWidth : 50,
                            xns : Roo.form,
                            listeners : {
                            	actioncomplete : function(_self,action)
                            	   {
                            	       if (action.type == 'setdata') {
                            	          //_this.dialog.el.mask("Loading");
                            	          this.url = baseURL + '/Roo/' + _this.data._table;
                            	          _this.dialog.setTitle(_this.data._title);
                            	          this.load({ 
                            	               method: 'GET', 
                            	               params: { '_id' : _this.data.id },
                            	               url : this.url
                            	           });
                            	          return;
                            	       }
                            	       if (action.type == 'load') {
                            	           _this.dialog.el.unmask();
                            	           _this.form.findField('name').focus();
                            	           return;
                            	       }
                            	       if (action.type =='submit') {
                            	       
                            	           _this.dialog.el.unmask();
                            	           _this.dialog.hide();
                            	       
                            	            if (_this.callback) {
                            	               _this.callback.call(_this, _this.form.getValues());
                            	            }
                            	            _this.form.reset();
                            	            return;
                            	       }
                            	   },
                            	rendered : function (form)
                            	   {
                            	       _this.form= form;
                            	   }
                            },
                            items : [
                            	{
                                    '|xns' : 'Roo.form',
                                    fieldLabel : 'Name',
                                    xtype : 'TextField',
                                    width : 270,
                                    xns : Roo.form,
                                    name : 'name',
                                    listeners : {
                                    	specialkey : function (_self, e)
                                    	   {
                                    	       if (e.getKey() == 13) {
                                    	            _this.dialog.el.mask("Saving");
                                    	            _this.form.doAction("submit");
                                    	       }
                                    	   }
                                    }
                                },
                            	{
                                    '|xns' : 'Roo.form',
                                    xtype : 'Hidden',
                                    xns : Roo.form,
                                    name : 'id'
                                }
                            ]

                        }
                    ]

                }
            ]

        });
    }
};
