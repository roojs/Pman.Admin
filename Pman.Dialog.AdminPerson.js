//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminPerson = {

 _strings : {
  'ce8ae9da5b7cd6c3df2929543a9af92d' :"Email",
  '7573b7fd7836c9118dbfb69f3abf3858' :"Change / Set Password",
  'abb1d799e06329cb0c38276ea918300b' :"Secure passwords",
  '2b0d7f748b64304e6657207cb03cd8f2' :"Edit / Create Staff Details",
  '7e17f8478e121357b78646ca5b5d5ac9' :"Displaying Settings  {0} - {1} of {2}",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  'bcc254b55c4a1babdf1dcb82c207506b' :"Phone",
  '3544848f820b9d94a3f3871a382cf138' :"New password",
  '689202409e48743b914713f96d93947c' :"Value",
  'be5f40c0d2692cf4e9f8be8d389737a5' :"Department / Office",
  '8a25a3ae30ab6e8ceb5b8c4009a3336f' :"Role / Position",
  '315fce99b77b7f392bf68d5eb14f88c7' :"Password (type again to confirm)",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  'e4709a73a287a5f033f5b1b5142cb74d' :"System Settings",
  'c373dd4bd4ba0b5d3e0c7522c5629880' :"Select Office",
  '49ee3087348e8d44e1feda1917443987' :"Name",
  '662de0725ac8055bff7edae51fbf3c78' :"No Settings Found",
  'f2a6c498fb90ee345d997f888fce3b18' :"Delete",
  'e55f75a29310d7b60f7ac1d390c8ae42' :"Module",
  'b5a7adde1af5c87d7fd797b6245c2a39' :"Description",
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
          style : 'width:370px',
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
     },
     {
      xtype : 'GridPanel',
      background : true,
      fitContainer : true,
      fitToframe : true,
      region : 'center',
      title : _this._strings['e4709a73a287a5f033f5b1b5142cb74d'] /* System Settings */,
      listeners : {
       activate : function() {
            _this.panel = this;
         
            if (_this.grid) {
                _this.grid.footer.onClick('first');
            }
        }
      },
      xns : Roo,
      '|xns' : 'Roo',
      grid : {
       xtype : 'Grid',
       autoExpandColumn : 'val',
       loadMask : true,
       listeners : {
        render : function() 
         {
             _this.grid = this; 
             //_this.dialog = Pman.Dialog.FILL_IN
             if (_this.panel.active) {
                this.footer.onClick('first');
             }
         },
        rowdblclick : function (_self, rowIndex, e)
         {
             if (!_this.dialog) {
                  return;
              }
             _this.dialog.show( this.getDataSource().getAt(rowIndex).data, function() {
                 _this.grid.footer.onClick('refresh');
             }); 
         }
       },
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       footer : {
        xtype : 'PagingToolbar',
        displayInfo : true,
        displayMsg : _this._strings['7e17f8478e121357b78646ca5b5d5ac9'] /* Displaying Settings  {0} - {1} of {2} */,
        emptyMsg : _this._strings['662de0725ac8055bff7edae51fbf3c78'] /* No Settings Found */,
        pageSize : 25,
        xns : Roo,
        '|xns' : 'Roo'
       },
       toolbar : {
        xtype : 'Toolbar',
        xns : Roo,
        '|xns' : 'Roo',
        items  : [
         {
          xtype : 'Fill',
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         },
         {
          xtype : 'Button',
          cls : 'x-btn-text-icon',
          icon : rootURL + '/Pman/templates/images/trash.gif',
          text : _this._strings['f2a6c498fb90ee345d997f888fce3b18'] /* Delete */,
          listeners : {
           click : function()
            {
                 Pman.genericDelete(_this, 'core_setting'); 
            }
          },
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         }
        ]
       },
       dataSource : {
        xtype : 'Store',
        remoteSort : true,
        sortInfo : { field : 'name', direction: 'ASC' },
        listeners : {
         beforeload : function (_self, o)
          {
            
              o.params = o.params ? o.params : {};
              
             
          }
        },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         url : baseURL + '/Roo/core_setting',
         xns : Roo.data,
         '|xns' : 'Roo.data'
        },
        reader : {
         xtype : 'JsonReader',
         id : 'id',
         root : 'data',
         totalProperty : 'total',
         xns : Roo.data,
         '|xns' : 'Roo.data'
        }
       },
       sm : {
        xtype : 'RowSelectionModel',
        singleSelect : true,
        listeners : {
         afterselectionchange : function (_self)
          {
              // load project members.
          }
        },
        xns : Roo.grid,
        '|xns' : 'Roo.grid'
       },
       colModel : [
        {
         xtype : 'ColumnModel',
         dataIndex : 'module',
         header : _this._strings['e55f75a29310d7b60f7ac1d390c8ae42'] /* Module */,
         sortable : true,
         width : 120,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'name',
         header : _this._strings['49ee3087348e8d44e1feda1917443987'] /* Name */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'description',
         header : _this._strings['b5a7adde1af5c87d7fd797b6245c2a39'] /* Description */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'val',
         header : _this._strings['689202409e48743b914713f96d93947c'] /* Value */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        }
       ]
      }
     }
    ]
   });
 }
};
