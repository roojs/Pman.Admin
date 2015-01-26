//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminEnumImages = {

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
            title : "Add / Edit Images",
            xtype : 'LayoutDialog',
            width : 900,
            xns : Roo,
            height : 500,
            buttons : [
            	 {
            	        '|xns' : 'Roo',
            	        text : "Close",
            	        xtype : 'Button',
            	        xns : Roo,
            	        listeners : {
            	        	click : function (_self, e)
            	        	   {
            	        	       _this.dialog.hide();
            	        	       _this.callback(true);
            	        	   }
            	        }
            	    }
            ],
            listeners : {
            	show : function (_self)
            	   {
            	       _this.grid.footer.onClick('first');
            	   }
            },
            items : [
            	{
                    grid : {
                        dataSource : {
                            reader : {
                                '|xns' : 'Roo.data',
                                id : 'id',
                                root : 'data',
                                xtype : 'JsonReader',
                                fields : [
                                    {
                                        'name': 'id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'filename',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'ontable',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'onid',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'mimetype',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'width',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'height',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'filesize',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'displayorder',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'language',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'parent_image_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'created',
                                        'type': 'date',
                                        'dateFormat' : 'Y-m-d H:i:s'
                                    },
                                    {
                                        'name': 'imgtype',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'linkurl',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'descript',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'title',
                                        'type': 'string'
                                    }
                                ],
                                xns : Roo.data,
                                totalProperty : 'total'
                            },
                            proxy : {
                                '|xns' : 'Roo.data',
                                url : baseURL + '/Roo/Images.php',
                                method : 'GET',
                                xtype : 'HttpProxy',
                                xns : Roo.data
                            },
                            '|xns' : 'Roo.data',
                            xtype : 'Store',
                            remoteSort : true,
                            sortInfo : { field: 'created' , direction: 'DESC' },
                            xns : Roo.data,
                            listeners : {
                            	beforeload : function (_self, o)
                            	   {
                            	       //o.params.ontable = 'Companies';
                            	       
                            	     //   o.params.imgtype = 'PressRelease';
                            	       
                            	       o.params = o.params || {};
                            	       o.params.onid = _this.data.onid;
                            	       o.params.ontable = 'core_enum';
                            	       Roo.log(_this);
                            	       
                            	   },
                            	load : function (_self, records, options)
                            	   {
                            	    _this.panel.el.unmask();
                            	   }
                            },
                            items : [

                            ]

                        },
                        footer : {
                            '|xns' : 'Roo',
                            pageSize : 25,
                            xtype : 'PagingToolbar',
                            emptyMsg : "No Images found",
                            xns : Roo,
                            displayInfo : true,
                            displayMsg : "Displaying Images  {0} - {1} of {2}"
                        },
                        toolbar : {
                            '|xns' : 'Roo',
                            xtype : 'Toolbar',
                            xns : Roo,
                            items : [
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
                                    	               
                                    	       //var sel = Pman.Tab.PressReleaseCompanies  ? Pman.Tab.PressReleaseCompanies.grid.getSelectionModel().getSelected() : false
                                    	        
                                    	       Pman.Dialog.Image.show({
                                    	           id : 0, 
                                    	           ontable: 'core_enum',
                                    	           onid: _this.data.onid,
                                    	           imgtype : ''
                                    	       }, function(data){
                                    	           if (!data) { return; } 
                                    	           _this.grid.footer.onClick('first');
                                    	       }); 
                                    	   
                                    	   }
                                    }
                                },
                            	{
                                    '|xns' : 'Roo',
                                    text : "Edit",
                                    xtype : 'Button',
                                    cls : 'x-btn-text-icon',
                                    icon : Roo.rootURL + 'images/default/tree/leaf.gif',
                                    xns : Roo,
                                    listeners : {
                                    	click : function()
                                    	   {
                                    	       var s = _this.grid.getSelectionModel().getSelections();
                                    	       if (!s || s.length != 1) {
                                    	           Roo.MessageBox.alert("Error", "Select a single image to edit");
                                    	          return;
                                    	        }
                                    	        var data = _this.grid.getDataSource().getById(s[0].data.id).data;
                                    	       
                                    	                Pman.Dialog.PressReleaseImage.show(data, function() {
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
                                    	           Pman.genericDelete(_this, 'Images'); 
                                    	           }
                                    }
                                }
                            ]

                        },
                        '|xns' : 'Roo.grid',
                        autoExpandColumn : 'title',
                        xtype : 'Grid',
                        loadMask : true,
                        xns : Roo.grid,
                        colModel : [
                        	 {
                        	        '|xns' : 'Roo.grid',
                        	        xtype : 'ColumnModel',
                        	        sortable : true,
                        	        width : 100,
                        	        header : 'Created',
                        	        renderer : function(v,x,r) {
                        	               return String.format('{0}<br/><i>{1}</i><br/>{2}<br/><i>{3}x{4}</i>',
                        	                    v.format('d/M/Y'), r.data.mimetype, r.data.filename,
                        	            r.data.width, r.data.height
                        	            ); 
                        	        },
                        	        xns : Roo.grid,
                        	        dataIndex : 'created'
                        	    },
{
                        	        '|xns' : 'Roo.grid',
                        	        xtype : 'ColumnModel',
                        	        header : 'Image',
                        	        width : 100,
                        	        renderer : function(v,x,r) { return String.format('<img src="{0}/Images/Thumb/100/{1}/{2}" width="100">', baseURL, v, r.data.filename); },
                        	        xns : Roo.grid,
                        	        dataIndex : 'id'
                        	    },
{
                        	        '|xns' : 'Roo.grid',
                        	        xtype : 'ColumnModel',
                        	        header : 'Title',
                        	        width : 100,
                        	        renderer : function(v,x,r) {
                        	        //     var surl = r.json.url.replace(/\/release.php\/Images\//, '/i/').replace(/\/([0-9]+)\/.*$/, '/$1');;
                        	          //   var svurl = r.json.url_view.replace(/\/release.php\/Images\//, '/i/').replace(/\/([0-9]+)\/.*$/, '/$1');;
                        	            //  return String.format(
                        	              //    'Download Url : <a href="http://{0}{1}" target="_new">http://{0}{1}</a>' + 
                        	                //  '<br/>View Url : <a href="http://{0}{2}" target="_new">http://{0}{2}</a>' + 
                        	                  //'<br/><b>{3}</b><br/>{4}</i>', 
                        	                 // window.location.host, surl, svurl,
                        	                  // v, r.json.descript); 
                        	             
                        	            },
                        	        xns : Roo.grid,
                        	        dataIndex : 'title'
                        	    }
                        ],
                        listeners : {
                        	rowdblclick : function (_self, rowIndex, e)
                        	   {
                        	     
                        	      var s =  _self.getDataSource().getAt(rowIndex);
                        	        Pman.Dialog.PressReleaseImage.show(s.data, function() {
                        	                   _this.grid.footer.onClick('first');
                        	                  }); 
                        	   },
                        	render : function() { 
                        	       _this.grid = this; 
                        	       //_this.dialog = Pman.Dialog.FILL_IN
                        	       //if (_this.panel.active) {
                        	       //   this.footer.onClick('first');
                        	       //}
                        	   }
                        },
                        items : [

                        ]

                    },
                    '|xns' : 'Roo',
                    fitToframe : true,
                    background : false,
                    region : 'center',
                    title : "Images",
                    xtype : 'GridPanel',
                    fitContainer : true,
                    xns : Roo,
                    tableName : 'Images',
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

        });
    }
};
