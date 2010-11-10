//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)



// register the module first
Pman.on('beforeload', function()
{
    Pman.register({
        modKey : '001-Pman.Tab.AdminTypesImage',
        module : Pman.Tab.AdminTypesImage,
        region : 'center',
        parent : Pman.Tab.AdminTypes,
        name : "Pman.Tab.AdminTypesImage",
        disabled : false, 
        permname: '' 
    });
});

Pman.Tab.AdminTypesImage = new Roo.util.Observable({

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
            tableName : 'core_image_type',
            title : "Image types",
            grid : {
                xtype: 'Grid',
                xns: Roo.grid,
                listeners : {
                    render : function() 
                    {
                        _this.grid = this; 
                        _this.dialog = Pman.Dialog.AdminGenericName;
                        if (_this.panel.active) {
                           this.footer.onClick('first');
                        }
                    },
                    rowdblclick : function (_self, rowIndex, e)
                    {
                        if (!_this.dialog) return;
                        _this.dialog.show({
                             id : this.getDataSource().getAt(rowIndex).data.id , 
                            _table : _this.panel.tableName , 
                            _title : "Edit Image Type" 
                        }, function() {
                            _this.grid.footer.onClick('first');
                        }); 
                    }
                },
                autoExpandColumn : 'name',
                loadMask : true,
                dataSource : {
                    xtype: 'Store',
                    xns: Roo.data,
                    remoteSort : true,
                    sortInfo : { field : 'name', direction: 'ASC' },
                    proxy : {
                        xtype: 'HttpProxy',
                        xns: Roo.data,
                        method : 'GET',
                        url : baseURL + '/Roo/core_image_type.php'
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
                            }
                        ]
                    }
                },
                footer : {
                    xtype: 'PagingToolbar',
                    xns: Roo,
                    pageSize : 25,
                    displayInfo : true,
                    displayMsg : 'Displaying core_company_type{0} - {1} of {2}',
                    emptyMsg : 'No core_company_type found'
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
                                    _this.dialog.show( { 
                                        id : 0 , 
                                        _table : _this.panel.tableName , 
                                        _title : "Add Image Type"
                                    } , function() {
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
                            listeners : {
                                click : function()
                                {
                                    var s = _this.grid.getSelectionModel().getSelections();
                                    if (!s.length || (s.length > 1))  {
                                        Roo.MessageBox.alert("Error", s.length ? "Select only one Row" : "Select a Row");
                                        return;
                                    }
                                    if (!_this.dialog) return;
                                    _this.dialog.show({
                                         id : s[0].data.id , 
                                        _table : _this.panel.tableName , 
                                        _title : "Edit Image Type" 
                                        },function() {
                                        _this.grid.footer.onClick('first');
                                    }); 
                                    
                                }
                            },
                            cls : 'x-btn-text-icon',
                            text : "Edit",
                            icon : Roo.rootURL + 'images/default/tree/leaf.gif'
                        },
                        {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            listeners : {
                                click : function()
                                {
                                     Pman.genericDelete(_this, 'core_image_type'); 
                                }
                            },
                            cls : 'x-btn-text-icon',
                            text : "Delete",
                            icon : rootURL + '/Pman/templates/images/trash.gif'
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
