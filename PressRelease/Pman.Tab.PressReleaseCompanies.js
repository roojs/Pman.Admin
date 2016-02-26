//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.PressReleaseCompanies = new Roo.XComponent({

 _strings : {
  '1c76cbfe21c6f44c1d1e59d54f3e4420' :"Company",
  'edefbda3a2bdd979e42d8944b7325b79' :"Companies",
  'd41d8cd98f00b204e9800998ecf8427e' :"",
  '82ce4fe96406ad6e0ea917c6e4104f60' :"Clear Selection",
  'f2a6c498fb90ee345d997f888fce3b18' :"Delete"
 },

  part     :  ["PressRelease", "Companies" ],
  order    : '001-Pman.Tab.PressReleaseCompanies',
  region   : 'center',
  parent   : 'Pman.Tab.PressReleaseTab',
  name     : "Company List",
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
   region : 'west',
   tableName : 'Companies',
   title : _this._strings['edefbda3a2bdd979e42d8944b7325b79'] /* Companies */,
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
    autoExpandColumn : 'code',
    loadMask : true,
    xns : Roo.grid,
    '|xns' : 'Roo.grid',
    xtype : 'Grid',
    listeners : {
     render : function() { 
          _this.grid = this; 
          //_this.dialog = Pman.Dialog.FILL_IN
          if (_this.panel.active) {
             this.footer.onClick('first');
          }
      }
    },
    footer : {
     displayInfo : true,
     displayMsg : _this._strings['d41d8cd98f00b204e9800998ecf8427e'] /*  */,
     emptyMsg : _this._strings['d41d8cd98f00b204e9800998ecf8427e'] /*  */,
     pageSize : 50,
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
       text : _this._strings['82ce4fe96406ad6e0ea917c6e4104f60'] /* Clear Selection */,
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar',
       xtype : 'Button',
       listeners : {
        click : function (_self, e)
         {
               var sm =      _this.grid.getSelectionModel();
              sm.clearSelections();
              sm.fireEvent('afterselectionchange',sm);
              
             
         }
       }
      },
      {
       text : _this._strings['f2a6c498fb90ee345d997f888fce3b18'] /* Delete */,
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar',
       xtype : 'Button',
       listeners : {
        click : function (_self, e)
         {
          
              var sm =      _this.grid.getSelectionModel().getSelected();
             if (!sm) { 
                 Roo.MessageBox.alert("Error", "Select a Company to Delete");
                 return;
             }
             new Pman.Request({
                 url : baseURL + '/Roo/Companies',
                 method : 'POST',
                 params : {
                     _delete : sm.data.id
                 },
                 success : function(e) {
                     _this.grid.footer.onClick('refresh');
                 }
             });
              
         }
       }
      }
     ]
    },
    dataSource : {
     reader : Pman.Readers.Companies,
     remoteSort : true,
     sortInfo : { field: 'name', direction : 'ASC' },
     xns : Roo.data,
     '|xns' : 'Roo.data',
     xtype : 'Store',
     listeners : {
      beforeload : function (_self, o)
       {
         o.params['!id'] = Pman.Login.authUser.company_id;
         o.params['comptype[0]'] = 'CLIENT';
        o.params['comptype[1]'] = 'AGENCY';
       },
      load : function (_self, records, options)
       {
           try {
               var g = Pman.Tab.PressReleaseTab.layout.getRegion('center').getActivePanel().grid;
               g.footer.onClick('first');
           } catch(e) {
           }
       }
     },
     proxy : {
      method : 'GET',
      url : baseURL + '/Roo/Companies.php',
      xns : Roo.data,
      '|xns' : 'Roo.data',
      xtype : 'HttpProxy'
     },
     reader : {
      fields : [
          {
              'name': 'code',
              'type': 'string'
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
              'name': 'address',
              'type': 'string'
          },
          {
              'name': 'tel',
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
              'name': 'id',
              'type': 'int'
          },
          {
              'name': 'isOwner',
              'type': 'int'
          },
          {
              'name': 'logo_id',
              'type': 'int'
          },
          {
              'name': 'background_color',
              'type': 'string'
          },
          {
              'name': 'comptype',
              'type': 'string'
          },
          {
              'name': 'url',
              'type': 'string'
          },
          {
              'name': 'main_office_id',
              'type': 'int'
          },
          {
              'name': 'created_by',
              'type': 'int'
          },
          {
              'name': 'created_dt',
              'type': 'string'
          },
          {
              'name': 'updated_by',
              'type': 'int'
          },
          {
              'name': 'updated_dt',
              'type': 'string'
          },
          {
              'name': 'passwd',
              'type': 'string'
          },
          {
              'name': 'logo_id_id',
              'type': 'int'
          },
          {
              'name': 'logo_id_filename',
              'type': 'string'
          },
          {
              'name': 'logo_id_ontable',
              'type': 'string'
          },
          {
              'name': 'logo_id_onid',
              'type': 'int'
          },
          {
              'name': 'logo_id_mimetype',
              'type': 'string'
          },
          {
              'name': 'logo_id_width',
              'type': 'int'
          },
          {
              'name': 'logo_id_height',
              'type': 'int'
          },
          {
              'name': 'logo_id_filesize',
              'type': 'int'
          },
          {
              'name': 'logo_id_displayorder',
              'type': 'int'
          },
          {
              'name': 'logo_id_language',
              'type': 'string'
          },
          {
              'name': 'logo_id_parent_image_id',
              'type': 'int'
          },
          {
              'name': 'logo_id_created',
              'type': 'string'
          },
          {
              'name': 'logo_id_imgtype',
              'type': 'string'
          },
          {
              'name': 'logo_id_linkurl',
              'type': 'string'
          },
          {
              'name': 'logo_id_descript',
              'type': 'string'
          },
          {
              'name': 'logo_id_title',
              'type': 'string'
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
          },
          {
              'name': 'main_office_id_id',
              'type': 'int'
          },
          {
              'name': 'main_office_id_company_id',
              'type': 'int'
          },
          {
              'name': 'main_office_id_name',
              'type': 'string'
          },
          {
              'name': 'main_office_id_address',
              'type': 'string'
          },
          {
              'name': 'main_office_id_phone',
              'type': 'string'
          },
          {
              'name': 'main_office_id_fax',
              'type': 'string'
          },
          {
              'name': 'main_office_id_email',
              'type': 'string'
          },
          {
              'name': 'main_office_id_role',
              'type': 'string'
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
    selModel : {
     xns : Roo.grid,
     '|xns' : 'Roo.grid',
     xtype : 'RowSelectionModel',
     listeners : {
      afterselectionchange : function (_self)
       {
           if (    Pman.Tab.PressReleaseImages.panel.active) {
               Pman.Tab.PressReleaseImages.grid.footer.onClick('first');
           }
           if (    Pman.Tab.PressReleaseEntry.panel.active) {
               Pman.Tab.PressReleaseEntry.grid.footer.onClick('first');
           }
           
       }
     }
    },
    colModel : [
     {
      dataIndex : 'name',
      header : _this._strings['1c76cbfe21c6f44c1d1e59d54f3e4420'] /* Company */,
      renderer : function(v) { return String.format('{0}', v); },
      width : 100,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     }
    ]
   }
  };  }
});
