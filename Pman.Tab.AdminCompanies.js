//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminCompanies = new Roo.XComponent({
    part     :  ["Admin", "Companies" ],
    order    : '030-Pman.Tab.AdminCompanies',
    region   : 'center',
    parent   : 'Pman.Tab.Admin',
    name     : "Pman.Tab.AdminCompanies",
    disabled : false, 
    permname : 'Admin.Companies', 
    _tree : function()
    {
        var _this = this;
        var MODULE = this;
        return {
            layout : {
                center : {
                    '|xns' : 'Roo',
                    xtype : 'LayoutRegion',
                    xns : Roo
                },
                south : {
                    '|xns' : 'Roo',
                    xtype : 'LayoutRegion',
                    xns : Roo,
                    split : true,
                    height : 150,
                    titlebar : true
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
                                    url : baseURL + '/Roo/Companies.php',
                                    xtype : 'HttpProxy',
                                    method : 'GET',
                                    xns : Roo.data,
                                    listeners : {
                                    	load : function (This, o, arg)
                                    	   {
                                    	    
                                    	   }
                                    }
                                },
                                reader : {
                                    '|xns' : 'Roo.data',
                                    id : 'id',
                                    root : 'data',
                                    xtype : 'JsonReader',
                                    xns : Roo.data,
                                    fields : [
                                        {
                                            'name': 'code',
                                            'type': 'string'
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
                                            'name': 'address',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'tel',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'fax',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'email',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'id',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'isOwner',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'logo_id',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'background_color',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'comptype',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'url',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'main_office_id',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'created_by',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'created_dt',
                                            'type': 'date',
                                            'dateFormat': 'Y-m-d'
                                        },
                                        {
                                            'name': 'updated_by',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'updated_dt',
                                            'type': 'date',
                                            'dateFormat': 'Y-m-d'
                                        },
                                        {
                                            'name': 'passwd',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'dispatch_port',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'province',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'country',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'logo_id_id',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'logo_id_filename',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'logo_id_ontable',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'logo_id_onid',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'logo_id_mimetype',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'logo_id_width',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'logo_id_height',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'logo_id_filesize',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'logo_id_displayorder',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'logo_id_language',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'logo_id_parent_image_id',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'logo_id_created',
                                            'type': 'date'
                                        },
                                        {
                                            'name': 'logo_id_imgtype',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'logo_id_linkurl',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'logo_id_descript',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'logo_id_title',
                                            'type': 'string'
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
                                        },
                                        {
                                            'name': 'owner_id_deleted_by',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'owner_id_deleted_dt',
                                            'type': 'date'
                                        },
                                        {
                                            'name': 'main_office_id_id',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'main_office_id_company_id',
                                            'type': 'int'
                                        },
                                        {
                                            'name': 'main_office_id_name',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'main_office_id_address',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'main_office_id_phone',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'main_office_id_fax',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'main_office_id_email',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'main_office_id_role',
                                            'type': 'string'
                                        }
                                    ],
                                    totalProperty : 'total'
                                },
                                '|xns' : 'Roo.data',
                                xtype : 'Store',
                                remoteSort : true,
                                sortInfo : { field : 'name', direction: 'ASC' },
                                xns : Roo.data,
                                listeners : {
                                	beforeload : function (_self, o)
                                	   {
                                	      o.params = o.params || {};
                                	      try {
                                	          o.params['query[name]'] = _this.searchBox.getValue();
                                	      } catch(e) { return false; }
                                	   },
                                	load : function (_self, records, options)
                                	   {
                                	      try {
                                	           Pman.Tab.AdminOffice.grid.footer.onClick('refresh');
                                	       } catch (e) {}
                                	   }
                                },
                                items : [

                                ]

                            },
                            footer : {
                                '|xns' : 'Roo',
                                pageSize : 25,
                                xtype : 'PagingToolbar',
                                emptyMsg : "No Companies found",
                                xns : Roo,
                                displayInfo : true,
                                displayMsg : "Displaying Companies{0} - {1} of {2}"
                            },
                            toolbar : {
                                '|xns' : 'Roo',
                                xtype : 'Toolbar',
                                xns : Roo,
                                items : [
                                	{
                                        '|xns' : 'Roo.form',
                                        xtype : 'TextField',
                                        xns : Roo.form,
                                        listeners : {
                                        	specialkey : function (_self, e)
                                        	   {
                                        	    if (e.getKey() == 13) {
                                        	        _this.grid.footer.onClick( 'first' );
                                        	     }
                                        	   },
                                        	show : function (_self)
                                        	   {
                                        	   
                                        	   },
                                        	render : function (_self)
                                        	   {
                                        	   _this.searchBox = _self;
                                        	   }
                                        }
                                    },
                                	{
                                        '|xns' : 'Roo.Toolbar',
                                        xtype : 'Button',
                                        cls : 'x-btn-icon',
                                        icon : rootURL + '/Pman/templates/images/search.gif',
                                        xns : Roo.Toolbar,
                                        listeners : {
                                        	click : function (_self, e)
                                        	   {
                                        	   _this.grid.footer.onClick('first');
                                        	   }
                                        }
                                    },
                                	{
                                        '|xns' : 'Roo.Toolbar',
                                        xtype : 'Button',
                                        cls : 'x-btn-icon',
                                        icon : rootURL + '/Pman/templates/images/edit-clear.gif',
                                        xns : Roo.Toolbar,
                                        listeners : {
                                        	click : function (_self, e)
                                        	   {
                                        	       _this.searchBox.setValue('');
                                        	       _this.grid.footer.onClick('first');
                                        	   }
                                        }
                                    },
                                	{
                                        '|xns' : 'Roo.Toolbar',
                                        xtype : 'Fill',
                                        xns : Roo.Toolbar
                                    },
                                	{
                                        '|xns' : 'Roo.Toolbar',
                                        text : "Add",
                                        xtype : 'Button',
                                        cls : 'x-btn-text-icon',
                                        icon : Roo.rootURL + 'images/default/dd/drop-add.gif',
                                        xns : Roo.Toolbar,
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
                                        '|xns' : 'Roo.Toolbar',
                                        text : "Edit",
                                        xtype : 'Button',
                                        cls : 'x-btn-text-icon',
                                        icon : Roo.rootURL + 'images/default/tree/leaf.gif',
                                        xns : Roo.Toolbar,
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
                                        '|xns' : 'Roo.Toolbar',
                                        text : "Delete",
                                        xtype : 'Button',
                                        cls : 'x-btn-text-icon',
                                        icon : rootURL + '/Pman/templates/images/trash.gif',
                                        xns : Roo.Toolbar,
                                        listeners : {
                                        	click : function()
                                        	   {
                                        	        Pman.genericDelete(_this, 'Companies'); 
                                        	   }
                                        }
                                    }
                                ]

                            },
                            '|xns' : 'Roo.grid',
                            autoExpandColumn : 'name',
                            xtype : 'Grid',
                            loadMask : true,
                            xns : Roo.grid,
                            colModel : [
                            	 {
                            	        '|xns' : 'Roo.grid',
                            	        xtype : 'ColumnModel',
                            	        sortable : true,
                            	        header : 'Type',
                            	        width : 90,
                            	        renderer : function (v,x ,r) {
                            	            //return Pman.Dialog.Companies.comptypeListToString(r.data.isOwner ? 'OWNER' : v);
                            	            return v;
                            	        },
                            	        xns : Roo.grid,
                            	        dataIndex : 'comptype'
                            	    },
{
                            	        '|xns' : 'Roo.grid',
                            	        xtype : 'ColumnModel',
                            	        sortable : true,
                            	        header : 'Ref#',
                            	        width : 50,
                            	        renderer : function(v) { return String.format('{0}', v); },
                            	        xns : Roo.grid,
                            	        dataIndex : 'code'
                            	    },
{
                            	        '|xns' : 'Roo.grid',
                            	        xtype : 'ColumnModel',
                            	        sortable : true,
                            	        header : 'Name',
                            	        width : 200,
                            	        renderer : function(v,x,r) {
                            	            return String.format(r.data.comptype == 'OWNER' ? '<B>{0}</B>' : '{0}',v);    
                            	        },
                            	        xns : Roo.grid,
                            	        dataIndex : 'name'
                            	    },
{
                            	        '|xns' : 'Roo.grid',
                            	        xtype : 'ColumnModel',
                            	        header : 'Tel',
                            	        width : 100,
                            	        renderer : function(v) { return String.format('{0}', v); },
                            	        xns : Roo.grid,
                            	        dataIndex : 'tel'
                            	    },
{
                            	        '|xns' : 'Roo.grid',
                            	        xtype : 'ColumnModel',
                            	        header : 'Fax',
                            	        width : 100,
                            	        renderer : function(v) { return String.format('{0}', v); },
                            	        xns : Roo.grid,
                            	        dataIndex : 'fax'
                            	    },
{
                            	        '|xns' : 'Roo.grid',
                            	        xtype : 'ColumnModel',
                            	        sortable : true,
                            	        header : 'Email',
                            	        width : 100,
                            	        renderer : function (v) {
                            	                return (v.length && v.indexOf('@') > 0 ) ? 
                            	                    String.format('<a href="mailto:{0}">{0}</a>',v) : v;
                            	                    
                            	            },
                            	        xns : Roo.grid,
                            	        dataIndex : 'email'
                            	    },
{
                            	        '|xns' : 'Roo.grid',
                            	        xtype : 'ColumnModel',
                            	        sortable : true,
                            	        header : 'Address',
                            	        width : 200,
                            	        renderer : function(v) { return String.format('{0}', v); },
                            	        xns : Roo.grid,
                            	        dataIndex : 'address'
                            	    },
{
                            	        '|xns' : 'Roo.grid',
                            	        xtype : 'ColumnModel',
                            	        width : 200,
                            	        header : 'Remarks',
                            	        renderer : function(v) { return String.format('{0}', v); },
                            	        xns : Roo.grid,
                            	        dataIndex : 'remarks'
                            	    }
                            ],
                            listeners : {
                            	rowdblclick : function (_self, rowIndex, e)
                            	   {
                            	       if (!_this.dialog) return;
                            	       _this.dialog.show( this.getDataSource().getAt(rowIndex).data, function() {
                            	           _this.grid.footer.onClick('first');
                            	       }); 
                            	       
                            	       
                            	   },
                            	render : function() 
                            	   {
                            	       _this.grid = this; 
                            	        _this.dialog = Pman.Dialog.Companies;
                            	       if (_this.panel.active) {
                            	          this.footer.onClick('first');
                            	       }
                            	   },
                            	rowclick : function (_self, rowIndex, e)
                            	   {
                            	     try { Pman.Tab.AdminOffice.grid.footer.onClick('refresh'); } catch(e) {}
                            	   }
                            },
                            items : [

                            ]

                        },
                        '|xns' : 'Roo',
                        fitToframe : true,
                        background : true,
                        region : 'center',
                        title : "Companies",
                        xtype : 'GridPanel',
                        fitContainer : true,
                        xns : Roo,
                        tableName : 'Companies',
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
            region : 'center',
            xtype : 'NestedLayoutPanel',
            title : "Companies",
            xns : Roo,
            items : [

            ]

        };    }
});
