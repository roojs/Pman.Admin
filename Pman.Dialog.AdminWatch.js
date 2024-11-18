//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminWatch = {

 _strings : {
  '993de4d53bd43053ce1b26eca5fd1051' :"Last Event Only",
  'ae739a236065a45c64ad51aacb19498c' :"Active?",
  'b718adec73e04ce3ec720dd11a06a308' :"ID",
  '51c45b795d5d18a3e4e0c37e8b20a141' :"Table",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  '78c97ad77a6194c421b797c4cd030f75' :"Notify Who",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  '75c5929bbdd5b4e3fb09d3d3a4e73a04' :"Edit / Create core_watch",
  '078d0022ba7fe5e7b7e985f59db8fb19' :"Match Event",
  'a8929eb5c1553d3f70497f862d25d0ce' :"Select Action",
  '340c2ee497b85d5954b01c64de7f44f6' :"Select Person",
  '004bf6c9a40003140292e97330236c53' :"Action",
  '61f71a6a41f9dd2d2f1b6bca465216e5' :"Delay action for no. of minutes",
  'c9cc8cce247e49bae79f15173ce97354' :"Save",
  '314b26dabb519a609db698728284683f' :"Select Table"
 },
 _named_strings : {
  'event_qtip' : 'a8929eb5c1553d3f70497f862d25d0ce' /* Select Action */ ,
  'person_id_name_qtip' : '340c2ee497b85d5954b01c64de7f44f6' /* Select Person */ ,
  'medium_fieldLabel' : '004bf6c9a40003140292e97330236c53' /* Action */ ,
  'person_id_name_emptyText' : '340c2ee497b85d5954b01c64de7f44f6' /* Select Person */ ,
  'person_id_name_fieldLabel' : '78c97ad77a6194c421b797c4cd030f75' /* Notify Who */ ,
  'last_event_only_fieldLabel' : '993de4d53bd43053ce1b26eca5fd1051' /* Last Event Only */ ,
  'ontable_qtip' : 'a8929eb5c1553d3f70497f862d25d0ce' /* Select Action */ ,
  'onid_fieldLabel' : 'b718adec73e04ce3ec720dd11a06a308' /* ID */ ,
  'no_minutes_fieldLabel' : '61f71a6a41f9dd2d2f1b6bca465216e5' /* Delay action for no. of minutes */ ,
  'ontable_loadingText' : '1243daf593fa297e07ab03bf06d925af' /* Searching... */ ,
  'event_loadingText' : '1243daf593fa297e07ab03bf06d925af' /* Searching... */ ,
  'event_fieldLabel' : '078d0022ba7fe5e7b7e985f59db8fb19' /* Match Event */ ,
  'active_fieldLabel' : 'ae739a236065a45c64ad51aacb19498c' /* Active? */ ,
  'ontable_fieldLabel' : '51c45b795d5d18a3e4e0c37e8b20a141' /* Table */ ,
  'person_id_name_loadingText' : '1243daf593fa297e07ab03bf06d925af' /* Searching... */ ,
  'ontable_emptyText' : '314b26dabb519a609db698728284683f' /* Select Table */ 
 },

 dialog : false,
 callback:  false,

 show : function(data, cb)
 {
  if (!this.dialog) {
   this.create();
  }

  this.callback = cb;
  this.data = data;
  this.dialog.show.apply(this.dialog,  Array.prototype.slice.call(arguments).slice(2));
  if (this.form) {
   this.form.reset();
   this.form.setValues(data);
   this.form.fireEvent('actioncomplete', this.form,  { type: 'setdata', data: data });
  }

 },

 create : function()
 {
   var _this = this;
   this.dialog = Roo.factory({
    xtype : 'LayoutDialog',
    closable : false,
    collapsible : false,
    height : 280,
    modal : true,
    resizable : false,
    title : _this._strings['75c5929bbdd5b4e3fb09d3d3a4e73a04'] /* Edit / Create core_watch */,
    width : 500,
    xns : Roo,
    '|xns' : 'Roo',
    center : {
     xtype : 'LayoutRegion',
     xns : Roo,
     '|xns' : 'Roo'
    },
    buttons : [
     {
      xtype : 'Button',
      text : _this._strings['ea4788705e6873b424c65e91c2846b19'] /* Cancel */,
      listeners : {
       click : function (_self, e)
        {
            _this.dialog.hide();
        }
      },
      xns : Roo,
      '|xns' : 'Roo'
     },
     {
      xtype : 'Button',
      text : _this._strings['c9cc8cce247e49bae79f15173ce97354'] /* Save */,
      listeners : {
       click : function (_self, e)
        {
            // do some checks?
             
            
         
            _this.form.doAction("submit");
        
        }
      },
      xns : Roo,
      '|xns' : 'Roo'
     }
    ],
    items  : [
     {
      xtype : 'ContentPanel',
      region : 'center',
      xns : Roo,
      '|xns' : 'Roo',
      items  : [
       {
        xtype : 'Form',
        method : 'POST',
        style : 'margin:10px;',
        url : baseURL + '/Roo/core_watch.php',
        listeners : {
         actioncomplete : function(_self,action)
          {
              if (action.type == 'setdata') {
                 //_this.dialog.el.mask("Loading");
                 if (_this.data.id) {
                     this.load({ method: 'GET', params: { '_id' : _this.data.id }});
                 }
                 return;
              }
              if (action.type == 'load') {
                   return;
              }
              if (action.type =='submit') {
              
                      _this.dialog.hide();
              
                   if (_this.callback) {
                      _this.callback.call(_this, _this.form.getValues());
                   }
                   _this.form.reset();
                   return;
              }
          },
         rendered : function (form)
          {
              _this.form= form;
          }
        },
        xns : Roo.form,
        '|xns' : 'Roo.form',
        items  : [
         {
          xtype : 'ComboBox',
          allowBlank : true,
          displayField : 'on_table',
          editable : false,
          emptyText : _this._strings['314b26dabb519a609db698728284683f'] /* Select Table */,
          fieldLabel : _this._strings['51c45b795d5d18a3e4e0c37e8b20a141'] /* Table */,
          forceSelection : true,
          listWidth : 300,
          loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
          minChars : 2,
          name : 'ontable',
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
                 if ((typeof(Pman.Login) != 'undefined') && Pman.Login.authUser.company_id_comptype != 'OWNER') {
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
          xtype : 'NumberField',
          fieldLabel : _this._strings['b718adec73e04ce3ec720dd11a06a308'] /* ID */,
          name : 'onid',
          width : 75,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'ComboBox',
          allowBlank : false,
          displayField : 'name',
          editable : false,
          emptyText : _this._strings['340c2ee497b85d5954b01c64de7f44f6'] /* Select Person */,
          fieldLabel : _this._strings['78c97ad77a6194c421b797c4cd030f75'] /* Notify Who */,
          forceSelection : true,
          hiddenName : 'person_id',
          listWidth : 500,
          loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
          minChars : 2,
          name : 'person_id_name',
          pageSize : 20,
          qtip : _this._strings['340c2ee497b85d5954b01c64de7f44f6'] /* Select Person */,
          queryParam : 'query[name]',
          selectOnFocus : true,
          tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{name}</b> ({company_id_name}) &lt;{email}&gt;</div>',
          triggerAction : 'all',
          typeAhead : true,
          valueField : 'id',
          width : 300,
          xns : Roo.form,
          '|xns' : 'Roo.form',
          store : {
           xtype : 'Store',
           remoteSort : true,
           sortInfo : { direction : 'ASC', field: 'name' },
           listeners : {
            beforeload : function (_self, o){
                 o.params = o.params || {};
                 // set more here
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
            fields : [{"name":"id","type":"int"},{"name":"name","type":"string"}],
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
          fieldLabel : _this._strings['078d0022ba7fe5e7b7e985f59db8fb19'] /* Match Event */,
          forceSelection : false,
          listWidth : 300,
          loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
          minChars : 2,
          name : 'event',
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
                 if (typeof(Pman.Login) !='undefined' && Pman.Login.authUser.company_id_comptype != 'OWNER') {
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
          displayField : 'val',
          editable : true,
          fieldLabel : _this._strings['004bf6c9a40003140292e97330236c53'] /* Action */,
          forceSelection : false,
          listWidth : 200,
          name : 'medium',
          triggerAction : 'all',
          valueField : 'val',
          width : 200,
          xns : Roo.form,
          '|xns' : 'Roo.form',
          store : {
           xtype : 'SimpleStore',
           data : [ [ 'email' ], [ 'APPROVAL' ], ['ENDOFDAYMAIL'] ],
           fields : [ 'val' ],
           xns : Roo.data,
           '|xns' : 'Roo.data'
          }
         },
         {
          xtype : 'NumberField',
          allowDecimals : false,
          fieldLabel : _this._strings['61f71a6a41f9dd2d2f1b6bca465216e5'] /* Delay action for no. of minutes */,
          name : 'no_minutes',
          width : 75,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'Checkbox',
          fieldLabel : _this._strings['993de4d53bd43053ce1b26eca5fd1051'] /* Last Event Only */,
          name : 'last_event_only',
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'Checkbox',
          fieldLabel : _this._strings['ae739a236065a45c64ad51aacb19498c'] /* Active? */,
          name : 'active',
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'Hidden',
          name : 'id',
          xns : Roo.form,
          '|xns' : 'Roo.form'
         }
        ]
       }
      ]
     }
    ]
   });
 }
};
