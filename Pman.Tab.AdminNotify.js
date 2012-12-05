//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Pman.Tab.AdminNotify = new Roo.XComponent({
    part     :  ["Admin","Notify"],
    order    : '001-Pman.Tab.AdminNotify',
    region   : 'center',
    parent   : 'Pman.Tab.AdminWatchNotify',
    name     : "Pman.Tab.AdminNotify",
    disabled : false, 
    permname : '', 
    _tree : function()
    {
        var _this = this;
        var MODULE = this;
        return {
            xtype: 'GridPanel',
            xns: Roo,
            listeners : {
                activate : function() {
                    _this.panel = this;
                    if (_this.grid) {
                        _this.grid.footer.onClick('first');
                    }
                    
                }
            },
            background : true,
            fitContainer : true,
            fitToframe : true,
            region : 'center',
            tableName : 'core_notify',
            title : "Current Notifications",
            grid : {
                xtype: 'Grid',
                xns: Roo.grid,
                listeners : {
                    render : function() 
                    {
                        _this.grid = this; 
                        //_this.dialog = Pman.Dialog.FILL_IN
                        if (_this.panel.active) {
                           this.footer.onClick('first');
                        }
                    },
                    rowdblclick : function (_self, rowIndex, e)
                    {
                        if (!_this.dialog) return;
                        _this.dialog.show( this.getDataSource().getAt(rowIndex), function() {
                            _this.grid.footer.onClick('first');
                        }); 
                    }
                },
                autoExpandColumn : 'person_id_name',
                loadMask : true,
                dataSource : {
                    xtype: 'Store',
                    xns: Roo.data,
                    listeners : {
                        beforeload : function (_self, options)
                        {
                            if (!_this.toggleBtn.pressed) {
                                options.params['event_id'] = 0;
                            }
                        }
                    },
                    remoteSort : true,
                    sortInfo : { field : 'act_when', direction: 'DESC' },
                    proxy : {
                        xtype: 'HttpProxy',
                        xns: Roo.data,
                        method : 'GET',
                        url : baseURL + '/Roo/core_notify.php'
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
                                'name': 'act_when',
                                'type': 'date',
                                'dateFormat': 'Y-m-d'
                            },
                            {
                                'name': 'onid',
                                'type': 'int'
                            },
                            {
                                'name': 'ontable',
                                'type': 'string'
                            },
                            {
                                'name': 'person_id',
                                'type': 'int'
                            },
                            {
                                'name': 'msgid',
                                'type': 'string'
                            },
                            {
                                'name': 'sent',
                                'type': 'date',
                                'dateFormat': 'Y-m-d'
                            },
                            {
                                'name': 'event_id',
                                'type': 'int'
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
                            },
                            {
                                'name': 'event_id_id',
                                'type': 'int'
                            },
                            {
                                'name': 'event_id_person_name',
                                'type': 'string'
                            },
                            {
                                'name': 'event_id_event_when',
                                'type': 'date'
                            },
                            {
                                'name': 'event_id_action',
                                'type': 'string'
                            },
                            {
                                'name': 'event_id_ipaddr',
                                'type': 'string'
                            },
                            {
                                'name': 'event_id_on_id',
                                'type': 'int'
                            },
                            {
                                'name': 'event_id_on_table',
                                'type': 'string'
                            },
                            {
                                'name': 'event_id_person_id',
                                'type': 'int'
                            },
                            {
                                'name': 'event_id_remarks',
                                'type': 'string'
                            }
                        ]
                    }
                },
                footer : {
                    xtype: 'PagingToolbar',
                    xns: Roo,
                    pageSize : 25,
                    displayInfo : true,
                    displayMsg : "Displaying core_notify{0} - {1} of {2}",
                    emptyMsg : "No core_notify found"
                },
                toolbar : {
                    xtype: 'Toolbar',
                    xns: Roo,
                    items : [
                        {
                            xtype: 'ComboBox',
                            xns: Roo.form,
                            allowBlank : false,
                            displayField : 'person_id_name',
                            editable : false,
                            emptyText : "Select person",
                            forceSelection : true,
                            hiddenName : 'id',
                            listWidth : 400,
                            loadingText : "Searching...",
                            minChars : 2,
                            name : 'name',
                            pageSize : 20,
                            qtip : "Select core_notify",
                            queryParam : 'query[person_id_name]',
                            selectOnFocus : true,
                            tpl : '<div class="x-grid-cell-text x-btn button"><b>{person_id_name}</b> {person_id_email}</div>',
                            triggerAction : 'all',
                            typeAhead : true,
                            valueField : 'person_id',
                            width : 300,
                            store : {
                                xtype: 'Store',
                                xns: Roo.data,
                                listeners : {
                                    beforeload : function (_self, o){
                                        o.params = o.params || {};
                                        o.params._distinct='person_id,person_id_name';
                                        o.params._columns='person_id,person_id_name';
                                        o.params['!person_id_name'] = '';
                                        
                                        // set more here
                                    }
                                },
                                remoteSort : true,
                                sortInfo : { direction : 'ASC', field: 'person_id_name' },
                                proxy : {
                                    xtype: 'HttpProxy',
                                    xns: Roo.data,
                                    method : 'GET',
                                    url : baseURL + '/Roo/core_notify.php'
                                },
                                reader : {
                                    xtype: 'JsonReader',
                                    xns: Roo.data,
                                    id : 'id',
                                    root : 'data',
                                    totalProperty : 'total',
                                    fields : [{"name":"id","type":"int"},{"name":"ontable","type":"string"}]
                                }
                            }
                        },
                        {
                            xtype: 'Fill',
                            xns: Roo.Toolbar
                        },
                        {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            listeners : {
                                render : function (_self)
                                {
                                    _this.toggleBtn = _self;
                                },
                                toggle : function (_self, pressed)
                                {
                                    this.setText(pressed ? "Hide Completed" : "Show Completed");
                                    _this.grid.footer.onClick('first');
                                }
                            },
                            enableToggle : true,
                            text : "Show Completed"
                        }
                    ]
                },
                colModel : [
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'id',
                        header : 'id#',
                        sortable : true,
                        width : 50,
                        renderer : function(v) { return String.format('{0}', v ); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'evtype',
                        header : 'Method',
                        sortable : true,
                        width : 100,
                        renderer : function(v) { return String.format('{0}', v ); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'act_when',
                        header : 'Act when',
                        sortable : true,
                        width : 100,
                        renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y H:i:s') : ''); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'sent',
                        header : 'Sent',
                        sortable : true,
                        width : 100,
                        renderer : function(v,x,r) {
                            if (r.data.event_id *1 == 0) {
                                return '';
                            }
                             return String.format('{0}', v ? v.format('d/M/Y H:i:s') : '');
                          }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'ontable',
                        header : 'Ontable',
                        width : 100,
                        renderer : function(v,x,r) { return String.format('{0}:{1}', v,r.data.onid); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'person_id_name',
                        header : 'Who to notify',
                        width : 200,
                        renderer : function(v,x,r) {
                             return String.format('{0} <u>&lt;{1}&gt;</u>', v, r.data.person_id_email); 
                         }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Msgid',
                        width : 200,
                        dataIndex : 'msgid',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'event_id_remarks',
                        header : 'Event',
                        width : 300,
                        renderer : function(v) { return String.format('{0}', v); }
                    }
                ]
            }
        };
    }
});
