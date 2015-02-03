//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminEnum = new Roo.XComponent({
    part     :  ["Admin", "Enum" ],
    order    : '500-Pman.Tab.AdminEnum',
    region   : 'center',
    parent   : 'Pman.Tab.Admin',
    name     : "Pman.Tab.AdminEnum",
    disabled : false, 
    permname : '', 
    _tree : function()
    {
        var _this = this;
        var MODULE = this;
        return {
            layout : {
                west : {
                    '|xns' : 'Roo',
                    width : 200,
                    xtype : 'LayoutRegion',
                    xns : Roo,
                    split : true
                },
                center : {
                    '|xns' : 'Roo',
                    xtype : 'LayoutRegion',
                    xns : Roo
                },
                '|xns' : 'Roo',
                xtype : 'BorderLayout',
                xns : Roo,
                items : [
                	{
                        grid : {
                            dataSource : {
                                proxy : {
                                    '|xns' : 'Roo.data',
                                    url : baseURL + '/Roo/core_enum.php',
                                    method : 'GET',
                                    xtype : 'HttpProxy',
                                    xns : Roo.data
                                },
                                reader : {
                                    '|xns' : 'Roo.data',
                                    id : 'id',
                                    root : 'data',
                                    xtype : 'JsonReader',
                                    xns : Roo.data,
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
                                    ],
                                    totalProperty : 'total'
                                },
                                '|xns' : 'Roo.data',
                                xtype : 'Store',
                                remoteSort : true,
                                sortInfo : { field : 'etype', direction: 'ASC' },
                                xns : Roo.data,
                                listeners : {
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
                                	               etype : _this.grid.ds.getById(record.id).data.etype,
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
                                	       
                                	   },
                                	beforeload : function (_self, o)
                                	   {
                                	       o.params['query[empty_etype]'] = 1; 
                                	     
                                	   }
                                },
                                items : [

                                ]

                            },
                            sm : {
                                '|xns' : 'Roo.grid',
                                xtype : 'CellSelectionModel',
                                xns : Roo.grid,
                                listeners : {
                                	selectionchange : function (_self, selection)
                                	   {
                                	       _this.grid.footer.onClick('first');
                                	   }
                                }
                            },
                            footer : {
                                '|xns' : 'Roo',
                                pageSize : 100,
                                xtype : 'PagingToolbar',
                                emptyMsg : "No core_enum found",
                                xns : Roo,
                                displayInfo : false,
                                displayMsg : " "
                            },
                            toolbar : {
                                '|xns' : 'Roo',
                                xtype : 'Toolbar',
                                xns : Roo,
                                items : [
                                	{
                                        '|xns' : 'Roo.Toolbar',
                                        text : "Add new pulldown list",
                                        xtype : 'Button',
                                        cls : 'x-btn-text-icon',
                                        icon : Roo.rootURL + 'images/default/dd/drop-add.gif',
                                        xns : Roo.Toolbar,
                                        listeners : {
                                        	click : function()
                                        	   {
                                        	       
                                        	       var data = {
                                        	           active:1,
                                        	           display_name:'',
                                        	           etype:'',
                                        	           name:''
                                        	       };
                                        	       Pman.Dialog.AdminEnumType.show(data,function(){
                                        	           
                                        	           _this.egrid.footer.onClick('first');
                                        	       });
                                        	            
                                        	            
                                        	   
                                        	   }
                                        }
                                    }
                                ]

                            },
                            '|xns' : 'Roo.grid',
                            autoExpandColumn : 'display_name',
                            xtype : 'EditorGrid',
                            loadMask : true,
                            clicksToEdit : 1,
                            xns : Roo.grid,
                            colModel : [
                            	 {
                            	        '|xns' : 'Roo.grid',
                            	        xtype : 'ColumnModel',
                            	        width : 200,
                            	        header : 'Pulldown',
                            	        renderer : function(v,x,r) { 
                            	        
                            	        
                            	            return String.format('<span qtip="{1}">{0}</span>', (''+v).length ? v : r.data.name, r.data.name); 
                            	        },
                            	        xns : Roo.grid,
                            	        dataIndex : 'display_name'
                            	    },
{
                            	        '|xns' : 'Roo.grid',
                            	        xtype : 'ColumnModel',
                            	        width : 50,
                            	        header : 'Active',
                            	        renderer : function(v) {  
                            	            var state = v> 0 ?  '-checked' : '';
                            	        
                            	            return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                            	                        
                            	         },
                            	        xns : Roo.grid,
                            	        dataIndex : 'active'
                            	    }
                            ],
                            listeners : {
                            	beforeedit : function (e)
                            	   {
                            	       if(e.field == 'name' && e.record.data.is_system_enum*1 == 1){
                            	           return false;
                            	       }
                            	   },
                            	render : function() 
                            	   {
                            	       _this.egrid = this; 
                            	       //_this.dialog = Pman.Dialog.FILL_IN
                            	       if (_this.epanel.active) {
                            	          this.footer.onClick('first');
                            	       }
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
                            	celldblclick : function (_self, rowIndex, columnIndex, e)
                            	   {
                            	       var rec = _this.egrid.ds.getAt(rowIndex);
                            	       Pman.Dialog.AdminEnumType.show(rec.data,function(){
                            	           
                            	           _this.egrid.footer.onClick('first');
                            	       });
                            	   },
                            	afteredit : function (e)
                            	   {
                            	      e.record.commit();     
                            	   }
                            },
                            items : [

                            ]

                        },
                        '|xns' : 'Roo',
                        background : false,
                        region : 'west',
                        title : "Pulldown Options",
                        xtype : 'GridPanel',
                        xns : Roo,
                        tableName : 'core_enum',
                        listeners : {
                        	activate : function() {
                        	       _this.epanel = this;
                        	       if (_this.egrid) {
                        	           _this.egrid.footer.onClick('first');
                        	       }
                        	   }
                        },
                        items : [

                        ]

                    },
                	{
                        grid : {
                            dataSource : {
                                proxy : {
                                    '|xns' : 'Roo.data',
                                    url : baseURL + '/Roo/core_enum.php',
                                    xtype : 'HttpProxy',
                                    method : 'GET',
                                    xns : Roo.data
                                },
                                reader : {
                                    '|xns' : 'Roo.data',
                                    id : 'id',
                                    root : 'data',
                                    xtype : 'JsonReader',
                                    xns : Roo.data,
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
                                    ],
                                    totalProperty : 'total'
                                },
                                '|xns' : 'Roo.data',
                                xtype : 'Store',
                                remoteSort : true,
                                sortInfo : { field : 'etype', direction: 'ASC' },
                                xns : Roo.data,
                                listeners : {
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
                                	               etype : _this.grid.ds.getById(record.id).data.etype,
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
                                	       
                                	   },
                                	beforeload : function (_self, options)
                                	   {
                                	   
                                	       var s =     _this.egrid.getSelectionModel().getSelectedCell();
                                	       
                                	   
                                	       if (!s) {
                                	           return false;
                                	       }
                                	       var d = _this.egrid.dataSource.getAt(s[0]);
                                	       
                                	       options.params.etype = d.data.name;
                                	       options.params['query[search]'] = _this.searchBox.getValue();
                                	       if (!options.params.etype.length) {
                                	           return false;
                                	       }
                                	   }
                                },
                                items : [

                                ]

                            },
                            footer : {
                                '|xns' : 'Roo',
                                pageSize : 25,
                                xtype : 'PagingToolbar',
                                emptyMsg : "No core_enum found",
                                xns : Roo,
                                displayInfo : true,
                                displayMsg : "Displaying core_enum{0} - {1} of {2}",
                                items : [
                                	{
                                        '|xns' : 'Roo.Toolbar',
                                        text : "Download",
                                        xtype : 'Button',
                                        xns : Roo.Toolbar,
                                        listeners : {
                                        	click : function (_self, e)
                                        	   {
                                        	       new Pman.Download({
                                        	           grid : _this.grid
                                        	       });
                                        	       Roo.MessageBox.alert("Downloading", "File is downloading");
                                        	   }
                                        }
                                    },
                                	{
                                        '|xns' : 'Roo.Toolbar',
                                        text : "Upload Values",
                                        xtype : 'Button',
                                        xns : Roo.Toolbar,
                                        listeners : {
                                        	click : function (_self, e)
                                        	   {
                                        	   
                                        	     var s =     _this.egrid.getSelectionModel().getSelectedCell();
                                        	       
                                        	   
                                        	       if (!s) {
                                        	           Roo.MessageBox.alert("Error", "Select a pulldown");
                                        	       }
                                        	       
                                        	       var d = _this.egrid.dataSource.getAt(s[0]);
                                        	    
                                        	   
                                        	       var etype = d.data.name;
                                        	       
                                        	       if(!etype.length){
                                        	           Roo.MessageBox.alert('Error', 'Please select a pulldown');
                                        	           return;
                                        	       }
                                        	       
                                        	       Pman.Dialog.Image.show(
                                        	          {
                                        	               _url : baseURL+'/Admin/Import/Enum?' + Roo.urlEncode({'etype' : etype})
                                        	           
                                        	          },
                                        	          function () {
                                        	               _this.grid.footer.onClick('first');
                                        	          }
                                        	      );
                                        	   }
                                        }
                                    }
                                ]

                            },
                            toolbar : {
                                '|xns' : 'Roo',
                                xtype : 'Toolbar',
                                xns : Roo,
                                items : [
                                	{
                                        '|xns' : 'Roo.Toolbar',
                                        text : "Add Value",
                                        xtype : 'Button',
                                        cls : 'x-btn-text-icon',
                                        icon : baseURL + '/Pman/templates/images/search.gif',
                                        xns : Roo.Toolbar,
                                        listeners : {
                                        	click : function()
                                        	   {
                                        	       
                                        	       // if we do not have a selected type... - what should we show..?
                                        	       
                                        	       
                                        	       var s =     _this.egrid.getSelectionModel().getSelectedCell();
                                        	       
                                        	   
                                        	       if (!s) {
                                        	           Roo.MessageBox.alert("Error", "Select a pulldown");
                                        	       }
                                        	       
                                        	       var d = _this.egrid.dataSource.getAt(s[0]);
                                        	    
                                        	   
                                        	       var ds = _this.grid.getDataSource();
                                        	   
                                        	       var add = ds.reader.newRow({    
                                        	                id: 0, 
                                        	                display_name : '', 
                                        	                name : '', 
                                        	                etype: d.data.name, 
                                        	                active: 1, 
                                        	                seqid: 0
                                        	         });
                                        	        var r = ds.data.length;
                                        	       ds.insert(r  , add);  
                                        	       _this.grid.startEditing(r, 1); // name... 
                                        	   }
                                        }
                                    },
                                	{
                                        '|xns' : 'Roo.Toolbar',
                                        text : "Add Image",
                                        xtype : 'Button',
                                        cls : 'x-btn-text-icon',
                                        icon : Roo.rootURL + 'images/default/dd/drop-add.gif',
                                        xns : Roo.Toolbar,
                                        listeners : {
                                        	click : function()
                                        	   {
                                        	       
                                        	       // if we do not have a selected type... - what should we show..?
                                        	       var et = _this.etypeCombo.getValue();
                                        	       
                                        	       if (!et) {
                                        	           Roo.MessageBox.alert("Error", "Select a pulldown");
                                        	           return;
                                        	       }
                                        	       var sc = _this.grid.getSelectionModel().getSelectedCell();
                                        	       Roo.log(sc);
                                        	       var ds = _this.grid.ds.getAt(sc[0]);
                                        	       if (!ds) {
                                        	           Roo.MessageBox.alert("Error", "Select enum");
                                        	           return;
                                        	       }
                                        	       
                                        	       Roo.log(ds);
                                        	       Pman.Dialog.AdminEnumImages.show({onid:ds.data.id}, function(){
                                        	           _this.grid.footer.onClick('first');
                                        	       });
                                        	       
                                        	   }
                                        }
                                    },
                                	{
                                        '|xns' : 'Roo.form',
                                        name : 'search',
                                        xtype : 'TextField',
                                        fieldLabel : 'Search',
                                        xns : Roo.form,
                                        listeners : {
                                        	render : function (_self)
                                        	   {
                                        	       _this.searchBox = this;
                                        	   }
                                        }
                                    },
                                	{
                                        '|xns' : 'Roo.Toolbar',
                                        cls : 'x-btn-icon',
                                        xtype : 'Button',
                                        xns : Roo.Toolbar,
                                        icon : rootURL + '/Pman/templates/images/search.gif',
                                        listeners : {
                                        	click : function (_self, e)
                                        	   {
                                        	       _this.grid.footer.onClick('first');
                                        	   }
                                        }
                                    },
                                	{
                                        '|xns' : 'Roo.Toolbar',
                                        cls : 'x-btn-icon',
                                        xtype : 'Button',
                                        icon : rootURL + '/Pman/templates/images/edit-clear.gif',
                                        xns : Roo.Toolbar,
                                        listeners : {
                                        	click : function (_self, e)
                                        	   {
                                        	        _this.searchBox.setValue('');
                                        	        _this.grid.footer.onClick('first');
                                        	   }
                                        }
                                    }
                                ]

                            },
                            '|xns' : 'Roo.grid',
                            autoExpandColumn : 'display_name',
                            xtype : 'EditorGrid',
                            loadMask : true,
                            clicksToEdit : 1,
                            xns : Roo.grid,
                            colModel : [
                            	 {
                            	        '|xns' : 'Roo.grid',
                            	        xtype : 'ColumnModel',
                            	        header : 'Internal #',
                            	        width : 75,
                            	        renderer : function(v) { return String.format('{0}', v); },
                            	        xns : Roo.grid,
                            	        sortable : true,
                            	        dataIndex : 'id'
                            	    },
{
                            	        '|xns' : 'Roo.grid',
                            	        xtype : 'ColumnModel',
                            	        header : 'Image',
                            	        width : 75,
                            	        renderer : function(v,x,r) { return String.format('<img src="{0}/Images/Thumb/25/{1}/{2}" width="25" height="25">', baseURL, v, r.data.images_id_filename); },
                            	        xns : Roo.grid,
                            	        dataIndex : 'images_id_id'
                            	    },
{
                            	        editor : {
                            	            field : {
                            	                '|xns' : 'Roo.form',
                            	                xtype : 'TextField',
                            	                xns : Roo.form
                            	            },
                            	            '|xns' : 'Roo.grid',
                            	            xtype : 'GridEditor',
                            	            xns : Roo.grid,
                            	            items : [

                            	            ]

                            	        },
                            	        '|xns' : 'Roo.grid',
                            	        xtype : 'ColumnModel',
                            	        width : 200,
                            	        header : 'Name',
                            	        renderer : function(v) { return String.format('{0}', v); },
                            	        xns : Roo.grid,
                            	        sortable : true,
                            	        dataIndex : 'name',
                            	        items : [

                            	        ]

                            	    },
{
                            	        editor : {
                            	            field : {
                            	                '|xns' : 'Roo.form',
                            	                xtype : 'TextField',
                            	                xns : Roo.form
                            	            },
                            	            '|xns' : 'Roo.grid',
                            	            xtype : 'GridEditor',
                            	            xns : Roo.grid,
                            	            items : [

                            	            ]

                            	        },
                            	        '|xns' : 'Roo.grid',
                            	        xtype : 'ColumnModel',
                            	        header : 'Display Name',
                            	        width : 200,
                            	        renderer : function(v) { return String.format('{0}', v); },
                            	        xns : Roo.grid,
                            	        sortable : true,
                            	        dataIndex : 'display_name',
                            	        items : [

                            	        ]

                            	    },
{
                            	        '|xns' : 'Roo.grid',
                            	        xtype : 'ColumnModel',
                            	        header : 'Active',
                            	        width : 75,
                            	        renderer : function(v) {  
                            	            var state = v> 0 ?  '-checked' : '';
                            	        
                            	            return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                            	                        
                            	         },
                            	        xns : Roo.grid,
                            	        sortable : true,
                            	        dataIndex : 'active'
                            	    },
{
                            	        editor : {
                            	            field : {
                            	                '|xns' : 'Roo.form',
                            	                allowNegative : true,
                            	                xtype : 'NumberField',
                            	                allowDecimals : false,
                            	                decimalPrecision : 0,
                            	                xns : Roo.form
                            	            },
                            	            '|xns' : 'Roo.grid',
                            	            xtype : 'GridEditor',
                            	            xns : Roo.grid,
                            	            items : [

                            	            ]

                            	        },
                            	        '|xns' : 'Roo.grid',
                            	        xtype : 'ColumnModel',
                            	        sortable : true,
                            	        header : 'Order #',
                            	        width : 75,
                            	        renderer : function(v) { return String.format('{0}', v); },
                            	        xns : Roo.grid,
                            	        sortable : true,
                            	        dataIndex : 'seqid',
                            	        items : [

                            	        ]

                            	    }
                            ],
                            listeners : {
                            	beforeedit : function (e)
                            	   {
                            	       if(e.field == 'name' && e.record.data.is_system_enum*1 == 1){
                            	           return false;
                            	       }
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
                            	   }
                            },
                            items : [

                            ]

                        },
                        '|xns' : 'Roo',
                        background : false,
                        region : 'center',
                        fitToframe : true,
                        title : "Pulldown Options",
                        xtype : 'GridPanel',
                        xns : Roo,
                        tableName : 'core_enum',
                        listeners : {
                        	activate : function() {
                        	       _this.panel = this;
                        	       if (_this.grid) {
                        	           _this.grid.footer.onClick('first');
                        	       }
                        	   }
                        },
                        items : [

                        ]

                    }
                ]

            },
            '|xns' : 'Roo',
            xtype : 'NestedLayoutPanel',
            region : 'center',
            xns : Roo,
            title : "Pulldown Options",
            items : [

            ]

        };    }
});
