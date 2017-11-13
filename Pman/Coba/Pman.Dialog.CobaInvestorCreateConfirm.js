//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.CobaInvestorCreateConfirm= function() {}
Roo.apply(Pman.Dialog.CobaInvestorCreateConfirm.prototype, {

 _strings : {
  '230a38ecd64762d2d7dac46233a7b148' :"Investor has been Created",
  '8d9fd121bd6d00163322d9902fe5ce98' :"Create another",
  '62e680151024df75579daae4662e0724' :"Start entering Accreditation",
  'f92965e2c8a7afb3c1b9a5c09a263636' :"Done"
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
    style : 'align-items: center;',
    title : _this._strings['230a38ecd64762d2d7dac46233a7b148'] /* Investor has been Created */,
    listeners : {
     render : function (_self)
      {
          _this.modal = _self;
      }
    },
    xns : Roo.bootstrap,
    '|xns' : 'Roo.bootstrap',
    buttons : [
     {
      xtype : 'Button',
      html : _this._strings['f92965e2c8a7afb3c1b9a5c09a263636'] /* Done */,
      style : 'float: right; margin:10px; width:150px',
      weight : 'primary',
      listeners : {
       click : function (_self, e)
        {
            _this.dialog.hide();
            Pman.Dialog.CobaInvestorCreate.dialog.hide(); 
        }
      },
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap'
     }
    ],
    items  : [
     {
      xtype : 'Container',
      style : 'width: inherit; margin:10px; text-align:center;',
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap',
      items  : [
       {
        xtype : 'Button',
        html : _this._strings['8d9fd121bd6d00163322d9902fe5ce98'] /* Create another */,
        style : 'width:300px;',
        weight : 'primary',
        listeners : {
         click : function (_self, e)
          {
              Pman.Dialog.CobaInvestorCreate.show({});
              _this.dialog.hide();
          }
        },
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap'
       }
      ]
     },
     {
      xtype : 'Container',
      style : 'width: inherit; margin:10px; text-align:center',
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap',
      items  : [
       {
        xtype : 'Button',
        html : _this._strings['62e680151024df75579daae4662e0724'] /* Start entering Accreditation */,
        style : 'width:300px;',
        weight : 'primary',
        listeners : {
         click : function (_self, e)
          {
              _this.modal.el.mask('Sending');       
              var investor_id = _this.investor_id.getValue();
              var account_type = _this.account_type.getValue();
              new Pman.Request({
                  url: baseURL + '/Coba/ModxSession',
                  method: 'GET',
                  params: {
                      investor_id: investor_id,
                      account_type: account_type
                  },
                  success:  function(res)  {  // check successfull...
                      if (res.success) { // error!
                          window.onbeforeunload  =null;
                          window.onunload  = function () {_this.modal.el.unmask()};
                          if(res.data) {
                              var win = window.open(res.data, '_self');                          
                          }
                      }
                  },
                  failure : function(res)
                  {
                      _this.modal.el.unmask();           
                      Roo.bootstrap.MessageBox.alert("Error",  res.errorMsg);
                  }
              });
          }
        },
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap'
       },
       {
        xtype : 'Form',
        listeners : {
         actioncomplete : function (_self, action)
          {
              if (action.type == 'setdata') {
                 if(action.data)
                 {
                      _this.investor_id.setValue(action.data.investor_id);
                      _this.account_type.setValue(action.data.account_type.toLowerCase());
                 }
                  return;
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
          xtype : 'Input',
          inputType : 'hidden',
          name : 'investor_id',
          listeners : {
           render : function (_self)
            {
                _this.investor_id = _self;
            }
          },
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap'
         },
         {
          xtype : 'Input',
          inputType : 'hidden',
          name : 'account_type',
          listeners : {
           render : function (_self)
            {
            _this.account_type = _self;
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
   }  );
 }
});
Roo.apply(Pman.Dialog.CobaInvestorCreateConfirm, Pman.Dialog.CobaInvestorCreateConfirm.prototype);
