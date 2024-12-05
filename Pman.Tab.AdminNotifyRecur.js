//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminNotifyRecur = new Roo.XComponent({

 _strings : {
  '04df30d61712300fd31c24e2c7c8f9bc' :"Select core_notify",
  'ec211f7c20af43e742bf2570c3cb84f9' :"Add",
  'be3c26f9baf09972ddc410c5c7c63403' :"Displaying core_notify_recur{0} - {1} of {2}",
  'c348b06d2667edd048ded3c1b1878cc1' :"Recurrent Notifications",
  'c956c97343a45cca5d492e70c56daa8e' :"Select person",
  '25af45209313b11d55424103567a1347' :"Dtend",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  'effad6ff1d36887ce57d05300912bf61' :"No core_notify_recur found",
  '21bddcad370deebd6d6544016b18ed23' :"On ID",
  '56abc507eda6d3226af192bf9b0e5d1f' :"What happens",
  '83b9a425d6b152330823ab8357f441ae' :"Dtstart",
  'ac2c474467a60fa4e2c88158a6d2abf9' :"Freq day",
  'b548a2ee926c118cc3211c5d8bb92a40' :"Who get's notified",
  '6ffde0d71e2b678e619e4a642d0b22a6' :"Freq hour",
  'f2a6c498fb90ee345d997f888fce3b18' :"Delete"
 },
 _named_strings : {
  'name_qtip' : '04df30d61712300fd31c24e2c7c8f9bc' /* Select core_notify */ ,
  'name_emptyText' : 'c956c97343a45cca5d492e70c56daa8e' /* Select person */ ,
  'name_loadingText' : '1243daf593fa297e07ab03bf06d925af' /* Searching... */ 
 },

  part     :  ["Admin", "NotifyRecur" ],
  order    : '800-Pman.Tab.AdminNotifyRecur',
  region   : 'center',
  parent   : 'Pman.Tab.AdminWatchNotify',
  name     : "Pman.Tab.AdminNotifyRecur",
  disabled : false, 
  permname : '', 
  _tree : function(_data)
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'GridPanel',
   background : true,
   fitContainer : true,
   fitToframe : true,
   region : 'center',
   tableName : 'core_notify_recur',
   title : _this._strings['c348b06d2667edd048ded3c1b1878cc1'] /* Recurrent Notifications */,
   listeners : {
    activate : function() {
         _this.panel = this;
         if (_this.grid) {
             _this.grid.footer.onClick('first');
         }
     }
   },
   xns : Roo,
   '|xns' : 'Roo',
   grid : {
    xtype : 'Grid',
    autoExpandColumn : 'person_id_name',
    loadMask : true,
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
          Pman.Dialog.AdminNotifyRecur.show( this.getDataSource().getAt(rowIndex).data, function() {
              _this.grid.footer.onClick('first');
          }); 
      }
    },
    xns : Roo.grid,
    '|xns' : 'Roo.grid',
    footer : {
     xtype : 'PagingToolbar',
     displayInfo : true,
     displayMsg : _this._strings['be3c26f9baf09972ddc410c5c7c63403'] /* Displaying core_notify_recur{0} - {1} of {2} */,
     emptyMsg : _this._strings['effad6ff1d36887ce57d05300912bf61'] /* No core_notify_recur found */,
     pageSize : 25,
     xns : Roo,
     '|xns' : 'Roo'
    },
    toolbar : {
     xtype : 'Toolbar',
     xns : Roo,
     '|xns' : 'Roo',
     items  : [
      {
       xtype : 'ComboBox',
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
       xns : Roo.form,
       '|xns' : 'Roo.form',
       store : {
        xtype : 'Store',
        remoteSort : true,
        sortInfo : { direction : 'ASC', field: 'person_id_name' },
        listeners : {
         beforeload : function (_self, o){
              o.params = o.params || {};
              o.params._distinct='person_id';
              o.params._columns='person_id,person_id_name,person_id_email';
              o.params['!person_id_name'] = '';
              
              // set more here
          }
        },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         url : baseURL + '/Roo/core_notify_recur.php',
         xns : Roo.data,
         '|xns' : 'Roo.data'
        },
        reader : {
         xtype : 'JsonReader',
         fields : [{"name":"id","type":"int"},{"name":"ontable","type":"string"}],
         id : 'id',
         root : 'data',
         totalProperty : 'total',
         xns : Roo.data,
         '|xns' : 'Roo.data'
        }
       }
      },
      {
       xtype : 'Fill',
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar'
      },
      {
       xtype : 'Button',
       cls : 'x-btn-text-icon',
       icon : Roo.rootURL + 'images/default/dd/drop-add.gif',
       text : _this._strings['ec211f7c20af43e742bf2570c3cb84f9'] /* Add */,
       listeners : {
        click : function()
         {
             Pman.Dialog.AdminNotifyRecur.show( {
                 id : 0,
                 dtstart_day : (new Date()).format('Y-m-d'),
                 dtend_day: '2100-01-01',
             } , function() {
                 _this.grid.footer.onClick('first');
            }); 
         }
       },
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar'
      },
      {
       xtype : 'Button',
       cls : 'x-btn-text-icon',
       icon : rootURL + '/Pman/templates/images/trash.gif',
       text : _this._strings['f2a6c498fb90ee345d997f888fce3b18'] /* Delete */,
       listeners : {
        click : function()
         {
              Pman.genericDelete(_this, 'core_notify_recur'); 
         }
       },
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar'
      }
     ]
    },
    dataSource : {
     xtype : 'Store',
     remoteSort : true,
     sortInfo : { field : 'person_id_name', direction: 'ASC' },
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
     xns : Roo.data,
     '|xns' : 'Roo.data',
     proxy : {
      xtype : 'HttpProxy',
      method : 'GET',
      url : baseURL + '/Roo/core_notify_recur.php',
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
      '|xns' : 'Roo.data'
     }
    },
    colModel : [
     {
      xtype : 'ColumnModel',
      dataIndex : 'dtstart',
      header : _this._strings['83b9a425d6b152330823ab8357f441ae'] /* Dtstart */,
      renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y') : ''); },
      width : 75,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'dtend',
      header : _this._strings['25af45209313b11d55424103567a1347'] /* Dtend */,
      renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y') : ''); },
      width : 75,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'freq_day',
      header : _this._strings['ac2c474467a60fa4e2c88158a6d2abf9'] /* Freq day */,
      renderer : function(v) { return String.format('{0}', v); },
      width : 200,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'freq_hour',
      header : _this._strings['6ffde0d71e2b678e619e4a642d0b22a6'] /* Freq hour */,
      renderer : function(v) { return String.format('{0}', v); },
      width : 200,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'person_id_name',
      header : _this._strings['b548a2ee926c118cc3211c5d8bb92a40'] /* Who get's notified */,
      renderer : function(v,x,r) { 
          return String.format('{0} <a href="mailto:{1}">{1}</a>', v,r.data.person_id_email); 
      },
      width : 75,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'medium',
      header : _this._strings['56abc507eda6d3226af192bf9b0e5d1f'] /* What happens */,
      renderer : function(v) {
          return String.format('{0}', v);
       },
      width : 300,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'onid',
      header : _this._strings['21bddcad370deebd6d6544016b18ed23'] /* On ID */,
      renderer : function(v,x,r) { return String.format('{0}', v); },
      width : 75,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     }
    ]
   }
  };  }
});
