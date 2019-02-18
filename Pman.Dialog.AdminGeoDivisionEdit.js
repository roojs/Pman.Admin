//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminGeoDivisionEdit = {

 _strings : {
  '59716c97497eb9694541f7c3d37b1a4d' :"Country",
  '3c1df4260ce594cb5594696461087f2f' :"Select Country",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  '9675747b5ab12d05f18518761e68a533' :"Select Companies",
  'd469fd7a8d8939b7abe793469d7375da' :"Add / Edit Province",
  '49ee3087348e8d44e1feda1917443987' :"Name",
  'ca0dbad92a874b2f69b549293387925e' :"Code",
  'c9cc8cce247e49bae79f15173ce97354' :"Save"
 },
 _named_strings : {
  'country_name_qtip' : '9675747b5ab12d05f18518761e68a533' /* Select Companies */ ,
  'country_name_emptyText' : '3c1df4260ce594cb5594696461087f2f' /* Select Country */ ,
  'code_fieldLabel' : 'ca0dbad92a874b2f69b549293387925e' /* Code */ ,
  'name_fieldLabel' : '49ee3087348e8d44e1feda1917443987' /* Name */ ,
  'country_name_loadingText' : '1243daf593fa297e07ab03bf06d925af' /* Searching... */ ,
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
          fieldLabel : _this._strings['ca0dbad92a874b2f69b549293387925e'] /* Code */,
          name : 'code',
          width : 200,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
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
          qtip : _this._strings['9675747b5ab12d05f18518761e68a533'] /* Select Companies */,
          queryParam : 'query[code]',
          selectOnFocus : true,
          tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{name}</b> </div>',
          triggerAction : 'all',
          typeAhead : true,
          valueField : 'id',
          width : 300,
          xns : Roo.form,
          '|xns' : 'Roo.form',
          store : {
           xtype : 'Store',
           remoteSort : true,
           sortInfo : { direction : 'ASC', field: 'name' },
           listeners : {
            beforeload : function (_self, o){
                 o.params = o.params || {};
                 // set more here
                 o.params.comptype= 'CUSTOMER';
             }
           },
           xns : Roo.data,
           '|xns' : 'Roo.data',
           proxy : {
            xtype : 'HttpProxy',
            method : 'GET',
            url : baseURL + '/Roo/core_company.php',
            xns : Roo.data,
            '|xns' : 'Roo.data'
           },
           reader : {
            xtype : 'JsonReader',
            fields : [{"name":"id","type":"int"},{"name":"code","type":"string"}],
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
