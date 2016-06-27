//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminNotifyRecur = new Roo.XComponent({

 _strings : {
  '04df30d61712300fd31c24e2c7c8f9bc' :"Select core_notify",
  'be3c26f9baf09972ddc410c5c7c63403' :"Displaying core_notify_recur{0} - {1} of {2}",
  '808e3eefe289c698ec4def4a54ac36af' :"Last Notification created",
  '13a831874352b548ac7b5e63a860aa1b' :"Tz",
  'c348b06d2667edd048ded3c1b1878cc1' :"Recurrent Notifications",
  'c956c97343a45cca5d492e70c56daa8e' :"Select person",
  '25af45209313b11d55424103567a1347' :"Dtend",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  'effad6ff1d36887ce57d05300912bf61' :"No core_notify_recur found",
  '83b9a425d6b152330823ab8357f441ae' :"Dtstart",
  'ac2c474467a60fa4e2c88158a6d2abf9' :"Freq day",
  '40bed7cf9b3d4bb3a3d7a7e3eb18c5eb' :"Person",
  '6ffde0d71e2b678e619e4a642d0b22a6' :"Freq hour",
  '4c3880bb027f159e801041b1021e88e8' :"Method",
  'd8d80ec41fc8cca7569ac2d2937bd97b' :"Affects",
  '84307c751e4541f54714472e3df742dd' :"Freq"
 },

  part     :  ["Admin", "NotifyRecur" ],
  order    : '800-Pman.Tab.AdminNotifyRecur',
  region   : 'center',
  parent   : 'Pman.Tab.AdminWatchNotify',
  name     : "Pman.Tab.AdminNotifyRecur",
  disabled : false, 
  permname : '', 
  _tree : function()
  {
   var _this = this;
   var MODULE = this;
   return {
   background : true,
   fitContainer : true,
   fitToframe : true,
   region : 'center',
   tableName : 'core_notify_recur',
   title : _this._strings['c348b06d2667edd048ded3c1b1878cc1'] /* Recurrent Notifications */,
   xns : Roo,
   '|xns' : 'Roo',
   xtype : 'GridPanel',
   listeners : {
    activate : function() {
         _this.panel = this;
         if (_this.grid) {
             _this.grid.footer.onClick('first');
         }
     }
   },
   grid : {
    autoExpandColumn : 'person_id_name',
    loadMask : true,
    xns : Roo.grid,
    '|xns' : 'Roo.grid',
    xtype : 'Grid',
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
          if (!_this.dialog) { return; }
          _this.dialog.show( this.getDataSource().getAt(rowIndex).data, function() {
              _this.grid.footer.onClick('first');
          }); 
      }
    },
    footer : {
     displayInfo : true,
     displayMsg : _this._strings['be3c26f9baf09972ddc410c5c7c63403'] /* Displaying core_notify_recur{0} - {1} of {2} */,
     emptyMsg : _this._strings['effad6ff1d36887ce57d05300912bf61'] /* No core_notify_recur found */,
     pageSize : 25,
     xns : Roo,
     '|xns' : 'Roo',
     xtype : 'PagingToolbar'
    },
    toolbar : {
     xns : Roo,
     '|xns' : 'Roo',
     xtype : 'Toolbar',
     items  : [
      {
       allowBlank : true,
       displayField : 'person_id_name',
       editable : true,
       emptyText : _this._strings['c956c97343a45cca5d492e70c56daa8e'] /* Select person */,
       forceSelection : true,
       hiddenName : 'id',
       listWidth : 400,
       loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
       minChars : 2,
       name : 'name',
       pageSize : 20,
       qtip : _this._strings['04df30d61712300fd31c24e2c7c8f9bc'] /* Select core_notify */,
       queryParam : 'query[person_id_name]',
       selectOnFocus : true,
       tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{person_id_name}</b> {person_id_email}</div>',
       triggerAction : 'all',
       valueField : 'person_id',
       width : 300,
       xns : Roo.form,
       '|xns' : 'Roo.form',
       xtype : 'ComboBox',
       listeners : {
        render : function (_self)
         {
            _this.personCombo = _self;
         },
        select : function (combo, record, index)
         {
            (function() { _this.grid.footer.onClick('first'); }).defer(100);
         }
       },
       store : {
        remoteSort : true,
        sortInfo : { direction : 'ASC', field: 'person_id_name' },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        xtype : 'Store',
        listeners : {
         beforeload : function (_self, o){
              o.params = o.params || {};
              o.params._distinct='person_id';
              o.params._columns='person_id,person_id_name,person_id_email';
              o.params['!person_id_name'] = '';
              
              // set more here
          }
        },
        proxy : {
         method : 'GET',
         url : baseURL + '/Roo/core_notify_recur.php',
         xns : Roo.data,
         '|xns' : 'Roo.data',
         xtype : 'HttpProxy'
        },
        reader : {
         fields : [{"name":"id","type":"int"},{"name":"ontable","type":"string"}],
         id : 'id',
         root : 'data',
         totalProperty : 'total',
         xns : Roo.data,
         '|xns' : 'Roo.data',
         xtype : 'JsonReader'
        }
       }
      }
     ]
    },
    dataSource : {
     remoteSort : true,
     sortInfo : { field : 'person_id_name', direction: 'ASC' },
     xns : Roo.data,
     '|xns' : 'Roo.data',
     xtype : 'Store',
     listeners : {
      beforeload : function (_self, options)
       {
           if (!_this.personCombo) {
               return false;
           }
           var p = _this.personCombo.getValue();
           if (p*1) { 
               options.params.person_id = p;
           }
       }
     },
     proxy : {
      method : 'GET',
      url : baseURL + '/Roo/core_notify_recur.php',
      xns : Roo.data,
      '|xns' : 'Roo.data',
      xtype : 'HttpProxy'
     },
     reader : {
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
              'name': 'dtstart',
              'type': 'date',
              'dateFormat': 'Y-m-d'
          },
          {
              'name': 'dtend',
              'type': 'date',
              'dateFormat': 'Y-m-d'
          },
          {
              'name': 'max_applied_dt',
              'type': 'date',
              'dateFormat': 'Y-m-d'
          },
          {
              'name': 'updated_dt',
              'type': 'date',
              'dateFormat': 'Y-m-d'
          },
          {
              'name': 'last_applied_dt',
              'type': 'date',
              'dateFormat': 'Y-m-d'
          },
          {
              'name': 'tz',
              'type': 'string'
          },
          {
              'name': 'freq',
              'type': 'string'
          },
          {
              'name': 'freq_day',
              'type': 'string'
          },
          {
              'name': 'freq_hour',
              'type': 'string'
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
              'name': 'last_event_id',
              'type': 'int'
          },
          {
              'name': 'method',
              'type': 'string'
          }
      ],
      id : 'id',
      root : 'data',
      totalProperty : 'total',
      xns : Roo.data,
      '|xns' : 'Roo.data',
      xtype : 'JsonReader'
     }
    },
    colModel : [
     {
      dataIndex : 'person_id_name',
      header : _this._strings['40bed7cf9b3d4bb3a3d7a7e3eb18c5eb'] /* Person */,
      renderer : function(v,x,r) { 
          return String.format('{0} <a href="mailto:{1}">{1}</a>', v,r.data.person_id_email); 
      },
      width : 75,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'dtstart',
      header : _this._strings['83b9a425d6b152330823ab8357f441ae'] /* Dtstart */,
      renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y') : ''); },
      width : 75,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'dtend',
      header : _this._strings['25af45209313b11d55424103567a1347'] /* Dtend */,
      renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y') : ''); },
      width : 75,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'last_applied_dt',
      header : _this._strings['808e3eefe289c698ec4def4a54ac36af'] /* Last Notification created */,
      renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y') : ''); },
      width : 75,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'tz',
      header : _this._strings['13a831874352b548ac7b5e63a860aa1b'] /* Tz */,
      renderer : function(v) { return String.format('{0}', v); },
      width : 75,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'freq',
      header : _this._strings['84307c751e4541f54714472e3df742dd'] /* Freq */,
      renderer : function(v) { return String.format('{0}', v); },
      width : 100,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'freq_day',
      header : _this._strings['ac2c474467a60fa4e2c88158a6d2abf9'] /* Freq day */,
      renderer : function(v) { return String.format('{0}', v); },
      width : 200,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'freq_hour',
      header : _this._strings['6ffde0d71e2b678e619e4a642d0b22a6'] /* Freq hour */,
      renderer : function(v) { return String.format('{0}', v); },
      width : 200,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'onid',
      header : _this._strings['d8d80ec41fc8cca7569ac2d2937bd97b'] /* Affects */,
      renderer : function(v,x,r) { return String.format('{1}:{0}', v,r.data.ontable); },
      width : 75,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'method',
      header : _this._strings['4c3880bb027f159e801041b1021e88e8'] /* Method */,
      renderer : function(v) { return String.format('{0}', v); },
      width : 75,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     }
    ]
   }
  };  }
});
