//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminOffice = new Roo.XComponent({

 _strings : {
  'ce8ae9da5b7cd6c3df2929543a9af92d' :"Email",
  'ec211f7c20af43e742bf2570c3cb84f9' :"Add",
  '14820f8c54725a56438e99f6bd57dfa3' :"Displaying Office{0} - {1} of {2}",
  '7dce122004969d56ae2e0245cb754d35' :"Edit",
  '7407f706267593de473324b2c07ef2fc' :"Offices / Departments / Sub-Companies",
  '217574e21514de41ec31aaf5ddadb2c3' :"No Office found",
  'bcc254b55c4a1babdf1dcb82c207506b' :"Phone",
  'a8fa7984f57a42bb41143f3d7665bd36' :"Name / Department / Sub Comp.",
  'f2a6c498fb90ee345d997f888fce3b18' :"Delete",
  'dd7bf230fde8d4836917806aff6a6b27' :"Address",
  '9810aa2b9f44401be4bf73188ef2b67d' :"Fax"
 },

  part     :  ["Admin", "Office" ],
  order    : '001-Pman.Tab.AdminOffice',
  region   : 'center',
  parent   : 'Pman.Tab.AdminCompanies',
  name     : "Pman.Tab.AdminOffice",
  disabled : false, 
  permname : '', 
  _tree : function()
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'GridPanel',
   background : true,
   fitContainer : true,
   fitToframe : true,
   region : 'south',
   tableName : 'Office',
   title : _this._strings['7407f706267593de473324b2c07ef2fc'] /* Offices / Departments / Sub-Companies */,
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
    autoExpandColumn : 'name',
    loadMask : true,
    listeners : {
     render : function() 
      {
          _this.grid = this; 
          _this.dialog =Pman.Dialog.Office;
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
              _this.grid.footer.onClick('first');
          }); 
      }
    },
    xns : Roo.grid,
    '|xns' : 'Roo.grid',
    footer : {
     xtype : 'PagingToolbar',
     displayInfo : true,
     displayMsg : _this._strings['14820f8c54725a56438e99f6bd57dfa3'] /* Displaying Office{0} - {1} of {2} */,
     emptyMsg : _this._strings['217574e21514de41ec31aaf5ddadb2c3'] /* No Office found */,
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
       xtype : 'Button',
       cls : 'x-btn-text-icon',
       icon : Roo.rootURL + 'images/default/dd/drop-add.gif',
       text : _this._strings['ec211f7c20af43e742bf2570c3cb84f9'] /* Add */,
       listeners : {
        click : function()
         {
             if (!_this.dialog) {
              return;
             }
             var sd = Pman.Tab.AdminCompanies.grid.getSelectionModel().getSelected();
             if (!sd) {
                 Roo.MessageBox.alert("Error", "Select an company to add an office to");
                 return;
             }
             var cdata = sd .data;
             _dialog.show( { 
                 id : 0 ,
                 company_name : cdata.name,
                 company_id : cdata.id,
                 address : cdata.address,
                 phone : cdata.tel,
                 fax : cdata.fax,
                 email  : cdata.email
             } , function() {
                 _this.grid.footer.onClick('first');
            });
         }
       },
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar'
      },
      {
       xtype : 'Button',
       cls : 'x-btn-text-icon',
       icon : Roo.rootURL + 'images/default/tree/leaf.gif',
       text : _this._strings['7dce122004969d56ae2e0245cb754d35'] /* Edit */,
       listeners : {
        click : function()
         {
             var s = _this.grid.getSelectionModel().getSelections();
             if (!s.length || (s.length > 1))  {
                 Roo.MessageBox.alert("Error", s.length ? "Select only one Row" : "Select a Row");
                 return;
             }
             if (!_this.dialog) {
                 return;
             }
             s[0].data.company_name = Pman.Tab.AdminCompanies.grid.getSelectionModel().getSelected().data.name;
             _this.dialog.show(s[0].data, function() {
                 _this.grid.footer.onClick('first');
             }); 
             
         }
       },
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
              Pman.genericDelete(_this, 'Office'); 
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
           try {
               var sm = Pman.Tab.AdminCompanies.grid.getSelectionModel();
               sm = sm.getSelected();
               if (!sm || !sm.data.id) {
                   // mask??
                   return false;
               }
                      
               o.params.company_id = sm.data.id ;
           } catch (e) {
               return false;
           }
           
           
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
      fields : [
          {
              'name': 'id',
              'type': 'int'
          },
          {
              'name': 'company_id',
              'type': 'int'
          },
          {
              'name': 'name',
              'type': 'string'
          },
          {
              'name': 'address',
              'type': 'string'
          },
          {
              'name': 'phone',
              'type': 'string'
          },
          {
              'name': 'fax',
              'type': 'string'
          },
          {
              'name': 'email',
              'type': 'string'
          },
          {
              'name': 'role',
              'type': 'string'
          },
          {
              'name': 'company_id_code',
              'type': 'string'
          },
          {
              'name': 'company_id_name',
              'type': 'string'
          },
          {
              'name': 'company_id_remarks',
              'type': 'string'
          },
          {
              'name': 'company_id_owner_id',
              'type': 'int'
          },
          {
              'name': 'company_id_address',
              'type': 'string'
          },
          {
              'name': 'company_id_tel',
              'type': 'string'
          },
          {
              'name': 'company_id_fax',
              'type': 'string'
          },
          {
              'name': 'company_id_email',
              'type': 'string'
          },
          {
              'name': 'company_id_id',
              'type': 'int'
          },
          {
              'name': 'company_id_isOwner',
              'type': 'int'
          },
          {
              'name': 'company_id_logo_id',
              'type': 'int'
          },
          {
              'name': 'company_id_background_color',
              'type': 'string'
          },
          {
              'name': 'company_id_comptype',
              'type': 'string'
          },
          {
              'name': 'company_id_url',
              'type': 'string'
          },
          {
              'name': 'company_id_main_office_id',
              'type': 'int'
          },
          {
              'name': 'company_id_created_by',
              'type': 'int'
          },
          {
              'name': 'company_id_created_dt',
              'type': 'date'
          },
          {
              'name': 'company_id_updated_by',
              'type': 'int'
          },
          {
              'name': 'company_id_updated_dt',
              'type': 'date'
          },
          {
              'name': 'company_id_passwd',
              'type': 'string'
          },
          {
              'name': 'company_id_dispatch_port',
              'type': 'string'
          },
          {
              'name': 'company_id_province',
              'type': 'string'
          },
          {
              'name': 'company_id_country',
              'type': 'string'
          }
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
      dataIndex : 'name',
      header : _this._strings['a8fa7984f57a42bb41143f3d7665bd36'] /* Name / Department / Sub Comp. */,
      renderer : function(v) { return String.format('{0}', v); },
      sortable : true,
      width : 200,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'phone',
      header : _this._strings['bcc254b55c4a1babdf1dcb82c207506b'] /* Phone */,
      renderer : function(v) { return String.format('{0}', v); },
      width : 100,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'fax',
      header : _this._strings['9810aa2b9f44401be4bf73188ef2b67d'] /* Fax */,
      renderer : function(v) { return String.format('{0}', v); },
      width : 100,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'email',
      header : _this._strings['ce8ae9da5b7cd6c3df2929543a9af92d'] /* Email */,
      renderer : function (v) {
          return (v.length && v.indexOf('@') > 0 ) ? 
              String.format('<a href="mailto:{0}">{0}</a>',v) : v;
              
      },
      width : 200,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'address',
      header : _this._strings['dd7bf230fde8d4836917806aff6a6b27'] /* Address */,
      renderer : function(v) { return String.format('{0}', v); },
      width : 300,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     }
    ]
   }
  };  }
});
