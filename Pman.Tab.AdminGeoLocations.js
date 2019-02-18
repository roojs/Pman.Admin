//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminGeoLocations = new Roo.XComponent({

 _strings : {
  'f2b734f9d29a7b036a5f26b229f1e918' :"Geographic Locations",
  '59716c97497eb9694541f7c3d37b1a4d' :"Country",
  'ec211f7c20af43e742bf2570c3cb84f9' :"Add",
  'fc6f97505d89fe9277965c126744647a' :"No Companies found",
  'aa186c44d0c1a9b263933bfa359802e3' :"Select Province",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  '68be4837f6c739877233e527a996dd00' :"Merge",
  '155ca6a755e25c15ad7ce45e2f638f10' :"Displaying Companies{0} - {1} of {2}",
  '57d056ed0984166336b7879c2af3657f' :"City",
  'c6b5d0bb9a0c3f077863fdaef9773f7c' :"Province",
  '26cbe1e3b53e773d1bdf15fb4912c2e0' :"search name",
  '49ee3087348e8d44e1feda1917443987' :"Name",
  '4d3d769b812b6faa6b76e1a8abaece2d' :"Active"
 },

  part     :  ["Admin", "GeoLocations" ],
  order    : '100-Pman.Tab.AdminGeoLocations',
  region   : 'center',
  parent   : 'Pman.Tab.Admin',
  name     : "unnamed module",
  disabled : false, 
  permname : '', 
  _tree : function(_data)
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'NestedLayoutPanel',
   background : true,
   region : 'center',
   title : _this._strings['f2b734f9d29a7b036a5f26b229f1e918'] /* Geographic Locations */,
   xns : Roo,
   '|xns' : 'Roo',
   layout : {
    xtype : 'BorderLayout',
    xns : Roo,
    '|xns' : 'Roo',
    center : {
     xtype : 'LayoutRegion',
     alwaysShowTabs : true,
     tabPosition : 'top',
     xns : Roo,
     '|xns' : 'Roo'
    },
    east : {
     xtype : 'LayoutRegion',
     alwaysShowTabs : true,
     split : true,
     tabPosition : 'top',
     width : 400,
     xns : Roo,
     '|xns' : 'Roo'
    },
    west : {
     xtype : 'LayoutRegion',
     alwaysShowTabs : true,
     split : true,
     tabPosition : 'top',
     width : 400,
     xns : Roo,
     '|xns' : 'Roo'
    },
    items  : [
     {
      xtype : 'GridPanel',
      fitContainer : true,
      fitToframe : true,
      region : 'west',
      tableName : 'i18n',
      title : _this._strings['59716c97497eb9694541f7c3d37b1a4d'] /* Country */,
      listeners : {
       activate : function() {
            
            _this.country_panel = this;
            if (_this.country_grid) {
                _this.country_grid.footer.onClick('first');
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
            _this.country_grid = this; 
            
             if (_this.country_panel.active) {
                this.footer.onClick('first');
             }
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
          emptyText : _this._strings['26cbe1e3b53e773d1bdf15fb4912c2e0'] /* search name */,
          listeners : {
           render : function (_self)
            {
              _this.searchBox = _self;
            },
           specialkey : function (_self, e)
            {
                 if (e.getKey() == 13) {
                    _this.grid.footer.onClick('first');
                 }
            }
          },
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'ComboBox',
          allowBlank : false,
          displayField : 'province',
          editable : true,
          emptyText : _this._strings['aa186c44d0c1a9b263933bfa359802e3'] /* Select Province */,
          forceSelection : true,
          listWidth : 300,
          loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
          minChars : 2,
          pageSize : 20,
          qtip : _this._strings['aa186c44d0c1a9b263933bfa359802e3'] /* Select Province */,
          queryParam : 'query[province]',
          selectOnFocus : true,
          tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{province}</b> </div>',
          triggerAction : 'all',
          typeAhead : true,
          valueField : 'province',
          width : 150,
          listeners : {
           beforeselect : function (combo, record, index)
            {
              var f = _this.grid.footer;
              f.onClick.defer(100, f, [ 'first' ]);
            },
           render : function (_self)
            {
              _this.provinceCombo = _self;
            }
          },
          xns : Roo.form,
          '|xns' : 'Roo.form',
          store : {
           xtype : 'Store',
           remoteSort : true,
           sortInfo : { direction : 'ASC', field: 'province' },
           listeners : {
            beforeload : function (_self, o){
                 o.params = o.params || {};
              
                  o.params._distinct = 'province';
              
                 // set more here
             }
           },
           xns : Roo.data,
           '|xns' : 'Roo.data',
           proxy : {
            xtype : 'HttpProxy',
            method : 'GET',
            url : baseURL + '/Roo/core_company.php',
            xns : Roo.data,
            '|xns' : 'Roo.data'
           },
           reader : {
            xtype : 'JsonReader',
            fields : [{"name":"id","type":"int"},{"name":"province","type":"string"}],
            id : 'id',
            root : 'data',
            totalProperty : 'total',
            xns : Roo.data,
            '|xns' : 'Roo.data'
           }
          }
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
               _this.provinceCombo.setValue('');
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
          icon : Roo.rootURL + 'images/default/dd/drop-add.gif',
          text : _this._strings['ec211f7c20af43e742bf2570c3cb84f9'] /* Add */,
          listeners : {
           click : function()
            {
               _this.grid.getSelectionModel().clearSelections();
               _this.form.reset();
                _this.form.setValues({ id: 0, comptype : 'SUPPLIER' });
               // hide files..
               _this.layout.getRegion('east').show();
               _this.layout.getRegion('east').hidePanel(1);
                 _this.panel.layout.getRegion('east').el.unmask(0);
               _this.layout.getRegion('east').showPanel(0);     
               //yourdialog.show( { id : 0 } , function() {
               //  _this.grid.footer.onClick('first');
               //}); 
            }
          },
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         },
         {
          xtype : 'Button',
          cls : 'x-btn-text-icon',
          icon : rootURL + '/Pman/templates/images/trash.gif',
          text : _this._strings['68be4837f6c739877233e527a996dd00'] /* Merge */,
          listeners : {
           click : function()
            {
                var s = _this.grid.getSelectionModel().getSelections();
                
                if (!s.length)  {
                    Roo.MessageBox.alert("Error", "Select a Row");
                    return;
                }
                
                var ids = [];
                var names = [];
                
                var params = {};
                
                params['query[comptype]'] = 'SUPPLIER,OLDSUPPL';
                
                Roo.each(s, function(v, k){
                    ids.push(v.data.id);
                    names.push(v.data.name);
                    params['!id[' + k + ']'] = v.data.id
                });
                
                Pman.Dialog.ShippingSupplierMerge.show({ 
                    _merge_from : ids.join(','),
                    _name : names.join(', '),
                    type: 'Supplier',
                    params : params
                }, function() {
                    _this.grid.footer.onClick('refresh');
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
        sortInfo : { field: 'lval', direction: 'ASC' },
        listeners : {
         beforeload : function (_self, options)
          {
              options.params = options.params || {};
              
              options.params.ltype = 'c',
              options.params.inlang = 'en';
              options.is_active = 1;
          },
         load : function (_self, records, options)
          {
              if (_this.grid.getSelectionModel().getSelected()) {
                  _this.grid.getSelectionModel().fireEvent('afterselectionchange', _this.grid.getSelectionModel());
              }
              if (!_this.grid.getSelectionModel().getSelected() && this.getTotalCount() == 1) {
                 
                  _this.grid.getSelectionModel().selectFirstRow();
                    _this.grid.getSelectionModel().fireEvent('afterselectionchange', _this.grid.getSelectionModel());
              }
          }
        },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         url : baseURL + '/Roo/core_company.php',
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
         '|xns' : 'Roo.data'
        }
       },
       sm : {
        xtype : 'RowSelectionModel',
        singleSelect : true,
        listeners : {
         afterselectionchange : function (_self)
          {
              
          }
        },
        xns : Roo.grid,
        '|xns' : 'Roo.grid'
       },
       colModel : [
        {
         xtype : 'ColumnModel',
         dataIndex : 'name',
         header : _this._strings['49ee3087348e8d44e1feda1917443987'] /* Name */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'comptype',
         header : _this._strings['4d3d769b812b6faa6b76e1a8abaece2d'] /* Active */,
         renderer : function(v) { return v.match(/OLD/) ? 'OLD' : v ; },
         sortable : true,
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'province',
         header : _this._strings['c6b5d0bb9a0c3f077863fdaef9773f7c'] /* Province */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'country_display_name',
         header : _this._strings['59716c97497eb9694541f7c3d37b1a4d'] /* Country */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        }
       ]
      }
     },
     {
      xtype : 'GridPanel',
      fitContainer : true,
      fitToframe : true,
      region : 'center',
      tableName : 'geoip_division',
      title : _this._strings['c6b5d0bb9a0c3f077863fdaef9773f7c'] /* Province */,
      listeners : {
       activate : function() {
            _this.cpanel = this;
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
             //_this.dialog = Pman.Dialog.FILL_IN
             if (_this.cpanel.active) {
                this.footer.onClick('first');
             }
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
          emptyText : _this._strings['26cbe1e3b53e773d1bdf15fb4912c2e0'] /* search name */,
          listeners : {
           render : function (_self)
            {
              _this.searchBox = _self;
            },
           specialkey : function (_self, e)
            {
                 if (e.getKey() == 13) {
                    _this.grid.footer.onClick('first');
                 }
            }
          },
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'ComboBox',
          allowBlank : false,
          displayField : 'province',
          editable : true,
          emptyText : _this._strings['aa186c44d0c1a9b263933bfa359802e3'] /* Select Province */,
          forceSelection : true,
          listWidth : 300,
          loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
          minChars : 2,
          pageSize : 20,
          qtip : _this._strings['aa186c44d0c1a9b263933bfa359802e3'] /* Select Province */,
          queryParam : 'query[province]',
          selectOnFocus : true,
          tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{province}</b> </div>',
          triggerAction : 'all',
          typeAhead : true,
          valueField : 'province',
          width : 150,
          listeners : {
           beforeselect : function (combo, record, index)
            {
              var f = _this.grid.footer;
              f.onClick.defer(100, f, [ 'first' ]);
            },
           render : function (_self)
            {
              _this.provinceCombo = _self;
            }
          },
          xns : Roo.form,
          '|xns' : 'Roo.form',
          store : {
           xtype : 'Store',
           remoteSort : true,
           sortInfo : { direction : 'ASC', field: 'province' },
           listeners : {
            beforeload : function (_self, o){
                 o.params = o.params || {};
              
                  o.params._distinct = 'province';
              
                 // set more here
             }
           },
           xns : Roo.data,
           '|xns' : 'Roo.data',
           proxy : {
            xtype : 'HttpProxy',
            method : 'GET',
            url : baseURL + '/Roo/core_company.php',
            xns : Roo.data,
            '|xns' : 'Roo.data'
           },
           reader : {
            xtype : 'JsonReader',
            fields : [{"name":"id","type":"int"},{"name":"province","type":"string"}],
            id : 'id',
            root : 'data',
            totalProperty : 'total',
            xns : Roo.data,
            '|xns' : 'Roo.data'
           }
          }
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
               _this.provinceCombo.setValue('');
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
          icon : Roo.rootURL + 'images/default/dd/drop-add.gif',
          text : _this._strings['ec211f7c20af43e742bf2570c3cb84f9'] /* Add */,
          listeners : {
           click : function()
            {
               _this.grid.getSelectionModel().clearSelections();
               _this.form.reset();
                _this.form.setValues({ id: 0, comptype : 'SUPPLIER' });
               // hide files..
               _this.layout.getRegion('east').show();
               _this.layout.getRegion('east').hidePanel(1);
                 _this.panel.layout.getRegion('east').el.unmask(0);
               _this.layout.getRegion('east').showPanel(0);     
               //yourdialog.show( { id : 0 } , function() {
               //  _this.grid.footer.onClick('first');
               //}); 
            }
          },
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         },
         {
          xtype : 'Button',
          cls : 'x-btn-text-icon',
          icon : rootURL + '/Pman/templates/images/trash.gif',
          text : _this._strings['68be4837f6c739877233e527a996dd00'] /* Merge */,
          listeners : {
           click : function()
            {
                var s = _this.grid.getSelectionModel().getSelections();
                
                if (!s.length)  {
                    Roo.MessageBox.alert("Error", "Select a Row");
                    return;
                }
                
                var ids = [];
                var names = [];
                
                var params = {};
                
                params['query[comptype]'] = 'SUPPLIER,OLDSUPPL';
                
                Roo.each(s, function(v, k){
                    ids.push(v.data.id);
                    names.push(v.data.name);
                    params['!id[' + k + ']'] = v.data.id
                });
                
                Pman.Dialog.ShippingSupplierMerge.show({ 
                    _merge_from : ids.join(','),
                    _name : names.join(', '),
                    type: 'Supplier',
                    params : params
                }, function() {
                    _this.grid.footer.onClick('refresh');
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
        sortInfo : { field: 'name', direction: 'ASC' },
        listeners : {
         beforeload : function (_self, options)
          {
             if ( _this.layout) {
                //_this.layout.getRegion('east').hide() ;
                }
              options.params['query[comptype]'] ='SUPPLIER,OLDSUPPL'; // base on pulldown..
              options.params['query[name]'] = _this.searchBox.getValue();
              if (_this.provinceCombo.getValue()) {
                 options.params['province'] = _this.provinceCombo.getValue();
             }
          },
         load : function (_self, records, options)
          {
              if (_this.grid.getSelectionModel().getSelected()) {
                  _this.grid.getSelectionModel().fireEvent('afterselectionchange', _this.grid.getSelectionModel());
              }
              if (!_this.grid.getSelectionModel().getSelected() && this.getTotalCount() == 1) {
                 
                  _this.grid.getSelectionModel().selectFirstRow();
                    _this.grid.getSelectionModel().fireEvent('afterselectionchange', _this.grid.getSelectionModel());
              }
          }
        },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         url : baseURL + '/Roo/core_company.php',
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
         '|xns' : 'Roo.data'
        }
       },
       sm : {
        xtype : 'RowSelectionModel',
        singleSelect : false,
        listeners : {
         afterselectionchange : function (_self)
          {
              if (!this.getSelections().length) {
                  if (_this.form) { _this.form.reset(); }
                  _this.panel.layout.getRegion('east').el.mask("Select Supplier");
                  _this.panel.layout.getRegion('south').el.mask("Select Supplier");
                  return;
              }
              
              if (_this.form) {
                 _this.form.setValues(
                      _this.grid.getDataSource().getById(this.getSelected().data.id).data
                  );
              }
          
              _this.pgrid.footer.onClick('first'); // load people.
              _this.panel.layout.getRegion('east').el.unmask();
              _this.panel.layout.getRegion('south').el.unmask();
              
              _this.panel.layout.getRegion('east').showPanel(0);
             
              if(this.getSelections().length > 1) {
                  _this.panel.layout.getRegion('east').el.mask("Unable to Update");
                  _this.panel.layout.getRegion('south').el.mask("Unable to Update");
              }
              
          }
        },
        xns : Roo.grid,
        '|xns' : 'Roo.grid'
       },
       colModel : [
        {
         xtype : 'ColumnModel',
         dataIndex : 'name',
         header : _this._strings['49ee3087348e8d44e1feda1917443987'] /* Name */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'comptype',
         header : _this._strings['4d3d769b812b6faa6b76e1a8abaece2d'] /* Active */,
         renderer : function(v) { return v.match(/OLD/) ? 'OLD' : v ; },
         sortable : true,
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'province',
         header : _this._strings['c6b5d0bb9a0c3f077863fdaef9773f7c'] /* Province */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'country_display_name',
         header : _this._strings['59716c97497eb9694541f7c3d37b1a4d'] /* Country */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        }
       ]
      }
     },
     {
      xtype : 'GridPanel',
      fitContainer : true,
      fitToframe : true,
      region : 'east',
      tableName : 'geoip_city',
      title : _this._strings['57d056ed0984166336b7879c2af3657f'] /* City */,
      listeners : {
       activate : function() {
            _this.cpanel = this;
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
             //_this.dialog = Pman.Dialog.FILL_IN
             if (_this.cpanel.active) {
                this.footer.onClick('first');
             }
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
          emptyText : _this._strings['26cbe1e3b53e773d1bdf15fb4912c2e0'] /* search name */,
          listeners : {
           render : function (_self)
            {
              _this.searchBox = _self;
            },
           specialkey : function (_self, e)
            {
                 if (e.getKey() == 13) {
                    _this.grid.footer.onClick('first');
                 }
            }
          },
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'ComboBox',
          allowBlank : false,
          displayField : 'province',
          editable : true,
          emptyText : _this._strings['aa186c44d0c1a9b263933bfa359802e3'] /* Select Province */,
          forceSelection : true,
          listWidth : 300,
          loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
          minChars : 2,
          pageSize : 20,
          qtip : _this._strings['aa186c44d0c1a9b263933bfa359802e3'] /* Select Province */,
          queryParam : 'query[province]',
          selectOnFocus : true,
          tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{province}</b> </div>',
          triggerAction : 'all',
          typeAhead : true,
          valueField : 'province',
          width : 150,
          listeners : {
           beforeselect : function (combo, record, index)
            {
              var f = _this.grid.footer;
              f.onClick.defer(100, f, [ 'first' ]);
            },
           render : function (_self)
            {
              _this.provinceCombo = _self;
            }
          },
          xns : Roo.form,
          '|xns' : 'Roo.form',
          store : {
           xtype : 'Store',
           remoteSort : true,
           sortInfo : { direction : 'ASC', field: 'province' },
           listeners : {
            beforeload : function (_self, o){
                 o.params = o.params || {};
              
                  o.params._distinct = 'province';
              
                 // set more here
             }
           },
           xns : Roo.data,
           '|xns' : 'Roo.data',
           proxy : {
            xtype : 'HttpProxy',
            method : 'GET',
            url : baseURL + '/Roo/core_company.php',
            xns : Roo.data,
            '|xns' : 'Roo.data'
           },
           reader : {
            xtype : 'JsonReader',
            fields : [{"name":"id","type":"int"},{"name":"province","type":"string"}],
            id : 'id',
            root : 'data',
            totalProperty : 'total',
            xns : Roo.data,
            '|xns' : 'Roo.data'
           }
          }
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
               _this.provinceCombo.setValue('');
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
          icon : Roo.rootURL + 'images/default/dd/drop-add.gif',
          text : _this._strings['ec211f7c20af43e742bf2570c3cb84f9'] /* Add */,
          listeners : {
           click : function()
            {
               _this.grid.getSelectionModel().clearSelections();
               _this.form.reset();
                _this.form.setValues({ id: 0, comptype : 'SUPPLIER' });
               // hide files..
               _this.layout.getRegion('east').show();
               _this.layout.getRegion('east').hidePanel(1);
                 _this.panel.layout.getRegion('east').el.unmask(0);
               _this.layout.getRegion('east').showPanel(0);     
               //yourdialog.show( { id : 0 } , function() {
               //  _this.grid.footer.onClick('first');
               //}); 
            }
          },
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         },
         {
          xtype : 'Button',
          cls : 'x-btn-text-icon',
          icon : rootURL + '/Pman/templates/images/trash.gif',
          text : _this._strings['68be4837f6c739877233e527a996dd00'] /* Merge */,
          listeners : {
           click : function()
            {
                var s = _this.grid.getSelectionModel().getSelections();
                
                if (!s.length)  {
                    Roo.MessageBox.alert("Error", "Select a Row");
                    return;
                }
                
                var ids = [];
                var names = [];
                
                var params = {};
                
                params['query[comptype]'] = 'SUPPLIER,OLDSUPPL';
                
                Roo.each(s, function(v, k){
                    ids.push(v.data.id);
                    names.push(v.data.name);
                    params['!id[' + k + ']'] = v.data.id
                });
                
                Pman.Dialog.ShippingSupplierMerge.show({ 
                    _merge_from : ids.join(','),
                    _name : names.join(', '),
                    type: 'Supplier',
                    params : params
                }, function() {
                    _this.grid.footer.onClick('refresh');
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
        sortInfo : { field: 'name', direction: 'ASC' },
        listeners : {
         beforeload : function (_self, options)
          {
             if ( _this.layout) {
                //_this.layout.getRegion('east').hide() ;
                }
              options.params['query[comptype]'] ='SUPPLIER,OLDSUPPL'; // base on pulldown..
              options.params['query[name]'] = _this.searchBox.getValue();
              if (_this.provinceCombo.getValue()) {
                 options.params['province'] = _this.provinceCombo.getValue();
             }
          },
         load : function (_self, records, options)
          {
              if (_this.grid.getSelectionModel().getSelected()) {
                  _this.grid.getSelectionModel().fireEvent('afterselectionchange', _this.grid.getSelectionModel());
              }
              if (!_this.grid.getSelectionModel().getSelected() && this.getTotalCount() == 1) {
                 
                  _this.grid.getSelectionModel().selectFirstRow();
                    _this.grid.getSelectionModel().fireEvent('afterselectionchange', _this.grid.getSelectionModel());
              }
          }
        },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         url : baseURL + '/Roo/core_company.php',
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
         '|xns' : 'Roo.data'
        }
       },
       sm : {
        xtype : 'RowSelectionModel',
        singleSelect : false,
        listeners : {
         afterselectionchange : function (_self)
          {
              if (!this.getSelections().length) {
                  if (_this.form) { _this.form.reset(); }
                  _this.panel.layout.getRegion('east').el.mask("Select Supplier");
                  _this.panel.layout.getRegion('south').el.mask("Select Supplier");
                  return;
              }
              
              if (_this.form) {
                 _this.form.setValues(
                      _this.grid.getDataSource().getById(this.getSelected().data.id).data
                  );
              }
          
              _this.pgrid.footer.onClick('first'); // load people.
              _this.panel.layout.getRegion('east').el.unmask();
              _this.panel.layout.getRegion('south').el.unmask();
              
              _this.panel.layout.getRegion('east').showPanel(0);
             
              if(this.getSelections().length > 1) {
                  _this.panel.layout.getRegion('east').el.mask("Unable to Update");
                  _this.panel.layout.getRegion('south').el.mask("Unable to Update");
              }
              
          }
        },
        xns : Roo.grid,
        '|xns' : 'Roo.grid'
       },
       colModel : [
        {
         xtype : 'ColumnModel',
         dataIndex : 'name',
         header : _this._strings['49ee3087348e8d44e1feda1917443987'] /* Name */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'comptype',
         header : _this._strings['4d3d769b812b6faa6b76e1a8abaece2d'] /* Active */,
         renderer : function(v) { return v.match(/OLD/) ? 'OLD' : v ; },
         sortable : true,
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'province',
         header : _this._strings['c6b5d0bb9a0c3f077863fdaef9773f7c'] /* Province */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'country_display_name',
         header : _this._strings['59716c97497eb9694541f7c3d37b1a4d'] /* Country */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 100,
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
