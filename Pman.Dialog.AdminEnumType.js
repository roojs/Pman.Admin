//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminEnumType = {

 _strings : {
  '7dce122004969d56ae2e0245cb754d35' :"Edit",
  'b48968e1c912da07df5e8d6d246291ec' :"Display Name",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  '49ee3087348e8d44e1feda1917443987' :"Name",
  'c9cc8cce247e49bae79f15173ce97354' :"Save"
 },
 _named_strings : {
  'display_name_fieldLabel' : 'b48968e1c912da07df5e8d6d246291ec' /* Display Name */ ,
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
    height : 160,
    modal : true,
    resizable : false,
    title : _this._strings['7dce122004969d56ae2e0245cb754d35'] /* Edit */,
    width : 480,
    xns : Roo,
    '|xns' : 'Roo',
    center
 : {
     xtype : 'LayoutRegion',
     xns : Roo,
     '|xns' : 'Roo'
    },
    buttons : [
     {
      xtype : 'Button',
      text : _this._strings['c9cc8cce247e49bae79f15173ce97354'] /* Save */,
      listeners : {
       click : function (_self, e)
        {
            //this.url = baseURL + '/Roo/Core_enum.php';
            //_this.dialog.el.mask("Saving");
            _this.form.doAction("submit");
        }
      },
      xns : Roo,
      '|xns' : 'Roo'
     },
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
        url : baseURL + '/Roo/Core_enum',
        listeners : {
         actioncomplete : function (_self, action)
          {
              if(action.type == 'submit'){
                  _this.dialog.hide();
                  
                  if(_this.callback){
                      _this.callback.call(_this, _this.form.getValues());
                  }
                  return
              }
          },
         rendered : function (form)
          {
              _this.form = this;
          }
        },
        xns : Roo.form,
        '|xns' : 'Roo.form',
        items  : [
         {
          xtype : 'TextField',
          allowBlank : false,
          fieldLabel : _this._strings['49ee3087348e8d44e1feda1917443987'] /* Name */,
          name : 'name',
          width : 270,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'Hidden',
          name : 'id',
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'Hidden',
          name : 'etype',
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'TextField',
          fieldLabel : _this._strings['b48968e1c912da07df5e8d6d246291ec'] /* Display Name */,
          name : 'display_name',
          width : 270,
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
