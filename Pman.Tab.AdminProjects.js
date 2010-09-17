//<script type="text/javascript"> 
       
// Auto generated file build Builder

            
       
// register the module first       
Pman.on('beforeload', function()
{

    if (Pman.Login.authUser.company_id_comptype != 'OWNER') {
        return;
    }
    
    if (!Pman.hasPerm('Core.Projects_All', 'S')) {
        return;
    }
    
    Pman.register({
        modKey : '010-pman_tab_adminprojects',
        module : Pman.Tab.AdminProjects,
        region : 'center',
        parent : Pman.Tab.Admin,
        name : "Admin - Projects"
    });
});

Pman.Tab.AdminProjects = {
    
    panel : false,
    disabled : false,
    parentLayout:  false,

    add : function(parentLayout, region)
    {
        
        if (this.disabled) {
            return;
        }
        var _this = this;
        this.parentLayout = parentLayout;
        
        this.panel = this.parentLayout.addxtype({
            xtype : 'GridPanel',
            title : "Projects",
            fitToframe : true,
            fitContainer : true,
            tableName : 'Projects',
            background : true,
            listeners : {
                activate: function() {
                    _this.panel = this;
                  
                    
                      if (_this.grid && _this.grid.rendered) {
                        _this.grid.footer.onClick('first');
                    }
                }
            },
            grid : {
                xtype : 'Grid',
                autoExpandColumn : 'remarks',
                loadMask : true,
                listeners : {
                    render: function() { 
                    
                        _this.grid = this; 
                        _this.dialog = Pman.Dialog.CoreProject;
                        _this.filter =  'P,U';
                        _this.getTypes = function()
                        {
                            return [
                                [  'U' , "Project (Unconfirmed)" ],
                                [  'P' , "Project" ],
                                [  'C' , "Project (Closed)" ],
                                [  'N' , "Non-Project" ],
                                [  'X' , "Non-Project (Closed)" ]
                            
                            ];
                        };
                        _this.typeToString = function(v)
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
                        }
                         _this.grid.footer.onClick('first');
                    },
                    rowdblclick: function (g, ri, e)
                    {
                    
                        _this.dialog.show(g.getDataSource().getAt(ri).data, function() {
                           _self.footer.onClick('refresh');
                        });
                    }
                },
                dataSource : {
                    xtype : 'Store',
                    reader: Pman.Readers.Projects,
                    listeners : {
                        beforeload: function (_self, o)
                        {
                            if (!_this.searchBox) {
                                return false;
                            }  
                            o.params = o.params ? o.params : {};
                                                    o.params['query[project_search]'] = _this.searchBox.getValue();
                                                    o.params['query[project_filter]'] = _this.filter;
                        }
                    },
                    sortInfo: {field:'code', direction:'DESC'},
                    remoteSort : true,
                    proxy : {
                        xtype : 'HttpProxy',
                        method : 'GET',
                        url: baseURL + '/Roo/Projects.php'
                    }
                },
                colModel : [
                    {
                        header : 'Type',
                        width : 70,
                        dataIndex : 'type',
                        renderer: function(v) {return _this.typeToString(v); }
                    },
                    {
                        header : 'Code',
                        width : 90,
                        dataIndex : 'code',
                        renderer: function(v) { return String.format('{0}', v); }
                    },
                    {
                        header : 'Project Name',
                        width : 300,
                        dataIndex : 'name',
                        renderer: function(v) { return String.format('{0}', v); }
                    },
                    {
                        header : 'Client ',
                        width : 100,
                        dataIndex : 'client_id_name',
                        renderer: function(v) { return String.format('{0}', v); }
                    },
                    {
                        header : 'Remarks',
                        width : 300,
                        dataIndex : 'remarks',
                        renderer: function(v) { return String.format('{0}', v); }
                    }
                ],
                footer : {
                    xtype : 'PagingToolbar',
                    pageSize : 25,
                    displayInfo : true,
                    displayMsg : "Displaying Projects  {0} - {1} of {2}",
                    emptyMsg : "No Projects found"
                },
                toolbar : {
                    xtype : 'Toolbar',
                    items : [
                        {
                            text : "Add",
                            xtype : 'Button',
                            cls : 'x-btn-text-icon',
                            icon: Roo.rootURL + 'images/default/dd/drop-add.gif',
                            listeners : {
                                click: function()
                                        {
                                            _this.dialog.show( { id : 0 }, function() {
                                                _this.grid.footer.onClick('first');
                                
                                            }); 
                                
                                        }
                                        
                            }
                        },
                        {
                            text : "Edit",
                            xtype : 'Button',
                            cls : 'x-btn-text-icon',
                            icon: Roo.rootURL + 'images/default/tree/leaf.gif',
                            listeners : {
                                click: function()
                                        {
                                            var s = _this.grid.getSelectionModel().getSelections();
                                            if (!s.length || (s.length > 1))  {
                                                Roo.MessageBox.alert("Error", s.length ? "Select only one Project" : "Select a Project");
                                                return;
                                            }
                                            
                                            _this.dialog.show(s[0].data, function() {
                                                _this.grid.footer.onClick('first');
                                               }); 
                                            
                                        }
                                        
                            }
                        },
                        {
                            xtype : 'Separator',
                            xns: Roo.Toolbar
                        },
                        {
                            xtype : 'TextItem',
                            xns: Roo.Toolbar,
                            text : "Search:"
                        },
                        {
                            xtype : 'TextField',
                            xns: Roo.form,
                            listeners : {
                                render: function (_self)
                                {
                                   _this.searchBox = _self;
                                },
                                specialkey: function (_self, e)
                                {
                                    if(e.getKey() == 13) {
                                        _this.grid.footer.onClick('first');
                                    }
                                }
                            },
                            width : 135
                        },
                        {
                            xtype : 'Button',
                            xns: Roo.Toolbar,
                            listeners : {
                                click: function (_self, e)
                                {
                                 _this.grid.footer.onClick('first');
                                }
                            },
                            icon: rootURL + '/Pman/templates/images/search.gif',
                            cls : 'x-btn-icon'
                        },
                        {
                            xtype : 'Button',
                            xns: Roo.Toolbar,
                            listeners : {
                                click: function (_self, e)
                                {
                                    _this.searchBox.setValue('');
                                    _this.grid.footer.onClick('first');
                                }
                            },
                            icon: rootURL + '/Pman/templates/images/edit-clear.gif',
                            cls : 'x-btn-icon'
                        },
                        {
                            xtype : 'Separator',
                            xns: Roo.Toolbar
                        },
                        {
                            xtype : 'TextItem',
                            xns: Roo.Toolbar,
                            text : "Show:"
                        },
                        {
                            xtype : 'Button',
                            xns: Roo.Toolbar,
                            text : "All",
                            listeners : {
                                toggle: function (_self, st)
                                {
                                if (st) { _this.filter = 'P,N,U'; } 
                                    _this.grid.footer.onClick('first');
                                }
                            },
                            toggleGroup : 'pgrp',
                            pressed : false,
                            enableToggle : true
                        },
                        {
                            xtype : 'Button',
                            xns: Roo.Toolbar,
                            text : "Projects",
                            listeners : {
                                toggle: function (_self, st)
                                {
                                if (st) { _this.filter = 'P,U'; } 
                                    _this.grid.footer.onClick('first');
                                }
                            },
                            toggleGroup : 'pgrp',
                            pressed : true,
                            enableToggle : true
                        },
                        {
                            xtype : 'Button',
                            xns: Roo.Toolbar,
                            text : "Non-Projects",
                            listeners : {
                                toggle: function (_self, st)
                                {
                                if (st) { _this.filter = 'N'; } 
                                    _this.grid.footer.onClick('first');
                                }
                            },
                            toggleGroup : 'pgrp',
                            pressed : false,
                            enableToggle : true
                        },
                        {
                            xtype : 'Button',
                            xns: Roo.Toolbar,
                            text : "Closed",
                            listeners : {
                                toggle: function (_self, st)
                                {
                                if (st) { _this.filter = 'X,C'; } 
                                    _this.grid.footer.onClick('first');
                                }
                            },
                            toggleGroup : 'pgrp',
                            pressed : false,
                            enableToggle : true
                        }
                    ]
                },
                selModel : {
                    xtype : 'RowSelectionModel',
                    xns: Roo.grid,
                    singleSelect : true
                }
            },
            region : 'center'
        });

        
        
    }
}
