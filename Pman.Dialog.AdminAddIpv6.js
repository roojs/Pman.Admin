//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminAddIpv6 = {

 _strings : {
  '023a5dfa857c4aa0156e6685231a1dbd' :"Select Type",
  '8535bcc0f05358a583bb432bbadf7e0d' :"Select type",
  '21ec484b4de76650a90d349763586b01' :"Select Owner",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  '1814dfa23ca67a5b93237922728b52e3' :"Company Type",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  '887950755a62e33c26209bdcbdc1d3d3' :"Bulk Change",
  '96fdac283668b2490c859ef6ea97c86e' :"Owner of this record",
  'a2fa78bdc038a0a1df5caff2ac1ad945' :"Who owns this record",
  'c9cc8cce247e49bae79f15173ce97354' :"Save"
 },
 _named_strings : {
  'comptype_id_display_name_emptyText' : '023a5dfa857c4aa0156e6685231a1dbd' /* Select Type */ ,
  'comptype_id_display_name_fieldLabel' : '1814dfa23ca67a5b93237922728b52e3' /* Company Type */ ,
  'comptype_id_display_name_loadingText' : '1243daf593fa297e07ab03bf06d925af' /* Searching... */ ,
  'owner_id_name_emptyText' : '21ec484b4de76650a90d349763586b01' /* Select Owner */ ,
  'owner_id_name_loadingText' : '1243daf593fa297e07ab03bf06d925af' /* Searching... */ ,
  'owner_id_name_fieldLabel' : '96fdac283668b2490c859ef6ea97c86e' /* Owner of this record */ ,
  'owner_id_name_qtip' : 'a2fa78bdc038a0a1df5caff2ac1ad945' /* Who owns this record */ ,
  'comptype_id_display_name_qtip' : '8535bcc0f05358a583bb432bbadf7e0d' /* Select type */ 
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
    autoCreate : true,
    closable : false,
    collapsible : false,
    draggable : true,
    height : 150,
    modal : true,
    resizable : false,
    shadow : true,
    title : _this._strings['887950755a62e33c26209bdcbdc1d3d3'] /* Bulk Change */,
    width : 550,
    xns : Roo,
    '|xns' : 'Roo',
    center : {
     xtype : 'LayoutRegion',
     alwaysShowTabs : false,
     autoScroll : true,
     closeOnTab : true,
     hideTabs : true,
     titlebar : false,
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
            _this.dialog.el.mask("Saving");
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
      autoCreate : true,
      background : true,
      fitToFrame : true,
      region : 'center',
      xns : Roo,
      '|xns' : 'Roo',
      items  : [
       {
        xtype : 'Form',
        fileUpload : false,
        labelWidth : 160,
        url : baseURL + '/Roo/crm_person',
        listeners : {
         actioncomplete : function(f, act) {
              _this.dialog.el.unmask();
              if(act.type == 'setdata'){
                  _this.form.findField('owner_id').hide();
                  // show if the user has change owner perm
                  if (Pman.hasPerm('Crm.ChangeOwner','S')) {
                      _this.form.findField('owner_id').show();
                  }
                  return;
              }
             
              if (act.type == 'load') {
                  return;
              }
              
              
              if (act.type == 'submit') {
                  _this.dialog.hide();
                 
                  if (_this.callback) {
                      _this.callback.call(this, act.result.data);
                  }
                  return; 
              }
          },
         actionfailed : function(f, act) {
              _this.dialog.el.unmask();
              // error msg???
              Pman.standardActionFailed(f,act);
                        
          },
         rendered : function (form)
          {
              _this.form = form;
          }
        },
        xns : Roo.form,
        '|xns' : 'Roo.form',
        items  : [
         {
          xtype : 'Column',
          width : 500,
          xns : Roo.form,
          '|xns' : 'Roo.form',
          items  : [
           {
            xtype : 'ComboBox',
            allowBlank : true,
            alwaysQuery : true,
            displayField : 'display_name',
            editable : true,
            emptyText : _this._strings['023a5dfa857c4aa0156e6685231a1dbd'] /* Select Type */,
            fieldLabel : _this._strings['1814dfa23ca67a5b93237922728b52e3'] /* Company Type */,
            forceSelection : true,
            hiddenName : 'comptype_id',
            listWidth : 400,
            loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
            minChars : 2,
            name : 'comptype_id_display_name',
            pageSize : 20,
            qtip : _this._strings['8535bcc0f05358a583bb432bbadf7e0d'] /* Select type */,
            queryParam : 'search[display_name]',
            selectOnFocus : true,
            tpl : '<div class=\"x-grid-cell-text x-btn button\">  {display_name}</div>',
            triggerAction : 'all',
            typeAhead : false,
            valueField : 'id',
            width : 197,
            listeners : {
             render : function (_self)
              {
                  _this.etypeCombo = _self;
              }
            },
            xns : Roo.form,
            '|xns' : 'Roo.form',
            store : {
             xtype : 'Store',
             remoteSort : true,
             sortInfo : { direction : 'ASC', field: 'id' },
             listeners : {
              beforeload : function (_self, o){
                   o.params = o.params || {};
                   // set more here
                   //o.params['query[empty_etype]'] = 1;
                   o.params.etype = 'COMPTYPE';
                      o.params.active = 1;
                   o.params['!name'] = 'OWNER';
               }
             },
             xns : Roo.data,
             '|xns' : 'Roo.data',
             proxy : {
              xtype : 'HttpProxy',
              method : 'GET',
              url : baseURL + '/Roo/core_enum.php',
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
            actionMode : 'fieldEl',
            allowBlank : true,
            alwaysQuery : true,
            displayField : 'name',
            editable : false,
            emptyText : _this._strings['21ec484b4de76650a90d349763586b01'] /* Select Owner */,
            fieldLabel : _this._strings['96fdac283668b2490c859ef6ea97c86e'] /* Owner of this record */,
            forceSelection : true,
            hiddenName : 'owner_id',
            listWidth : 400,
            loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
            minChars : 1,
            name : 'owner_id_name',
            pageSize : 20,
            qtip : _this._strings['a2fa78bdc038a0a1df5caff2ac1ad945'] /* Who owns this record */,
            queryParam : 'search[name]',
            selectOnFocus : true,
            tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{name}</b> {email}</div>',
            triggerAction : 'all',
            typeAhead : false,
            valueField : 'id',
            width : 200,
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
                   o.params['query[is_owner]'] = 1;
                   o.params.active  = 1;
                   o.params['_can_own_contacts'] = 1;
               },
              load : function (_self, records, options)
               {
                   var ownerRecord = false;
                   Roo.each(records, function(r, i)  {
                       if(r.id == Pman.Login.authUserId) {
                           ownerRecord = r;
                       }
                   });
                   
                   if(ownerRecord !== false) {
                       _self.remove(ownerRecord);
                       _self.insert(0, ownerRecord);
                       ownerRecord.set('name', 'Me: ' + ownerRecord.get('name'));
                   }
                   
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
            xtype : 'Hidden',
            name : '_company_ids',
            xns : Roo.form,
            '|xns' : 'Roo.form'
           },
           {
            xtype : 'Hidden',
            name : '_person_ids',
            xns : Roo.form,
            '|xns' : 'Roo.form'
           }
          ]
         }
        ]
       }
      ]
     }
    ]
   });
 }
};
