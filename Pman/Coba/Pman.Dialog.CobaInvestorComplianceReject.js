//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.CobaInvestorComplianceReject= function() {}
Roo.apply(Pman.Dialog.CobaInvestorComplianceReject.prototype, {

 _strings : {
  'c3829f941b2eb369a4eb1788396c5556' :"explain why you reject this investor",
  'babca5bf265170c851ad830547a20f02' :"Please explain why reject this investor",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  'e0aa021e21dddbd6d8cecec71e9cf564' :"OK",
  '539d24367a77a2a7b50a66bf7c4e6cf0' :"COMPLIANCE REJECTED"
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
    title : _this._strings['babca5bf265170c851ad830547a20f02'] /* Please explain why reject this investor */,
    xns : Roo.bootstrap,
    '|xns' : 'Roo.bootstrap',
    buttons : [
     {
      xtype : 'Button',
      html : _this._strings['ea4788705e6873b424c65e91c2846b19'] /* Cancel */,
      listeners : {
       click : function (_self, e)
        {
            _this.dialog.hide();
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
            _this.form.doAction('submit');
        }
      },
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap'
     }
    ],
    items  : [
     {
      xtype : 'Form',
      loadMask : false,
      method : 'POST',
      style : 'margin:15px;',
      url : baseURL+'/Roo/coba_investor_notes',
      listeners : {
       actioncomplete : function (_self, action)
        {
            if(action.type == 'setdata'){
            
                return;
            }
        
        
            if (action.type =='submit') {
                
                _this.dialog.hide();
                
                if (_this.callback) {
                    _this.callback.call(_this, action.result);
                }
                
                _this.form.reset();
                
                return;
            }
        
        },
       actionfailed : function (_self, action)
        {
            Roo.log(action);
            
            var err = 'Please Correct all the errors in red';
           
            if (
                    typeof(action) != 'undefined' && 
                    (
                        action.failureType == 'server' ||
                        action.failureType == 'load'
                    )
            ) {
                err = action.result.errorMsg;
            }
            
            Roo.bootstrap.MessageBox.alert('Error', err);
            return;
            
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
            xtype : 'TextArea',
            allowBlank : false,
            name : 'notes',
            placeholder : _this._strings['c3829f941b2eb369a4eb1788396c5556'] /* explain why you reject this investor */,
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
        name : 'id',
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap'
       },
       {
        xtype : 'Input',
        inputType : 'hidden',
        name : 'investor_id',
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap'
       },
       {
        xtype : 'Input',
        inputType : 'hidden',
        name : 'note_type',
        value : _this._strings['539d24367a77a2a7b50a66bf7c4e6cf0'] /* COMPLIANCE REJECTED */,
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap'
       }
      ]
     }
    ]
   }  );
 }
});
Roo.apply(Pman.Dialog.CobaInvestorComplianceReject, Pman.Dialog.CobaInvestorComplianceReject.prototype);
