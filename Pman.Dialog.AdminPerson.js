//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminPerson = {

 _strings : {
  'ce8ae9da5b7cd6c3df2929543a9af92d' :"Email",
  '7573b7fd7836c9118dbfb69f3abf3858' :"Change / Set Password",
  'abb1d799e06329cb0c38276ea918300b' :"Secure passwords",
  '2b0d7f748b64304e6657207cb03cd8f2' :"Edit / Create Staff Details",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  'bcc254b55c4a1babdf1dcb82c207506b' :"Phone",
  '3544848f820b9d94a3f3871a382cf138' :"New password",
  'be5f40c0d2692cf4e9f8be8d389737a5' :"Department / Office",
  '8a25a3ae30ab6e8ceb5b8c4009a3336f' :"Role / Position",
  '315fce99b77b7f392bf68d5eb14f88c7' :"Password (type again to confirm)",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  'c373dd4bd4ba0b5d3e0c7522c5629880' :"Select Office",
  '49ee3087348e8d44e1feda1917443987' :"Name",
  'c9cc8cce247e49bae79f15173ce97354' :"Save"
 },
 _named_strings : {
  'secure_password_fieldLabel' : 'abb1d799e06329cb0c38276ea918300b' /* Secure passwords */ ,
  'role_fieldLabel' : '8a25a3ae30ab6e8ceb5b8c4009a3336f' /* Role / Position */ ,
  'office_id_name_emptyText' : 'be5f40c0d2692cf4e9f8be8d389737a5' /* Department / Office */ ,
  'name_fieldLabel' : '49ee3087348e8d44e1feda1917443987' /* Name */ ,
  'phone_fieldLabel' : 'bcc254b55c4a1babdf1dcb82c207506b' /* Phone */ ,
  'passwd1_fieldLabel' : '315fce99b77b7f392bf68d5eb14f88c7' /* Password (type again to confirm) */ ,
  'office_id_name_fieldLabel' : 'be5f40c0d2692cf4e9f8be8d389737a5' /* Department / Office */ ,
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
    height : 350,
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
        labelWidth : 120,
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
          fieldLabel : _this._strings['be5f40c0d2692cf4e9f8be8d389737a5'] /* Department / Office */,
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
          width : 250,
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
          width : 250,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'TextField',
          fieldLabel : _this._strings['8a25a3ae30ab6e8ceb5b8c4009a3336f'] /* Role / Position */,
          name : 'role',
          width : 200,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'TextField',
          fieldLabel : _this._strings['bcc254b55c4a1babdf1dcb82c207506b'] /* Phone */,
          name : 'phone',
          width : 150,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'TextField',
          allowBlank : false,
          fieldLabel : _this._strings['ce8ae9da5b7cd6c3df2929543a9af92d'] /* Email */,
          name : 'email',
          width : 250,
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
          xtype : 'FieldSet',
          labelWidth : 200,
          legend : _this._strings['7573b7fd7836c9118dbfb69f3abf3858'] /* Change / Set Password */,
          style : 'width:300px',
          xns : Roo.form,
          '|xns' : 'Roo.form',
          items  : [
           {
            xtype : 'SecurePass',
            '`' : true,
            fieldLabel : _this._strings['3544848f820b9d94a3f3871a382cf138'] /* New password */,
            name : 'passwd1',
            width : 150,
            xns : Roo.form,
            '|xns' : 'Roo.form'
           },
           {
            xtype : 'TextField',
            allowBlank : true,
            fieldLabel : _this._strings['315fce99b77b7f392bf68d5eb14f88c7'] /* Password (type again to confirm) */,
            name : 'passwd1',
            width : 150,
            xns : Roo.form,
            '|xns' : 'Roo.form'
           },
           {
            xtype : 'Checkbox',
            checked : true,
            fieldLabel : _this._strings['abb1d799e06329cb0c38276ea918300b'] /* Secure passwords */,
            inputValue : 1,
            name : 'secure_password',
            valueOff : 0,
            width : 220,
            listeners : {
             check : function (_self, checked)
              {
                  this.form.findField('passwd1').insecure = false;
                      
                  if(!checked){
                      this.form.findField('passwd1').insecure = true;
                  }
              }
            },
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
