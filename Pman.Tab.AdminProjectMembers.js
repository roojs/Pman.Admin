//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)



// register the module first
Pman.on('beforeload', function()
{
    Pman.register({
        modKey : '001-Pman.Tab.AdminProjectMembers',
        module : Pman.Tab.AdminProjectMembers,
        region : '',
        parent : false,
        name : "unnamed module",
        disabled : false, 
        permname: '' 
    });
});

Pman.Tab.AdminProjectMembers = new Roo.util.Observable({

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
            title : "Person",
            fitToframe : true,
            fitContainer : true,
            tableName : 'Person',
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
                autoExpandColumn : 'name',
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
                    sortInfo : { field : 'name', direction: 'ASC' },
                    proxy : {
                        xtype: 'HttpProxy',
                        xns: Roo.data,
                        method : 'GET',
                        url : baseURL + '/Roo/Person.php'
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
                                'name': 'office_id',
                                'type': 'int'
                            },
                            {
                                'name': 'name',
                                'type': 'string'
                            },
                            {
                                'name': 'phone',
                                'type': 'string'
                            },
                            {
                                'name': 'fax',
                                'type': 'string'
                            },
                            {
                                'name': 'email',
                                'type': 'string'
                            },
                            {
                                'name': 'company_id',
                                'type': 'int'
                            },
                            {
                                'name': 'role',
                                'type': 'string'
                            },
                            {
                                'name': 'active',
                                'type': 'int'
                            },
                            {
                                'name': 'remarks',
                                'type': 'string'
                            },
                            {
                                'name': 'passwd',
                                'type': 'string'
                            },
                            {
                                'name': 'owner_id',
                                'type': 'int'
                            },
                            {
                                'name': 'lang',
                                'type': 'string'
                            },
                            {
                                'name': 'no_reset_sent',
                                'type': 'int'
                            },
                            {
                                'name': 'action_type',
                                'type': 'string'
                            },
                            {
                                'name': 'project_id',
                                'type': 'int'
                            },
                            {
                                'name': 'office_id_id',
                                'type': 'int'
                            },
                            {
                                'name': 'office_id_company_id',
                                'type': 'int'
                            },
                            {
                                'name': 'office_id_name',
                                'type': 'string'
                            },
                            {
                                'name': 'office_id_address',
                                'type': 'string'
                            },
                            {
                                'name': 'office_id_phone',
                                'type': 'string'
                            },
                            {
                                'name': 'office_id_fax',
                                'type': 'string'
                            },
                            {
                                'name': 'office_id_email',
                                'type': 'string'
                            },
                            {
                                'name': 'office_id_role',
                                'type': 'string'
                            },
                            {
                                'name': 'company_id_code',
                                'type': 'string'
                            },
                            {
                                'name': 'company_id_name',
                                'type': 'string'
                            },
                            {
                                'name': 'company_id_remarks',
                                'type': 'string'
                            },
                            {
                                'name': 'company_id_owner_id',
                                'type': 'int'
                            },
                            {
                                'name': 'company_id_address',
                                'type': 'string'
                            },
                            {
                                'name': 'company_id_tel',
                                'type': 'string'
                            },
                            {
                                'name': 'company_id_fax',
                                'type': 'string'
                            },
                            {
                                'name': 'company_id_email',
                                'type': 'string'
                            },
                            {
                                'name': 'company_id_id',
                                'type': 'int'
                            },
                            {
                                'name': 'company_id_isOwner',
                                'type': 'int'
                            },
                            {
                                'name': 'company_id_logo_id',
                                'type': 'int'
                            },
                            {
                                'name': 'company_id_background_color',
                                'type': 'string'
                            },
                            {
                                'name': 'company_id_comptype',
                                'type': 'string'
                            },
                            {
                                'name': 'company_id_url',
                                'type': 'string'
                            },
                            {
                                'name': 'company_id_main_office_id',
                                'type': 'int'
                            },
                            {
                                'name': 'company_id_created_by',
                                'type': 'int'
                            },
                            {
                                'name': 'company_id_created_dt',
                                'type': 'date'
                            },
                            {
                                'name': 'company_id_updated_by',
                                'type': 'int'
                            },
                            {
                                'name': 'company_id_updated_dt',
                                'type': 'date'
                            },
                            {
                                'name': 'company_id_passwd',
                                'type': 'string'
                            },
                            {
                                'name': 'project_id_id',
                                'type': 'int'
                            },
                            {
                                'name': 'project_id_name',
                                'type': 'string'
                            },
                            {
                                'name': 'project_id_remarks',
                                'type': 'string'
                            },
                            {
                                'name': 'project_id_owner_id',
                                'type': 'int'
                            },
                            {
                                'name': 'project_id_code',
                                'type': 'string'
                            },
                            {
                                'name': 'project_id_active',
                                'type': 'int'
                            },
                            {
                                'name': 'project_id_type',
                                'type': 'string'
                            },
                            {
                                'name': 'project_id_client_id',
                                'type': 'int'
                            },
                            {
                                'name': 'project_id_team_id',
                                'type': 'int'
                            },
                            {
                                'name': 'project_id_file_location',
                                'type': 'string'
                            },
                            {
                                'name': 'project_id_open_date',
                                'type': 'date'
                            },
                            {
                                'name': 'project_id_open_by',
                                'type': 'int'
                            },
                            {
                                'name': 'project_id_close_date',
                                'type': 'date'
                            },
                            {
                                'name': 'project_id_countries',
                                'type': 'string'
                            },
                            {
                                'name': 'project_id_languages',
                                'type': 'string'
                            },
                            {
                                'name': 'project_id_agency_id',
                                'type': 'int'
                            },
                            {
                                'name': 'owner_id_id',
                                'type': 'int'
                            },
                            {
                                'name': 'owner_id_office_id',
                                'type': 'int'
                            },
                            {
                                'name': 'owner_id_name',
                                'type': 'string'
                            },
                            {
                                'name': 'owner_id_phone',
                                'type': 'string'
                            },
                            {
                                'name': 'owner_id_fax',
                                'type': 'string'
                            },
                            {
                                'name': 'owner_id_email',
                                'type': 'string'
                            },
                            {
                                'name': 'owner_id_company_id',
                                'type': 'int'
                            },
                            {
                                'name': 'owner_id_role',
                                'type': 'string'
                            },
                            {
                                'name': 'owner_id_active',
                                'type': 'int'
                            },
                            {
                                'name': 'owner_id_remarks',
                                'type': 'string'
                            },
                            {
                                'name': 'owner_id_passwd',
                                'type': 'string'
                            },
                            {
                                'name': 'owner_id_owner_id',
                                'type': 'int'
                            },
                            {
                                'name': 'owner_id_lang',
                                'type': 'string'
                            },
                            {
                                'name': 'owner_id_no_reset_sent',
                                'type': 'int'
                            },
                            {
                                'name': 'owner_id_action_type',
                                'type': 'string'
                            },
                            {
                                'name': 'owner_id_project_id',
                                'type': 'int'
                            }
                        ]
                    }
                },
                footer : {
                    xtype: 'PagingToolbar',
                    xns: Roo,
                    pageSize : 25,
                    displayInfo : true,
                    displayMsg : 'Displaying Person{0} - {1} of {2}',
                    emptyMsg : 'No Person found'
                },
                toolbar : {
                    xtype: 'Toolbar',
                    xns: Roo,
                    items : [
                        {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            cls : 'x-btn-text-icon',
                            text : "Staff",
                            icon : Roo.rootURL + 'images/default/dd/drop-add.gif'
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
                                     Pman.genericDelete(_this, 'Person'); 
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
                        header : 'Office',
                        width : 75,
                        dataIndex : 'office_id',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Name',
                        width : 200,
                        dataIndex : 'name',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Phone',
                        width : 200,
                        dataIndex : 'phone',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Fax',
                        width : 200,
                        dataIndex : 'fax',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Email',
                        width : 200,
                        dataIndex : 'email',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Company',
                        width : 75,
                        dataIndex : 'company_id',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Role',
                        width : 200,
                        dataIndex : 'role',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Active',
                        width : 75,
                        dataIndex : 'active',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Remarks',
                        width : 200,
                        dataIndex : 'remarks',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Passwd',
                        width : 200,
                        dataIndex : 'passwd',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Owner',
                        width : 75,
                        dataIndex : 'owner_id',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Lang',
                        width : 200,
                        dataIndex : 'lang',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'No reset sent',
                        width : 75,
                        dataIndex : 'no_reset_sent',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Action type',
                        width : 200,
                        dataIndex : 'action_type',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Project',
                        width : 75,
                        dataIndex : 'project_id',
                        renderer : function(v) { return String.format('{0}', v); }
                    }
                ]
            }
        });
        this.layout = this.panel.layout;

    }
});
