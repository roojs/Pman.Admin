//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminLogDrill = new Roo.XComponent({

 _strings : {
  '7a11042f53957727d8667732d7de1102' :"Ipaddr",
  '231bc72756b5e6de492aaaa1577f61b1' :"Remarks",
  '87f9f735a1d36793ceaecd4e47124b63' :"Events",
  '490aa6e856ccf208a054389e47ce0d06' :"Id",
  '739cea2b85156183f917f2ccaa10a50c' :"#ID",
  '591933c26da312455c63b6bc1ec046bc' :"(function() { var d = new Date();d =  d.add(Date.MONTH, 1) ; return d.format('Y-m-01'); })()",
  'd9578744f1d4b13d40a51fbb8b9d6ea5' :"Person name",
  'e1edab2a061a49e21790204249b1aee9' :"(function() { var d = new Date(); return d.format('Y-m-01'); })()",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  '51c45b795d5d18a3e4e0c37e8b20a141' :"Table",
  '6be4aa550791c310e098cd6c234af7d8' :"Event when",
  '679308a758de538c5f39c4c6cdba6593' :"Select Affects",
  'c112bb3542e98308d12d5ecb10a67abc' :"Changes",
  'a254c25adc7d10d7e9c4889484f875a5' :"Detail",
  '7205d42d6d975c911bc1147259d78935' :"Displaying Events{0} - {1} of {2}",
  '39b9e051f9fe75e65c7a330bb00499d4' :"Date Range",
  'a8929eb5c1553d3f70497f862d25d0ce' :"Select Action",
  '004bf6c9a40003140292e97330236c53' :"Action",
  'f971b3a2cc583b475332380649a4fa05' :"Daily summary",
  '0668a37e3eb3480f0444f8da7bc446ba' :"Event Drilldown",
  'b5fe0746885b906c8ed9b7cc06023c35' :"#Affected",
  '90e4ac2e5a22e53df63b6b186d8727ba' :"No Events found"
 },

  part     :  ["Admin", "LogDrill" ],
  order    : '003-Pman.Tab.AdminLogDrill',
  region   : 'center',
  parent   : 'Pman.Tab.AdminLogs',
  name     : "Pman.Tab.AdminLogDrill",
  disabled : false, 
  permname : '', 
  _tree : function(_data)
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'NestedLayoutPanel',
   background : true,
   region : 'center',
   title : _this._strings['0668a37e3eb3480f0444f8da7bc446ba'] /* Event Drilldown */,
   xns : Roo,
   '|xns' : 'Roo',
   toolbar : {
    xtype : 'Toolbar',
    xns : Roo,
    '|xns' : 'Roo',
    items  : [
     {
      xtype : 'TextItem',
      text : _this._strings['39b9e051f9fe75e65c7a330bb00499d4'] /* Date Range */,
      xns : Roo.Toolbar,
      '|xns' : 'Roo.Toolbar'
     },
     {
      xtype : 'DateField',
      format : 'Y-m-d',
      value : (function() { var d = new Date(); return d.format('Y-m-01'); })(),
      listeners : {
       change : function (_self, newValue, oldValue)
        {
          _this.dategrid.ds.load({});
        },
       render : function (_self)
        {
          _this.dateFrom = _self;
        }
      },
      xns : Roo.form,
      '|xns' : 'Roo.form'
     },
     {
      xtype : 'DateField',
      format : 'Y-m-d',
      value : (function() { var d = new Date();d =  d.add(Date.MONTH, 1) ; return d.format('Y-m-01'); })(),
      listeners : {
       change : function (_self, newValue, oldValue)
        {
          _this.dategrid.ds.load({});
        },
       render : function (_self)
        {
          _this.dateTo = _self;
        }
      },
      xns : Roo.form,
      '|xns' : 'Roo.form'
     },
     {
      xtype : 'ComboBox',
      allowBlank : true,
      displayField : 'action',
      editable : true,
      emptyText : _this._strings['a8929eb5c1553d3f70497f862d25d0ce'] /* Select Action */,
      forceSelection : true,
      listWidth : 300,
      loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
      minChars : 2,
      name : 'action',
      pageSize : 20,
      qtip : _this._strings['a8929eb5c1553d3f70497f862d25d0ce'] /* Select Action */,
      queryParam : 'query[action]',
      selectOnFocus : true,
      tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{action}</b> </div>',
      triggerAction : 'all',
      typeAhead : true,
      valueField : 'action',
      width : 150,
      listeners : {
       render : function (_self)
        {
          _this.actionSel = _self;
        },
       select : function (combo, record, index)
        {
           _this.dategrid.ds.load({});
        }
      },
      xns : Roo.form,
      '|xns' : 'Roo.form',
      store : {
       xtype : 'Store',
       remoteSort : true,
       sortInfo : { field : 'action' , direction : 'ASC' },
       listeners : {
        beforeload : function (_self, o)
         {
             o.params = o.params || {};
             // staff can see all logs, other companies can only see their own.
             if (Pman.Login.authUser.company_id_comptype != 'OWNER') {
                 o.params.company_id = Pman.Login.authUser.company_id;
             }
             o.params._distinct = 'action';
             o.params._columns ='action';
         }
       },
       xns : Roo.data,
       '|xns' : 'Roo.data',
       proxy : {
        xtype : 'HttpProxy',
        method : 'GET',
        timeout : 50000,
        url : baseURL + '/Roo/Events.php',
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
        ],
        id : 'id',
        root : 'data',
        totalProperty : 'total',
        xns : Roo.data,
        '|xns' : 'Roo.data'
       }
      }
     },
     {
      xtype : 'ComboBox',
      allowBlank : true,
      displayField : 'on_table',
      editable : true,
      emptyText : _this._strings['679308a758de538c5f39c4c6cdba6593'] /* Select Affects */,
      forceSelection : true,
      listWidth : 300,
      loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
      minChars : 2,
      name : 'on_table',
      pageSize : 20,
      qtip : _this._strings['a8929eb5c1553d3f70497f862d25d0ce'] /* Select Action */,
      queryParam : 'query[on_table]',
      selectOnFocus : true,
      tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{on_table}</b> </div>',
      triggerAction : 'all',
      typeAhead : true,
      valueField : 'action',
      width : 150,
      listeners : {
       render : function (_self)
        {
          _this.affectSel = _self;
        },
       select : function (combo, record, index)
        {
           _this.dategrid.ds.load({});
        }
      },
      xns : Roo.form,
      '|xns' : 'Roo.form',
      store : {
       xtype : 'Store',
       remoteSort : true,
       sortInfo : { field : 'on_table' , direction : 'ASC' },
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
       xns : Roo.data,
       '|xns' : 'Roo.data',
       proxy : {
        xtype : 'HttpProxy',
        method : 'GET',
        timeout : 60000,
        url : baseURL + '/Roo/Events.php',
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
   layout : {
    xtype : 'BorderLayout',
    xns : Roo,
    '|xns' : 'Roo',
    center : {
     xtype : 'LayoutRegion',
     xns : Roo,
     '|xns' : 'Roo'
    },
    east : {
     xtype : 'LayoutRegion',
     split : true,
     tabPosition : 'top',
     width : 600,
     xns : Roo,
     '|xns' : 'Roo'
    },
    west : {
     xtype : 'LayoutRegion',
     split : true,
     width : 300,
     xns : Roo,
     '|xns' : 'Roo'
    },
    items  : [
     {
      xtype : 'GridPanel',
      background : false,
      fitContainer : true,
      fitToframe : true,
      region : 'west',
      tableName : 'Events',
      title : _this._strings['87f9f735a1d36793ceaecd4e47124b63'] /* Events */,
      listeners : {
       activate : function() {
            _this.datepanel = this;
            if (_this.dategrid) {
                _this.dategrid.ds.load({});
            }
        }
      },
      xns : Roo,
      '|xns' : 'Roo',
      grid : {
       xtype : 'Grid',
       autoExpandColumn : 'person_name',
       loadMask : true,
       listeners : {
        render : function() 
         {
             _this.dategrid = this; 
             //_this.dialog = Pman.Dialog.FILL_IN
             if (_this.panel.active) {
                this.ds.load({});
             }
         },
        rowclick : function (_self, rowIndex, e)
         {
             _this.tablegrid.footer.onClick('first');
         }
       },
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       dataSource : {
        xtype : 'Store',
        remoteSort : true,
        sortInfo : { field : 'person_id_name', direction: 'ASC' },
        listeners : {
         beforeload : function (_self, o)
          {
              
              
              if (! _this.dateFrom) {
                  return;
              }
          
               try {
                   _this.tablegrid.ds.removeAll();
                   _this.panel.layout.getRegion('east').getActivePanel().grid.ds.removeAll();
                   
              } catch (e) {
                  // do nothing..
              }
              o.params = o.params || {};
               
              var act = _this.actionSel ? _this.actionSel.getValue() : '';
              if (act.length) {
                  o.params.action = act;
              }
              var tbl = _this.affectSel ? _this.affectSel.getValue() : '';
              if (tbl.length) {
                  o.params.on_table = tbl;
              }
              act = _this.dateFrom.getValue();
              if (act.format) {
                  o.params['query[from]'] = act.format('Y-m-d');
              }
              act = _this.dateTo.getValue();
              if (act.format) {
                  o.params['query[to]'] = act.format('Y-m-d');
              }
              
              
              
              o.params['query[person_sum]'] = 1;
              o.params._columns = 'person_id,person_id_name,person_id_email,qty,uqty';
              o.params.limit = 999;
           
          }
        },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         url : baseURL + '/Roo/Events.php',
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
         dataIndex : 'person_id_name',
         header : _this._strings['d9578744f1d4b13d40a51fbb8b9d6ea5'] /* Person name */,
         renderer : function(v,x,r) {
              return String.format('{0} &lt;<a href="mailto:{1}">{1}</a>&gt;', v, r.data.person_id_email); 
          },
         sortable : true,
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'uqty',
         header : _this._strings['b5fe0746885b906c8ed9b7cc06023c35'] /* #Affected */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 70,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'qty',
         header : _this._strings['c112bb3542e98308d12d5ecb10a67abc'] /* Changes */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 70,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        }
       ]
      }
     },
     {
      xtype : 'GridPanel',
      background : false,
      fitContainer : true,
      fitToframe : true,
      region : 'center',
      tableName : 'Events',
      title : _this._strings['87f9f735a1d36793ceaecd4e47124b63'] /* Events */,
      listeners : {
       activate : function() {
            _this.tablepanel = this;
            if (_this.tablegrid) {
                _this.tablegrid.footer.onClick('first');
            }
        }
      },
      xns : Roo,
      '|xns' : 'Roo',
      grid : {
       xtype : 'Grid',
       autoExpandColumn : 'person_name',
       loadMask : true,
       listeners : {
        render : function() 
         {
             _this.tablegrid = this; 
             //_this.dialog = Pman.Dialog.FILL_IN
             if (_this.tablepanel.active) {
                this.footer.onClick('first');
             }
         },
        rowclick : function (_self, rowIndex, e)
         {
          
             _this.panel.layout.getRegion('east').getActivePanel().grid.footer.onClick('first');
         }
       },
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       footer : {
        xtype : 'PagingToolbar',
        displayInfo : true,
        displayMsg : _this._strings['7205d42d6d975c911bc1147259d78935'] /* Displaying Events{0} - {1} of {2} */,
        emptyMsg : _this._strings['90e4ac2e5a22e53df63b6b186d8727ba'] /* No Events found */,
        pageSize : 25,
        xns : Roo,
        '|xns' : 'Roo'
       },
       dataSource : {
        xtype : 'Store',
        remoteSort : true,
        sortInfo : { field : 'on_table', direction: 'ASC' },
        listeners : {
         beforeload : function (_self, o)
          {
               if (! _this.dategrid) {
               return;
              }
              try {
                   _this.panel.layout.getRegion('east').getActivePanel().grid.ds.removeAll();
                   
              } catch (e) {
                  // do nothing..
              }
              
              var s = _this.dategrid.selModel.getSelected();
              if (!s) {
                  _this.tablegrid.view.el.mask("Select a person");
                  return false;
              }
              _this.tablegrid.view.el.unmask();
           
              o.params = o.params || {};
              var act = _this.actionSel.getValue();
              if (act.length) {
                  o.params.action = act;
              }
              var tbl = _this.affectSel.getValue();
              if (tbl.length) {
                  o.params.on_table = tbl;
              }
           
              act = _this.dateFrom.getValue();
              if (act.format) {
                  o.params['query[from]'] = act.format('Y-m-d');
              }
              act = _this.dateTo.getValue();
              if (act.format) {
                  o.params['query[to]'] = act.format('Y-m-d');
              }
              o.params.person_id = s.data.person_id;
              o.params['query[table_sum]'] = 1;
              o.params._columns = 'on_table,qty,uqty';
          
              
          }
        },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         url : baseURL + '/Roo/Events.php',
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
         dataIndex : 'on_table',
         header : _this._strings['51c45b795d5d18a3e4e0c37e8b20a141'] /* Table */,
         renderer : function(v) { 
             if (!v.length) {
                 return "Login / Logout / Errors";
             }
             return String.format('{0}', v); 
         },
         sortable : true,
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'uqty',
         header : _this._strings['b5fe0746885b906c8ed9b7cc06023c35'] /* #Affected */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 70,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'qty',
         header : _this._strings['c112bb3542e98308d12d5ecb10a67abc'] /* Changes */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 70,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        }
       ]
      }
     },
     {
      xtype : 'GridPanel',
      background : true,
      fitContainer : true,
      fitToframe : true,
      region : 'east',
      tableName : 'Events',
      title : _this._strings['a254c25adc7d10d7e9c4889484f875a5'] /* Detail */,
      listeners : {
       activate : function() {
            _this.detailpanel = this;
            if (_this.detailgrid) {
                _this.detailgrid.footer.onClick('first');
            }
        }
      },
      xns : Roo,
      '|xns' : 'Roo',
      grid : {
       xtype : 'Grid',
       autoExpandColumn : 'person_name',
       loadMask : true,
       listeners : {
        render : function() 
         {
             _this.detailgrid = this; 
             //_this.dialog = Pman.Dialog.FILL_IN
             if (_this.detailpanel.active) {
                this.footer.onClick('first');
             }
         }
       },
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       footer : {
        xtype : 'PagingToolbar',
        displayInfo : true,
        displayMsg : _this._strings['7205d42d6d975c911bc1147259d78935'] /* Displaying Events{0} - {1} of {2} */,
        emptyMsg : _this._strings['90e4ac2e5a22e53df63b6b186d8727ba'] /* No Events found */,
        pageSize : 25,
        xns : Roo,
        '|xns' : 'Roo'
       },
       dataSource : {
        xtype : 'Store',
        remoteSort : true,
        sortInfo : { field : 'event_when', direction: 'DESC' },
        listeners : {
         beforeload : function (_self, o)
          {
               if (! _this.dategrid) {
                   return false;
              }
              
              o.params = o.params || {};
              
              var s = _this.dategrid.selModel.getSelected();
              if (!s) {
                  _this.detailgrid.view.el.mask("Select a person");
                  return false;
              }
              
              o.params.person_id = s.data.person_id;    
              
              var s = _this.tablegrid.selModel.getSelected();
              if (!s) {
                  _this.detailgrid.view.el.mask("Select a table");
                  return false;
              }
              o.params.on_table = s.data.on_table;        
              
              _this.detailgrid.view.el.unmask();
           
              var act = _this.actionSel.getValue();
              if (act.length) {
                  o.params.action = act;
              }
              var tbl = _this.affectSel.getValue();
              if (tbl.length) {
                  o.params.on_table = tbl;
              }
               
           
              act = _this.dateFrom.getValue();
              if (act.format) {
                  o.params['query[from]'] = act.format('Y-m-d');
              }
              act = _this.dateTo.getValue();
              if (act.format) {
                  o.params['query[to]'] = act.format('Y-m-d');
              }
          
              //o.params['query[table_d]'] = 1;
              //o.params._columns = 'on_table,qty,uqty';
          
              
          }
        },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         url : baseURL + '/Roo/Events.php',
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
         dataIndex : 'id',
         header : _this._strings['490aa6e856ccf208a054389e47ce0d06'] /* Id */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 50,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'event_when',
         header : _this._strings['6be4aa550791c310e098cd6c234af7d8'] /* Event when */,
         renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y') : ''); },
         width : 75,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'action',
         header : _this._strings['004bf6c9a40003140292e97330236c53'] /* Action */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 50,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'ipaddr',
         header : _this._strings['7a11042f53957727d8667732d7de1102'] /* Ipaddr */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'on_id',
         header : _this._strings['739cea2b85156183f917f2ccaa10a50c'] /* #ID */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 75,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'remarks',
         header : _this._strings['231bc72756b5e6de492aaaa1577f61b1'] /* Remarks */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        }
       ]
      }
     },
     {
      xtype : 'GridPanel',
      background : true,
      fitContainer : true,
      fitToframe : true,
      region : 'east',
      tableName : 'Events',
      title : _this._strings['f971b3a2cc583b475332380649a4fa05'] /* Daily summary */,
      listeners : {
       activate : function() {
            _this.daypanel = this;
            if (_this.daygrid) {
                _this.daygrid.footer.onClick('first');
            }
        }
      },
      xns : Roo,
      '|xns' : 'Roo',
      grid : {
       xtype : 'Grid',
       autoExpandColumn : 'person_name',
       loadMask : true,
       listeners : {
        render : function() 
         {
             _this.daygrid = this; 
             //_this.dialog = Pman.Dialog.FILL_IN
             if (_this.daypanel.active) {
                this.footer.onClick('first');
             }
         }
       },
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       footer : {
        xtype : 'PagingToolbar',
        displayInfo : true,
        displayMsg : _this._strings['7205d42d6d975c911bc1147259d78935'] /* Displaying Events{0} - {1} of {2} */,
        emptyMsg : _this._strings['90e4ac2e5a22e53df63b6b186d8727ba'] /* No Events found */,
        pageSize : 25,
        xns : Roo,
        '|xns' : 'Roo'
       },
       dataSource : {
        xtype : 'Store',
        remoteSort : true,
        sortInfo : { field : 'on_day', direction: 'ASC' },
        listeners : {
         beforeload : function (_self, o)
          {
               if (! _this.dategrid) {
                   return false;
              }
              
              o.params = o.params || {};
              
              var s = _this.dategrid.selModel.getSelected();
              if (!s) {
                  _this.detailgrid.view.el.mask("Select a person");
                  return false;
              }
              
              o.params.person_id = s.data.person_id;    
              
              var s = _this.tablegrid.selModel.getSelected();
              if (!s) {
                  _this.detailgrid.view.el.mask("Select a table");
                  return false;
              }
              o.params.on_table = s.data.on_table;        
              
              _this.detailgrid.view.el.unmask();
           
              var act = _this.actionSel.getValue();
              if (act.length) {
                  o.params.action = act;
              }
              var tbl = _this.affectSel.getValue();
              if (tbl.length) {
                  o.params.on_table = tbl;
              }
               
           
              act = _this.dateFrom.getValue();
              if (act.format) {
                  o.params['query[from]'] = act.format('Y-m-d');
              }
              act = _this.dateTo.getValue();
              if (act.format) {
                  o.params['query[to]'] = act.format('Y-m-d');
              }
          
              o.params['query[day_sum]'] = 1;
              o.params._columns = 'on_day,qty,uqty';
          
              
          }
        },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         url : baseURL + '/Roo/Events.php',
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
         dataIndex : 'on_day',
         header : _this._strings['6be4aa550791c310e098cd6c234af7d8'] /* Event when */,
         renderer : function(v) { return String.format('{0}', v  ); },
         sortable : true,
         width : 75,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'uqty',
         header : _this._strings['b5fe0746885b906c8ed9b7cc06023c35'] /* #Affected */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 70,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'qty',
         header : _this._strings['c112bb3542e98308d12d5ecb10a67abc'] /* Changes */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 70,
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
