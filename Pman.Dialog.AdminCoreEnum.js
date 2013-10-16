//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Pman.Dialog.AdminCoreEnum = {

    dialog : false,
    callback:  false,

    show : function(data, cb)
    {
        if (!this.dialog) {
            this.create();
        }

        this.callback = cb;
        this.data = data;
        this.dialog.show(this.data._el);
        if (this.form) {
           this.form.reset();
           this.form.setValues(data);
           this.form.fireEvent('actioncomplete', this.form,  { type: 'setdata', data: data });
        }

    },

    create : function()
    {
        var _this = this;
        this.dialog = Roo.factory({
            xtype: 'LayoutDialog',
            xns: Roo,
            listeners : {
                show : function (_self)
                {
                    var name_hidden = false;
                
                    if (typeof(_this.data._hide_name) != 'undefined') {
                        name_hidden = true;
                    
                    }
                    
                  _this.grid.colModel.setHidden(1,name_hidden);
                    _this.grid.footer.onClick('first');
                }
            },
            closable : false,
            height : 400,
            modal : true,
            resizable : false,
            title : "Pulldown Options",
            width : 950,
            items : [
                {
                    xtype: 'GridPanel',
                    xns: Roo,
                    listeners : {
                        activate : function() {
                            _this.panel = this;
                            if (_this.grid) {
                             //   _this.grid.footer.onClick('first');
                            }
                        }
                    },
                    background : false,
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
                               //    this.footer.onClick('first');
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
                                     
                                    
                            },
                            beforeedit : function (e)
                            {
                                if(e.field == 'name' && e.record.data.is_system_enum*1 == 1){
                                    return false;
                                }
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
                                
                                    options.params.etype = _this.data.etype;
                                    if (!options.params.etype.length) {
                                        return false;
                                    }
                                },
                                update : function (_self, record, operation)
                                {
                                    if (operation != Roo.data.Record.COMMIT) {
                                        return;
                                    }
                                    
                                
                                    if (typeof(_this.data._hide_name) != 'undefined') {
                                        record.set('name', record.data.display_name);
                                    }
                                    if (!record.data.name.length) {
                                        return;
                                    }
                                    
                                    // got commit..
                                    new Pman.Request({
                                        url : baseURL + '/Roo/Core_enum.php',
                                        method : 'POST',
                                        params : {
                                            id : record.data.id,
                                            etype : _this.data.etype,
                                            name :  record.data.name,
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
                                    xtype: 'Button',
                                    xns: Roo.Toolbar,
                                    listeners : {
                                        click : function()
                                        {
                                            
                                            // if we do not have a selected type... - what should we show..?
                                            var et = _this.data.etype;
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
                }
            ],
            center : {
                xtype: 'LayoutRegion',
                xns: Roo
            },
            buttons : [
                {
                    xtype: 'Button',
                    xns: Roo,
                    listeners : {
                        click : function (_self, e)
                        {
                          _this.dialog.hide();
                        }
                    },
                    text : "Cancel"
                },
                {
                    xtype: 'Button',
                    xns: Roo,
                    listeners : {
                        click : function (_self, e)
                        {
                            var sel = _this.grid.selModel.getSelectedCell();
                            if (!sel && _this.callback) {
                                Roo.MessageBox.alert("Error", "Select an item");
                                return;
                            }
                            
                        
                            if (_this.callback) {
                                var rec = _this.grid.ds.getAt(sel[0]);
                               _this.callback(rec.data);
                           }
                           _this.dialog.hide();
                        }
                    },
                    text : "OK"
                }
            ]
        });
    }
};
