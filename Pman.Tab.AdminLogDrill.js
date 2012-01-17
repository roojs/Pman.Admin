//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)



// register the module first
Pman.on('beforeload', function()
{
    Pman.register({
        part :  ["Admin","LogDrill"],
        modKey : '003-Pman.Tab.AdminLogDrill',
        module : Pman.Tab.AdminLogDrill,
        region : 'center',
        parent : Pman.Tab.AdminLogs,
        name : "Pman.Tab.AdminLogDrill",
        disabled : false, 
        permname: '' 
    });
});

Pman.Tab.AdminLogDrill = new Roo.util.Observable({

    panel : false,
    disabled : false,
    parentLayout:  false,

    add : function(parentLayout, region)
    {

        var _this = this;
        this.parentLayout = parentLayout;

        this.panel = parentLayout.addxtype({
            xtype: 'NestedLayoutPanel',
            xns: Roo,
            region : 'center',
            title : "Event Drilldown",
            layout : {
                xtype: 'BorderLayout',
                xns: Roo,
                items : [
                    {
                        xtype: 'GridPanel',
                        xns: Roo,
                        listeners : {
                            activate : function() {
                                _this.datepanel = this;
                                if (_this.dategrid) {
                                    _this.dategrid.ds.load({});
                                }
                            }
                        },
                        background : true,
                        fitContainer : true,
                        fitToframe : true,
                        region : 'west',
                        tableName : 'Events',
                        title : "Events",
                        grid : {
                            xtype: 'Grid',
                            xns: Roo.grid,
                            listeners : {
                                render : function() 
                                {
                                    _this.dategrid = this; 
                                    //_this.dialog = Pman.Dialog.FILL_IN
                                    if (_this.panel.active) {
                                       this.ds.load({});
                                    }
                                },
                                rowclick : function (_self, rowIndex, e)
                                {
                                    _this.tablegrid.footer.onClick('first');
                                }
                            },
                            autoExpandColumn : 'person_name',
                            loadMask : true,
                            dataSource : {
                                xtype: 'Store',
                                xns: Roo.data,
                                listeners : {
                                    beforeload : function (_self, o)
                                    {
                                        if (! _this.dateFrom) {
                                         return;
                                        }
                                        o.params = o.params || {};
                                         
                                        var act = _this.actionSel ? _this.actionSel.getValue() : '';
                                        if (act.length) {
                                            o.params.action = act;
                                        }
                                        var tbl = _this.affectSel ? _this.affectSel.getValue() : '';
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
                                        
                                        
                                        
                                        o.params['query[person_sum]'] = 1;
                                        o.params._columns = 'person_id,person_id_name,person_id_email,qty';
                                        o.params.limit = 999;
                                     
                                    }
                                },
                                remoteSort : true,
                                sortInfo : { field : 'person_name', direction: 'ASC' },
                                proxy : {
                                    xtype: 'HttpProxy',
                                    xns: Roo.data,
                                    method : 'GET',
                                    url : baseURL + '/Roo/Events.php'
                                },
                                reader : {
                                    xtype: 'JsonReader',
                                    xns: Roo.data,
                                    totalProperty : 'total',
                                    root : 'data',
                                    id : 'id',
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
                                    ]
                                }
                            },
                            toolbar : {
                                xtype: 'Toolbar',
                                xns: Roo,
                                items : [
                                    {
                                        xtype: 'TextItem',
                                        xns: Roo.Toolbar,
                                        text : "Date Range"
                                    },
                                    {
                                        xtype: 'DateField',
                                        xns: Roo.form,
                                        listeners : {
                                            render : function (_self)
                                            {
                                              _this.dateFrom = _self;
                                            },
                                            change : function (_self, newValue, oldValue)
                                            {
                                              _this.dategrid.ds.load({});
                                            }
                                        },
                                        format : 'Y-m-d',
                                        value : (function() { var d = new Date(); return d.format('Y-m-01'); })()
                                    },
                                    {
                                        xtype: 'DateField',
                                        xns: Roo.form,
                                        listeners : {
                                            render : function (_self)
                                            {
                                              _this.dateTo = _self;
                                            },
                                            change : function (_self, newValue, oldValue)
                                            {
                                              _this.dategrid.ds.load({});
                                            }
                                        },
                                        format : 'Y-m-d',
                                        value : (function() { var d = new Date();d =  d.add(Date.MONTH, 1) ; return d.format('Y-m-01'); })()
                                    }
                                ]
                            },
                            colModel : [
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'person_id_name',
                                    header : 'Person name',
                                    sortable : true,
                                    width : 200,
                                    renderer : function(v,x,r) {
                                         return String.format('{0} &lt;<a href="mailto:{1}">{1}</a>&gt;', v, r.data.person_id_email); 
                                     }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'qty',
                                    header : 'Changes',
                                    sortable : true,
                                    width : 70,
                                    renderer : function(v) { return String.format('{0}', v); }
                                }
                            ]
                        }
                    },
                    {
                        xtype: 'GridPanel',
                        xns: Roo,
                        listeners : {
                            activate : function() {
                                _this.tablepanel = this;
                                if (_this.tablegrid) {
                                    _this.tablegrid.footer.onClick('first');
                                }
                            }
                        },
                        background : true,
                        fitContainer : true,
                        fitToframe : true,
                        region : 'center',
                        tableName : 'Events',
                        title : "Events",
                        grid : {
                            xtype: 'Grid',
                            xns: Roo.grid,
                            listeners : {
                                render : function() 
                                {
                                    _this.tablegrid = this; 
                                    //_this.dialog = Pman.Dialog.FILL_IN
                                    if (_this.tablepanel.active) {
                                       this.footer.onClick('first');
                                    }
                                },
                                rowclick : function (_self, rowIndex, e)
                                {
                                    _this.detailgrid.footer.onClick('first');
                                }
                            },
                            autoExpandColumn : 'person_name',
                            loadMask : true,
                            dataSource : {
                                xtype: 'Store',
                                xns: Roo.data,
                                listeners : {
                                    beforeload : function (_self, o)
                                    {
                                         if (! _this.dategrid) {
                                         return;
                                        }
                                        
                                        var s = _this.dategrid.selModel.getSelected();
                                        if (!s) {
                                            _this.tablegrid.view.el.mask("Select a person");
                                            return false;
                                        }
                                        _this.tablegrid.view.el.unmask();
                                     
                                        o.params = o.params || {};
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
                                        o.params.person_id = s.data.person_id;
                                        o.params['query[table_sum]'] = 1;
                                        o.params._columns = 'on_table,qty,uqty';
                                    
                                        
                                    }
                                },
                                remoteSort : true,
                                sortInfo : { field : 'on_table', direction: 'ASC' },
                                proxy : {
                                    xtype: 'HttpProxy',
                                    xns: Roo.data,
                                    method : 'GET',
                                    url : baseURL + '/Roo/Events.php'
                                },
                                reader : {
                                    xtype: 'JsonReader',
                                    xns: Roo.data,
                                    totalProperty : 'total',
                                    root : 'data',
                                    id : 'id',
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
                                    ]
                                }
                            },
                            footer : {
                                xtype: 'PagingToolbar',
                                xns: Roo,
                                pageSize : 25,
                                displayInfo : true,
                                displayMsg : "Displaying Events{0} - {1} of {2}",
                                emptyMsg : "No Events found"
                            },
                            toolbar : {
                                xtype: 'Toolbar',
                                xns: Roo,
                                items : [
                                    {
                                        xtype: 'ComboBox',
                                        xns: Roo.form,
                                        listeners : {
                                            select : function (combo, record, index)
                                            {
                                               _this.dategrid.ds.load({});
                                            },
                                            render : function (_self)
                                            {
                                              _this.actionSel = _self;
                                            }
                                        },
                                        allowBlank : true,
                                        displayField : 'action',
                                        editable : false,
                                        emptyText : "Select Action",
                                        forceSelection : true,
                                        listWidth : 300,
                                        loadingText : "Searching...",
                                        minChars : 2,
                                        name : 'action',
                                        pageSize : 20,
                                        qtip : "Select Action",
                                        queryParam : 'query[action]',
                                        selectOnFocus : true,
                                        tpl : '<div class="x-grid-cell-text x-btn button"><b>{action}</b> </div>',
                                        triggerAction : 'all',
                                        typeAhead : true,
                                        valueField : 'action',
                                        width : 150,
                                        store : {
                                            xtype: 'Store',
                                            xns: Roo.data,
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
                                            remoteSort : true,
                                            sortInfo : { field : 'action' , direction : 'ASC' },
                                            proxy : {
                                                xtype: 'HttpProxy',
                                                xns: Roo.data,
                                                method : 'GET',
                                                url : baseURL + '/Roo/Events.php'
                                            },
                                            reader : {
                                                xtype: 'JsonReader',
                                                xns: Roo.data,
                                                totalProperty : 'total',
                                                root : 'data',
                                                id : 'id',
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
                                                ]
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'ComboBox',
                                        xns: Roo.form,
                                        listeners : {
                                            select : function (combo, record, index)
                                            {
                                               _this.dategrid.ds.load({});
                                            },
                                            render : function (_self)
                                            {
                                              _this.affectSel = _self;
                                            }
                                        },
                                        allowBlank : true,
                                        displayField : 'on_table',
                                        editable : false,
                                        emptyText : "Select Affects",
                                        forceSelection : true,
                                        listWidth : 300,
                                        loadingText : "Searching...",
                                        minChars : 2,
                                        name : 'on_table',
                                        pageSize : 20,
                                        qtip : "Select Action",
                                        queryParam : 'query[on_table]',
                                        selectOnFocus : true,
                                        tpl : '<div class="x-grid-cell-text x-btn button"><b>{on_table}</b> </div>',
                                        triggerAction : 'all',
                                        typeAhead : true,
                                        valueField : 'action',
                                        width : 150,
                                        store : {
                                            xtype: 'Store',
                                            xns: Roo.data,
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
                                            remoteSort : true,
                                            sortInfo : { field : 'on_table' , direction : 'ASC' },
                                            proxy : {
                                                xtype: 'HttpProxy',
                                                xns: Roo.data,
                                                method : 'GET',
                                                url : baseURL + '/Roo/Events.php'
                                            },
                                            reader : {
                                                xtype: 'JsonReader',
                                                xns: Roo.data,
                                                totalProperty : 'total',
                                                root : 'data',
                                                id : 'id',
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
                                                ]
                                            }
                                        }
                                    }
                                ]
                            },
                            colModel : [
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'on_table',
                                    header : 'Table',
                                    sortable : true,
                                    width : 200,
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'uqty',
                                    header : '#Affected',
                                    sortable : true,
                                    width : 70,
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'qty',
                                    header : 'Changes',
                                    sortable : true,
                                    width : 70,
                                    renderer : function(v) { return String.format('{0}', v); }
                                }
                            ]
                        }
                    },
                    {
                        xtype: 'GridPanel',
                        xns: Roo,
                        listeners : {
                            activate : function() {
                                _this.detailpanel = this;
                                if (_this.detailgrid) {
                                    _this.detailgrid.footer.onClick('first');
                                }
                            }
                        },
                        background : true,
                        fitContainer : true,
                        fitToframe : true,
                        region : 'east',
                        tableName : 'Events',
                        title : "Detail",
                        grid : {
                            xtype: 'Grid',
                            xns: Roo.grid,
                            listeners : {
                                render : function() 
                                {
                                    _this.detailgrid = this; 
                                    //_this.dialog = Pman.Dialog.FILL_IN
                                    if (_this.detailpanel.active) {
                                       this.footer.onClick('first');
                                    }
                                }
                            },
                            autoExpandColumn : 'person_name',
                            loadMask : true,
                            dataSource : {
                                xtype: 'Store',
                                xns: Roo.data,
                                listeners : {
                                    beforeload : function (_self, o)
                                    {
                                         if (! _this.dategrid) {
                                             return false;
                                        }
                                        
                                        o.params = o.params || {};
                                        
                                        var s = _this.dategrid.selModel.getSelected();
                                        if (!s) {
                                            _this.detailgrid.view.el.mask("Select a person");
                                            return false;
                                        }
                                        
                                        o.params.person_id = s.data.person_id;    
                                        
                                        var s = _this.tablegrid.selModel.getSelected();
                                        if (!s) {
                                            _this.detailgrid.view.el.mask("Select a table");
                                            return false;
                                        }
                                        o.params.on_table = s.data.on_table;        
                                        
                                        _this.detailgrid.view.el.unmask();
                                     
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
                                    
                                        //o.params['query[table_d]'] = 1;
                                        //o.params._columns = 'on_table,qty,uqty';
                                    
                                        
                                    }
                                },
                                remoteSort : true,
                                sortInfo : { field : 'person_name', direction: 'ASC' },
                                proxy : {
                                    xtype: 'HttpProxy',
                                    xns: Roo.data,
                                    method : 'GET',
                                    url : baseURL + '/Roo/Events.php'
                                },
                                reader : {
                                    xtype: 'JsonReader',
                                    xns: Roo.data,
                                    totalProperty : 'total',
                                    root : 'data',
                                    id : 'id',
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
                                    ]
                                }
                            },
                            footer : {
                                xtype: 'PagingToolbar',
                                xns: Roo,
                                pageSize : 25,
                                displayInfo : true,
                                displayMsg : "Displaying Events{0} - {1} of {2}",
                                emptyMsg : "No Events found"
                            },
                            colModel : [
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'id',
                                    header : 'Id',
                                    width : 50,
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    header : 'Event when',
                                    width : 75,
                                    dataIndex : 'event_when',
                                    renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y') : ''); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'action',
                                    header : 'Action',
                                    width : 50,
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'ipaddr',
                                    header : 'Ipaddr',
                                    width : 100,
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'on_id',
                                    header : '#ID',
                                    width : 75,
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    header : 'Remarks',
                                    width : 200,
                                    dataIndex : 'remarks',
                                    renderer : function(v) { return String.format('{0}', v); }
                                }
                            ]
                        }
                    },
                    {
                        xtype: 'GridPanel',
                        xns: Roo,
                        listeners : {
                            activate : function() {
                                _this.detailpanel = this;
                                if (_this.detailgrid) {
                                    _this.detailgrid.footer.onClick('first');
                                }
                            }
                        },
                        background : true,
                        fitContainer : true,
                        fitToframe : true,
                        region : 'east',
                        tableName : 'Events',
                        title : "Daily summary",
                        grid : {
                            xtype: 'Grid',
                            xns: Roo.grid,
                            listeners : {
                                render : function() 
                                {
                                    _this.detailgrid = this; 
                                    //_this.dialog = Pman.Dialog.FILL_IN
                                    if (_this.detailpanel.active) {
                                       this.footer.onClick('first');
                                    }
                                }
                            },
                            autoExpandColumn : 'person_name',
                            loadMask : true,
                            dataSource : {
                                xtype: 'Store',
                                xns: Roo.data,
                                listeners : {
                                    beforeload : function (_self, o)
                                    {
                                         if (! _this.dategrid) {
                                             return false;
                                        }
                                        
                                        o.params = o.params || {};
                                        
                                        var s = _this.dategrid.selModel.getSelected();
                                        if (!s) {
                                            _this.detailgrid.view.el.mask("Select a person");
                                            return false;
                                        }
                                        
                                        o.params.person_id = s.data.person_id;    
                                        
                                        var s = _this.tablegrid.selModel.getSelected();
                                        if (!s) {
                                            _this.detailgrid.view.el.mask("Select a table");
                                            return false;
                                        }
                                        o.params.on_table = s.data.on_table;        
                                        
                                        _this.detailgrid.view.el.unmask();
                                     
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
                                    
                                        //o.params['query[table_d]'] = 1;
                                        //o.params._columns = 'on_table,qty,uqty';
                                    
                                        
                                    }
                                },
                                remoteSort : true,
                                sortInfo : { field : 'person_name', direction: 'ASC' },
                                proxy : {
                                    xtype: 'HttpProxy',
                                    xns: Roo.data,
                                    method : 'GET',
                                    url : baseURL + '/Roo/Events.php'
                                },
                                reader : {
                                    xtype: 'JsonReader',
                                    xns: Roo.data,
                                    totalProperty : 'total',
                                    root : 'data',
                                    id : 'id',
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
                                    ]
                                }
                            },
                            footer : {
                                xtype: 'PagingToolbar',
                                xns: Roo,
                                pageSize : 25,
                                displayInfo : true,
                                displayMsg : "Displaying Events{0} - {1} of {2}",
                                emptyMsg : "No Events found"
                            },
                            colModel : [
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'id',
                                    header : 'Id',
                                    width : 50,
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    header : 'Event when',
                                    width : 75,
                                    dataIndex : 'event_when',
                                    renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y') : ''); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'action',
                                    header : 'Action',
                                    width : 50,
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'ipaddr',
                                    header : 'Ipaddr',
                                    width : 100,
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'on_id',
                                    header : '#ID',
                                    width : 75,
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    header : 'Remarks',
                                    width : 200,
                                    dataIndex : 'remarks',
                                    renderer : function(v) { return String.format('{0}', v); }
                                }
                            ]
                        }
                    }
                ],
                west : {
                    xtype: 'LayoutRegion',
                    xns: Roo,
                    split : true,
                    width : 270
                },
                center : {
                    xtype: 'LayoutRegion',
                    xns: Roo
                },
                east : {
                    xtype: 'LayoutRegion',
                    xns: Roo,
                    split : true,
                    tabPosition : 'top',
                    width : 600
                }
            }
        });
        this.layout = this.panel.layout;

    }
});
