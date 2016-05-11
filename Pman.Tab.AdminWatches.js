//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminWatches = new Roo.XComponent({

 _strings : {
  'ec211f7c20af43e742bf2570c3cb84f9' :"Add",
  '1a86349be7851cf03d6fe959b94ed6fb' :"Watch ID",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  'c4523f19258f444b936df7f96f57c7b9' :"Watch Table",
  '498f79c4c5bbde77f1bceb6c86fd0f6d' :"Show",
  '56abc507eda6d3226af192bf9b0e5d1f' :"What happens",
  '5e97bbccf01aa772225ef15435177395' :"(function() {Roo.log('title') ;Roo.log(_this); return _this.title || \"Watches\"; })()",
  'a4e70e911022ccc98ab8055a09222cf2' :"No core_watch found",
  'a8929eb5c1553d3f70497f862d25d0ce' :"Select Action",
  'b548a2ee926c118cc3211c5d8bb92a40' :"Who get's notified",
  '6ceb94ff48a58bd6d612b1f031d2c2ca' :"Displaying core_watch{0} - {1} of {2}",
  'c122d95a9c28f9a54baef2c7784bb038' :"Watch Event",
  'f2a6c498fb90ee345d997f888fce3b18' :"Delete",
  '4d3d769b812b6faa6b76e1a8abaece2d' :"Active",
  '314b26dabb519a609db698728284683f' :"Select Table"
 },

  part     :  ["Admin", "Watches" ],
  order    : '860-Pman.Tab.AdminWatches',
  region   : 'center',
  parent   : 'Pman.Tab.AdminWatchNotify',
  name     : "Pman.Tab.AdminWatches",
  disabled : false, 
  permname : '', 
  _tree : function()
  {
   var _this = this;
   var MODULE = this;
   return {
   autoScroll : false,
   background : true,
   fitContainer : true,
   fitToframe : true,
   region : 'center',
   tableName : 'core_watch',
   title : (function() {Roo.log('title') ;Roo.log(_this); return _this.title || "Watches"; })(),
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
          _this.dialog = Pman.Dialog.AdminWatch;
          if (_this.panel.active) {
             this.footer.onClick('first');
          }
      },
     rowdblclick : function (_self, rowIndex, e)
      {
          if (!_this.dialog) {
              return;
          }
          _this.dialog.show( this.getDataSource().getAt(rowIndex), function() {
              _this.grid.footer.onClick('first');
          }); 
      }
    },
    footer : {
     displayInfo : true,
     displayMsg : _this._strings['6ceb94ff48a58bd6d612b1f031d2c2ca'] /* Displaying core_watch{0} - {1} of {2} */,
     emptyMsg : _this._strings['a4e70e911022ccc98ab8055a09222cf2'] /* No core_watch found */,
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
       text : _this._strings['498f79c4c5bbde77f1bceb6c86fd0f6d'] /* Show */,
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar',
       xtype : 'TextItem'
      },
      {
       allowBlank : true,
       displayField : 'on_table',
       editable : false,
       emptyText : _this._strings['314b26dabb519a609db698728284683f'] /* Select Table */,
       forceSelection : true,
       listWidth : 300,
       loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
       minChars : 2,
       name : 'ontable',
       pageSize : 20,
       qtip : _this._strings['a8929eb5c1553d3f70497f862d25d0ce'] /* Select Action */,
       queryParam : 'query[ontable]',
       selectOnFocus : true,
       tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{on_table}</b> </div>',
       triggerAction : 'all',
       typeAhead : true,
       valueField : 'on_table',
       width : 150,
       xns : Roo.form,
       '|xns' : 'Roo.form',
       xtype : 'ComboBox',
       listeners : {
        render : function (_self)
         {
           _this.affectSel = _self;
         },
        select : function (combo, record, index)
         {
           _this.grid.footer.onClick('first');
         }
       },
       store : {
        remoteSort : true,
        sortInfo : { field : 'on_table' , direction : 'ASC' },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        xtype : 'Store',
        listeners : {
         beforeload : function (_self, o)
          {
              o.params = o.params || {};
              // staff can see all logs, other companies can only see their own.
              if (Pman.Login.authUser.company_id_comptype != 'OWNER') {
                  o.params.company_id = Pman.Login.authUser.company_id;
              }
              o.params._distinct = 'on_table';
              o.params._columns ='on_table';
          }
        },
        proxy : {
         method : 'GET',
         url : baseURL + '/Roo/Events.php',
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
                 'name': 'on_table',
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
       }
      },
      {
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar',
       xtype : 'Fill'
      },
      {
       cls : 'x-btn-text-icon',
       icon : Roo.rootURL + 'images/default/dd/drop-add.gif',
       text : _this._strings['ec211f7c20af43e742bf2570c3cb84f9'] /* Add */,
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar',
       xtype : 'Button',
       listeners : {
        click : function()
         {
             if (!_this.dialog) {
                  return;
              }
             _this.dialog.show( { id : 0 } , function() {
                 _this.grid.footer.onClick('first');
            }); 
         }
       }
      },
      {
       cls : 'x-btn-text-icon',
       icon : rootURL + '/Pman/templates/images/trash.gif',
       text : _this._strings['f2a6c498fb90ee345d997f888fce3b18'] /* Delete */,
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar',
       xtype : 'Button',
       listeners : {
        click : function()
         {
              Pman.genericDelete(_this, 'core_watch'); 
         }
       }
      }
     ]
    },
    dataSource : {
     remoteSort : true,
     sortInfo : { field : 'ontable', direction: 'ASC' },
     xns : Roo.data,
     '|xns' : 'Roo.data',
     xtype : 'Store',
     listeners : {
      beforeload : function (_self, options)
       {
               var val = _this.affectSel.getValue();
               if (val.length) {
                   options.params.ontable = val;
               }
               if (_this.requestArgs) { 
                   Roo.apply(options.params, _this.requestArgs);
               }
               
       }
     },
     proxy : {
      method : 'GET',
      url : baseURL + '/Roo/core_watch.php',
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
              'name': 'ontable',
              'type': 'string'
          },
          {
              'name': 'onid',
              'type': 'int'
          },
          {
              'name': 'person_id',
              'type': 'int'
          },
          {
              'name': 'event',
              'type': 'string'
          },
          {
              'name': 'medium',
              'type': 'string'
          },
          {
              'name': 'active',
              'type': 'int'
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
      dataIndex : 'event',
      header : _this._strings['c122d95a9c28f9a54baef2c7784bb038'] /* Watch Event */,
      renderer : function(v,x,r) { 
          if (typeof(r.data.event_right_display_name) != 'undefined') {
              return String.format('{0}: {1}', r.data.event_left, r.data.event_right_display_name);     
          }
          return String.format('{0}', v); 
          
      },
      width : 150,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'ontable',
      header : _this._strings['c4523f19258f444b936df7f96f57c7b9'] /* Watch Table */,
      renderer : function(v) { return String.format('{0}', v); },
      width : 150,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'onid',
      header : _this._strings['1a86349be7851cf03d6fe959b94ed6fb'] /* Watch ID */,
      renderer : function(v) { return String.format('{0}', v); },
      width : 75,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'person_id_name',
      header : _this._strings['b548a2ee926c118cc3211c5d8bb92a40'] /* Who get's notified */,
      renderer : function(v) { return String.format('{0}', v); },
      width : 150,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'medium',
      header : _this._strings['56abc507eda6d3226af192bf9b0e5d1f'] /* What happens */,
      renderer : function(v) {
          var ar = v.split(':');
          if (ar.length > 1) {
              var act = ar[1].replace(/^notify/,'');
      
              return String.format('<span qtip="{0}">{1}<span>', v, act);
          }
      
          return String.format('{0}', v);
       },
      width : 300,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'active',
      header : _this._strings['4d3d769b812b6faa6b76e1a8abaece2d'] /* Active */,
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
