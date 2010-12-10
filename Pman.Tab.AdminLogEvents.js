//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)



// register the module first
Pman.on('beforeload', function()
{
    Pman.register({
        modKey : '001-Pman.Tab.AdminLogEvents',
        module : Pman.Tab.AdminLogEvents,
        region : 'center',
        parent : Pman.Tab.AdminLogs,
        name : "Admin - Logs - Events",
        disabled : false, 
        permname: '' 
    });
});

Pman.Tab.AdminLogEvents = new Roo.util.Observable({

    panel : false,
    disabled : false,
    parentLayout:  false,

    add : function(parentLayout, region)
    {

        var _this = this;
        this.parentLayout = parentLayout;

        this.panel = parentLayout.addxtype({
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
            region : 'center',
            tableName : 'Events',
            title : "Events",
            grid : {
                xtype: 'Grid',
                xns: Roo.grid,
                autoExpandColumn : 'remarks',
                loadMask : true,
                listeners : {
                    render : function() { 
                        _this.grid = this; 
                        //_this.dialog = Pman.Dialog.FILL_IN
                        if (_this.panel.active) {
                           this.footer.onClick('first');
                        }
                    }
                },
                dataSource : {
                    xtype: 'Store',
                    xns: Roo.data,
                    listeners : {
                        beforeload : function (_self, o)
                        {
                           if (! _this.personSel) {
                            return;
                            }
                            o.params = o.params || {};
                            o.params.person_id = _this.personSel.getValue();
                            var act = _this.actionSel.getValue();
                            if (act.length) {
                                o.params.action = act;
                            }
                            
                        }
                    },
                    remoteSort : true,
                    reader : Pman.Readers.Events,
                    sortInfo : { field: 'event_when', direction: 'DESC'},
                    proxy : {
                        xtype: 'HttpProxy',
                        xns: Roo.data,
                        method : 'GET',
                        url : baseURL + '/Roo/Events.php'
                    }
                },
                footer : {
                    xtype: 'PagingToolbar',
                    xns: Roo,
                    pageSize : 25,
                    displayInfo : true,
                    displayMsg : 'Displaying Events  {0} - {1} of {2}',
                    emptyMsg : 'No Events found'
                },
                toolbar : {
                    xtype: 'Toolbar',
                    xns: Roo,
                    items : [
                        {
                            xtype: 'TextItem',
                            xns: Roo.Toolbar,
                            text : "Show"
                        },
                        {
                            xtype: 'ComboBox',
                            xns: Roo.form,
                            fieldLabel : 'Person ',
                            name : 'person_id_name',
                            qtip : "Select Person ",
                            emptyText : "Select Person ",
                            selectOnFocus : true,
                            allowBlank : true,
                            width : 150,
                            listWidth : 400,
                            editable : false,
                            displayField : 'name',
                            valueField : 'id',
                            typeAhead : true,
                            forceSelection : true,
                            triggerAction : 'all',
                            tpl : '<div class="x-grid-cell-text x-btn button"><b>{name}</b> </div>',
                            queryParam : 'query[name]',
                            loadingText : "Searching...",
                            minChars : 2,
                            pageSize : 20,
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
                            store : {
                                xtype: 'Store',
                                xns: Roo.data,
                                reader : Pman.Readers.Person,
                                listeners : {
                                    beforeload : function (_self, o)
                                    {
                                        o.params = o.params || {};
                                        o.company_id = Pman.Login.authUser.company_id;
                                    }
                                },
                                proxy : {
                                    xtype: 'HttpProxy',
                                    xns: Roo.data,
                                    url : baseURL + '/Roo/Person.php',
                                    method : 'GET'
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
                            listWidth : 200,
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
                                sortInfo : '{ field : \'action\' , direction : \'ASC\' }',
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
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            listeners : {
                                click : function (_self, e)
                                {
                                 
                                    var params = {
                                        'sort' : 'event_when',
                                        'dir' : 'DESC',
                                        'start' : 0,
                                        'limit' : 400,
                                        person_id : _this.personSel.getValue(), 
                                        'csvTitles[0]' : 'When',   'csvCols[0]' : 'event_when', 
                                        'csvTitles[1]' : 'Staff',   'csvCols[1]' : 'person_name', 
                                        'csvTitles[2]' : 'Action',   'csvCols[2]' : 'action', 
                                        'csvTitles[3]' : 'Remarks',   'csvCols[3]' : 'remarks'
                                        
                                    }
                                        
                                    
                                    var act = _this.actionSel.getValue();
                                    if (act.length) {
                                        params.action = act;
                                    }
                                    
                                
                                    new Pman.download({
                                        url : baseURL + '/Roo/Events.php',
                                        params : params,
                                        newWindow: true
                                        
                                    });
                                }
                            },
                            text : "Download"
                        }
                    ]
                },
                colModel : [
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'When',
                        width : 100,
                        dataIndex : 'event_when',
                        renderer : function(v) { return v ? v.dateFormat('d/m/Y H:i') : ''; }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Staff',
                        width : 150,
                        dataIndex : 'person_name',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Action',
                        width : 100,
                        dataIndex : 'action',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'IP',
                        width : 100,
                        dataIndex : 'ipaddr',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Affected',
                        width : 100,
                        dataIndex : 'on_id',
                        renderer : function(v, x, r) {                             return v ? String.format('{0}({1})', r.data.on_table, v)  : '';                         }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Remarks',
                        width : 300,
                        dataIndex : 'remarks',
                        renderer : function(v) { return String.format('{0}', v); }
                    }
                ]
            }
        });
        this.layout = this.panel.layout;

    }
});
