//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Pman.Tab.ReleaseRegionMgr = new Roo.XComponent({
    part     :  ["PressRelease","ReleaseRegionMgr"],
    order    : '800-Pman.Tab.ReleaseRegionMgr',
    region   : 'center',
    parent   : 'Pman.Tab.ReleaseJournalistTab',
    name     : "Pman.Tab.ReleaseRegionMgr",
    disabled : false, 
    permname : '', 
    _tree : function()
    {
        var _this = this;
        var MODULE = this;
        return {
            xtype: 'NestedLayoutPanel',
            xns: Roo,
            background : true,
            region : 'center',
            title : "Manage Regions",
            layout : {
                xtype: 'BorderLayout',
                xns: Roo,
                items : [
                    {
                        xtype: 'GridPanel',
                        xns: Roo,
                        listeners : {
                            activate : function() {
                                _this.rpanel = this;
                                if (_this.rgrid) {
                                    _this.rgrid.ds.load({});
                                }
                            }
                        },
                        background : false,
                        fitContainer : true,
                        fitToframe : true,
                        region : 'west',
                        tableName : 'pressrelease_category',
                        title : "pressrelease_category",
                        grid : {
                            xtype: 'Grid',
                            xns: Roo.grid,
                            listeners : {
                                render : function() 
                                {
                                    _this.rgrid = this; 
                                    //_this.dialog = Pman.Dialog.FILL_IN
                                    if (_this.rpanel.active) {
                                       this.ds.load({});
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
                            autoExpandColumn : 'name',
                            ddGroup : 'regionDD',
                            enableDrop : true,
                            loadMask : true,
                            sm : {
                                xtype: 'RowSelectionModel',
                                xns: Roo.grid
                            },
                            dataSource : {
                                xtype: 'Store',
                                xns: Roo.data,
                                listeners : {
                                    beforeload : function (_self, options)
                                    {
                                        options.params = options.params || {};
                                        options.params.parent_id_name = 'Regional';
                                    },
                                    load : function (_self, records, options)
                                    {
                                     
                                      
                                      (function() { 
                                        if (_this.grid) {
                                            _this.grid.ds.load({});
                                        }
                                        }).defer(100);
                                    }
                                },
                                remoteSort : true,
                                sortInfo : { field : 'name', direction: 'ASC' },
                                proxy : {
                                    xtype: 'HttpProxy',
                                    xns: Roo.data,
                                    method : 'GET',
                                    url : baseURL + '/Roo/pressrelease_category.php'
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
                                            'name': 'parent_id',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'name',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'display_order',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'visible',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'hgroup',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'parent_id_id',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'parent_id_parent_id',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'parent_id_name',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'parent_id_display_order',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'parent_id_visible',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'parent_id_hgroup',
                                            'type': 'string'
                                        }
                                    ]
                                }
                            },
                            toolbar : {
                                xtype: 'Toolbar',
                                xns: Roo,
                                items : [
                                    {
                                        xtype: 'Button',
                                        xns: Roo.Toolbar,
                                        text : "Manage Regions",
                                        menu : {
                                            xtype: 'Menu',
                                            xns: Roo.menu,
                                            items : [
                                                {
                                                    xtype: 'Item',
                                                    xns: Roo.menu,
                                                    listeners : {
                                                        click : function()
                                                        {
                                                            new Pman.Request({
                                                                url : baseURL + '/Roo/pressrelease_category.php',
                                                                method :  'GET',
                                                                params : {
                                                                    name : 'Regional'
                                                                },
                                                                success : function(res)
                                                                {
                                                        
                                                                    Pman.Dialog.PressReleaseCategory.show( 
                                                                        { 
                                                                            parent_id : res.data[0].id,
                                                                            _nohead : 1
                                                                         } , 
                                                                         function() {
                                                                            _this.rgrid.ds.load({});
                                                                       }
                                                                   ); 
                                                                }
                                                            });
                                                                
                                                            
                                                            
                                                        }
                                                    },
                                                    cls : 'x-btn-text-icon',
                                                    text : "Add",
                                                    icon : Roo.rootURL + 'images/default/dd/drop-add.gif'
                                                },
                                                {
                                                    xtype: 'Item',
                                                    xns: Roo.menu,
                                                    listeners : {
                                                        click : function()
                                                        {
                                                            var s = _this.rgrid.getSelectionModel().getSelections();
                                                            if (!s.length || (s.length > 1))  {
                                                                Roo.MessageBox.alert("Error", s.length ? "Select only one Row" : "Select a Row");
                                                                return;
                                                            }
                                                            var data = Roo.apply({}, s[0].data);
                                                            data._nohead = 1;
                                                            Pman.Dialog.PressReleaseCategory.show( data,
                                                                 function() {
                                                                    _this.rgrid.ds.load({});
                                                               }
                                                           ); 
                                                              
                                                         
                                                            
                                                            
                                                        }
                                                    },
                                                    cls : 'x-btn-text-icon',
                                                    text : "Edit",
                                                    icon : Roo.rootURL + 'images/default/tree/leaf.gif'
                                                },
                                                {
                                                    xtype: 'Item',
                                                    xns: Roo.menu,
                                                    listeners : {
                                                        click : function()
                                                        {
                                                             Pman.genericDelete( {  grid : _this.rgrid }, 'pressrelease_category'); 
                                                        }
                                                    },
                                                    cls : 'x-btn-text-icon',
                                                    text : "Delete",
                                                    icon : rootURL + '/Pman/templates/images/trash.gif'
                                                }
                                            ]
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
                            ],
                            dropTarget : {
                                xtype: 'DropTarget',
                                xns: Roo.dd,
                                listeners : {
                                    over : function (source, e, data)
                                    {
                                        //Roo.log('over');
                                        this.valid = 'ok-add';
                                    },
                                    drop : function (source, e, data)
                                    {
                                         Roo.log('drop');
                                         
                                            var t = Roo.lib.Event.getTarget(e); 
                                            var ri = _this.rgrid.view.findRowIndex(t);
                                            var rid  = false;
                                            if (ri !== false) {
                                                rid = _this.rgrid.ds.getAt(ri).data;
                                            } else {
                                               Roo.MessageBox.alert("Sorry", "Could not find dropped Region");
                                               return;
                                           }
                                    
                                              
                                     
                                            var clist = [];
                                            Roo.each(data.selections, function(r) {        
                                                clist.push(r.data.country);
                                            })
                                           //Roo.log(sels.join(', '));
                                           
                                    
                                           
                                           
                                           // at this point we add the new country the specified region,
                                           // and optionally remove it from another one.
                                           
                                           // build a removal list..
                                           new Pman.Request({
                                                url : baseURL + '/Roo/pressrelease_category',
                                                method : 'POST',
                                                params : {
                                                    id : rid.id,
                                                    _update_regionmap : clist.join(',')
                                                },
                                                success : function() {
                                                    Roo.each(data.selections, function(r) {        
                                                        r.set('category_id_name', rid.name);
                                                        r.set('category_id', rid.id);                        
                                                    })
                                            
                                            
                                                }
                                            });
                                           
                                           
                                           
                                         
                                    }
                                },
                                ddGroup : 'regionDD'
                            }
                        }
                    },
                    {
                        xtype: 'GridPanel',
                        xns: Roo,
                        listeners : {
                            activate : function() {
                                _this.panel = this;
                                
                            }
                        },
                        background : true,
                        fitContainer : true,
                        fitToframe : true,
                        region : 'center',
                        tableName : 'i18n',
                        title : "i18n",
                        grid : {
                            xtype: 'Grid',
                            xns: Roo.grid,
                            listeners : {
                                render : function() 
                                {
                                    _this.grid = this; 
                                    //_this.dialog = Pman.Dialog.FILL_IN
                                },
                                rowdblclick : function (_self, rowIndex, e)
                                {
                                    if (!_this.dialog) return;
                                    _this.dialog.show( this.getDataSource().getAt(rowIndex), function() {
                                        _this.grid.footer.onClick('first');
                                    }); 
                                }
                            },
                            autoExpandColumn : 'country_name',
                            ddGroup : 'regionDD',
                            enableDrag : true,
                            loadMask : true,
                            toolbar : {
                                xtype: 'Toolbar',
                                xns: Roo,
                                items : [
                                    {
                                        xtype: 'TextItem',
                                        xns: Roo.Toolbar,
                                        text : "Select Country or Countries the drag them ontop of the region"
                                    }
                                ]
                            },
                            dataSource : {
                                xtype: 'Store',
                                xns: Roo.data,
                                listeners : {
                                    beforeload : function (_self, options)
                                    {
                                       
                                      
                                        options.params = options.params || {};
                                        
                                        options.params.limit = 999;
                                     
                                    }
                                },
                                remoteSort : true,
                                sortInfo : { field : 'country_name', direction: 'ASC' },
                                proxy : {
                                    xtype: 'HttpProxy',
                                    xns: Roo.data,
                                    method : 'GET',
                                    url : baseURL + '/Roo/pressrelease_regionmap.php'
                                },
                                reader : {
                                    xtype: 'JsonReader',
                                    xns: Roo.data,
                                    id : 'id',
                                    root : 'data',
                                    totalProperty : 'total',
                                    fields : [
                                        {
                                            'name': 'id',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'ltype',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'lkey',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'inlang',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'lval',
                                            'type': 'string'
                                        }
                                    ]
                                }
                            },
                            colModel : [
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'category_id_name',
                                    header : 'Region',
                                    width : 200,
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'country_name',
                                    header : 'Country',
                                    width : 200,
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
                west : {
                    xtype: 'LayoutRegion',
                    xns: Roo,
                    split : true,
                    width : 150
                }
            }
        };
    }
});
