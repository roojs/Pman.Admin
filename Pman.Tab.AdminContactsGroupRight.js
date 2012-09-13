//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Pman.Tab.AdminContactsGroupRight = new Roo.XComponent({
    part     :  ["Admin","ContactsGroupRight"],
    order    : '001-Pman.Tab.AdminContactsGroupRight',
    region   : 'center',
    parent   : 'Pman.Tab.AdminContactsManager',
    name     : "unnamed module",
    disabled : false, 
    permname : '', 
    _tree : function()
    {
        var _this = this;
        var MODULE = this;
        return {
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
            autoScroll : true,
            background : true,
            fitContainer : true,
            fitToframe : true,
            region : 'center',
            tableName : 'Person',
            title : "Rights",
            grid : {
                xtype: 'Grid',
                xns: Roo.grid,
                listeners : {
                    render : function() 
                    {
                        _this.grid = this; 
                        if (!_this.dialog) {
                            _this.dialog = Pman.Dialog.PersonEdit;
                            
                        }
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
                    },
                    cellclick : function (_self, rowIndex, columnIndex, e)
                    {
                    
                            var di = this.colModel.getDataIndex(columnIndex);
                            var i = di.split('_').shift();
                            var k = di.split('_').pop();
                            
                            if (i != 'accessmask') {
                                return;
                            }
                    
                            var rec = _this.grid.ds.getAt(rowIndex);
                            Roo.log(di);
                            Roo.log(rec.data.FullMask);
                            if(k == 'AA'){
                                var fm = rec.data.FullMask.split('');
                                Roo.each(fm, function(e){
                                    rec.set(i+'_'+k, rec.data[i+'_'+e] ? 0 : 1);
                                });
                            }else{
                                rec.set(i+'_'+k, rec.data[i+'_'+k] ? 0 : 1);
                            }
                            //rec.commit();
                             
                            
                    }
                },
                ddGroup : 'groupDD',
                enableDrag : true,
                loadMask : true,
                dataSource : {
                    xtype: 'Store',
                    xns: Roo.data,
                    listeners : {
                        beforeload : function (_self, o)
                        {
                            if (!o.params) {
                                o.params = {}
                            }
                            var s = Pman.Tab.Groups.grid.getSelectionModel().getSelections();
                            if (!s.length) {
                                o.params.group_id = -1;
                            } else {
                                o.params.group_id = s[0].data.id;
                            }
                            if (o.params.group_id < 0) {
                                _this.grid.getView().el.mask("You can not set permissions for that group");
                                return false;
                            }
                            _this.grid.getView().el.unmask();
                            return true;
                          
                        },
                        update : function (_self, record, operation)
                        {
                            if (operation != 'commit') {
                                return;
                            }
                            // only used to change active status.
                            
                            new Pman.Request({
                                url : baseURL + '/Roo/GroupRights.php',
                                method :'POST',
                                params : {
                                    id : record.data.id,
                                    active: record.data.active
                                    
                                },
                                success : function() {
                                    // do nothing
                                    
                                    _this.grid.ds.remove(record);
                                    
                                },
                                failure : function() 
                                {
                                    Roo.MessageBox.alert("Error", "saving failed", function() {
                                        _this.grid.footer.onClick('first');
                                    });
                                }
                            });
                        }
                    },
                    remoteSort : true,
                    sortInfo : { field : 'id', direction: 'ASC' },
                    proxy : {
                        xtype: 'HttpProxy',
                        xns: Roo.data,
                        method : 'GET',
                        url : baseURL + '/Admin/GroupRights.php'
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
                                'name': 'rightname',
                                'type': 'string'
                            },
                            {
                                'name': 'descript',
                                'type': 'string'
                            },
                            {
                                'name': 'accessmask',
                                'type': 'string'
                            },
                            {
                                'name': 'FullMask',
                                'type': 'string'
                            },
                            {
                                'name': 'group_id',
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
                    displayMsg : "Displaying Person{0} - {1} of {2}",
                    emptyMsg : "No Person found",
                    items : [
                        {
                            xtype: 'TextItem',
                            xns: Roo.Toolbar,
                            text : "Drag person to add or remove from group"
                        }
                    ]
                },
                toolbar : {
                    xtype: 'Toolbar',
                    xns: Roo,
                    items : [
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
                                show : function (_self,e)
                                {
                                    if (e.getCharCode() != 13) {
                                        return;
                                    }
                                    _this.grid.footer.onClick('first');
                                },
                                specialkey : function (_self, e)
                                {
                                  if (e.getKey() == 13) {
                                    _this.grid.footer.onClick('first');
                                  }
                                }
                            }
                        },
                        {
                            xtype: 'ComboBox',
                            xns: Roo.form,
                            listeners : {
                                render : function (_self)
                                {
                                  _this.companyCombo = _self;
                                },
                                select : function (combo, record, index)
                                {
                                   _this.grid.footer.onClick.defer(300,_this.grid.footer,[ 'first'] );
                                }
                            },
                            displayField : 'name',
                            editable : true,
                            emptyText : "Select Company",
                            forceSelection : true,
                            hiddenName : 'company_id',
                            listWidth : 400,
                            loadingText : "Searching...",
                            minChars : 2,
                            name : 'company_name',
                            pageSize : 20,
                            qtip : "Select Companies",
                            queryParam : 'query[name]',
                            selectOnFocus : true,
                            tpl : '<div class="x-grid-cell-text x-btn button"><b>{name}</b> </div>',
                            triggerAction : 'all',
                            typeAhead : true,
                            valueField : 'id',
                            width : 150,
                            store : {
                                xtype: 'Store',
                                xns: Roo.data,
                                listeners : {
                                    beforeload : function (_self, o){
                                        o.params = o.params || {};
                                        // set more here
                                    }
                                },
                                remoteSort : true,
                                sortInfo : { direction : 'ASC', field: 'name' },
                                proxy : {
                                    xtype: 'HttpProxy',
                                    xns: Roo.data,
                                    method : 'GET',
                                    url : baseURL + '/Roo/Companies.php'
                                },
                                reader : {
                                    xtype: 'JsonReader',
                                    xns: Roo.data,
                                    id : 'id',
                                    root : 'data',
                                    totalProperty : 'total',
                                    fields : [{"name":"id","type":"int"},{"name":"code","type":"string"}]
                                }
                            }
                        },
                        {
                            xtype: 'Fill',
                            xns: Roo.Toolbar
                        }
                    ]
                },
                colModel : [
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'accessmask_AA',
                        header : 'All',
                        sortable : false,
                        width : 50,
                        renderer : function(v,x,r) {
                            var state = v> 0 ?  '-checked' : '';
                        
                            return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                        }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'rightname',
                        header : 'Module',
                        sortable : false,
                        width : 150,
                        renderer : function(v,x,r) {
                            if(!v){
                                return;
                            }
                            return String.format('<span qtip="{1}">{0}</span>', v.split('.').shift(), v);
                        }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'descript',
                        header : 'Permission',
                        sortable : false,
                        width : 300,
                        renderer : function(v,x,r)
                        {
                            if (r.json.descript && r.json.descript.length) {
                                return String.format('{0}',r.json.descript);
                            }
                            
                            return '???' + v;
                        }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'accessmask_A',
                        header : 'Add',
                        width : 75,
                        renderer : function(v) {  
                            var state = v> 0 ?  '-checked' : '';
                        
                            return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                                        
                         }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'accessmask_E',
                        header : 'Edit',
                        width : 75,
                        renderer : function(v) {  
                            var state = v> 0 ?  '-checked' : '';
                        
                            return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                                        
                         }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'accessmask_D',
                        header : 'Delete',
                        width : 75,
                        renderer : function(v) {  
                            var state = v> 0 ?  '-checked' : '';
                        
                            return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                                        
                         }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'accessmask_S',
                        header : 'List/View',
                        width : 75,
                        renderer : function(v) {  
                            var state = v> 0 ?  '-checked' : '';
                        
                            return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                                        
                         }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'accessmask_P',
                        header : 'Print/Export',
                        width : 75,
                        renderer : function(v) {  
                            var state = v> 0 ?  '-checked' : '';
                        
                            return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                                        
                         }
                    }
                ]
            }
        };
    }
});
