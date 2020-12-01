//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.CoreLanguagePick = {

 _strings : {
  '4994a8ffeba4ac3140beb89e8d41f174' :"Language",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  '052ca52fc8eb1bdff3e34de3fa735e35' :"Select a Language",
  'e0aa021e21dddbd6d8cecec71e9cf564' :"OK"
 },
 _named_strings : {
  'language_name_fieldLabel' : '4994a8ffeba4ac3140beb89e8d41f174' /* Language */ 
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
    xtype : 'LayoutDialog',
    closable : false,
    collapsible : false,
    height : 120,
    modal : true,
    resizable : false,
    title : _this._strings['052ca52fc8eb1bdff3e34de3fa735e35'] /* Select a Language */,
    width : 400,
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
            // do some checks?
             
            var data =  _this.form.getValues();
         
            if (!data.lang.length) {
            
                Roo.MessageBox.alert("Error", "Select language");
                return;
            
            }
            _this.dialog.hide();
                    
            var callbackData = data.lang;
           // Roo.log(_this.data);
            if(_this.data._with_name == true){
                callbackData = {'lang' : data.lang , 'lang_name' : _this.form.findField('lang').lastSelectionText};
            }
            
            _this.callback(callbackData);
            
        
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
        method : 'GET',
        style : 'margin:10px;',
        url : baseURL + '/Roo/INGORE.php',
        listeners : {
         actioncomplete : function(_self,action)
          {
              if (action.type == 'setdata') {
                 //_this.dialog.el.mask("Loading");
                 //this.load({ method: 'GET', params: { '_id' : _this.data.id }});
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
        xns : Roo.form,
        '|xns' : 'Roo.form',
        items  : [
         {
          xtype : 'ComboBox',
          allowBlank : false,
          alwaysQuery : true,
          displayField : 'title',
          editable : false,
          fieldLabel : _this._strings['4994a8ffeba4ac3140beb89e8d41f174'] /* Language */,
          hiddenName : 'lang',
          listWidth : 200,
          name : 'language_name',
          triggerAction : 'all',
          valueField : 'code',
          width : 200,
          xns : Roo.form,
          '|xns' : 'Roo.form',
          store : {
           xtype : 'Store',
           listeners : {
            beforeload : function (_self, o)
             {
                 o.params['!code'] = 'en'; // exclude english from the list (it's the default?)
             }
           },
           xns : Roo.data,
           '|xns' : 'Roo.data',
           proxy : {
            xtype : 'HttpProxy',
            method : 'GET',
            url : baseURL + '/Core/I18n/Lang',
            xns : Roo.data,
            '|xns' : 'Roo.data'
           },
           reader : {
            xtype : 'JsonReader',
            fields : [
                {
                    'name': 'code',
                    'type': 'string'
                },
                {
                    'name': 'title',
                    'type': 'string'
                }
            ],
            id : 'code',
            root : 'data',
            totalProperty : 'total',
            xns : Roo.data,
            '|xns' : 'Roo.data'
           }
          }
         }
        ]
       }
      ]
     }
    ]
   });
 }
};
