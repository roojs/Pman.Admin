//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Pman.Dialog.AdminEventLog = {

    dialog : false,
    callback:  false,

    show : function(data, cb)
    {
        if (!this.dialog) {
            this.create();
        }

        this.callback = cb;
        this.data = data;
        this.dialog.show(this.data._el);
        if (this.form) {
           this.form.reset();
           this.form.setValues(data);
           this.form.fireEvent('actioncomplete', this.form,  { type: 'setdata', data: data });
        }

    },

    create : function()
    {
        var _this = this;
        this.dialog = Roo.factory({
            xtype: 'LayoutDialog',
            xns: Roo,
            listeners : {
                show : function (_self)
                {
                    _this.grid.onClick('first');
                }
            },
            height : 500,
            title : "Event history",
            width : 800,
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
                    background : false,
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
                                _this.grid = this; 
                                //_this.dialog = Pman.Dialog.FILL_IN
                                if (_this.panel.active) {
                                   this.footer.onClick('first');
                                }
                            },
                            rowdblclick : function (_self, rowIndex, e)
                            {
                                if (!_this.dialog) return;
                                _this.dialog.show( this.getDataSource().getAt(rowIndex).data, function() {
                                    _this.grid.footer.onClick('first');
                                }); 
                            }
                        },
                        autoExpandColumn : 'remarks',
                        loadMask : true,
                        dataSource : {
                            xtype: 'Store',
                            xns: Roo.data,
                            listeners : {
                                beforeload : function (_self,o )
                                {
                                    if (!_this.data || !_this.data.on_id) {
                                        return false;
                                    }
                                    o.params.on_table = _this.data.on_table;
                                    o.params.on_id = _this.data.on_id;
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
                                        'name': 'person_table',
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
                                    },
                                    {
                                        'name': 'person_id_firstname',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'person_id_lastname',
                                        'type': 'string'
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
                                header : 'Event when',
                                width : 75,
                                dataIndex : 'event_when',
                                renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y') : ''); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'person_id_name',
                                header : 'Person name',
                                width : 100,
                                renderer : function(v) { return String.format('{0}', v); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'action',
                                header : 'Action',
                                width : 80,
                                renderer : function(v) { return String.format('{0}', v); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'ipaddr',
                                header : 'Ipaddr',
                                width : 80,
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
            center : {
                xtype: 'LayoutRegion',
                xns: Roo
            },
            buttons : [
                {
                    xtype: 'Button',
                    xns: Roo,
                    listeners : {
                        click : function (_self, e)
                        {
                            _this.dialog.hide();
                        }
                    },
                    text : "Close"
                }
            ]
        });
    }
};
