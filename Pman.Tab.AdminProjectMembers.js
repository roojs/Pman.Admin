//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminProjectMembers = new Roo.XComponent({

 _strings : {
  '858ba4765e53c712ef672a9570474b1d' :"Member",
  'ce8ae9da5b7cd6c3df2929543a9af92d' :"Email",
  '1c76cbfe21c6f44c1d1e59d54f3e4420' :"Company",
  '7cdc93ea9b163a546146172299bb0b38' :"Owners",
  'ef53538ae41a651c7f72ab6cb1135d8c' :"Members",
  '8f7f93630c366dc55aec88eb8e9640d0' :"Staff",
  '6311ae17c1ee52b36e68aaf4ad066387' :"Other",
  '40bed7cf9b3d4bb3a3d7a7e3eb18c5eb' :"Person",
  'f1174ecbbc232f948717979daf04cf08' :"No Person found",
  '49ee3087348e8d44e1feda1917443987' :"Name",
  'd41d8cd98f00b204e9800998ecf8427e' :" "
 },

  part     :  ["Admin", "ProjectMembers" ],
  order    : '001-Pman.Tab.AdminProjectMembers',
  region   : 'center',
  parent   : 'Pman.Tab.AdminProjectManager',
  name     : "Pman.Tab.AdminProjectMembers",
  disabled : false, 
  permname : '', 
  _tree : function()
  {
   var _this = this;
   var MODULE = this;
   return {
   background : true,
   fitContainer : true,
   fitToframe : true,
   region : 'east',
   tableName : 'Person',
   title : _this._strings['40bed7cf9b3d4bb3a3d7a7e3eb18c5eb'] /* Person */,
   xns : Roo,
   '|xns' : 'Roo',
   xtype : 'GridPanel',
   listeners : {
    activate : function() {
         _this.panel = this;
         if (_this.grid) {
             _this.grid.footer.onClick('first');
         }
     }
   },
   grid : {
    autoExpandColumn : 'name',
    filter : 'S',
    loadMask : true,
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
          _this.dialog.show( this.getDataSource().getAt(rowIndex), function() {
              _this.grid.footer.onClick('first');
          }); 
      }
    },
    footer : {
     displayInfo : true,
     displayMsg : _this._strings['d41d8cd98f00b204e9800998ecf8427e'] /*   */,
     emptyMsg : _this._strings['f1174ecbbc232f948717979daf04cf08'] /* No Person found */,
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
       enableToggle : true,
       pressed : true,
       text : _this._strings['8f7f93630c366dc55aec88eb8e9640d0'] /* Staff */,
       toggleGroup : 'appm',
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar',
       xtype : 'Button',
       listeners : {
        toggle : function (_self, pressed)
         {
             if (pressed) {
                 _this.grid.filter = 'S';
             }
             _this.grid.footer.onClick('first');
         }
       }
      },
      {
       enableToggle : true,
       text : _this._strings['7cdc93ea9b163a546146172299bb0b38'] /* Owners */,
       toggleGroup : 'appm',
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar',
       xtype : 'Button',
       listeners : {
        toggle : function (_self, pressed)
         {
             if (pressed) {
                 _this.grid.filter = 'O';
             }
             _this.grid.footer.onClick('first');
         }
       }
      },
      {
       enableToggle : true,
       text : _this._strings['6311ae17c1ee52b36e68aaf4ad066387'] /* Other */,
       toggleGroup : 'appm',
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar',
       xtype : 'Button',
       listeners : {
        toggle : function (_self, pressed)
         {
             if (pressed) {
                 _this.grid.filter = 'A';
             }
             _this.grid.footer.onClick('first');
         }
       }
      },
      {
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar',
       xtype : 'Fill'
      },
      {
       enableToggle : true,
       text : _this._strings['ef53538ae41a651c7f72ab6cb1135d8c'] /* Members */,
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar',
       xtype : 'Button',
       listeners : {
        render : function (_self)
         {
             _this.memberBtn = _self;
         },
        toggle : function (_self, pressed)
         {
            
             _this.grid.footer.onClick('first');
         }
       }
      }
     ]
    },
    dataSource : {
     remoteSort : true,
     sortInfo : { field : 'name', direction: 'ASC' },
     xns : Roo.data,
     '|xns' : 'Roo.data',
     xtype : 'Store',
     listeners : {
      beforeload : function (_self, options)
       {
           if (!_this.memberBtn) {
               return false;
           }
           options.params['query[project_member_filter]'] = _this.memberBtn.pressed ? 1 :0;
           var pm = Pman ? Pman.Tab.AdminProjectManager :false;
           if (!pm || !pm.grid || !pm.grid.getSelectionModel().getSelected()) {
               return false;
           }
           var sel = pm.grid.getSelectionModel().getSelected();
           options.params['query[project_member_of]'] = sel.data.id;    
           switch(_this.grid.filter) {
               case 'S': // staff
                   options.params.company_id_comptype='OWNER';
       
                   break;
               case 'O': // owner..
                   options.params.company_id = sel.data.client_id;
                   break;
               case 'A': // not owner or staff..
                   options.params['!company_id'] = sel.data.client_id;
                   options.params['!company_id_comptype'] ='OWNER';
                   break;      
           }
           
       }
     },
     proxy : {
      method : 'GET',
      url : baseURL + '/Roo/core_person',
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
              'name': 'office_id',
              'type': 'int'
          },
          {
              'name': 'name',
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
              'name': 'company_id',
              'type': 'int'
          },
          {
              'name': 'role',
              'type': 'string'
          },
          {
              'name': 'active',
              'type': 'int'
          },
          {
              'name': 'remarks',
              'type': 'string'
          },
          {
              'name': 'passwd',
              'type': 'string'
          },
          {
              'name': 'owner_id',
              'type': 'int'
          },
          {
              'name': 'lang',
              'type': 'string'
          },
          {
              'name': 'no_reset_sent',
              'type': 'int'
          },
          {
              'name': 'action_type',
              'type': 'string'
          },
          {
              'name': 'project_id',
              'type': 'int'
          },
          {
              'name': 'office_id_id',
              'type': 'int'
          },
          {
              'name': 'office_id_company_id',
              'type': 'int'
          },
          {
              'name': 'office_id_name',
              'type': 'string'
          },
          {
              'name': 'office_id_address',
              'type': 'string'
          },
          {
              'name': 'office_id_phone',
              'type': 'string'
          },
          {
              'name': 'office_id_fax',
              'type': 'string'
          },
          {
              'name': 'office_id_email',
              'type': 'string'
          },
          {
              'name': 'office_id_role',
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
              'name': 'project_id_id',
              'type': 'int'
          },
          {
              'name': 'project_id_name',
              'type': 'string'
          },
          {
              'name': 'project_id_remarks',
              'type': 'string'
          },
          {
              'name': 'project_id_owner_id',
              'type': 'int'
          },
          {
              'name': 'project_id_code',
              'type': 'string'
          },
          {
              'name': 'project_id_active',
              'type': 'int'
          },
          {
              'name': 'project_id_type',
              'type': 'string'
          },
          {
              'name': 'project_id_client_id',
              'type': 'int'
          },
          {
              'name': 'project_id_team_id',
              'type': 'int'
          },
          {
              'name': 'project_id_file_location',
              'type': 'string'
          },
          {
              'name': 'project_id_open_date',
              'type': 'date'
          },
          {
              'name': 'project_id_open_by',
              'type': 'int'
          },
          {
              'name': 'project_id_close_date',
              'type': 'date'
          },
          {
              'name': 'project_id_countries',
              'type': 'string'
          },
          {
              'name': 'project_id_languages',
              'type': 'string'
          },
          {
              'name': 'project_id_agency_id',
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
    colModel : [
     {
      dataIndex : 'is_member',
      header : _this._strings['858ba4765e53c712ef672a9570474b1d'] /* Member */,
      renderer : function(v) { return String.format('{0}', v); },
      width : 60,
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
     },
     {
      dataIndex : 'email',
      header : _this._strings['ce8ae9da5b7cd6c3df2929543a9af92d'] /* Email */,
      renderer : function(v) { return String.format('{0}', v); },
      sortable : true,
      width : 100,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'company_id_name',
      header : _this._strings['1c76cbfe21c6f44c1d1e59d54f3e4420'] /* Company */,
      renderer : function(v) { return String.format('{0}', v); },
      sortable : true,
      width : 120,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     }
    ]
   }
  };  }
});
