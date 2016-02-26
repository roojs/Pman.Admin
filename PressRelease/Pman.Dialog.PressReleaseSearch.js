//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Pman.Dialog.PressReleaseSearch = {

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
                   try {
                    _this.grid.footer.onClick('first');
                    } catch(e) { }
                }
            },
            closable : false,
            collapsible : false,
            height : 400,
            modal : true,
            resizable : false,
            title : "Select Search (Double click to use)",
            width : 700,
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
                    fitContainer : true,
                    fitToframe : true,
                    region : 'center',
                    tableName : 'pressrelease_search',
                    title : "pressrelease_search",
                    grid : {
                        xtype: 'Grid',
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
                            rowdblclick : function (_self, rowIndex, e)
                            {
                                _this.callback(this.getDataSource().getAt(rowIndex).data.data); 
                                _this.dialog.hide();
                            }
                        },
                        autoExpandColumn : 'title',
                        loadMask : true,
                        dataSource : {
                            xtype: 'Store',
                            xns: Roo.data,
                            listeners : {
                                beforeload : function (_self, options)
                                {
                                  options.params.person_id = Pman.Login.authUser.id;
                                }
                            },
                            remoteSort : true,
                            sortInfo : { field : 'title', direction: 'ASC' },
                            proxy : {
                                xtype: 'HttpProxy',
                                xns: Roo.data,
                                method : 'GET',
                                url : baseURL + '/Roo/pressrelease_search.php'
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
                                        'name': 'person_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'title',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'data',
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
                            displayMsg : 'Displaying pressrelease_search{0} - {1} of {2}',
                            emptyMsg : 'No pressrelease_search found'
                        },
                        toolbar : {
                            xtype: 'Toolbar',
                            xns: Roo,
                            items : [
                                {
                                    xtype: 'Fill',
                                    xns: Roo.Toolbar
                                },
                                {
                                    xtype: 'Button',
                                    xns: Roo.Toolbar,
                                    text : "Delete",
                                    cls : 'x-btn-text-icon',
                                    icon : rootURL + '/Pman/templates/images/trash.gif',
                                    listeners : {
                                        click : function()
                                        {
                                             Pman.genericDelete(_this, 'pressrelease_search'); 
                                        }
                                    }
                                }
                            ]
                        },
                        colModel : [
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'title',
                                header : 'Search',
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
                }
            ]
        });
    }
};
