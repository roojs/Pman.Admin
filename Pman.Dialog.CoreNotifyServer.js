//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.CoreNotifyServer = {

 _strings : {
  '7082f08d3a32017e44122c3c708ce06a' :"Add / Edit Server",
  '893a004d1a309cf58c923bc29ee7d1f0' :"Select IPv6 Sender",
  '84e7b3bd5efecf08543209c9ad04e46c' :"IPv6 PTR",
  'a74ce90b6e079667cd93f2df7dc59684' :"IPv6 Range From",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  '7e240928383acb93e5066a6149430337' :"Pool Name",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  '2059e6f007c7ec60d08be149f4196c0c' :"Helo Name",
  'e253f01e45700c07327115a5e6d677bf' :"Is Active?",
  'cf1dd00b38e7d5932e3ab7a377460dc5' :"Hostname (FQDN)",
  'a8431c09cedf0138053cdbbc5a652906' :"IPv6 Sender",
  'c9cc8cce247e49bae79f15173ce97354' :"Save",
  'b9acd37bb15ccc51548858ba7618bf0b' :"IPv6 Range To"
 },
 _named_strings : {
  'ipv6_range_to_fieldLabel' : 'b9acd37bb15ccc51548858ba7618bf0b' /* IPv6 Range To */ ,
  'hostname_fieldLabel' : 'cf1dd00b38e7d5932e3ab7a377460dc5' /* Hostname (FQDN) */ ,
  'is_active_fieldLabel' : 'e253f01e45700c07327115a5e6d677bf' /* Is Active? */ ,
  'poolname_fieldLabel' : '7e240928383acb93e5066a6149430337' /* Pool Name */ ,
  'ipv6_ptr_fieldLabel' : '84e7b3bd5efecf08543209c9ad04e46c' /* IPv6 PTR */ ,
  'ipv6_sender_id_email_fieldLabel' : 'a8431c09cedf0138053cdbbc5a652906' /* IPv6 Sender */ ,
  'ipv6_sender_id_email_qtip' : '893a004d1a309cf58c923bc29ee7d1f0' /* Select IPv6 Sender */ ,
  'ipv6_range_from_fieldLabel' : 'a74ce90b6e079667cd93f2df7dc59684' /* IPv6 Range From */ ,
  'helo_fieldLabel' : '2059e6f007c7ec60d08be149f4196c0c' /* Helo Name */ ,
  'ipv6_sender_id_email_emptyText' : '893a004d1a309cf58c923bc29ee7d1f0' /* Select IPv6 Sender */ ,
  'ipv6_sender_id_email_loadingText' : '1243daf593fa297e07ab03bf06d925af' /* Searching... */ 
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
    closable : true,
    collapsible : false,
    height : 300,
    modal : true,
    resizable : false,
    title : _this._strings['7082f08d3a32017e44122c3c708ce06a'] /* Add / Edit Server */,
    width : 600,
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
        labelWidth : 150,
        method : 'POST',
        style : 'margin:10px;',
        url : baseURL + '/Roo/core_notify_server',
        listeners : {
         actioncomplete : function(_self,action)
          {
              if (action.type == 'setdata') {
                 
                 if (_this.data.clone_of) {
                     _this.dialog.el.mask("Loading");
                      this.load({ method: 'GET', params: { '_id' : _this.data.clone_of }});
                 }
                 return;
              }
              if (action.type == 'load') {
                  _this.dialog.el.unmask();
                  // unset the id..
                  
                  return;
              }
              if (action.type =='submit') {
              
                  _this.dialog.el.unmask();
                  _this.dialog.hide();
                  
                   
                  _this.form.reset();
                   
                   _this.callback.call(_this, action.result.data);
            
                  
                   return;
              }
          },
         actionfailed : function (_self, action)
          {
              _this.dialog.el.unmask();
              
              Pman.standardActionFailed(_self, action);
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
          xtype : 'TextField',
          allowBlank : false,
          fieldLabel : _this._strings['cf1dd00b38e7d5932e3ab7a377460dc5'] /* Hostname (FQDN) */,
          name : 'hostname',
          width : 380,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'TextField',
          allowBlank : false,
          fieldLabel : _this._strings['2059e6f007c7ec60d08be149f4196c0c'] /* Helo Name */,
          name : 'helo',
          width : 200,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'TextField',
          allowBlank : false,
          fieldLabel : _this._strings['7e240928383acb93e5066a6149430337'] /* Pool Name */,
          name : 'poolname',
          width : 200,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'TextField',
          fieldLabel : _this._strings['84e7b3bd5efecf08543209c9ad04e46c'] /* IPv6 PTR */,
          name : 'ipv6_ptr',
          width : 380,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'TextField',
          fieldLabel : _this._strings['a74ce90b6e079667cd93f2df7dc59684'] /* IPv6 Range From */,
          name : 'ipv6_range_from',
          width : 380,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'TextField',
          fieldLabel : _this._strings['b9acd37bb15ccc51548858ba7618bf0b'] /* IPv6 Range To */,
          name : 'ipv6_range_to',
          width : 380,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'ComboBox',
          alwaysQuery : true,
          displayField : 'email',
          emptyText : _this._strings['893a004d1a309cf58c923bc29ee7d1f0'] /* Select IPv6 Sender */,
          fieldLabel : _this._strings['a8431c09cedf0138053cdbbc5a652906'] /* IPv6 Sender */,
          forceSelection : true,
          hiddenName : 'ipv6_sender_id',
          listWidth : 250,
          loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
          minChars : 2,
          name : 'ipv6_sender_id_email',
          pageSize : 20,
          qtip : _this._strings['893a004d1a309cf58c923bc29ee7d1f0'] /* Select IPv6 Sender */,
          queryParam : 'query[name]',
          selectOnFocus : true,
          tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{email}</b></div>',
          triggerAction : 'all',
          typeAhead : false,
          valueField : 'id',
          width : 200,
          xns : Roo.form,
          '|xns' : 'Roo.form',
          store : {
           xtype : 'Store',
           remoteSort : true,
           sortInfo : { direction : 'ASC', field: 'id' },
           listeners : {
            beforeload : function (_self, o){
                 o.params = o.params || {};
             }
           },
           xns : Roo.data,
           '|xns' : 'Roo.data',
           proxy : {
            xtype : 'HttpProxy',
            method : 'GET',
            url : baseURL + '/Roo/core_notify_sender.php',
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
          xtype : 'Checkbox',
          fieldLabel : _this._strings['e253f01e45700c07327115a5e6d677bf'] /* Is Active? */,
          name : 'is_active',
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
