//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminTranslateTemplates = {

 _strings : {
  '0a52da7a03a6de3beefe54f8c03ad80d' :"Original",
  'd41d8cd98f00b204e9800998ecf8427e' :"",
  '6dd08874f83507e9c7b23f1a46b7fa7c' :"Translation",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  '305253475cc868103805068f45a90468' :"Edit Translation",
  'e0aa021e21dddbd6d8cecec71e9cf564' :"OK"
 },
 _named_strings : {
  'src_id_txt_fieldLabel' : '0a52da7a03a6de3beefe54f8c03ad80d' /* Original */ ,
  'src_id_txt_value' : 'd41d8cd98f00b204e9800998ecf8427e' /*  */ ,
  'txt_fieldLabel' : '6dd08874f83507e9c7b23f1a46b7fa7c' /* Translation */ 
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
    background : true,
    closable : false,
    collapsible : false,
    height : 450,
    modal : true,
    resizable : true,
    title : _this._strings['305253475cc868103805068f45a90468'] /* Edit Translation */,
    width : 800,
    xns : Roo,
    '|xns' : 'Roo',
    center : {
     xtype : 'LayoutRegion',
     title : "Note: If the original text contains template variables like  {TEMPLATE_VARIABLE} <br/>Be careful to retain them otherwise the translation may not work",
     titlebar : true,
     xns : Roo,
     '|xns' : 'Roo'
    },
    buttons : [
     {
      xtype : 'Button',
      text : _this._strings['ea4788705e6873b424c65e91c2846b19'] /* Cancel */,
      listeners : {
       click : function() {
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
       click : function() {
            _this.dialog.el.mask("Saving");
            //_this.form.doAction('submit');
            _this.dialog.hide();
            if (_this.callback) {
                _this.callback.call(_this, _this.form.getValues());
            }
            _this.dialog.el.unmask();
            _this.form.reset();
        }
      },
      xns : Roo,
      '|xns' : 'Roo'
     }
    ],
    items  : [
     {
      xtype : 'ContentPanel',
      background : true,
      fitToFrame : true,
      region : 'center',
      xns : Roo,
      '|xns' : 'Roo',
      items  : [
       {
        xtype : 'Form',
        method : 'POST',
        style : 'margin: 5px',
        listeners : {
         actioncomplete : function (_self, action)
          {
                
              if (action.type == 'setdata') {
                 //_this.dialog.el.mask("Loading");
                 
                 Roo.log(_this.data);
                 return;
              }
              if (action.type == 'load') {
                   return;
              }
              if (action.type =='submit') {
                  _this.dialog.hide();
                  if (_this.callback) {
                      _this.callback.call(_this, _this.form.getValues());
                  }
                  _this.form.reset();
                  return;
              }
          },
         actionfailed : function (_self, action)
          {
              _this.dialog.el.unmask();
              Pman.standardActionFailed(_self, action);
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
          xtype : 'Row',
          labelAlign : 'top',
          xns : Roo.form,
          '|xns' : 'Roo.form',
          items  : [
           {
            xtype : 'TextArea',
            fieldLabel : _this._strings['0a52da7a03a6de3beefe54f8c03ad80d'] /* Original */,
            height : 150,
            name : 'src_id_txt',
            readOnly : true,
            value : _this._strings['d41d8cd98f00b204e9800998ecf8427e'] /*  */,
            width : 750,
            xns : Roo.form,
            '|xns' : 'Roo.form'
           }
          ]
         },
         {
          xtype : 'Row',
          labelAlign : 'top',
          xns : Roo.form,
          '|xns' : 'Roo.form',
          items  : [
           {
            xtype : 'TextArea',
            fieldLabel : _this._strings['6dd08874f83507e9c7b23f1a46b7fa7c'] /* Translation */,
            height : 150,
            name : 'txt',
            width : 750,
            xns : Roo.form,
            '|xns' : 'Roo.form'
           }
          ]
         }
        ]
       }
      ]
     }
    ]
   });
 }
};
