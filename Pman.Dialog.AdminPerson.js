//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminPerson = {

 _strings : {
  'ce8ae9da5b7cd6c3df2929543a9af92d' :"Email",
  '2b0d7f748b64304e6657207cb03cd8f2' :"Edit / Create Staff Details",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  'bcc254b55c4a1babdf1dcb82c207506b' :"Phone",
  'be5f40c0d2692cf4e9f8be8d389737a5' :"Department / Office",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  'df814135652a5a308fea15bff37ea284' :"Office",
  'c373dd4bd4ba0b5d3e0c7522c5629880' :"Select Office",
  '49ee3087348e8d44e1feda1917443987' :"Name",
  'bbbabdbe1b262f75d99d62880b953be1' :"Role",
  'c9cc8cce247e49bae79f15173ce97354' :"Save",
  '9810aa2b9f44401be4bf73188ef2b67d' :"Fax"
 },
 _named_strings : {
  'role_fieldLabel' : 'bbbabdbe1b262f75d99d62880b953be1' /* Role */ ,
  'fax_fieldLabel' : '9810aa2b9f44401be4bf73188ef2b67d' /* Fax */ ,
  'office_id_name_emptyText' : 'be5f40c0d2692cf4e9f8be8d389737a5' /* Department / Office */ ,
  'name_fieldLabel' : '49ee3087348e8d44e1feda1917443987' /* Name */ ,
  'phone_fieldLabel' : 'bcc254b55c4a1babdf1dcb82c207506b' /* Phone */ ,
  'office_id_name_fieldLabel' : 'df814135652a5a308fea15bff37ea284' /* Office */ ,
  'office_id_name_loadingText' : '1243daf593fa297e07ab03bf06d925af' /* Searching... */ ,
  'office_id_name_qtip' : 'c373dd4bd4ba0b5d3e0c7522c5629880' /* Select Office */ ,
  'email_fieldLabel' : 'ce8ae9da5b7cd6c3df2929543a9af92d' /* Email */ 
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
    height : 290,
    resizable : false,
    title : _this._strings['2b0d7f748b64304e6657207cb03cd8f2'] /* Edit / Create Staff Details */,
    width : 450,
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
        method : 'POST',
        style : 'margin:10px;',
        url : baseURL + '/Roo/core_person',
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
          displayField : 'name',
          editable : false,
          emptyText : _this._strings['be5f40c0d2692cf4e9f8be8d389737a5'] /* Department / Office */,
          fieldLabel : _this._strings['df814135652a5a308fea15bff37ea284'] /* Office */,
          forceSelection : true,
          hiddenName : 'office_id',
          listWidth : 400,
          loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
          minChars : 2,
          name : 'office_id_name',
          pageSize : 20,
          qtip : _this._strings['c373dd4bd4ba0b5d3e0c7522c5629880'] /* Select Office */,
          queryParam : 'query[name]',
          selectOnFocus : true,
          tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{name}</b> </div>',
          triggerAction : 'all',
          typeAhead : true,
          valueField : 'id',
          width : 300,
          listeners : {
           add : function (combo)
            {
                var coid = _this.form.findField('company_id').getValue();
                if (!coid ) {
                
                     Ext.MessageBox.alert("Error", "Select An Company First");
                    return false;
            
                }
                Pman.Dialog.Office.show(cfg, function(data) {
                            _this.form.setValues({
                                office_id_name : data.name,
                                office_id : data.id
                        });
                    }); 
                
                
            },
           beforequery : function (combo, query, forceAll, cancel, e)
            {
                    var coid = _this.form.findField('company_id').getValue();
                    if (coid < 1 ) {
                        Ext.MessageBox.alert("Error", "Select An Company First");
                        return false;
                    }
            }
          },
          xns : Roo.form,
          '|xns' : 'Roo.form',
          store : {
           xtype : 'Store',
           remoteSort : true,
           sortInfo : { direction : 'ASC', field: 'id' },
           listeners : {
            beforeload : function (_self, o){
                 o.params = o.params || {};
                 var coid = _this.form.findField('company_id').getValue();
                 o.params.company_id = coid;
             }
           },
           xns : Roo.data,
           '|xns' : 'Roo.data',
           proxy : {
            xtype : 'HttpProxy',
            method : 'GET',
            url : baseURL + '/Roo/Office.php',
            xns : Roo.data,
            '|xns' : 'Roo.data'
           },
           reader : {
            xtype : 'JsonReader',
            fields : [{"name":"id","type":"int"},{"name":"name","type":"string"}],
            id : 'id',
            root : 'data',
            totalProperty : 'total',
            xns : Roo.data,
            '|xns' : 'Roo.data'
           }
          }
         },
         {
          xtype : 'TextField',
          allowBlank : true,
          fieldLabel : _this._strings['49ee3087348e8d44e1feda1917443987'] /* Name */,
          name : 'name',
          width : 300,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'TextField',
          fieldLabel : _this._strings['bbbabdbe1b262f75d99d62880b953be1'] /* Role */,
          name : 'role',
          width : 200,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'TextField',
          fieldLabel : _this._strings['bcc254b55c4a1babdf1dcb82c207506b'] /* Phone */,
          name : 'phone',
          width : 200,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'TextField',
          fieldLabel : _this._strings['9810aa2b9f44401be4bf73188ef2b67d'] /* Fax */,
          name : 'fax',
          width : 200,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'TextField',
          allowBlank : false,
          fieldLabel : _this._strings['ce8ae9da5b7cd6c3df2929543a9af92d'] /* Email */,
          name : 'email',
          width : 200,
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
          xtype : 'TextField',
          allowBlank : false,
          fieldLabel : _this._strings['ce8ae9da5b7cd6c3df2929543a9af92d'] /* Email */,
          name : 'email',
          width : 200,
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
