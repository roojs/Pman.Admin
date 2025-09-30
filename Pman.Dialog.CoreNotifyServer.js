//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.CoreNotifyServer = {

 _strings : {
  '7082f08d3a32017e44122c3c708ce06a' :"Add / Edit Server",
  'bf09196dbed1aa01793da7b19a053bb2' :"IPV6 PTR",
  '7e240928383acb93e5066a6149430337' :"Pool Name",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  '2059e6f007c7ec60d08be149f4196c0c' :"Helo Name",
  'e253f01e45700c07327115a5e6d677bf' :"Is Active?",
  'cf1dd00b38e7d5932e3ab7a377460dc5' :"Hostname (FQDN)",
  'c9cc8cce247e49bae79f15173ce97354' :"Save"
 },
 _named_strings : {
  'hostname_fieldLabel' : 'cf1dd00b38e7d5932e3ab7a377460dc5' /* Hostname (FQDN) */ ,
  'is_active_fieldLabel' : 'e253f01e45700c07327115a5e6d677bf' /* Is Active? */ ,
  'poolname_fieldLabel' : '7e240928383acb93e5066a6149430337' /* Pool Name */ ,
  'ipv6_ptr_fieldLabel' : 'bf09196dbed1aa01793da7b19a053bb2' /* IPV6 PTR */ ,
  'helo_fieldLabel' : '2059e6f007c7ec60d08be149f4196c0c' /* Helo Name */ 
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
    height : 200,
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
          allowBlank : false,
          fieldLabel : _this._strings['bf09196dbed1aa01793da7b19a053bb2'] /* IPV6 PTR */,
          name : 'ipv6_ptr',
          width : 380,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
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
          fieldLabel : _this._strings['cf1dd00b38e7d5932e3ab7a377460dc5'] /* Hostname (FQDN) */,
          name : 'hostname',
          width : 380,
          xns : Roo.form,
          '|xns' : 'Roo.form'
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
