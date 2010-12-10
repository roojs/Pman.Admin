//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)



// register the module first
Pman.on('beforeload', function()
{
    Pman.register({
        modKey : '001-Pman.Tab.AdminLogEvents',
        module : Pman.Tab.AdminLogEvents,
        region : 'center',
        parent : false,
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
            title : "Events",
            fitToframe : true,
            fitContainer : true,
            tableName : 'Events',
            background : true,
            listeners : {
                activate : function() {
                    _this.panel = this;
                    if (_this.grid) {
                        _this.grid.footer.onClick('first');
                    }
                }
            },
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
                    reader : Pman.Readers.Events,
                    listeners : {
                        beforeload : function (_self, o)
                        {
                           if (! _this.personSel) {
                            return;
                            }
                            o.params = o.params || {};
                            o.params.person_id = _this.personSel.getValue();
                            
                        }
                    },
                    remoteSort : true,
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
                                  _this.personSel = _self;
                                }
                            },
                            allowBlank : true,
                            displayField : 'name',
                            editable : false,
                            emptyText : "Select Person ",
                            fieldLabel : 'Person ',
                            forceSelection : true,
                            listWidth : 400,
                            loadingText : "Searching...",
                            minChars : 2,
                            name : 'person_id_name',
                            pageSize : 20,
                            qtip : "Select Person ",
                            queryParam : 'query[name]',
                            selectOnFocus : true,
                            tpl : '<div class="x-grid-cell-text x-btn button"><b>{name}</b> </div>',
                            triggerAction : 'all',
                            typeAhead : true,
                            valueField : 'id',
                            width : 150,
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
