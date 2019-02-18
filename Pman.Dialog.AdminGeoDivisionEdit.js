//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminGeoDivisionEdit = {

 _strings : {
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  'd469fd7a8d8939b7abe793469d7375da' :"Add / Edit Province",
  '49ee3087348e8d44e1feda1917443987' :"Name",
  'c9cc8cce247e49bae79f15173ce97354' :"Save"
 },
 _named_strings : {
  'name_fieldLabel' : '49ee3087348e8d44e1feda1917443987' /* Name */ 
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
    height : 400,
    modal : true,
    resizable : false,
    title : _this._strings['d469fd7a8d8939b7abe793469d7375da'] /* Add / Edit Province */,
    width : 600,
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
      text : _this._strings['c9cc8cce247e49bae79f15173ce97354'] /* Save */,
      listeners : {
       click : function (_self, e)
        {
            // do some checks?
             
             this.url = baseURL + '/Roo/' + _this.data._table;
            _this.dialog.el.mask("Saving");
            _this.form.doAction("submit");
        
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
        labelWidth : 50,
        method : 'POST',
        style : 'margin:10px;',
        url : baseURL + '/Roo/core_company_type.php',
        listeners : {
         actioncomplete : function(_self,action)
          {
              if (action.type == 'setdata') {
                 //_this.dialog.el.mask("Loading");
                 this.url = baseURL + '/Roo/' + _this.data._table;
                 _this.dialog.setTitle(_this.data._title);
                 this.load({ 
                      method: 'GET', 
                      params: { '_id' : _this.data.id },
                      url : this.url
                  });
                 return;
              }
              if (action.type == 'load') {
                  _this.dialog.el.unmask();
                  _this.form.findField('name').focus();
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
          xtype : 'TextField',
          fieldLabel : _this._strings['49ee3087348e8d44e1feda1917443987'] /* Name */,
          name : 'name',
          width : 270,
          listeners : {
           specialkey : function (_self, e)
            {
                if (e.getKey() == 13) {
                     _this.dialog.el.mask("Saving");
                     _this.form.doAction("submit");
                }
            }
          },
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'Hidden',
          name : 'id',
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
