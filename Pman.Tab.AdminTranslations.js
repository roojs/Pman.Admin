//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Pman.Tab.AdminTranslations = new Roo.XComponent({
    part     :  ["Admin","Translations"],
    order    : '950-Pman.Tab.AdminTranslations',
    region   : 'center',
    parent   : 'Pman.Tab.Admin',
    name     : "Admin - Translations",
    disabled : false, 
    permname : 'Admin.Translations', 
    _tree : function()
    {
        var _this = this;
        var MODULE = this;
        return {
            xtype: 'NestedLayoutPanel',
            xns: Roo,
            region : 'center',
            title : "Translate App",
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
                                   _this.grid.getDataSource().reload(); 
                                }
                            }
                        },
                        background : true,
                        fitContainer : true,
                        fitToframe : true,
                        region : 'center',
                        title : "Text in interface",
                        grid : {
                            xtype: 'EditorGrid',
                            xns: Roo.grid,
                            listeners : {
                                render : function() { 
                                    _this.grid = this; 
                                    //_this.dialog = Pman.Dialog.FILL_IN
                                    if (_this.panel.active) {
                                      _this.grid.getDataSource().reload(); 
                                    }
                                },
                                beforeedit : function(e) {
                                    console.log('beforeedit');
                                    //if (e.record.get('origtxt').indexOf('<') > -1) {
                                                       // console.log("HTML EDITOR!!");
                                                     
                                                    //    return false;
                                                    //}
                                                    if (e.record.get('txt').replace(/\s+/, '').length) {
                                                        return true;
                                                    }
                                                    if (e.record.get('suggest').length) {
                                                        e.record.set('txt', e.record.get('suggest'));
                                                    //    _this.saveRec(e.record);
                                                        return;
                                                    }
                                                    
                                                    
                                                    
                                                   
                                                    var tl = e.record.get('id').split('/')[0];
                                                  
                                                    tl = (tl == 'zh_HK') ? 'zh-TW' : tl; 
                                                    tl = tl.replace('_', '-');
                                                    var rec = e.record;
                                                    
                                                    
                                                    
                                                    Pman.gtranslate(e.record.get('origtxt'), 'en', tl, function(result) { 
                                                        if (typeof(result) == 'object') { //error
                                                            return; 
                                                           }
                                                        
                                                        if (_this.grid.activeEditor) {
                                                            _this.grid.activeEditor.setValue(result);
                                                        } else {
                                                            rec.set('txt',result);
                                                            //_this.saveRec(rec);
                                                        }
                                
                                                        //
                                                        
                                                        
                                                        //console.log(result.translation);
                                                    });
                                                    
                                                   
                                                    
                                                    return true;
                                                },
                                afteredit : function (e)
                                {
                                    var saveRec  = function(rec)
                                    {
                                        var g = _this.grid;
                                
                                        //g.getView().el.mask('Saving');
                                        Ext.Ajax.request({
                                            url : baseURL + '/Admin/Translations.php',
                                            method: 'POST',
                                            params : {
                                                id : rec.get('id'),
                                                txt : rec.get('txt'),
                                                lang :  _this.langCombo.getValue(),
                                                module :  _this.modCombo.getValue()
                                            },
                                            success : function()
                                            {
                                                //g.getView().el.unmask();
                                                //g.getDataSource().reload();
                                            },
                                            failure : function()
                                            {
                                                Ext.Msg.alert("Error", "There was a problem saving the data - try reloading");
                                               // g.getView().el.unmask();
                                            }
                                            
                                    });
                                        };
                                    
                                    saveRec.defer(1000, _this, [ e.record ]);
                                }
                            },
                            autoExpandColumn : 'txt',
                            clicksToEdit : 1,
                            loadMask : true,
                            dataSource : {
                                xtype: 'Store',
                                xns: Roo.data,
                                listeners : {
                                    beforeload : function (_self, opts)
                                    {
                                    
                                                            if (!_this.langCombo || !_this.langCombo.getValue().length) {
                                                                return false;
                                                            }
                                                            if (!_this.modCombo || !_this.modCombo.getValue().length) {
                                                                return false;
                                                            }
                                                            opts.params = {
                                                                lang :  _this.langCombo.getValue(),
                                                                module :  _this.modCombo.getValue()
                                                            };
                                    },
                                    loadexception : function (self, ret, load, jsonData)
                                    {
                                        Roo.MessageBox.alert("Error", jsonData);
                                    }
                                },
                                reader : Pman.Readers.Category,
                                proxy : {
                                    xtype: 'HttpProxy',
                                    xns: Roo.data,
                                    method : 'GET',
                                    url : baseURL + '/Admin/Translations.php'
                                },
                                reader : {
                                    xtype: 'JsonReader',
                                    xns: Roo.data,
                                    root : 'data',
                                    totalProperty : 'total',
                                    id : 'id',
                                    fields : [                    'id',             'tablename',             'tableid',             'colname',             'txt',             'lang',             { name:'updated', type:'date', dateFormat: 'Y-m-d H:i:s' },             { name:'origupdated', type:'date', dateFormat: 'Y-m-d H:i:s' },             'origtxt',             'msum',             'suggest'                  ]
                                }
                            },
                            toolbar : {
                                xtype: 'Toolbar',
                                xns: Roo,
                                items : [
                                    {
                                        xtype: 'ComboBox',
                                        xns: Roo.form,
                                        listeners : {
                                            render : function (_self)
                                            {
                                              _this.modCombo = _self;
                                            },
                                            select : function (combo, record, index)
                                            {
                                              _this.grid.getDataSource().reload(); 
                                            }
                                        },
                                        valueField : 'module',
                                        displayField : 'module',
                                        width : 200,
                                        typeAhead : false,
                                        editable : false,
                                        mode : 'local',
                                        triggerAction : 'all',
                                        emptyText : "Select Module",
                                        selectOnFocus : true,
                                        store : {
                                            xtype: 'SimpleStore',
                                            xns: Roo.data,
                                            data : (function() {             
                                                    var modlist = [];             
                                                    AppModules = typeof(AppModules) == 'undefined' ? '' : AppModules;
                                                    Roo.each( AppModules.split(','), function(mod) {            
                                                             modlist.push( [ mod ] );            
                                                  });             
                                                  return modlist;
                                               })(),
                                            fields : ['module']
                                        }
                                    },
                                    {
                                        xtype: 'ComboBox',
                                        xns: Roo.form,
                                        listeners : {
                                            select : function (combo, record, index)
                                            {
                                              _this.grid.getDataSource().reload(); 
                                            },
                                            render : function (_self)
                                            {
                                              _this.langCombo=_self;
                                            }
                                        },
                                        valueField : 'lang',
                                        displayField : 'ldisp',
                                        width : 200,
                                        typeAhead : false,
                                        editable : false,
                                        mode : 'local',
                                        triggerAction : 'all',
                                        emptyText : "Select Language",
                                        selectOnFocus : true,
                                        store : {
                                            xtype: 'SimpleStore',
                                            xns: Roo.data,
                                            fields : ['lang', 'ldisp'],
                                            data : [                                                [ 'zh_HK' , '\u7E41\u4E2D - Trad. Chin. (HK)' ],                         [ 'zh_CN', '\u7C21\u4E2D - Simp. Chin.' ]                     ]
                                        }
                                    }
                                ]
                            },
                            colModel : [
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    header : 'Name',
                                    width : 150,
                                    dataIndex : 'colname',
                                    renderer : function(v,x,r) {                         var c = '#666';                         if (r.get('updated') < r.get('origupdated')) {                             c = 'red';                         }                                                  return '<div style="color:'+c+'";>' +r.get('tableid')+ ':' + v + '</div>';                                              }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    header : 'Original',
                                    width : 300,
                                    dataIndex : 'origtxt',
                                    renderer : function(v,x,r) {                         var c = '#666';                         if (r.get('updated') < r.get('origupdated')) {                             c = 'red';                         }                         return '<div style="color:' + c+ '">' +                                  Ext.util.Format.htmlEncode(v) + '</div>';                                              }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'txt',
                                    header : 'Translated (Click to Edit)',
                                    width : 150,
                                    renderer : function(v,x,r) {                                                   var c = '#666';                         if (r.get('updated') < r.get('origupdated')) {                             c = 'red';                         }                                                  return '<div style="color:' + c+ '">' + Ext.util.Format.htmlEncode(v) + '</div>';                     },
                                    editor : {
                                        xtype: 'GridEditor',
                                        xns: Roo.grid,
                                        field : {
                                            xtype: 'TextField',
                                            xns: Roo.form
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        xtype: 'GridPanel',
                        xns: Roo,
                        listeners : {
                            activate : function() {
                                _this.langpanel = this;
                                if (_this.langgrid) {
                                    _this.langgrid.ds.load({});
                                }
                            }
                        },
                        background : true,
                        fitContainer : true,
                        fitToframe : true,
                        region : 'center',
                        tableName : 'i18n',
                        title : "Languages and Countries",
                        grid : {
                            xtype: 'EditorGrid',
                            xns: Roo.grid,
                            listeners : {
                                render : function() 
                                {
                                    _this.langgrid = this; 
                                    //_this.dialog = Pman.Dialog.FILL_IN
                                    if (_this.langpanel.active) {
                                       this.ds.load({});
                                    }
                                },
                                afteredit : function (e)
                                {
                                    var saveRec  = function(rec)
                                    {
                                        var g = _this.grid;
                                
                                        //g.getView().el.mask('Saving');
                                        Ext.Ajax.request({
                                            url : baseURL + '/Roo/I18n.php',
                                            method: 'POST',
                                            params : {
                                                id : rec.get('id'),
                                                lval : rec.get('lval')
                                            },
                                            success : function()
                                            {
                                                //g.getView().el.unmask();
                                                //g.getDataSource().reload();
                                            },
                                            failure : function()
                                            {
                                                Ext.Msg.alert("Error", "There was a problem saving the data - try reloading");
                                               // g.getView().el.unmask();
                                            }
                                            
                                    });
                                        };
                                    
                                    saveRec.defer(1000, _this, [ e.record ]);
                                },
                                beforeedit : function(e) {
                                    console.log('beforeedit');
                                    //if (e.record.get('origtxt').indexOf('<') > -1) {
                                                       // console.log("HTML EDITOR!!");
                                             
                                            //    return false;
                                            //}
                                            if (e.record.get('lval').replace(/\s+/, '').length) {
                                                return true;
                                            }
                                            
                                            
                                            var tl = _this.langgridCombo.getValue();
                                          
                                            tl = (tl == 'zh_HK') ? 'zh-TW' : tl; 
                                            tl = tl.replace('_', '-');
                                            var rec = e.record;
                                            
                                            
                                            
                                            Pman.gtranslate(e.record.get('lval_en'), 'en', tl, function(result) { 
                                                if (typeof(result) == 'object') { //error
                                                    return; 
                                                   }
                                                
                                                if (_this.grid.activeEditor) {
                                                    _this.grid.activeEditor.setValue(result);
                                                } else {
                                                    rec.set('lval',result);
                                                    //_this.saveRec(rec);
                                                }
                                
                                                //
                                                
                                                
                                                //console.log(result.translation);
                                            });
                                            
                                           
                                            
                                            return true;
                                        }
                            },
                            autoExpandColumn : 'lval',
                            clicksToEdit : 1,
                            loadMask : true,
                            dataSource : {
                                xtype: 'Store',
                                xns: Roo.data,
                                listeners : {
                                    beforeload : function (_self, options)
                                    {
                                       options  =options ||  {};
                                       options.params =options.params|| {};
                                       options.params.ltype = _this.langtypeCombo.getValue();
                                       options.params.inlang = _this.langgridCombo.getValue();
                                       options.params['query[_with_en]'] = 1;
                                       if (!options.params.ltype.length || !options.params.inlang.length) {
                                           return false;
                                       }
                                       
                                       options.params.limit = 9999;
                                       
                                    }
                                },
                                remoteSort : true,
                                sortInfo : { field : 'lkey', direction: 'ASC' },
                                proxy : {
                                    xtype: 'HttpProxy',
                                    xns: Roo.data,
                                    method : 'GET',
                                    url : baseURL + '/Roo/i18n.php'
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
                                            'name': 'ltype',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'lkey',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'inlang',
                                            'type': 'string'
                                        },
                                        {
                                            'name': 'lval',
                                            'type': 'string'
                                        }
                                    ]
                                }
                            },
                            toolbar : {
                                xtype: 'Toolbar',
                                xns: Roo,
                                items : [
                                    {
                                        xtype: 'ComboBox',
                                        xns: Roo.form,
                                        listeners : {
                                            render : function (_self)
                                            {
                                              _this.langtypeCombo = _self;
                                            },
                                            select : function (combo, record, index)
                                            {
                                              _this.langgrid.getDataSource().reload(); 
                                            }
                                        },
                                        displayField : 'lval',
                                        editable : false,
                                        emptyText : "Select Translation of",
                                        mode : 'local',
                                        selectOnFocus : true,
                                        triggerAction : 'all',
                                        typeAhead : false,
                                        valueField : 'lkey',
                                        width : 200,
                                        store : {
                                            xtype: 'SimpleStore',
                                            xns: Roo.data,
                                            data : [
                                               [ 'l', 'Language Names' ],
                                               [ 'c', 'Country Names' ],
                                                [ 'm', 'Currency Names' ]
                                            ],
                                            fields : ['lkey','lval']
                                        }
                                    },
                                    {
                                        xtype: 'ComboBox',
                                        xns: Roo.form,
                                        listeners : {
                                            select : function (combo, record, index)
                                            {
                                              _this.langgrid.getDataSource().reload(); 
                                            },
                                            render : function (_self)
                                            {
                                              _this.langgridCombo=_self;
                                            }
                                        },
                                        displayField : 'ldisp',
                                        editable : false,
                                        emptyText : "Select Language",
                                        mode : 'local',
                                        selectOnFocus : true,
                                        triggerAction : 'all',
                                        typeAhead : false,
                                        valueField : 'lang',
                                        width : 200,
                                        store : {
                                            xtype: 'SimpleStore',
                                            xns: Roo.data,
                                            fields : ['lang', 'ldisp'],
                                            data : [                                                [ 'zh_HK' , '\u7E41\u4E2D - Trad. Chin. (HK)' ],                         [ 'zh_CN', '\u7C21\u4E2D - Simp. Chin.' ]                     ]
                                        }
                                    }
                                ]
                            },
                            colModel : [
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'lkey',
                                    header : 'Code',
                                    width : 50,
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'lval_en',
                                    header : 'English',
                                    width : 150,
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'lval',
                                    header : 'Translation',
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
                                }
                            ]
                        }
                    }
                ],
                center : {
                    xtype: 'LayoutRegion',
                    xns: Roo,
                    alwaysShowTabs : true,
                    tabPosition : 'top'
                }
            }
        };
    }
});
