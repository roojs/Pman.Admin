//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminLogEvents = new Roo.XComponent({

 _strings : {
  'e4ef97f584a9c8d2d686f84569307575' :"Download to Excel (with extra descriptions)",
  '231bc72756b5e6de492aaaa1577f61b1' :"Remarks",
  '2ea72778ebaacc973260c88837dd7a2f' :"Displaying Events  {0} - {1} of {2}",
  '87f9f735a1d36793ceaecd4e47124b63' :"Events",
  '1b7f7d24575cdbfadb83b9587fa1bf97' :"#id",
  'a12a3079e14ced46e69ba52b8a90b21a' :"IP",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  '01bd6a16732dfa2b760dc8566c58afae' :"Download to Excel",
  '498f79c4c5bbde77f1bceb6c86fd0f6d' :"Show",
  '037fd50b0e85bb65995ca7125d06c7cd' :"Select Person Table",
  '40bed7cf9b3d4bb3a3d7a7e3eb18c5eb' :"Person ",
  '340c2ee497b85d5954b01c64de7f44f6' :"Select Person ",
  '679308a758de538c5f39c4c6cdba6593' :"Select Affects",
  'a8929eb5c1553d3f70497f862d25d0ce' :"Select Action",
  '39b9e051f9fe75e65c7a330bb00499d4' :"Date Range",
  '4e97aeeaa8b15ca1180fcd1f3ac478d1' :"When",
  '40bed7cf9b3d4bb3a3d7a7e3eb18c5eb' :"Person",
  '004bf6c9a40003140292e97330236c53' :"Action",
  '2bd339d85ee3b33e513359ce781b60cc' :"Restore",
  '90e4ac2e5a22e53df63b6b186d8727ba' :"No Events found",
  '2c92a9a6a5dbf570825e62eabcdecd8d' :"Affected"
 },
 _named_strings : {
  'person_table_loadingText' : '1243daf593fa297e07ab03bf06d925af' /* Searching... */ ,
  'person_id_name_qtip' : '340c2ee497b85d5954b01c64de7f44f6' /* Select Person  */ ,
  'person_table_qtip' : '037fd50b0e85bb65995ca7125d06c7cd' /* Select Person Table */ ,
  'person_table_emptyText' : '037fd50b0e85bb65995ca7125d06c7cd' /* Select Person Table */ ,
  'person_id_name_emptyText' : '340c2ee497b85d5954b01c64de7f44f6' /* Select Person  */ ,
  'person_id_name_fieldLabel' : '40bed7cf9b3d4bb3a3d7a7e3eb18c5eb' /* Person */ ,
  'on_table_qtip' : 'a8929eb5c1553d3f70497f862d25d0ce' /* Select Action */ ,
  'on_table_emptyText' : '679308a758de538c5f39c4c6cdba6593' /* Select Affects */ ,
  'action_emptyText' : 'a8929eb5c1553d3f70497f862d25d0ce' /* Select Action */ ,
  'action_loadingText' : '1243daf593fa297e07ab03bf06d925af' /* Searching... */ ,
  'action_qtip' : 'a8929eb5c1553d3f70497f862d25d0ce' /* Select Action */ ,
  'on_table_loadingText' : '1243daf593fa297e07ab03bf06d925af' /* Searching... */ ,
  'person_id_name_loadingText' : '1243daf593fa297e07ab03bf06d925af' /* Searching... */ 
 },

  part     :  ["Admin", "LogEvents" ],
  order    : '001-Pman.Tab.AdminLogEvents',
  region   : 'center',
  parent   : 'Pman.Tab.AdminLogs',
  name     : "Admin - Logs - Events",
  disabled : false, 
  permname : 'Admin.Logs', 
  _tree : function(_data)
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'NestedLayoutPanel',
   region : 'center',
   title : _this._strings['87f9f735a1d36793ceaecd4e47124b63'] /* Events */,
   xns : Roo,
   '|xns' : 'Roo',
   layout : {
    xtype : 'BorderLayout',
    xns : Roo,
    '|xns' : 'Roo',
    center : {
     xtype : 'LayoutRegion',
     xns : Roo,
     '|xns' : 'Roo'
    },
    south : {
     xtype : 'LayoutRegion',
     autoScroll : true,
     height : 150,
     split : true,
     xns : Roo,
     '|xns' : 'Roo'
    },
    items  : [
     {
      xtype : 'ContentPanel',
      fitToFrame : true,
      region : 'south',
      listeners : {
       render : function (_self)
        {
          _this.viewPanel = _self;
        }
      },
      xns : Roo,
      '|xns' : 'Roo'
     },
     {
      xtype : 'Grid',
      background : false,
      fitContainer : true,
      fitToframe : true,
      region : 'center',
      tableName : 'Events',
      title : _this._strings['87f9f735a1d36793ceaecd4e47124b63'] /* Events */,
      listeners : {
       activate : function() {
            _this.panel = this;
            if (_this.grid) {
                _this.grid.footer.onClick('first');
            }
        }
      },
      xns : Roo.panel,
      '|xns' : 'Roo.panel',
      grid : {
       xtype : 'Grid',
       autoExpandColumn : 'remarks',
       loadMask : true,
       listeners : {
        render : function () 
         {
             _this.grid = this; 
             //_this.dialog = Pman.Dialog.FILL_IN
             if (_this.panel.active) {
                this.footer.onClick('first');
             }
         }
       },
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       footer : {
        xtype : 'PagingToolbar',
        displayInfo : true,
        displayMsg : _this._strings['2ea72778ebaacc973260c88837dd7a2f'] /* Displaying Events  {0} - {1} of {2} */,
        emptyMsg : _this._strings['90e4ac2e5a22e53df63b6b186d8727ba'] /* No Events found */,
        pageSize : 25,
        xns : Roo,
        '|xns' : 'Roo',
        items  : [
         {
          xtype : 'Button',
          text : _this._strings['01bd6a16732dfa2b760dc8566c58afae'] /* Download to Excel */,
          listeners : {
           click : function (_self, e)
            {
                
                var params = {
                    'sort' : 'event_when',
                    'dir' : 'DESC',
                    'start' : 0,
                    'limit' : 900,
                    person_id : _this.personSel.getValue(), 
                    'csvTitles[0]' : 'When',   'csvCols[0]' : 'event_when', 
                    'csvTitles[1]' : 'Staff',   'csvCols[1]' : 'person_id_name', 
                    'csvTitles[2]' : 'Action',   'csvCols[2]' : 'action', 
                    'csvTitles[3]' : 'Record ID',   'csvCols[3]' : 'on_id'       ,
                    'csvTitles[4]' : 'Record Type',   'csvCols[4]' : 'on_table',
                    'csvTitles[5]' : 'Remarks',   'csvCols[5]' : 'remarks'        
                };
                    
                params.person_id = _this.personSel.getValue();
                var act = _this.actionSel.getValue();
                if (act.length) {
                    params.action = act;
                }
                var tbl = _this.affectSel.getValue();
                if (tbl.length) {
                    params.on_table = tbl;
                }
                act = _this.dateFrom.getValue();
                if (act.format) {
                    params['query[from]'] = act.format('Y-m-d');
                }
                act = _this.dateTo.getValue();
                if (act.format) {
                    params['query[to]'] = act.format('Y-m-d');
                }
                params.limit = 9999;
                
            
                new Pman.download({
                    url : baseURL + '/Roo/Events.php',
                    params : params ,
                    newWindow: true
                    
                });
            }
          },
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         },
         {
          xtype : 'Button',
          text : _this._strings['e4ef97f584a9c8d2d686f84569307575'] /* Download to Excel (with extra descriptions) */,
          listeners : {
           click : function (_self, e)
            {
                
                var params = {
                    'sort' : 'event_when',
                    'dir' : 'DESC',
                    'start' : 0,
                    'limit' : 900,
                    person_id : _this.personSel.getValue(), 
                    'csvTitles[0]' : 'ID#',   'csvCols[0]' : 'id',         
                    'csvTitles[1]' : 'When',   'csvCols[1]' : 'event_when', 
                    'csvTitles[2]' : 'Staff',   'csvCols[2]' : 'person_id_name', 
                    'csvTitles[3]' : 'Action',   'csvCols[3]' : 'action', 
                    'csvTitles[4]' : 'Record ID',   'csvCols[4]' : 'on_id'       ,
                    'csvTitles[5]' : 'Record Type',   'csvCols[5]' : 'on_table',
                    'csvTitles[6]' : 'Remarks',   'csvCols[6]' : 'remarks'        
                };
                params._with_obj_summary = 1;
                params.person_id = _this.personSel.getValue();
                var act = _this.actionSel.getValue();
                if (act.length) {
                    params.action = act;
                }
                var tbl = _this.affectSel.getValue();
                if (tbl.length) {
                    params.on_table = tbl;
                }
                act = _this.dateFrom.getValue();
                if (act.format) {
                    params['query[from]'] = act.format('Y-m-d');
                }
                act = _this.dateTo.getValue();
                if (act.format) {
                    params['query[to]'] = act.format('Y-m-d');
                }
                params.limit = 9999;
                
            
                new Pman.download({
                    url : baseURL + '/Roo/Events.php',
                    params : params ,
                    newWindow: true
                    
                });
            }
          },
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         },
         {
          xtype : 'Separator',
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         },
         {
          xtype : 'Button',
          cls : 'x-btn-text-icon',
          icon : Roo.rootURL + 'images/default/tree/leaf.gif',
          text : _this._strings['2bd339d85ee3b33e513359ce781b60cc'] /* Restore */,
          listeners : {
           click : function()
            {
                var s = _this.grid.getSelectionModel().getSelected();
                
                if(!s || s.data.id * 1 < 1 || s.data.action != 'DELETE'){
                    Roo.MessageBox.alert('Error', 'Please select a deleted person');
                    return;
                }
                
                new Pman.Request({
                   url: baseURL + '/Roo/Events',
                   method : 'POST',
                   mask : 'Sending...',
                   params : {
                       id : s.data.id,
                       _restore : 1
                   },
                   success : function(ret) {
                        _this.grid.footer.onClick('refresh');
                        Roo.MessageBox.alert('Notice', 'Restored person successfully');
                   }
               });
            }
          },
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         }
        ]
       },
       toolbar : {
        xtype : 'Toolbar',
        xns : Roo,
        '|xns' : 'Roo',
        items  : [
         {
          xtype : 'TextItem',
          text : _this._strings['498f79c4c5bbde77f1bceb6c86fd0f6d'] /* Show */,
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         },
         {
          xtype : 'ComboBox',
          allowBlank : true,
          alwaysQuery : true,
          displayField : 'value',
          editable : false,
          emptyText : _this._strings['037fd50b0e85bb65995ca7125d06c7cd'] /* Select Person Table */,
          forceSelection : true,
          listWidth : 300,
          loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
          minChars : 2,
          name : 'person_table',
          pageSize : 20,
          qtip : _this._strings['037fd50b0e85bb65995ca7125d06c7cd'] /* Select Person Table */,
          selectOnFocus : true,
          tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{value}</b> </div>',
          triggerAction : 'all',
          typeAhead : true,
          valueField : 'value',
          width : 150,
          listeners : {
           render : function (_self)
            {
                _this.tableSel = _self;
              
                if(
                    typeof(uiConfig) == 'undefined' || 
                    typeof(uiConfig.events_person_table) == 'undefined' || 
                    !uiConfig.events_person_table.length
                ){
                    this.hide();
                }
              
            },
           select : function (combo, record, index)
            {
              _this.grid.footer.onClick('first');
            }
          },
          xns : Roo.form,
          '|xns' : 'Roo.form',
          store : {
           xtype : 'SimpleStore',
           data : (function() { 
           
               if(typeof(uiConfig) == 'undefined' || typeof(uiConfig.events_person_table) == 'undefined' || !uiConfig.events_person_table.length){
           
                   return [];        
               }
           
               return uiConfig.events_person_table;
               
           })(),
           fields : [ 'value' ],
           isLocal : true,
           xns : Roo.data,
           '|xns' : 'Roo.data'
          }
         },
         {
          xtype : 'ComboBox',
          allowBlank : true,
          displayField : 'name',
          editable : true,
          emptyText : _this._strings['340c2ee497b85d5954b01c64de7f44f6'] /* Select Person  */,
          fieldLabel : _this._strings['40bed7cf9b3d4bb3a3d7a7e3eb18c5eb'] /* Person  */,
          forceSelection : true,
          listWidth : 600,
          loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
          minChars : 2,
          name : 'person_id_name',
          pageSize : 20,
          qtip : _this._strings['340c2ee497b85d5954b01c64de7f44f6'] /* Select Person  */,
          queryParam : 'query[name]',
          selectOnFocus : true,
          tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{name}</b> ({company_id_name}) &lt;{email}&gt; </div>',
          triggerAction : 'all',
          typeAhead : true,
          valueField : 'id',
          width : 150,
          listeners : {
           render : function (_self)
            {
              _this.personSel = _self;
            },
           select : function (combo, record, index)
            {
              _this.grid.footer.onClick('first');
              
            }
          },
          xns : Roo.form,
          '|xns' : 'Roo.form',
          store : {
           xtype : 'Store',
           remoteSort : true,
           sortInfo : { field : 'name' , direction : 'ASC' },
           listeners : {
            beforeload : function (_self, o)
             {
                 o.params = o.params || {};
                 // this will show everyone... - for MO - that means they can see users.
                 //o.params.company_id = Pman.Login.authUser.company_id;
             }
           },
           xns : Roo.data,
           '|xns' : 'Roo.data',
           proxy : {
            xtype : 'HttpProxy',
            method : 'GET',
            url : baseURL + '/Roo/core_person',
            xns : Roo.data,
            '|xns' : 'Roo.data'
           },
           reader : {
            xtype : 'JsonReader',
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
              _this.grid.footer.onClick('first');
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
              
                if(!Pman.hasPerm('Admin.Logs_Affects', 'S')){
                    this.hide();
                }
            },
           select : function (combo, record, index)
            {
              _this.grid.footer.onClick('first');
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
          xtype : 'TextItem',
          text : _this._strings['39b9e051f9fe75e65c7a330bb00499d4'] /* Date Range */,
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         },
         {
          xtype : 'DateField',
          format : 'Y-m-d',
          listeners : {
           change : function (_self, newValue, oldValue)
            {
              _this.grid.footer.onClick('first');
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
          listeners : {
           change : function (_self, newValue, oldValue)
            {
              _this.grid.footer.onClick('first');
            },
           render : function (_self)
            {
              _this.dateTo = _self;
            }
          },
          xns : Roo.form,
          '|xns' : 'Roo.form'
         }
        ]
       },
       dataSource : {
        xtype : 'Store',
        remoteSort : true,
        sortInfo : { field: 'event_when', direction: 'DESC'},
        listeners : {
         beforeload : function (_self, o)
          {
              if (!Pman.buildCompleted) {
                  return false;
              }
             
             
             if (! _this.personSel) {
              return false;
              }
              o.params = o.params || {};
              o.params.person_id = _this.personSel.getValue();
              o.params.person_table = _this.tableSel.getValue();
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
           
              
              /*
              act = _this.groupedCombo.getValue();
              o.params['query[grouped]'] = act;
              if (o.params['query[grouped]'] == 'gr') {
              
                  if (!tbl.length) {
                      Roo.MessageBox.alert("Error", "Select a table to group results on");
                      return false;
                  }
          //        o.params['_columns']  = 
                  o.params['_distinct'] = 'on_id';
                  
                  
              }
              
              */
          
              
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
         id : 'id',
         root : 'data',
         totalProperty : 'total',
         xns : Roo.data,
         '|xns' : 'Roo.data'
        }
       },
       sm : {
        xtype : 'RowSelectionModel',
        singleSelect : true,
        listeners : {
         afterselectionchange : function (_self)
          {
              // load detail log in _this.viewPanel;
              if (!this.getSelected()) {
                  this.viewPanel.setContent("Nothing Selected");
                  return;
              }
              var id = this.getSelected().data.id;
              _this.viewPanel.load( { url : baseURL + "/Admin/EventView/" + id + ".html" });
              
          }
        },
        xns : Roo.grid,
        '|xns' : 'Roo.grid'
       },
       colModel : [
        {
         xtype : 'ColumnModel',
         dataIndex : 'event_when',
         header : _this._strings['4e97aeeaa8b15ca1180fcd1f3ac478d1'] /* When */,
         renderer : function(v) { return v ? v.dateFormat('d/m/Y H:i') : ''; },
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'id',
         header : _this._strings['1b7f7d24575cdbfadb83b9587fa1bf97'] /* #id */,
         hidden : (function() {
             return typeof(Pman.Tab.AdminLogEvents.hide_cols) == 'undefined' ? 
             false : 
             ((Pman.Tab.AdminLogEvents.hide_cols.indexOf('id') > -1) ? true : false);
         })(),
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'person_id_name',
         header : _this._strings['40bed7cf9b3d4bb3a3d7a7e3eb18c5eb'] /* Person */,
         renderer : function(v,x,r) { 
             
             var ptable = _this.tableSel.getValue();
             
             var efield = 'person_id_email';
             var nfield = 'person_id_name';    
             
             if(
                 ptable.length &&
                 ptable != 'Person' &&
                 typeof(r.data[ptable + '_id_email']) != 'undefined' &&
                 typeof(r.data[ptable + '_id_name']) != 'undefined'
             ){
                 efield = ptable + '_id_email';
                 nfield = ptable + '_id_name';    
             }
             
             var email = r.data[efield]; // ? r.data.person_id_email : r.data.person_id_email;
             var name  = r.data[nfield]; // ? r.data.person_id_name : r.data.person_id_name;    
             return String.format('{0} &lt;<a href="mailto:{1}">{1}</a>&gt;', 
                 name, email); 
         
         
         },
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'action',
         header : _this._strings['004bf6c9a40003140292e97330236c53'] /* Action */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'ipaddr',
         header : _this._strings['a12a3079e14ced46e69ba52b8a90b21a'] /* IP */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'on_table',
         header : _this._strings['2c92a9a6a5dbf570825e62eabcdecd8d'] /* Affected */,
         hidden : (function() {
             return typeof(Pman.Tab.AdminLogEvents.hide_cols) == 'undefined' ? 
             false : 
             ((Pman.Tab.AdminLogEvents.hide_cols.indexOf('on_table') > -1) ? true : false);
         })(),
         renderer : function(v, x, r) {                     
                     return v ? String.format('{0}({1})', v,  r.data.on_id)  : '';  
            },
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'remarks',
         header : _this._strings['231bc72756b5e6de492aaaa1577f61b1'] /* Remarks */,
         renderer : function(v) { return String.format('<span qtip="{1}">{0}</span>', v, Roo.util.Format.htmlEncode(v)); },
         width : 300,
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
