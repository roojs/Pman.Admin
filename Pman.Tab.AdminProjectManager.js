//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminProjectManager = new Roo.XComponent({

 _strings : {
  '54e1d44609e3abed11f6e1eb6ae54988' :"Projects",
  '8115b8afd5b2953d9fa63eb0db9559fc' :"No Projects found",
  'ec211f7c20af43e742bf2570c3cb84f9' :"Add",
  '13348442cc6a27032d2b4aa28b75a5d3' :"Search",
  '7dce122004969d56ae2e0245cb754d35' :"Edit",
  '577d7068826de925ea2aec01dbadf5e4' :"Client",
  '917d465e9a9e8b16a8da50a1ca8156ca' :"Show:",
  '0f111c111475c934057e6f8bb8314d56' :"Non-Projects",
  '03f4a47830f97377a35321051685071e' :"Closed",
  'f45e7cfb0824b6d381ade7d81bb81615' :"Displaying Projects {0} - {1} of {2}",
  'b1c94ca2fbc3e78fc30069c8d0f01680' :"All",
  'a1fa27779242b4902f7ae3bdd5c6d508' :"Type",
  'ca0dbad92a874b2f69b549293387925e' :"Code",
  '49ee3087348e8d44e1feda1917443987' :"Name",
  '93573647a6041adaabd942e88cc29e23' :"Projects / Members"
 },

  part     :  ["Admin", "ProjectManager" ],
  order    : '002-Pman.Tab.AdminProjectManager',
  region   : 'center',
  parent   : 'Pman.Tab.Admin',
  name     : "Pman.Tab.AdminProjectManager",
  disabled : false, 
  permname : 'Core.Projects_All', 
  _tree : function()
  {
   var _this = this;
   var MODULE = this;
   return {
   fitContainer : true,
   fitToFrame : true,
   region : 'center',
   title : _this._strings['93573647a6041adaabd942e88cc29e23'] /* Projects / Members */,
   xns : Roo,
   '|xns' : 'Roo',
   xtype : 'NestedLayoutPanel',
   layout : {
    xns : Roo,
    '|xns' : 'Roo',
    xtype : 'BorderLayout',
    center : {
     xns : Roo,
     '|xns' : 'Roo',
     xtype : 'LayoutRegion'
    },
    east : {
     split : true,
     width : 300,
     xns : Roo,
     '|xns' : 'Roo',
     xtype : 'LayoutRegion'
    },
    items  : [
     {
      background : true,
      fitContainer : true,
      fitToframe : true,
      region : 'center',
      tableName : 'Projects',
      title : _this._strings['54e1d44609e3abed11f6e1eb6ae54988'] /* Projects */,
      xns : Roo,
      '|xns' : 'Roo',
      xtype : 'GridPanel',
      listeners : {
       activate : function() {
            _this.panel = this;
            try {
                _this.dialog =  Pman.Dialog.CoreProject ; 
            } catch(e) {}
            if (_this.grid) {
                _this.grid.footer.onClick('first');
            }
        }
      },
      grid : {
       autoExpandColumn : 'name',
       filter : 'P,U',
       getTypes : function() {
           return [
               [  'U' , "Project (Unconfirmed)" ],
               [  'P' , "Project" ],
               [  'C' , "Project (Closed)" ],
               [  'N' , "Non-Project" ],
               [  'X' , "Non-Project (Closed)" ]
       
           ];
       },
       loadMask : true,
       typeToString : function(v)
       {
           var ar = this.getTypes();
           var ret = '';
           Roo.each(ar, function(a) {
               if (a[0] == v) {
                   ret = a[1];
                   return false;
               }
           });
           return ret;
       },
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       xtype : 'Grid',
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
                 _this.grid.footer.onClick('first');
             }); 
         }
       },
       footer : {
        displayInfo : true,
        displayMsg : _this._strings['f45e7cfb0824b6d381ade7d81bb81615'] /* Displaying Projects {0} - {1} of {2} */,
        emptyMsg : _this._strings['8115b8afd5b2953d9fa63eb0db9559fc'] /* No Projects found */,
        pageSize : 25,
        xns : Roo,
        '|xns' : 'Roo',
        xtype : 'PagingToolbar'
       },
       toolbar : {
        xns : Roo,
        '|xns' : 'Roo',
        xtype : 'Toolbar',
        items  : [
         {
          cls : 'x-btn-text-icon',
          icon : Roo.rootURL + 'images/default/dd/drop-add.gif',
          text : _this._strings['ec211f7c20af43e742bf2570c3cb84f9'] /* Add */,
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Button',
          listeners : {
           click : function()
            {
                if (!_this.dialog) {
                    return;
                }
                _this.dialog.show( { id : 0 } , function() {
                    _this.grid.footer.onClick('first');
               }); 
            }
          }
         },
         {
          cls : 'x-btn-text-icon',
          icon : Roo.rootURL + 'images/default/tree/leaf.gif',
          text : _this._strings['7dce122004969d56ae2e0245cb754d35'] /* Edit */,
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Button',
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
                _this.dialog.show(s[0].data, function() {
                    _this.grid.footer.onClick('first');
                }); 
                
            }
          }
         },
         {
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Separator'
         },
         {
          text : _this._strings['13348442cc6a27032d2b4aa28b75a5d3'] /* Search */,
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'TextItem'
         },
         {
          xns : Roo.form,
          '|xns' : 'Roo.form',
          xtype : 'TextField',
          listeners : {
           render : function (_self)
            {
                _this.searchBox = _self;
            },
           specialkey : function (_self, e)
            {
                if(e.getKey() == 13) {
                      _this.grid.footer.onClick('first');
                }
            }
          }
         },
         {
          cls : 'x-btn-icon',
          icon : rootURL + '/Pman/templates/images/search.gif',
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Button',
          listeners : {
           click : function (_self, e)
            {
            _this.grid.footer.onClick('first');
            }
          }
         },
         {
          cls : 'x-btn-icon',
          icon : rootURL + '/Pman/templates/images/edit-clear.gif',
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Button',
          listeners : {
           click : function (_self, e)
            {
            _this.searchBox.setValue('');
                _this.grid.footer.onClick('first');
            }
          }
         },
         {
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Separator'
         },
         {
          text : _this._strings['917d465e9a9e8b16a8da50a1ca8156ca'] /* Show: */,
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'TextItem'
         },
         {
          enableToggle : true,
          pressed : false,
          text : _this._strings['b1c94ca2fbc3e78fc30069c8d0f01680'] /* All */,
          toggleGroup : 'pgrp',
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Button',
          listeners : {
           toggle : function (_self,st)
            {
                if (st) { _this.grid.filter = 'P,N,U'; } 
                _this.grid.footer.onClick('first');
                 
            }
          }
         },
         {
          enableToggle : true,
          pressed : true,
          text : _this._strings['54e1d44609e3abed11f6e1eb6ae54988'] /* Projects */,
          toggleGroup : 'pgrp',
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Button',
          listeners : {
           toggle : function (_self,st)
            {
                if (st) { _this.grid.filter = 'P,U'; } 
                _this.grid.footer.onClick('first');
                 
            }
          }
         },
         {
          enableToggle : true,
          pressed : false,
          text : _this._strings['0f111c111475c934057e6f8bb8314d56'] /* Non-Projects */,
          toggleGroup : 'pgrp',
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Button',
          listeners : {
           toggle : function (_self,st)
            {
                if (st) { _this.grid.filter = 'N'; } 
                _this.grid.footer.onClick('first');
                 
            }
          }
         },
         {
          enableToggle : true,
          pressed : false,
          text : _this._strings['03f4a47830f97377a35321051685071e'] /* Closed */,
          toggleGroup : 'pgrp',
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Button',
          listeners : {
           toggle : function (_self, st)
            {
                    if (st) { _this.grid.filter = 'X,C'; } 
                            _this.grid.footer.onClick('first');
                    
            }
          }
         }
        ]
       },
       dataSource : {
        remoteSort : true,
        sortInfo : { field : 'code', direction: 'ASC' },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        xtype : 'Store',
        listeners : {
         beforeload : function (_self, o)
          {
              if (!_this.searchBox) {
                  return false;
              }  
              o.params = o.params ? o.params : {};
              o.params['query[project_search]'] = _this.searchBox.getValue();
              o.params['query[project_filter]'] = _this.grid.filter;
          }
        },
        proxy : {
         method : 'GET',
         url : baseURL + '/Roo/core_project.php',
         xns : Roo.data,
         '|xns' : 'Roo.data',
         xtype : 'HttpProxy'
        },
        reader : {
         fields : [
             {
                 'name': 'id',
                 'type': 'int'
             },
             {
                 'name': 'name',
                 'type': 'string'
             },
             {
                 'name': 'remarks',
                 'type': 'string'
             },
             {
                 'name': 'owner_id',
                 'type': 'int'
             },
             {
                 'name': 'code',
                 'type': 'string'
             },
             {
                 'name': 'active',
                 'type': 'int'
             },
             {
                 'name': 'type',
                 'type': 'string'
             },
             {
                 'name': 'client_id',
                 'type': 'int'
             },
             {
                 'name': 'team_id',
                 'type': 'int'
             },
             {
                 'name': 'file_location',
                 'type': 'string'
             },
             {
                 'name': 'open_date',
                 'type': 'date',
                 'dateFormat': 'Y-m-d'
             },
             {
                 'name': 'open_by',
                 'type': 'int'
             },
             {
                 'name': 'close_date',
                 'type': 'date',
                 'dateFormat': 'Y-m-d'
             },
             {
                 'name': 'countries',
                 'type': 'string'
             },
             {
                 'name': 'languages',
                 'type': 'string'
             },
             {
                 'name': 'agency_id',
                 'type': 'int'
             },
             {
                 'name': 'client_id_code',
                 'type': 'string'
             },
             {
                 'name': 'client_id_name',
                 'type': 'string'
             },
             {
                 'name': 'client_id_remarks',
                 'type': 'string'
             },
             {
                 'name': 'client_id_owner_id',
                 'type': 'int'
             },
             {
                 'name': 'client_id_address',
                 'type': 'string'
             },
             {
                 'name': 'client_id_tel',
                 'type': 'string'
             },
             {
                 'name': 'client_id_fax',
                 'type': 'string'
             },
             {
                 'name': 'client_id_email',
                 'type': 'string'
             },
             {
                 'name': 'client_id_id',
                 'type': 'int'
             },
             {
                 'name': 'client_id_isOwner',
                 'type': 'int'
             },
             {
                 'name': 'client_id_logo_id',
                 'type': 'int'
             },
             {
                 'name': 'client_id_background_color',
                 'type': 'string'
             },
             {
                 'name': 'client_id_comptype',
                 'type': 'string'
             },
             {
                 'name': 'client_id_url',
                 'type': 'string'
             },
             {
                 'name': 'client_id_main_office_id',
                 'type': 'int'
             },
             {
                 'name': 'client_id_created_by',
                 'type': 'int'
             },
             {
                 'name': 'client_id_created_dt',
                 'type': 'date'
             },
             {
                 'name': 'client_id_updated_by',
                 'type': 'int'
             },
             {
                 'name': 'client_id_updated_dt',
                 'type': 'date'
             },
             {
                 'name': 'client_id_passwd',
                 'type': 'string'
             },
             {
                 'name': 'agency_id_code',
                 'type': 'string'
             },
             {
                 'name': 'agency_id_name',
                 'type': 'string'
             },
             {
                 'name': 'agency_id_remarks',
                 'type': 'string'
             },
             {
                 'name': 'agency_id_owner_id',
                 'type': 'int'
             },
             {
                 'name': 'agency_id_address',
                 'type': 'string'
             },
             {
                 'name': 'agency_id_tel',
                 'type': 'string'
             },
             {
                 'name': 'agency_id_fax',
                 'type': 'string'
             },
             {
                 'name': 'agency_id_email',
                 'type': 'string'
             },
             {
                 'name': 'agency_id_id',
                 'type': 'int'
             },
             {
                 'name': 'agency_id_isOwner',
                 'type': 'int'
             },
             {
                 'name': 'agency_id_logo_id',
                 'type': 'int'
             },
             {
                 'name': 'agency_id_background_color',
                 'type': 'string'
             },
             {
                 'name': 'agency_id_comptype',
                 'type': 'string'
             },
             {
                 'name': 'agency_id_url',
                 'type': 'string'
             },
             {
                 'name': 'agency_id_main_office_id',
                 'type': 'int'
             },
             {
                 'name': 'agency_id_created_by',
                 'type': 'int'
             },
             {
                 'name': 'agency_id_created_dt',
                 'type': 'date'
             },
             {
                 'name': 'agency_id_updated_by',
                 'type': 'int'
             },
             {
                 'name': 'agency_id_updated_dt',
                 'type': 'date'
             },
             {
                 'name': 'agency_id_passwd',
                 'type': 'string'
             },
             {
                 'name': 'team_id_id',
                 'type': 'int'
             },
             {
                 'name': 'team_id_name',
                 'type': 'string'
             },
             {
                 'name': 'team_id_type',
                 'type': 'int'
             },
             {
                 'name': 'team_id_leader',
                 'type': 'int'
             },
             {
                 'name': 'open_by_id',
                 'type': 'int'
             },
             {
                 'name': 'open_by_office_id',
                 'type': 'int'
             },
             {
                 'name': 'open_by_name',
                 'type': 'string'
             },
             {
                 'name': 'open_by_phone',
                 'type': 'string'
             },
             {
                 'name': 'open_by_fax',
                 'type': 'string'
             },
             {
                 'name': 'open_by_email',
                 'type': 'string'
             },
             {
                 'name': 'open_by_company_id',
                 'type': 'int'
             },
             {
                 'name': 'open_by_role',
                 'type': 'string'
             },
             {
                 'name': 'open_by_active',
                 'type': 'int'
             },
             {
                 'name': 'open_by_remarks',
                 'type': 'string'
             },
             {
                 'name': 'open_by_passwd',
                 'type': 'string'
             },
             {
                 'name': 'open_by_owner_id',
                 'type': 'int'
             },
             {
                 'name': 'open_by_lang',
                 'type': 'string'
             },
             {
                 'name': 'open_by_no_reset_sent',
                 'type': 'int'
             },
             {
                 'name': 'open_by_action_type',
                 'type': 'string'
             },
             {
                 'name': 'open_by_project_id',
                 'type': 'int'
             },
             {
                 'name': 'owner_id_id',
                 'type': 'int'
             },
             {
                 'name': 'owner_id_office_id',
                 'type': 'int'
             },
             {
                 'name': 'owner_id_name',
                 'type': 'string'
             },
             {
                 'name': 'owner_id_phone',
                 'type': 'string'
             },
             {
                 'name': 'owner_id_fax',
                 'type': 'string'
             },
             {
                 'name': 'owner_id_email',
                 'type': 'string'
             },
             {
                 'name': 'owner_id_company_id',
                 'type': 'int'
             },
             {
                 'name': 'owner_id_role',
                 'type': 'string'
             },
             {
                 'name': 'owner_id_active',
                 'type': 'int'
             },
             {
                 'name': 'owner_id_remarks',
                 'type': 'string'
             },
             {
                 'name': 'owner_id_passwd',
                 'type': 'string'
             },
             {
                 'name': 'owner_id_owner_id',
                 'type': 'int'
             },
             {
                 'name': 'owner_id_lang',
                 'type': 'string'
             },
             {
                 'name': 'owner_id_no_reset_sent',
                 'type': 'int'
             },
             {
                 'name': 'owner_id_action_type',
                 'type': 'string'
             },
             {
                 'name': 'owner_id_project_id',
                 'type': 'int'
             }
         ],
         id : 'id',
         root : 'data',
         totalProperty : 'total',
         xns : Roo.data,
         '|xns' : 'Roo.data',
         xtype : 'JsonReader'
        }
       },
       sm : {
        singleSelect : true,
        xns : Roo.grid,
        '|xns' : 'Roo.grid',
        xtype : 'RowSelectionModel',
        listeners : {
         afterselectionchange : function (_self)
          {
              // load project members.
          }
        }
       },
       colModel : [
        {
         dataIndex : 'type',
         header : _this._strings['a1fa27779242b4902f7ae3bdd5c6d508'] /* Type */,
         renderer : function(v) { return _this.grid.typeToString(v);},
         sortable : true,
         width : 70,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'client_id_name',
         header : _this._strings['577d7068826de925ea2aec01dbadf5e4'] /* Client */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 75,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'code',
         header : _this._strings['ca0dbad92a874b2f69b549293387925e'] /* Code */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 120,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'name',
         header : _this._strings['49ee3087348e8d44e1feda1917443987'] /* Name */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        }
       ]
      }
     }
    ]
   }
  };  }
});
