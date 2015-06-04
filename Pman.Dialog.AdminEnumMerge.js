//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminEnumMerge = {

 _strings : {
  '0b3e4317865feb6f0224397600b7cafc' :"Merge Core Enum",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
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
    center : {
     '|xns' : 'Roo',
     titlebar : false,
     xns : Roo,
     xtype : 'LayoutRegion'
    },
    '|xns' : 'Roo',
    background : true,
    closable : false,
    collapsible : false,
    height : 150,
    modal : true,
    resizable : false,
    title : _this._strings['0b3e4317865feb6f0224397600b7cafc'],
    width : 400,
    xns : Roo,
    xtype : 'LayoutDialog',
    buttons : [
      {
       '|xns' : 'Roo',
       text : _this._strings['ea4788705e6873b424c65e91c2846b19'],
       xns : Roo,
       xtype : 'Button',
       listeners : {
        click : function() {
             _this.form.reset();
             _this.dialog.hide();
         }
       }
      },
{
       '|xns' : 'Roo',
       text : _this._strings['e0aa021e21dddbd6d8cecec71e9cf564'],
       xns : Roo,
       xtype : 'Button',
       listeners : {
        click : function() {
         
             var name =     _this.form.findField('name').getValue();
             name = name.toUpperCase().replace(/[^A-Z]+/g, '');
             if (!name.length) {
                 Roo.MessageBox.alert("Error","Please fill in a valid name");
                 return;
             }
             _this.form.findField('name').setValue(name);
          
             _this.form.doAction('submit');
             
         }
       }
      }
    ],
    items : [
     {
      '|xns' : 'Roo',
      background : true,
      fitToFrame : true,
      region : 'center',
      xns : Roo,
      xtype : 'ContentPanel',
      items : [
       {
        '|xns' : 'Roo.form',
        method : 'POST',
        style : 'margin: 5px',
        url : baseURL + '/Roo/core_enum.php',
        xns : Roo.form,
        xtype : 'Form',
        listeners : {
         actioncomplete : function (_self, action)
          {
            if (action.type == 'setdata') {
          
                 return;
              }
              if (action.type == 'load') {
                  _this.dialog.el.unmask();
                  return;
              }
              if (action.type == 'submit' ) {
                  _this.dialog.el.unmask();
                  _this.dialog.hide();
          
                  if (_this.callback) {
                     _this.callback.call(_this, action.result.data);
                  }
                  _this.form.reset();
              }
          },
         rendered : function (form)
          {
             _this.form = form;
          }
        },
        items : [
         {
          store : {
           proxy : {
            '|xns' : 'Roo.data',
            method : 'GET',
            url : baseURL + '/Roo/Core_enum.php',
            xns : Roo.data,
            xtype : 'HttpProxy'
           },
           reader : {
            '|xns' : 'Roo.data',
            fields : [
                {
                    "name":"name",
                    "type":"string"
                },
                {
                    "name":"display_name",
                    "type":"string"
                }
            ],
            id : 'id',
            root : 'data',
            totalProperty : 'total',
            xns : Roo.data,
            xtype : 'JsonReader'
           },
           '|xns' : 'Roo.data',
           remoteSort : true,
           sortInfo : { direction : 'ASC', field: 'id' },
           xns : Roo.data,
           xtype : 'Store',
           listeners : {
            beforeload : function (_self, o){
                 o.params = o.params || {};
                 
                 o.params.active = 1;
                 o.params.etype = 'EuroCham.Industry';
             }
           },
           items : [

           ]

          },
          '|xns' : 'Roo.form',
          alwaysQuery : true,
          displayField : 'display_name',
          editable : true,
          fieldLabel : 'Industry',
          forceSelection : true,
          hiddenName : 'industry_id',
          listWidth : 400,
          minChars : 2,
          name : 'industry_id_display_name',
          pageSize : 50,
          queryParam : 'query[search]',
          selectOnFocus : true,
          tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{display_name}</b> </div>',
          triggerAction : 'all',
          valueField : 'id',
          width : 300,
          xns : Roo.form,
          xtype : 'ComboBox',
          listeners : {
           add : function (combo)
            {
                Pman.Dialog.CoreEnum.show({
                    etype : 'EuroCham.Industry',
                    title : 'Add Industry'
                }, function(res){
                    combo.setFromData(res);
                })
            }
          },
          items : [

          ]

         },
         {
          '|xns' : 'Roo.form',
          name : 'id',
          xns : Roo.form,
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
