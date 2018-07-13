//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminCompanyMerge = {

 _strings : {
  'bf8691517ce00a09186a05cd65863091' :"Select Item to Merge With",
  'd928853fb4dfe148595cef31a72d52f5' :"Merge Company",
  '03e956f1dca2b4d525df03cb1899cb6f' :"Merge with",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  '68be4837f6c739877233e527a996dd00' :"Merge",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel"
 },
 _named_strings : {
  '_merge_id_name_emptyText' : 'bf8691517ce00a09186a05cd65863091' /* Select Item to Merge With */ ,
  '_merge_id_name_loadingText' : '1243daf593fa297e07ab03bf06d925af' /* Searching... */ ,
  '_merge_id_name_qtip' : 'bf8691517ce00a09186a05cd65863091' /* Select Item to Merge With */ ,
  '_merge_id_name_fieldLabel' : '03e956f1dca2b4d525df03cb1899cb6f' /* Merge with */ 
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
    title : _this._strings['d928853fb4dfe148595cef31a72d52f5'] /* Merge Company */,
    width : 400,
    listeners : {
     show : function (_self)
      {
          
      }
    },
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
      text : _this._strings['68be4837f6c739877233e527a996dd00'] /* Merge */,
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
        method : 'POST',
        style : 'margin: 10px;',
        url : baseURL + '/Roo/Core_company.php',
        listeners : {
         actioncomplete : function (_self, action)
          {
          
             if (action.type =='submit') {
                 
                   _this.dialog.hide();
                 
                  if (_this.callback) {
                     _this.callback.call(_this, _this.form.getValues());
                  }
                  _this.form.reset();
                  return;
              }
              
              if (action.type == 'setdata') {
                  
                  _this.dialog.setTitle("Delete selected " + _this.data.name + " and merge data with");
                   
                 return;
              }
              
          },
         actionfailed : function (_self, action)
          {
           
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
          xtype : 'ComboBox',
          allowBlank : false,
          alwaysQuery : true,
          displayField : 'name',
          emptyText : _this._strings['bf8691517ce00a09186a05cd65863091'] /* Select Item to Merge With */,
          fieldLabel : _this._strings['03e956f1dca2b4d525df03cb1899cb6f'] /* Merge with */,
          forceSelection : true,
          hiddenName : '_merge_id',
          listWidth : 400,
          loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
          minChars : 2,
          name : '_merge_id_name',
          pageSize : 25,
          qtip : _this._strings['bf8691517ce00a09186a05cd65863091'] /* Select Item to Merge With */,
          queryParam : 'search[name]',
          selectOnFocus : true,
          tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{name}</b></div>',
          triggerAction : 'all',
          typeAhead : true,
          valueField : 'id',
          width : 250,
          xns : Roo.form,
          '|xns' : 'Roo.form',
          store : {
           xtype : 'Store',
           remoteSort : true,
           sortInfo : { direction : 'ASC', field: 'name' },
           listeners : {
            beforeload : function (_self, o){
                 o.params = o.params || {};
                 
                 o.params['!id'] = _this.form.findField('id').getValue();
             }
           },
           xns : Roo.data,
           '|xns' : 'Roo.data',
           proxy : {
            xtype : 'HttpProxy',
            method : 'GET',
            url : baseURL + '/Roo/Core_company',
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
