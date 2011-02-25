//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)



// register the module first
Pman.on('beforeload', function()
{
    Pman.register({
        modKey : '001-Pman.Tab.AdminProjectMembers',
        module : Pman.Tab.AdminProjectMembers,
        region : 'east',
        parent : Pman.Tab.AdminProjectManager,
        name : "Pman.Tab.AdminProjectMembers",
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
            region : 'east',
            tableName : 'Person',
            title : "Person",
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
                    listeners : {
                        beforeload : function (_self, options)
                        {
                            options.params.project_member_filter = _this.memberFilter.pressed;
                            var pm = Pman.Tab.AdminProjectManager;
                            if (!pm || !pm.grid || !pm.grid.getSelectionModel().getSelected()) {
                                return false;
                            }
                            var sel = pm.grid.getSelectionModel().getSelected();
                            switch(this.filter) {
                                case 'S': // staff
                                    options.params.company_id_comptype='OWNER';
                                    options.params.project_member_of = sel.data.id;
                                    break;
                                case 'O': // owner..
                                    options.params.company_id = sel.data.owner_id;
                                    options.params.project_member_of = sel.data.id;
                                case 'A': // not owner or staff..
                                    options.params['!company_id'] = sel.data.owner_id;
                                    options.params['!company_id_comptype'] ='OWNER';
                                    options.params.project_member_of = sel.data.id;        
                            }
                            
                        }
                    },
                    filter : 'S',
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
                    displayInfo : true,
                    displayMsg : ' ',
                    emptyMsg : 'No Person found',
                    pageSize : 25
                },
                toolbar : {
                    xtype: 'Toolbar',
                    xns: Roo,
                    items : [
                        {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            listeners : {
                                toggle : function (_self, pressed)
                                {
                                    if (pressed) {
                                        _this.grid.filter = 'S';
                                    }
                                    _this.grid.footer.onClick('first');
                                }
                            },
                            enableToggle : true,
                            pressed : true,
                            text : "Staff",
                            toggleGroup : 'appm'
                        },
                        {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            listeners : {
                                toggle : function (_self, pressed)
                                {
                                    if (pressed) {
                                        _this.grid.filter = 'O';
                                    }
                                    _this.grid.footer.onClick('first');
                                }
                            },
                            enableToggle : true,
                            text : "Owners",
                            toggleGroup : 'appm'
                        },
                        {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            listeners : {
                                toggle : function (_self, pressed)
                                {
                                    if (pressed) {
                                        _this.grid.filter = 'A';
                                    }
                                    _this.grid.footer.onClick('first');
                                }
                            },
                            enableToggle : true,
                            text : "Other",
                            toggleGroup : 'appm'
                        },
                        {
                            xtype: 'Fill',
                            xns: Roo.Toolbar
                        },
                        {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            listeners : {
                                toggle : function (_self, pressed)
                                {
                                   
                                    _this.grid.footer.onClick('first');
                                },
                                render : function (_self)
                                {
                                    _this.memberBtn = _self;
                                }
                            },
                            enableToggle : true,
                            text : "Members"
                        }
                    ]
                },
                colModel : [
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'is_member',
                        header : 'Member',
                        width : 60,
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'name',
                        header : 'Name',
                        sortable : true,
                        width : 200,
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'email',
                        header : 'Email',
                        width : 100,
                        renderer : function(v) { return String.format('{0}', v); },
                        sortable : true
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'company_id_name',
                        header : 'Company',
                        sortable : true,
                        width : 120,
                        renderer : function(v) { return String.format('{0}', v); }
                    }
                ]
            }
        });
        this.layout = this.panel.layout;

    }
});
