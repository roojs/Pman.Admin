//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminBulkPassword = {

 _strings : {
  '6dac324294c8f0378abea84fa382b60c' :"email and new password separeted by a space <br/>(note you can not change your password this way)",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  'e47ca954fb02edc53af1507ac17d12a0' :"Bulk Change Passwords",
  'e0aa021e21dddbd6d8cecec71e9cf564' :"OK"
 },
 _named_strings : {
  '_bulk_update_passwords_fieldLabel' : '6dac324294c8f0378abea84fa382b60c' /* email and new password separeted by a space <br/>(note you can not change your password this way) */ 
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
    height : 420,
    modal : true,
    resizable : false,
    title : _this._strings['e47ca954fb02edc53af1507ac17d12a0'] /* Bulk Change Passwords */,
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
            _this.form.reset();
            _this.dialog.hide();
        }
      },
      xns : Roo,
      '|xns' : 'Roo'
     },
     {
      xtype : 'Button',
      text : _this._strings['e0aa021e21dddbd6d8cecec71e9cf564'] /* OK */,
      listeners : {
       click : function (_self, e)
        {
            
            
            _this.form.submit();
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
        labelAlign : 'top',
        labelWidth : 100,
        style : 'margin:5px',
        url : baseURL + '/Roo/Core_person',
        listeners : {
         actioncomplete : function (_self, action)
          { 
             if (action.type == 'setdata') {
          
                  
          
                return;
                
             }
              if (action.type == 'load') {
           
                  return;
              }
              if (action.type =='submit') {
          
                  
                  _this.dialog.hide();
          
          
                  if (_this.callback) {
                    _this.callback.call(_this, action.result.data);
                  }
                  _this.form.reset();
                  return;
                } 
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
          xtype : 'TextArea',
          actionMode : 'fieldEl',
          fieldLabel : _this._strings['6dac324294c8f0378abea84fa382b60c'] /* email and new password separeted by a space <br/>(note you can not change your password this way) */,
          height : 300,
          name : '_bulk_update_passwords',
          width : 450,
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
