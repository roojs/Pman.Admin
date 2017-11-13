//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.CobaInvestorSearch= function() {}
Roo.apply(Pman.Dialog.CobaInvestorSearch.prototype, {

 _strings : {
  '77587239bf4c54ea493c7033e1dbf636' :"Last Name",
  '13348442cc6a27032d2b4aa28b75a5d3' :"Search",
  'e5676ba19f12f141c9d199c36ee5fde6' :"please select the fund related to the investor",
  'bcc254b55c4a1babdf1dcb82c207506b' :"Phone",
  '0715d4a63b8542504b1b1b2af082240e' :"Search Investor",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  'ae9e6ac49d4f451b1ebf440619f595b5' :"please select the type of the investor",
  'c1098dd48f0fb20eeea79235055d02ca' :"Fund",
  'a1fa27779242b4902f7ae3bdd5c6d508' :"Type",
  'bc910f8bdf70f29374f496f05be0330c' :"First Name",
  'e456949630edb405fba2217ddeef7f3c' :"Primary contact email"
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
    title : _this._strings['0715d4a63b8542504b1b1b2af082240e'] /* Search Investor */,
    listeners : {
     render : function (_self)
      {
          _this.option = {};
          _this.option.params = {};
      }
    },
    xns : Roo.bootstrap,
    '|xns' : 'Roo.bootstrap',
    buttons : [
     {
      xtype : 'Button',
      html : _this._strings['ea4788705e6873b424c65e91c2846b19'] /* Cancel */,
      style : 'float: right; margin: 10px;',
      weight : 'primary',
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
      html : _this._strings['13348442cc6a27032d2b4aa28b75a5d3'] /* Search */,
      style : 'float: right; margin: 10px;',
      weight : 'primary',
      listeners : {
       click : function (_self, e)
        {
            _this.option = {};
            _this.option.params = {};
            
            var fund_name = _this.form.findField('fund_name').getValue();
            var email = _this.form.findField('email').getValue();
            var account_type = _this.form.findField('type').getValue();  
            var firstname = _this.form.findField('firstname').getValue();  
            var lastname = _this.form.findField('lastname').getValue();  
            var phone = _this.form.findField('phone').getValue();  
            
            if(fund_name!=''){
                _this.option.params.fund_name = fund_name;
            }
        
            if(email!=''){
                _this.option.params.email = email;
            }
        
            if(account_type!=''){
                _this.option.params.account_type = account_type;
            }
        
            if(phone!=''){
                _this.option.params.phone = phone;
            }
        
            if(firstname!=''){
                _this.option.params.firstname = firstname;
            }
        
        
            if(lastname!=''){
                _this.option.params.lastname = lastname;
            }
        
        
        
            if (_this.callback) {
                _this.callback.call(this, _this.option);                
                console.log(_this.option);
           }
          
            _this.dialog.hide({});
        }
      },
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap'
     }
    ],
    items  : [
     {
      xtype : 'Form',
      listeners : {
       render : function (_self)
        {
            _this.form = _self;
        },
       show : function (_self)
        {
            if(_this.fund_name) {
                _this.fund_name.store.load({});
            }
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
            allowBlank : true,
            displayField : 'value',
            editable : false,
            fieldLabel : _this._strings['a1fa27779242b4902f7ae3bdd5c6d508'] /* Type */,
            labelAlign : 'top',
            name : 'type',
            placeholder : _this._strings['ae9e6ac49d4f451b1ebf440619f595b5'] /* please select the type of the investor */,
            triggerAction : 'all',
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
            allowBlank : true,
            displayField : 'name',
            editable : false,
            fieldLabel : _this._strings['c1098dd48f0fb20eeea79235055d02ca'] /* Fund */,
            labelAlign : 'top',
            name : 'fund_name',
            placeholder : _this._strings['e5676ba19f12f141c9d199c36ee5fde6'] /* please select the fund related to the investor */,
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
             xns : Roo.data,
             '|xns' : 'Roo.data',
             proxy : {
              xtype : 'HttpProxy',
              method : 'GET',
              url : baseURL + '/Roo/Modx_accountmgmts',
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
            xtype : 'Input',
            allowBlank : true,
            fieldLabel : _this._strings['e456949630edb405fba2217ddeef7f3c'] /* Primary contact email */,
            labelAlign : 'top',
            name : 'email',
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
            allowBlank : true,
            fieldLabel : _this._strings['bc910f8bdf70f29374f496f05be0330c'] /* First Name */,
            labelAlign : 'top',
            name : 'firstname',
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
            allowBlank : true,
            fieldLabel : _this._strings['77587239bf4c54ea493c7033e1dbf636'] /* Last Name */,
            labelAlign : 'top',
            name : 'lastname',
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
            allowBlank : true,
            fieldLabel : _this._strings['bcc254b55c4a1babdf1dcb82c207506b'] /* Phone */,
            labelAlign : 'top',
            name : 'phone',
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
Roo.apply(Pman.Dialog.CobaInvestorSearch, Pman.Dialog.CobaInvestorSearch.prototype);
