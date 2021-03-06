//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)



// register the module first
Pman.on('beforeload', function()
{
    Pman.register({
        modKey : '001-Pman.Tab.AdminPermProjects',
        module : Pman.Tab.AdminPermProjects,
        region : 'center',
        parent : Pman.Tab.AdminPermManager,
        name : "Pman.Tab.AdminPermProjects",
        disabled : false, 
        permname: '' 
    });
});

Pman.Tab.AdminPermProjects = new Roo.util.Observable({

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
            title : "Projects",
            fitToframe : true,
            fitContainer : true,
            tableName : 'Projects',
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
                toolbar : {
                    xtype: 'Toolbar',
                    xns: Roo,
                    items : [
                        {
                            xtype: 'Fill',
                            xns: Roo.Toolbar
                        },
                        {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            enableToggle : true,
                            text : "Hide Closed Projects"
                        }
                    ]
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
                        url : baseURL + '/Roo/core_project.php'
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
                                'name': 'name',
                                'type': 'string'
                            },
                            {
                                'name': 'remarks',
                                'type': 'string'
                            },
                            {
                                'name': 'owner_id',
                                'type': 'int'
                            },
                            {
                                'name': 'code',
                                'type': 'string'
                            },
                            {
                                'name': 'active',
                                'type': 'int'
                            },
                            {
                                'name': 'type',
                                'type': 'string'
                            },
                            {
                                'name': 'client_id',
                                'type': 'int'
                            },
                            {
                                'name': 'team_id',
                                'type': 'int'
                            },
                            {
                                'name': 'file_location',
                                'type': 'string'
                            },
                            {
                                'name': 'open_date',
                                'type': 'date',
                                'dateFormat': 'Y-m-d'
                            },
                            {
                                'name': 'open_by',
                                'type': 'int'
                            },
                            {
                                'name': 'close_date',
                                'type': 'date',
                                'dateFormat': 'Y-m-d'
                            },
                            {
                                'name': 'countries',
                                'type': 'string'
                            },
                            {
                                'name': 'languages',
                                'type': 'string'
                            },
                            {
                                'name': 'agency_id',
                                'type': 'int'
                            },
                            {
                                'name': 'client_id_code',
                                'type': 'string'
                            },
                            {
                                'name': 'client_id_name',
                                'type': 'string'
                            },
                            {
                                'name': 'client_id_remarks',
                                'type': 'string'
                            },
                            {
                                'name': 'client_id_owner_id',
                                'type': 'int'
                            },
                            {
                                'name': 'client_id_address',
                                'type': 'string'
                            },
                            {
                                'name': 'client_id_tel',
                                'type': 'string'
                            },
                            {
                                'name': 'client_id_fax',
                                'type': 'string'
                            },
                            {
                                'name': 'client_id_email',
                                'type': 'string'
                            },
                            {
                                'name': 'client_id_id',
                                'type': 'int'
                            },
                            {
                                'name': 'client_id_isOwner',
                                'type': 'int'
                            },
                            {
                                'name': 'client_id_logo_id',
                                'type': 'int'
                            },
                            {
                                'name': 'client_id_background_color',
                                'type': 'string'
                            },
                            {
                                'name': 'client_id_comptype',
                                'type': 'string'
                            },
                            {
                                'name': 'client_id_url',
                                'type': 'string'
                            },
                            {
                                'name': 'client_id_main_office_id',
                                'type': 'int'
                            },
                            {
                                'name': 'client_id_created_by',
                                'type': 'int'
                            },
                            {
                                'name': 'client_id_created_dt',
                                'type': 'date'
                            },
                            {
                                'name': 'client_id_updated_by',
                                'type': 'int'
                            },
                            {
                                'name': 'client_id_updated_dt',
                                'type': 'date'
                            },
                            {
                                'name': 'client_id_passwd',
                                'type': 'string'
                            },
                            {
                                'name': 'agency_id_code',
                                'type': 'string'
                            },
                            {
                                'name': 'agency_id_name',
                                'type': 'string'
                            },
                            {
                                'name': 'agency_id_remarks',
                                'type': 'string'
                            },
                            {
                                'name': 'agency_id_owner_id',
                                'type': 'int'
                            },
                            {
                                'name': 'agency_id_address',
                                'type': 'string'
                            },
                            {
                                'name': 'agency_id_tel',
                                'type': 'string'
                            },
                            {
                                'name': 'agency_id_fax',
                                'type': 'string'
                            },
                            {
                                'name': 'agency_id_email',
                                'type': 'string'
                            },
                            {
                                'name': 'agency_id_id',
                                'type': 'int'
                            },
                            {
                                'name': 'agency_id_isOwner',
                                'type': 'int'
                            },
                            {
                                'name': 'agency_id_logo_id',
                                'type': 'int'
                            },
                            {
                                'name': 'agency_id_background_color',
                                'type': 'string'
                            },
                            {
                                'name': 'agency_id_comptype',
                                'type': 'string'
                            },
                            {
                                'name': 'agency_id_url',
                                'type': 'string'
                            },
                            {
                                'name': 'agency_id_main_office_id',
                                'type': 'int'
                            },
                            {
                                'name': 'agency_id_created_by',
                                'type': 'int'
                            },
                            {
                                'name': 'agency_id_created_dt',
                                'type': 'date'
                            },
                            {
                                'name': 'agency_id_updated_by',
                                'type': 'int'
                            },
                            {
                                'name': 'agency_id_updated_dt',
                                'type': 'date'
                            },
                            {
                                'name': 'agency_id_passwd',
                                'type': 'string'
                            },
                            {
                                'name': 'team_id_id',
                                'type': 'int'
                            },
                            {
                                'name': 'team_id_name',
                                'type': 'string'
                            },
                            {
                                'name': 'team_id_type',
                                'type': 'int'
                            },
                            {
                                'name': 'team_id_leader',
                                'type': 'int'
                            },
                            {
                                'name': 'open_by_id',
                                'type': 'int'
                            },
                            {
                                'name': 'open_by_office_id',
                                'type': 'int'
                            },
                            {
                                'name': 'open_by_name',
                                'type': 'string'
                            },
                            {
                                'name': 'open_by_phone',
                                'type': 'string'
                            },
                            {
                                'name': 'open_by_fax',
                                'type': 'string'
                            },
                            {
                                'name': 'open_by_email',
                                'type': 'string'
                            },
                            {
                                'name': 'open_by_company_id',
                                'type': 'int'
                            },
                            {
                                'name': 'open_by_role',
                                'type': 'string'
                            },
                            {
                                'name': 'open_by_active',
                                'type': 'int'
                            },
                            {
                                'name': 'open_by_remarks',
                                'type': 'string'
                            },
                            {
                                'name': 'open_by_passwd',
                                'type': 'string'
                            },
                            {
                                'name': 'open_by_owner_id',
                                'type': 'int'
                            },
                            {
                                'name': 'open_by_lang',
                                'type': 'string'
                            },
                            {
                                'name': 'open_by_no_reset_sent',
                                'type': 'int'
                            },
                            {
                                'name': 'open_by_action_type',
                                'type': 'string'
                            },
                            {
                                'name': 'open_by_project_id',
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
                    displayMsg : 'Displaying Projects{0} - {1} of {2}',
                    emptyMsg : 'No Projects found'
                },
                colModel : [
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'is_member',
                        header : 'Is member',
                        width : 75,
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Name',
                        width : 200,
                        dataIndex : 'name',
                        renderer : function(v) { return String.format('{0}', v); }
                    }
                ]
            }
        });
        this.layout = this.panel.layout;

    }
});
