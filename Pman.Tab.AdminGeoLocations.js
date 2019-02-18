//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminGeoLocations = new Roo.XComponent({

 _strings : {
  'f2b734f9d29a7b036a5f26b229f1e918' :"Geographic Locations",
  '59716c97497eb9694541f7c3d37b1a4d' :"Country",
  'ec211f7c20af43e742bf2570c3cb84f9' :"Add",
  'fc6f97505d89fe9277965c126744647a' :"No Companies found",
  '7dce122004969d56ae2e0245cb754d35' :"Edit",
  '646f95b46cdc6ae59dd9f2e86bf3b598' :"Displaying Country {0} - {1} of {2}",
  '7faaef9675ee0e8280a243a290569359' :"No. Provinces",
  'bbf2182dd4040fabc2b5433c32fd60f4' :"Province / District",
  '05a43538cbc752df5428fe0a71192d09' :"No. Cities",
  '155ca6a755e25c15ad7ce45e2f638f10' :"Displaying Companies{0} - {1} of {2}",
  '57d056ed0984166336b7879c2af3657f' :"City",
  'c6b5d0bb9a0c3f077863fdaef9773f7c' :"Province",
  '31311feefd4f3253ed255d109da1480b' :"No Country found",
  '42e3bd04a7339573df51e33a0e4e8969' :"Search Province",
  'f2a6c498fb90ee345d997f888fce3b18' :"Delete",
  '49ee3087348e8d44e1feda1917443987' :"Name",
  '90fd8a29b37d805cf75af6a3809bca87' :"Search City",
  '08b523137281088adf3cb1883c8e5627' :"Search Country",
  '36dc0beb80c36193ac81b4f94e915e36' :"Country Name"
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
     xns : Roo,
     '|xns' : 'Roo'
    },
    east : {
     xtype : 'LayoutRegion',
     split : true,
     width : 400,
     xns : Roo,
     '|xns' : 'Roo'
    },
    west : {
     xtype : 'LayoutRegion',
     split : true,
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
       autoExpandColumn : 'lval',
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
        displayMsg : _this._strings['646f95b46cdc6ae59dd9f2e86bf3b598'] /* Displaying Country {0} - {1} of {2} */,
        emptyMsg : _this._strings['31311feefd4f3253ed255d109da1480b'] /* No Country found */,
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
          emptyText : _this._strings['08b523137281088adf3cb1883c8e5627'] /* Search Country */,
          listeners : {
           render : function (_self)
            {
                _this.country_searchBox = _self;
            },
           specialkey : function (_self, e)
            {
                if (e.getKey() == 13) {
                    _this.country_grid.footer.onClick('first');
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
                _this.country_grid.footer.onClick('first');
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
               _this.country_searchBox.setValue('');
                _this.country_grid.footer.onClick('first');
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
              
              options.params['query[name]'] = _this.country_searchBox.getValue();
              
              options.params._with_geoip_count = 1;
          },
         load : function (_self, records, options)
          {
              _this.province_grid.footer.onClick('first');
          }
        },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         url : baseURL + '/Roo/i18n.php',
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
                 'name': 'lkey',
                 'type': 'string'
             },
             {
                 'name': 'inlang',
                 'type': 'string'
             },
             {
                 'name': 'lval',
                 'type': 'string'
             },
             {
                 'name': 'is_active',
                 'type': 'int'
             },
             {
                 'name': 'is_prefer',
                 'type': 'int'
             },
             {
                 'name': 'no_of_division',
                 'type': 'int'
             },
             {
                 'name': 'no_of_city',
                 'type': 'int'
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
              _this.province_grid.footer.onClick('first');
          }
        },
        xns : Roo.grid,
        '|xns' : 'Roo.grid'
       },
       cm : [
        {
         xtype : 'ColumnModel',
         dataIndex : 'lval',
         header : _this._strings['36dc0beb80c36193ac81b4f94e915e36'] /* Country Name */,
         renderer : function(v) 
         { 
             return String.format('{0}', v ? v : ''); 
         },
         sortable : true,
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         align : 'right',
         dataIndex : 'no_of_division',
         header : _this._strings['7faaef9675ee0e8280a243a290569359'] /* No. Provinces */,
         renderer : function(v) 
         { 
             return String.format('{0}', v ? v : ''); 
         },
         sortable : true,
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         align : 'right',
         dataIndex : 'no_of_city',
         header : _this._strings['05a43538cbc752df5428fe0a71192d09'] /* No. Cities */,
         renderer : function(v) 
         { 
             return String.format('{0}', v ? v : ''); 
         },
         sortable : true,
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
            _this.province_panel = this;
            if (_this.province_grid) {
                _this.province_grid.footer.onClick('first');
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
            _this.province_grid = this; 
            
             if (_this.province_panel.active) {
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
          emptyText : _this._strings['42e3bd04a7339573df51e33a0e4e8969'] /* Search Province */,
          listeners : {
           render : function (_self)
            {
                _this.province_searchBox = _self;
            },
           specialkey : function (_self, e)
            {
                 if (e.getKey() == 13) {
                    _this.province_grid.footer.onClick('first');
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
                _this.provincegrid.footer.onClick('first');
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
                _this.province_searchBox.setValue('');
                _this.province_grid.footer.onClick('first');
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
                var country = _this.country_grid.getSelectionModel().getSelected();
                
                Pman.Dialog.AdminGeoDivisionEdit.show({
                    id : 0,
                    country : (country) ? country.data.lkey : '',
                    country_name : (country) ? country.data.lval : ''
                }, function(){
                    _this.province_grid.footer.onClick('first');
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
                var s = _this.province_grid.getSelectionModel().getSelected();
                
                if (!s)  {
                    Roo.MessageBox.alert("Error", "Select a Row");
                    return;
                }
                
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
         },
         {
          xtype : 'Button',
          cls : 'x-btn-text-icon',
          icon : rootURL + '/Pman/templates/images/trash.gif',
          text : _this._strings['f2a6c498fb90ee345d997f888fce3b18'] /* Delete */,
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
              options.params = options.params || {};
              
              var country = _this.country_grid.getSelectionModel().getSelected();
              
              if(!country) {
                  this.removeAll();
                  return false;
              }
              
              options.params.country = country.data.lkey;
              
              options.params['query[name]'] = _this.province_searchBox.getValue();
              
              options.params._with_geoip_count = 1;
          },
         load : function (_self, records, options)
          {
              _this.city_grid.footer.onClick('first');
          }
        },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         url : baseURL + '/Roo/geoip_division.php',
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
                 'name': 'code',
                 'type': 'string'
             },
             {
                 'name': 'name',
                 'type': 'string'
             },
             {
                 'name': 'country',
                 'type': 'string'
             },
             {
                 'name': 'country_name',
                 'type': 'string'
             },
             {
                 'name': 'no_of_city',
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
              _this.city_grid.footer.onClick('first');
          }
        },
        xns : Roo.grid,
        '|xns' : 'Roo.grid'
       },
       cm : [
        {
         xtype : 'ColumnModel',
         dataIndex : 'name',
         header : _this._strings['49ee3087348e8d44e1feda1917443987'] /* Name */,
         renderer : function(v) 
         { 
             return String.format('{0}', v ? v : ''); 
         },
         sortable : true,
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         align : 'right',
         dataIndex : 'no_of_city',
         header : _this._strings['05a43538cbc752df5428fe0a71192d09'] /* No. Cities */,
         renderer : function(v) 
         { 
             return String.format('{0}', v ? v : ''); 
         },
         sortable : true,
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
            
            _this.city_panel = this;
            if (_this.city_grid) {
                _this.city_grid.footer.onClick('first');
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
            _this.city_grid = this; 
            
             if (_this.city_panel.active) {
                this.footer.onClick('first');
             }
         }
       },
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       footer : {
        xtype : 'PagingToolbar',
        displayInfo : true,
        displayMsg : _this._strings['646f95b46cdc6ae59dd9f2e86bf3b598'] /* Displaying Country {0} - {1} of {2} */,
        emptyMsg : _this._strings['31311feefd4f3253ed255d109da1480b'] /* No Country found */,
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
          emptyText : _this._strings['90fd8a29b37d805cf75af6a3809bca87'] /* Search City */,
          listeners : {
           render : function (_self)
            {
                _this.city_searchBox = _self;
            },
           specialkey : function (_self, e)
            {
                if (e.getKey() == 13) {
                    _this.city_grid.footer.onClick('first');
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
                _this.country_grid.footer.onClick('first');
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
               _this.country_searchBox.setValue('');
                _this.country_grid.footer.onClick('first');
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
              options.params = options.params || {};
              
              var country = _this.country_grid.getSelectionModel().getSelected();
              
              if(!country) {
                  this.removeAll();
                  return false;
              }
              
              options.params.country = country.data.lkey;
              
              var province = _this.province_grid.getSelectionModel().getSelected();
              
              if(province) {
                  options.params.division_id = province.data.id
              }
              
              options.params['query[name]'] = _this.city_searchBox.getValue();
          }
        },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         url : baseURL + '/Roo/geoip_city.php',
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
                 'name': 'name',
                 'type': 'string'
             },
             {
                 'name': 'country',
                 'type': 'string'
             },
             {
                 'name': 'country_name',
                 'type': 'string'
             },
             {
                 'name': 'division_id',
                 'type': 'int'
             },
             {
                 'name': 'division_id_name',
                 'type': 'string'
             },
             {
                 'name': 'postal_code',
                 'type': 'string'
             },
             {
                 'name': 'time_zone',
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
        xns : Roo.grid,
        '|xns' : 'Roo.grid'
       },
       cm : [
        {
         xtype : 'ColumnModel',
         dataIndex : 'name',
         header : _this._strings['49ee3087348e8d44e1feda1917443987'] /* Name */,
         renderer : function(v) 
         { 
             return String.format('{0}', v ? v : ''); 
         },
         sortable : true,
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'division_id_name',
         header : _this._strings['bbf2182dd4040fabc2b5433c32fd60f4'] /* Province / District */,
         renderer : function(v) 
         { 
             return String.format('{0}', v ? v : ''); 
         },
         sortable : true,
         width : 150,
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
