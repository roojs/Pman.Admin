//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminPerson = {

 _strings : {
  'f2a6c498fb90ee345d997f888fce3b18' :"Delete",
  '5b8c99dad1893a85076709b2d3c2d2d0' :"IP Address",
  '8a25a3ae30ab6e8ceb5b8c4009a3336f' :"Role / Position",
  'f4a52a00bee9faf2bc6183e0ac12ba12' :"Session WID",
  'e0626222614bdee31951d84c64e5e9ff' :"Select",
  '0e6c5b4e85b8cc4a30d236ebe9ccc9b8' :"Displaying Sessions  {0} - {1} of {2}",
  'ce8ae9da5b7cd6c3df2929543a9af92d' :"Email",
  '662de0725ac8055bff7edae51fbf3c78' :"No Settings Found",
  '8c5e39fcbdc7303f11a578a76e32f7f5' :"Logged in",
  'e498749f3c42246d50b15c81c101d988' :"Application",
  '03937134cedab9078be39a77ee3a48a0' :"Group",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  'bcc254b55c4a1babdf1dcb82c207506b' :"Phone",
  '49ee3087348e8d44e1feda1917443987' :"Name",
  'ec53a8c4f07baed5d8825072c89799be' :"Status",
  '91d522fe68c9ac8ac16026371421018f' :"Last Access",
  '7573b7fd7836c9118dbfb69f3abf3858' :"Change / Set Password",
  'a37ede293936e29279ed543129451ec3' :"Groups",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  '7e17f8478e121357b78646ca5b5d5ac9' :"Displaying Settings  {0} - {1} of {2}",
  'c373dd4bd4ba0b5d3e0c7522c5629880' :"Select Office",
  '315fce99b77b7f392bf68d5eb14f88c7' :"Password (type again to confirm)",
  'a5da1d5de4f3a80e2acf5227283c630d' :"Staff Details",
  'abb1d799e06329cb0c38276ea918300b' :"Secure passwords",
  'db6c58b8634d4607cdcb13bb181ea2ff' :"User Sessions",
  'e55f75a29310d7b60f7ac1d390c8ae42' :"Module",
  'b5a7adde1af5c87d7fd797b6245c2a39' :"Description",
  '6b446bfa60f46e619a691f253177ec9a' :"Force Logout of User",
  'c9cc8cce247e49bae79f15173ce97354' :"Save",
  'ef15fd2f45e6bb5ce57587895ba64f93' :"Browser",
  '3544848f820b9d94a3f3871a382cf138' :"New password",
  '4d3d769b812b6faa6b76e1a8abaece2d' :"Active",
  'e4709a73a287a5f033f5b1b5142cb74d' :"System Settings",
  'be5f40c0d2692cf4e9f8be8d389737a5' :"Department / Office",
  '689202409e48743b914713f96d93947c' :"Value",
  '2b0d7f748b64304e6657207cb03cd8f2' :"Edit / Create Staff Details"
 },
 _named_strings : {
  'secure_password_fieldLabel' : 'abb1d799e06329cb0c38276ea918300b' /* Secure passwords */ ,
  'role_fieldLabel' : '8a25a3ae30ab6e8ceb5b8c4009a3336f' /* Role / Position */ ,
  'name_fieldLabel' : '49ee3087348e8d44e1feda1917443987' /* Name */ ,
  'office_id_name_emptyText' : 'be5f40c0d2692cf4e9f8be8d389737a5' /* Department / Office */ ,
  'passwd2_fieldLabel' : '315fce99b77b7f392bf68d5eb14f88c7' /* Password (type again to confirm) */ ,
  'phone_fieldLabel' : 'bcc254b55c4a1babdf1dcb82c207506b' /* Phone */ ,
  'passwd1_fieldLabel' : '3544848f820b9d94a3f3871a382cf138' /* New password */ ,
  'office_id_name_fieldLabel' : 'be5f40c0d2692cf4e9f8be8d389737a5' /* Department / Office */ ,
  'office_id_name_loadingText' : '1243daf593fa297e07ab03bf06d925af' /* Searching... */ ,
  'active_fieldLabel' : '4d3d769b812b6faa6b76e1a8abaece2d' /* Active */ ,
  'email_fieldLabel' : 'ce8ae9da5b7cd6c3df2929543a9af92d' /* Email */ ,
  'office_id_name_qtip' : 'c373dd4bd4ba0b5d3e0c7522c5629880' /* Select Office */ 
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
  this.dialog.show.apply(this.dialog,  Array.prototype.slice.call(arguments).slice(2));
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
    title : _this._strings['2b0d7f748b64304e6657207cb03cd8f2'] /* Edit / Create Staff Details */,
    width : 650,
    xns : Roo,
    '|xns' : 'Roo',
    center : {
     xtype : 'Region',
     tabPosition : 'top',
     xns : Roo.layout,
     '|xns' : 'Roo.layout'
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
             if (_this.form.findField('passwd1')) {
                
                var p1 = _this.form.findField('passwd1').getValue();
                var p2 = _this.form.findField('passwd2').getValue();
                
                if (_this.sendAfterSave && !p1.length) {
                    Roo.MessageBox.alert("Error", "You must create a password to send introduction mail");
                    return;
                }
                
                if (Pman.Login.authUser.id < 0 && !p1.length) {
                    Roo.MessageBox.alert("Error", "You must create a password for the admin account");
                    return;
                }
                
                
                if (p1.length || p2.length) {
                    if (p1 != p2) {
                        Roo.MessageBox.alert("Error", "Passwords do not match");
                        return;
                    }
                }
                
            
            }
            
         
            _this.form.doAction("submit");
        
        }
      },
      xns : Roo,
      '|xns' : 'Roo'
     }
    ],
    items  : [
     {
      xtype : 'Content',
      region : 'center',
      title : _this._strings['a5da1d5de4f3a80e2acf5227283c630d'] /* Staff Details */,
      xns : Roo.panel,
      '|xns' : 'Roo.panel',
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
                  _this.dialog.layout.getRegion('center').showPanel(0);
                 //_this.dialog.el.mask("Loading");
                 if ( _this.data.id* 1 > 0) { 
                      this.load({ method: 'GET', params: { '_id' : _this.data.id }});
                      return;
                  }
                  this.findField('company_id').setValue(Pman.Login.authUser.company_id);
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
          allowBlank : false,
          fieldLabel : _this._strings['ce8ae9da5b7cd6c3df2929543a9af92d'] /* Email */,
          name : 'email',
          width : 250,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'TextField',
          fieldLabel : _this._strings['8a25a3ae30ab6e8ceb5b8c4009a3336f'] /* Role / Position */,
          name : 'role',
          width : 250,
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
          xtype : 'Hidden',
          name : 'company_id',
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'ComboBox',
          allowBlank : true,
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
           beforequery : function (combo, query, forceAll, cancel, e)
            {
                    var coid = _this.form.findField('company_id').getValue();
                    if (coid < 1 ) {
                        Roo.MessageBox.alert("Error", "Select An Company First");
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
            url : baseURL + '/Roo/core_office',
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
          xtype : 'Checkbox',
          checked : true,
          fieldLabel : _this._strings['4d3d769b812b6faa6b76e1a8abaece2d'] /* Active */,
          inputValue : 1,
          name : 'active',
          valueOff : 0,
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
            fieldLabel : _this._strings['3544848f820b9d94a3f3871a382cf138'] /* New password */,
            inputType : 'password',
            name : 'passwd1',
            width : 150,
            xns : Roo.form,
            '|xns' : 'Roo.form'
           },
           {
            xtype : 'TextField',
            allowBlank : true,
            fieldLabel : _this._strings['315fce99b77b7f392bf68d5eb14f88c7'] /* Password (type again to confirm) */,
            inputType : 'password',
            name : 'passwd2',
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
      xtype : 'Grid',
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
      xns : Roo.panel,
      '|xns' : 'Roo.panel',
      grid : {
       xtype : 'Grid',
       autoExpandColumn : 'data',
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
                 Pman.genericDelete(_this, 'core_person_settings'); 
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
              o.params.person_id =  _this.form.findField('id').getValue();
              
             
          }
        },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         url : baseURL + '/Roo/core_person_settings',
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
         dataIndex : 'scope',
         header : _this._strings['e55f75a29310d7b60f7ac1d390c8ae42'] /* Module */,
         sortable : true,
         width : 120,
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
         dataIndex : 'data',
         header : _this._strings['689202409e48743b914713f96d93947c'] /* Value */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        }
       ]
      }
     },
     {
      xtype : 'Grid',
      background : true,
      fitContainer : true,
      fitToFrame : true,
      region : 'center',
      title : _this._strings['db6c58b8634d4607cdcb13bb181ea2ff'] /* User Sessions */,
      listeners : {
       activate : function() {
            _this.sespanel = this;
         
           
         if (_this.sesgrid) {
                _this.sesgrid.footer.onClick('first');
            }
        }
      },
      xns : Roo.panel,
      '|xns' : 'Roo.panel',
      grid : {
       xtype : 'Grid',
       autoExpandColumn : 'user_agent',
       loadMask : true,
       listeners : {
        render : function() 
         {
             _this.sesgrid = this; 
             //_this.dialog = Pman.Dialog.FILL_IN
             if (_this.sespanel.active) {
                this.footer.onClick('first');
             }
         }
       },
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       footer : {
        xtype : 'PagingToolbar',
        displayInfo : true,
        displayMsg : _this._strings['0e6c5b4e85b8cc4a30d236ebe9ccc9b8'] /* Displaying Sessions  {0} - {1} of {2} */,
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
          text : _this._strings['6b446bfa60f46e619a691f253177ec9a'] /* Force Logout of User */,
          listeners : {
           click : function()
            {
                  new Pman.Request({
                    method : 'POST',
                    url : baseURL + '/Roo/Core_person_window',
                    params : {
                        status : 'KILL',
                        person_id : _this.data.id
                    },
                    success : function()
                    {
                        _this.sesgrid.footer.onClick('refresh');
                    }
                });
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
        sortInfo : { field : 'last_access_dt', direction: 'DESC' },
        listeners : {
         beforeload : function (_self, o)
          {
            
              o.params = o.params ? o.params : {};
              o.params.person_id =  _this.form.findField('id').getValue();
              
             
          }
        },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         url : baseURL + '/Roo/core_person_window',
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
       colModel : [
        {
         xtype : 'ColumnModel',
         dataIndex : 'app_id',
         header : _this._strings['e498749f3c42246d50b15c81c101d988'] /* Application */,
         sortable : true,
         width : 120,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'ip',
         header : _this._strings['5b8c99dad1893a85076709b2d3c2d2d0'] /* IP Address */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 80,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'login_dt',
         header : _this._strings['8c5e39fcbdc7303f11a578a76e32f7f5'] /* Logged in */,
         renderer : function(v) { 
             return String.format('{0}', v ? v.format("d/M H:i")  : ''); 
         },
         sortable : true,
         width : 80,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'last_access_dt',
         header : _this._strings['91d522fe68c9ac8ac16026371421018f'] /* Last Access */,
         renderer : function(v) { 
             return String.format('{0}', v ? v.format("d/M H:i")  : ''); 
         },
         sortable : true,
         width : 80,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'status',
         header : _this._strings['ec53a8c4f07baed5d8825072c89799be'] /* Status */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 40,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'window_id',
         header : _this._strings['f4a52a00bee9faf2bc6183e0ac12ba12'] /* Session WID */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 80,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'user_agent',
         header : _this._strings['ef15fd2f45e6bb5ce57587895ba64f93'] /* Browser */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        }
       ]
      }
     },
     {
      xtype : 'GridPanel',
      background : false,
      fitContainer : true,
      fitToframe : true,
      region : 'center',
      tableName : 'core_group',
      title : _this._strings['a37ede293936e29279ed543129451ec3'] /* Groups */,
      listeners : {
       render : function (_self)
        {
            _this.gruopPanel = this;
        }
      },
      xns : Roo,
      '|xns' : 'Roo',
      grid : {
       xtype : 'Grid',
       autoExpandColumn : 'name',
       loadMask : true,
       listeners : {
        cellclick : function (_self, ri, ci , e)
         {
             /*
            if (ci != 0) {return; }
            
             var rec = this.ds.getAt(ri);
             rec.set('member', (rec.data.member * 1) ? 0 : 1);
             rec.commit();
         
             
             var cfg = [];
             
             _this.beatgrid.ds.each(function(r) {
                 if (r.data.member*1 < 1) {
                     return;
                 }
                 cfg.push(r.data.id);
             });
         
             _this.form.findField('beats').setValue( cfg.join(','));
             */
         },
        render : function() 
         {
             _this.groupGrid = this;
             
             _this.groupGrid.dataSource.load();
         },
        rowclass : function (gridview, rowcfg)
         {
             rowcfg.rowClass = '';
             
             var filter = _this.groupFilter.getValue().toLowerCase();
             
             if(!filter.length) {
                 return; // display
             }
             
             if(rowcfg.record.data.name.toLowerCase().match(new RegExp(filter))) {
                 return; // display
             }
             
             rowcfg.rowClass = 'display-none';
         }
       },
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       toolbar : {
        xtype : 'Toolbar',
        xns : Roo,
        '|xns' : 'Roo',
        items  : [
         {
          xtype : 'TextField',
          width : 100,
          listeners : {
           keyup : function (_self, e)
            {
                _this.groupGrid.view.refresh(true);
            },
           render : function (_self)
            {
              _this.groupFilter = _self;
            }
          },
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'Button',
          cls : 'x-btn-icon',
          icon : rootURL + '/Pman/templates/images/edit-clear.gif',
          listeners : {
           click : function (_self, e)
            {
                _this.groupFilter.setValue('');
                _this.groupGrid.view.refresh(true);
            }
          },
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         },
         {
          xtype : 'Fill',
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
         beforeload : function (_self, options)
          {
              options.params = options.params || {};
              options.params.limit = 999;
              options.params.is_in_group = 1;
          },
         load : function (_self, records, options)
          {
              /*
              var beatsField = _this.form.findField('beats');
              // beat list is loaded..
              
              // if no beat is available => clear beats field
              if (!records.length) {
                 
                  beatsField.setValue('');
                  return;
              }
              
              
              
             
              var beats = beatsField.getValue();    
          
              if (beats.length) {
          
                  var crecs = beats.split(',');
                  
                  var avail = [];
                  
                  // tick the available beats 
                  Roo.each(records, function(r) {
                  
                      if ( crecs.indexOf(''+r.data.id) > -1) {
                          r.set('member', 1);
                      }
                      avail.push(''+r.data.id);
                      
                  });
                  
                  // remove the unavailable beats from beats field
                  var crec_new = [];
                  Roo.each(crecs, function(r) {
                      if (avail.indexOf(r) > -1) {
                          crec_new.push(r);
                      }
                  });
                
                  beatsField.setValue( crec_new.join(','));
                  
                  
              }
              */
          }
        },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         url : baseURL + '/Roo/core_group.php',
         xns : Roo.data,
         '|xns' : 'Roo.data'
        },
        reader : {
         xtype : 'JsonReader',
         fields : [
         
         ],
         id : 'id',
         root : 'data',
         totalProperty : 'total',
         xns : Roo.data,
         '|xns' : 'Roo.data'
        }
       },
       colModel : [
        {
         xtype : 'ColumnModel',
         dataIndex : 'member',
         header : _this._strings['e0626222614bdee31951d84c64e5e9ff'] /* Select */,
         renderer : function(v) {  
             var state = v> 0 ?  '-checked' : '';
         
             return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                         
          },
         width : 75,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'name',
         header : _this._strings['03937134cedab9078be39a77ee3a48a0'] /* Group */,
         renderer : function(v,x,r) { return String.format('{0}', v ? v : ''); },
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
