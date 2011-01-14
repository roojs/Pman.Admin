//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)



// register the module first
Pman.on('beforeload', function()
{
    Pman.register({
        modKey : '001-Pman.Tab.AdminContactsGroup',
        module : Pman.Tab.AdminContactsGroup,
        region : 'west',
        parent : Pman.Tab.AdminContactsManager,
        name : "Pman.Tab.AdminContactsGroup",
        disabled : false, 
        permname: '' 
    });
});

Pman.Tab.AdminContactsGroup = new Roo.util.Observable({

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
            title : "Groups",
            fitToframe : true,
            fitContainer : true,
            tableName : 'Groups',
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
                        url : baseURL + '/Roo/Groups.php'
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
                                'name': 'type',
                                'type': 'int'
                            },
                            {
                                'name': 'leader',
                                'type': 'int'
                            },
                            {
                                'name': 'leader_id',
                                'type': 'int'
                            },
                            {
                                'name': 'leader_office_id',
                                'type': 'int'
                            },
                            {
                                'name': 'leader_name',
                                'type': 'string'
                            },
                            {
                                'name': 'leader_phone',
                                'type': 'string'
                            },
                            {
                                'name': 'leader_fax',
                                'type': 'string'
                            },
                            {
                                'name': 'leader_email',
                                'type': 'string'
                            },
                            {
                                'name': 'leader_company_id',
                                'type': 'int'
                            },
                            {
                                'name': 'leader_role',
                                'type': 'string'
                            },
                            {
                                'name': 'leader_active',
                                'type': 'int'
                            },
                            {
                                'name': 'leader_remarks',
                                'type': 'string'
                            },
                            {
                                'name': 'leader_passwd',
                                'type': 'string'
                            },
                            {
                                'name': 'leader_owner_id',
                                'type': 'int'
                            },
                            {
                                'name': 'leader_lang',
                                'type': 'string'
                            },
                            {
                                'name': 'leader_no_reset_sent',
                                'type': 'int'
                            },
                            {
                                'name': 'leader_action_type',
                                'type': 'string'
                            },
                            {
                                'name': 'leader_project_id',
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
                    displayMsg : 'Displaying Groups{0} - {1} of {2}',
                    emptyMsg : 'No Groups found'
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
                                     Pman.genericDelete(_this, 'Groups'); 
                                }
                            }
                        }
                    ]
                },
                colModel : [
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
