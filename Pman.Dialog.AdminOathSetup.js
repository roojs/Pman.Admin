//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminOathSetup = {

 _strings : {
  '1943f13897669d8439b0d6a38061c027' :"User will use email",
  'd41d8cd98f00b204e9800998ecf8427e' :"",
  '128daf663aef0df3021226ec42d5a69a' :"Install Google Authenticator and scan this code so you can generate numbers. You can select below to use email.",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  '8e69929e72c74a799c61bcd9f2d926c7' :"Set up two-factor authentication",
  'c9cc8cce247e49bae79f15173ce97354' :"Save"
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
    height : 570,
    modal : true,
    title : _this._strings['8e69929e72c74a799c61bcd9f2d926c7'] /* Set up two-factor authentication */,
    width : 420,
    listeners : {
     hide : function ()
      {
          if (_this.callback) {
              _this.callback.call(_this, _this.enabled);
          }
      },
     show : function ()
      {
          _this.enabled = false;
          new Pman.Request({
              url: baseURL + '/Roo/core_person',
              method: 'GET',
              mask: 'Please wait',
              params: {
                  _to_qr_code: 1,
                  id: _this.data.id
              },
              success: function(res) {
                  _this.qr.el.update('<img src="' + res.data.image + '" style="width:360px;height:360px;">');
              }
          });
      }
    },
    xns : Roo,
    '|xns' : 'Roo',
    center : {
     xtype : 'Region',
     xns : Roo.layout,
     '|xns' : 'Roo.layout'
    },
    buttons : [
     {
      xtype : 'Button',
      text : _this._strings['1943f13897669d8439b0d6a38061c027'] /* User will use email */,
      listeners : {
       click : function ()
        {
            new Pman.Request({
                url: baseURL + '/Roo/core_person',
                method: 'GET',
                mask: 'Please wait',
                params: {
                    force_oath_key_store: 1,
                    id: _this.data.id
                },
                success: function() {
                    _this.enabled = true;
                    _this.dialog.hide();
                }
            });
        }
      },
      xns : Roo,
      '|xns' : 'Roo'
     },
     {
      xtype : 'Button',
      text : _this._strings['ea4788705e6873b424c65e91c2846b19'] /* Cancel */,
      listeners : {
       click : function ()
        {
            new Pman.Request({
                url: baseURL + '/Roo/core_person',
                method: 'GET',
                params: {
                    oath_key_discard: 1,
                    id: _this.data.id
                },
                success: function() {
                    _this.enabled = false;
                    _this.dialog.hide();
                }
            });
        }
      },
      xns : Roo,
      '|xns' : 'Roo'
     },
     {
      xtype : 'Button',
      text : _this._strings['c9cc8cce247e49bae79f15173ce97354'] /* Save */,
      listeners : {
       click : function ()
        {
            Roo.MessageBox.prompt('Code', 'Enter the code from the authenticator app.', function(btn, text) {
                if (btn != 'ok' || !text) {
                    return;
                }
                new Pman.Request({
                    url: baseURL + '/Roo/core_person',
                    method: 'GET',
                    mask: 'Please wait',
                    params: {
                        two_factor_auth_code: text,
                        id: _this.data.id
                    },
                    success: function() {
                        _this.enabled = true;
                        _this.dialog.hide();
                    },
                    failure: function() {
                        Roo.MessageBox.alert('Error', 'That code did not match. Enter the current code from the app.');
                    }
                });
            });
        }
      },
      xns : Roo,
      '|xns' : 'Roo'
     }
    ],
    items  : [
     {
      xtype : 'Content',
      autoCreate : true,
      fitToFrame : true,
      region : 'center',
      style : 'margin: 10px',
      xns : Roo.panel,
      '|xns' : 'Roo.panel',
      items  : [
       {
        xtype : 'Form',
        listeners : {
         rendered : function (form)
          {
              _this.form = form;
          }
        },
        xns : Roo.form,
        '|xns' : 'Roo.form',
        items  : [
         {
          xtype : 'TextItem',
          html : _this._strings['d41d8cd98f00b204e9800998ecf8427e'] /*  */,
          listeners : {
           render : function ()
            {
                _this.qr = this;
            }
          },
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'TextItem',
          html : _this._strings['128daf663aef0df3021226ec42d5a69a'] /* Install Google Authenticator and scan this code so you can generate numbers. You can select below to use email. */,
          style : 'margin-top: 8px;',
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
