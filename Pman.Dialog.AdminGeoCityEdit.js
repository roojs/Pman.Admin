//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminGeoCityEdit = {

 _strings : {
  '59716c97497eb9694541f7c3d37b1a4d' :"Country",
  '3c1df4260ce594cb5594696461087f2f' :"Select Country",
  '43ccafccb532cc57c20bc05a36aad7b7' :"Add / Edit City",
  '4a39a1ff7adda1ac731be5bf500d0812' :"Select Division",
  '45c10605e0a492fbe7a3eac258cd1e81' :"Time Zone",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  '25f75488c91cb6c3bab92672e479619f' :"Postal Code",
  '49ee3087348e8d44e1feda1917443987' :"Name",
  'c9cc8cce247e49bae79f15173ce97354' :"Save",
  '3025cdaab2deb0bb2cd642449e570833' :"Division"
 },
 _named_strings : {
  'country_name_qtip' : '3c1df4260ce594cb5594696461087f2f' /* Select Country */ ,
  'division_id_name_qtip' : '4a39a1ff7adda1ac731be5bf500d0812' /* Select Division */ ,
  'time_zone_fieldLabel' : '45c10605e0a492fbe7a3eac258cd1e81' /* Time Zone */ ,
  'country_name_emptyText' : '3c1df4260ce594cb5594696461087f2f' /* Select Country */ ,
  'postal_code_fieldLabel' : '25f75488c91cb6c3bab92672e479619f' /* Postal Code */ ,
  'name_fieldLabel' : '49ee3087348e8d44e1feda1917443987' /* Name */ ,
  'country_name_loadingText' : '1243daf593fa297e07ab03bf06d925af' /* Searching... */ ,
  'division_id_name_emptyText' : '4a39a1ff7adda1ac731be5bf500d0812' /* Select Division */ ,
  'division_id_name_fieldLabel' : '3025cdaab2deb0bb2cd642449e570833' /* Division */ ,
  'division_id_name_loadingText' : '1243daf593fa297e07ab03bf06d925af' /* Searching... */ ,
  'country_name_fieldLabel' : '59716c97497eb9694541f7c3d37b1a4d' /* Country */ 
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
    height : 250,
    modal : true,
    resizable : false,
    title : _this._strings['43ccafccb532cc57c20bc05a36aad7b7'] /* Add / Edit City */,
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
      text : _this._strings['c9cc8cce247e49bae79f15173ce97354'] /* Save */,
      listeners : {
       click : function (_self, e)
        {
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
        labelWidth : 100,
        method : 'POST',
        style : 'margin:10px;',
        url : baseURL + '/Roo/geoip_city.php',
        listeners : {
         actioncomplete : function(_self, action)
          {
              if (action.type == 'setdata') {
                  
                  if(_this.data.id) {
                      this.load({ method: 'GET', params: { '_id' : _this.data.id }});
                  }
                  return;
              }
              if (action.type == 'load') {
                  
                  _this.dialog.el.unmask();
                  
                  _this.data = action.result.data;
                  
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
          allowBlank : false,
          fieldLabel : _this._strings['49ee3087348e8d44e1feda1917443987'] /* Name */,
          name : 'name',
          width : 200,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'TextField',
          fieldLabel : _this._strings['25f75488c91cb6c3bab92672e479619f'] /* Postal Code */,
          name : 'postal_code',
          width : 200,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'TextField',
          fieldLabel : _this._strings['45c10605e0a492fbe7a3eac258cd1e81'] /* Time Zone */,
          name : 'time_zone',
          width : 200,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'ComboBox',
          allowBlank : false,
          alwaysQuery : true,
          displayField : 'lval',
          editable : true,
          emptyText : _this._strings['3c1df4260ce594cb5594696461087f2f'] /* Select Country */,
          fieldLabel : _this._strings['59716c97497eb9694541f7c3d37b1a4d'] /* Country */,
          forceSelection : true,
          hiddenName : 'country',
          listWidth : 400,
          loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
          minChars : 2,
          name : 'country_name',
          pageSize : 20,
          qtip : _this._strings['3c1df4260ce594cb5594696461087f2f'] /* Select Country */,
          queryParam : 'query[name]',
          selectOnFocus : true,
          tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{lval}</b> </div>',
          triggerAction : 'all',
          typeAhead : true,
          valueField : 'lkey',
          width : 200,
          xns : Roo.form,
          '|xns' : 'Roo.form',
          store : {
           xtype : 'Store',
           remoteSort : true,
           sortInfo : { direction : 'ASC', field: 'lval' },
           listeners : {
            beforeload : function (_self, o){
                 o.params = o.params || {};
                 // set more here
                 o.params.ltype = 'c',
                 o.params.inlang = 'en';
                 o.is_active = 1;
             }
           },
           xns : Roo.data,
           '|xns' : 'Roo.data',
           proxy : {
            xtype : 'HttpProxy',
            method : 'GET',
            url : baseURL + '/Roo/i18n.php',
            xns : Roo.data,
            '|xns' : 'Roo.data'
           },
           reader : {
            xtype : 'JsonReader',
            fields : [
                {
                    "name":"id",
                    "type":"int"
                },
                {
                    "name":"code",
                    "type":"string"
                },
                {
                    "name":"name",
                    "type":"string"
                },
                {
                    "name":"country",
                    "type":"string"
                },
                {
                    "name":"country_name",
                    "type":"string"
                }
            ],
            id : 'id',
            root : 'data',
            totalProperty : 'total',
            xns : Roo.data,
            '|xns' : 'Roo.data'
           }
          }
         },
         {
          xtype : 'ComboBox',
          alwaysQuery : true,
          displayField : 'name',
          editable : true,
          emptyText : _this._strings['4a39a1ff7adda1ac731be5bf500d0812'] /* Select Division */,
          fieldLabel : _this._strings['3025cdaab2deb0bb2cd642449e570833'] /* Division */,
          forceSelection : true,
          hiddenName : 'division_id',
          listWidth : 400,
          loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
          minChars : 2,
          name : 'division_id_name',
          pageSize : 20,
          qtip : _this._strings['4a39a1ff7adda1ac731be5bf500d0812'] /* Select Division */,
          queryParam : 'query[name]',
          selectOnFocus : true,
          tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{name}</b> </div>',
          triggerAction : 'all',
          typeAhead : true,
          valueField : 'id',
          width : 200,
          listeners : {
           beforequery : function (combo, query, forceAll, cancel, e)
            {
                var country = _this.form.findField('country').getValue();
                
                if(!country.length) {
                    Roo.MessageBox.alert('Error', 'Please select a country');
                    return false;
                }
            }
          },
          xns : Roo.form,
          '|xns' : 'Roo.form',
          store : {
           xtype : 'Store',
           remoteSort : true,
           sortInfo : { direction : 'ASC', field: 'name' },
           listeners : {
            beforeload : function (_self, o){
                 o.params = o.params || {};
                 
                 var country = _this.form.findField('country').getValue();
                 
                 if(!country.length) {
                     return false;
                 }
                 
                 o.params.country = country;
             }
           },
           xns : Roo.data,
           '|xns' : 'Roo.data',
           proxy : {
            xtype : 'HttpProxy',
            method : 'GET',
            url : baseURL + '/Roo/geoip_division.php',
            xns : Roo.data,
            '|xns' : 'Roo.data'
           },
           reader : {
            xtype : 'JsonReader',
            fields : [
                {
                    "name":"id",
                    "type":"int"
                },
                {
                    "name":"name",
                    "type":"string"
                },
                {
                    "name":"country",
                    "type":"string"
                },
                {
                    "name":"country_name",
                    "type":"string"
                }
            ],
            id : 'id',
            root : 'data',
            totalProperty : 'total',
            xns : Roo.data,
            '|xns' : 'Roo.data'
           }
          }
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
