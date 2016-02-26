//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Pman.Dialog.PressReleaseCategory = {

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
            xtype: 'LayoutDialog',
            xns: Roo,
            listeners : {
                show : function (_self)
                {
                    (function() {_this.form.findField('name').focus(); }).defer(100);
                }
            },
            closable : false,
            collapsible : false,
            height : 150,
            modal : true,
            resizable : false,
            title : "Edit / Create Category",
            width : 400,
            items : [
                {
                    xtype: 'ContentPanel',
                    xns: Roo,
                    region : 'center',
                    items : [
                        {
                            xtype: 'Form',
                            xns: Roo.form,
                            listeners : {
                                actioncomplete : function(_self,action)
                                {
                                    if (action.type == 'setdata') {
                                       //_this.dialog.el.mask("Loading");
                                       if (_this.data.id) {
                                           this.load({ method: 'GET', params: { '_id' : _this.data.id }});
                                       }
                                       _this.data._nohead = _this.data._nohead || false;
                                       
                                       var he = this.findField('hgroup');
                                       he.actionMode = 'fieldEl';
                                       
                                       he[_this.data._nohead ? 'hide' : 'show'](); 
                                       
                                       
                                       
                                       return;
                                    }
                                    if (action.type == 'load') {
                                        
                                        return;
                                    }
                                    if (action.type =='submit') {
                                    
                                 
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
                            method : 'POST',
                            style : 'margin:10px;',
                            url : baseURL + '/Roo/Pressrelease_category.php',
                            items : [
                                {
                                    xtype: 'TextField',
                                    xns: Roo.form,
                                    fieldLabel : 'Heading Group',
                                    name : 'hgroup',
                                    width : 250
                                },
                                {
                                    xtype: 'TextField',
                                    xns: Roo.form,
                                    fieldLabel : 'Name',
                                    name : 'name',
                                    width : 250
                                },
                                {
                                    xtype: 'Hidden',
                                    xns: Roo.form,
                                    name : 'parent_id'
                                },
                                {
                                    xtype: 'Hidden',
                                    xns: Roo.form,
                                    name : 'id'
                                }
                            ]
                        }
                    ]
                }
            ],
            center : {
                xtype: 'LayoutRegion',
                xns: Roo
            },
            buttons : [
                {
                    xtype: 'Button',
                    xns: Roo,
                    listeners : {
                        click : function (_self, e)
                        {
                            _this.dialog.hide();
                        }
                    },
                    text : "Cancel"
                },
                {
                    xtype: 'Button',
                    xns: Roo,
                    listeners : {
                        click : function (_self, e)
                        {
                            // do some checks?
                             
                            
                         
                            _this.form.doAction("submit");
                        
                        }
                    },
                    text : "Save"
                }
            ]
        });
    }
};
