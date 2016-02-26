//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Pman.Dialog.PressReleaseJournalistImport = {

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
                    (function() {
                        _this.grid.dataSource.load({});
                    }).defer(100);
                
                }
            },
            height : 400,
            minHeight : 400,
            minWidth : 950,
            resizable : true,
            title : "Preview before importing",
            width : 950,
            items : [
                {
                    xtype: 'GridPanel',
                    xns: Roo,
                    listeners : {
                        activate : function() {
                            _this.panel = this;
                            if (_this.grid) {
                                _this.grid.dataSource.load({});
                            }
                        }
                    },
                    background : false,
                    fitContainer : false,
                    fitToframe : false,
                    region : 'center',
                    tableName : 'pressrelease_contact',
                    title : "pressrelease_contact",
                    grid : {
                        xtype: 'Grid',
                        xns: Roo.grid,
                        listeners : {
                            render : function() 
                            {
                                _this.grid = this; 
                                //_this.dialog = Pman.Dialog.FILL_IN
                                if (_this.panel.active) {
                                   this.dataSource.load({});
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
                        autoExpandColumn : 'remarks',
                        loadMask : true,
                        dataSource : {
                            xtype: 'Store',
                            xns: Roo.data,
                            listeners : {
                                beforeload : function (_self, o)
                                {
                                
                                    if (!_this.data || !_this.data.data) {
                                        Roo.MessageBox.alert("error", "no data");
                                        return  false;
                                    }
                                    this.removeAll();
                                    this.loadData({ data: _this.data.data, length  : _this.data.data.length } );
                                    
                                    return false;
                                    
                                    if (!_this.data) {
                                        return;
                                    }
                                    o.params.id = _this.data.id;
                                    
                                }
                            },
                            remoteSort : true,
                            sortInfo : { field : 'honor', direction: 'ASC' },
                            proxy : {
                                xtype: 'HttpProxy',
                                xns: Roo.data,
                                method : 'GET',
                                url : baseURL + '/PressRelease/Import/Journalist'
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
                                        'name': 'category_type_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'honor',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'name',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'name_alt',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'company_id_name',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'role',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'email',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'email_personal',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'phone',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'fax',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'address',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'category_media_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'submission_time',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'contact_language',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'url',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'remarks',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'phone_mobile',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'phone_direct',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'firstname',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'lastname',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'firstname_alt',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'lastname_alt',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'publication_name',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'publication_name_alt',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'publication_lang',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'category_scope_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'contact_language_alt',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'country',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'best_contact_method',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'best_contact_from',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'best_contact_to',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'best_contact_days',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'publication_lang_alt',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'city',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'category_type_id_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'category_type_id_parent_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'category_type_id_name',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'category_type_id_display_order',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'category_type_id_visible',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'category_type_id_hgroup',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'category_media_id_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'category_media_id_parent_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'category_media_id_name',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'category_media_id_display_order',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'category_media_id_visible',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'category_media_id_hgroup',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'category_scope_id_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'category_scope_id_parent_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'category_scope_id_name',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'category_scope_id_display_order',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'category_scope_id_visible',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'category_scope_id_hgroup',
                                        'type': 'string'
                                    }
                                ]
                            }
                        },
                        colModel : [
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'id',
                                header : 'Id',
                                width : 20,
                                renderer : function(v,x,r) {
                                    if (v < 0) {
                                            return '';
                                    }    
                                    return 'EXISTS';
                                    
                                 }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'country',
                                header : 'Country',
                                width : 50,
                                renderer : function(v,x,r) {
                                    if (!v.length) {
                                            return '<span style="color:red">MISSING</span>';
                                    }    
                                    return String.format('{0}', v); 
                                    
                                 }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'id',
                                header : 'News Beat',
                                width : 50,
                                renderer : function(v,x,r) {
                                    if (!r.json.news_beat_id) {
                                            return '<span style="color:red">Invalid Newsbeat</span>';
                                    }    
                                    return String.format('{0}', r.json.news_beat); 
                                    
                                 }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'contact_language',
                                header : 'Contact language',
                                width : 40,
                                renderer : function(v,x,r) {
                                    if (!v.length) {
                                            return '<span style="color:red">NO LANG</span>';
                                    }    
                                    return String.format('{0}', v); 
                                    
                                 }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'contact_language_alt',
                                header : 'Contact language alt',
                                width : 50,
                                renderer : function(v) { return String.format('{0}', v); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'id',
                                header : 'Media Type',
                                width : 50,
                                renderer : function(v,x,r) {
                                    if (r.json.category_media_id * 1 < 1) {
                                        return String.format('<span style="color:red">Invalid:  {0}</span>',
                                            r.json.category_media_id_name);
                                    }    
                                    return String.format('{0}', r.json.category_media_id_name); 
                                    
                                 }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'id',
                                header : 'Pub. scope',
                                width : 50,
                                renderer : function(v,x,r) {
                                    if (r.json.category_scope_id * 1 < 1) {
                                        return String.format('<span style="color:red">Invalid:  {0}</span>',
                                            r.json.category_scope_id_name);
                                    }    
                                    return String.format('{0}', r.json.category_scope_id_name); 
                                    
                                 }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'publication_name',
                                header : 'Publication name',
                                width : 50,
                                renderer : function(v) { return String.format('{0}', v); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'firstname',
                                header : 'Firstname',
                                width : 50,
                                renderer : function(v) { return String.format('{0}', v); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'lastname',
                                header : 'Lastname',
                                width : 50,
                                renderer : function(v) { return String.format('{0}', v); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'role',
                                header : 'Role',
                                width : 75,
                                renderer : function(v) { return String.format('{0}', v); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'email',
                                header : 'Email',
                                width : 75,
                                renderer : function(v) { return String.format('{0}', v); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'phone_direct',
                                header : 'Direct',
                                width : 70,
                                renderer : function(v) { return String.format('{0}', v); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'phone',
                                header : 'Phone',
                                width : 70,
                                renderer : function(v) { return String.format('{0}', v); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'fax',
                                header : 'Fax',
                                width : 50,
                                renderer : function(v) { return String.format('{0}', v); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'url',
                                header : 'Url',
                                width : 50,
                                renderer : function(v) { return String.format('{0}', v); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'remarks',
                                header : 'Remarks',
                                width : 20,
                                renderer : function(v) { return String.format('{0}', v); }
                            }
                        ]
                    }
                }
            ],
            center : {
                xtype: 'LayoutRegion',
                xns: Roo,
                tabPosition : 'top'
            },
            buttons : [
                {
                    xtype: 'Button',
                    xns: Roo,
                    listeners : {
                        click : function (_self, e)
                        {
                                Pman.Dialog.Image.show({
                                    _url : baseURL + '/PressRelease/Import/Journalist?confirmed=1'
                                
                                }, function (d) {
                                    //Roo.log(d);
                                    
                                     (function() {
                                        Roo.MessageBox.alert("Done", "Upload completed");
                                        _this.dialog.hide();
                                     }).defer(300);
                                });
                        }
                    },
                    text : "confirm import"
                },
                {
                    xtype: 'Button',
                    xns: Roo,
                    listeners : {
                        click : function (_self, e)
                        {
                          _this.dialog.hide();
                        }
                    },
                    text : "cancel import"
                }
            ]
        });
    }
};
