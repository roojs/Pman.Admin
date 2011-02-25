//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)



// register the module first
Pman.on('beforeload', function()
{
    Pman.register({
        modKey : '002-Pman.Tab.AdminProjectManager',
        module : Pman.Tab.AdminProjectManager,
        region : 'center',
        parent : Pman.Tab.Admin,
        name : "Pman.Tab.AdminProjectManager",
        disabled : false, 
        permname: 'Core.Projects_All' 
    });
});

Pman.Tab.AdminProjectManager = new Roo.util.Observable({

    panel : false,
    disabled : false,
    parentLayout:  false,

    add : function(parentLayout, region)
    {

        var _this = this;
        this.parentLayout = parentLayout;

        this.panel = parentLayout.addxtype({
            xtype: 'NestedLayoutPanel',
            xns: Roo,
            region : 'center',
            title : "Projects",
            layout : {
                xtype: 'BorderLayout',
                xns: Roo,
                items : [
                    {
                        xtype: 'GridPanel',
                        xns: Roo,
                        listeners : {
                            activate : function() {
                                _this.panel = this;
                                try {
                                    _this.dialog =  Pman.Dialog.CoreProject ; 
                                } catch(e) {}
                                if (_this.grid) {
                                    _this.grid.footer.onClick('first');
                                }
                            }
                        },
                        background : true,
                        fitContainer : true,
                        fitToframe : true,
                        region : 'center',
                        tableName : 'Projects',
                        title : "Projects",
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
                            filter : 'P,U',
                            autoExpandColumn : 'name',
                            loadMask : true,
                            getTypes : function() {
                                return [
                                    [  'U' , "Project (Unconfirmed)" ],
                                    [  'P' , "Project" ],
                                    [  'C' , "Project (Closed)" ],
                                    [  'N' , "Non-Project" ],
                                    [  'X' , "Non-Project (Closed)" ]
                            
                                ];
                            },
                            typeToString : function(v)
                            {
                                var ar = this.getTypes();
                                var ret = '';
                                Roo.each(ar, function(a) {
                                    if (a[0] == v) {
                                        ret = a[1];
                                        return false;
                                    }
                                });
                                return ret;
                            },
                            dataSource : {
                                xtype: 'Store',
                                xns: Roo.data,
                                listeners : {
                                    beforeload : function (_self, options)
                                    {
                                        if (!_this.searchBox) {
                                            return false;
                                        }  
                                        o.params = o.params ? o.params : {};
                                        o.params['query[project_search]'] = _this.searchBox.getValue();
                                        o.params['query[project_filter]'] = _this.grid.filter;
                                    }
                                },
                                remoteSort : true,
                                sortInfo : { field : 'code', direction: 'ASC' },
                                proxy : {
                                    xtype: 'HttpProxy',
                                    xns: Roo.data,
                                    method : 'GET',
                                    url : baseURL + '/Roo/Projects.php'
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
                                displayInfo : true,
                                displayMsg : 'Displaying Projects {0} - {1} of {2}',
                                emptyMsg : 'No Projects found',
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
                                            click : function()
                                            {
                                                if (!_this.dialog) return;
                                                _this.dialog.show( { id : 0 } , function() {
                                                    _this.grid.footer.onClick('first');
                                               }); 
                                            }
                                        },
                                        cls : 'x-btn-text-icon',
                                        text : "Add",
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
                                        xtype: 'Separator',
                                        xns: Roo.Toolbar
                                    },
                                    {
                                        xtype: 'TextItem',
                                        xns: Roo.Toolbar,
                                        text : "Search"
                                    },
                                    {
                                        xtype: 'TextField',
                                        xns: Roo.form,
                                        listeners : {
                                            render : function (_self)
                                            {
                                                _this.searchBox = _self;
                                            },
                                            specialkey : function (_self, e)
                                            {
                                                if(e.getKey() == 13) {
                                                      _this.grid.footer.onClick('first');
                                                }
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'Button',
                                        xns: Roo.Toolbar,
                                        listeners : {
                                            click : function (_self, e)
                                            {
                                            _this.grid.footer.onClick('first');
                                            }
                                        },
                                        cls : 'x-btn-icon',
                                        icon : rootURL + '/Pman/templates/images/search.gif'
                                    },
                                    {
                                        xtype: 'Button',
                                        xns: Roo.Toolbar,
                                        listeners : {
                                            click : function (_self, e)
                                            {
                                            _this.searchBox.setValue('');
                                                _this.grid.footer.onClick('first');
                                            }
                                        },
                                        cls : 'x-btn-icon',
                                        icon : rootURL + '/Pman/templates/images/edit-clear.gif'
                                    },
                                    {
                                        xtype: 'Separator',
                                        xns: Roo.Toolbar
                                    },
                                    {
                                        xtype: 'TextItem',
                                        xns: Roo.Toolbar,
                                        text : "Show:"
                                    },
                                    {
                                        xtype: 'Button',
                                        xns: Roo.Toolbar,
                                        listeners : {
                                            render : function (_self)
                                            {
                                                if (st) { _this.grid.filter = 'P,N,U'; } 
                                                _this.grid.footer.onClick('first');
                                                 
                                            }
                                        },
                                        enableToggle : true,
                                        pressed : false,
                                        text : "All",
                                        toggleGroup : 'pgrp'
                                    },
                                    {
                                        xtype: 'Button',
                                        xns: Roo.Toolbar,
                                        listeners : {
                                            render : function (_self)
                                            {
                                                if (st) { _this.grid.filter = 'P,U'; } 
                                                _this.grid.footer.onClick('first');
                                                 
                                            }
                                        },
                                        enableToggle : true,
                                        pressed : true,
                                        text : "Projects",
                                        toggleGroup : 'pgrp'
                                    },
                                    {
                                        xtype: 'Button',
                                        xns: Roo.Toolbar,
                                        listeners : {
                                            toggle : function (_self)
                                            {
                                                if (st) { _this.grid.filter = 'N'; } 
                                                _this.grid.footer.onClick('first');
                                                 
                                            }
                                        },
                                        enableToggle : true,
                                        pressed : false,
                                        text : "Non-Projects",
                                        toggleGroup : 'pgrp'
                                    },
                                    {
                                        xtype: 'Button',
                                        xns: Roo.Toolbar,
                                        listeners : {
                                            toggle : function (_self, pressed)
                                            {
                                                    if (st) { _this.grid.filter = 'X,C'; } 
                                                            _this.grid.footer.onClick('first');
                                                    
                                            }
                                        },
                                        enableToggle : true,
                                        pressed : false,
                                        text : "Closed",
                                        toggleGroup : 'pgrp'
                                    }
                                ]
                            },
                            colModel : [
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'type',
                                    header : 'Type',
                                    width : 200,
                                    renderer : function(v) { return _this.grid.typeToString(v);}
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    header : 'Code',
                                    width : 200,
                                    dataIndex : 'code',
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
                                    header : 'Client',
                                    width : 75,
                                    dataIndex : 'client_id',
                                    renderer : function(v) { return String.format('{0}', v); }
                                }
                            ]
                        }
                    }
                ],
                center : {
                    xtype: 'LayoutRegion',
                    xns: Roo
                },
                east : {
                    xtype: 'LayoutRegion',
                    xns: Roo,
                    width : 300
                }
            }
        });
        this.layout = this.panel.layout;

    }
});
