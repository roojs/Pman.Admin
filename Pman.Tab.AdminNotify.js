//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminNotify = new Roo.XComponent({
    part     :  ["Admin", "Notify" ],
    order    : '001-Pman.Tab.AdminNotify',
    region   : 'center',
    parent   : 'Pman.Tab.AdminWatchNotify',
    name     : "Pman.Tab.AdminNotify",
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
                        url : baseURL + '/Roo/core_notify.php',
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
                                'name': 'event_id',
                                'type': 'int'
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
                            },
                            {
                                'name': 'event_id_id',
                                'type': 'int'
                            },
                            {
                                'name': 'event_id_person_name',
                                'type': 'string'
                            },
                            {
                                'name': 'event_id_event_when',
                                'type': 'date'
                            },
                            {
                                'name': 'event_id_action',
                                'type': 'string'
                            },
                            {
                                'name': 'event_id_ipaddr',
                                'type': 'string'
                            },
                            {
                                'name': 'event_id_on_id',
                                'type': 'int'
                            },
                            {
                                'name': 'event_id_on_table',
                                'type': 'string'
                            },
                            {
                                'name': 'event_id_person_id',
                                'type': 'int'
                            },
                            {
                                'name': 'event_id_remarks',
                                'type': 'string'
                            }
                        ],
                        totalProperty : 'total'
                    },
                    '|xns' : 'Roo.data',
                    xtype : 'Store',
                    remoteSort : true,
                    sortInfo : { field : 'act_when', direction: 'DESC' },
                    xns : Roo.data,
                    listeners : {
                    	beforeload : function (_self, options)
                    	   {
                    	       options.params = options.params || {};
                    	       
                    	       options.params._evtype_align = 1;
                    	       
                    	       if (!_this.toggleBtn.pressed) {
                    	           options.params['event_id'] = 0;
                    	       }
                    	       if (!_this.personCombo) {
                    	           return false;
                    	       }
                    	       var p = _this.personCombo.getValue();
                    	       if (p*1) { 
                    	           options.params.person_id = p;
                    	       }
                    	       
                    	   }
                    },
                    items : [

                    ]

                },
                footer : {
                    '|xns' : 'Roo',
                    pageSize : 25,
                    xtype : 'PagingToolbar',
                    emptyMsg : "No core_notify found",
                    xns : Roo,
                    displayInfo : true,
                    displayMsg : "Displaying core_notify{0} - {1} of {2}"
                },
                toolbar : {
                    '|xns' : 'Roo',
                    xtype : 'Toolbar',
                    xns : Roo,
                    items : [
                    	{
                            store : {
                                proxy : {
                                    '|xns' : 'Roo.data',
                                    url : baseURL + '/Roo/core_notify.php',
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
                                    fields : [{"name":"id","type":"int"},{"name":"ontable","type":"string"}],
                                    totalProperty : 'total'
                                },
                                '|xns' : 'Roo.data',
                                xtype : 'Store',
                                remoteSort : true,
                                sortInfo : { direction : 'ASC', field: 'person_id_name' },
                                xns : Roo.data,
                                listeners : {
                                	beforeload : function (_self, o){
                                	       o.params = o.params || {};
                                	       o.params._distinct='person_id';
                                	       o.params._columns='person_id,person_id_name,person_id_email';
                                	       o.params['!person_id_name'] = '';
                                	       
                                	       // set more here
                                	   }
                                },
                                items : [

                                ]

                            },
                            '|xns' : 'Roo.form',
                            listWidth : 400,
                            triggerAction : 'all',
                            forceSelection : true,
                            selectOnFocus : true,
                            pageSize : 20,
                            displayField : 'person_id_name',
                            emptyText : "Select person",
                            hiddenName : 'id',
                            minChars : 2,
                            valueField : 'person_id',
                            xtype : 'ComboBox',
                            allowBlank : true,
                            editable : true,
                            width : 300,
                            xns : Roo.form,
                            name : 'name',
                            qtip : "Select core_notify",
                            queryParam : 'query[person_id_name]',
                            tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{person_id_name}</b> {person_id_email}</div>',
                            loadingText : "Searching...",
                            listeners : {
                            	render : function (_self)
                            	   {
                            	      _this.personCombo = _self;
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
                            '|xns' : 'Roo.form',
                            format : 'd/M/Y',
                            xtype : 'DateField',
                            allowBlank : false,
                            width : 100,
                            xns : Roo.form,
                            listeners : {
                            	render : function (_self)
                            	   {
                            	       _this.dateSel = _self;
                            	      _self.setValue(  new Date() );
                            	   },
                            	select : function (combo, date)
                            	   {
                            	       _this.wgrid.ds.load({});
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
                            text : "Delete",
                            xtype : 'Button',
                            cls : 'x-btn-text-icon',
                            icon : rootURL + '/Pman/templates/images/trash.gif',
                            xns : Roo.Toolbar,
                            listeners : {
                            	click : function()
                            	   {
                            	       Pman.genericDelete(_this, 'core_notify'); 
                            	   }
                            }
                        },
                    	{
                            '|xns' : 'Roo.Toolbar',
                            text : "Show Completed",
                            enableToggle : true,
                            xtype : 'Button',
                            xns : Roo.Toolbar,
                            listeners : {
                            	toggle : function (_self, pressed)
                            	   {
                            	       this.setText(pressed ? "Hide Completed" : "Show Completed");
                            	       _this.grid.footer.onClick('first');
                            	   },
                            	render : function (_self)
                            	   {
                            	       _this.toggleBtn = _self;
                            	   }
                            }
                        }
                    ]

                },
                '|xns' : 'Roo.grid',
                autoExpandColumn : 'person_id_name',
                xtype : 'Grid',
                loadMask : true,
                xns : Roo.grid,
                colModel : [
                	 {
                	        '|xns' : 'Roo.grid',
                	        xtype : 'ColumnModel',
                	        sortable : true,
                	        header : 'id#',
                	        width : 50,
                	        renderer : function(v) { return String.format('{0}', v ); },
                	        xns : Roo.grid,
                	        dataIndex : 'id'
                	    },
{
                	        '|xns' : 'Roo.grid',
                	        xtype : 'ColumnModel',
                	        sortable : true,
                	        header : 'Method',
                	        width : 200,
                	        renderer : function(v,x,r) 
                	        { 
                	            var vv = (typeof(r.data.evtype_align) != 'undefined' && r.data.evtype_align) ? r.data.evtype_align : v;
                	            return String.format('<span qtip="{0}">{1}</span>', v, vv ); 
                	        },
                	        xns : Roo.grid,
                	        dataIndex : 'evtype'
                	    },
{
                	        '|xns' : 'Roo.grid',
                	        xtype : 'ColumnModel',
                	        sortable : true,
                	        header : 'Act when',
                	        width : 150,
                	        renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y H:i:s') : ''); },
                	        xns : Roo.grid,
                	        dataIndex : 'act_when'
                	    },
{
                	        '|xns' : 'Roo.grid',
                	        xtype : 'ColumnModel',
                	        sortable : true,
                	        header : 'Sent',
                	        width : 150,
                	        renderer : function(v,x,r) {
                	            if (r.data.event_id *1 == 0) {
                	                return '';
                	            }
                	             return String.format('{0}', v ? v.format('d/M/Y H:i:s') : '');
                	          },
                	        xns : Roo.grid,
                	        dataIndex : 'sent'
                	    },
{
                	        '|xns' : 'Roo.grid',
                	        xtype : 'ColumnModel',
                	        header : 'Ontable',
                	        width : 150,
                	        renderer : function(v,x,r) { return String.format('{0}:{1}', v,r.data.onid); },
                	        xns : Roo.grid,
                	        dataIndex : 'ontable'
                	    },
{
                	        '|xns' : 'Roo.grid',
                	        xtype : 'ColumnModel',
                	        header : 'Who to notify',
                	        width : 100,
                	        renderer : function(v,x,r) {
                	             return String.format('{0} <u>&lt;{1}&gt;</u>', v, r.data.person_id_email); 
                	         },
                	        xns : Roo.grid,
                	        dataIndex : 'person_id_name'
                	    },
{
                	        '|xns' : 'Roo.grid',
                	        xtype : 'ColumnModel',
                	        header : 'Triggered by',
                	        width : 100,
                	        renderer : function(v,x,r) {
                	             return String.format(
                	                    '{0} : {1} {2}', 
                	                    r.data.trigger_event_id_on_table, 
                	                    r.data.trigger_event_id_on_id, 
                	                    r.data.trigger_event_id_remarks
                	                ); 
                	         },
                	        xns : Roo.grid,
                	        dataIndex : 'trigger_event_id'
                	    },
{
                	        '|xns' : 'Roo.grid',
                	        xtype : 'ColumnModel',
                	        width : 200,
                	        header : 'Msgid',
                	        renderer : function(v) { return String.format('{0}', v); },
                	        xns : Roo.grid,
                	        dataIndex : 'msgid'
                	    },
{
                	        '|xns' : 'Roo.grid',
                	        xtype : 'ColumnModel',
                	        header : 'Event',
                	        width : 300,
                	        renderer : function(v) { return String.format('<span qtip="{0}">{0}</span>', v); },
                	        xns : Roo.grid,
                	        dataIndex : 'event_id_remarks'
                	    }
                ],
                listeners : {
                	render : function() 
                	   {
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
            fitToframe : true,
            background : true,
            region : 'center',
            title : "Current Notifications",
            xtype : 'GridPanel',
            fitContainer : true,
            xns : Roo,
            tableName : 'core_notify',
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

        };    }
});
