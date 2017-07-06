//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminTranslations = new Roo.XComponent({

 _strings : {
  '0a52da7a03a6de3beefe54f8c03ad80d' :"Original",
  'ae739a236065a45c64ad51aacb19498c' :"Active?",
  '801ab24683a4a8c433c6eb40c48bcd9d' :"Download",
  'e2ade2e0b88406a390f59b5232abb328' :"Translated (Click to Edit)",
  '6dd08874f83507e9c7b23f1a46b7fa7c' :"Translation",
  '83dad8107f9459efe2b4fabcf5b63108' :"Select Language",
  'a1d1ae170f841c328acdc6052511ed8c' :"Text in interface",
  '78463a384a5aa4fad5fa73e2f506ecfc' :"English",
  '4e7c16d320ae129cc81b296e05748b3a' :"Translate App",
  '526d688f37a86d3c3f27d0c5016eb71d' :"Reset",
  'b51c3fa7e0ae26a1d88bf1279f265bb4' :"Select Module",
  '49ee3087348e8d44e1feda1917443987' :"Name",
  '552bcc4e00cd663f09cc4efbaca1cd45' :"Select Translation of",
  'ca0dbad92a874b2f69b549293387925e' :"Code",
  '0a9e8bd9e8b301dfb2c21c355e0b377d' :"Languages and Countries"
 },

  part     :  ["Admin", "Translations" ],
  order    : '950-Pman.Tab.AdminTranslations',
  region   : 'center',
  parent   : 'Pman.Tab.Admin',
  name     : "Admin - Translations",
  disabled : false, 
  permname : 'Admin.Translations', 
  _tree : function(_data)
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'NestedLayoutPanel',
   region : 'center',
   title : _this._strings['4e7c16d320ae129cc81b296e05748b3a'] /* Translate App */,
   xns : Roo,
   '|xns' : 'Roo',
   layout : {
    xtype : 'BorderLayout',
    xns : Roo,
    '|xns' : 'Roo',
    center : {
     xtype : 'LayoutRegion',
     alwaysShowTabs : true,
     tabPosition : 'top',
     xns : Roo,
     '|xns' : 'Roo'
    },
    items  : [
     {
      xtype : 'GridPanel',
      background : true,
      fitContainer : true,
      fitToframe : true,
      region : 'center',
      title : _this._strings['a1d1ae170f841c328acdc6052511ed8c'] /* Text in interface */,
      listeners : {
       activate : function() {
            _this.panel = this;
            if (_this.grid) {
               _this.grid.getDataSource().reload(); 
            }
        }
      },
      xns : Roo,
      '|xns' : 'Roo',
      grid : {
       xtype : 'EditorGrid',
       autoExpandColumn : 'txt',
       clicksToEdit : 1,
       loadMask : true,
       listeners : {
        afteredit : function (e)
         {
             var saveRec  = function(rec)
             {
                 var g = _this.grid;
         
                 //g.getView().el.mask('Saving');
                 new Pman.Request({
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
                         Roo.MessageBox.alert("Error", "There was a problem saving the data - try reloading");
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
        celldblclick : function (_self, rowIndex, columnIndex, e)
         {
             var di  = this.colModel.config[columnIndex].dataIndex;
             if (di != 'reset_tx') {
                 return;
             }
             rec = this.ds.getAt(rowIndex);
             
               var g = _this.grid;
          
             new Pman.Request({
                 url : baseURL + '/Admin/Translations.php',
                 method: 'POST',
                 params : {
                     id : rec.get('id'),
                     txt : '',
                     lang :  _this.langCombo.getValue(),
                     module :  _this.modCombo.getValue()
                 },
                 success : function()
                 {
                     //g.getView().el.unmask();
                     //g.getDataSource().reload();
                     rec.set('txt', '');
                 },
                 failure : function()
                 {
                     Roo.MessageBox.alert("Error", "There was a problem saving the data - try reloading");
                    // g.getView().el.unmask();
                 }
                 
             });
                
             
         },
        render : function() { 
             _this.grid = this; 
             //_this.dialog = Pman.Dialog.FILL_IN
             if (_this.panel.active) {
               _this.grid.getDataSource().reload(); 
             }
         }
       },
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       toolbar : {
        xtype : 'Toolbar',
        xns : Roo,
        '|xns' : 'Roo',
        items  : [
         {
          xtype : 'ComboBox',
          displayField : 'module',
          editable : false,
          emptyText : _this._strings['b51c3fa7e0ae26a1d88bf1279f265bb4'] /* Select Module */,
          mode : 'local',
          selectOnFocus : true,
          triggerAction : 'all',
          typeAhead : false,
          valueField : 'module',
          width : 200,
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
          xns : Roo.form,
          '|xns' : 'Roo.form',
          store : {
           xtype : 'SimpleStore',
           data : (function() {             
                   var modlist = [];             
                   AppModules = typeof(AppModules) == 'undefined' ? '' : AppModules;
                   Roo.each( AppModules.split(','), function(mod) {            
                            modlist.push( [ mod ] );            
                 });             
                 return modlist;
              })(),
           fields : ['module'],
           xns : Roo.data,
           '|xns' : 'Roo.data'
          }
         },
         {
          xtype : 'ComboBox',
          displayField : 'ldisp',
          editable : false,
          emptyText : _this._strings['83dad8107f9459efe2b4fabcf5b63108'] /* Select Language */,
          mode : 'local',
          selectOnFocus : true,
          triggerAction : 'all',
          typeAhead : false,
          valueField : 'lang',
          width : 200,
          listeners : {
           render : function (_self)
            {
              _this.langCombo=_self;
            },
           select : function (combo, record, index)
            {
              _this.grid.getDataSource().reload(); 
            }
          },
          xns : Roo.form,
          '|xns' : 'Roo.form',
          store : {
           xtype : 'SimpleStore',
           data : [                                                [ 'zh_HK' , '\u7E41\u4E2D - Trad. Chin. (HK)' ],                         [ 'zh_CN', '\u7C21\u4E2D - Simp. Chin.' ]                     ],
           fields : ['lang', 'ldisp'],
           xns : Roo.data,
           '|xns' : 'Roo.data'
          }
         },
         {
          xtype : 'Fill',
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         },
         {
          xtype : 'Button',
          text : _this._strings['801ab24683a4a8c433c6eb40c48bcd9d'] /* Download */,
          listeners : {
           click : function (_self, e)
            {
                new Pman.Download({
                    grid: _this.grid
                
                });
            }
          },
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         }
        ]
       },
       dataSource : {
        xtype : 'Store',
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
          },
         loadexception : function (self, ret, load, jsonData)
          {
              Roo.MessageBox.alert("Error", jsonData);
          }
        },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         url : baseURL + '/Admin/Translations.php',
         xns : Roo.data,
         '|xns' : 'Roo.data'
        },
        reader : {
         xtype : 'JsonReader',
         fields : [                    'id',             'tablename',             'tableid',             'colname',             'txt',             'lang',             { name:'updated', type:'date', dateFormat: 'Y-m-d H:i:s' },             { name:'origupdated', type:'date', dateFormat: 'Y-m-d H:i:s' },             'origtxt',             'msum',             'suggest'                  ],
         id : 'id',
         root : 'data',
         totalProperty : 'total',
         xns : Roo.data,
         '|xns' : 'Roo.data'
        }
       },
       colModel : [
        {
         xtype : 'ColumnModel',
         dataIndex : 'colname',
         header : _this._strings['49ee3087348e8d44e1feda1917443987'] /* Name */,
         renderer : function(v,x,r) {                       
           var c = '#666';                       
             if (r.get('updated') < r.get('origupdated')) {         
                                 c = 'red';                       
                                 
                                   }                                 
                                                    return '<div style="color:'+c+'";>' +r.get('tableid')+ ':' + v + '</div>';          
                                                                                        },
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'origtxt',
         header : _this._strings['0a52da7a03a6de3beefe54f8c03ad80d'] /* Original */,
         renderer : function(v,x,r) {                         var c = '#666';                         if (r.get('updated') < r.get('origupdated')) {                             c = 'red';                         }                         return '<div style="color:' + c+ '">' +                                  Ext.util.Format.htmlEncode(v) + '</div>';                                              },
         width : 300,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'reset_tx',
         header : _this._strings['526d688f37a86d3c3f27d0c5016eb71d'] /* Reset */,
         renderer : function(v,x,r) {    
             return  '<img src="' + rootURL + '/Pman/templates/images/edit-clear.gif' + '" width="16" height="16">';
         },
         width : 50,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'txt',
         header : _this._strings['e2ade2e0b88406a390f59b5232abb328'] /* Translated (Click to Edit) */,
         renderer : function(v,x,r) {                                                   var c = '#666';                         if (r.get('updated') < r.get('origupdated')) {                             c = 'red';                         }                                                  return '<div style="color:' + c+ '">' + Ext.util.Format.htmlEncode(v) + '</div>';                     },
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         editor : {
          xtype : 'GridEditor',
          xns : Roo.grid,
          '|xns' : 'Roo.grid',
          field : {
           xtype : 'TextField',
           xns : Roo.form,
           '|xns' : 'Roo.form'
          }
         }
        }
       ]
      }
     },
     {
      xtype : 'GridPanel',
      background : true,
      fitContainer : true,
      fitToframe : true,
      region : 'center',
      tableName : 'i18n',
      title : _this._strings['0a9e8bd9e8b301dfb2c21c355e0b377d'] /* Languages and Countries */,
      listeners : {
       activate : function() {
            _this.langpanel = this;
            if (_this.langgrid) {
                _this.langgrid.ds.load({});
            }
        }
      },
      xns : Roo,
      '|xns' : 'Roo',
      grid : {
       xtype : 'EditorGrid',
       autoExpandColumn : 'lval',
       clicksToEdit : 1,
       loadMask : true,
       listeners : {
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
                 },
        cellclick : function (_self, rowIndex, columnIndex, e)
         {
             if(_this.langgrid.colModel.getDataIndex(columnIndex) !== 'is_active'){
                 return;
             }
             
             var s = _this.langgrid.ds.getAt(rowIndex);
             
             if(!s || s.data.id * 1 < 0){
                 return;
             }
             
             s.set('is_active', s.data.is_active ? 0 : 1);
             
             new Pman.Request({
                 url : baseURL+'/Roo/I18n',
                 method : 'POST',
                 params : {
                     id : s.data.id,
                     is_active : s.data.is_active
                 }
             }); 
             
         },
        render : function() 
         {
             _this.langgrid = this; 
             //_this.dialog = Pman.Dialog.FILL_IN
             if (_this.langpanel.active) {
                this.ds.load({});
             }
         }
       },
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       toolbar : {
        xtype : 'Toolbar',
        xns : Roo,
        '|xns' : 'Roo',
        items  : [
         {
          xtype : 'ComboBox',
          displayField : 'lval',
          editable : false,
          emptyText : _this._strings['552bcc4e00cd663f09cc4efbaca1cd45'] /* Select Translation of */,
          mode : 'local',
          selectOnFocus : true,
          triggerAction : 'all',
          typeAhead : false,
          valueField : 'lkey',
          width : 200,
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
          xns : Roo.form,
          '|xns' : 'Roo.form',
          store : {
           xtype : 'SimpleStore',
           data : [
              [ 'l', 'Language Names' ],
              [ 'c', 'Country Names' ],
               [ 'm', 'Currency Names' ]
           ],
           fields : ['lkey','lval'],
           xns : Roo.data,
           '|xns' : 'Roo.data'
          }
         },
         {
          xtype : 'ComboBox',
          displayField : 'ldisp',
          editable : false,
          emptyText : _this._strings['83dad8107f9459efe2b4fabcf5b63108'] /* Select Language */,
          mode : 'local',
          selectOnFocus : true,
          triggerAction : 'all',
          typeAhead : false,
          valueField : 'lang',
          width : 200,
          listeners : {
           render : function (_self)
            {
              _this.langgridCombo=_self;
            },
           select : function (combo, record, index)
            {
              _this.langgrid.getDataSource().reload(); 
            }
          },
          xns : Roo.form,
          '|xns' : 'Roo.form',
          store : {
           xtype : 'SimpleStore',
           data : [                                                [ 'zh_HK' , '\u7E41\u4E2D - Trad. Chin. (HK)' ],                         [ 'zh_CN', '\u7C21\u4E2D - Simp. Chin.' ]                     ],
           fields : ['lang', 'ldisp'],
           xns : Roo.data,
           '|xns' : 'Roo.data'
          }
         }
        ]
       },
       dataSource : {
        xtype : 'Store',
        remoteSort : true,
        sortInfo : { field : 'lkey', direction: 'ASC' },
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
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         url : baseURL + '/Roo/i18n.php',
         xns : Roo.data,
         '|xns' : 'Roo.data'
        },
        reader : {
         xtype : 'JsonReader',
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
         ],
         id : 'id',
         root : 'data',
         totalProperty : 'total',
         xns : Roo.data,
         '|xns' : 'Roo.data'
        }
       },
       colModel : [
        {
         xtype : 'ColumnModel',
         dataIndex : 'lkey',
         header : _this._strings['ca0dbad92a874b2f69b549293387925e'] /* Code */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 50,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'lval_en',
         header : _this._strings['78463a384a5aa4fad5fa73e2f506ecfc'] /* English */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'lval',
         header : _this._strings['6dd08874f83507e9c7b23f1a46b7fa7c'] /* Translation */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         editor : {
          xtype : 'GridEditor',
          xns : Roo.grid,
          '|xns' : 'Roo.grid',
          field : {
           xtype : 'TextField',
           xns : Roo.form,
           '|xns' : 'Roo.form'
          }
         }
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'is_active',
         header : _this._strings['ae739a236065a45c64ad51aacb19498c'] /* Active? */,
         renderer : function(v,x,r) { 
         
             return '<img class="x-grid-check-icon' + (v*1 ? '-checked' : '')  + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                                                 
             
         },
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        }
       ]
      }
     }
    ]
   }
  };  }
});
