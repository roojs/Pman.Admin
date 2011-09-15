//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)



// register the module first
Pman.on('beforeload', function()
{
    Pman.register({
        modKey : '950-Pman.Tab.AdminTranslations',
        module : Pman.Tab.AdminTranslations,
        region : 'center',
        parent : Pman.Tab.Admin,
        name : "Admin - Translations",
        disabled : false, 
        permname: 'Admin.Translations' 
    });
});

Pman.Tab.AdminTranslations = new Roo.util.Observable({

    panel : false,
    disabled : false,
    parentLayout:  false,

    add : function(parentLayout, region)
    {

        var _this = this;
        this.parentLayout = parentLayout;

        this.panel = parentLayout.addxtype({
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
                            autoExpandColumn : 'txt',
                            loadMask : true,
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
                            clicksToEdit : 1,
                            dataSource : {
                                xtype: 'Store',
                                xns: Roo.data,
                                reader : Pman.Readers.Category,
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
                                    }
                                },
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
                                    header : 'Translated (Click to Edit)',
                                    width : 150,
                                    dataIndex : 'txt',
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
                        title : "i18n",
                        grid : {
                            xtype: 'Grid',
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
                                rowdblclick : function (_self, rowIndex, e)
                                {
                                    if (!_this.dialog) return;
                                    _this.dialog.show( this.getDataSource().getAt(rowIndex), function() {
                                        _this.grid.footer.onClick('first');
                                    }); 
                                }
                            },
                            autoExpandColumn : 'ltype',
                            loadMask : true,
                            dataSource : {
                                xtype: 'Store',
                                xns: Roo.data,
                                remoteSort : true,
                                sortInfo : { field : 'ltype', direction: 'ASC' },
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
                            footer : {
                                xtype: 'PagingToolbar',
                                xns: Roo,
                                pageSize : 25,
                                displayInfo : true,
                                displayMsg : "Displaying i18n{0} - {1} of {2}",
                                emptyMsg : "No i18n found"
                            },
                            toolbar : {
                                xtype: 'Toolbar',
                                xns: Roo,
                                items : [
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
                                    },
                                    {
                                        xtype: 'Button',
                                        xns: Roo.Toolbar,
                                        text : "Add",
                                        cls : 'x-btn-text-icon',
                                        icon : Roo.rootURL + 'images/default/dd/drop-add.gif',
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
                                        xtype: 'Button',
                                        xns: Roo.Toolbar,
                                        text : "Edit",
                                        cls : 'x-btn-text-icon',
                                        icon : Roo.rootURL + 'images/default/tree/leaf.gif',
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
                                        xtype: 'Button',
                                        xns: Roo.Toolbar,
                                        text : "Delete",
                                        cls : 'x-btn-text-icon',
                                        icon : rootURL + '/Pman/templates/images/trash.gif',
                                        listeners : {
                                            click : function()
                                            {
                                                 Pman.genericDelete(_this, 'i18n'); 
                                            }
                                        }
                                    }
                                ]
                            },
                            colModel : [
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    header : 'Id',
                                    width : 75,
                                    dataIndex : 'id',
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    header : 'Ltype',
                                    width : 200,
                                    dataIndex : 'ltype',
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    header : 'Lkey',
                                    width : 200,
                                    dataIndex : 'lkey',
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    header : 'Inlang',
                                    width : 200,
                                    dataIndex : 'inlang',
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    header : 'Lval',
                                    width : 200,
                                    dataIndex : 'lval',
                                    renderer : function(v) { return String.format('{0}', v); }
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
        });
        this.layout = this.panel.layout;

    }
});
