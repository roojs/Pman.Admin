//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminTranslationsInt = new Roo.XComponent({

 _strings : {
  'deccbe4e9083c3b5f7cd2632722765bb' :"Translate",
  '4994a8ffeba4ac3140beb89e8d41f174' :"Language",
  'ae739a236065a45c64ad51aacb19498c' :"Active?",
  'd41d8cd98f00b204e9800998ecf8427e' :"",
  '6dd08874f83507e9c7b23f1a46b7fa7c' :"Translation",
  '83dad8107f9459efe2b4fabcf5b63108' :"Select Language",
  '78463a384a5aa4fad5fa73e2f506ecfc' :"English",
  '552bcc4e00cd663f09cc4efbaca1cd45' :"Select Translation of",
  'ca0dbad92a874b2f69b549293387925e' :"Code",
  '0a9e8bd9e8b301dfb2c21c355e0b377d' :"Languages and Countries"
 },
 _named_strings : {
  'language_title_value' : 'd41d8cd98f00b204e9800998ecf8427e' /*  */ ,
  'language_title_qtip' : '83dad8107f9459efe2b4fabcf5b63108' /* Select Language */ ,
  'language_title_fieldLabel' : '4994a8ffeba4ac3140beb89e8d41f174' /* Language */ 
 },

  part     :  ["Admin", "TranslationInt" ],
  order    : '950-Pman.Tab.AdminTranslationsInt',
  region   : 'center',
  parent   : 'Pman.Tab.Admin',
  name     : "Admin - AdminTranslationsInt",
  disabled : false, 
  permname : 'Admin.TranslationsInt', 
  _tree : function(_data)
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'NestedLayoutPanel',
   region : 'center',
   title : _this._strings['deccbe4e9083c3b5f7cd2632722765bb'] /* Translate */,
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
                         lval : rec.get('lval'),
                         ltype : rec.get('ltype')
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
          allowBlank : false,
          displayField : 'title',
          editable : true,
          fieldLabel : _this._strings['4994a8ffeba4ac3140beb89e8d41f174'] /* Language */,
          hiddenName : 'language',
          listWidth : 300,
          minChars : 2,
          name : 'language_title',
          pageSize : 400,
          qtip : _this._strings['83dad8107f9459efe2b4fabcf5b63108'] /* Select Language */,
          queryParam : 'query[name_starts]',
          selectOnFocus : true,
          triggerAction : 'all',
          typeAhead : true,
          value : _this._strings['d41d8cd98f00b204e9800998ecf8427e'] /*  */,
          valueField : 'code',
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
           xtype : 'Store',
           sortInfo : { field : 'title', direction: 'ASC' },
           listeners : {
            beforeload : function (_self, options)
             {
                options  =options ||  {};
                options.params =options.params|| {};
                options.params.ltype = 'l';
                options.params.inlang = 'en';
                
                 options.params._as_code_and_title = 1;
                
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
         sortable : true,
         width : 50,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'lval_en',
         header : _this._strings['78463a384a5aa4fad5fa73e2f506ecfc'] /* English */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'lval',
         header : _this._strings['6dd08874f83507e9c7b23f1a46b7fa7c'] /* Translation */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
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
