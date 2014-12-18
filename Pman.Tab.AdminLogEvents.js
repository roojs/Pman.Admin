//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminLogEvents = new Roo.XComponent({
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
                    xtype : 'LayoutRegion',
                    xns : Roo
                },
                south : {
                    '|xns' : 'Roo',
                    autoScroll : true,
                    xtype : 'LayoutRegion',
                    xns : Roo,
                    split : true,
                    height : 150
                },
                '|xns' : 'Roo',
                xtype : 'BorderLayout',
                xns : Roo,
                items : [
                	{
                        '|xns' : 'Roo',
                        fitToFrame : true,
                        region : 'south',
                        xtype : 'ContentPanel',
                        xns : Roo,
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
                                xtype : 'RowSelectionModel',
                                singleSelect : true,
                                xns : Roo.grid,
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
                                    totalProperty : 'total'
                                },
                                proxy : {
                                    '|xns' : 'Roo.data',
                                    url : baseURL + '/Roo/Events.php',
                                    xtype : 'HttpProxy',
                                    method : 'GET',
                                    xns : Roo.data
                                },
                                '|xns' : 'Roo.data',
                                xtype : 'Store',
                                remoteSort : true,
                                sortInfo : { field: 'event_when', direction: 'DESC'},
                                xns : Roo.data,
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
                                pageSize : 25,
                                xtype : 'PagingToolbar',
                                emptyMsg : "No Events found",
                                xns : Roo,
                                displayInfo : true,
                                displayMsg : "Displaying Events  {0} - {1} of {2}",
                                items : [
                                	{
                                        '|xns' : 'Roo.Toolbar',
                                        text : "Download to Excel",
                                        xtype : 'Button',
                                        xns : Roo.Toolbar,
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
                                xtype : 'Toolbar',
                                xns : Roo,
                                items : [
                                	{
                                        '|xns' : 'Roo.Toolbar',
                                        text : "Show",
                                        xtype : 'TextItem',
                                        xns : Roo.Toolbar
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
                                            xtype : 'SimpleStore',
                                            fields : [ 'value' ],
                                            xns : Roo.data,
                                            isLocal : true
                                        },
                                        '|xns' : 'Roo.form',
                                        listWidth : 300,
                                        triggerAction : 'all',
                                        forceSelection : true,
                                        selectOnFocus : true,
                                        pageSize : 20,
                                        displayField : 'value',
                                        emptyText : "Select Person Table",
                                        minChars : 2,
                                        valueField : 'value',
                                        xtype : 'ComboBox',
                                        allowBlank : true,
                                        typeAhead : true,
                                        alwaysQuery : true,
                                        editable : false,
                                        width : 150,
                                        xns : Roo.form,
                                        name : 'person_table',
                                        qtip : "Select Person Table",
                                        tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{value}</b> </div>',
                                        loadingText : "Searching...",
                                        listeners : {
                                        	render : function (_self)
                                        	   {
                                        	     _this.tableSel = _self;
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
                                                url : baseURL + '/Roo/Person.php',
                                                method : 'GET',
                                                xtype : 'HttpProxy',
                                                xns : Roo.data
                                            },
                                            reader : {
                                                '|xns' : 'Roo.data',
                                                id : 'id',
                                                root : 'data',
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
                                                xns : Roo.data,
                                                totalProperty : 'total'
                                            },
                                            '|xns' : 'Roo.data',
                                            xtype : 'Store',
                                            remoteSort : true,
                                            sortInfo : { field : 'name' , direction : 'ASC' },
                                            xns : Roo.data,
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
                                        listWidth : 600,
                                        triggerAction : 'all',
                                        fieldLabel : 'Person ',
                                        forceSelection : true,
                                        selectOnFocus : true,
                                        pageSize : 20,
                                        displayField : 'name',
                                        emptyText : "Select Person ",
                                        minChars : 2,
                                        valueField : 'id',
                                        xtype : 'ComboBox',
                                        allowBlank : true,
                                        typeAhead : true,
                                        editable : true,
                                        width : 150,
                                        xns : Roo.form,
                                        name : 'person_id_name',
                                        qtip : "Select Person ",
                                        queryParam : 'query[name]',
                                        tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{name}</b> ({company_id_name}) &lt;{email}&gt; </div>',
                                        loadingText : "Searching...",
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
                                                url : baseURL + '/Roo/Events.php',
                                                method : 'GET',
                                                xtype : 'HttpProxy',
                                                xns : Roo.data
                                            },
                                            reader : {
                                                '|xns' : 'Roo.data',
                                                id : 'id',
                                                root : 'data',
                                                xtype : 'JsonReader',
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
                                                xns : Roo.data,
                                                totalProperty : 'total'
                                            },
                                            '|xns' : 'Roo.data',
                                            xtype : 'Store',
                                            remoteSort : true,
                                            sortInfo : { field : 'action' , direction : 'ASC' },
                                            xns : Roo.data,
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
                                        listWidth : 300,
                                        triggerAction : 'all',
                                        forceSelection : true,
                                        selectOnFocus : true,
                                        pageSize : 20,
                                        displayField : 'action',
                                        emptyText : "Select Action",
                                        minChars : 2,
                                        valueField : 'action',
                                        xtype : 'ComboBox',
                                        allowBlank : true,
                                        typeAhead : true,
                                        editable : true,
                                        width : 150,
                                        xns : Roo.form,
                                        name : 'action',
                                        qtip : "Select Action",
                                        queryParam : 'query[action]',
                                        tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{action}</b> </div>',
                                        loadingText : "Searching...",
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
                                                url : baseURL + '/Roo/Events.php',
                                                method : 'GET',
                                                xtype : 'HttpProxy',
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
                                                totalProperty : 'total'
                                            },
                                            '|xns' : 'Roo.data',
                                            xtype : 'Store',
                                            remoteSort : true,
                                            sortInfo : { field : 'on_table' , direction : 'ASC' },
                                            xns : Roo.data,
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
                                        listWidth : 300,
                                        triggerAction : 'all',
                                        forceSelection : true,
                                        selectOnFocus : true,
                                        pageSize : 20,
                                        displayField : 'on_table',
                                        emptyText : "Select Affects",
                                        minChars : 2,
                                        valueField : 'action',
                                        xtype : 'ComboBox',
                                        allowBlank : true,
                                        typeAhead : true,
                                        editable : true,
                                        width : 150,
                                        xns : Roo.form,
                                        name : 'on_table',
                                        qtip : "Select Action",
                                        queryParam : 'query[on_table]',
                                        tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{on_table}</b> </div>',
                                        loadingText : "Searching...",
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
                                        text : "Date Range",
                                        xtype : 'TextItem',
                                        xns : Roo.Toolbar
                                    },
                                	{
                                        '|xns' : 'Roo.form',
                                        format : 'Y-m-d',
                                        xtype : 'DateField',
                                        xns : Roo.form,
                                        listeners : {
                                        	render : function (_self)
                                        	   {
                                        	     _this.dateFrom = _self;
                                        	   },
                                        	change : function (_self, newValue, oldValue)
                                        	   {
                                        	     _this.grid.footer.onClick('first');
                                        	   }
                                        }
                                    },
                                	{
                                        '|xns' : 'Roo.form',
                                        format : 'Y-m-d',
                                        xtype : 'DateField',
                                        xns : Roo.form,
                                        listeners : {
                                        	render : function (_self)
                                        	   {
                                        	     _this.dateTo = _self;
                                        	   },
                                        	change : function (_self, newValue, oldValue)
                                        	   {
                                        	     _this.grid.footer.onClick('first');
                                        	   }
                                        }
                                    }
                                ]

                            },
                            '|xns' : 'Roo.grid',
                            autoExpandColumn : 'remarks',
                            xtype : 'Grid',
                            loadMask : true,
                            xns : Roo.grid,
                            colModel : [
                            	 {
                            	        '|xns' : 'Roo.grid',
                            	        xtype : 'ColumnModel',
                            	        width : 100,
                            	        header : 'When',
                            	        renderer : function(v) { return v ? v.dateFormat('d/m/Y H:i') : ''; },
                            	        xns : Roo.grid,
                            	        dataIndex : 'event_when'
                            	    },
{
                            	        '|xns' : 'Roo.grid',
                            	        xtype : 'ColumnModel',
                            	        width : 100,
                            	        header : '#id',
                            	        xns : Roo.grid,
                            	        dataIndex : 'id'
                            	    },
{
                            	        '|xns' : 'Roo.grid',
                            	        xtype : 'ColumnModel',
                            	        width : 150,
                            	        header : 'Staff',
                            	        renderer : function(v,x,r) { 
                            	            
                            	            var efield = typeof(_this.email_field) == 'undefined' ? 'person_id_email' : _this.email_field;
                            	            var nfield = typeof(_this.name_field) == 'undefined' ? 'person_id_name' : _this.name_field;    
                            	            
                            	            //Roo.log([r, efield, nfield]);
                            	            
                            	            var email = r.json[efield]; // ? r.data.person_id_email : r.data.person_id_email;
                            	            var name  = r.json[nfield]; // ? r.data.person_id_name : r.data.person_id_name;    
                            	            return String.format('{0} &lt;<a href="mailto:{1}">{1}</a>&gt;', 
                            	                name, email); 
                            	        
                            	        
                            	        },
                            	        xns : Roo.grid,
                            	        dataIndex : 'person_id_name'
                            	    },
{
                            	        '|xns' : 'Roo.grid',
                            	        xtype : 'ColumnModel',
                            	        header : 'Action',
                            	        width : 100,
                            	        renderer : function(v) { return String.format('{0}', v); },
                            	        xns : Roo.grid,
                            	        dataIndex : 'action'
                            	    },
{
                            	        '|xns' : 'Roo.grid',
                            	        xtype : 'ColumnModel',
                            	        header : 'IP',
                            	        width : 100,
                            	        renderer : function(v) { return String.format('{0}', v); },
                            	        xns : Roo.grid,
                            	        dataIndex : 'ipaddr'
                            	    },
{
                            	        '|xns' : 'Roo.grid',
                            	        xtype : 'ColumnModel',
                            	        width : 100,
                            	        header : 'Affected',
                            	        renderer : function(v, x, r) {                     
                            	                    return v ? String.format('{0}({1})', v,  r.data.on_id)  : '';  
                            	           },
                            	        xns : Roo.grid,
                            	        dataIndex : 'on_table'
                            	    },
{
                            	        '|xns' : 'Roo.grid',
                            	        xtype : 'ColumnModel',
                            	        width : 300,
                            	        header : 'Remarks',
                            	        renderer : function(v) { return String.format('<span qtip="{1}">{0}</span>', v, Roo.util.Format.htmlEncode(v)); },
                            	        xns : Roo.grid,
                            	        dataIndex : 'remarks'
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
                        region : 'center',
                        fitToframe : true,
                        background : false,
                        title : "Events",
                        xtype : 'GridPanel',
                        fitContainer : true,
                        xns : Roo,
                        tableName : 'Events',
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
            title : "Events",
            xtype : 'NestedLayoutPanel',
            xns : Roo,
            items : [

            ]

        };    }
});
