//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.CobaInvestorCreate= function() {}
Roo.apply(Pman.Dialog.CobaInvestorCreate.prototype, {

 _strings : {
  'c55bb3f1897a02f7c3be32fc933b0e0c' :"Create Investor",
  '5a679c50cadfca1ff5cdbd31939af3fc' :"Generated password",
  'b60a6cfe4d8391ec9c29e11ab13216cd' :"Select Investment Advisor",
  'e5676ba19f12f141c9d199c36ee5fde6' :"please select the fund related to the investor",
  'c83804c010b690de6f340363e374b777' :"please enter the email of the investor",
  '52c649c38236206862e79e77f735902d' :"Investment Advisor",
  'e09596c4d5ca0043bbe539924e37adf9' :"please enter the username of the investor",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  'ae9e6ac49d4f451b1ebf440619f595b5' :"please select the type of the investor",
  'f6039d44b29456b20f8f373155ae4973' :"Username",
  '51eea3dc60ae3a0b1bb8188bc6337dc2' :"enter password",
  'c1098dd48f0fb20eeea79235055d02ca' :"Fund",
  'a1fa27779242b4902f7ae3bdd5c6d508' :"Type",
  'e0aa021e21dddbd6d8cecec71e9cf564' :"OK",
  'e456949630edb405fba2217ddeef7f3c' :"Primary contact email",
  '27f4aa512a351222967865d05016314c' :"enter password again to confirm"
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
    title : _this._strings['c55bb3f1897a02f7c3be32fc933b0e0c'] /* Create Investor */,
    listeners : {
     render : function (_self)
      {
          _this._confirm_dialog = Pman.Dialog.CobaInvestorCreateConfirm;
      },
     show : function (_self)
      {
           Roo.get(document.body).mask('Loading');
           new Pman.Request({
              url : baseURL + '/Roo/Modx_accountmgmts' ,
              method : 'GET',
              params : {
              }, 
              success : function(res) {          
                  if(res.data){
                      _this.fund_name.store.proxy.data = res;
                  }
                  new Pman.Request({
                      url : baseURL + '/Roo/core_person' ,
                      method : 'GET',
                      params : {
                          in_group_name : 'Adviser'
                      }, 
                      success : function(res) {          
                          if(res.data){
                              _this.advisor.store.proxy.data = res;
                          }
                          Roo.get(document.body).unmask();
                      },
                      failure : function(res) {
                          Roo.get(document.body).unmask();
                      }
                  });
              },
              failure : function(res) {
                  Roo.get(document.body).unmask();
              }
          });
      }
    },
    xns : Roo.bootstrap,
    '|xns' : 'Roo.bootstrap',
    buttons : [
     {
      xtype : 'Button',
      html : _this._strings['e0aa021e21dddbd6d8cecec71e9cf564'] /* OK */,
      style : 'float: right; margin: 10px; width:70px;',
      weight : 'primary',
      listeners : {
       click : function (_self, e)
        {
            if(!_this.form.isValid()){
                Roo.bootstrap.MessageBox.alert('Error','Invalid Input');
                return;
            }
               
            if(_this.check_set_pw_true.getValue() == '0'){
                _this.password.setValue('');
            }
            else{
                if(_this.check_gen_pw_true.getValue() == '0'){
                    _this.password.setValue(_this.pw_reenter.getValue());
                }
                else {
                    _this.password.setValue(_this.pw_gen.getValue());
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
     },
     {
      xtype : 'Button',
      html : _this._strings['ea4788705e6873b424c65e91c2846b19'] /* Cancel */,
      style : 'float: right; margin: 10px;',
      weight : 'danger',
      listeners : {
       click : function (_self, e)
        {
            _this.dialog.hide();
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
      url : baseURL+'/Roo/Modx_users',
      listeners : {
       actioncomplete : function (_self, action) {
        
            if (action.type == 'setdata') {
                _this.check_set_pw_true.setValue('0');
                //this.url = baseURL+'/Roo/Modx_accountmgmts'
                //this.doAction('load', { method: 'GET', params: action.data });
                return;
            }
            if (action.type == 'load') {
                return;
            }
            if (action.type =='submit') {
                Roo.log('test submit');
                
                if (_this.callback) {
                    _this.callback.call(_this, action.result);
                }
                
              
                
                _this.submit_button.enable();
                _this.submit_button.setText('OK');
                _this.dialog.hide();
                if(_this._confirm_dialog) {
                    _this._confirm_dialog.show({'investor_id':action.result.data.id, 'account_type': _this.investor_type.getValue()});            
                }
                 
                _this.form.reset();
                return;
            }
        
        },
       actionfailed : function (_self, action)
        {  
           _this.submit_button.enable();
           _this.submit_button.setText('OK');
           Roo.log('action call: '+action);
           Roo.log("action failed");
           Roo.log("action type:"+action.failureType);
          
           
           if(action.result.errorMsg.length >= 200) {
               Roo.bootstrap.MessageBox.alert("Error", action.result.errorMsg.substring(0,199) + '...');
          
           } else {
               Roo.bootstrap.MessageBox.alert("Error", action.result.errorMsg);
           }
        },
       render : function (_self,e)
        {
            _this.form = _self;
            
        },
       show : function (_self)
        {
            //if(_this.fund_name) {
            //    _this.fund_name.store.load({});
            //}
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
          xs : 12,
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap',
          items  : [
           {
            xtype : 'ComboBox',
            allowBlank : false,
            displayField : 'value',
            editable : false,
            fieldLabel : _this._strings['a1fa27779242b4902f7ae3bdd5c6d508'] /* Type */,
            labelAlign : 'top',
            name : 'type',
            placeholder : _this._strings['ae9e6ac49d4f451b1ebf440619f595b5'] /* please select the type of the investor */,
            triggerAction : 'all',
            listeners : {
             render : function (_self)
              {
                  _this.investor_type = _self;
              }
            },
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap',
            store : {
             xtype : 'SimpleStore',
             data : [
                 ['individual', 'Individual'],
                 ['corporate', 'Corporate'],
                 ['joint', 'Joint']
             ],
             fields : [ 'code', 'value' ],
             xns : Roo.data,
             '|xns' : 'Roo.data'
            }
           }
          ]
         }
        ]
       },
       {
        xtype : 'Row',
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap',
        items  : [
         {
          xtype : 'Column',
          xs : 12,
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap',
          items  : [
           {
            xtype : 'ComboBox',
            allowBlank : false,
            alwaysQuery : false,
            displayField : 'name',
            editable : false,
            fieldLabel : _this._strings['c1098dd48f0fb20eeea79235055d02ca'] /* Fund */,
            labelAlign : 'top',
            name : 'fund_name',
            placeholder : _this._strings['e5676ba19f12f141c9d199c36ee5fde6'] /* please select the fund related to the investor */,
            tpl : '<div class=\"roo-select2-result\"><b>{name}</b></div>',
            triggerAction : 'all',
            listeners : {
             render : function (_self)
              {
                  _this.fund_name = _self;
              }
            },
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap',
            store : {
             xtype : 'Store',
             remoteSort : false,
             sortInfo : {field:"name",direction:"ASC"},
             listeners : {
              beforeload : function (_self, options)
               {
               
               }
             },
             xns : Roo.data,
             '|xns' : 'Roo.data',
             proxy : {
              xtype : 'MemoryProxy',
              xns : Roo.data,
              '|xns' : 'Roo.data'
             },
             reader : {
              xtype : 'JsonReader',
              fields : [{'name':'name','type':'string'},{'name':'id',type:'string'}],
              xns : Roo.data,
              '|xns' : 'Roo.data'
             }
            }
           }
          ]
         }
        ]
       },
       {
        xtype : 'Row',
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap',
        items  : [
         {
          xtype : 'Column',
          xs : 12,
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap',
          items  : [
           {
            xtype : 'ComboBox',
            allowBlank : false,
            alwaysQuery : false,
            displayField : 'name',
            editable : false,
            fieldLabel : _this._strings['52c649c38236206862e79e77f735902d'] /* Investment Advisor */,
            forceSelection : true,
            hiddenName : 'investment_advisor_id',
            indicatorpos : 'right',
            labelAlign : 'top',
            minChars : 2,
            name : 'investment_advisor_id_name',
            placeholder : _this._strings['b60a6cfe4d8391ec9c29e11ab13216cd'] /* Select Investment Advisor */,
            queryParam : 'query[name]',
            tpl : '<div class=\"roo-select2-result\"><b>{name}</b></div>',
            triggerAction : 'all',
            typeAhead : true,
            valueField : 'id',
            listeners : {
             render : function (_self)
              {
                  _this.advisor = _self;
              }
            },
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap',
            store : {
             xtype : 'Store',
             remoteSort : false,
             sortInfo : {field:"name",direction:"ASC"},
             listeners : {
              beforeload : function (_self, o)
               {
               
               }
             },
             xns : Roo.data,
             '|xns' : 'Roo.data',
             proxy : {
              xtype : 'MemoryProxy',
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
                      'name': 'name',
                      'type': 'string'
                  }
              ],
              xns : Roo.data,
              '|xns' : 'Roo.data'
             }
            }
           }
          ]
         }
        ]
       },
       {
        xtype : 'Row',
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap',
        items  : [
         {
          xtype : 'Column',
          xs : 12,
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap',
          items  : [
           {
            xtype : 'Input',
            allowBlank : false,
            fieldLabel : _this._strings['e456949630edb405fba2217ddeef7f3c'] /* Primary contact email */,
            labelAlign : 'top',
            name : 'email',
            placeholder : _this._strings['c83804c010b690de6f340363e374b777'] /* please enter the email of the investor */,
            style : 'width: inherit;',
            listeners : {
             keyup : function (_self, e)
              {
              //    console.debug('text box value: ' + _this.form.findField('email').getValue());
                  var email = _this.form.findField('email').getValue();
                  if(email.length>0) {
                      var res = email.split('@');
                      if(res.length>0) {
                          _this.form.findField('username').setValue(res[0]);
                      } else {
                          _this.form.findField('username').setValue(email);
                      }
                  }
              },
             render : function (_self)
              {
                  _this.email = this;
              },
             valid : function (_self)
              {
                  var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
                  if (!re.test(_this.email.getValue())){
                      _this.email.markInvalid('testing');
                  }
              }
            },
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap'
           }
          ]
         }
        ]
       },
       {
        xtype : 'Row',
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap',
        items  : [
         {
          xtype : 'Column',
          xs : 12,
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap',
          items  : [
           {
            xtype : 'Input',
            allowBlank : false,
            fieldLabel : _this._strings['f6039d44b29456b20f8f373155ae4973'] /* Username */,
            labelAlign : 'top',
            name : 'username',
            placeholder : _this._strings['e09596c4d5ca0043bbe539924e37adf9'] /* please enter the username of the investor */,
            style : 'width: inherit;',
            listeners : {
             render : function (_self)
              {
              
              }
            },
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap'
           }
          ]
         }
        ]
       },
       {
        xtype : 'Row',
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap',
        items  : [
         {
          xtype : 'Column',
          xs : 6,
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap',
          items  : [
           {
            xtype : 'Radio',
            boxLabel : 'No password',
            inputValue : 0,
            name : 'check_set_pw',
            style : 'float: left; width: 200px;',
            valueOff : 0,
            listeners : {
             check : function (_self, checked)
              {
              
                  if (checked){
                  
                  
                  _this.check_gen_pw_row.el.hide('TRUE');
                  _this.pw_enter_row.el.hide('TRUE');
                  _this.pw_gen_row.el.hide('TRUE');
                  
                  _this.pw_gen.setValue('');
                  _this.pw_enter.setValue('please enter your password');
                  _this.pw_reenter.setValue('please enter your password');
                  //_this.check_gen_pw_true.setValue('0');
                  }
                 
                  
              },
             render : function (_self)
              {
                  _this.check_set_pw_false = this;
              }
            },
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap'
           }
          ]
         },
         {
          xtype : 'Column',
          xs : 6,
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap',
          items  : [
           {
            xtype : 'Radio',
            boxLabel : 'Set password',
            inputValue : 1,
            name : 'check_set_pw',
            valueOff : 0,
            listeners : {
             check : function (_self, checked)
              {
                  if (checked){
                      Roo.log('return check_set_pw_true: '+checked);
                      _this.check_gen_pw_row.el.show('TRUE');
                      _this.pw_enter_row.el.hide('TURE');
                      _this.check_gen_pw_true.setValue('1');
                      _this.pw_enter.setValue('please enter your password');
                      _this.pw_reenter.setValue('please enter your password');
              
                  }
              },
             render : function (_self)
              {
                  _this.check_set_pw_true = this;
              }
            },
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap'
           }
          ]
         }
        ]
       },
       {
        xtype : 'Row',
        listeners : {
         render : function (_self)
          {
              _this.check_gen_pw_row = this;
              this.el.setVisibilityMode(Roo.Element.DISPLAY);
          }
        },
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap',
        items  : [
         {
          xtype : 'Column',
          xs : 6,
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap',
          items  : [
           {
            xtype : 'Radio',
            boxLabel : 'Enter Password',
            inputValue : 0,
            name : 'check_gen_pw',
            style : 'float: left; width: 200px;',
            listeners : {
             check : function (_self, checked)
              {
              
                  _this.pw_gen_row.el.hide('TRUE');
                  _this.pw_gen.setValue('');
                  
                  _this.pw_enter_row.el.show('TRUE');
                  _this.pw_enter.setValue('');
                  _this.pw_reenter.setValue('');
              }
            },
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap'
           }
          ]
         },
         {
          xtype : 'Column',
          xs : 6,
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap',
          items  : [
           {
            xtype : 'Radio',
            boxLabel : 'Generate password',
            inputValue : 1,
            name : 'check_gen_pw',
            listeners : {
             check : function (_self, checked)
              {
              
                  _this.pw_gen_row.el.show('TRUE');
                  var randomPw = Math.random().toString(36).slice(-8);
                  _this.pw_gen.setValue(randomPw);
                  
                  _this.pw_enter_row.el.hide('TRUE');
              
                  _this.pw_enter.setValue('please enter your password');
                  _this.pw_reenter.setValue('please enter your password');
                  
                  
              },
             render : function (_self)
              {
                  _this.check_gen_pw_true = this;
              }
            },
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap'
           }
          ]
         }
        ]
       },
       {
        xtype : 'Row',
        listeners : {
         render : function (_self)
          {
              _this.pw_enter_row = this;
              this.el.setVisibilityMode(Roo.Element.DISPLAY);
              
          }
        },
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap',
        items  : [
         {
          xtype : 'Column',
          xs : 12,
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap',
          items  : [
           {
            xtype : 'Input',
            allowBlank : false,
            inputType : 'password',
            labelAlign : 'top',
            name : 'pw_enter',
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
            inputType : 'password',
            labelAlign : 'top',
            name : 'pw_reenter',
            placeholder : _this._strings['27f4aa512a351222967865d05016314c'] /* enter password again to confirm */,
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
           }
          ]
         }
        ]
       },
       {
        xtype : 'Row',
        listeners : {
         render : function (_self)
          {
              _this.pw_gen_row = this;
              this.el.setVisibilityMode(Roo.Element.DISPLAY);
          }
        },
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap',
        items  : [
         {
          xtype : 'Column',
          xs : 12,
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap',
          items  : [
           {
            xtype : 'Input',
            allowBlank : true,
            fieldLabel : _this._strings['5a679c50cadfca1ff5cdbd31939af3fc'] /* Generated password */,
            labelAlign : 'top',
            name : 'pw_gen',
            listeners : {
             render : function (_self)
              {
                  _this.pw_gen = this;
              }
            },
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap'
           }
          ]
         }
        ]
       },
       {
        xtype : 'Input',
        inputType : 'hidden',
        name : 'new_password',
        listeners : {
         render : function (_self)
          {
              _this.password = this;
          }
        },
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap'
       }
      ]
     },
     {
      xtype : 'Row',
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap',
      items  : [
       {
        xtype : 'Column',
        xs : 12,
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap'
       }
      ]
     }
    ]
   }  );
 }
});
Roo.apply(Pman.Dialog.CobaInvestorCreate, Pman.Dialog.CobaInvestorCreate.prototype);
