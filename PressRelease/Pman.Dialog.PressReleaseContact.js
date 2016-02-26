//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Pman.Dialog.PressReleaseContact = {

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
                _this.dialog.layout.getRegion('center').showPanel(0)
                }
            },
            closable : false,
            collapsible : false,
            height : 550,
            modal : true,
            resizable : false,
            title : "Edit / Create Person",
            width : 800,
            items : [
                {
                    xtype: 'NestedLayoutPanel',
                    xns: Roo,
                    region : 'center',
                    title : "Details",
                    layout : {
                        xtype: 'BorderLayout',
                        xns: Roo,
                        items : [
                            {
                                xtype: 'GridPanel',
                                xns: Roo,
                                listeners : {
                                    activate : function() {
                                        _this.panel = this;
                                        if (_this.grid) {
                                            //_this.grid.ds.load({});
                                        }
                                    }
                                },
                                background : false,
                                fitContainer : true,
                                fitToframe : true,
                                region : 'east',
                                tableName : 'pressrelease_category',
                                title : "pressrelease_category",
                                grid : {
                                    xtype: 'Grid',
                                    xns: Roo.grid,
                                    listeners : {
                                        render : function() 
                                        {
                                            _this.grid = this; 
                                            //_this.dialog = Pman.Dialog.FILL_IN
                                            if (_this.panel.active) {
                                            //   this.ds.load({});
                                            }
                                        },
                                        cellclick : function (_self, ri, ci , e)
                                        {
                                           if (ci != 1) {return; }
                                           
                                            var rec = this.ds.getAt(ri);
                                            rec.set('member', (rec.data.member * 1) ? 0 : 1);
                                           rec.commit();
                                        },
                                        rowclass : function (gridview, rowcfg)
                                        {
                                             Roo.log(rowcfg);
                                             // determine if we need to show it..
                                             var val=_this.beatfilter.getValue().toLowerCase();
                                             rowcfg.rowClass= '';
                                             if (!val.length) {
                                                return; // always show..
                                             }
                                             var match = false;
                                             var hg = rowcfg.record.data.hgroup.toLowerCase();
                                             var n = rowcfg.record.data.name.toLowerCase();     
                                             var re = new RegExp(val);
                                             
                                             if (hg.match(re) || n.match(re)) {
                                                return; // display it..
                                             }
                                             //Roo.log('display none');
                                             if (rowcfg.record.data.member * 1 > 0) {
                                               // return;
                                             }
                                             rowcfg.rowClass = 'display-none';
                                             
                                             
                                        }
                                    },
                                    autoExpandColumn : 'name',
                                    loadMask : true,
                                    filterResults : function() {
                                        
                                    },
                                    dataSource : {
                                        xtype: 'Store',
                                        xns: Roo.data,
                                        listeners : {
                                            beforeload : function (_self, options)
                                            {
                                                options.params =     options.params || {};
                                                options.params.parent_id_name = 'News Beat';
                                                options.params.for_beat = 1;
                                                options.params.contact_id = _this.data ? _this.data.id : 0;
                                                options.params.limit = 999;
                                            }
                                        },
                                        remoteSort : true,
                                        sortInfo : { field : 'hgroup,name', direction: 'ASC' },
                                        proxy : {
                                            xtype: 'HttpProxy',
                                            xns: Roo.data,
                                            method : 'GET',
                                            url : baseURL + '/Roo/pressrelease_category.php'
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
                                                    'name': 'parent_id',
                                                    'type': 'int'
                                                },
                                                {
                                                    'name': 'name',
                                                    'type': 'string'
                                                },
                                                {
                                                    'name': 'display_order',
                                                    'type': 'int'
                                                },
                                                {
                                                    'name': 'visible',
                                                    'type': 'int'
                                                }
                                            ]
                                        }
                                    },
                                    colModel : [
                                        {
                                            xtype: 'ColumnModel',
                                            xns: Roo.grid,
                                            dataIndex : 'name',
                                            header : 'News Beat',
                                            width : 200,
                                            renderer : function(v,x,r) { return String.format('{0}', (r.data.hgroup ? r.data.hgroup + ' : ' : '') + v); }
                                        },
                                        {
                                            xtype: 'ColumnModel',
                                            xns: Roo.grid,
                                            dataIndex : 'member',
                                            header : 'Member',
                                            width : 75,
                                            renderer : function(v) {  
                                                var state = v> 0 ?  '-checked' : '';
                                            
                                                return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                                                            
                                             }
                                        }
                                    ],
                                    toolbar : {
                                        xtype: 'Toolbar',
                                        xns: Roo,
                                        items : [
                                            {
                                                xtype: 'TextField',
                                                xns: Roo.form,
                                                listeners : {
                                                    keyup : function (_self, e)
                                                    {
                                                           _this.grid.view.refresh(true);
                                                        
                                                    
                                                    },
                                                    render : function (_self)
                                                    {
                                                      _this.beatfilter = _self;
                                                    }
                                                },
                                                width : 100
                                            },
                                            {
                                                xtype: 'Button',
                                                xns: Roo.Toolbar,
                                                listeners : {
                                                    click : function (_self, e)
                                                    {
                                                        _this.beatfilter.setValue('');
                                                         _this.grid.view.refresh(true);
                                                        
                                                    }
                                                },
                                                cls : 'x-btn-icon',
                                                icon : rootURL + '/Pman/templates/images/edit-clear.gif'
                                            },
                                            {
                                                xtype: 'Fill',
                                                xns: Roo.Toolbar
                                            },
                                            {
                                                xtype: 'Button',
                                                xns: Roo.Toolbar,
                                                listeners : {
                                                    click : function (_self, e)
                                                    {
                                                        
                                                        
                                                        _this.grid.ds.each(function(rec) {
                                                                rec.set('member', 0);
                                                                rec.commit();
                                                               
                                                        
                                                    
                                                        });
                                                    
                                                    }
                                                },
                                                text : "Reset"
                                            },
                                            {
                                                xtype: 'Button',
                                                xns: Roo.Toolbar,
                                                listeners : {
                                                    click : function (_self, e)
                                                    {
                                                        
                                                         // determine if we need to show it..
                                                         var val =_this.beatfilter.getValue().toLowerCase();
                                                         var re = false;
                                                         if (val.length) {
                                                             re = new RegExp(val);
                                                            
                                                         }
                                                         
                                                        
                                                        
                                                        _this.grid.ds.each(function(rec) {
                                                            if (!re) {        
                                                                rec.set('member',  1);
                                                                rec.commit();
                                                                return;
                                                            }
                                                            var hg = rec.data.hgroup.toLowerCase();
                                                             var n = rec.data.name.toLowerCase();
                                                              if (!hg.match(re) && !n.match(re)) {
                                                                return; // do not select it..
                                                             }
                                                        
                                                              rec.set('member',  1);
                                                            rec.commit();
                                                               
                                                        
                                                    
                                                        });
                                                    
                                                    }
                                                },
                                                text : "Select All"
                                            }
                                        ]
                                    }
                                }
                            },
                            {
                                xtype: 'ContentPanel',
                                xns: Roo,
                                autoScroll : true,
                                fitToFrame : true,
                                region : 'center',
                                items : [
                                    {
                                        xtype: 'Form',
                                        xns: Roo.form,
                                        listeners : {
                                            actioncomplete : function(_self,action)
                                            {
                                                if (action.type == 'setdata') {
                                                    if (_this.data.id) {
                                             
                                                       this.load({ method: 'GET', params: { '_id' : _this.data.id }});
                                                       return;
                                                   }
                                                   _this.grid.ds.load({});
                                                   return;
                                                }
                                                if (action.type == 'load') {
                                                    _this.dialog.el.unmask();
                                                    var l = this.findField('publication_lang').getValue();
                                                    this.setValues( {
                                                            publication_lang : l,
                                                            publication_lang_name : Pman.I18n.toName('l', l)
                                                    });
                                                    l = this.findField('contact_language_alt').getValue();
                                                    this.setValues( {
                                                            contact_language_alt : l,
                                                            contact_language_alt_name : Pman.I18n.toName('l', l)
                                                    });
                                                     l = this.findField('contact_language').getValue();
                                                    this.setValues( {
                                                            contact_language : l,
                                                            contact_language_name : Pman.I18n.toName('l', l)
                                                    });
                                                    
                                                    _this.grid.ds.load({});
                                                    return;
                                                    
                                                }
                                                if (action.type =='submit') {
                                                
                                             
                                                    _this.dialog.hide();
                                                
                                                     if (_this.callback) {
                                                        _this.callback.call(_this, _this.form.getValues());
                                                     }
                                                     _this.form.reset();
                                                     return;
                                                }
                                            },
                                            rendered : function (form)
                                            {
                                                _this.form= form;
                                            },
                                            actionfailed : function (_self, action)
                                            {
                                                _this.dialog.el.unmask();
                                                Roo.MessageBox.alert('Error', 'fix all the errors in red');
                                            }
                                        },
                                        labelAlign : 'right',
                                        labelWidth : 120,
                                        method : 'POST',
                                        style : 'margin:10px;',
                                        url : baseURL + '/Roo/Pressrelease_contact.php',
                                        items : [
                                            {
                                                xtype: 'ComboBox',
                                                xns: Roo.form,
                                                allowBlank : 'false',
                                                alwaysQuery : true,
                                                displayField : 'name',
                                                editable : 'false',
                                                emptyText : "Select type",
                                                fieldLabel : 'Type',
                                                forceSelection : true,
                                                hiddenName : 'category_type_id',
                                                listWidth : 400,
                                                loadingText : "Searching...",
                                                minChars : 2,
                                                name : 'category_type_id_name',
                                                pageSize : 20,
                                                qtip : "Select type",
                                                queryParam : 'query[name]',
                                                selectOnFocus : true,
                                                tpl : '<div class="x-grid-cell-text x-btn button"><b>{name}</b> </div>',
                                                triggerAction : 'all',
                                                typeAhead : true,
                                                valueField : 'id',
                                                width : 300,
                                                store : {
                                                    xtype: 'Store',
                                                    xns: Roo.data,
                                                    listeners : {
                                                        beforeload : function (_self, o){
                                                            o.params = o.params || {};
                                                            o.params.parent_id_name = 'Type of Database';
                                                            // set more here
                                                        }
                                                    },
                                                    remoteSort : true,
                                                    sortInfo : { direction : 'ASC', field: 'id' },
                                                    proxy : {
                                                        xtype: 'HttpProxy',
                                                        xns: Roo.data,
                                                        method : 'GET',
                                                        url : baseURL + '/Roo/pressrelease_category.php'
                                                    },
                                                    reader : {
                                                        xtype: 'JsonReader',
                                                        xns: Roo.data,
                                                        id : 'id',
                                                        root : 'data',
                                                        totalProperty : 'total',
                                                        fields : [{"name":"id","type":"int"},{"name":"name","type":"string"}]
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'FieldSet',
                                                xns: Roo.form,
                                                legend : "Personal Details",
                                                items : [
                                                    {
                                                        xtype: 'ComboBox',
                                                        xns: Roo.form,
                                                        displayField : 'val',
                                                        editable : false,
                                                        emptyText : "Title",
                                                        fieldLabel : 'Honorific',
                                                        forceSelection : false,
                                                        listWidth : 200,
                                                        loadingText : "Searching...",
                                                        mode : 'local',
                                                        name : 'honor',
                                                        selectOnFocus : false,
                                                        tpl : '<div class="x-grid-cell-text x-btn button"><b>{val}</b> </div>',
                                                        triggerAction : 'all',
                                                        typeAhead : true,
                                                        valueField : 'type',
                                                        width : 100,
                                                        store : {
                                                            xtype: 'SimpleStore',
                                                            xns: Roo.data,
                                                            data : [ 
                                                                [ 'Mr' ],
                                                                [ 'Mrs' ],
                                                                [ 'Ms' ]
                                                            ],
                                                            fields : [ 'val']
                                                        }
                                                    },
                                                    {
                                                        xtype: 'Row',
                                                        xns: Roo.form,
                                                        width : 450,
                                                        items : [
                                                            {
                                                                xtype: 'Column',
                                                                xns: Roo.form,
                                                                labelWidth : 120,
                                                                width : 270,
                                                                items : [
                                                                    {
                                                                        xtype: 'TextField',
                                                                        xns: Roo.form,
                                                                        allowBlank : true,
                                                                        emptyText : "",
                                                                        fieldLabel : 'Name (First/Last)',
                                                                        name : 'firstname',
                                                                        width : 140
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'Column',
                                                                xns: Roo.form,
                                                                hideLabels : true,
                                                                style : 'margin-left:5px',
                                                                width : 160,
                                                                items : [
                                                                    {
                                                                        xtype: 'TextField',
                                                                        xns: Roo.form,
                                                                        allowBlank : true,
                                                                        emptyText : "",
                                                                        fieldLabel : 'Name',
                                                                        name : 'lastname',
                                                                        width : 150
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'Row',
                                                        xns: Roo.form,
                                                        width : 450,
                                                        items : [
                                                            {
                                                                xtype: 'Column',
                                                                xns: Roo.form,
                                                                labelWidth : 120,
                                                                width : 270,
                                                                items : [
                                                                    {
                                                                        xtype: 'TextField',
                                                                        xns: Roo.form,
                                                                        allowBlank : true,
                                                                        emptyText : "",
                                                                        fieldLabel : 'Local (First/Last)',
                                                                        name : 'firstname_alt',
                                                                        width : 140
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'Column',
                                                                xns: Roo.form,
                                                                hideLabels : true,
                                                                style : 'margin-left:5px',
                                                                width : 160,
                                                                items : [
                                                                    {
                                                                        xtype: 'TextField',
                                                                        xns: Roo.form,
                                                                        allowBlank : true,
                                                                        fieldLabel : 'Name',
                                                                        name : 'lastname_alt',
                                                                        width : 150
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'TextField',
                                                        xns: Roo.form,
                                                        fieldLabel : 'Job Title',
                                                        name : 'role',
                                                        width : 300
                                                    },
                                                    {
                                                        xtype: 'Row',
                                                        xns: Roo.form,
                                                        width : 450,
                                                        items : [
                                                            {
                                                                xtype: 'Column',
                                                                xns: Roo.form,
                                                                labelWidth : 120,
                                                                width : 270,
                                                                items : [
                                                                    {
                                                                        xtype: 'ComboBox',
                                                                        xns: Roo.form,
                                                                        allowBlank : false,
                                                                        alwaysQuery : true,
                                                                        displayField : 'title',
                                                                        editable : false,
                                                                        fieldLabel : 'Spoken Lang.',
                                                                        hiddenName : 'contact_language',
                                                                        listWidth : 200,
                                                                        name : 'contact_language_name',
                                                                        triggerAction : 'all',
                                                                        valueField : 'code',
                                                                        width : 140,
                                                                        store : {
                                                                            xtype: 'SimpleStore',
                                                                            xns: Roo.data,
                                                                            data : (function() {
                                                                                return Pman.I18n.simpleStoreData('l');
                                                                            })(),
                                                                            fields : [  'code', 'title' ]
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'Column',
                                                                xns: Roo.form,
                                                                hideLabels : true,
                                                                style : 'margin-left:5px',
                                                                width : 160,
                                                                items : [
                                                                    {
                                                                        xtype: 'ComboBox',
                                                                        xns: Roo.form,
                                                                        allowBlank : true,
                                                                        alwaysQuery : true,
                                                                        displayField : 'title',
                                                                        editable : false,
                                                                        fieldLabel : 'Spoken Lang.',
                                                                        hiddenName : 'contact_language_alt',
                                                                        listWidth : 200,
                                                                        name : 'contact_language_alt_name',
                                                                        triggerAction : 'all',
                                                                        valueField : 'code',
                                                                        width : 150,
                                                                        store : {
                                                                            xtype: 'SimpleStore',
                                                                            xns: Roo.data,
                                                                            data : (function() {
                                                                                return Pman.I18n.simpleStoreData('l');
                                                                            })(),
                                                                            fields : [  'code', 'title' ]
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'FieldSet',
                                                xns: Roo.form,
                                                legend : "Company / Publication",
                                                items : [
                                                    {
                                                        xtype: 'TextField',
                                                        xns: Roo.form,
                                                        fieldLabel : 'Company Name',
                                                        name : 'company_id_name',
                                                        width : 300
                                                    },
                                                    {
                                                        xtype: 'TextField',
                                                        xns: Roo.form,
                                                        allowBlank : false,
                                                        fieldLabel : 'Publication Name',
                                                        name : 'publication_name',
                                                        width : 300
                                                    },
                                                    {
                                                        xtype: 'TextField',
                                                        xns: Roo.form,
                                                        fieldLabel : 'Publ. Name (Local)',
                                                        name : 'publication_name_alt',
                                                        width : 300
                                                    },
                                                    {
                                                        xtype: 'ComboBox',
                                                        xns: Roo.form,
                                                        allowBlank : false,
                                                        alwaysQuery : true,
                                                        displayField : 'title',
                                                        editable : false,
                                                        fieldLabel : 'Country',
                                                        hiddenName : 'country',
                                                        listWidth : 300,
                                                        name : 'country_name',
                                                        triggerAction : 'all',
                                                        valueField : 'code',
                                                        width : 300,
                                                        store : {
                                                            xtype: 'SimpleStore',
                                                            xns: Roo.data,
                                                            data : (function() {
                                                                // if the user is only allowed to edit specific countries..
                                                                // then only display a list of that...
                                                                
                                                                var filter = false;
                                                                if (Pman.hasPerm && Pman.hasPerm("PressRelease.JournalistAll","S")) {
                                                                    if (Pman.Login.authUser.role.length) {
                                                                        var clist = Pman.Login.authUser.role.split(",");
                                                                        filter = function(o) {
                                                                            return clist.indexOf(o.code) > -1 ? true : false;
                                                                        };
                                                                    }
                                                                }
                                                            
                                                                return Pman.I18n.simpleStoreData('c', filter); 
                                                                
                                                            })(),
                                                            fields : [  'code', 'title' ]
                                                        }
                                                    },
                                                    {
                                                        xtype: 'TextField',
                                                        xns: Roo.form,
                                                        fieldLabel : 'City',
                                                        name : 'city',
                                                        width : 300
                                                    },
                                                    {
                                                        xtype: 'Row',
                                                        xns: Roo.form,
                                                        width : 450,
                                                        items : [
                                                            {
                                                                xtype: 'Column',
                                                                xns: Roo.form,
                                                                labelWidth : 120,
                                                                width : 270,
                                                                items : [
                                                                    {
                                                                        xtype: 'ComboBox',
                                                                        xns: Roo.form,
                                                                        allowBlank : false,
                                                                        alwaysQuery : true,
                                                                        displayField : 'title',
                                                                        editable : false,
                                                                        fieldLabel : 'Print Language(s)',
                                                                        hiddenName : 'publication_lang',
                                                                        listWidth : 200,
                                                                        name : 'publication_lang_name',
                                                                        triggerAction : 'all',
                                                                        valueField : 'code',
                                                                        width : 145,
                                                                        store : {
                                                                            xtype: 'SimpleStore',
                                                                            xns: Roo.data,
                                                                            data : (function() {
                                                                                return Pman.I18n.simpleStoreData('l');
                                                                            })(),
                                                                            fields : [  'code', 'title' ]
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'Column',
                                                                xns: Roo.form,
                                                                hideLabels : true,
                                                                style : 'margin-left:5px',
                                                                width : 160,
                                                                items : [
                                                                    {
                                                                        xtype: 'ComboBox',
                                                                        xns: Roo.form,
                                                                        allowBlank : true,
                                                                        alwaysQuery : true,
                                                                        displayField : 'title',
                                                                        editable : false,
                                                                        fieldLabel : 'Print Language',
                                                                        hiddenName : 'publication_lang_alt',
                                                                        listWidth : 200,
                                                                        name : 'publication_lang_alt_name',
                                                                        triggerAction : 'all',
                                                                        valueField : 'code',
                                                                        width : 150,
                                                                        store : {
                                                                            xtype: 'SimpleStore',
                                                                            xns: Roo.data,
                                                                            data : (function() {
                                                                                return Pman.I18n.simpleStoreData('l');
                                                                            })(),
                                                                            fields : [  'code', 'title' ]
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'ComboBox',
                                                        xns: Roo.form,
                                                        allowBlank : false,
                                                        alwaysQuery : true,
                                                        displayField : 'name',
                                                        editable : 'false',
                                                        emptyText : "Select scope",
                                                        fieldLabel : 'Publication Scope',
                                                        forceSelection : true,
                                                        hiddenName : 'category_scope_id',
                                                        listWidth : 400,
                                                        loadingText : "Searching...",
                                                        minChars : 2,
                                                        name : 'category_scope_id_name',
                                                        pageSize : 20,
                                                        qtip : "Select type",
                                                        queryParam : 'query[name]',
                                                        selectOnFocus : true,
                                                        tpl : '<div class="x-grid-cell-text x-btn button"><b>{name}</b> </div>',
                                                        triggerAction : 'all',
                                                        typeAhead : true,
                                                        valueField : 'id',
                                                        width : 300,
                                                        store : {
                                                            xtype: 'Store',
                                                            xns: Roo.data,
                                                            listeners : {
                                                                beforeload : function (_self, o){
                                                                    o.params = o.params || {};
                                                                    // set more here
                                                                     o.params.parent_id_name = 'Publication Scope';
                                                                }
                                                            },
                                                            remoteSort : true,
                                                            sortInfo : { direction : 'ASC', field: 'id' },
                                                            proxy : {
                                                                xtype: 'HttpProxy',
                                                                xns: Roo.data,
                                                                method : 'GET',
                                                                url : baseURL + '/Roo/pressrelease_category.php'
                                                            },
                                                            reader : {
                                                                xtype: 'JsonReader',
                                                                xns: Roo.data,
                                                                id : 'id',
                                                                root : 'data',
                                                                totalProperty : 'total',
                                                                fields : [{"name":"id","type":"int"},{"name":"name","type":"string"}]
                                                            }
                                                        }
                                                    },
                                                    {
                                                        xtype: 'ComboBox',
                                                        xns: Roo.form,
                                                        allowBlank : 'false',
                                                        alwaysQuery : true,
                                                        displayField : 'name',
                                                        editable : 'false',
                                                        emptyText : "Select type of media",
                                                        fieldLabel : 'Media Type',
                                                        forceSelection : true,
                                                        hiddenName : 'category_media_id',
                                                        listWidth : 400,
                                                        loadingText : "Searching...",
                                                        minChars : 2,
                                                        name : 'category_media_id_name',
                                                        pageSize : 20,
                                                        qtip : "Select type",
                                                        queryParam : 'query[name]',
                                                        selectOnFocus : true,
                                                        tpl : '<div class="x-grid-cell-text x-btn button"><b>{name}</b> </div>',
                                                        triggerAction : 'all',
                                                        typeAhead : true,
                                                        valueField : 'id',
                                                        width : 300,
                                                        store : {
                                                            xtype: 'Store',
                                                            xns: Roo.data,
                                                            listeners : {
                                                                beforeload : function (_self, o){
                                                                    o.params = o.params || {};
                                                                    // set more here
                                                                     o.params.parent_id_name = 'Type of Media';
                                                                }
                                                            },
                                                            remoteSort : true,
                                                            sortInfo : { direction : 'ASC', field: 'id' },
                                                            proxy : {
                                                                xtype: 'HttpProxy',
                                                                xns: Roo.data,
                                                                method : 'GET',
                                                                url : baseURL + '/Roo/pressrelease_category.php'
                                                            },
                                                            reader : {
                                                                xtype: 'JsonReader',
                                                                xns: Roo.data,
                                                                id : 'id',
                                                                root : 'data',
                                                                totalProperty : 'total',
                                                                fields : [{"name":"id","type":"int"},{"name":"name","type":"string"}]
                                                            }
                                                        }
                                                    },
                                                    {
                                                        xtype: 'TextField',
                                                        xns: Roo.form,
                                                        fieldLabel : 'Website',
                                                        name : 'url',
                                                        width : 300
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'FieldSet',
                                                xns: Roo.form,
                                                legend : "Phone numbers",
                                                items : [
                                                    {
                                                        xtype: 'Row',
                                                        xns: Roo.form,
                                                        width : 450,
                                                        items : [
                                                            {
                                                                xtype: 'Column',
                                                                xns: Roo.form,
                                                                labelAlign : 'right',
                                                                labelWidth : 80,
                                                                width : 230,
                                                                items : [
                                                                    {
                                                                        xtype: 'TextField',
                                                                        xns: Roo.form,
                                                                        allowBlank : true,
                                                                        fieldLabel : 'Office+Ext',
                                                                        name : 'phone',
                                                                        width : 120
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'Column',
                                                                xns: Roo.form,
                                                                labelAlign : 'right',
                                                                labelWidth : 50,
                                                                width : 200,
                                                                items : [
                                                                    {
                                                                        xtype: 'TextField',
                                                                        xns: Roo.form,
                                                                        allowBlank : true,
                                                                        fieldLabel : 'Direct',
                                                                        name : 'phone_direct',
                                                                        width : 120
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'Row',
                                                        xns: Roo.form,
                                                        width : 450,
                                                        items : [
                                                            {
                                                                xtype: 'Column',
                                                                xns: Roo.form,
                                                                labelAlign : 'right',
                                                                labelWidth : 80,
                                                                width : 230,
                                                                items : [
                                                                    {
                                                                        xtype: 'TextField',
                                                                        xns: Roo.form,
                                                                        allowBlank : true,
                                                                        fieldLabel : 'Mobile',
                                                                        name : 'phone_mobile',
                                                                        width : 120
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'Column',
                                                                xns: Roo.form,
                                                                labelAlign : 'right',
                                                                labelWidth : 50,
                                                                width : 200,
                                                                items : [
                                                                    {
                                                                        xtype: 'TextField',
                                                                        xns: Roo.form,
                                                                        allowBlank : true,
                                                                        fieldLabel : 'Fax',
                                                                        name : 'fax',
                                                                        width : 120
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'FieldSet',
                                                xns: Roo.form,
                                                legend : "Contact Details",
                                                items : [
                                                    {
                                                        xtype: 'TextField',
                                                        xns: Roo.form,
                                                        fieldLabel : 'Email',
                                                        name : 'email',
                                                        vtype : 'email',
                                                        width : 300
                                                    },
                                                    {
                                                        xtype: 'TextField',
                                                        xns: Roo.form,
                                                        fieldLabel : 'Email (alt)',
                                                        name : 'email2',
                                                        vtype : 'email',
                                                        width : 300
                                                    },
                                                    {
                                                        xtype: 'TextField',
                                                        xns: Roo.form,
                                                        fieldLabel : 'Email (alt)',
                                                        name : 'email3',
                                                        vtype : 'email',
                                                        width : 300
                                                    },
                                                    {
                                                        xtype: 'TextField',
                                                        xns: Roo.form,
                                                        fieldLabel : 'Personal Email',
                                                        name : 'email_personal',
                                                        vtype : 'email',
                                                        width : 300
                                                    },
                                                    {
                                                        xtype: 'TextField',
                                                        xns: Roo.form,
                                                        fieldLabel : 'Twitter handle',
                                                        name : 'twitter',
                                                        width : 300
                                                    },
                                                    {
                                                        xtype: 'TextField',
                                                        xns: Roo.form,
                                                        fieldLabel : 'Blog Website',
                                                        name : 'blog_url',
                                                        vtype : 'url',
                                                        width : 300
                                                    },
                                                    {
                                                        xtype: 'TextArea',
                                                        xns: Roo.form,
                                                        fieldLabel : 'Address',
                                                        height : 100,
                                                        name : 'address',
                                                        width : 300
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'FieldSet',
                                                xns: Roo.form,
                                                legend : "Best Contacted",
                                                items : [
                                                    {
                                                        xtype: 'ComboBox',
                                                        xns: Roo.form,
                                                        displayField : 'hr',
                                                        editable : false,
                                                        fieldLabel : 'Method',
                                                        listWidth : 100,
                                                        mode : 'local',
                                                        name : 'best_contact_method',
                                                        triggerAction : 'all',
                                                        valueField : 'hr',
                                                        width : 100,
                                                        store : {
                                                            xtype: 'SimpleStore',
                                                            xns: Roo.data,
                                                            data : [ ['Email' ] ,[ 'Phone' ] ,[ 'Fax'] ],
                                                            fields : [  'hr' ]
                                                        }
                                                    },
                                                    {
                                                        xtype: 'DayPicker',
                                                        xns: Roo.form,
                                                        fieldLabel : 'Days',
                                                        name : 'best_contact_days'
                                                    },
                                                    {
                                                        xtype: 'ComboBox',
                                                        xns: Roo.form,
                                                        displayField : 'hrd',
                                                        editable : false,
                                                        fieldLabel : 'From',
                                                        hiddenName : 'best_contact_from',
                                                        listWidth : 80,
                                                        mode : 'local',
                                                        name : 'best_contact_from_hr',
                                                        triggerAction : 'all',
                                                        valueField : 'hr',
                                                        width : 80,
                                                        store : {
                                                            xtype: 'SimpleStore',
                                                            xns: Roo.data,
                                                            data : (function() {
                                                               var r = [];
                                                               for (var i =0;i < 24;i++) {
                                                                  var lh = i > 12 ? i-12 : i;
                                                                  lh = lh < 1 ? 12 : lh;
                                                                  var pm = i > 11  ? 'PM' : 'AM';
                                                                  r.push( [ i + ':00' , lh +':00 ' + pm]);
                                                                  r.push([ i + ':30', lh +':30 ' + pm]);
                                                               }
                                                               return r;
                                                            })(),
                                                            fields : [  'hr', 'hrd' ]
                                                        }
                                                    },
                                                    {
                                                        xtype: 'ComboBox',
                                                        xns: Roo.form,
                                                        displayField : 'hrd',
                                                        editable : false,
                                                        fieldLabel : 'To',
                                                        hiddenName : 'best_contact_to',
                                                        listWidth : 80,
                                                        mode : 'local',
                                                        name : 'best_contact_from_hr',
                                                        triggerAction : 'all',
                                                        valueField : 'hr',
                                                        width : 80,
                                                        store : {
                                                            xtype: 'SimpleStore',
                                                            xns: Roo.data,
                                                            data : (function() {
                                                               var r = [];
                                                               for (var i =0;i < 24;i++) {
                                                                  var lh = i > 12 ? i-12 : i;
                                                                  lh = lh < 1 ? 12 : lh;
                                                                  var pm = i > 11  ? 'PM' : 'AM';
                                                                  r.push( [ i + ':00' , lh +':00 ' + pm]);
                                                                  r.push([ i + ':30', lh +':30 ' + pm]);
                                                               }
                                                               return r;
                                                            })(),
                                                            fields : [  'hr', 'hrd' ]
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'Row',
                                                xns: Roo.form,
                                                labelAlign : 'top',
                                                items : [
                                                    {
                                                        xtype: 'TextArea',
                                                        xns: Roo.form,
                                                        fieldLabel : 'Notes',
                                                        height : 100,
                                                        name : 'remarks',
                                                        width : 450
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'Hidden',
                                                xns: Roo.form,
                                                name : 'beats'
                                            },
                                            {
                                                xtype: 'Hidden',
                                                xns: Roo.form,
                                                name : 'id'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        center : {
                            xtype: 'LayoutRegion',
                            xns: Roo
                        },
                        east : {
                            xtype: 'LayoutRegion',
                            xns: Roo,
                            width : 270
                        }
                    }
                },
                {
                    xtype: 'GridPanel',
                    xns: Roo,
                    listeners : {
                        activate : function() {
                            _this.hpanel = this;
                            if (_this.hgrid) {
                                _this.hgrid.ds.load({});
                            }
                        }
                    },
                    background : true,
                    fitContainer : true,
                    fitToframe : true,
                    region : 'center',
                    tableName : 'Events',
                    title : "History",
                    grid : {
                        xtype: 'Grid',
                        xns: Roo.grid,
                        listeners : {
                            render : function() 
                            {
                                _this.hgrid = this; 
                                //_this.dialog = Pman.Dialog.FILL_IN
                                if (_this.hpanel.active) {
                                   _this.hgrid.ds.load({});
                                }
                            }
                        },
                        autoExpandColumn : 'remarks',
                        loadMask : true,
                        dataSource : {
                            xtype: 'Store',
                            xns: Roo.data,
                            listeners : {
                                beforeload : function (_self, options)
                                {
                                    options.params =     options.params || {};
                                    options.params.on_table = 'pressrelease_contact';
                                    options.params.on_id = _this.form.findField('id').getValue() * 1;
                                    if (!options.params.on_id) {
                                        return false;
                                    }
                                        
                                }
                            },
                            remoteSort : true,
                            sortInfo : { field : 'id', direction: 'DESC' },
                            proxy : {
                                xtype: 'HttpProxy',
                                xns: Roo.data,
                                method : 'GET',
                                url : baseURL + '/Roo/Events.php'
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
                                        'name': 'person_name',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'event_when',
                                        'type': 'date',
                                        'dateFormat': 'Y-m-d'
                                    },
                                    {
                                        'name': 'action',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'ipaddr',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'on_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'on_table',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'remarks',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'person_id_office_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'person_id_name',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_phone',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_fax',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_email',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_company_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'person_id_role',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_active',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'person_id_remarks',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_passwd',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_owner_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'person_id_lang',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_no_reset_sent',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'person_id_action_type',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_project_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'person_id_deleted_by',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'person_id_deleted_dt',
                                        'type': 'date'
                                    }
                                ]
                            }
                        },
                        colModel : [
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                header : 'Event when',
                                width : 75,
                                dataIndex : 'event_when',
                                renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y') : ''); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'person_id_name',
                                header : 'Who',
                                width : 200,
                                renderer : function(v) { return String.format('{0}', v); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'action',
                                header : 'Action',
                                width : 100,
                                renderer : function(v) { return String.format('{0}', v); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                header : 'Remarks',
                                width : 200,
                                dataIndex : 'remarks',
                                renderer : function(v) { return String.format('{0}', v); }
                            }
                        ]
                    }
                },
                {
                    xtype: 'GridPanel',
                    xns: Roo,
                    listeners : {
                        activate : function() {
                            _this.circpanel = this;
                            if (_this.circgrid) {
                                _this.circgrid.footer.onClick('first');
                            }
                             
                        }
                    },
                    background : true,
                    fitContainer : true,
                    fitToframe : true,
                    region : 'center',
                    tableName : 'pressrelease_notify',
                    title : "Delivery History",
                    grid : {
                        xtype: 'Grid',
                        xns: Roo.grid,
                        listeners : {
                            render : function() 
                            {
                                _this.circgrid = this; 
                                //_this.dialog = Pman.Dialog.FILL_IN
                                if (_this.circpanel.active) {
                                   this.footer.onClick('first');
                                }
                            }
                        },
                        autoExpandColumn : 'event_id_remarks',
                        loadMask : true,
                        sm : {
                            xtype: 'RowSelectionModel',
                            xns: Roo.grid,
                            singleSelect : true
                        },
                        dataSource : {
                            xtype: 'Store',
                            xns: Roo.data,
                            listeners : {
                                beforeload : function (_self, o)
                                {
                                  o.params = o.params || {};
                                  o.params.ontable = 'pressrelease_entry';
                                  //
                                  
                                  //o.params.onid = _this.form.findField('id').getValue();
                                  //o.params.vtype = "FAILED";
                                  
                                  //o.params.fail_reviewed = 0;
                                  
                                  o.params.person_id = _this.form.findField('id').getValue() * 1;
                                  if (!o.params.person_id) {
                                    return false;
                                    
                                  }
                                
                                },
                                load : function (_self, records, options)
                                {
                                    Roo.log(records);
                                    if (!records.length) {
                                        _this.grid.footer.onClick('refresh');
                                    }
                                }
                            },
                            remoteSort : true,
                            sortInfo : { field : 'sent', direction: 'DESC' },
                            proxy : {
                                xtype: 'HttpProxy',
                                xns: Roo.data,
                                method : 'GET',
                                url : baseURL + '/Roo/pressrelease_notify.php'
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
                                        'name': 'act_when',
                                        'type': 'date',
                                        'dateFormat': 'Y-m-d'
                                    },
                                    {
                                        'name': 'onid',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'ontable',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'msgid',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'sent',
                                        'type': 'date',
                                        'dateFormat': 'Y-m-d'
                                    },
                                    {
                                        'name': 'bounced',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'person_id_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'person_id_category_type_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'person_id_honor',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_name',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_name_alt',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_company_id_name',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_role',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_email',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_email_personal',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_phone',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_fax',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_address',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_category_media_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'person_id_submission_time',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_publication_lang',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_url',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_remarks',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_phone_mobile',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_phone_direct',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_firstname',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_lastname',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_firstname_alt',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_lastname_alt',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_publication_name',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_publication_name_alt',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_category_scope_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'person_id_contact_language',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_contact_language_alt',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_country',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_best_contact_method',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_best_contact_from',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_best_contact_to',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_best_contact_days',
                                        'type': 'string'
                                    }
                                ]
                            }
                        },
                        footer : {
                            xtype: 'PagingToolbar',
                            xns: Roo,
                            displayInfo : true,
                            displayMsg : "Displaying history 0} - {1} of {2}",
                            emptyMsg : "No Items found",
                            pageSize : 25
                        },
                        colModel : [
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'id',
                                header : 'Ref#',
                                width : 50,
                                renderer : function(v) { return String.format('{0}', v); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'act_when',
                                header : 'Due out (Local time)',
                                width : 120,
                                renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y H:i') : ''); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'sent',
                                header : 'Sent',
                                width : 120,
                                renderer : function(v,x,r) { 
                                   if (!r.data.event_id) {
                                        return 'not sent yet';
                                   }
                                   
                                    return String.format('{0}', v ? v.format('d/M/Y H:i:s') : ''); 
                                }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'to_email',
                                header : 'Sent to',
                                width : 150,
                                renderer : function(v,x,r) { 
                                
                                    
                                        return String.format('<B>{0}</B>', v);
                                }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'event_id_remarks',
                                header : 'Status',
                                width : 150,
                                renderer : function(v,x,r) { 
                                     
                                    var tag = 'span';
                                    if (r.data.fail_reviewed * 1) {
                                        tag = 's';
                                    } 
                                     
                                    return String.format('<' + tag + ' qtip="{1}">{0}</' + tag + '>', v,String.format('{0}', v)); 
                                }
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
                            // do some checks?
                             
                            var beats = [];
                            _this.grid.ds.each(function(rec)  {
                                if (rec.data.member * 1) {
                                    beats.push(rec.data.id);
                                }
                                
                            });
                            _this.form.setValues({'beats' : beats.join(',')});
                            
                         
                            _this.form.doAction("submit");
                        
                        }
                    },
                    text : "Save"
                }
            ]
        });
    }
};
