//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Pman.Tab.AdminEnums = new Roo.XComponent({
    part     :  ["Admin","Enums"],
    order    : '500-Pman.Tab.AdminEnums',
    region   : 'center',
    parent   : 'Pman.Tab.Admin',
    name     : "Pman.Tab.AdminEnums",
    disabled : false, 
    permname : 'Admin.Enums', 
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
            background : true,
            fitContainer : true,
            fitToframe : true,
            region : 'center',
            tableName : 'core_enum',
            title : "Pulldown Options",
            grid : {
                xtype: 'EditorGrid',
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
                    afteredit : function (e)
                    {
                       e.record.commit();     
                    },
                    cellclick : function (_self, rowIndex, columnIndex, e)
                    {
                    
                            var di = this.colModel.getDataIndex(columnIndex);
                            if (di != 'active') {
                                return;
                            }
                             
                            var rec = _this.grid.ds.getAt(rowIndex);
                            
                            rec.set('active', rec.data.active ? 0 : 1);
                            rec.commit();
                             
                            
                    }
                },
                autoExpandColumn : 'display_name',
                clicksToEdit : 1,
                loadMask : true,
                dataSource : {
                    xtype: 'Store',
                    xns: Roo.data,
                    listeners : {
                        beforeload : function (_self, options)
                        {
                            if (!_this.etypeCombo) {
                                return false;
                            }
                            options.params.etype = _this.etypeCombo.getValue();
                            if (!options.params.etype.length) {
                                return false;
                            }
                        },
                        update : function (_self, record, operation)
                        {
                            if (operation != Roo.data.Record.COMMIT) {
                                return;
                            }
                            // got commit..
                            new Pman.Request({
                                url : baseURL + '/Roo/Core_enum.php',
                                method : 'POST',
                                params : {
                                    id : record.data.id,
                                    etype : _this.etypeCombo.getValue(),
                                    name : record.data.name,
                                    active : record.data.active,
                                    seqid : record.data.seqid,
                                    display_name : record.data.display_name
                                }, 
                                success : function(res) {
                                    //Roo.log(data);
                                    // update the ID if it's not set..
                                    if (record.data.id * 1 < 1) {
                                        record.set('id', res.data.id);
                                    }
                                }
                            });
                            
                        }
                    },
                    remoteSort : true,
                    sortInfo : { field : 'etype', direction: 'ASC' },
                    proxy : {
                        xtype: 'HttpProxy',
                        xns: Roo.data,
                        method : 'GET',
                        url : baseURL + '/Roo/core_enum.php'
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
                                'name': 'etype',
                                'type': 'string'
                            },
                            {
                                'name': 'name',
                                'type': 'string'
                            },
                            {
                                'name': 'active',
                                'type': 'int'
                            },
                            {
                                'name': 'seqid',
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
                    displayMsg : "Displaying core_enum{0} - {1} of {2}",
                    emptyMsg : "No core_enum found"
                },
                toolbar : {
                    xtype: 'Toolbar',
                    xns: Roo,
                    items : [
                        {
                            xtype: 'TextItem',
                            xns: Roo.Toolbar,
                            text : "Pulldown Name:"
                        },
                        {
                            xtype: 'ComboBox',
                            xns: Roo.form,
                            listeners : {
                                render : function (_self)
                                {
                                    _this.etypeCombo = _self;
                                },
                                select : function (combo, record, index)
                                {
                                    _this.grid.footer.onClick('first');
                                }
                            },
                            alwaysQuery : true,
                            displayField : 'name',
                            editable : 'false',
                            emptyText : "Select pulldown",
                            fieldLabel : 'core_enum',
                            forceSelection : true,
                            listWidth : 400,
                            loadingText : "Searching...",
                            minChars : 2,
                            pageSize : 20,
                            qtip : "Select type",
                            queryParam : 'query[name]',
                            selectOnFocus : true,
                            tpl : '<div class="x-grid-cell-text x-btn button"><b>{name}</b> </div>',
                            triggerAction : 'all',
                            typeAhead : false,
                            valueField : 'name',
                            width : 300,
                            store : {
                                xtype: 'Store',
                                xns: Roo.data,
                                listeners : {
                                    beforeload : function (_self, o){
                                        o.params = o.params || {};
                                        // set more here
                                        o.params['query[empty_etype]'] = 1; 
                                    }
                                },
                                remoteSort : true,
                                sortInfo : { direction : 'ASC', field: 'id' },
                                proxy : {
                                    xtype: 'HttpProxy',
                                    xns: Roo.data,
                                    method : 'GET',
                                    url : baseURL + '/Roo/core_enum.php'
                                },
                                reader : {
                                    xtype: 'JsonReader',
                                    xns: Roo.data,
                                    id : 'id',
                                    root : 'data',
                                    totalProperty : 'total',
                                    fields : [{"name":"id","type":"int"},{"name":"etype","type":"string"}]
                                }
                            }
                        },
                        {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            listeners : {
                                click : function()
                                {
                                    
                                    // if we do not have a selected type... - what should we show..?
                                    var et = _this.etypeCombo.getValue();
                                    var ds = _this.grid.getDataSource();
                                    if (!et) {
                                        Roo.MessageBox.alert("Error", "Select a pulldown");
                                        return;
                                    }
                                
                                    var add = ds.reader.newRow({    
                                             id: 0, 
                                             display_name : '', 
                                             name : '', 
                                             etype: et, 
                                             active: 1, 
                                             seqid: 0
                                      });
                                     var r = ds.data.length;
                                    ds.insert(r  , add);  
                                    _this.grid.startEditing(r, 1); // name... 
                                }
                            },
                            cls : 'x-btn-text-icon',
                            text : "Add Value",
                            icon : Roo.rootURL + 'images/default/dd/drop-add.gif'
                        },
                        {
                            xtype: 'Fill',
                            xns: Roo.Toolbar
                        },
                        {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            listeners : {
                                click : function()
                                {
                                    
                                    Roo.MessageBox.prompt ("Create a new Enum type",
                                        "Enter the name for a new enum type, " + 
                                        "this is only relivant if you  know how it is going to be used",
                                        function(btn,txt) {
                                            if (btn != 'ok') {
                                                return; 
                                            }
                                            new Pman.Request({
                                                url : baseURL + '/Roo/Core_enum.php',
                                                method : 'POST',
                                                params : {
                                                    etype : '',
                                                    name : txt,
                                                    active : 1
                                                }, 
                                                success : function() {
                                                    Roo.MessageBox.alert("Created", "You can now select it from the type list on the left");
                                                }
                                            });
                                                    
                                            
                                             
                                             
                                        }
                                    ); 
                                         
                                         
                                
                                }
                            },
                            cls : 'x-btn-text-icon',
                            text : "Add new pulldown list",
                            icon : Roo.rootURL + 'images/default/dd/drop-add.gif'
                        }
                    ]
                },
                colModel : [
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'id',
                        header : 'Internal #',
                        width : 75,
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'id',
                        header : 'Image',
                        width : 75,
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Name',
                        width : 200,
                        dataIndex : 'name',
                        renderer : function(v) { return String.format('{0}', v); },
                        editor : {
                            xtype: 'GridEditor',
                            xns: Roo.grid,
                            field : {
                                xtype: 'TextField',
                                xns: Roo.form
                            }
                        }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'display_name',
                        header : 'Display Name',
                        width : 200,
                        renderer : function(v) { return String.format('{0}', v); },
                        editor : {
                            xtype: 'GridEditor',
                            xns: Roo.grid,
                            field : {
                                xtype: 'TextField',
                                xns: Roo.form
                            }
                        }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'active',
                        header : 'Active',
                        width : 75,
                        renderer : function(v) {  
                            var state = v> 0 ?  '-checked' : '';
                        
                            return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                                        
                         }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'seqid',
                        header : 'Order #',
                        sortable : true,
                        width : 75,
                        renderer : function(v) { return String.format('{0}', v); },
                        editor : {
                            xtype: 'GridEditor',
                            xns: Roo.grid,
                            field : {
                                xtype: 'NumberField',
                                xns: Roo.form,
                                allowDecimals : false,
                                allowNegative : true,
                                decimalPrecision : 0
                            }
                        }
                    }
                ]
            }
        };
    }
});
