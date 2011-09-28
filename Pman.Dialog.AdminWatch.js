//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Pman.Dialog.AdminWatch = {

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
            closable : false,
            collapsible : false,
            height : 230,
            resizable : false,
            title : "Edit / Create core_watch",
            width : 500,
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
                                       //this.load({ method: 'GET', params: { '_id' : _this.data.id }});
                                       return;
                                    }
                                    if (action.type == 'load') {
                                        _this.dialog.el.unmask();
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
                            method : 'POST',
                            style : 'margin:10px;',
                            url : baseURL + '/Roo/core_watch.php',
                            items : [
                                {
                                    xtype: 'ComboBox',
                                    xns: Roo.form,
                                    listeners : {
                                        select : function (combo, record, index)
                                        {
                                          _this.grid.footer.onClick('first');
                                        },
                                        render : function (_self)
                                        {
                                          _this.affectSel = _self;
                                        }
                                    },
                                    allowBlank : true,
                                    displayField : 'on_table',
                                    editable : false,
                                    emptyText : "Select Table",
                                    fieldLabel : 'Table',
                                    forceSelection : true,
                                    listWidth : 300,
                                    loadingText : "Searching...",
                                    minChars : 2,
                                    name : 'ontable',
                                    pageSize : 20,
                                    qtip : "Select Action",
                                    queryParam : 'query[on_table]',
                                    selectOnFocus : true,
                                    tpl : '<div class="x-grid-cell-text x-btn button"><b>{on_table}</b> </div>',
                                    triggerAction : 'all',
                                    typeAhead : true,
                                    valueField : 'action',
                                    width : 150,
                                    store : {
                                        xtype: 'Store',
                                        xns: Roo.data,
                                        listeners : {
                                            beforeload : function (_self, o)
                                            {
                                                o.params = o.params || {};
                                                // staff can see all logs, other companies can only see their own.
                                                if (Pman.Login.authUser.company_id_comptype != 'OWNER') {
                                                    o.params.company_id = Pman.Login.authUser.company_id;
                                                }
                                                o.params._distinct = 'on_table';
                                                o.params._columns ='on_table';
                                            }
                                        },
                                        remoteSort : true,
                                        sortInfo : { field : 'on_table' , direction : 'ASC' },
                                        proxy : {
                                            xtype: 'HttpProxy',
                                            xns: Roo.data,
                                            method : 'GET',
                                            url : baseURL + '/Roo/Events.php'
                                        },
                                        reader : {
                                            xtype: 'JsonReader',
                                            xns: Roo.data,
                                            totalProperty : 'total',
                                            root : 'data',
                                            id : 'id',
                                            fields : [
                                                {
                                                    'name': 'id',
                                                    'type': 'int'
                                                },
                                                {
                                                    'name': 'person_name',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'event_when',
                                                    'type': 'date',
                                                    'dateFormat': 'Y-m-d'
                                                },
                                                {
                                                    'name': 'action',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'ipaddr',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'on_id',
                                                    'type': 'int'
                                                },
                                                {
                                                    'name': 'on_table',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'person_id',
                                                    'type': 'int'
                                                },
                                                {
                                                    'name': 'remarks',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'person_id_id',
                                                    'type': 'int'
                                                },
                                                {
                                                    'name': 'person_id_office_id',
                                                    'type': 'int'
                                                },
                                                {
                                                    'name': 'person_id_name',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'person_id_phone',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'person_id_fax',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'person_id_email',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'person_id_company_id',
                                                    'type': 'int'
                                                },
                                                {
                                                    'name': 'person_id_role',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'person_id_active',
                                                    'type': 'int'
                                                },
                                                {
                                                    'name': 'person_id_remarks',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'person_id_passwd',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'person_id_owner_id',
                                                    'type': 'int'
                                                },
                                                {
                                                    'name': 'person_id_lang',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'person_id_no_reset_sent',
                                                    'type': 'int'
                                                },
                                                {
                                                    'name': 'person_id_action_type',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'person_id_project_id',
                                                    'type': 'int'
                                                },
                                                {
                                                    'name': 'person_id_deleted_by',
                                                    'type': 'int'
                                                },
                                                {
                                                    'name': 'person_id_deleted_dt',
                                                    'type': 'date'
                                                }
                                            ]
                                        }
                                    }
                                },
                                {
                                    xtype: 'NumberField',
                                    xns: Roo.form,
                                    fieldLabel : 'ID',
                                    name : 'onid',
                                    width : 75
                                },
                                {
                                    xtype: 'ComboBox',
                                    xns: Roo.form,
                                    allowBlank : 'false',
                                    displayField : 'name',
                                    editable : 'false',
                                    emptyText : "Select Person",
                                    fieldLabel : 'Notify Who',
                                    forceSelection : true,
                                    hiddenName : 'person_id',
                                    listWidth : 400,
                                    loadingText : "Searching...",
                                    minChars : 2,
                                    name : 'person_id_name',
                                    pageSize : 20,
                                    qtip : "Select Person",
                                    queryParam : 'query[name]',
                                    selectOnFocus : true,
                                    tpl : '<div class="x-grid-cell-text x-btn button"><b>{name}</b> </div>',
                                    triggerAction : 'all',
                                    typeAhead : true,
                                    valueField : 'id',
                                    width : 300,
                                    store : {
                                        xtype: 'Store',
                                        xns: Roo.data,
                                        remoteSort : true,
                                        sortInfo : { direction : 'ASC', field: 'id' },
                                        listeners : {
                                            beforeload : function (_self, o){
                                                o.params = o.params || {};
                                                // set more here
                                            }
                                        },
                                        proxy : {
                                            xtype: 'HttpProxy',
                                            xns: Roo.data,
                                            method : 'GET',
                                            url : baseURL + '/Roo/Person.php'
                                        },
                                        reader : {
                                            xtype: 'JsonReader',
                                            xns: Roo.data,
                                            id : 'id',
                                            root : 'data',
                                            totalProperty : 'total',
                                            fields : [{"name":"id","type":"int"},{"name":"name","type":"string"}]
                                        }
                                    }
                                },
                                {
                                    xtype: 'ComboBox',
                                    xns: Roo.form,
                                    listeners : {
                                        select : function (combo, record, index)
                                        {
                                          _this.grid.footer.onClick('first');
                                        },
                                        render : function (_self)
                                        {
                                          _this.actionSel = _self;
                                        }
                                    },
                                    allowBlank : true,
                                    displayField : 'action',
                                    editable : true,
                                    emptyText : "Select Action",
                                    fieldLabel : 'Match Event',
                                    forceSelection : false,
                                    listWidth : 300,
                                    loadingText : "Searching...",
                                    minChars : 2,
                                    name : 'event',
                                    pageSize : 20,
                                    qtip : "Select Action",
                                    queryParam : 'query[action]',
                                    selectOnFocus : true,
                                    tpl : '<div class="x-grid-cell-text x-btn button"><b>{action}</b> </div>',
                                    triggerAction : 'all',
                                    typeAhead : true,
                                    valueField : 'action',
                                    width : 150,
                                    store : {
                                        xtype: 'Store',
                                        xns: Roo.data,
                                        listeners : {
                                            beforeload : function (_self, o)
                                            {
                                                o.params = o.params || {};
                                                // staff can see all logs, other companies can only see their own.
                                                if (Pman.Login.authUser.company_id_comptype != 'OWNER') {
                                                    o.params.company_id = Pman.Login.authUser.company_id;
                                                }
                                                o.params._distinct = 'action';
                                                o.params._columns ='action';
                                            }
                                        },
                                        remoteSort : true,
                                        sortInfo : { field : 'action' , direction : 'ASC' },
                                        proxy : {
                                            xtype: 'HttpProxy',
                                            xns: Roo.data,
                                            method : 'GET',
                                            url : baseURL + '/Roo/Events.php'
                                        },
                                        reader : {
                                            xtype: 'JsonReader',
                                            xns: Roo.data,
                                            totalProperty : 'total',
                                            root : 'data',
                                            id : 'id',
                                            fields : [
                                                {
                                                    'name': 'id',
                                                    'type': 'int'
                                                },
                                                {
                                                    'name': 'person_name',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'event_when',
                                                    'type': 'date',
                                                    'dateFormat': 'Y-m-d'
                                                },
                                                {
                                                    'name': 'action',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'ipaddr',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'on_id',
                                                    'type': 'int'
                                                },
                                                {
                                                    'name': 'on_table',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'person_id',
                                                    'type': 'int'
                                                },
                                                {
                                                    'name': 'remarks',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'person_id_id',
                                                    'type': 'int'
                                                },
                                                {
                                                    'name': 'person_id_office_id',
                                                    'type': 'int'
                                                },
                                                {
                                                    'name': 'person_id_name',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'person_id_phone',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'person_id_fax',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'person_id_email',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'person_id_company_id',
                                                    'type': 'int'
                                                },
                                                {
                                                    'name': 'person_id_role',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'person_id_active',
                                                    'type': 'int'
                                                },
                                                {
                                                    'name': 'person_id_remarks',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'person_id_passwd',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'person_id_owner_id',
                                                    'type': 'int'
                                                },
                                                {
                                                    'name': 'person_id_lang',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'person_id_no_reset_sent',
                                                    'type': 'int'
                                                },
                                                {
                                                    'name': 'person_id_action_type',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'person_id_project_id',
                                                    'type': 'int'
                                                },
                                                {
                                                    'name': 'person_id_deleted_by',
                                                    'type': 'int'
                                                },
                                                {
                                                    'name': 'person_id_deleted_dt',
                                                    'type': 'date'
                                                }
                                            ]
                                        }
                                    }
                                },
                                {
                                    xtype: 'ComboBox',
                                    xns: Roo.form,
                                    allowBlank : false,
                                    alwaysQuery : true,
                                    displayField : 'val',
                                    editable : false,
                                    fieldLabel : 'Action',
                                    listWidth : 200,
                                    name : 'medium',
                                    triggerAction : 'all',
                                    valueField : 'val',
                                    width : 200,
                                    store : {
                                        xtype: 'SimpleStore',
                                        xns: Roo.data,
                                        data : [ [ 'email' ], [ 'APPROVAL' ] ],
                                        fields : [ 'val' ]
                                    }
                                },
                                {
                                    xtype: 'TextField',
                                    xns: Roo.form,
                                    fieldLabel : 'Action',
                                    name : 'medium',
                                    width : 200
                                },
                                {
                                    xtype: 'Checkbox',
                                    xns: Roo.form,
                                    fieldLabel : 'Active?',
                                    name : 'active'
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
                             
                            
                            _this.dialog.el.mask("Saving");
                            _this.form.doAction("submit");
                        
                        }
                    },
                    text : "Save"
                }
            ]
        });
    }
};
