//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.CobaInvestorChangePassword= function() {}
Roo.apply(Pman.Dialog.CobaInvestorChangePassword.prototype, {

 _strings : {
  '150526edf0f88e7bfd828dc679d4daeb' :"Retype Password",
  '8f1e77e0d2be21da93cd4d9a939148f7' :"Change Password",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  'ae3bb2a1ac61750150b606298091d38a' :"New Password",
  '51eea3dc60ae3a0b1bb8188bc6337dc2' :"enter password",
  '32ab89ebb0ab2b1b4062993bff92cc41' :"retype password",
  'e0aa021e21dddbd6d8cecec71e9cf564' :"OK"
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
  this.dialog.show(this.data._el);
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
    xtype : 'Modal',
    cls : 'enable-overflow',
    title : _this._strings['8f1e77e0d2be21da93cd4d9a939148f7'] /* Change Password */,
    listeners : {
     show : function (_self)
      {
      //    _this.form.clearInvalid();
      }
    },
    xns : Roo.bootstrap,
    '|xns' : 'Roo.bootstrap',
    buttons : [
     {
      xtype : 'Button',
      html : _this._strings['ea4788705e6873b424c65e91c2846b19'] /* Cancel */,
      listeners : {
       click : function (_self, e)
        {
            _this.dialog.hide({});
        },
       render : function (_self)
        {
        
        }
      },
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap'
     },
     {
      xtype : 'Button',
      html : _this._strings['e0aa021e21dddbd6d8cecec71e9cf564'] /* OK */,
      weight : 'primary',
      listeners : {
       click : function (_self, e)
        {
            if(!_this.form.isValid()){
                Roo.bootstrap.MessageBox.alert('Error', 'Please Correct all the errors in red');
                return;
            }
            
            if (_this.form.findField('new_password')) {
                    
                var p1 = _this.form.findField('new_password').getValue();
                var p2 = _this.form.findField('retype_password').getValue();
        
                if (p1.length || p2.length) {
                    if (p1 != p2) {
                        Roo.bootstrap.MessageBox.alert("Error", "Passwords do not match");
                        return;
                    }
                }
                    
                
           }
            _this.form.doAction('submit');
            _this.submit_button.disable();
            _this.submit_button.setText('sending...');
        },
       render : function (_self)
        {
            _this.submit_button = this;
        }
      },
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap'
     }
    ],
    items  : [
     {
      xtype : 'Form',
      method : 'POST',
      style : 'margin:15px;',
      url : baseURL+'/Roo/Modx_users',
      listeners : {
       actioncomplete : function (_self, action)
        {
            if(action.type == 'setdata'){
               if(_this.data.id * 1 > 0) {
                    _this.userdata_id.setValue(_this.data.id);
                    _this.form.clearInvalid();
               }
                return;
            }
        
        
            if (action.type =='submit') {
                Roo.log('test submit');
                
                if (_this.callback) {
                    _this.callback.call(_this, action.result);
                }
                _this.form.reset();
                
                _this.submit_button.enable();
                _this.submit_button.setText('OK');
                _this.dialog.hide({});
                return;
            }
        
        },
       actionfailed : function (_self, action)
        {
           _this.submit_button.enable();
           _this.submit_button.setText('OK');
           
           switch(action.failureType) {
            case Roo.form.Action.SERVER_INVALID: 
               Roo.bootstrap.MessageBox.alert("Server Error", action.result.errorMsg);
               break;
            case Roo.form.Action.CLIENT_INVALID: //for validation
               Roo.bootstrap.MessageBox.alert("Client Error", action.result.errorMsg);
               break;
            case Roo.form.Action.CONNECT_FAILURE:
               Roo.bootstrap.MessageBox.alert("Connect Error", action.result.errorMsg);
               break;
            default: 
               Roo.bootstrap.MessageBox.alert("Error", action.result.errorMsg);
               break;
               
            }
        },
       render : function (_self)
        {
            _this.form = _self;
        }
      },
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap',
      items  : [
       {
        xtype : 'Row',
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap',
        items  : [
         {
          xtype : 'Column',
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap',
          items  : [
           {
            xtype : 'Input',
            allowBlank : false,
            fieldLabel : _this._strings['ae3bb2a1ac61750150b606298091d38a'] /* New Password */,
            inputType : 'password',
            labelAlign : 'top',
            name : 'new_password',
            placeholder : _this._strings['51eea3dc60ae3a0b1bb8188bc6337dc2'] /* enter password */,
            listeners : {
             change : function (_self, newValue, oldValue)
              {
                  _this.pw_reenter.markInvalid('unmatch2');
              },
             render : function (_self)
              {
                  _this.pw_enter = this; 
              }
            },
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap'
           },
           {
            xtype : 'Input',
            allowBlank : false,
            fieldLabel : _this._strings['150526edf0f88e7bfd828dc679d4daeb'] /* Retype Password */,
            inputType : 'password',
            labelAlign : 'top',
            name : 'retype_password',
            placeholder : _this._strings['32ab89ebb0ab2b1b4062993bff92cc41'] /* retype password */,
            listeners : {
             render : function (_self)
              {
                  _this.pw_reenter = this;
              },
             valid : function (_self)
              {
                  if (_this.pw_enter.getValue() != _this.pw_reenter.getValue()){
                      _this.pw_reenter.markInvalid('unmatch2');
                  }
              }
            },
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap'
           },
           {
            xtype : 'Input',
            allowBlank : false,
            inputType : 'hidden',
            labelAlign : 'top',
            name : 'id',
            placeholder : _this._strings['51eea3dc60ae3a0b1bb8188bc6337dc2'] /* enter password */,
            listeners : {
             render : function (_self)
              {
                  _this.userdata_id = _self;
              }
            },
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap'
           }
          ]
         }
        ]
       }
      ]
     }
    ]
   }  );
 }
});
Roo.apply(Pman.Dialog.CobaInvestorChangePassword, Pman.Dialog.CobaInvestorChangePassword.prototype);
