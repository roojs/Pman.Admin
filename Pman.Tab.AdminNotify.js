//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)



// register the module first
Pman.on('beforeload', function()
{
    Pman.register({
        part :  ["Admin","Notify"],
        modKey : '001-Pman.Tab.AdminNotify',
        module : Pman.Tab.AdminNotify,
        region : '',
        parent : false,
        name : "unnamed module",
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
            title : "core_notify",
            fitToframe : true,
            fitContainer : true,
            tableName : 'core_notify',
            background : true,
            region : 'center',
            listeners : {
                activate : function() {
                    _this.panel = this;
                    if (_this.grid) {
                        _this.grid.footer.onClick('first');
                    }
                }
            },
            grid : {
                xtype: 'Grid',
                xns: Roo.grid,
                autoExpandColumn : 'ontable',
                loadMask : true,
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
                dataSource : {
                    xtype: 'Store',
                    xns: Roo.data,
                    remoteSort : true,
                    sortInfo : { field : 'ontable', direction: 'ASC' },
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
                            text : "Add",
                            cls : 'x-btn-text-icon',
                            icon : Roo.rootURL + 'images/default/dd/drop-add.gif',
                            listeners : {
                                click : function()
                                {
                                    if (!_this.dialog) return;
                                    _this.dialog.show( { id : 0 } , function() {
                                        _this.grid.footer.onClick('first');
                                   }); 
                                }
                            }
                        },
                        {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            text : "Edit",
                            cls : 'x-btn-text-icon',
                            icon : Roo.rootURL + 'images/default/tree/leaf.gif',
                            listeners : {
                                click : function()
                                {
                                    var s = _this.grid.getSelectionModel().getSelections();
                                    if (!s.length || (s.length > 1))  {
                                        Roo.MessageBox.alert("Error", s.length ? "Select only one Row" : "Select a Row");
                                        return;
                                    }
                                    if (!_this.dialog) return;
                                    _this.dialog.show(s[0].data, function() {
                                        _this.grid.footer.onClick('first');
                                    }); 
                                    
                                }
                            }
                        },
                        {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            text : "Delete",
                            cls : 'x-btn-text-icon',
                            icon : rootURL + '/Pman/templates/images/trash.gif',
                            listeners : {
                                click : function()
                                {
                                     Pman.genericDelete(_this, 'core_notify'); 
                                }
                            }
                        }
                    ]
                },
                colModel : [
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Id',
                        width : 75,
                        dataIndex : 'id',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Act when',
                        width : 75,
                        dataIndex : 'act_when',
                        renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y') : ''); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Onid',
                        width : 75,
                        dataIndex : 'onid',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Ontable',
                        width : 200,
                        dataIndex : 'ontable',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Person',
                        width : 75,
                        dataIndex : 'person_id',
                        renderer : function(v) { return String.format('{0}', v); }
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
                        header : 'Sent',
                        width : 75,
                        dataIndex : 'sent',
                        renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y') : ''); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Event',
                        width : 75,
                        dataIndex : 'event_id',
                        renderer : function(v) { return String.format('{0}', v); }
                    }
                ]
            }
        });
        this.layout = this.panel.layout;

    }
});
