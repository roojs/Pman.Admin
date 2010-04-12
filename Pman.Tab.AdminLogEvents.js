//<script type="text/javascript"> 
       
// Auto generated file build Builder

            
       
// register the module first       
Pman.on('beforeload', function()
{

    Pman.register({
        modKey : '000-pman_tab_adminlogevents',
        module : Pman.Tab.AdminLogEvents,
        region : 'center',
        parent : Pman.Tab.AdminLogs,
        name : "Admin - Logs - Events"
    });
});

Pman.Tab.AdminLogEvents = {
    
    panel : false,
    disabled : false,
    parentLayout:  false,

    add : function(parentLayout, region)
    {
        
        if (this.disabled) {
            return;
        }
        var _this = this;
        this.parentLayout = parentLayout;
        
        this.panel = this.parentLayout.addxtype({
            xtype : 'GridPanel',
            title : "Events",
            fitToframe : true,
            fitContainer : true,
            tableName : 'Events',
            background : true,
            listeners : {
                activate: function() {
                    _this.panel = this;
                    if (_this.grid) {
                        _this.grid.footer.onClick('first');
                    }
                }
            },
            grid : {
                xtype : 'Grid',
                autoExpandColumn : 'remarks',
                loadMask : true,
                listeners : {
                    render: function() { 
                        _this.grid = this; 
                        //_this.dialog = Pman.Dialog.FILL_IN
                        if (_this.panel.active) {
                           this.footer.onClick('first');
                        }
                    }
                },
                dataSource : {
                    xtype : 'Store',
                    reader: Pman.Readers.Events,
                    listeners : {
                        beforeload: function (_self, o)
                        {
                           if (! _this.personSel) {
                            return;
                            }
                            o.params = o.params || {};
                            o.params.person_id = _this.personSel.getValue();
                            
                        }
                    },
                    remoteSort : true,
                    sortInfo: { field: 'event_when', direction: 'DESC'},
                    proxy : {
                        xtype : 'HttpProxy',
                        method : 'GET',
                        url: baseURL + '/Roo/Events.php'
                    }
                },
                colModel : [
                    {
                        header : 'When',
                        width : 100,
                        dataIndex : 'event_when',
                        renderer: function(v) { return v ? v.dateFormat('d/m/Y H:i') : ''; }
                    },
                    {
                        header : 'Staff',
                        width : 150,
                        dataIndex : 'person_name',
                        renderer: function(v) { return String.format('{0}', v); }
                    },
                    {
                        header : 'Action',
                        width : 100,
                        dataIndex : 'action',
                        renderer: function(v) { return String.format('{0}', v); }
                    },
                    {
                        header : 'IP',
                        width : 100,
                        dataIndex : 'ipaddr',
                        renderer: function(v) { return String.format('{0}', v); }
                    },
                    {
                        header : 'Affected',
                        width : 100,
                        dataIndex : 'on_id',
                        renderer: function(v, x, r) {                             return v ? String.format('{0}({1})', r.data.on_table, v)  : '';                         }
                    },
                    {
                        header : 'Remarks',
                        width : 300,
                        dataIndex : 'remarks',
                        renderer: function(v) { return String.format('{0}', v); }
                    }
                ],
                footer : {
                    xtype : 'PagingToolbar',
                    pageSize : 25,
                    displayInfo : true,
                    displayMsg : "Displaying Events  {0} - {1} of {2}",
                    emptyMsg : "No Events found"
                },
                toolbar : {
                    xtype : 'Toolbar',
                    items : [
                        {
                            xtype : 'TextItem',
                            xns: Roo.Toolbar,
                            text : "Show"
                        },
                        {
                            fieldLabel : "Person ",
                            name : 'person_id_name',
                            qtip : "Select Person ",
                            emptyText : "Select Person ",
                            xtype : 'ComboBox',
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
                            tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{name}<\/b> <\/div>',
                            queryParam : 'query[name]',
                            loadingText : "Searching...",
                            minChars : 2,
                            pageSize : 20,
                            listeners : {
                                select: function (combo, record, index)
                                {
                                  _this.grid.footer.onClick('first');
                                },
                                render: function (_self)
                                {
                                  _this.personSel = _self;
                                }
                            },
                            store : {
                                xtype : 'Store',
                                reader: Pman.Readers.Person,
                                listeners : {
                                    beforeload: function (_self, o)
                                    {
                                        o.params = o.params || {};
                                        o.company_id = Pman.Login.authUser.company_id;
                                    }
                                },
                                proxy : {
                                    xtype : 'HttpProxy',
                                    url: baseURL + '/Roo/Person.php',
                                    method : 'GET'
                                }
                            }
                        }
                    ]
                }
            },
            region : 'center'
        });

        
        
    }
}
