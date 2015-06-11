//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminContacts = new Roo.XComponent({

 _strings : {
  '99b344c8ae43e3e7213862b8f35c4e51' :"Select Company",
  '1c76cbfe21c6f44c1d1e59d54f3e4420' :"Company",
  'ce8ae9da5b7cd6c3df2929543a9af92d' :"Email",
  '8444e81d652b084d70c71cd7d19ac0cf' :"Displaying Person{0} - {1} of {2}",
  '13348442cc6a27032d2b4aa28b75a5d3' :"Search",
  'ec211f7c20af43e742bf2570c3cb84f9' :"Add",
  '9e727fdd3aec8274f46685441900280d' :"Project",
  '7dce122004969d56ae2e0245cb754d35' :"Edit",
  '4110db87ce3ac86d603d03d691616b1e' :"Drag person to add or remove from group",
  'b47a519aebda8fdb4b59bdae6eb2bff0' :"Show No Company",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  'bcc254b55c4a1babdf1dcb82c207506b' :"Phone",
  '9675747b5ab12d05f18518761e68a533' :"Select Companies",
  '40bed7cf9b3d4bb3a3d7a7e3eb18c5eb' :"Person",
  'f1174ecbbc232f948717979daf04cf08' :"No Person found",
  'ec3249f16ee5880d4c1acb752e5c925f' :"Switch to Selected User",
  'a93806efd0cc7a149f0f03e2b9a0f862' :"Bulk Add",
  'f2a6c498fb90ee345d997f888fce3b18' :"Delete",
  'a1fa27779242b4902f7ae3bdd5c6d508' :"Type",
  '49ee3087348e8d44e1feda1917443987' :"Name",
  'bbbabdbe1b262f75d99d62880b953be1' :"Role",
  '4d3d769b812b6faa6b76e1a8abaece2d' :"Active",
  'd4d25ad0a12e8d30e9d8d35230f6d1d3' :"Show Removed",
  '9810aa2b9f44401be4bf73188ef2b67d' :"Fax"
 },

  part     :  ["Admin", "Contacts" ],
  order    : '001-Pman.Tab.AdminContacts',
  region   : 'center',
  parent   : 'Pman.Tab.AdminContactsManager',
  name     : "Pman.Tab.AdminContacts",
  disabled : false, 
  permname : 'Core.Person', 
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
      url : baseURL + '/Roo/Person.php',
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
           if(!_this.active_company_button.pressed){
               o.params['!company_id_comptype'] = 'OWNER';
           }
           
           o.params['query[search]'] = _this.searchBox.getValue();
           
           if (!_this.activeButton) {return; false;}
           
           if (_this.companyCombo &&   _this.companyCombo.getValue()) {
               o.params.company_id =   _this.companyCombo.getValue();
           }
           
           
           o.params.active = _this.activeButton.pressed ? 0 : 1;
           
           if(_this.active_company_button.pressed){
               o.params.company_id = 0;
           }
           
           var c = Pman.Tab.AdminContactsManager.layout.getRegion('west').getActivePanel();
           
           if (!c) { 
               return false;
           }
           
           var tms = c.grid.getSelectionModel().getSelected();
           
           if (!tms) {
               return false;
           }
           
           if(c.tableName == 'Groups'){
               o.params['query[in_group]'] = tms.data.id;
               o.params['query[type]'] = 2; // group type..
           }else{
               o.params['query[in_country]'] = (tms.data.country*1 == -1) ? '' : tms.data.country;
               o.params['query[in_group]'] = 0;
               o.params['query[type]'] = 2;
           }
           /*
           if (Pman.Tab.AdminContactsGroup && Pman.Tab.AdminContactsGroup.grid) {
               
               
               
           }
           
           if(Pman.Tab.AdminCountries && Pman.Tab.AdminCountries.grid){
               var tms = Pman.Tab.AdminCountries.grid.getSelectionModel().getSelected();
               
               if (!tms) {
                   return false;
               }
               
           }
           */
           //o.params['query[name]'] = _this.searchBox.getValue();
         
       },
      update : function (_self, record, operation)
       {
           if (operation != 'commit') {
               return;
           }
           // only used to change active status.
           
           new Pman.Request({
               url : baseURL + '/Roo/Person.php',
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
     pageSize : 25,
     xns : Roo,
     xtype : 'PagingToolbar',
     items : [
      {
       '|xns' : 'Roo.Toolbar',
       text : _this._strings['4110db87ce3ac86d603d03d691616b1e'],
       xns : Roo.Toolbar,
       xtype : 'TextItem'
      }
     ]

    },
    toolbar : {
     '|xns' : 'Roo',
     xns : Roo,
     xtype : 'Toolbar',
     items : [
      {
       '|xns' : 'Roo.Toolbar',
       text : _this._strings['13348442cc6a27032d2b4aa28b75a5d3'],
       xns : Roo.Toolbar,
       xtype : 'TextItem'
      },
      {
       '|xns' : 'Roo.form',
       xns : Roo.form,
       xtype : 'TextField',
       listeners : {
        render : function (_self)
         {
             _this.searchBox = _self;
         },
        show : function (_self,e)
         {
             if (e.getCharCode() != 13) {
                 return;
             }
             _this.grid.footer.onClick('first');
         },
        specialkey : function (_self, e)
         {
           if (e.getKey() == 13) {
             _this.grid.footer.onClick('first');
           }
         }
       }
      },
      {
       store : {
        proxy : {
         '|xns' : 'Roo.data',
         method : 'GET',
         url : baseURL + '/Roo/Companies.php',
         xns : Roo.data,
         xtype : 'HttpProxy'
        },
        reader : {
         '|xns' : 'Roo.data',
         fields : [{"name":"id","type":"int"},{"name":"code","type":"string"}],
         id : 'id',
         root : 'data',
         totalProperty : 'total',
         xns : Roo.data,
         xtype : 'JsonReader'
        },
        '|xns' : 'Roo.data',
        remoteSort : true,
        sortInfo : { direction : 'ASC', field: 'name' },
        xns : Roo.data,
        xtype : 'Store',
        listeners : {
         beforeload : function (_self, o){
              o.params = o.params || {};
              // set more here
          }
        },
        items : [

        ]

       },
       '|xns' : 'Roo.form',
       displayField : 'name',
       editable : true,
       emptyText : _this._strings['99b344c8ae43e3e7213862b8f35c4e51'],
       forceSelection : true,
       hiddenName : 'company_id',
       listWidth : 400,
       loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'],
       minChars : 2,
       name : 'company_name',
       pageSize : 20,
       qtip : _this._strings['9675747b5ab12d05f18518761e68a533'],
       queryParam : 'query[name]',
       selectOnFocus : true,
       tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{name}</b> </div>',
       triggerAction : 'all',
       typeAhead : true,
       valueField : 'id',
       width : 150,
       xns : Roo.form,
       xtype : 'ComboBox',
       listeners : {
        render : function (_self)
         {
           _this.companyCombo = _self;
         },
        select : function (combo, record, index)
         {
            _this.grid.footer.onClick.defer(300,_this.grid.footer,[ 'first'] );
         }
       },
       items : [

       ]

      },
      {
       '|xns' : 'Roo.Toolbar',
       cls : 'x-btn-icon',
       icon : rootURL + '/Pman/templates/images/search.gif',
       xns : Roo.Toolbar,
       xtype : 'Button',
       listeners : {
        click : function (_self, e)
         {
         _this.grid.footer.onClick('first');
         }
       }
      },
      {
       '|xns' : 'Roo.Toolbar',
       cls : 'x-btn-icon',
       icon : rootURL + '/Pman/templates/images/edit-clear.gif',
       xns : Roo.Toolbar,
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
       '|xns' : 'Roo.Toolbar',
       enableToggle : true,
       text : _this._strings['d4d25ad0a12e8d30e9d8d35230f6d1d3'],
       xns : Roo.Toolbar,
       xtype : 'Button',
       listeners : {
        render : function (_self)
         {
           _this.activeButton = _self;
         },
        toggle : function (_self, pressed)
         {
            _this.grid.footer.onClick('first');
            this.setText(pressed ? "Show Active" : "Show Removed");
            
            
         }
       }
      },
      {
       '|xns' : 'Roo.Toolbar',
       enableToggle : true,
       text : _this._strings['b47a519aebda8fdb4b59bdae6eb2bff0'],
       xns : Roo.Toolbar,
       xtype : 'Button',
       listeners : {
        render : function (_self)
         {
           _this.active_company_button = _self;
         },
        toggle : function (_self, pressed)
         {
            _this.grid.footer.onClick('first');
            this.setText(pressed ? "Show Company" : "Show No Company");
            
            
         }
       }
      },
      {
       '|xns' : 'Roo.Toolbar',
       text : _this._strings['ec3249f16ee5880d4c1acb752e5c925f'],
       xns : Roo.Toolbar,
       xtype : 'Button',
       listeners : {
        click : function (_self, e)
         {
             var s = _this.grid.getSelectionModel().getSelections();
             if(s.length != 1){
                 Roo.MessageBox.alert("Error", "Select a Person");
                 return;
             }
             
             new Pman.Request({
                 url : baseURL + '/Login.php',
                 method : 'GET',
                 params : {
                     'switch' : s[0].data.id
                 },
                 success : function (){
                     document.location = baseURL + '?ts=' + Math.random();
                 },
                 failure : function (d){
                     Roo.log(d);
                     Roo.MessageBox.alert("Error", d);
                 }
             });
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
       icon : Roo.rootURL + 'images/default/dd/drop-add.gif',
       text : _this._strings['ec211f7c20af43e742bf2570c3cb84f9'],
       xns : Roo.Toolbar,
       xtype : 'Button',
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
       cls : 'x-btn-text-icon',
       icon : Roo.rootURL + 'images/default/dd/drop-add.gif',
       text : _this._strings['a93806efd0cc7a149f0f03e2b9a0f862'],
       xns : Roo.Toolbar,
       xtype : 'Button',
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
       cls : 'x-btn-text-icon',
       icon : Roo.rootURL + 'images/default/tree/leaf.gif',
       text : _this._strings['7dce122004969d56ae2e0245cb754d35'],
       xns : Roo.Toolbar,
       xtype : 'Button',
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
       cls : 'x-btn-text-icon',
       icon : rootURL + '/Pman/templates/images/trash.gif',
       text : _this._strings['f2a6c498fb90ee345d997f888fce3b18'],
       xns : Roo.Toolbar,
       xtype : 'Button',
       listeners : {
        click : function()
         {
              Pman.genericDelete(_this, 'Person'); 
         }
       }
      }
     ]

    },
    '|xns' : 'Roo.grid',
    autoExpandColumn : 'name',
    ddGroup : 'groupDD',
    enableDrag : true,
    loadMask : true,
    xns : Roo.grid,
    xtype : 'Grid',
    colModel : [
      {
       '|xns' : 'Roo.grid',
       dataIndex : 'project_id_code',
       header : _this._strings['9e727fdd3aec8274f46685441900280d'],
       hidden : true,
       renderer : function(v,x,r) { 
             return String.format('<span qtip="{0}">{1}</span>', 
                           r.data.project_id_name,
                           v);
        },
       sortable : true,
       width : 75,
       xns : Roo.grid,
       xtype : 'ColumnModel'
      },
{
       '|xns' : 'Roo.grid',
       dataIndex : 'company_id_comptype',
       header : _this._strings['a1fa27779242b4902f7ae3bdd5c6d508'],
       renderer : function(v,x,r) {
           if (r.data.office_id) {
               return String.format('{0} - {1}', v, r.data.office_id_name); 
           } 
           return String.format('{0}', v); 
       },
       sortable : true,
       width : 50,
       xns : Roo.grid,
       xtype : 'ColumnModel'
      },
{
       '|xns' : 'Roo.grid',
       dataIndex : 'company_id_name',
       header : _this._strings['1c76cbfe21c6f44c1d1e59d54f3e4420'],
       renderer : function(v,x,r) {
           if (r.data.office_id) {
               return String.format('{0} - {1}', v, r.data.office_id_name); 
           } 
           return String.format('{0}', v); 
       },
       sortable : true,
       width : 150,
       xns : Roo.grid,
       xtype : 'ColumnModel'
      },
{
       '|xns' : 'Roo.grid',
       dataIndex : 'name',
       header : _this._strings['49ee3087348e8d44e1feda1917443987'],
       renderer : function(v) { return String.format('{0}', v); },
       sortable : true,
       width : 200,
       xns : Roo.grid,
       xtype : 'ColumnModel'
      },
{
       '|xns' : 'Roo.grid',
       dataIndex : 'role',
       header : _this._strings['bbbabdbe1b262f75d99d62880b953be1'],
       renderer : function(v) { return String.format('{0}', v); },
       width : 100,
       xns : Roo.grid,
       xtype : 'ColumnModel'
      },
{
       '|xns' : 'Roo.grid',
       dataIndex : 'phone',
       header : _this._strings['bcc254b55c4a1babdf1dcb82c207506b'],
       renderer : function(v) { return String.format('{0}', v); },
       width : 100,
       xns : Roo.grid,
       xtype : 'ColumnModel'
      },
{
       '|xns' : 'Roo.grid',
       dataIndex : 'fax',
       header : _this._strings['9810aa2b9f44401be4bf73188ef2b67d'],
       renderer : function(v) { return String.format('{0}', v); },
       width : 100,
       xns : Roo.grid,
       xtype : 'ColumnModel'
      },
{
       '|xns' : 'Roo.grid',
       dataIndex : 'email',
       header : _this._strings['ce8ae9da5b7cd6c3df2929543a9af92d'],
       renderer : function(v) {
          return (v.length && v.indexOf('@') > 0 ) ? 
                           String.format('<a href="mailto:{0}">{0}</a>',v) : v;
        },
       sortable : true,
       width : 200,
       xns : Roo.grid,
       xtype : 'ColumnModel'
      },
{
       '|xns' : 'Roo.grid',
       dataIndex : 'active',
       header : _this._strings['4d3d769b812b6faa6b76e1a8abaece2d'],
       renderer : function(v) {  
           var state = v> 0 ?  '-checked' : '';
       
           return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                       
        },
       width : 75,
       xns : Roo.grid,
       xtype : 'ColumnModel'
      }
    ],
    listeners : {
     cellclick : function (_self, rowIndex, columnIndex, e)
      {
      
              var di = this.colModel.getDataIndex(columnIndex);
              if (di != 'active') {
                  return;
              }
               
              var rec = _this.grid.ds.getAt(rowIndex);
              
              rec.set('active', rec.data.active ? 0 : 1);
              rec.commit();
               
              
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
     rowdblclick : function (_self, rowIndex, e)
      {
          if (!_this.dialog) return;
          _this.dialog.show( this.getDataSource().getAt(rowIndex), function() {
              _this.grid.footer.onClick('first');
          }); 
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
   title : _this._strings['40bed7cf9b3d4bb3a3d7a7e3eb18c5eb'],
   xns : Roo,
   xtype : 'GridPanel',
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
