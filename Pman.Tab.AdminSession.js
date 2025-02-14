//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminSession = new Roo.XComponent({

 _strings : {
  'e498749f3c42246d50b15c81c101d988' :"Application",
  '4ee972120bcda675f75222c87cb9d356' :"Who",
  'ec53a8c4f07baed5d8825072c89799be' :"Status",
  '91d522fe68c9ac8ac16026371421018f' :"Last Access",
  'f4a52a00bee9faf2bc6183e0ac12ba12' :"Session WID",
  '0e6c5b4e85b8cc4a30d236ebe9ccc9b8' :"Displaying Sessions  {0} - {1} of {2}",
  'e3d388b2c43e5ba0905702620ae2abc1' :"Search for",
  'db6c58b8634d4607cdcb13bb181ea2ff' :"User Sessions",
  '8c5e39fcbdc7303f11a578a76e32f7f5' :"Logged in",
  'ef15fd2f45e6bb5ce57587895ba64f93' :"Browser",
  '662de0725ac8055bff7edae51fbf3c78' :"No Settings Found",
  '6b446bfa60f46e619a691f253177ec9a' :"Force Logout of User",
  '5b8c99dad1893a85076709b2d3c2d2d0' :"IP Address"
 },

  part     :  ["Admin", "Session" ],
  order    : '800-Pman.Tab.AdminSession',
  region   : 'center',
  parent   : 'Pman.Tab.AdminLogs',
  name     : "Sessions",
  disabled : false, 
  permname : 'Admin.Logs', 
  _tree : function(_data)
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'Grid',
   background : true,
   fitContainer : true,
   fitToFrame : true,
   region : 'center',
   title : _this._strings['db6c58b8634d4607cdcb13bb181ea2ff'] /* User Sessions */,
   listeners : {
    activate : function (_self)
     {
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
       xtype : 'TextField',
       emptyText : _this._strings['e3d388b2c43e5ba0905702620ae2abc1'] /* Search for */,
       listeners : {
        render : function (_self)
         {
             _this.searchBox = this;
         },
        specialkey : function (_self, e)
         {
         _this.sesgrid.footer.onClick('first');
         }
       },
       xns : Roo.form,
       '|xns' : 'Roo.form'
      },
      {
       xtype : 'Button',
       cls : 'x-btn-icon',
       icon : rootURL + '/Pman/templates/images/search.gif',
       listeners : {
        click : function (_self, e)
         {
         _this.sesgrid.footer.onClick('first');
         }
       },
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar'
      },
      {
       xtype : 'Button',
       cls : 'x-btn-icon',
       icon : rootURL + '/Pman/templates/images/edit-clear.gif',
       listeners : {
        click : function (_self, e)
         {
             _this.searchBox.setValue('');
             
             _this.sesgrid.footer.onClick('first');
         }
       },
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar'
      },
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
             var s = _this.sesgrid.sm.getSelected(); 
             if (!s) {
                 Roo.MessageBox.alert("Error", "Select a user to logout");
                 return;
             }
             
             new Pman.Request({
                 method : 'POST',
                 url : baseURL + '/Roo/Core_person_window',
                 params : {
                     status : 'KILL',
                     person_id : s.data.person_id
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
           o.params['search[name]'] =_this.searchBox.getValue();
           o.params._with_person_data  =1
          
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
    sm : {
     xtype : 'RowSelectionModel',
     singleSelect : true,
     xns : Roo.grid,
     '|xns' : 'Roo.grid'
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
      dataIndex : 'person_id_name',
      header : _this._strings['4ee972120bcda675f75222c87cb9d356'] /* Who */,
      renderer : function(v,x,r) { 
      
          return String.format('{0} - <u style="color:blue">{1}</u>', v,r.data.person_id_email); 
      },
      sortable : true,
      width : 200,
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
  };  }
});
