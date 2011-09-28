//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)



// register the module first
Pman.on('beforeload', function()
{
    Pman.register({
        modKey : '860-Pman.Tab.AdminWatches',
        module : Pman.Tab.AdminWatches,
        region : 'center',
        parent : Pman.Tab.Admin,
        name : "Pman.Tab.AdminWatches",
        disabled : false, 
        permname: '' 
    });
});

Pman.Tab.AdminWatches = new Roo.util.Observable({

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
            title : "core_watch",
            fitToframe : true,
            fitContainer : true,
            tableName : 'core_watch',
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
                autoExpandColumn : 'person_id_namne',
                loadMask : true,
                dataSource : {
                    xtype: 'Store',
                    xns: Roo.data,
                    remoteSort : true,
                    sortInfo : { field : 'ontable', direction: 'ASC' },
                    proxy : {
                        xtype: 'HttpProxy',
                        xns: Roo.data,
                        method : 'GET',
                        url : baseURL + '/Roo/core_watch.php'
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
                                'name': 'ontable',
                                'type': 'string'
                            },
                            {
                                'name': 'onid',
                                'type': 'int'
                            },
                            {
                                'name': 'person_id',
                                'type': 'int'
                            },
                            {
                                'name': 'event',
                                'type': 'string'
                            },
                            {
                                'name': 'medium',
                                'type': 'string'
                            },
                            {
                                'name': 'active',
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
                            }
                        ]
                    }
                },
                footer : {
                    xtype: 'PagingToolbar',
                    xns: Roo,
                    pageSize : 25,
                    displayInfo : true,
                    displayMsg : "Displaying core_watch{0} - {1} of {2}",
                    emptyMsg : "No core_watch found"
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
                                     Pman.genericDelete(_this, 'core_watch'); 
                                }
                            }
                        }
                    ]
                },
                colModel : [
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'event',
                        header : 'Watch Event',
                        width : 100,
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'ontable',
                        header : 'Watch Table',
                        width : 150,
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'onid',
                        header : 'Watch ID',
                        width : 75,
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'person_id_name',
                        header : 'Who get\'s notified',
                        width : 150,
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'medium',
                        header : 'What happens',
                        width : 200,
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Active',
                        width : 75,
                        dataIndex : 'active',
                        renderer : function(v) { return String.format('{0}', v); }
                    }
                ]
            }
        });
        this.layout = this.panel.layout;

    }
});
