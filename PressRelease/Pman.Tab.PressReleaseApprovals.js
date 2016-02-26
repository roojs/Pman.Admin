//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.PressReleaseApprovals = new Roo.XComponent({

 _strings : {
  '0affb4fb177febfe57558d98f9cc85b0' :"Changes Requiring Approval",
  '99f1888871e14cbf8bca1cd8db21e400' :"No pressrelease_contact found",
  '59716c97497eb9694541f7c3d37b1a4d' :"Country",
  '3c1df4260ce594cb5594696461087f2f' :"Select Country",
  '53e5aa2c97fef1555d2511de8218c544' :"By",
  'ce8ae9da5b7cd6c3df2929543a9af92d' :"Email",
  'b1b8216a01f7fec51609d6ab603a2678' :"Publication Scope",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  '326185f4d4dfc0ef9df05d4de4ad5b5e' :"Displaying pressrelease_contact{0} - {1} of {2}",
  '76d81d87559357ebf5788e0eb1024aec' :"Edited by",
  '3a2144c282d31ed1c7d57a7140fcf96d' :"Select Publication Language",
  '09662a52490abccda21b4b452a7f172e' :"Approve Selected Contacts",
  'a7f0ba4d77215ad8a7ca74781933c94f' :"Family Name",
  '67ed6ddb7d890b23166c1bef771e9451' :"Edited",
  '6bd6beac1da76b2d2a9c3b7914ba034c' :"Publication",
  '1f96b7ecf6ec7e9ce1d960453af38752' :"News Beat(s)",
  '20db0bfeecd8fe60533206a2b5e9891a' :"First name",
  '754e1e134bc554a0af39749edbb59b9f' :"Job Title",
  '6ab9375e8f8108c11f21ab43d913e79c' :"Tel.",
  '37812357a4cd25b17d95104efe022401' :"Publ. Lang"
 },

  part     :  ["PressRelease", "Approvals" ],
  order    : '005-Pman.Tab.PressReleaseApprovals',
  region   : 'center',
  parent   : 'Pman.Tab.PressReleaseDistribution',
  name     : "Pman.Tab.PressReleaseApprovals",
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
   region : 'center',
   tableName : 'pressrelease_contact',
   title : _this._strings['0affb4fb177febfe57558d98f9cc85b0'] /* Changes Requiring Approval */,
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
    autoExpandColumn : 'lastname',
    loadMask : true,
    multiSort : true,
    xns : Roo.grid,
    '|xns' : 'Roo.grid',
    xtype : 'Grid',
    listeners : {
     render : function() 
      {
          _this.grid = this; 
          _this.dialog = Pman.Dialog.PressReleaseContact;
          if (_this.panel.active) {
             this.footer.onClick('first');
          }
      },
     rowdblclick : function (_self, rowIndex, e)
      {
          if (!_this.dialog) return;
          _this.dialog.show( this.getDataSource().getAt(rowIndex), function() {
              _this.grid.footer.onClick('refresh');
          }); 
      }
    },
    footer : {
     displayInfo : true,
     displayMsg : _this._strings['326185f4d4dfc0ef9df05d4de4ad5b5e'] /* Displaying pressrelease_contact{0} - {1} of {2} */,
     emptyMsg : _this._strings['99f1888871e14cbf8bca1cd8db21e400'] /* No pressrelease_contact found */,
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
       alwaysQuery : true,
       displayField : 'person_id_name',
       editable : false,
       emptyText : _this._strings['76d81d87559357ebf5788e0eb1024aec'] /* Edited by */,
       forceSelection : true,
       listWidth : 300,
       loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
       minChars : 2,
       pageSize : 25,
       qtip : _this._strings['3a2144c282d31ed1c7d57a7140fcf96d'] /* Select Publication Language */,
       queryParam : 'search[publication_lang]',
       selectOnFocus : true,
       tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{person_id_name}</b> </div>',
       triggerAction : 'all',
       typeAhead : true,
       valueField : 'person_id',
       width : 120,
       xns : Roo.form,
       '|xns' : 'Roo.form',
       xtype : 'ComboBox',
       listeners : {
        beforeselect : function (combo, record, index)
         {
           _this.grid.footer.onClick.defer(100, _this.grid.footer,[ 'first' ]);
         },
        render : function (_self)
         {
           _this.person_id_combo = _self;
         }
       },
       store : {
        remoteSort : true,
        sortInfo : { direction : 'ASC', field: 'person_id_name' },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        xtype : 'Store',
        listeners : {
         beforeload : function (_self, o){
              o.params = o.params || {};
              // set more here
              o.params['_distinct'] = 'person_id';
              o.params['_columns'] = 'person_id,person_id_name';
              o.params['on_table'] = 'pressrelease_contact';
          }
        },
        proxy : {
         method : 'GET',
         url : baseURL + '/Roo/Events.php',
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
       alwaysQuery : true,
       displayField : 'publication_lang_name',
       editable : false,
       emptyText : _this._strings['37812357a4cd25b17d95104efe022401'] /* Publ. Lang */,
       forceSelection : true,
       listWidth : 300,
       loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
       minChars : 2,
       pageSize : 25,
       qtip : _this._strings['3a2144c282d31ed1c7d57a7140fcf96d'] /* Select Publication Language */,
       queryParam : 'search[publication_lang]',
       selectOnFocus : true,
       tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{publication_lang_name}</b> </div>',
       triggerAction : 'all',
       typeAhead : true,
       valueField : 'publication_lang',
       width : 120,
       xns : Roo.form,
       '|xns' : 'Roo.form',
       xtype : 'ComboBox',
       listeners : {
        beforeselect : function (combo, record, index)
         {
           _this.grid.footer.onClick.defer(100, _this.grid.footer,[ 'first' ]);
         },
        render : function (_self)
         {
           _this.publication_lang_combo = _self;
         }
       },
       store : {
        remoteSort : true,
        sortInfo : { direction : 'ASC', field: 'publication_lang_name' },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        xtype : 'Store',
        listeners : {
         beforeload : function (_self, o){
              o.params = o.params || {};
              // set more here
              o.params['_distinct'] = 'publication_lang';
              o.params['_columns'] = 'publication_lang,publication_lang_name';
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
       alwaysQuery : true,
       displayField : 'country_name',
       editable : true,
       emptyText : _this._strings['59716c97497eb9694541f7c3d37b1a4d'] /* Country */,
       forceSelection : true,
       listWidth : 300,
       loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
       minChars : 2,
       pageSize : 25,
       qtip : _this._strings['3c1df4260ce594cb5594696461087f2f'] /* Select Country */,
       queryParam : 'search[country]',
       selectOnFocus : true,
       tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{country_name}</b> </div>',
       triggerAction : 'all',
       typeAhead : true,
       valueField : 'country',
       width : 120,
       xns : Roo.form,
       '|xns' : 'Roo.form',
       xtype : 'ComboBox',
       listeners : {
        beforeselect : function (combo, record, index)
         {
           _this.grid.footer.onClick.defer(100, _this.grid.footer,[ 'first' ]);
         },
        render : function (_self)
         {
           _this.country_combo = _self;
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
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar',
       xtype : 'Fill'
      },
      {
       cls : 'x-btn-text-icon',
       icon : Roo.rootURL + 'images/default/tree/leaf.gif',
       text : _this._strings['09662a52490abccda21b4b452a7f172e'] /* Approve Selected Contacts */,
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar',
       xtype : 'Button',
       listeners : {
        click : function()
         {
             var s = _this.grid.getSelectionModel().getSelections();
             if (!s.length )  {
                 Roo.MessageBox.alert("Error", "Select at least  one Row");
                 return;
             }
             var ar = [];
             Roo.each(s, function(r) {
                 ar.push(r.id);
             });
               
             new Pman.Request({
                 url : baseURL + '/Core/NotifyAction',
                 params : {
                     onid : ar.join(','),
                     ontable : 'pressrelease_contact',
                     action : 'APPROVAL'
                 },
                 success : function() {
                     _this.grid.footer.onClick('refresh');
                 }  
             });
               
               
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
            
           
           var ar = [  'publication_lang' , 'country'  ];
           var val = '';
           Roo.each(ar, function(a) {
               if (typeof( _this[a + '_combo']) == 'undefined') {
                   Roo.log('missing ' + a );
                   return;
               }
               val = _this[a + '_combo'].getValue();
               if ((new String(val)).length > 0) {
                   options.params[a] = val;
                   return;
               }
               if (_this[a + '_combo'].el.dom.value == '??') {
                   options.params['search[' + a +']'] = '??';
               }
            });
               options.params['query[_edited_by]'] = _this.person_id_combo.getValue();
           
           // has something been selected in the tree..
            options.params['query[_with_beats'] = 1;
            options.params['query[for_approval]'] = 1;
           
                
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
      dataIndex : 'core_notify_act_when',
      header : _this._strings['67ed6ddb7d890b23166c1bef771e9451'] /* Edited */,
      renderer : function(v,x,r) { 
         if (!v.length) {
             return '??';
         }
         var d = Date.parseDate(v, "Y-m-d H:i:s")
         
          return String.format('{0}', d ? d.format("d/M/Y") : '??'); 
      },
      sortable : true,
      width : 75,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'core_notify_trigger_person_id_name',
      header : _this._strings['53e5aa2c97fef1555d2511de8218c544'] /* By */,
      renderer : function(v,x,r) { 
         
          return String.format('{0}', v); 
      },
      sortable : true,
      width : 100,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
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
      dataIndex : 'role',
      header : _this._strings['754e1e134bc554a0af39749edbb59b9f'] /* Job Title */,
      renderer : function(v) { return String.format('{0}', v); },
      sortable : true,
      width : 100,
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
      dataIndex : 'category_scope_id_name',
      header : _this._strings['b1b8216a01f7fec51609d6ab603a2678'] /* Publication Scope */,
      renderer : function(v) { return String.format('{0}', v); },
      sortable : true,
      width : 100,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'beats',
      header : _this._strings['1f96b7ecf6ec7e9ce1d960453af38752'] /* News Beat(s) */,
      renderer : function(v) { return String.format('{0}',v).split(',').join('<BR/>'); },
      width : 200,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'country',
      header : _this._strings['59716c97497eb9694541f7c3d37b1a4d'] /* Country */,
      renderer : function(v) { return String.format('{0}', v ? Pman.I18n.toName('c', v) : ''); },
      width : 100,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'email',
      header : _this._strings['ce8ae9da5b7cd6c3df2929543a9af92d'] /* Email */,
      renderer : function(v) { return String.format('{0}', v); },
      width : 200,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'phone',
      header : _this._strings['6ab9375e8f8108c11f21ab43d913e79c'] /* Tel. */,
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
  };  }
});
