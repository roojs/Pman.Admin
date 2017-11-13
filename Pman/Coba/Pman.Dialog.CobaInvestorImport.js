//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.CobaInvestorImport= function() {}
Roo.apply(Pman.Dialog.CobaInvestorImport.prototype, {

 _strings : {
  '1aa14e9f377b528b5537d70fbd35c6a2' :"Select File",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  '913ddd7613d305b4879b376adf3f798c' :"Import Investor",
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
    title : _this._strings['913ddd7613d305b4879b376adf3f798c'] /* Import Investor */,
    listeners : {
     show : function (_self)
      {
          _this.submit_button.enable();
          _this.submit_button.setText('OK');
      }
    },
    xns : Roo.bootstrap,
    '|xns' : 'Roo.bootstrap',
    buttons : [
     {
      xtype : 'Button',
      html : _this._strings['ea4788705e6873b424c65e91c2846b19'] /* Cancel */,
      style : 'float: right; margin: 10px; width: 70px;',
      weight : 'primary',
      listeners : {
       click : function (_self, e)
        {
            _this.dialog.hide({});
        }
      },
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap'
     },
     {
      xtype : 'Button',
      html : _this._strings['e0aa021e21dddbd6d8cecec71e9cf564'] /* OK */,
      style : 'float: right; margin: 10px; width: 70px;',
      weight : 'primary',
      listeners : {
       click : function (_self, e)
        {
            if(!_this.form.isValid()){
                  Roo.bootstrap.MessageBox.alert('Error', 'Please Correct all the errors in red');
                  return;
            }
            _this.form.findField('import_duplicate').setValue(''); 
            _this.form.doAction('submit');
            _this.submit_button.disable();
            _this.submit_button.setText('sending...');
        },
       render : function (_self)
        {
            _this.submit_button = _self;
        }
      },
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap'
     }
    ],
    items  : [
     {
      xtype : 'Form',
      fileUpload : true,
      method : 'POST',
      style : 'margin:15px;',
      url : baseURL + '/Coba/Import/Investors',
      listeners : {
       actioncomplete : function (_self, action)
        {
            if(action.type == 'setdata'){
                _self.reset(); 
                if(_this.data.id * 1 > 0) {
        //            _this.onid.setValue(_this.data.id);
        //            _this.ontable.setValue('coba_declarations');
                }        
                return;
            }
           
           if (action.type == 'submit') { // only submitted here if we are 
               _this.dialog.hide();
               if (_this.callback) {
                    _this.callback.call(_this, action.result);
                }
                
                _this.submit_button.enable();
                _this.submit_button.setText('OK');
                return;
            }
        },
       actionfailed : function (_self, action)
        {
            _this.submit_button.enable();
            _this.submit_button.setText('OK');
            Roo.log('action call: ');
            Roo.log(action);
            Roo.log("action failed");
            Roo.log("action type:"+action.failureType);
            
            switch(action.failureType) {
                case Roo.form.Action.SERVER_INVALID: 
                   if(action.result.errorMsg=="duplicate") {
                       Roo.bootstrap.MessageBox.confirm(
                           "Duplicate Entries where found, do you wish to import anyway", 
                            action.result.errors.toString(), 
                            function(res) {
                                if(res == 'no') {
                                    return;
                                }
                                _this.form.findField('import_duplicate').setValue('1'); 
                                _this.form.doAction('submit');
                                _this.submit_button.disable();
                                _this.submit_button.setText('sending...');
                               }
                            );
                          
                   } else {
                       Roo.bootstrap.MessageBox.alert("Server Error", action.result.errors.toString());
                   }
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
        xtype : 'Container',
        cls : 'col-md-12',
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
              fieldLabel : _this._strings['1aa14e9f377b528b5537d70fbd35c6a2'] /* Select File */,
              inputType : 'file',
              labelAlign : 'top',
              name : 'imageUpload',
              xns : Roo.bootstrap,
              '|xns' : 'Roo.bootstrap'
             },
             {
              xtype : 'Input',
              inputType : 'hidden',
              name : 'post_max_filesize',
              vtype : '32M',
              xns : Roo.bootstrap,
              '|xns' : 'Roo.bootstrap'
             },
             {
              xtype : 'Input',
              inputType : 'hidden',
              name : 'upload_max_filesize',
              vtype : '32M',
              xns : Roo.bootstrap,
              '|xns' : 'Roo.bootstrap'
             },
             {
              xtype : 'Input',
              inputType : 'hidden',
              name : 'import_duplicate',
              listeners : {
               render : function (_self)
                {
                    _this.import_duplicate = _self;
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
     }
    ]
   }  );
 }
});
Roo.apply(Pman.Dialog.CobaInvestorImport, Pman.Dialog.CobaInvestorImport.prototype);
