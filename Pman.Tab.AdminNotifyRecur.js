//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Pman.Tab.AdminNotifyRecur = new Roo.XComponent({
    part     :  ["Admin","NotifyRecur"],
    order    : '800-Pman.Tab.AdminNotifyRecur',
    region   : 'center',
    parent   : 'Pman.Tab.AdminWatchNotify',
    name     : "Pman.Tab.AdminNotifyRecur",
    disabled : false, 
    permname : '', 
    _tree : function()
    {
        var _this = this;
        var MODULE = this;
        return {
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
            tableName : 'core_notify_recur',
            title : "Recurrent Notifications",
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
                autoExpandColumn : 'person_id_name',
                loadMask : true,
                toolbar : {
                    xtype: 'Toolbar',
                    xns: Roo
                },
                dataSource : {
                    xtype: 'Store',
                    xns: Roo.data,
                    remoteSort : true,
                    sortInfo : { field : 'person_id_name', direction: 'ASC' },
                    proxy : {
                        xtype: 'HttpProxy',
                        xns: Roo.data,
                        method : 'GET',
                        url : baseURL + '/Roo/core_notify_recur.php'
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
                                'name': 'person_id',
                                'type': 'int'
                            },
                            {
                                'name': 'dtstart',
                                'type': 'date',
                                'dateFormat': 'Y-m-d'
                            },
                            {
                                'name': 'dtend',
                                'type': 'date',
                                'dateFormat': 'Y-m-d'
                            },
                            {
                                'name': 'max_applied_dt',
                                'type': 'date',
                                'dateFormat': 'Y-m-d'
                            },
                            {
                                'name': 'updated_dt',
                                'type': 'date',
                                'dateFormat': 'Y-m-d'
                            },
                            {
                                'name': 'last_applied_dt',
                                'type': 'date',
                                'dateFormat': 'Y-m-d'
                            },
                            {
                                'name': 'tz',
                                'type': 'string'
                            },
                            {
                                'name': 'freq',
                                'type': 'string'
                            },
                            {
                                'name': 'freq_day',
                                'type': 'string'
                            },
                            {
                                'name': 'freq_hour',
                                'type': 'string'
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
                                'name': 'last_event_id',
                                'type': 'int'
                            },
                            {
                                'name': 'method',
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
                    displayMsg : "Displaying core_notify_recur{0} - {1} of {2}",
                    emptyMsg : "No core_notify_recur found"
                },
                colModel : [
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'person_id_name',
                        header : 'Person',
                        width : 75,
                        renderer : function(v,x,r) { 
                            return String.format('{0} <a href="mailto:{1}">{1}</a>', v,r.data.person_id_email); 
                        }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Dtstart',
                        width : 75,
                        dataIndex : 'dtstart',
                        renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y') : ''); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Dtend',
                        width : 75,
                        dataIndex : 'dtend',
                        renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y') : ''); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'last_applied_dt',
                        header : 'Last Notification created',
                        width : 75,
                        renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y') : ''); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'tz',
                        header : 'Tz',
                        width : 50,
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'freq',
                        header : 'Freq',
                        width : 100,
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'freq_day',
                        header : 'Freq day',
                        width : 100,
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Freq hour',
                        width : 200,
                        dataIndex : 'freq_hour',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'onid',
                        header : 'Affects',
                        width : 75,
                        renderer : function(v,x,r) { return String.format('{1}:{0}', v,r.data.ontable); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'method',
                        header : 'Method',
                        width : 75,
                        renderer : function(v) { return String.format('{0}', v); }
                    }
                ]
            }
        };
    }
});
