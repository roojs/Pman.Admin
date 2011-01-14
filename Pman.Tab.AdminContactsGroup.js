//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)



// register the module first
Pman.on('beforeload', function()
{
    Pman.register({
        modKey : '001-Pman.Tab.AdminContactsGroup',
        module : Pman.Tab.AdminContactsGroup,
        region : 'center',
        parent : Pman.Tab.AdminContactsManager,
        name : "Pman.Tab.AdminContactsGroup",
        disabled : false, 
        permname: '' 
    });
});

Pman.Tab.AdminContactsGroup = new Roo.util.Observable({

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
                        _this.grid.ds.load({});
                    }
                }
            },
            background : true,
            fitContainer : true,
            fitToframe : true,
            region : 'west',
            tableName : 'Groups',
            title : "Groups",
            grid : {
                xtype: 'Grid',
                xns: Roo.grid,
                listeners : {
                    render : function() 
                    {
                        _this.grid = this; 
                        //_this.dialog = Pman.Dialog.FILL_IN
                        if (_this.panel.active) {
                            _this.grid.ds.load({});
                        }
                    },
                    rowdblclick : function (_self, rowIndex, e)
                    {
                        if (!_this.dialog) return;
                        _this.dialog.show( this.getDataSource().getAt(rowIndex), function() {
                            _this.grid.footer.onClick('first');
                        }); 
                    },
                    enddrag : function (_self, dd, e)
                    {
                    
                    }
                },
                autoExpandColumn : 'name',
                ddGroup : 'groupDD',
                enableDrop : true,
                loadMask : true,
                dataSource : {
                    xtype: 'Store',
                    xns: Roo.data,
                    listeners : {
                        beforeload : function (_self, o)
                        {
                            o.params = o.params || {};
                            o.params.type =2;
                        },
                        load : function (_self, records, options)
                        {
                            var sm = _this.grid.getSelectionModel();
                                if (!sm.getSelections().length) {
                                    sm.selectFirstRow();
                                }
                                Pman.Tab.AdminContacts.grid.footer.onClick('first');
                        }
                    },
                    remoteSort : true,
                    sortInfo : { field : 'name', direction: 'ASC' },
                    proxy : {
                        xtype: 'HttpProxy',
                        xns: Roo.data,
                        method : 'GET',
                        url : baseURL + '/Roo/Groups.php'
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
                                'name': 'name',
                                'type': 'string'
                            },
                            {
                                'name': 'type',
                                'type': 'int'
                            },
                            {
                                'name': 'leader',
                                'type': 'int'
                            },
                            {
                                'name': 'leader_id',
                                'type': 'int'
                            },
                            {
                                'name': 'leader_office_id',
                                'type': 'int'
                            },
                            {
                                'name': 'leader_name',
                                'type': 'string'
                            },
                            {
                                'name': 'leader_phone',
                                'type': 'string'
                            },
                            {
                                'name': 'leader_fax',
                                'type': 'string'
                            },
                            {
                                'name': 'leader_email',
                                'type': 'string'
                            },
                            {
                                'name': 'leader_company_id',
                                'type': 'int'
                            },
                            {
                                'name': 'leader_role',
                                'type': 'string'
                            },
                            {
                                'name': 'leader_active',
                                'type': 'int'
                            },
                            {
                                'name': 'leader_remarks',
                                'type': 'string'
                            },
                            {
                                'name': 'leader_passwd',
                                'type': 'string'
                            },
                            {
                                'name': 'leader_owner_id',
                                'type': 'int'
                            },
                            {
                                'name': 'leader_lang',
                                'type': 'string'
                            },
                            {
                                'name': 'leader_no_reset_sent',
                                'type': 'int'
                            },
                            {
                                'name': 'leader_action_type',
                                'type': 'string'
                            },
                            {
                                'name': 'leader_project_id',
                                'type': 'int'
                            }
                        ]
                    }
                },
                toolbar : {
                    xtype: 'Toolbar',
                    xns: Roo,
                    items : [
                        {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            text : "Manage Groups",
                            menu : {
                                xtype: 'Menu',
                                xns: Roo.menu,
                                items : [
                                    {
                                        xtype: 'Item',
                                        xns: Roo.menu,
                                        listeners : {
                                            click : function()
                                            {
                                                if (!_this.dialog) return;
                                                _this.dialog.show( { id : 0 } , function() {
                                                     _this.grid.ds.load({});
                                               }); 
                                            }
                                        },
                                        cls : 'x-btn-text-icon',
                                        text : "Add",
                                        icon : Roo.rootURL + 'images/default/dd/drop-add.gif'
                                    },
                                    {
                                        xtype: 'Item',
                                        xns: Roo.menu,
                                        listeners : {
                                            click : function()
                                            {
                                                var s = _this.grid.getSelectionModel().getSelections();
                                                if (!s.length || (s.length > 1))  {
                                                    Roo.MessageBox.alert("Error", s.length ? "Select only one Row" : "Select a Row");
                                                    return;
                                                }
                                                if (!_this.dialog) return;
                                                _this.dialog.show(s[0].data, function() {
                                                     _this.grid.ds.load({});
                                                }); 
                                                
                                            }
                                        },
                                        cls : 'x-btn-text-icon',
                                        text : "Edit",
                                        icon : Roo.rootURL + 'images/default/tree/leaf.gif'
                                    },
                                    {
                                        xtype: 'Item',
                                        xns: Roo.menu,
                                        listeners : {
                                            click : function()
                                            {
                                                 Pman.genericDelete(_this, 'Groups'); 
                                            }
                                        },
                                        cls : 'x-btn-text-icon',
                                        text : "Delete",
                                        icon : rootURL + '/Pman/templates/images/trash.gif'
                                    },
                                    {
                                        xtype: 'Separator',
                                        xns: Roo.menu
                                    },
                                    {
                                        xtype: 'Item',
                                        xns: Roo.menu,
                                        listeners : {
                                            click : function (_self, e)
                                            {
                                              _this.grid.ds.load({});
                                            }
                                        },
                                        text : "Reload"
                                    }
                                ]
                            }
                        }
                    ]
                },
                colModel : [
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'name',
                        header : 'Name',
                        width : 200,
                        renderer : function(v,x,r) { 
                            if (r.data.id == -1) {
                                return '<b>' + "Not in a Group" + '</b>';
                            }
                            if ((r.data.id == 0) && (_this.type == 0)) {
                                return '<b>' + "All Staff (Default Permissions)" + '</b>';
                            }
                            if ((r.data.id == 0) && (_this.type == 2)) {
                                return '<b>' + "Everybody" + '</b>';
                            }
                            if (r.data.id == 0) {
                                return '<b>' + "All Staff" + '</b>';
                            }
                            if (v == 'Administrators') {
                                return '<b>' + "Adminstrators" + '</b>';
                            }
                            if (r.data.leader) {
                                return v + ' (' + r.data.leader_name + ')';
                            }
                            
                            return v;
                        }
                    }
                ],
                sm : {
                    xtype: 'RowSelectionModel',
                    xns: Roo.grid,
                    listeners : {
                        afterselectionchange : function (_self)
                        {
                            Pman.Tab.AdminContacts.footer.onClick('first');
                        }
                    },
                    singleSelect : true
                },
                dragTarget : {
                    xtype: 'DropTarget',
                    xns: Roo.dd,
                    listeners : {
                        drop : function (source, e, data)
                        {
                         Roo.log("DROP");
                            var t = Roo.lib.Event.getTarget(e); 
                            var ri = _this.grid.view.findRowIndex(t);
                            var rid  = false;
                            if (ri !== false) {
                                rid = _this.grid.getDataSource().getAt(ri).data;
                            }
                            var s = _this.grid.getSelectionModel().getSelections();
                              
                            //console.log(data);
                            var isFromGroup = s.length ? s[0].data.id > 0 : false;
                        
                            var isToGroup = rid && rid.id > 0;
                        
                            if (isFromGroup && isToGroup) {
                                return false;
                            }
                            if (!isFromGroup && !isToGroup) {
                                return false;
                            }
                            var action = 'add';
                            if (isFromGroup && !isToGroup) {
                                action = 'sub';
                                //return 'x-dd-drop-ok-sub'; 
                            }
                            // build a list of selections.
                            var sels = [];
                            for (var i=0; i < data.selections.length; i++) {
                                sels.push(data.selections[i].data.id);
                            }
                        
                            Pman.request({
                                url: baseURL + '/Core/GroupMembers.php',
                                params: {
                                    action : action,
                                    group_id: action =='add' ? rid.id : s[0].data.id,
                                    type: _this.type,
                                    user_ids : sels.join(',')
                                    
                                },  
                                method: 'POST',  
                                success : function(data) {
                                    refreshPager();
                                }, 
                                
                                failure: function() {
                                    //Ext.get(document.body).unmask();
                                    //if (cb) {
                                    //    cb.call(false);
                                    //}
                                     
                                }
                            });
                        
                        
                        
                            //if (!isFromGroup && isToGroup) {
                                //return 'x-dd-drop-ok-add'; 
                            return true;
                            //}
                        },
                        over : function (source, e, data)
                        {
                         Roo.log("dragover");
                            var t = Roo.lib.Event.getTarget(e); 
                            var ri = _this.grid.view.findRowIndex(t);
                            var rid  = false;
                            if (ri !== false) {
                                rid = _this.grid.getDataSource().getAt(ri).data;
                            }
                            
                            var s = _this.grid.getSelectionModel().getSelections();
                            
                            var isFromGroup = s.length ? s[0].data.id > 0 : false;
                            
                            var isToGroup = rid && rid.id > 0;
                            
                            if (isFromGroup && isToGroup) {
                                return this.dropNotAllowed; 
                            }
                            if (!isFromGroup && !isToGroup) {
                                return this.dropNotAllowed; 
                            }
                            if (isFromGroup && !isToGroup) {
                                return 'x-dd-drop-ok-sub'; 
                            } 
                            //if (!isFromGroup && isToGroup) {
                                return 'x-dd-drop-ok-add'; 
                            //}
                        }
                    }
                }
            }
        });
        this.layout = this.panel.layout;

    }
});
