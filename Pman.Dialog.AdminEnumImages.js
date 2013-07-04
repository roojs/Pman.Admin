//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

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
            xtype: 'LayoutDialog',
            xns: Roo,
            height : 600,
            modal : true,
            width : 900,
            items : [
                {
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
                    region : 'center',
                    background : true,
                    fitContainer : true,
                    fitToframe : true,
                    tableName : 'Images',
                    title : "Images",
                    grid : {
                        xtype: 'Grid',
                        xns: Roo.grid,
                        autoExpandColumn : 'title',
                        loadMask : true,
                        listeners : {
                            render : function() { 
                                _this.grid = this; 
                                //_this.dialog = Pman.Dialog.FILL_IN
                                if (_this.panel.active) {
                                   this.footer.onClick('first');
                                }
                            },
                            rowdblclick : function (_self, rowIndex, e)
                            {
                              
                               var s =  _self.getDataSource().getAt(rowIndex);
                                 Pman.Dialog.PressReleaseImage.show(s.data, function() {
                                            _this.grid.footer.onClick('first');
                                           }); 
                            }
                        },
                        dataSource : {
                            xtype: 'Store',
                            xns: Roo.data,
                            listeners : {
                                beforeload : function (_self, o)
                                {
                                    o.params.ontable = 'Companies';
                                    o.params['query[imagesize]'] = '150x150';
                                    o.params['query[imageBaseURL]'] = rootURL + '/release.php';
                                      
                                    var sel = Pman.Tab.PressReleaseCompanies  ? Pman.Tab.PressReleaseCompanies.grid.getSelectionModel().getSelected() : false
                                  //   o.params.imgtype = 'PressRelease';
                                    o.params.onid = sel ? sel.data.id : 0;
                                    if (!o.params.onid) {
                                         if (!_this.isBuilder) {
                                           _this.panel.el.mask('select company');
                                        }
                                         return false;
                                    }
                                    
                                    
                                },
                                load : function (_self, records, options)
                                {
                                 _this.panel.el.unmask();
                                }
                            },
                            remoteSort : true,
                            sortInfo : { field: 'created' , direction: 'DESC' },
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
                                ]
                            },
                            proxy : {
                                xtype: 'HttpProxy',
                                xns: Roo.data,
                                method : 'GET',
                                url : baseURL + '/Roo/Images.php'
                            }
                        },
                        footer : {
                            xtype: 'PagingToolbar',
                            xns: Roo,
                            pageSize : 25,
                            displayInfo : true,
                            displayMsg : "Displaying Images  {0} - {1} of {2}",
                            emptyMsg : "No Images found"
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
                                                    
                                              var sel = Pman.Tab.PressReleaseCompanies  ? Pman.Tab.PressReleaseCompanies.grid.getSelectionModel().getSelected() : false
                                             
                                            Pman.Dialog.Image.show( {
                                               id : 0, 
                                                ontable: 'Companies', 
                                                 onid: sel.data.id,
                                            imgtype : 'PressRelease'
                                             }, 
                                            function(data) {
                                                        if (!data) { return; } 
                                             Pman.Dialog.PressReleaseImage.show( data, function() {
                                                          _this.grid.footer.onClick('first');
                                        
                                                    }); 
                                                        }); 
                                        
                                                }
                                    },
                                    cls : 'x-btn-text-icon',
                                    text : "Add",
                                    icon : Roo.rootURL + 'images/default/dd/drop-add.gif'
                                },
                                {
                                    xtype: 'Button',
                                    xns: Roo,
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
                                                Pman.genericDelete(_this, 'Images'); 
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
                                header : 'Created',
                                width : 100,
                                dataIndex : 'created',
                                renderer : function(v,x,r) {
                                       return String.format('{0}<br/><i>{1}</i><br/>{2}<br/><i>{3}x{4}</i>',
                                            v.format('d/M/Y'), r.data.mimetype, r.data.filename,
                                    r.data.width, r.data.height
                                    ); 
                                },
                                sortable : true
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'id',
                                header : 'Image',
                                width : 100,
                                renderer : function(v,x,r) { return String.format('<img src="{0}/Images/Thumb/100/{1}/{2}" width="100">', baseURL, v, r.data.filename); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'title',
                                header : 'Details',
                                width : 100,
                                renderer : function(v,x,r) {
                                     var surl = r.json.url.replace(/\/release.php\/Images\//, '/i/').replace(/\/([0-9]+)\/.*$/, '/$1');;
                                     var svurl = r.json.url_view.replace(/\/release.php\/Images\//, '/i/').replace(/\/([0-9]+)\/.*$/, '/$1');;
                                      return String.format(
                                          'Download Url : <a href="http://{0}{1}" target="_new">http://{0}{1}</a>' + 
                                          '<br/>View Url : <a href="http://{0}{2}" target="_new">http://{0}{2}</a>' + 
                                          '<br/><b>{3}</b><br/>{4}</i>', 
                                          window.location.host, surl, svurl,
                                           v, r.json.descript); 
                                     
                                    }
                            }
                        ]
                    }
                }
            ],
            center : {
                xtype: 'LayoutRegion',
                xns: Roo
            }
        });
    }
};
