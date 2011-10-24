//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)



// register the module first
Pman.on('beforeload', function()
{
    Pman.register({
        part :  ["Admin","Notify"],
        modKey : '001-Pman.Tab.AdminNotify',
        module : Pman.Tab.AdminNotify,
        region : 'center',
        parent : Pman.Tab.AdminWatchNotify,
        name : "Pman.Tab.AdminNotify",
        disabled : false, 
        permname: '' 
    });
});

Pman.Tab.AdminNotify = new Roo.util.Observable({

    panel : false,
    disabled : false,
    parentLayout:  false,

    add : function(parentLayout, region)
    {

        var _this = this;
        this.parentLayout = parentLayout;

        this.panel = parentLayout.addxtype({
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
            title : "Notifications",
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
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            listeners : {
                                render : function (_self)
                                {
                                    _this.toggleBtn = _self;
                                },
                                toggle : function (_self, pressed)
                                {
                                    _this.setText(pressed ? "Hide Completed" : "Show Completed");
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
                        dataIndex : 'act_when',
                        header : 'Act when',
                        sortable : true,
                        width : 100,
                        renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y') : ''); }
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
                             return String.format('{0}', v ? v.format('d/M/Y') : '');
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
                             return String.format('{0} <u>&lt;{1}&lt;</u>', v, r.data.email); 
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
        });
        this.layout = this.panel.layout;

    }
});
