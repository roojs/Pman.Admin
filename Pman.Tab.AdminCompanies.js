//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminCompanies = new Roo.XComponent({

 _strings : {
  'ce8ae9da5b7cd6c3df2929543a9af92d' :"Email",
  '231bc72756b5e6de492aaaa1577f61b1' :"Remarks",
  'edefbda3a2bdd979e42d8944b7325b79' :"Companies",
  'ec211f7c20af43e742bf2570c3cb84f9' :"Add",
  'fc6f97505d89fe9277965c126744647a' :"No Companies found",
  '7dce122004969d56ae2e0245cb754d35' :"Edit",
  '68be4837f6c739877233e527a996dd00' :"Merge",
  '155ca6a755e25c15ad7ce45e2f638f10' :"Displaying Companies{0} - {1} of {2}",
  'f2a6c498fb90ee345d997f888fce3b18' :"Delete",
  'a1fa27779242b4902f7ae3bdd5c6d508' :"Type",
  '9c9745a343efeacc9efe9b7222b27afb' :"Ref#",
  '49ee3087348e8d44e1feda1917443987' :"Name",
  '2e006b735fbd916d8ab26978ae6714d4' :"Tel",
  'dd7bf230fde8d4836917806aff6a6b27' :"Address",
  '9810aa2b9f44401be4bf73188ef2b67d' :"Fax"
 },

  part     :  ["Admin", "Companies" ],
  order    : '030-Pman.Tab.AdminCompanies',
  region   : 'center',
  parent   : 'Pman.Tab.Admin',
  name     : "Pman.Tab.AdminCompanies",
  disabled : false, 
  permname : 'Admin.Companies', 
  _tree : function(_data)
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'NestedLayoutPanel',
   region : 'center',
   title : _this._strings['edefbda3a2bdd979e42d8944b7325b79'] /* Companies */,
   xns : Roo,
   '|xns' : 'Roo',
   layout : {
    xtype : 'BorderLayout',
    listeners : '',
    xns : Roo,
    '|xns' : 'Roo',
    center : {
     xtype : 'LayoutRegion',
     xns : Roo,
     '|xns' : 'Roo'
    },
    south : {
     xtype : 'LayoutRegion',
     height : 150,
     split : true,
     titlebar : true,
     xns : Roo,
     '|xns' : 'Roo'
    },
    items  : [
     {
      xtype : 'GridPanel',
      background : true,
      fitContainer : true,
      fitToframe : true,
      region : 'center',
      tableName : 'Companies',
      title : _this._strings['edefbda3a2bdd979e42d8944b7325b79'] /* Companies */,
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
              _this.dialog = Pman.Dialog.Companies;
             if (_this.panel.active) {
                this.footer.onClick('first');
             }
         },
        rowclick : function (_self, rowIndex, e)
         {
           try { Pman.Tab.AdminOffice.grid.footer.onClick('refresh'); } catch(e) {}
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
        displayMsg : _this._strings['155ca6a755e25c15ad7ce45e2f638f10'] /* Displaying Companies{0} - {1} of {2} */,
        emptyMsg : _this._strings['fc6f97505d89fe9277965c126744647a'] /* No Companies found */,
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
          listeners : {
           render : function (_self)
            {
            _this.searchBox = _self;
            },
           show : function (_self)
            {
            
            },
           specialkey : function (_self, e)
            {
             if (e.getKey() == 13) {
                 _this.grid.footer.onClick( 'first' );
              }
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
            _this.grid.footer.onClick('first');
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
                _this.grid.footer.onClick('first');
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
          icon : Roo.rootURL + 'images/default/tree/leaf.gif',
          text : _this._strings['68be4837f6c739877233e527a996dd00'] /* Merge */,
          listeners : {
           click : function()
            {
                var s = _this.grid.getSelectionModel().getSelections();
                
                if (!s.length || (s.length > 1))  {
                    Roo.MessageBox.alert("Error", s.length ? "Select only one Row" : "Select a Row");
                    return;
                }
                
                Pman.Dialog.AdminCompanyMerge.show(s[0].data, function() {
                    _this.grid.footer.onClick('first');
                }); 
                
            }
          },
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         },
         {
          xtype : 'Separator',
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         },
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
                _this.dialog.show( { id : 0 } , function() {
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
                 Pman.genericDelete(_this, 'Companies'); 
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
             o.params = o.params || {};
             try {
                 o.params['query[name]'] = _this.searchBox.getValue();
             } catch(e) { return false; }
          },
         load : function (_self, records, options)
          {
             try {
                  Pman.Tab.AdminOffice.grid.footer.onClick('refresh');
              } catch (e) {}
          }
        },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         url : baseURL + '/Roo/core_company',
         listeners : {
          load : function (This, o, arg)
           {
            
           }
         },
         xns : Roo.data,
         '|xns' : 'Roo.data'
        },
        reader : {
         xtype : 'JsonReader',
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
                 'type': 'date',
                 'dateFormat': 'Y-m-d'
             },
             {
                 'name': 'updated_by',
                 'type': 'int'
             },
             {
                 'name': 'updated_dt',
                 'type': 'date',
                 'dateFormat': 'Y-m-d'
             },
             {
                 'name': 'passwd',
                 'type': 'string'
             },
             {
                 'name': 'dispatch_port',
                 'type': 'string'
             },
             {
                 'name': 'province',
                 'type': 'string'
             },
             {
                 'name': 'country',
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
                 'type': 'date'
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
                 'name': 'owner_id_deleted_by',
                 'type': 'int'
             },
             {
                 'name': 'owner_id_deleted_dt',
                 'type': 'date'
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
         '|xns' : 'Roo.data'
        }
       },
       colModel : [
        {
         xtype : 'ColumnModel',
         dataIndex : 'comptype',
         header : _this._strings['a1fa27779242b4902f7ae3bdd5c6d508'] /* Type */,
         renderer : function (v,x ,r) {
             //return Pman.Dialog.Companies.comptypeListToString(r.data.isOwner ? 'OWNER' : v);
             return v;
         },
         sortable : true,
         width : 90,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'code',
         header : _this._strings['9c9745a343efeacc9efe9b7222b27afb'] /* Ref# */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 50,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'name',
         header : _this._strings['49ee3087348e8d44e1feda1917443987'] /* Name */,
         renderer : function(v,x,r) {
             return String.format(r.data.comptype == 'OWNER' ? '<B>{0}</B>' : '{0}',v);    
         },
         sortable : true,
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'tel',
         header : _this._strings['2e006b735fbd916d8ab26978ae6714d4'] /* Tel */,
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
         sortable : true,
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'address',
         header : _this._strings['dd7bf230fde8d4836917806aff6a6b27'] /* Address */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'remarks',
         header : _this._strings['231bc72756b5e6de492aaaa1577f61b1'] /* Remarks */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        }
       ]
      }
     }
    ]
   }
  };  }
});
