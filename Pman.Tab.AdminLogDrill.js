//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)



// register the module first
Pman.on('beforeload', function()
{
    Pman.register({
        part :  ["Admin","LogDrill"],
        modKey : '001-Pman.Tab.AdminLogDrill',
        module : Pman.Tab.AdminLogDrill,
        region : '',
        parent : false,
        name : "unnamed module",
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
            layout : {
                xtype: 'BorderLayout',
                xns: Roo,
                items : [
                    {
                        xtype: 'GridPanel',
                        xns: Roo,
                        listeners : {
                            activate : function() {
                                _this.panel = this;
                                if (_this.grid) {
                                    _this.grid.footer.onClick('first');
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
                            autoExpandColumn : 'person_name',
                            loadMask : true,
                            listeners : {
                                render : function() 
                                {
                                    _this.grid = this; 
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
                            dataSource : {
                                xtype: 'Store',
                                xns: Roo.data,
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
                                              _this.dateTo = _self;
                                            },
                                            change : function (_self, newValue, oldValue)
                                            {
                                              _this.grid.footer.onClick('first');
                                            }
                                        },
                                        format : 'Y-m-d'
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
                                              _this.grid.footer.onClick('first');
                                            }
                                        },
                                        format : 'Y-m-d'
                                    },
                                    {
                                        xtype: 'TextItem',
                                        xns: Roo.Toolbar,
                                        text : "Show"
                                    },
                                    {
                                        xtype: 'ComboBox',
                                        xns: Roo.form,
                                        listeners : {
                                            select : function (combo, record, index)
                                            {
                                              _this.grid.footer.onClick('first');
                                              
                                            },
                                            render : function (_self)
                                            {
                                              _this.personSel = _self;
                                            }
                                        },
                                        allowBlank : true,
                                        displayField : 'name',
                                        editable : true,
                                        emptyText : "Select Person ",
                                        fieldLabel : 'Person ',
                                        forceSelection : true,
                                        listWidth : 600,
                                        loadingText : "Searching...",
                                        minChars : 2,
                                        name : 'person_id_name',
                                        pageSize : 20,
                                        qtip : "Select Person ",
                                        queryParam : 'query[name]',
                                        selectOnFocus : true,
                                        tpl : '<div class="x-grid-cell-text x-btn button"><b>{name}</b> ({company_id_name}) &lt;{email}&gt; </div>',
                                        triggerAction : 'all',
                                        typeAhead : true,
                                        valueField : 'id',
                                        width : 150,
                                        store : {
                                            xtype: 'Store',
                                            xns: Roo.data,
                                            listeners : {
                                                beforeload : function (_self, o)
                                                {
                                                    o.params = o.params || {};
                                                    o.company_id = Pman.Login.authUser.company_id;
                                                }
                                            },
                                            sortInfo : { field : 'name' , direction : 'ASC' },
                                            proxy : {
                                                xtype: 'HttpProxy',
                                                xns: Roo.data,
                                                url : baseURL + '/Roo/Person.php',
                                                method : 'GET'
                                            },
                                            reader : {
                                                xtype: 'JsonReader',
                                                xns: Roo.data,
                                                id : 'id',
                                                root : 'data',
                                                totalProperty : 'total',
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
                                              _this.grid.footer.onClick('first');
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
                                              _this.grid.footer.onClick('first');
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
                                    header : 'Person name',
                                    width : 200,
                                    dataIndex : 'person_name',
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'qty',
                                    header : 'Changes',
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
                                _this.panel = this;
                                if (_this.grid) {
                                    _this.grid.footer.onClick('first');
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
                            autoExpandColumn : 'person_name',
                            loadMask : true,
                            listeners : {
                                render : function() 
                                {
                                    _this.grid = this; 
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
                            dataSource : {
                                xtype: 'Store',
                                xns: Roo.data,
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
                                              _this.dateTo = _self;
                                            },
                                            change : function (_self, newValue, oldValue)
                                            {
                                              _this.grid.footer.onClick('first');
                                            }
                                        },
                                        format : 'Y-m-d'
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
                                              _this.grid.footer.onClick('first');
                                            }
                                        },
                                        format : 'Y-m-d'
                                    },
                                    {
                                        xtype: 'TextItem',
                                        xns: Roo.Toolbar,
                                        text : "Show"
                                    },
                                    {
                                        xtype: 'ComboBox',
                                        xns: Roo.form,
                                        listeners : {
                                            select : function (combo, record, index)
                                            {
                                              _this.grid.footer.onClick('first');
                                              
                                            },
                                            render : function (_self)
                                            {
                                              _this.personSel = _self;
                                            }
                                        },
                                        allowBlank : true,
                                        displayField : 'name',
                                        editable : true,
                                        emptyText : "Select Person ",
                                        fieldLabel : 'Person ',
                                        forceSelection : true,
                                        listWidth : 600,
                                        loadingText : "Searching...",
                                        minChars : 2,
                                        name : 'person_id_name',
                                        pageSize : 20,
                                        qtip : "Select Person ",
                                        queryParam : 'query[name]',
                                        selectOnFocus : true,
                                        tpl : '<div class="x-grid-cell-text x-btn button"><b>{name}</b> ({company_id_name}) &lt;{email}&gt; </div>',
                                        triggerAction : 'all',
                                        typeAhead : true,
                                        valueField : 'id',
                                        width : 150,
                                        store : {
                                            xtype: 'Store',
                                            xns: Roo.data,
                                            listeners : {
                                                beforeload : function (_self, o)
                                                {
                                                    o.params = o.params || {};
                                                    o.company_id = Pman.Login.authUser.company_id;
                                                }
                                            },
                                            sortInfo : { field : 'name' , direction : 'ASC' },
                                            proxy : {
                                                xtype: 'HttpProxy',
                                                xns: Roo.data,
                                                url : baseURL + '/Roo/Person.php',
                                                method : 'GET'
                                            },
                                            reader : {
                                                xtype: 'JsonReader',
                                                xns: Roo.data,
                                                id : 'id',
                                                root : 'data',
                                                totalProperty : 'total',
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
                                              _this.grid.footer.onClick('first');
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
                                              _this.grid.footer.onClick('first');
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
                                    header : 'Person name',
                                    width : 200,
                                    dataIndex : 'person_name',
                                    renderer : function(v) { return String.format('{0}', v); }
                                },
                                {
                                    xtype: 'ColumnModel',
                                    xns: Roo.grid,
                                    dataIndex : 'qty',
                                    header : 'Changes',
                                    width : 70,
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
                    width : 300
                },
                center : {
                    xtype: 'LayoutRegion',
                    xns: Roo
                },
                east : {
                    xtype: 'LayoutRegion',
                    xns: Roo,
                    split : true,
                    width : 400
                }
            }
        });
        this.layout = this.panel.layout;

    }
});
