//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

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
            center : {
                '|xns' : 'Roo',
                xtype : 'LayoutRegion',
                xns : Roo
            },
            '|xns' : 'Roo',
            modal : true,
            title : "Pulldown Options",
            xtype : 'LayoutDialog',
            width : 950,
            xns : Roo,
            closable : false,
            resizable : false,
            height : 400,
            buttons : [
            	 {
            	        '|xns' : 'Roo',
            	        text : "Cancel",
            	        xtype : 'Button',
            	        xns : Roo,
            	        listeners : {
            	        	click : function (_self, e)
            	        	   {
            	        	     _this.dialog.hide();
            	        	   }
            	        }
            	    },
{
            	        '|xns' : 'Roo',
            	        text : "OK",
            	        xtype : 'Button',
            	        xns : Roo,
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
            	        }
            	    }
            ],
            listeners : {
            	show : function (_self)
            	   {
            	       if(!isAdmin && Pman.Tab.Hopedb){
            	           Roo.MessageBox.alert("Error", "Permission Denied", function(){
            	               _this.dialog.hide();
            	           });
            	           return;
            	       }
            	       var name_hidden = false;
            	   
            	       if (typeof(_this.data._hide_name) != 'undefined') {
            	           name_hidden = true;
            	       
            	       }
            	       
            	     _this.grid.colModel.setHidden(1,name_hidden);
            	       _this.grid.footer.onClick('first');
            	   }
            },
            items : [
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
                            	       Roo.log(record);
                            	   
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
                            	       
                            	   },
                            	beforeload : function (_self, options)
                            	   {
                            	   
                            	       options.params.etype = _this.data.etype;
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
                            displayMsg : "Displaying core_enum{0} - {1} of {2}"
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
                                    icon : Roo.rootURL + 'images/default/dd/drop-add.gif',
                                    xns : Roo.Toolbar,
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
                                    	       
                                    	       var ec = 1;
                                    	       if (typeof(_this.data._hide_name) != 'undefined') { 
                                    	           ec =2;
                                    	       }
                                    	       _this.grid.startEditing(r, ec); // name... 
                                    	   }
                                    }
                                },
                            	{
                                    '|xns' : 'Roo.Toolbar',
                                    xtype : 'Fill',
                                    xns : Roo.Toolbar
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
                        	        dataIndex : 'id'
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
                        	        dataIndex : 'seqid',
                        	        items : [

                        	        ]

                        	    }
                        ],
                        listeners : {
                        	beforeedit : function (e)
                        	   {
                        	     
                        	       // force fill in of name first.. (Except when it's hidden)
                        	       if (typeof(_this.data._hide_name) != 'undefined') { 
                        	           if(e.field == 'display_name' && e.record.data.is_system_enum*1 == 1){
                        	               return ;
                        	           }
                        	    
                        	       }
                        	       
                        	       if(e.field == 'name' && e.record.data.is_system_enum*1 == 1){
                        	           Roo.log("block name?");
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
                        	      //    this.footer.onClick('first');
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
                    fitToframe : true,
                    background : false,
                    region : 'center',
                    title : "Pulldown Options",
                    xtype : 'GridPanel',
                    fitContainer : true,
                    xns : Roo,
                    tableName : 'core_enum',
                    listeners : {
                    	activate : function() {
                    	       _this.panel = this;
                    	       if (_this.grid) {
                    	        //   _this.grid.footer.onClick('first');
                    	       }
                    	   }
                    },
                    items : [

                    ]

                }
            ]

        });
    }
};
