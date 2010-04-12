//<script type="text/javascript">

// Auto generated file - created by Builder Module - do not edit directly



// register the module first
Pman.on('beforeload', function()
{
    var disabled = false;
    if (disabled) {
        return; 
    }
    Pman.register({
        modKey : '999-pman_tab_admintranslations',
        module : Pman.Tab.AdminTranslations,
        region : 'center',
        parent : Pman.Tab.Admin,
        name : "Admin - Translations"
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
            xtype : 'GridPanel',
            title : "Translations",
            fitToframe : true,
            fitContainer : true,
            background : true,
            listeners : {
                activate: function() {
                    _this.panel = this;
                    if (_this.grid) {
                       _this.grid.getDataSource().reload(); 
                    }
                }
            },
            grid : {
                xtype : 'EditorGrid',
                autoExpandColumn : 'txt',
                loadMask : true,
                listeners : {
                    render: function() { 
                        _this.grid = this; 
                        //_this.dialog = Pman.Dialog.FILL_IN
                        if (_this.panel.active) {
                          _this.grid.getDataSource().reload(); 
                        }
                    },
                    beforeedit: function(e) {
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
                                    } ,
                    afteredit: function (e)
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
                xns: Roo.Grid,
                dataSource : {
                    xtype : 'Store',
                    reader: Pman.Readers.Category,
                    listeners : {
                        beforeload: function (_self, opts)
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
                        xtype : 'HttpProxy',
                        method : 'GET',
                        url: baseURL + '/Admin/Translations.php'
                    },
                    reader : {
                        xtype : 'JsonReader',
                        xns: Roo.data,
                        root : 'data',
                        totalProperty : 'total',
                        id : 'id',
                        fields: [                    'id',             'tablename',             'tableid',             'colname',             'txt',             'lang',             { name:'updated', type:'date', dateFormat: 'Y-m-d H:i:s' },             { name:'origupdated', type:'date', dateFormat: 'Y-m-d H:i:s' },             'origtxt',             'msum',             'suggest'                  ]
                    }
                },
                colModel : [
                    {
                        header : 'Name',
                        width : 150,
                        dataIndex : 'colname',
                        renderer: function(v,x,r) {                         var c = '#666';                         if (r.get('updated') < r.get('origupdated')) {                             c = 'red';                         }                                                  return '<div style="color:'+c+'";>' +r.get('tableid')+ ':' + v + '</div>';                                              }
                    },
                    {
                        header : 'Original',
                        width : 300,
                        dataIndex : 'origtxt',
                        renderer: function(v,x,r) {                         var c = '#666';                         if (r.get('updated') < r.get('origupdated')) {                             c = 'red';                         }                         return '<div style="color:' + c+ '">' +                                  Ext.util.Format.htmlEncode(v) + '</div>';                                              }
                    },
                    {
                        header : 'Translated (Click to Edit)',
                        width : 150,
                        dataIndex : 'txt',
                        renderer: function(v,x,r) {                                                   var c = '#666';                         if (r.get('updated') < r.get('origupdated')) {                             c = 'red';                         }                                                  return '<div style="color:' + c+ '">' + Ext.util.Format.htmlEncode(v) + '</div>';                     },
                        editor : {
                            xtype : 'GridEditor',
                            xns: Roo.grid,
                            field : {
                                xtype : 'TextField',
                                xns: Roo.form
                            }
                        }
                    }
                ],
                toolbar : {
                    xtype : 'Toolbar',
                    items : [
                        {
                            xtype : 'ComboBox',
                            listeners : {
                                render: function (_self)
                                {
                                  _this.modCombo = _self;
                                },
                                select: function (combo, record, index)
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
                                xtype : 'SimpleStore',
                                xns: Roo.data,
                                fields: ['module'],
                                data: (function() {             var modlist = [];             Roo.each( AppModules.split(','), function(mod) {            
                                         modlist.push( [ mod ] );             });             return modlist;         })()
                            }
                        },
                        {
                            xtype : 'ComboBox',
                            listeners : {
                                select: function (combo, record, index)
                                {
                                  _this.grid.getDataSource().reload(); 
                                },
                                render: function (_self)
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
                                xtype : 'SimpleStore',
                                xns: Roo.data,
                                fields: ['lang', 'ldisp'],
                                data: [                                                [ 'zh_HK' , '\u7E41\u4E2D - Trad. Chin. (HK)' ],                         [ 'zh_CN', '\u7C21\u4E2D - Simp. Chin.' ]                     ]
                            }
                        }
                    ]
                }
            },
            region : 'center'
        });
    }
});
/*
--SOURCE--
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
*/
