//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.PressReleaseContactRejects = new Roo.XComponent({

 _strings : {
  '59716c97497eb9694541f7c3d37b1a4d' :"Country",
  '3c1df4260ce594cb5594696461087f2f' :"Select Country",
  'ce8ae9da5b7cd6c3df2929543a9af92d' :"Email",
  'acbb73117879b0729ee3bac61edb023a' :"Last Failed details",
  'ec53a8c4f07baed5d8825072c89799be' :"Status",
  '5a6c05f48afd958dcb5989bd66ed4783' :"Add / Edit Contacts",
  '7dce122004969d56ae2e0245cb754d35' :"Edit",
  '7f8c0283f16925caed8e632086b81b9c' :"Sent",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  'a7f0ba4d77215ad8a7ca74781933c94f' :"Family Name",
  'f8b970440931adb9af295d634b56110d' :"No Items found",
  '6bd6beac1da76b2d2a9c3b7914ba034c' :"Publication",
  'dd9fcc57e835b07ecc7ed7a750ad53b1' :"No failed records found",
  'aad2b85747ca5dc40b4b12efd3042c84' :"Bad Addresses",
  '1ede593e47b69d92e0cd20cfd12260c3' :"Displaying failed records {0} - {1} of {2}",
  'f2a6c498fb90ee345d997f888fce3b18' :"Delete",
  '20db0bfeecd8fe60533206a2b5e9891a' :"First name",
  '9c9745a343efeacc9efe9b7222b27afb' :"Ref#",
  'f45381a54504218e39aca33492d29306' :"Circulation",
  'a58c1bdecbdb3600f836a9a3510250e6' :"Displaying history 0} - {1} of {2}",
  '122a26ef126e03089bb959c949d12b0a' :"Due out (Local time)",
  '7800aee89e121611c7edfcf2ca662e09' :"Failed Address"
 },

  part     :  ["PressRelease", "ContactRejects" ],
  order    : '100-Pman.Tab.PressReleaseContactRejects',
  region   : 'center',
  parent   : 'Pman.Tab.PressReleaseDistribution',
  name     : "Pman.Tab.PressReleaseContactRejects",
  disabled : false, 
  permname : '', 
  _tree : function()
  {
   var _this = this;
   var MODULE = this;
   return {
   background : true,
   region : 'center',
   title : _this._strings['aad2b85747ca5dc40b4b12efd3042c84'] /* Bad Addresses */,
   xns : Roo,
   '|xns' : 'Roo',
   xtype : 'NestedLayoutPanel',
   listeners : {
    activate : function (_self)
     {
         (function() { 
            if (_this.grid) {
     
                 _this.grid.footer.onClick('first');
             }
         }).defer(100, this);
     
     
     }
   },
   layout : {
    xns : Roo,
    '|xns' : 'Roo',
    xtype : 'BorderLayout',
    center : {
     xns : Roo,
     '|xns' : 'Roo',
     xtype : 'LayoutRegion'
    },
    south : {
     height : 150,
     split : true,
     xns : Roo,
     '|xns' : 'Roo',
     xtype : 'LayoutRegion'
    },
    items  : [
     {
      background : false,
      fitContainer : true,
      fitToframe : true,
      region : 'center',
      tableName : 'pressrelease_contact',
      title : _this._strings['5a6c05f48afd958dcb5989bd66ed4783'] /* Add / Edit Contacts */,
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
       autoExpandColumn : 'failed',
       loadMask : true,
       multiSort : true,
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       xtype : 'Grid',
       listeners : {
        render : function() 
         {
             _this.grid = this; 
         
         },
        rowclick : function (_self, rowIndex, e)
         {
            (function() { _this.circgrid.footer.onClick('first'); }).defer(500);
         },
        rowdblclick : function (_self, rowIndex, e)
         {
             Roo.log("dblckck");
             
             var rec = this.ds.getAt(rowIndex);
             var g= this;
             Pman.Dialog.PressReleaseContact.show({ id : rec.data.id }, function()
             {
                 g.footer.onClick('refresh');
             });
         }
       },
       footer : {
        displayInfo : true,
        displayMsg : _this._strings['1ede593e47b69d92e0cd20cfd12260c3'] /* Displaying failed records {0} - {1} of {2} */,
        emptyMsg : _this._strings['dd9fcc57e835b07ecc7ed7a750ad53b1'] /* No failed records found */,
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
            
                if (e.getCharCode() == 13) {
                    _this.grid.footer.onClick('first');
                }
            }
          }
         },
         {
          alwaysQuery : true,
          displayField : 'country_name',
          editable : false,
          emptyText : _this._strings['59716c97497eb9694541f7c3d37b1a4d'] /* Country */,
          forceSelection : false,
          hiddenName : 'country',
          listWidth : 300,
          loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
          minChars : 2,
          pageSize : 999,
          qtip : _this._strings['3c1df4260ce594cb5594696461087f2f'] /* Select Country */,
          queryParam : 'search[country_name]',
          selectOnFocus : true,
          triggerAction : 'all',
          typeAhead : true,
          valueField : 'country',
          width : 200,
          xns : Roo.form,
          '|xns' : 'Roo.form',
          xtype : 'ComboCheck',
          listeners : {
           change : function (combo, record, index)
            {
              _this.grid.footer.onClick.defer(100, _this.grid.footer,[ 'first' ]);
            },
           render : function (_self)
            {
              _this.country_ar_combo = _self;
            }
          },
          store : {
           remoteSort : true,
           sortInfo : { direction : 'ASC', field: 'country_name'  },
           xns : Roo.data,
           '|xns' : 'Roo.data',
           xtype : 'Store',
           listeners : {
            beforeload : function (_self, o){
                 o.params = o.params || {};
                 // set more here
                 o.params['_distinct'] = 'country';
                 o.params['_with_country_name'] =1;
                 o.params['_columns'] = 'country_name,country';
             
                 
             }
           },
           proxy : {
            method : 'GET',
            url : baseURL + '/Roo/pressrelease_contact.php',
            xns : Roo.data,
            '|xns' : 'Roo.data',
            xtype : 'HttpProxy'
           },
           reader : {
            fields : [{"name":"id","type":"int"},{"name":"honor","type":"string"}],
            id : 'id',
            root : 'data',
            totalProperty : 'total',
            xns : Roo.data,
            '|xns' : 'Roo.data',
            xtype : 'JsonReader'
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
          xtype : 'Fill'
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
                if (!_this.dialog) return;
                _this.dialog.show(s[0].data, function() {
                    _this.grid.footer.onClick('refresh');
                }); 
                
            }
          }
         },
         {
          cls : 'x-btn-text-icon',
          icon : rootURL + '/Pman/templates/images/trash.gif',
          text : _this._strings['f2a6c498fb90ee345d997f888fce3b18'] /* Delete */,
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Button',
          listeners : {
           click : function()
            {
                 Pman.genericDelete(_this, 'pressrelease_contact'); 
            }
          }
         }
        ]
       },
       dataSource : {
        multiSort : true,
        remoteSort : true,
        sortInfo : { field : 'lastname', direction: 'ASC' },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        xtype : 'Store',
        listeners : {
         beforeload : function (_self, options)
          {
             options.params =     options.params || {};
              options.params['query[search_name]'] = _this.searchBox.getValue();
             
              options.params['query[failed]'] = 1;
               options.params['query[unreviewed]'] = 1;
              options.params['search[country_ar]'] =  _this.country_ar_combo.getValue(); 
              
                   
          }
        },
        proxy : {
         method : 'GET',
         url : baseURL + '/Roo/pressrelease_contact.php',
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
                 'name': 'category_type_id',
                 'type': 'int'
             },
             {
                 'name': 'honor',
                 'type': 'string'
             },
             {
                 'name': 'name',
                 'type': 'string'
             },
             {
                 'name': 'name_alt',
                 'type': 'string'
             },
             {
                 'name': 'company_id_name',
                 'type': 'string'
             },
             {
                 'name': 'role',
                 'type': 'string'
             },
             {
                 'name': 'email',
                 'type': 'string'
             },
             {
                 'name': 'email_personal',
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
                 'name': 'address',
                 'type': 'string'
             },
             {
                 'name': 'category_media_id',
                 'type': 'int'
             },
             {
                 'name': 'submission_time',
                 'type': 'string'
             },
             {
                 'name': 'media_language',
                 'type': 'string'
             },
             {
                 'name': 'url',
                 'type': 'string'
             },
             {
                 'name': 'remarks',
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
       colModel : [
        {
         dataIndex : 'firstname',
         header : _this._strings['20db0bfeecd8fe60533206a2b5e9891a'] /* First name */,
         renderer : function(v,x,r) { 
             var d = r.data;
             if (d.firstname_alt.length) {
             
                 return String.format('{0} ({1})', d.firstname, d.firstname_alt ); 
             }
             return String.format('{0}', d.firstname); 
         },
         sortable : true,
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'lastname',
         header : _this._strings['a7f0ba4d77215ad8a7ca74781933c94f'] /* Family Name */,
         renderer : function(v,x,r) { 
             var d = r.data;
             if (d.lastname_alt.length) {
             
                 return String.format('{0} ({1})', d.lastname, d.lastname_alt ); 
             }
             return String.format('{0}', d.lastname); 
         },
         sortable : true,
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'publication_name',
         header : _this._strings['6bd6beac1da76b2d2a9c3b7914ba034c'] /* Publication */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'country',
         header : _this._strings['59716c97497eb9694541f7c3d37b1a4d'] /* Country */,
         renderer : function(v) { return String.format('{0}', v ? Pman.I18n.toName('c', v) : ''); },
         sortable : true,
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'email',
         header : _this._strings['ce8ae9da5b7cd6c3df2929543a9af92d'] /* Email */,
         renderer : function(v,x,r) { 
          
             var f = (
                     r.data.email_fails > 0 ? '<span style="color:red">{0}</span>' : '{0}'
                 ) + (
                 r.data.email2.length > 0 ? 
                     (r.data.email2_fails > 0 ? '<br/><span style="color:red">{1}</span>' : '<br/>{1}')    : ''
                 ) + (
                 r.data.email3.length > 0 ? 
                     (r.data.email3_fails > 0 ? '<br/><span style="color:red">{2}</span>' : '<br/>{2}')    : ''
                 );
                 
                 
             
             return String.format(f, v, r.data.email2, r.data.email3); 
             
         },
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'failure',
         header : _this._strings['acbb73117879b0729ee3bac61edb023a'] /* Last Failed details */,
         renderer : function(v,x,r) { 
         
             var map =  {
                 phone : 'Phone',
                 phone_mobile : 'Mobile',
                 phone_direct: 'Direct Line'
             }
             var ret = [];
             for (var i in map) {
                 if (r.data[i].length) {
                     ret.push( map[i]+': ' +  String.format('{0}' , r.data[i]))
                 }
             }
         
             return ret.join('<BR/>');
             
         },
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        }
       ]
      }
     },
     {
      background : true,
      fitContainer : true,
      fitToframe : true,
      region : 'south',
      tableName : 'pressrelease_notify',
      title : _this._strings['f45381a54504218e39aca33492d29306'] /* Circulation */,
      xns : Roo,
      '|xns' : 'Roo',
      xtype : 'GridPanel',
      listeners : {
       activate : function() {
            _this.circpanel = this;
             
        }
      },
      grid : {
       autoExpandColumn : 'event_id_remarks',
       loadMask : true,
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       xtype : 'Grid',
       listeners : {
        render : function() 
         {
             _this.circgrid = this; 
             //_this.dialog = Pman.Dialog.FILL_IN
             if (_this.circpanel.active) {
                this.footer.onClick('first');
             }
         },
        rowdblclick : function (_self, rowIndex, e)
         {
             var rec = this.ds.getAt(rowIndex);
             var g= this;
             Pman.Dialog.PressReleaseContact.show({ id : rec.data.person_id }, function()
             {
                 g.footer.onClick('first');
             });
         }
       },
       footer : {
        displayInfo : true,
        displayMsg : _this._strings['a58c1bdecbdb3600f836a9a3510250e6'] /* Displaying history 0} - {1} of {2} */,
        emptyMsg : _this._strings['f8b970440931adb9af295d634b56110d'] /* No Items found */,
        pageSize : 25,
        xns : Roo,
        '|xns' : 'Roo',
        xtype : 'PagingToolbar'
       },
       dataSource : {
        remoteSort : true,
        sortInfo : { field : 'sent', direction: 'DESC' },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        xtype : 'Store',
        listeners : {
         beforeload : function (_self, o)
          {
            o.params = o.params || {};
            o.params.ontable = 'pressrelease_entry';
            //
            
            //o.params.onid = _this.form.findField('id').getValue();
            o.params.vtype = "FAILED";
            if (!_this.grid || !_this.grid.getSelectionModel) {
            // not loaded yet.
              return false;
              }
            var s = _this.grid.getSelectionModel().getSelected();
            if (!s) {
               _this.circgrid.ds.removeAll();
              return false;
            }
            o.params.fail_reviewed = 0;
            
            o.params.person_id = s.data.id;
          
          },
         load : function (_self, records, options)
          {
              Roo.log(records);
              if (!records.length) {
                  _this.grid.footer.onClick('refresh');
              }
          }
        },
        proxy : {
         method : 'GET',
         url : baseURL + '/Roo/pressrelease_notify.php',
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
                 'name': 'act_when',
                 'type': 'date',
                 'dateFormat': 'Y-m-d'
             },
             {
                 'name': 'onid',
                 'type': 'int'
             },
             {
                 'name': 'ontable',
                 'type': 'string'
             },
             {
                 'name': 'person_id',
                 'type': 'int'
             },
             {
                 'name': 'msgid',
                 'type': 'string'
             },
             {
                 'name': 'sent',
                 'type': 'date',
                 'dateFormat': 'Y-m-d'
             },
             {
                 'name': 'bounced',
                 'type': 'int'
             },
             {
                 'name': 'person_id_id',
                 'type': 'int'
             },
             {
                 'name': 'person_id_category_type_id',
                 'type': 'int'
             },
             {
                 'name': 'person_id_honor',
                 'type': 'string'
             },
             {
                 'name': 'person_id_name',
                 'type': 'string'
             },
             {
                 'name': 'person_id_name_alt',
                 'type': 'string'
             },
             {
                 'name': 'person_id_company_id_name',
                 'type': 'string'
             },
             {
                 'name': 'person_id_role',
                 'type': 'string'
             },
             {
                 'name': 'person_id_email',
                 'type': 'string'
             },
             {
                 'name': 'person_id_email_personal',
                 'type': 'string'
             },
             {
                 'name': 'person_id_phone',
                 'type': 'string'
             },
             {
                 'name': 'person_id_fax',
                 'type': 'string'
             },
             {
                 'name': 'person_id_address',
                 'type': 'string'
             },
             {
                 'name': 'person_id_category_media_id',
                 'type': 'int'
             },
             {
                 'name': 'person_id_submission_time',
                 'type': 'string'
             },
             {
                 'name': 'person_id_publication_lang',
                 'type': 'string'
             },
             {
                 'name': 'person_id_url',
                 'type': 'string'
             },
             {
                 'name': 'person_id_remarks',
                 'type': 'string'
             },
             {
                 'name': 'person_id_phone_mobile',
                 'type': 'string'
             },
             {
                 'name': 'person_id_phone_direct',
                 'type': 'string'
             },
             {
                 'name': 'person_id_firstname',
                 'type': 'string'
             },
             {
                 'name': 'person_id_lastname',
                 'type': 'string'
             },
             {
                 'name': 'person_id_firstname_alt',
                 'type': 'string'
             },
             {
                 'name': 'person_id_lastname_alt',
                 'type': 'string'
             },
             {
                 'name': 'person_id_publication_name',
                 'type': 'string'
             },
             {
                 'name': 'person_id_publication_name_alt',
                 'type': 'string'
             },
             {
                 'name': 'person_id_category_scope_id',
                 'type': 'int'
             },
             {
                 'name': 'person_id_contact_language',
                 'type': 'string'
             },
             {
                 'name': 'person_id_contact_language_alt',
                 'type': 'string'
             },
             {
                 'name': 'person_id_country',
                 'type': 'string'
             },
             {
                 'name': 'person_id_best_contact_method',
                 'type': 'string'
             },
             {
                 'name': 'person_id_best_contact_from',
                 'type': 'string'
             },
             {
                 'name': 'person_id_best_contact_to',
                 'type': 'string'
             },
             {
                 'name': 'person_id_best_contact_days',
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
       sm : {
        singleSelect : true,
        xns : Roo.grid,
        '|xns' : 'Roo.grid',
        xtype : 'RowSelectionModel'
       },
       colModel : [
        {
         dataIndex : 'id',
         header : _this._strings['9c9745a343efeacc9efe9b7222b27afb'] /* Ref# */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 50,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'act_when',
         header : _this._strings['122a26ef126e03089bb959c949d12b0a'] /* Due out (Local time) */,
         renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y H:i') : ''); },
         width : 120,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'sent',
         header : _this._strings['7f8c0283f16925caed8e632086b81b9c'] /* Sent */,
         renderer : function(v,x,r) { 
            if (!r.data.event_id) {
                 return 'not sent yet';
            }
            
             return String.format('{0}', v ? v.format('d/M/Y H:i:s') : ''); 
         },
         width : 120,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'to_email',
         header : _this._strings['7800aee89e121611c7edfcf2ca662e09'] /* Failed Address */,
         renderer : function(v,x,r) { 
         
             
                 return String.format('<B>{0}</B>', v);
         },
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'event_id_remarks',
         header : _this._strings['ec53a8c4f07baed5d8825072c89799be'] /* Status */,
         renderer : function(v) { 
              
             return String.format('<span qtip="{1}">{0}</span>', v,String.format('{0}', v)); 
         },
         width : 150,
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
