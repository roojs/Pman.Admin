//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminBulkPassword = {

 _strings : {
  '9a621c29402e2e7c826814b0454bbc87' :"email and new password separeted by a space (note you can not change your password this way)",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  'e47ca954fb02edc53af1507ac17d12a0' :"Bulk Change Passwords",
  'e0aa021e21dddbd6d8cecec71e9cf564' :"OK"
 },
 _named_strings : {
  'away_text_fieldLabel' : '9a621c29402e2e7c826814b0454bbc87' /* email and new password separeted by a space (note you can not change your password this way) */ 
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
            _this.form.findField('away_fwd').setValue(_this.awayCombo.getValue());
          
            if (!(_this.form.findField('away_state').getValue() *1)) {
                _this.form.submit();
                return;
            }
          
            if (!_this.form.findField('away_from_dt').getValue().length) {
               Roo.MessageBox.alert("Error", "Fill in from date");
                return;
            }
            if (!_this.form.findField('away_to_dt').getValue().length) {
               Roo.MessageBox.alert("Error", "Fill in from date");
                return;
            }
          
            if ((_this.form.findField('away_msg_state').getValue() * 1) && !_this.form.findField('away_msg').getValue().length) {
                Roo.MessageBox.alert("Error", "Fill in an away message");
                return;
            }
           
            if ((_this.form.findField('away_fwd_state').getValue() * 1) && !_this.form.findField('away_fwd').getValue().length) {
                Roo.MessageBox.alert("Error", "Fill in who the emails should be forwarded to");
                return;
            }
            if (!(_this.form.findField('away_msg_state').getValue() * 1) && !(_this.form.findField('away_fwd_state').getValue() * 1)) {
                Roo.MessageBox.alert("Error", "Select what should happen when you are away (send reply and/or forward emails)");
                return;
            }
            // -- what's this for?? - setting the away foward to the text awway text message..?
            //if(_this.awayText.isVisible()){
              //  _this.form.findField('away_fwd').setValue(_this.awayText.getValue().replace("\n", ','));
            //}
            
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
        url : baseURL + '/Roo/Users',
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
          fieldLabel : _this._strings['9a621c29402e2e7c826814b0454bbc87'] /* email and new password separeted by a space (note you can not change your password this way) */,
          height : 300,
          name : 'away_text',
          width : 400,
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
