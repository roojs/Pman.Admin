//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.ReleaseAutoImport = new Roo.XComponent({

 _strings : {
  '8444e81d652b084d70c71cd7d19ac0cf' :"Displaying Person{0} - {1} of {2}",
  'ec211f7c20af43e742bf2570c3cb84f9' :"Add",
  '4994a8ffeba4ac3140beb89e8d41f174' :"Language",
  'ae739a236065a45c64ad51aacb19498c' :"Active?",
  'b718adec73e04ce3ec720dd11a06a308' :"ID",
  '4d5132198405b8a7040014093eaf2a97' :"Local Search URL",
  'bd4ee57b129ed3d30775c19232ba1c15' :"Local Search Allow param",
  '2d6ac83e6e4f45464be94fff0a4078c7' :"Local Search?",
  '4947239eaadfb5281602e095efb71236' :"Run Fetch",
  'f9b8e4200f58dc66e0d9a7be17e06e46' :"Delete   ",
  'a8abd77bc82b1b3ba04122af34016fcc' :"Auto Import After Release",
  'f1174ecbbc232f948717979daf04cf08' :"No Person found",
  'e6b391a8d2c4d45902a23a8b6585703d' :"URL"
 },

  part     :  ["PressRelease", "ReleaseAutoImport" ],
  order    : '888-Pman.Tab.ReleaseAutoImport',
  region   : 'center',
  parent   : 'Pman.Tab.PressReleaseTab',
  name     : "unnamed module",
  disabled : false, 
  permname : '', 
  _tree : function()
  {
   var _this = this;
   var MODULE = this;
   return {
   grid : {
    dataSource : {
     proxy : {
      '|xns' : 'Roo.data',
      method : 'GET',
      url : baseURL + '/Roo/Pressrelease_auto_import.php',
      xns : Roo.data,
      xtype : 'HttpProxy'
     },
     reader : {
      '|xns' : 'Roo.data',
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
      xtype : 'JsonReader'
     },
     '|xns' : 'Roo.data',
     remoteSort : true,
     sortInfo : { field : 'name', direction: 'ASC' },
     xns : Roo.data,
     xtype : 'Store',
     listeners : {
      beforeload : function (_self, o)
       {
           o.params = o.params || {};
           
       },
      update : function (_self, record, operation)
       {
           if (operation != 'commit') {
               return;
           }
           
           // only used to change active status.
           if(!Roo.form.VTypes.url(record.data.url)){
               Roo.MessageBox.alert('Error', Roo.form.VTypes.urlText);
               return;
           }
           
           new Pman.Request({
               url : baseURL + '/Roo/Pressrelease_auto_import.php',
               method :'POST',
               params : {
                   id : record.data.id,
                   url: record.data.url,
                   is_active: record.data.is_active,
                   language: record.data.language,
                   use_local_search: record.data.use_local_search,
                   local_search_url: record.data.local_search_url,
                   local_search_allow: record.data.local_search_allow,
               },
               success : function(res) {
                   // do nothing
                   Roo.log(res);
                   if (!record.data.id) {
                       record.set('id', res.data.id);
                   }
                   
                   
               },
               failure : function(res) 
               {
                   Roo.MessageBox.alert("Error", res.errorMsg, function() {
                       _this.grid.footer.onClick('first');
                   });
               }
           });
       }
     },
     items : [

     ]

    },
    footer : {
     '|xns' : 'Roo',
     displayInfo : true,
     displayMsg : _this._strings['8444e81d652b084d70c71cd7d19ac0cf'],
     emptyMsg : _this._strings['f1174ecbbc232f948717979daf04cf08'],
     pageSize : 100,
     xns : Roo,
     xtype : 'PagingToolbar'
    },
    toolbar : {
     '|xns' : 'Roo',
     xns : Roo,
     xtype : 'Toolbar',
     items : [
      {
       '|xns' : 'Roo.Toolbar',
       cls : 'x-btn-text-icon',
       icon : Roo.rootURL + 'images/default/dd/drop-add.gif',
       text : _this._strings['ec211f7c20af43e742bf2570c3cb84f9'],
       xns : Roo.Toolbar,
       xtype : 'Button',
       listeners : {
        click : function()
         {
             var ds = _this.grid.ds;
              
             var add = ds.reader.newRow({    
                      id: 0, 
                      url: ''
             });
             var r = ds.data.length;
             ds.insert(r, add);
             _this.grid.startEditing(r, 0); // name... 
         }
       }
      },
      {
       '|xns' : 'Roo.Toolbar',
       xns : Roo.Toolbar,
       xtype : 'Fill'
      },
      {
       '|xns' : 'Roo.Toolbar',
       cls : 'x-btn-text-icon',
       icon : rootURL + '/Pman/templates/images/trash.gif',
       text : _this._strings['4947239eaadfb5281602e095efb71236'],
       xns : Roo.Toolbar,
       xtype : 'Button',
       listeners : {
        click : function()
         {
             var s = Pman.Tab.ReleaseAutoImport.grid.selModel.selection;
             if (!s){
                 Roo.MessageBox.alert("Error", "Select a Row");
                 return;
             }
             
             if(s.record.data.use_local_search < 1){
                 Roo.MessageBox.alert('Error', 'Please enable the Local Search');
                 return;
             }
             
             new Pman.Download({
                 newWindow : true,
                 url : baseURL + '/PressRelease/Import/LocalSearch/Fetch/'+ s.record.id,
                 params : {
                     
                 }
             });
             
         }
       }
      },
      {
       '|xns' : 'Roo.Toolbar',
       cls : 'x-btn-text-icon',
       icon : rootURL + '/Pman/templates/images/trash.gif',
       text : _this._strings['f9b8e4200f58dc66e0d9a7be17e06e46'],
       xns : Roo.Toolbar,
       xtype : 'Button',
       listeners : {
        click : function()
         {
             var s = Pman.Tab.ReleaseAutoImport.grid.selModel.selection;
             if (!s){
                 Roo.MessageBox.alert("Error", "Select a Row");
                 return;
             }
             
             new Pman.Request({
                 url : baseURL + '/Roo/Pressrelease_auto_import.php',
                 method :'POST',
                 params : {
                     _delete : s.record.data.id
                 },
                 success : function() {
                     // do nothing
                     
                     _this.grid.footer.onClick('first');
                     
                 },
                 failure : function() 
                 {
                     Roo.MessageBox.alert("Error", "saving failed", function() {
                         _this.grid.footer.onClick('first');
                     });
                 }
             });
         }
       }
      }
     ]

    },
    '|xns' : 'Roo.grid',
    autoExpandColumn : 'url',
    clicksToEdit : 1,
    loadMask : true,
    xns : Roo.grid,
    xtype : 'EditorGrid',
    colModel : [
      {
       '|xns' : 'Roo.grid',
       dataIndex : 'id',
       header : _this._strings['b718adec73e04ce3ec720dd11a06a308'],
       renderer : function(v,x,r)
       {
           return String.format('{0}', v);
       },
       sortable : true,
       width : 75,
       xns : Roo.grid,
       xtype : 'ColumnModel'
      },
{
       editor : {
        field : {
         '|xns' : 'Roo.form',
         xns : Roo.form,
         xtype : 'TextField'
        },
        '|xns' : 'Roo.grid',
        xns : Roo.grid,
        xtype : 'GridEditor',
        items : [

        ]

       },
       '|xns' : 'Roo.grid',
       dataIndex : 'url',
       header : _this._strings['e6b391a8d2c4d45902a23a8b6585703d'],
       renderer : function(v,x,r)
       {
           return String.format('{0}', v);
       },
       sortable : true,
       width : 75,
       xns : Roo.grid,
       xtype : 'ColumnModel',
       items : [

       ]

      },
{
       editor : {
        field : {
         store : {
          '|xns' : 'Roo.data',
          data : (function() {
              return Pman.I18n.simpleStoreData('l');
          })(),
          fields : [  'code', 'title' ],
          xns : Roo.data,
          xtype : 'SimpleStore'
         },
         '|xns' : 'Roo.form',
         allowBlank : true,
         displayField : 'title',
         editable : false,
         hiddenName : 'language',
         listWidth : 200,
         mode : 'local',
         name : 'language_name',
         tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{title}</b> </div>',
         triggerAction : 'all',
         valueField : 'code',
         width : 200,
         xns : Roo.form,
         xtype : 'ComboBox',
         listeners : {
          select : function (combo, record, index)
           {
               Roo.log(record);
           }
         },
         items : [

         ]

        },
        '|xns' : 'Roo.grid',
        xns : Roo.grid,
        xtype : 'GridEditor',
        items : [

        ]

       },
       '|xns' : 'Roo.grid',
       dataIndex : 'language',
       header : _this._strings['4994a8ffeba4ac3140beb89e8d41f174'],
       renderer : function(v,x,r)
       {
           return String.format('{0}', r.data.language_name);
       },
       sortable : true,
       width : 200,
       xns : Roo.grid,
       xtype : 'ColumnModel',
       items : [

       ]

      },
{
       editor : {
        field : {
         '|xns' : 'Roo.form',
         xns : Roo.form,
         xtype : 'TextField'
        },
        '|xns' : 'Roo.grid',
        xns : Roo.grid,
        xtype : 'GridEditor',
        items : [

        ]

       },
       '|xns' : 'Roo.grid',
       dataIndex : 'local_search_url',
       header : _this._strings['4d5132198405b8a7040014093eaf2a97'],
       renderer : function(v,x,r)
       {
           return String.format('{0}', v);
       },
       width : 300,
       xns : Roo.grid,
       xtype : 'ColumnModel',
       items : [

       ]

      },
{
       editor : {
        field : {
         '|xns' : 'Roo.form',
         xns : Roo.form,
         xtype : 'TextField'
        },
        '|xns' : 'Roo.grid',
        xns : Roo.grid,
        xtype : 'GridEditor',
        items : [

        ]

       },
       '|xns' : 'Roo.grid',
       dataIndex : 'local_search_allow',
       header : _this._strings['bd4ee57b129ed3d30775c19232ba1c15'],
       renderer : function(v,x,r)
       {
           return String.format('{0}', v);
       },
       width : 300,
       xns : Roo.grid,
       xtype : 'ColumnModel',
       items : [

       ]

      },
{
       editor : {
        '|xns' : 'Roo.grid',
        xns : Roo.grid,
        xtype : 'GridEditor'
       },
       '|xns' : 'Roo.grid',
       dataIndex : 'use_local_search',
       header : _this._strings['2d6ac83e6e4f45464be94fff0a4078c7'],
       renderer : function(v)
       {
           var state = v> 0 ?  '-checked' : '';
           return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
       },
       width : 80,
       xns : Roo.grid,
       xtype : 'ColumnModel',
       items : [

       ]

      },
{
       editor : {
        '|xns' : 'Roo.grid',
        xns : Roo.grid,
        xtype : 'GridEditor'
       },
       '|xns' : 'Roo.grid',
       dataIndex : 'is_active',
       header : _this._strings['ae739a236065a45c64ad51aacb19498c'],
       renderer : function(v)
       {
           var state = v> 0 ?  '-checked' : '';
           return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
       },
       width : 80,
       xns : Roo.grid,
       xtype : 'ColumnModel',
       items : [

       ]

      }
    ],
    listeners : {
     afteredit : function (e)
      {
          if(e.record.data.url){
              e.record.commit();
          }
      },
     cellclick : function (_self, rowIndex, columnIndex, e)
      {
          var di = this.colModel.getDataIndex(columnIndex);
          if (di != 'use_local_search' && di != 'is_active') {
              return;
          }
          
          var rec = _this.grid.ds.getAt(rowIndex);
      
          rec.set(di, rec.data[di] ? 0 : 1);
          rec.commit();
      },
     render : function() 
      {
          _this.grid = this; 
          
          //_this.dialog = Pman.Dialog.FILL_IN
          if (_this.panel.active){
              if(typeof(Pman.Tab.PressReleaseTab) != 'undefined'){
                  this.footer.onClick('first');
              }
          }
      }
    },
    items : [

    ]

   },
   '|xns' : 'Roo',
   autoScroll : true,
   background : true,
   fitContainer : true,
   fitToframe : true,
   region : 'center',
   tableName : 'Person',
   title : _this._strings['a8abd77bc82b1b3ba04122af34016fcc'],
   xns : Roo,
   xtype : 'GridPanel',
   listeners : {
    activate : function() {
         _this.panel = this;
         if (_this.grid) {
             //_this.grid.footer.onClick('first');
         }
     }
   },
   items : [

   ]

  };  }
});
