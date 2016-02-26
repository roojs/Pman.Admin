//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.PressReleasePreviewSend = {

 _strings : {
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  '94966d90747b97d1f0f206c98a8b1ac3' :"Send",
  '49ee3087348e8d44e1feda1917443987' :"Name",
  '643a860f992333b8600ea264aca7c4fc' :"Email Address",
  'c9f8da277cc33b904b2147a6d9c29ef5' :"Send Email"
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
    closable : true,
    collapsible : false,
    height : 180,
    modal : true,
    resizable : false,
    title : _this._strings['c9f8da277cc33b904b2147a6d9c29ef5'] /* Send Email */,
    width : 480,
    xns : Roo,
    '|xns' : 'Roo',
    xtype : 'LayoutDialog',
    center : {
     xns : Roo,
     '|xns' : 'Roo',
     xtype : 'LayoutRegion'
    },
    buttons : [
     {
      text : _this._strings['ea4788705e6873b424c65e91c2846b19'] /* Cancel */,
      xns : Roo,
      '|xns' : 'Roo',
      xtype : 'Button',
      listeners : {
       click : function (_self, e)
        {
        
            _this.dialog.hide();
        
        }
      }
     },
     {
      text : _this._strings['94966d90747b97d1f0f206c98a8b1ac3'] /* Send */,
      xns : Roo,
      '|xns' : 'Roo',
      xtype : 'Button',
      listeners : {
       click : function (_self, e)
        {
            if (!_this.form.isValid()) {
                Roo.MessageBox.alert("Error", "Please fill in all the required fields");
                return;
            } 
            var email = _this.form.findField('email').getValue();
            var name = _this.form.findField('firstname').getValue();
            if(email && name){
                new Pman.Request({
                    url : baseURL + '/PressRelease/View/' + _this.form.findField('id').getValue(),
                    method : 'GET',
                    params : {
                        _send : 1,
                        firstname : name,
                        rcpt : email
                    },
                    success : function()
                    {
                        Roo.MessageBox.alert("Notice", "Release set to "+name, function(){
                            _this.dialog.hide();
                        });
                    }
                });
            }
        
        }
      }
     }
    ],
    items  : [
     {
      region : 'center',
      xns : Roo,
      '|xns' : 'Roo',
      xtype : 'ContentPanel',
      items  : [
       {
        labelWidth : 100,
        method : 'POST',
        style : 'margin:10px;',
        xns : Roo.form,
        '|xns' : 'Roo.form',
        xtype : 'Form',
        listeners : {
         actioncomplete : function(_self,action)
          {
              if (action.type == 'setdata') {
                 
                  _this.form.findField('firstname').focus();
                 return;
              }
              if (action.type == 'load') {
                  _this.dialog.el.unmask();
                  return;
              }
              if (action.type =='submit') {
              
                  _this.dialog.el.unmask();
                  _this.dialog.hide();
              
                   if (_this.callback) {
                      _this.callback.call(_this, _this.form.getValues());
                      
                   }
                   _this.form.reset();
          
                   return;
              }
          },
         rendered : function (form)
          {
              _this.form= form;
          }
        },
        items  : [
         {
          allowBlank : false,
          fieldLabel : _this._strings['49ee3087348e8d44e1feda1917443987'] /* Name */,
          name : 'firstname',
          width : 300,
          xns : Roo.form,
          '|xns' : 'Roo.form',
          xtype : 'TextField',
          listeners : {
           specialkey : function (_self, e)
            {
                if (e.keyCode == 27) {
                    _this.dialog.hide();
                }
            }
          }
         },
         {
          allowBlank : false,
          fieldLabel : _this._strings['643a860f992333b8600ea264aca7c4fc'] /* Email Address */,
          name : 'email',
          vtype : 'email',
          width : 300,
          xns : Roo.form,
          '|xns' : 'Roo.form',
          xtype : 'TextField',
          listeners : {
           specialkey : function (_self, e)
            {
                if (e.keyCode == 27) {
                    _this.dialog.hide();
                }
            }
          }
         },
         {
          name : 'id',
          xns : Roo.form,
          '|xns' : 'Roo.form',
          xtype : 'Hidden'
         }
        ]
       }
      ]
     }
    ]
   });
 }
};
