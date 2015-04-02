//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminLogEvents = new Roo.XComponent({

 _strings : {
  '231bc72756b5e6de492aaaa1577f61b1' :"Remarks",
  '2ea72778ebaacc973260c88837dd7a2f' :"Displaying Events  {0} - {1} of {2}",
  '87f9f735a1d36793ceaecd4e47124b63' :"Events",
  '1b7f7d24575cdbfadb83b9587fa1bf97' :"#id",
  'a12a3079e14ced46e69ba52b8a90b21a' :"IP",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  '01bd6a16732dfa2b760dc8566c58afae' :"Download to Excel",
  '498f79c4c5bbde77f1bceb6c86fd0f6d' :"Show",
  '037fd50b0e85bb65995ca7125d06c7cd' :"Select Person Table",
  'fd7535ce3979bb8547e2c01689db0767' :"Select Person ",
  '679308a758de538c5f39c4c6cdba6593' :"Select Affects",
  '8f7f93630c366dc55aec88eb8e9640d0' :"Staff",
  'a8929eb5c1553d3f70497f862d25d0ce' :"Select Action",
  '39b9e051f9fe75e65c7a330bb00499d4' :"Date Range",
  '4e97aeeaa8b15ca1180fcd1f3ac478d1' :"When",
  '004bf6c9a40003140292e97330236c53' :"Action",
  '90e4ac2e5a22e53df63b6b186d8727ba' :"No Events found",
  '2c92a9a6a5dbf570825e62eabcdecd8d' :"Affected"
 },

  part     :  ["Admin", "LogEvents" ],
  order    : '001-Pman.Tab.AdminLogEvents',
  region   : 'center',
  parent   : 'Pman.Tab.AdminLogs',
  name     : "Admin - Logs - Events",
  disabled : false, 
  permname : 'Admin.Logs', 
  _tree : function()
  {
   var _this = this;
   var MODULE = this;
   return {
   layout : {
    center : {
     '|xns' : 'Roo',
     xns : Roo,
     xtype : 'LayoutRegion'
    },
    south : {
     '|xns' : 'Roo',
     autoScroll : true,
     height : 150,
     split : true,
     xns : Roo,
     xtype : 'LayoutRegion'
    },
    '|xns' : 'Roo',
    xns : Roo,
    xtype : 'BorderLayout',
    items : [
     {
      '|xns' : 'Roo',
      fitToFrame : true,
      region : 'south',
      xns : Roo,
      xtype : 'ContentPanel',
      listeners : {
       render : function (_self)
        {
          _this.viewPanel = _self;
        }
      }
     },
     {
      grid : {
       sm : {
        '|xns' : 'Roo.grid',
        singleSelect : true,
        xns : Roo.grid,
        xtype : 'RowSelectionModel',
        listeners : {
         afterselectionchange : function (_self)
          {
              // load detail log in _this.viewPanel;
              if (!this.getSelected()) {
                  this.viewPanel.setContent("Nothing Selected");
                  return;
              }
              var id = this.getSelected().data.id;
              _this.viewPanel.load( { url : baseURL + "/Admin/EventView/" + id + ".html" });
              
          }
        }
       },
       dataSource : {
        reader : {
         '|xns' : 'Roo.data',
         fields : [
             {
                 'name': 'id',
                 'type': 'int'
             },
             {
                 'name': 'person_name',
                 'type': 'string'
             },
             {
                 'name': 'event_when',
                 'type': 'date',
                 'dateFormat': 'Y-m-d'
             },
             {
                 'name': 'action',
                 'type': 'string'
             },
             {
                 'name': 'ipaddr',
                 'type': 'string'
             },
             {
                 'name': 'on_id',
                 'type': 'int'
             },
             {
                 'name': 'on_table',
                 'type': 'string'
             },
             {
                 'name': 'person_id',
                 'type': 'int'
             },
             {
                 'name': 'remarks',
                 'type': 'string'
             },
             {
                 'name': 'person_id_id',
                 'type': 'int'
             },
             {
                 'name': 'person_id_office_id',
                 'type': 'int'
             },
             {
                 'name': 'person_id_name',
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
                 'name': 'person_id_email',
                 'type': 'string'
             },
             {
                 'name': 'person_id_company_id',
                 'type': 'int'
             },
             {
                 'name': 'person_id_role',
                 'type': 'string'
             },
             {
                 'name': 'person_id_active',
                 'type': 'int'
             },
             {
                 'name': 'person_id_remarks',
                 'type': 'string'
             },
             {
                 'name': 'person_id_passwd',
                 'type': 'string'
             },
             {
                 'name': 'person_id_owner_id',
                 'type': 'int'
             },
             {
                 'name': 'person_id_lang',
                 'type': 'string'
             },
             {
                 'name': 'person_id_no_reset_sent',
                 'type': 'int'
             },
             {
                 'name': 'person_id_action_type',
                 'type': 'string'
             },
             {
                 'name': 'person_id_project_id',
                 'type': 'int'
             },
             {
                 'name': 'person_id_deleted_by',
                 'type': 'int'
             },
             {
                 'name': 'person_id_deleted_dt',
                 'type': 'date'
             }
         ],
         id : 'id',
         root : 'data',
         totalProperty : 'total',
         xns : Roo.data,
         xtype : 'JsonReader'
        },
        proxy : {
         '|xns' : 'Roo.data',
         method : 'GET',
         url : baseURL + '/Roo/Events.php',
         xns : Roo.data,
         xtype : 'HttpProxy'
        },
        '|xns' : 'Roo.data',
        remoteSort : true,
        sortInfo : { field: 'event_when', direction: 'DESC'},
        xns : Roo.data,
        xtype : 'Store',
        listeners : {
         beforeload : function (_self, o)
          {
              if (!Pman.buildCompleted) {
                  return false;
              }
             
             
             if (! _this.personSel) {
              return false;
              }
              o.params = o.params || {};
              o.params.person_id = _this.personSel.getValue();
              o.params.person_table = _this.tableSel.getValue();
              var act = _this.actionSel.getValue();
              if (act.length) {
                  o.params.action = act;
              }
              var tbl = _this.affectSel.getValue();
              if (tbl.length) {
                  o.params.on_table = tbl;
              }
              act = _this.dateFrom.getValue();
              if (act.format) {
                  o.params['query[from]'] = act.format('Y-m-d');
              }
              act = _this.dateTo.getValue();
              if (act.format) {
                  o.params['query[to]'] = act.format('Y-m-d');
              }
           
              
              /*
              act = _this.groupedCombo.getValue();
              o.params['query[grouped]'] = act;
              if (o.params['query[grouped]'] == 'gr') {
              
                  if (!tbl.length) {
                      Roo.MessageBox.alert("Error", "Select a table to group results on");
                      return false;
                  }
          //        o.params['_columns']  = 
                  o.params['_distinct'] = 'on_id';
                  
                  
              }
              
              */
          
              
          }
        },
        items : [

        ]

       },
       footer : {
        '|xns' : 'Roo',
        displayInfo : true,
        displayMsg : _this._strings['2ea72778ebaacc973260c88837dd7a2f'],
        emptyMsg : _this._strings['90e4ac2e5a22e53df63b6b186d8727ba'],
        pageSize : 25,
        xns : Roo,
        xtype : 'PagingToolbar',
        items : [
         {
          '|xns' : 'Roo.Toolbar',
          text : _this._strings['01bd6a16732dfa2b760dc8566c58afae'],
          xns : Roo.Toolbar,
          xtype : 'Button',
          listeners : {
           click : function (_self, e)
            {
                
                var params = {
                    'sort' : 'event_when',
                    'dir' : 'DESC',
                    'start' : 0,
                    'limit' : 900,
                    person_id : _this.personSel.getValue(), 
                    'csvTitles[0]' : 'When',   'csvCols[0]' : 'event_when', 
                    'csvTitles[1]' : 'Staff',   'csvCols[1]' : 'person_id_name', 
                    'csvTitles[2]' : 'Action',   'csvCols[2]' : 'action', 
                    'csvTitles[3]' : 'Record ID',   'csvCols[3]' : 'on_id'       ,
                    'csvTitles[4]' : 'Record Type',   'csvCols[4]' : 'on_table',
                    'csvTitles[5]' : 'Remarks',   'csvCols[5]' : 'remarks'        
                }
                    
                params.person_id = _this.personSel.getValue();
                var act = _this.actionSel.getValue();
                if (act.length) {
                    params.action = act;
                }
                var tbl = _this.affectSel.getValue();
                if (tbl.length) {
                    params.on_table = tbl;
                }
                act = _this.dateFrom.getValue();
                if (act.format) {
                    params['query[from]'] = act.format('Y-m-d');
                }
                act = _this.dateTo.getValue();
                if (act.format) {
                    params['query[to]'] = act.format('Y-m-d');
                }
                params.limit = 9999;
                
            
                new Pman.download({
                    url : baseURL + '/Roo/Events.php',
                    params : params ,
                    newWindow: true
                    
                });
            }
          }
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
          text : _this._strings['498f79c4c5bbde77f1bceb6c86fd0f6d'],
          xns : Roo.Toolbar,
          xtype : 'TextItem'
         },
         {
          store : {
           '|xns' : 'Roo.data',
           data : (function() { 
           
               if(typeof(uiConfig) == 'undefined' || typeof(uiConfig.events_person_table) == 'undefined' || !uiConfig.events_person_table.length){
           
                   return [];        
               }
           
               return uiConfig.events_person_table;
               
           })(),
           fields : [ 'value' ],
           isLocal : true,
           xns : Roo.data,
           xtype : 'SimpleStore'
          },
          '|xns' : 'Roo.form',
          actionMode : 'fieldEl',
          allowBlank : true,
          alwaysQuery : true,
          displayField : 'value',
          editable : false,
          emptyText : _this._strings['037fd50b0e85bb65995ca7125d06c7cd'],
          forceSelection : true,
          hideMode : 'display',
          listWidth : 300,
          loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'],
          minChars : 2,
          name : 'person_table',
          pageSize : 20,
          qtip : _this._strings['037fd50b0e85bb65995ca7125d06c7cd'],
          selectOnFocus : true,
          tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{value}</b> </div>',
          triggerAction : 'all',
          typeAhead : true,
          valueField : 'value',
          width : 150,
          xns : Roo.form,
          xtype : 'ComboBox',
          listeners : {
           render : function (_self)
            {
                _this.tableSel = _self;
              
                //this.el.setVisibilityMode(Roo.Element.DISPLAY);
                /*
                if(
                    typeof(uiConfig) == 'undefined' || 
                    typeof(uiConfig.events_person_table) == 'undefined' || 
                    !uiConfig.events_person_table.length
                ){
                    Roo.log(this.getActionEl);
                    this.actionMode = 'fieldEl';
                    this.hideMode = 'display';
                    this.el.hide();
                }
                */
            },
           select : function (combo, record, index)
            {
              _this.grid.footer.onClick('first');
            }
          },
          items : [

          ]

         },
         {
          store : {
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
                    'name': 'deleted_by',
                    'type': 'int'
                },
                {
                    'name': 'deleted_dt',
                    'type': 'date',
                    'dateFormat': 'Y-m-d'
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
                    'name': 'owner_id_deleted_by',
                    'type': 'int'
                },
                {
                    'name': 'owner_id_deleted_dt',
                    'type': 'date'
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
           sortInfo : { field : 'name' , direction : 'ASC' },
           xns : Roo.data,
           xtype : 'Store',
           listeners : {
            beforeload : function (_self, o)
             {
                 o.params = o.params || {};
                 o.params.company_id = Pman.Login.authUser.company_id;
             }
           },
           items : [

           ]

          },
          '|xns' : 'Roo.form',
          allowBlank : true,
          displayField : 'name',
          editable : true,
          emptyText : _this._strings['fd7535ce3979bb8547e2c01689db0767'],
          fieldLabel : 'Person ',
          forceSelection : true,
          listWidth : 600,
          loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'],
          minChars : 2,
          name : 'person_id_name',
          pageSize : 20,
          qtip : _this._strings['fd7535ce3979bb8547e2c01689db0767'],
          queryParam : 'query[name]',
          selectOnFocus : true,
          tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{name}</b> ({company_id_name}) &lt;{email}&gt; </div>',
          triggerAction : 'all',
          typeAhead : true,
          valueField : 'id',
          width : 150,
          xns : Roo.form,
          xtype : 'ComboBox',
          listeners : {
           render : function (_self)
            {
              _this.personSel = _self;
            },
           select : function (combo, record, index)
            {
              _this.grid.footer.onClick('first');
              
            }
          },
          items : [

          ]

         },
         {
          store : {
           proxy : {
            '|xns' : 'Roo.data',
            method : 'GET',
            url : baseURL + '/Roo/Events.php',
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
                    'name': 'person_name',
                    'type': 'string'
                },
                {
                    'name': 'event_when',
                    'type': 'date',
                    'dateFormat': 'Y-m-d'
                },
                {
                    'name': 'action',
                    'type': 'string'
                },
                {
                    'name': 'ipaddr',
                    'type': 'string'
                },
                {
                    'name': 'on_id',
                    'type': 'int'
                },
                {
                    'name': 'on_table',
                    'type': 'string'
                },
                {
                    'name': 'person_id',
                    'type': 'int'
                },
                {
                    'name': 'remarks',
                    'type': 'string'
                },
                {
                    'name': 'person_id_id',
                    'type': 'int'
                },
                {
                    'name': 'person_id_office_id',
                    'type': 'int'
                },
                {
                    'name': 'person_id_name',
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
                    'name': 'person_id_email',
                    'type': 'string'
                },
                {
                    'name': 'person_id_company_id',
                    'type': 'int'
                },
                {
                    'name': 'person_id_role',
                    'type': 'string'
                },
                {
                    'name': 'person_id_active',
                    'type': 'int'
                },
                {
                    'name': 'person_id_remarks',
                    'type': 'string'
                },
                {
                    'name': 'person_id_passwd',
                    'type': 'string'
                },
                {
                    'name': 'person_id_owner_id',
                    'type': 'int'
                },
                {
                    'name': 'person_id_lang',
                    'type': 'string'
                },
                {
                    'name': 'person_id_no_reset_sent',
                    'type': 'int'
                },
                {
                    'name': 'person_id_action_type',
                    'type': 'string'
                },
                {
                    'name': 'person_id_project_id',
                    'type': 'int'
                },
                {
                    'name': 'person_id_deleted_by',
                    'type': 'int'
                },
                {
                    'name': 'person_id_deleted_dt',
                    'type': 'date'
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
           sortInfo : { field : 'action' , direction : 'ASC' },
           xns : Roo.data,
           xtype : 'Store',
           listeners : {
            beforeload : function (_self, o)
             {
                 o.params = o.params || {};
                 // staff can see all logs, other companies can only see their own.
                 if (Pman.Login.authUser.company_id_comptype != 'OWNER') {
                     o.params.company_id = Pman.Login.authUser.company_id;
                 }
                 o.params._distinct = 'action';
                 o.params._columns ='action';
             }
           },
           items : [

           ]

          },
          '|xns' : 'Roo.form',
          allowBlank : true,
          displayField : 'action',
          editable : true,
          emptyText : _this._strings['a8929eb5c1553d3f70497f862d25d0ce'],
          forceSelection : true,
          listWidth : 300,
          loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'],
          minChars : 2,
          name : 'action',
          pageSize : 20,
          qtip : _this._strings['a8929eb5c1553d3f70497f862d25d0ce'],
          queryParam : 'query[action]',
          selectOnFocus : true,
          tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{action}</b> </div>',
          triggerAction : 'all',
          typeAhead : true,
          valueField : 'action',
          width : 150,
          xns : Roo.form,
          xtype : 'ComboBox',
          listeners : {
           render : function (_self)
            {
              _this.actionSel = _self;
            },
           select : function (combo, record, index)
            {
              _this.grid.footer.onClick('first');
            }
          },
          items : [

          ]

         },
         {
          store : {
           proxy : {
            '|xns' : 'Roo.data',
            method : 'GET',
            url : baseURL + '/Roo/Events.php',
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
                    'name': 'person_name',
                    'type': 'string'
                },
                {
                    'name': 'event_when',
                    'type': 'date',
                    'dateFormat': 'Y-m-d'
                },
                {
                    'name': 'action',
                    'type': 'string'
                },
                {
                    'name': 'ipaddr',
                    'type': 'string'
                },
                {
                    'name': 'on_id',
                    'type': 'int'
                },
                {
                    'name': 'on_table',
                    'type': 'string'
                },
                {
                    'name': 'person_id',
                    'type': 'int'
                },
                {
                    'name': 'remarks',
                    'type': 'string'
                },
                {
                    'name': 'person_id_id',
                    'type': 'int'
                },
                {
                    'name': 'person_id_office_id',
                    'type': 'int'
                },
                {
                    'name': 'person_id_name',
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
                    'name': 'person_id_email',
                    'type': 'string'
                },
                {
                    'name': 'person_id_company_id',
                    'type': 'int'
                },
                {
                    'name': 'person_id_role',
                    'type': 'string'
                },
                {
                    'name': 'person_id_active',
                    'type': 'int'
                },
                {
                    'name': 'person_id_remarks',
                    'type': 'string'
                },
                {
                    'name': 'person_id_passwd',
                    'type': 'string'
                },
                {
                    'name': 'person_id_owner_id',
                    'type': 'int'
                },
                {
                    'name': 'person_id_lang',
                    'type': 'string'
                },
                {
                    'name': 'person_id_no_reset_sent',
                    'type': 'int'
                },
                {
                    'name': 'person_id_action_type',
                    'type': 'string'
                },
                {
                    'name': 'person_id_project_id',
                    'type': 'int'
                },
                {
                    'name': 'person_id_deleted_by',
                    'type': 'int'
                },
                {
                    'name': 'person_id_deleted_dt',
                    'type': 'date'
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
           sortInfo : { field : 'on_table' , direction : 'ASC' },
           xns : Roo.data,
           xtype : 'Store',
           listeners : {
            beforeload : function (_self, o)
             {
                 o.params = o.params || {};
                 // staff can see all logs, other companies can only see their own.
                 if (Pman.Login.authUser.company_id_comptype != 'OWNER') {
                     o.params.company_id = Pman.Login.authUser.company_id;
                 }
                 o.params._distinct = 'on_table';
                 o.params._columns ='on_table';
             }
           },
           items : [

           ]

          },
          '|xns' : 'Roo.form',
          allowBlank : true,
          displayField : 'on_table',
          editable : true,
          emptyText : _this._strings['679308a758de538c5f39c4c6cdba6593'],
          forceSelection : true,
          listWidth : 300,
          loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'],
          minChars : 2,
          name : 'on_table',
          pageSize : 20,
          qtip : _this._strings['a8929eb5c1553d3f70497f862d25d0ce'],
          queryParam : 'query[on_table]',
          selectOnFocus : true,
          tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{on_table}</b> </div>',
          triggerAction : 'all',
          typeAhead : true,
          valueField : 'action',
          width : 150,
          xns : Roo.form,
          xtype : 'ComboBox',
          listeners : {
           render : function (_self)
            {
              _this.affectSel = _self;
            },
           select : function (combo, record, index)
            {
              _this.grid.footer.onClick('first');
            }
          },
          items : [

          ]

         },
         {
          '|xns' : 'Roo.Toolbar',
          text : _this._strings['39b9e051f9fe75e65c7a330bb00499d4'],
          xns : Roo.Toolbar,
          xtype : 'TextItem'
         },
         {
          '|xns' : 'Roo.form',
          format : 'Y-m-d',
          xns : Roo.form,
          xtype : 'DateField',
          listeners : {
           change : function (_self, newValue, oldValue)
            {
              _this.grid.footer.onClick('first');
            },
           render : function (_self)
            {
              _this.dateFrom = _self;
            }
          }
         },
         {
          '|xns' : 'Roo.form',
          format : 'Y-m-d',
          xns : Roo.form,
          xtype : 'DateField',
          listeners : {
           change : function (_self, newValue, oldValue)
            {
              _this.grid.footer.onClick('first');
            },
           render : function (_self)
            {
              _this.dateTo = _self;
            }
          }
         }
        ]

       },
       '|xns' : 'Roo.grid',
       autoExpandColumn : 'remarks',
       loadMask : true,
       xns : Roo.grid,
       xtype : 'Grid',
       colModel : [
         {
          '|xns' : 'Roo.grid',
          dataIndex : 'event_when',
          header : _this._strings['4e97aeeaa8b15ca1180fcd1f3ac478d1'],
          renderer : function(v) { return v ? v.dateFormat('d/m/Y H:i') : ''; },
          width : 100,
          xns : Roo.grid,
          xtype : 'ColumnModel'
         },
{
          '|xns' : 'Roo.grid',
          dataIndex : 'id',
          header : _this._strings['1b7f7d24575cdbfadb83b9587fa1bf97'],
          width : 100,
          xns : Roo.grid,
          xtype : 'ColumnModel'
         },
{
          '|xns' : 'Roo.grid',
          dataIndex : 'person_id_name',
          header : _this._strings['8f7f93630c366dc55aec88eb8e9640d0'],
          renderer : function(v,x,r) { 
              
              var efield = typeof(_this.email_field) == 'undefined' ? 'person_id_email' : _this.email_field;
              var nfield = typeof(_this.name_field) == 'undefined' ? 'person_id_name' : _this.name_field;    
              
              //Roo.log([r, efield, nfield]);
              
              var email = r.json[efield]; // ? r.data.person_id_email : r.data.person_id_email;
              var name  = r.json[nfield]; // ? r.data.person_id_name : r.data.person_id_name;    
              return String.format('{0} &lt;<a href="mailto:{1}">{1}</a>&gt;', 
                  name, email); 
          
          
          },
          width : 150,
          xns : Roo.grid,
          xtype : 'ColumnModel'
         },
{
          '|xns' : 'Roo.grid',
          dataIndex : 'action',
          header : _this._strings['004bf6c9a40003140292e97330236c53'],
          renderer : function(v) { return String.format('{0}', v); },
          width : 100,
          xns : Roo.grid,
          xtype : 'ColumnModel'
         },
{
          '|xns' : 'Roo.grid',
          dataIndex : 'ipaddr',
          header : _this._strings['a12a3079e14ced46e69ba52b8a90b21a'],
          renderer : function(v) { return String.format('{0}', v); },
          width : 100,
          xns : Roo.grid,
          xtype : 'ColumnModel'
         },
{
          '|xns' : 'Roo.grid',
          dataIndex : 'on_table',
          header : _this._strings['2c92a9a6a5dbf570825e62eabcdecd8d'],
          renderer : function(v, x, r) {                     
                      return v ? String.format('{0}({1})', v,  r.data.on_id)  : '';  
             },
          width : 100,
          xns : Roo.grid,
          xtype : 'ColumnModel'
         },
{
          '|xns' : 'Roo.grid',
          dataIndex : 'remarks',
          header : _this._strings['231bc72756b5e6de492aaaa1577f61b1'],
          renderer : function(v) { return String.format('<span qtip="{1}">{0}</span>', v, Roo.util.Format.htmlEncode(v)); },
          width : 300,
          xns : Roo.grid,
          xtype : 'ColumnModel'
         }
       ],
       listeners : {
        render : function() { 
             _this.grid = this; 
             //_this.dialog = Pman.Dialog.FILL_IN
             if (_this.panel.active) {
                this.footer.onClick('first');
             }
         }
       },
       items : [

       ]

      },
      '|xns' : 'Roo',
      background : false,
      fitContainer : true,
      fitToframe : true,
      region : 'center',
      tableName : 'Events',
      title : _this._strings['87f9f735a1d36793ceaecd4e47124b63'],
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

     }
    ]

   },
   '|xns' : 'Roo',
   region : 'center',
   title : _this._strings['87f9f735a1d36793ceaecd4e47124b63'],
   xns : Roo,
   xtype : 'NestedLayoutPanel',
   items : [

   ]

  };  }
});
