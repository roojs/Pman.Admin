//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminWatch = {

 _strings : {
  'e675e43625096ce5f316055dfd1df7ea' :"When this occurs",
  'c66ff5dd15feb3cb2e414df869721b9a' :"Do this action",
  'f08758b0c1d06ae425a00e4166b5d8a5' :"Delay action for:",
  '34861b5a124462e93a8eedf91a3559bd' :"on this ID (optional)",
  'ea221a6fb492303155561b1ce1ae0f6c' :"Notify this person",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  '75c5929bbdd5b4e3fb09d3d3a4e73a04' :"Edit / Create core_watch",
  '340c2ee497b85d5954b01c64de7f44f6' :"Select Person",
  '4d3d769b812b6faa6b76e1a8abaece2d' :"Active",
  'c9cc8cce247e49bae79f15173ce97354' :"Save"
 },
 _named_strings : {
  'person_id_name_qtip' : '340c2ee497b85d5954b01c64de7f44f6' /* Select Person */ ,
  'medium_fieldLabel' : 'c66ff5dd15feb3cb2e414df869721b9a' /* Do this action */ ,
  'person_id_name_emptyText' : '340c2ee497b85d5954b01c64de7f44f6' /* Select Person */ ,
  'person_id_name_fieldLabel' : 'ea221a6fb492303155561b1ce1ae0f6c' /* Notify this person */ ,
  'onid_fieldLabel' : '34861b5a124462e93a8eedf91a3559bd' /* on this ID (optional) */ ,
  'event_fieldLabel' : 'e675e43625096ce5f316055dfd1df7ea' /* When this occurs */ ,
  'active_fieldLabel' : '4d3d769b812b6faa6b76e1a8abaece2d' /* Active */ ,
  'person_id_name_loadingText' : '1243daf593fa297e07ab03bf06d925af' /* Searching... */ 
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
    height : 250,
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
          alwaysQuery : true,
          displayField : 'action',
          fieldLabel : _this._strings['e675e43625096ce5f316055dfd1df7ea'] /* When this occurs */,
          listWidth : 300,
          name : 'event',
          tpl : '<div class=\"x-grid-cell-text x-btn button\">{table}:{action} </div>',
          triggerAction : 'all',
          valueField : 'action',
          width : 300,
          listeners : {
           select : function (combo, record, index)
            {
                _this.form.findField('ontable').setValue(record.data.table);
            }
          },
          xns : Roo.form,
          '|xns' : 'Roo.form',
          store : {
           xtype : 'Store',
           remoteSort : true,
           sortInfo : { direction : 'ASC', field: 'action' },
           listeners : {
            beforeload : function (_self, o){
                 o.params = o.params || {};
                 o.params._watchable_events = 1;
                 if(
                     _this.form.findField('medium').getValue()
                     &&
                     _this.form.findField('person_id').getValue() * 1
                 ) {
                     var medium = _this.form.findField('medium').getValue();
                     var ar;
                     if(medium.includes('::')) {
                         ar = medium.split('::');
                     }
                     else if(medium.includes(':')) {
                         ar = medium.split(':');
                     }
                     else {
                         return;
                     }
                     o.params._watchable_events_table = ar[0];
                 }
             }
           },
           xns : Roo.data,
           '|xns' : 'Roo.data',
           proxy : {
            xtype : 'HttpProxy',
            method : 'GET',
            url : baseURL + '/Roo/core_watch',
            xns : Roo.data,
            '|xns' : 'Roo.data'
           },
           reader : {
            xtype : 'JsonReader',
            fields : ["table", "action"],
            id : 'action',
            root : 'data',
            totalProperty : 'total',
            xns : Roo.data,
            '|xns' : 'Roo.data'
           }
          }
         },
         {
          xtype : 'NumberField',
          allowDecimals : false,
          fieldLabel : _this._strings['34861b5a124462e93a8eedf91a3559bd'] /* on this ID (optional) */,
          name : 'onid',
          width : 75,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'ComboBox',
          allowBlank : true,
          displayField : 'name',
          editable : true,
          emptyText : _this._strings['340c2ee497b85d5954b01c64de7f44f6'] /* Select Person */,
          fieldLabel : _this._strings['ea221a6fb492303155561b1ce1ae0f6c'] /* Notify this person */,
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
          listeners : {
           select : function (combo, record, index)
            {
            
            }
          },
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
          alwaysQuery : true,
          displayField : 'action',
          fieldLabel : _this._strings['c66ff5dd15feb3cb2e414df869721b9a'] /* Do this action */,
          listWidth : 300,
          name : 'medium',
          triggerAction : 'all',
          valueField : 'action',
          width : 300,
          xns : Roo.form,
          '|xns' : 'Roo.form',
          store : {
           xtype : 'Store',
           remoteSort : true,
           sortInfo : { direction : 'ASC', field: 'action' },
           listeners : {
            beforeload : function (_self, o){
                 o.params = o.params || {};
                 o.params._watchable_actions = 1;
                 if(
                     _this.form.findField('ontable').getValue()
                     &&
                     _this.form.findField('person_id').getValue() * 1
                 ) {
                     o.params._watchable_actions_table = _this.form.findField('ontable').getValue();
                 }
             }
           },
           xns : Roo.data,
           '|xns' : 'Roo.data',
           proxy : {
            xtype : 'HttpProxy',
            method : 'GET',
            url : baseURL + '/Roo/core_watch',
            xns : Roo.data,
            '|xns' : 'Roo.data'
           },
           reader : {
            xtype : 'JsonReader',
            fields : ["action"],
            id : 'action',
            root : 'data',
            totalProperty : 'total',
            xns : Roo.data,
            '|xns' : 'Roo.data'
           }
          }
         },
         {
          xtype : 'Row',
          xns : Roo.form,
          '|xns' : 'Roo.form',
          items  : [
           {
            xtype : 'Column',
            style : 'margin-top:3px;',
            width : 100,
            xns : Roo.form,
            '|xns' : 'Roo.form',
            items  : [
             {
              xtype : 'TextItem',
              html : _this._strings['f08758b0c1d06ae425a00e4166b5d8a5'] /* Delay action for: */,
              xns : Roo.form,
              '|xns' : 'Roo.form'
             }
            ]
           },
           {
            xtype : 'Column',
            hideLabels : true,
            width : 100,
            xns : Roo.form,
            '|xns' : 'Roo.form',
            items  : [
             {
              xtype : 'NumberField',
              allowDecimals : false,
              name : 'delay_value',
              width : 75,
              xns : Roo.form,
              '|xns' : 'Roo.form'
             }
            ]
           },
           {
            xtype : 'Column',
            hideLabels : true,
            width : 100,
            xns : Roo.form,
            '|xns' : 'Roo.form',
            items  : [
             {
              xtype : 'ComboBox',
              displayField : 'unit',
              editable : false,
              listWidth : 75,
              mode : 'local',
              name : 'delay_unit',
              triggerAction : 'all',
              valueField : 'unit',
              width : 75,
              xns : Roo.form,
              '|xns' : 'Roo.form',
              store : {
               xtype : 'SimpleStore',
               data : [
                   ['days'],
                   ['hours'],
                   ['minutes']
               ],
               fields : ['unit'],
               xns : Roo.data,
               '|xns' : 'Roo.data'
              }
             }
            ]
           }
          ]
         },
         {
          xtype : 'Checkbox',
          fieldLabel : _this._strings['4d3d769b812b6faa6b76e1a8abaece2d'] /* Active */,
          name : 'active',
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'Hidden',
          name : 'ontable',
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
