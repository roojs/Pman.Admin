//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminPermMembers = new Roo.XComponent({
  part     :  ["old", "AdminPermMembers" ],
  order    : '001-Pman.Tab.AdminPermMembers',
  region   : 'center',
  parent   : 'Pman.Tab.AdminPermManager',
  name     : "Pman.Tab.AdminPermMembers",
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
      url : baseURL + '/Roo/core_person',
      xtype : 'HttpProxy',
      method : 'GET',
      xns : Roo.data
     },
     reader : {
      '|xns' : 'Roo.data',
      id : 'id',
      root : 'data',
      xtype : 'JsonReader',
      xns : Roo.data,
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
      totalProperty : 'total'
     },
     '|xns' : 'Roo.data',
     xtype : 'Store',
     remoteSort : true,
     sortInfo : { field : 'name', direction: 'ASC' },
     xns : Roo.data,
     listeners : {
      update : function (_self, record, operation)
       {
           if (operation != 'commit') {
               return;
           }
           // only used to change active status.
           
           new Pman.Request({
               url : baseURL + '/Roo/core_person',
               method :'POST',
               params : {
                   id : record.data.id,
                   active: record.data.active
                   
               },
               success : function() {
                   // do nothing
                   
                   _this.grid.ds.remove(record);
                   
               },
               failure : function() 
               {
                   Roo.MessageBox.alert("Error", "saving failed", function() {
                       _this.grid.footer.onClick('first');
                   });
               }
           });
       },
      beforeload : function (_self, o)
       {
         
          // technically we may allow non-owner's to be in the group..
          // need to work out how that will work...
          // 
          
           //o.params['company_id_comptype'] = 'OWNER';
           o.params['query[search]'] = _this.searchBox.getValue();
           
           if (!_this.activeButton) {return; false;}
           
           
           o.params.active = _this.activeButton.pressed ? 0 : 1;
           if (!Pman.Tab.AdminPermManager) { 
               return false;
           }
           
           
           if (Pman.Tab.AdminPermManager && Pman.Tab.AdminPermManager.grid) {
               var tms = Pman.Tab.AdminPermManager.grid.getSelectionModel().getSelected();
               
               if (!tms) {
                   return false;
               }
               o.params['query[in_group]'] = tms.data.id;
               o.params['query[type]'] = 0; // group type..
               
           }
           //o.params['query[name]'] = _this.searchBox.getValue();
         
           
       }
     },
     items : [

     ]

    },
    footer : {
     '|xns' : 'Roo',
     pageSize : 25,
     xtype : 'PagingToolbar',
     emptyMsg : "No Person found",
     xns : Roo,
     displayInfo : true,
     displayMsg : "Displaying Person{0} - {1} of {2}",
     items : [
      {
       '|xns' : 'Roo.Toolbar',
       text : "Drag person to add or remove from group",
       xtype : 'TextItem',
       xns : Roo.Toolbar
      }
     ]

    },
    toolbar : {
     '|xns' : 'Roo',
     xtype : 'Toolbar',
     xns : Roo,
     items : [
      {
       '|xns' : 'Roo.Toolbar',
       text : "Add",
       xtype : 'Button',
       cls : 'x-btn-text-icon',
       icon : Roo.rootURL + 'images/default/dd/drop-add.gif',
       xns : Roo.Toolbar,
       listeners : {
        click : function()
         {
             
             _this.dialog.show( { id : 0 } , function() {
                 _this.grid.footer.onClick('first');
            }); 
         }
       }
      },
      {
       '|xns' : 'Roo.Toolbar',
       text : "Bulk Add",
       xtype : 'Button',
       cls : 'x-btn-text-icon',
       icon : Roo.rootURL + 'images/default/dd/drop-add.gif',
       xns : Roo.Toolbar,
       listeners : {
        click : function()
         {
             
             Pman.Dialog.PersonBulkAdd.show( { id : 0 } , function() {
                 _this.grid.footer.onClick('first');
            }); 
         }
       }
      },
      {
       '|xns' : 'Roo.Toolbar',
       text : "Edit",
       xtype : 'Button',
       cls : 'x-btn-text-icon',
       icon : Roo.rootURL + 'images/default/tree/leaf.gif',
       xns : Roo.Toolbar,
       listeners : {
        click : function()
         {
             var s = _this.grid.getSelectionModel().getSelections();
             if (!s.length || (s.length > 1))  {
                 Roo.MessageBox.alert("Error", s.length ? "Select only one Row" : "Select a Row");
                 return;
             }
           
             _this.dialog.show(s[0].data, function() {
                 _this.grid.footer.onClick('first');
             }); 
             
         }
       }
      },
      {
       '|xns' : 'Roo.Toolbar',
       xtype : 'Separator',
       xns : Roo.Toolbar
      },
      {
       '|xns' : 'Roo.Toolbar',
       text : "Search",
       xtype : 'TextItem',
       xns : Roo.Toolbar
      },
      {
       '|xns' : 'Roo.form',
       xtype : 'TextField',
       xns : Roo.form,
       listeners : {
        specialkey : function (_self, e)
         {
           if (e.getKey() == 13) {
             _this.grid.footer.onClick('first');
           }
         },
        show : function (_self,e)
         {
             if (e.getCharCode() != 13) {
                 return;
             }
             _this.grid.footer.onClick('first');
         },
        render : function (_self)
         {
             _this.searchBox = _self;
         }
       }
      },
      {
       '|xns' : 'Roo.Toolbar',
       xtype : 'Button',
       cls : 'x-btn-icon',
       icon : rootURL + '/Pman/templates/images/search.gif',
       xns : Roo.Toolbar,
       listeners : {
        click : function (_self, e)
         {
         _this.grid.footer.onClick('first');
         }
       }
      },
      {
       '|xns' : 'Roo.Toolbar',
       xtype : 'Button',
       cls : 'x-btn-icon',
       icon : rootURL + '/Pman/templates/images/edit-clear.gif',
       xns : Roo.Toolbar,
       listeners : {
        click : function (_self, e)
         {
         _this.searchBox.setValue('');
             _this.grid.footer.onClick('first');
         }
       }
      },
      {
       '|xns' : 'Roo.Toolbar',
       xtype : 'Fill',
       xns : Roo.Toolbar
      },
      {
       '|xns' : 'Roo.Toolbar',
       text : "Show Removed",
       enableToggle : true,
       xtype : 'Button',
       xns : Roo.Toolbar,
       listeners : {
        toggle : function (_self, pressed)
         {
            _this.grid.footer.onClick('first');
            this.setText(pressed ? "Show Active" : "Show Removed");
            
            
         },
        render : function (_self)
         {
           _this.activeButton = _self;
         }
       }
      }
     ]

    },
    '|xns' : 'Roo.grid',
    autoExpandColumn : 'name',
    xtype : 'Grid',
    ddGroup : 'groupDD',
    enableDrag : true,
    loadMask : true,
    xns : Roo.grid,
    colModel : [
      {
       '|xns' : 'Roo.grid',
       hidden : true,
       xtype : 'ColumnModel',
       sortable : true,
       header : 'Project',
       width : 75,
       renderer : function(v,x,r) { 
             return String.format('<span qtip="{0}">{1}</span>', 
                           r.data.project_id_name,
                           v);
        },
       xns : Roo.grid,
       dataIndex : 'project_id_code'
      },
{
       '|xns' : 'Roo.grid',
       xtype : 'ColumnModel',
       sortable : true,
       header : 'Type',
       width : 50,
       renderer : function(v,x,r) {
           if (r.data.office_id) {
               return String.format('{0} - {1}', v, r.data.office_id_name); 
           } 
           return String.format('{0}', v); 
       },
       xns : Roo.grid,
       dataIndex : 'company_id_comptype'
      },
{
       '|xns' : 'Roo.grid',
       xtype : 'ColumnModel',
       sortable : true,
       header : 'Company',
       width : 150,
       renderer : function(v,x,r) {
           if (r.data.office_id) {
               return String.format('{0} - {1}', v, r.data.office_id_name); 
           } 
           return String.format('{0}', v); 
       },
       xns : Roo.grid,
       dataIndex : 'company_id_name'
      },
{
       '|xns' : 'Roo.grid',
       xtype : 'ColumnModel',
       sortable : true,
       header : 'Name',
       width : 200,
       renderer : function(v,p,r) { 
           if(r.data.active != 1){
               return String.format('<div style="text-decoration:line-through">{0}</div>', v); 
           }
           return String.format('{0}', v); 
       },
       xns : Roo.grid,
       dataIndex : 'name'
      },
{
       '|xns' : 'Roo.grid',
       xtype : 'ColumnModel',
       width : 100,
       header : 'Role',
       renderer : function(v) { return String.format('{0}', v); },
       xns : Roo.grid,
       dataIndex : 'role'
      },
{
       '|xns' : 'Roo.grid',
       xtype : 'ColumnModel',
       width : 100,
       header : 'Phone',
       renderer : function(v) { return String.format('{0}', v); },
       xns : Roo.grid,
       dataIndex : 'phone'
      },
{
       '|xns' : 'Roo.grid',
       xtype : 'ColumnModel',
       width : 100,
       header : 'Fax',
       renderer : function(v) { return String.format('{0}', v); },
       xns : Roo.grid,
       dataIndex : 'fax'
      },
{
       '|xns' : 'Roo.grid',
       xtype : 'ColumnModel',
       sortable : true,
       header : 'Email',
       width : 200,
       renderer : function(v) {
          return (v.length && v.indexOf('@') > 0 ) ? 
                           String.format('<a href="mailto:{0}">{0}</a>',v) : v;
        },
       xns : Roo.grid,
       dataIndex : 'email'
      },
{
       '|xns' : 'Roo.grid',
       xtype : 'ColumnModel',
       width : 75,
       header : 'Active',
       renderer : function(v) {  
           var state = v> 0 ?  '-checked' : '';
       
           return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                       
        },
       xns : Roo.grid,
       dataIndex : 'active'
      }
    ],
    listeners : {
     rowdblclick : function (_self, rowIndex, e)
      {
          if (!_this.dialog) return;
          _this.dialog.show( this.getDataSource().getAt(rowIndex), function() {
              _this.grid.footer.onClick('first');
          }); 
      },
     render : function() 
      {
          _this.grid = this; 
          if (!_this.dialog) {
              _this.dialog = Pman.Dialog.PersonEdit;
              
          }
          //_this.dialog = Pman.Dialog.FILL_IN
          if (_this.panel.active) {
             this.footer.onClick('first');
          }
      },
     cellclick : function (_self, rowIndex, columnIndex, e)
      {
      
              var di = this.colModel.getDataIndex(columnIndex);
              if (di != 'active') {
                  return;
              }
               
              var rec = _this.grid.ds.getAt(rowIndex);
              
              rec.set('active', rec.data.active ? 0 : 1);
              rec.commit();
              Roo.select('.x-grid-row-selected').item(1).addClass('fadeout');
              (function(){
                  _this.grid.footer.onClick('first');
              }).defer(5000)();
              
      }
    },
    items : [

    ]

   },
   '|xns' : 'Roo',
   autoScroll : true,
   fitToframe : true,
   background : true,
   region : 'center',
   title : "Person",
   xtype : 'GridPanel',
   fitContainer : true,
   xns : Roo,
   tableName : 'Person',
   listeners : {
    activate : function() {
         _this.panel = this;
         if (_this.grid) {
             _this.grid.footer.onClick('first');
         }
     }
   },
   items : [

   ]

  };  }
});
