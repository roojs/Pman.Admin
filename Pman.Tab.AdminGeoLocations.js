//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminGeoLocations = new Roo.XComponent({

 _strings : {
  'f1174ecbbc232f948717979daf04cf08' :"No Person found",
  'f2a6c498fb90ee345d997f888fce3b18' :"Delete",
  'f92d04c600dfe2779e117ecf723cd2ec' :"View / Download",
  '8444e81d652b084d70c71cd7d19ac0cf' :"Displaying Person{0} - {1} of {2}",
  'e2154f4fae1bfa7b918e0539d7d73b0a' :"Invalid Date",
  '7a903d346ceceeabb680254c6c26885f' :"Buying Terms",
  '617e98c5e5db2b205710f0b3552bc6ee' :"Vessel Booking",
  'ce8ae9da5b7cd6c3df2929543a9af92d' :"Email",
  'ec211f7c20af43e742bf2570c3cb84f9' :"Add",
  '9810aa2b9f44401be4bf73188ef2b67d' :"Fax",
  'bcc254b55c4a1babdf1dcb82c207506b' :"Phone",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  '40bed7cf9b3d4bb3a3d7a7e3eb18c5eb' :"Person",
  'fc6f97505d89fe9277965c126744647a' :"No Companies found",
  '49ee3087348e8d44e1feda1917443987' :"Name",
  'bf5b8cbcc7df7f946c06486d88499db9' :"Approval Required?",
  'ec53a8c4f07baed5d8825072c89799be' :"Status",
  '91f3a2c0e4424c87689525da44c4db11' :"Files",
  'edefbda3a2bdd979e42d8944b7325b79' :"Companies",
  'dd7bf230fde8d4836917806aff6a6b27' :"Address",
  '2e006b735fbd916d8ab26978ae6714d4' :"Tel",
  '1814d65a76028fdfbadab64a5a8076df' :"Suppliers",
  'aa186c44d0c1a9b263933bfa359802e3' :"Select Province",
  '155ca6a755e25c15ad7ce45e2f638f10' :"Displaying Companies{0} - {1} of {2}",
  'c6b5d0bb9a0c3f077863fdaef9773f7c' :"Province",
  '17680f7b3d4fdfaf532038a55c17ab9f' :"Product/Dept/Role",
  '6f54043edff88231017ffe8a1f092f44' :"Contact Details",
  '59716c97497eb9694541f7c3d37b1a4d' :"Country",
  'c9cc8cce247e49bae79f15173ce97354' :"Save",
  '68be4837f6c739877233e527a996dd00' :"Merge",
  'ea72bacd2fdfa818907bb9559e6905a1' :"Upload Image or File",
  '4d3d769b812b6faa6b76e1a8abaece2d' :"Active",
  'c9d03748d1a54666b5c7a5187109301b' :"Delete Selected File or  Image",
  '26cbe1e3b53e773d1bdf15fb4912c2e0' :"search name"
 },
 _named_strings : {
  'tel_fieldLabel' : '2e006b735fbd916d8ab26978ae6714d4' /* Tel */ ,
  'fax_fieldLabel' : '9810aa2b9f44401be4bf73188ef2b67d' /* Fax */ ,
  'name_fieldLabel' : '49ee3087348e8d44e1feda1917443987' /* Name */ ,
  'remarks_fieldLabel' : '7a903d346ceceeabb680254c6c26885f' /* Buying Terms */ ,
  'province_fieldLabel' : 'c6b5d0bb9a0c3f077863fdaef9773f7c' /* Province */ ,
  'country_display_name_fieldLabel' : '59716c97497eb9694541f7c3d37b1a4d' /* Country */ ,
  'vessel_booking_approval_req_fieldLabel' : '617e98c5e5db2b205710f0b3552bc6ee' /* Vessel Booking */ ,
  'address_fieldLabel' : 'dd7bf230fde8d4836917806aff6a6b27' /* Address */ ,
  'vessel_booking_approval_req_boxLabel' : 'bf5b8cbcc7df7f946c06486d88499db9' /* Approval Required? */ ,
  'comptype_name_fieldLabel' : 'ec53a8c4f07baed5d8825072c89799be' /* Status */ ,
  'imageUpload_fieldLabel' : 'ea72bacd2fdfa818907bb9559e6905a1' /* Upload Image or File */ ,
  'ontable_value' : 'edefbda3a2bdd979e42d8944b7325b79' /* Companies */ 
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
   title : _this._strings['1814d65a76028fdfbadab64a5a8076df'] /* Suppliers */,
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
     tabPosition : 'top',
     width : 400,
     xns : Roo,
     '|xns' : 'Roo'
    },
    south : {
     xtype : 'LayoutRegion',
     height : 150,
     split : true,
     xns : Roo,
     '|xns' : 'Roo'
    },
    items  : [
     {
      xtype : 'GridPanel',
      fitContainer : true,
      fitToframe : true,
      region : 'center',
      tableName : 'core_company',
      title : _this._strings['edefbda3a2bdd979e42d8944b7325b79'] /* Companies */,
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
      xtype : 'ContentPanel',
      autoScroll : true,
      background : false,
      region : 'east',
      title : _this._strings['6f54043edff88231017ffe8a1f092f44'] /* Contact Details */,
      listeners : {
       activate : function (_self)
        {
            _this.fpanel = _self;
        }
      },
      xns : Roo,
      '|xns' : 'Roo',
      toolbar : {
       xtype : 'Toolbar',
       xns : Roo,
       '|xns' : 'Roo',
       items  : [
        {
         xtype : 'Button',
         cls : 'x-btn-text-icon',
         icon : rootURL + '/Pman/templates/images/trash.gif',
         text : _this._strings['f2a6c498fb90ee345d997f888fce3b18'] /* Delete */,
         listeners : {
          click : function()
           {
              if (!_this.form.findField('id').getValue()) {
                   Roo.MessageBox.alert("Error", "You can not delete this entry yet");
                   return;
              }
              Roo.MessageBox.confirm("Confirm", "Are  you sure you want to delete this record?", function(res) {
              
                  if (res !='yes') {return;}
                  
                  Pman.request({
                       url: baseURL + '/Roo/core_company.php',
                       method : 'POST',
                       params : {
                           _delete : _this.form.findField('id').getValue()
                       },
                       success : function() {
                           _this.grid.footer.onClick('refresh');
                       },
                       failure : function() {
                            Roo.MessageBox.alert("Error", "Problem deleting entry.");
                       }
                   });
               });
              //Pman.genericDelete(_this, _this.grid.tableName); 
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
         text : _this._strings['c9cc8cce247e49bae79f15173ce97354'] /* Save */,
         listeners : {
          click : function()
           {
               _this.fpanel.el.mask('saving');
               _this.form.submit();
               //_this.dialog.show(s[0].data, function() {
               //    _this.grid.footer.onClick('first');
               //   }); 
               
           }
         },
         xns : Roo.Toolbar,
         '|xns' : 'Roo.Toolbar'
        }
       ]
      },
      items  : [
       {
        xtype : 'Form',
        labelAlign : 'right',
        method : 'POST',
        style : 'margin:10px;',
        url : baseURL + '/Roo/core_company.php',
        listeners : {
         actioncomplete : function(_self,action)
          {
              if (action.type == 'setdata') {
                 //_this.dialog.el.mask("Loading");
                 //this.load({ method: 'GET', params: { '_id' : _this.data.id }});
                 return;
              }
              if (action.type == 'load') {
                  _this.fpanel.el.unmask();
                  return;
              }
              if (action.type =='submit') {
              
                  _this.fpanel.el.unmask();
          
                  if ((_this.form.findField('id').getValue() * 1) < 1) {
                      _this.searchBox.setValue(_this.form.findField('name').getValue());
                      _this.grid.footer.onClick('first');
                      return;
                  }
                  // set the search field 
                  _this.grid.footer.onClick('refresh');
                  
                  return;
              }
          },
         actionfailed : function (_self, action)
          {
                  _this.fpanel.el.unmask();
                  
                  Roo.MessageBox.alert("Error", "Somthing went wrong saving - check you filled in all the fields correctly");
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
          allowBlank : false,
          fieldLabel : _this._strings['49ee3087348e8d44e1feda1917443987'] /* Name */,
          name : 'name',
          width : 200,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'TextField',
          fieldLabel : _this._strings['2e006b735fbd916d8ab26978ae6714d4'] /* Tel */,
          name : 'tel',
          width : 200,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'TextArea',
          fieldLabel : _this._strings['dd7bf230fde8d4836917806aff6a6b27'] /* Address */,
          height : 100,
          name : 'address',
          width : 200,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'TextField',
          allowBlank : false,
          fieldLabel : _this._strings['c6b5d0bb9a0c3f077863fdaef9773f7c'] /* Province */,
          name : 'province',
          width : 200,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'ComboBox',
          alwaysQuery : true,
          displayField : 'lval',
          editable : true,
          fieldLabel : _this._strings['59716c97497eb9694541f7c3d37b1a4d'] /* Country */,
          forceSelection : true,
          hiddenName : 'country',
          minChars : 2,
          name : 'country_display_name',
          queryParam : 'query[name]',
          tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{lval}</b> </div>',
          triggerAction : 'all',
          valueField : 'lkey',
          width : 200,
          listeners : {
           render : function (_self)
            {
                _this.country = this;
            }
          },
          xns : Roo.form,
          '|xns' : 'Roo.form',
          store : {
           xtype : 'Store',
           remoteSort : true,
           sortInfo : {field:"lval",direction:"ASC"},
           listeners : {
            beforeload : function (_self, o)
             {
                 o.params = o.params || {};
                 o.params.ltype = 'c';
                 o.params.inlang = 'en';
                 o.params.is_active = 1;
                 o.params.limit = 300;
             }
           },
           xns : Roo.data,
           '|xns' : 'Roo.data',
           proxy : {
            xtype : 'HttpProxy',
            method : 'GET',
            url : baseURL+'/Roo/I18n',
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
                    'name': 'lval',
                    'type': 'string'
                }
            ],
            xns : Roo.data,
            '|xns' : 'Roo.data'
           }
          }
         },
         {
          xtype : 'TextField',
          fieldLabel : _this._strings['9810aa2b9f44401be4bf73188ef2b67d'] /* Fax */,
          name : 'fax',
          width : 200,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'TextField',
          fieldLabel : _this._strings['7a903d346ceceeabb680254c6c26885f'] /* Buying Terms */,
          name : 'remarks',
          width : 200,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'ComboBox',
          allowBlank : false,
          displayField : 'vtype',
          editable : false,
          fieldLabel : _this._strings['ec53a8c4f07baed5d8825072c89799be'] /* Status */,
          hiddenName : 'comptype',
          listWidth : 200,
          mode : 'local',
          name : 'comptype_name',
          triggerAction : 'all',
          valueField : 'ftype',
          width : 200,
          xns : Roo.form,
          '|xns' : 'Roo.form',
          store : {
           xtype : 'SimpleStore',
           data : [ ["Active" , "SUPPLIER" ],[ "Old", "OLDSUPPL"] ],
           fields : [  'vtype', 'ftype'],
           xns : Roo.data,
           '|xns' : 'Roo.data'
          }
         },
         {
          xtype : 'Checkbox',
          boxLabel : _this._strings['bf5b8cbcc7df7f946c06486d88499db9'] /* Approval Required? */,
          fieldLabel : _this._strings['617e98c5e5db2b205710f0b3552bc6ee'] /* Vessel Booking */,
          inputValue : 1,
          name : 'vessel_booking_approval_req',
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'Hidden',
          name : 'id',
          xns : Roo.form,
          '|xns' : 'Roo.form'
         }
        ]
       }
      ]
     },
     {
      xtype : 'NestedLayoutPanel',
      background : true,
      region : 'east',
      title : _this._strings['91f3a2c0e4424c87689525da44c4db11'] /* Files */,
      listeners : {
       activate : function (_self)
        {
           //console.log('activate');
            
           if (!_this.imageView) {return; }
           _this.imageView.reload();
           
           if (_this.hasUploadWatch) {
             return;
           }
           //console.log('add uplaod watch');
           _this.hasUploadWatch =true;
              _this.uploadSending =false;
           window.setInterval( function() {
                var val = _this.uploadForm.findField('imageUpload').getValue();
                if (!val || !val.length) {
                    return;
                }
                 var s = _this.grid.getSelectionModel().getSelected();
                 if (!s) {return; }
                if (_this.uploadSending) {
                    return;
                }
                 _this.uploadSending =true;
                _this.uploadForm.findField('onid').setValue(s.data.id);
                _this.uploadForm.el.mask("Sending");
                _this.uploadForm.submit.defer(100, _this.uploadForm);
           
          }, 1000)  
           
        }
      },
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
       south : {
        xtype : 'LayoutRegion',
        height : 60,
        xns : Roo,
        '|xns' : 'Roo'
       },
       items  : [
        {
         xtype : 'ContentPanel',
         autoScroll : true,
         fitContainer : true,
         fitToFrame : true,
         region : 'center',
         xns : Roo,
         '|xns' : 'Roo',
         toolbar : {
          xtype : 'Toolbar',
          xns : Roo,
          '|xns' : 'Roo',
          items  : [
           {
            xtype : 'Button',
            text : _this._strings['f92d04c600dfe2779e117ecf723cd2ec'] /* View / Download */,
            listeners : {
             click : function (_self, e)
              {
               
                 if (!_this.imageView.getSelectedNodes().length) {
                   Roo.MessageBox.alert("Error", "Select an Image");
                   return;
                 }
                 var url  = _this.imageView.getNodeData(_this.imageView.getSelectedNodes()[0]).url;
              //   window.open(url, 'download');
                  Pman.download({ url : url});
                 // open a new window with this file in..
                 
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
            text : _this._strings['c9d03748d1a54666b5c7a5187109301b'] /* Delete Selected File or  Image */,
            listeners : {
             click : function (_self, e)
              {
                  if (!_this.imageView.getSelectedNodes().length) {
                   Roo.MessageBox.alert("Error", "Select an Image");
                   return;
                 }
                 
                 Roo.MessageBox.confirm("Confirm", "Are you sure you want to delete this?", function(yn) {
                      if (yn != 'yes') {
                          return;
                      }
                          
                     var id  = _this.imageView.getNodeData(_this.imageView.getSelectedNodes()[0]).id;
                     _this.imageView.el.mask('Deleting');
                     var s = _this.grid.getSelectionModel().getSelected();
                     
                     Roo.Ajax.request({
                        url : baseURL + '/Roo/Images.php',
                        params : {
                           _delete : id
                        },
                        method : 'POST',
                        success : function() {
              
                             _this.imageView.reload();
                        },
                        failure : function() {
                             _this.imageView.el.unmask();
                             Roo.MessageBox.alert("Error", "Error deleting image");
                             return;
                        }
                    });
                 });
               }
            },
            xns : Roo.Toolbar,
            '|xns' : 'Roo.Toolbar'
           }
          ]
         },
         items  : [
          {
           xtype : 'JsonView',
           jsonRoot : 'data',
           reload : function() {
               var s = _this.grid.getSelectionModel().getSelected();
               if (!_this.imageView) {return; }
               if (!s) {
                  _this.imageView.el.mask('Select Supplier First');
                  this.clearSelections();
                  this.el.update("");
                 return;
              }
              _this.imageView.el.unmask();
              _this.imageView.load({
                   url : baseURL + '/Roo/Images.php',
                   method : 'GET',
                   params : {
                      ontable : 'core_company',
                      onid : s.data.id,
                      'query[imagesize]' : '150x150'
                   },
                   text : 'Loading'
              });
              
           },
           singleSelect : true,
           listeners : {
            beforerender : function (_self, data)
             {
                _this.imageView = _self;
                
                if (this.stylesheet) {
                   return;
                }
                this.el.addClass('thumb-browser');
             
                
                this.stylesheet = Roo.util.CSS.createStyleSheet(
                     {
                       '.thumb-browser .thumb-wrap' : {
                             border:'3px solid #EEE',
                             'float':'left',
                             height:'160px',
                             margin:'2px',
                             'padding-left':'5px',
                             'padding-top':'5px',
                             width:'160px'
                         },
                         '.thumb-browser .x-view-selected' : {
                           border:'3px solid #333'
                       
                         }
             
             
                     }, Roo.id()
                     );
                
             },
            dblclick : function (_self, index, node, e)
             {
                 Pman.download({ url : this.getNodeData(node).url});
                
                
             }
           },
           xns : Roo,
           '|xns' : 'Roo',
           tpl : {
            xtype : 'Template',
            html : '<div class="thumb-wrap"> ' + 
              '<div class="thumb"><img  src="{url_thumb}" class="thumb-img"></div>' + 
            '</div>',
            xns : Roo,
            '|xns' : 'Roo'
           }
          }
         ]
        },
        {
         xtype : 'ContentPanel',
         region : 'south',
         xns : Roo,
         '|xns' : 'Roo',
         items  : [
          {
           xtype : 'Form',
           fileUpload : true,
           labelAlign : 'top',
           labelWidth : 200,
           style : 'margin: 10px;',
           url : baseURL + '/Roo/Images.php',
           listeners : {
            actioncomplete : function (_self, action)
             {
             // only action this will handle is submit?
             // should test for errors..
                 if (action.failureType) {
                       _this.uploadForm.el.unmask();
                       _this.uploadSending = false;
                     Roo.MessageBox.alert("Error", "Upload Failed");
                     return false;
                 
                 }
                   
                 
                 if (action.type =='submit') {
                      _this.uploadForm.reset();
                        _this.uploadSending = false;
                       _this.uploadForm.el.unmask();         
                        _this.imageView.reload();
                      return;
                 }
                  
             },
            rendered : function (form)
             {
               _this.uploadForm = form;
             }
           },
           xns : Roo.form,
           '|xns' : 'Roo.form',
           items  : [
            {
             xtype : 'Row',
             xns : Roo.form,
             '|xns' : 'Roo.form',
             items  : [
              {
               xtype : 'TextField',
               allowBlank : false,
               fieldLabel : _this._strings['ea72bacd2fdfa818907bb9559e6905a1'] /* Upload Image or File */,
               inputType : 'file',
               name : 'imageUpload',
               width : 250,
               xns : Roo.form,
               '|xns' : 'Roo.form'
              }
             ]
            },
            {
             xtype : 'Hidden',
             name : 'onid',
             xns : Roo.form,
             '|xns' : 'Roo.form'
            },
            {
             xtype : 'Hidden',
             name : 'ontable',
             value : _this._strings['edefbda3a2bdd979e42d8944b7325b79'] /* Companies */,
             xns : Roo.form,
             '|xns' : 'Roo.form'
            }
           ]
          }
         ]
        }
       ]
      }
     },
     {
      xtype : 'GridPanel',
      background : true,
      fitContainer : true,
      fitToframe : true,
      region : 'south',
      tableName : 'Person',
      title : _this._strings['40bed7cf9b3d4bb3a3d7a7e3eb18c5eb'] /* Person */,
      listeners : {
       activate : function() {
            _this.ppanel = this;
            if (_this.pgrid) {
                _this.pgrid.footer.onClick('first');
            }
        }
      },
      xns : Roo,
      '|xns' : 'Roo',
      grid : {
       xtype : 'EditorGrid',
       autoExpandColumn : 'name',
       clicksToEdit : 1,
       loadMask : true,
       listeners : {
        afteredit : function (e)
         {
             //console.log('after edit:' + e.value);
         
             var g = _this.pgrid;
             var r = e.record;
             var f = e.field;
             var v = e.value;
             var ov = e.originalValue;
             if (v == ov) {
                 
                 return;
             }
             //what if no id..
             var p = { id : r.data.id };
             
             
             if (!r.data.id) {
                 if (!r.data.name) {
                    // Roo.log(newCell);
                     if (f == 'deleted_dt') {
                         r.set('deleted_by', typeof(v) == 'object' ? Pman.Login.authUser.id : 0);
                     }
                     return;
                 }
                 p = Roo.apply({}, r.data); //copy..
                 if (p.deleted_by) {
                     p['deleted_dt'] = typeof(p.deleted_dt) == 'object' ? p.deleted_dt.format('Y-m-d H:i:s') : '';
                 }
                 
             } else {
                 p[f] = v;
             }
             if (f == 'deleted_dt') {
                 p['deleted_by'] = typeof(v) == 'object' ? Pman.Login.authUser.id : 0;
                 p['deleted_dt'] =typeof(v) == 'object' ? v.format('Y-m-d H:i:s') : '';
             }
             
             Pman.request({
                 method : 'POST',
                 url : baseURL + '/Roo/core_person.php',
                 params : p,
                 success : function(nd)
                 {
                     r.set('id', nd.id);
                     if (f == 'deleted_dt') {
                        r.set('deleted_by', typeof(r.data.deleted_dt) == 'object'  ? Pman.Login.authUser.id: 0);
                     }
         
                     r.commit();
                    // Roo.log(newCell);
                   
                 },
                 failure:  function() {
                     Roo.MessageBox.alert("Error", "Saving Failed");
                 }
                 
                 
             });
              
           
             
             return true;
         },
        render : function() 
         {
            _this.pgrid = this; 
             //_this.dialog = Pman.Dialog.FILL_IN
             if (_this.ppanel.active) {
                this.footer.onClick('first');
             }
         }
       },
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       footer : {
        xtype : 'PagingToolbar',
        displayInfo : true,
        displayMsg : _this._strings['8444e81d652b084d70c71cd7d19ac0cf'] /* Displaying Person{0} - {1} of {2} */,
        emptyMsg : _this._strings['f1174ecbbc232f948717979daf04cf08'] /* No Person found */,
        pageSize : 5,
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
                var s = _this.grid.getSelectionModel().getSelected();
                
                if (!s) {
                   Roo.MessageBox.alert("Error", "Select Supplier First");
                   return;
                }
               
               var r = _this.pgrid.getDataSource().reader.newRow();
               
               _this.pgrid.stopEditing();
               _this.pgrid.getDataSource().insert(0, r);
               r.set('company_id', s.data.id);
               
               _this.pgrid.startEditing(0, 0);
            
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
          text : _this._strings['f2a6c498fb90ee345d997f888fce3b18'] /* Delete */,
          listeners : {
           click : function()
            {
               var c = _this.pgrid.selModel.getSelectedCell();
               _this.pgrid.stopEditing();
               if (!c) {
                   Roo.MessageBox.alert("Error", "Select a person to delete");
               }
               var rec  = _this.pgrid.dataSource.getAt(c[0]);
            
               if (!rec.get('id')) {
                    _this.pgrid.selModel.clearSelections();
                    _this.pgrid.dataSource.remove(rec);
                    return;
               }
                Roo.MessageBox.confirm("Confirm", "Are  you sure you want to delete this record?", function(res) {
               
                   if (res !='yes') {return;}
                   
                   Pman.request({
                        url: baseURL + '/Roo/core_person.php',
                        method : 'GET',
                        params : {
                            _delete : rec.get('id')
                        },
                        success : function() {
                           _this.pgrid.selModel.clearSelections();
                             _this.pgrid.dataSource.remove(rec);
                        },
                        failure : function() {
                             Roo.MessageBox.alert("Error", "Problem deleting entry.");
                        }
                    });
                });
               
               //Pman.genericDelete(_this, _this.grid.tableName); 
            }
          },
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         }
        ]
       },
       dataSource : {
        xtype : 'Store',
        listeners : {
         beforeload : function (_self, options)
          {
              if (!_this.pgrid || !_this.grid) {
                  return false;
              }
              var cid = _this.grid.getSelectionModel().getSelected();
              if (!cid) {
                  _this.pgrid.getDataSource().removeAll();
                  return false;
              }
              options.params.company_id = cid.data.id;
          }
        },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         url : baseURL + '/Roo/core_person.php',
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
                 'type': 'string'
             },
             {
                 'name': 'company_id_updated_by',
                 'type': 'int'
             },
             {
                 'name': 'company_id_updated_dt',
                 'type': 'string'
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
             },
             {
                 'name': 'deleted_by',
                 'type': 'int'
             },
             {
                 'name': 'deleted_dt',
                 'type': 'date',
                 'dateFormat' : 'Y-m-d H:i:s'
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
         dataIndex : 'role',
         header : _this._strings['17680f7b3d4fdfaf532038a55c17ab9f'] /* Product/Dept/Role */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         editor : {
          xtype : 'GridEditor',
          xns : Roo.grid,
          '|xns' : 'Roo.grid',
          field : {
           xtype : 'TextField',
           xns : Roo.form,
           '|xns' : 'Roo.form'
          }
         }
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'name',
         header : _this._strings['49ee3087348e8d44e1feda1917443987'] /* Name */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         editor : {
          xtype : 'GridEditor',
          xns : Roo.grid,
          '|xns' : 'Roo.grid',
          field : {
           xtype : 'TextField',
           xns : Roo.form,
           '|xns' : 'Roo.form'
          }
         }
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'email',
         header : _this._strings['ce8ae9da5b7cd6c3df2929543a9af92d'] /* Email */,
         renderer : function(v) { return v ? String.format('<a href="mailto:{0}">{0}</a>', v) : ''; },
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         editor : {
          xtype : 'GridEditor',
          xns : Roo.grid,
          '|xns' : 'Roo.grid',
          field : {
           xtype : 'TextField',
           xns : Roo.form,
           '|xns' : 'Roo.form'
          }
         }
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'phone',
         header : _this._strings['bcc254b55c4a1babdf1dcb82c207506b'] /* Phone */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         editor : {
          xtype : 'GridEditor',
          xns : Roo.grid,
          '|xns' : 'Roo.grid',
          field : {
           xtype : 'TextField',
           xns : Roo.form,
           '|xns' : 'Roo.form'
          }
         }
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'deleted_dt',
         header : _this._strings['e2154f4fae1bfa7b918e0539d7d73b0a'] /* Invalid Date */,
         renderer : function(v,x,r) { return r.data.deleted_by && typeof(v) == 'object' ? v.format('d/M/Y') : ''; },
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         editor : {
          xtype : 'GridEditor',
          xns : Roo.grid,
          '|xns' : 'Roo.grid',
          field : {
           xtype : 'DateField',
           altFormats : 'Y-m-d H:i:s',
           format : 'd/M/Y',
           xns : Roo.form,
           '|xns' : 'Roo.form'
          }
         }
        }
       ]
      }
     }
    ]
   }
  };  }
});
