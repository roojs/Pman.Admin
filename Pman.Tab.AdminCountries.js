//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Pman.Tab.AdminCountries = new Roo.XComponent({
    part     :  ["Admin","Countries"],
    order    : '001-Pman.Tab.AdminCountries',
    region   : 'center',
    parent   : 'Pman.Tab.AdminContactsManager',
    name     : "Pman.Tab.AdminCountries",
    disabled : false, 
    permname : '', 
    _tree : function()
    {
        var _this = this;
        var MODULE = this;
        return {
            xtype: 'GridPanel',
            xns: Roo,
            tableName : 'Person',
            background : true,
            fitContainer : true,
            fitToFrame : true,
            region : 'west',
            title : "Countries",
            grid : {
                xtype: 'Grid',
                xns: Roo.grid,
                listeners : {
                    render : function() 
                    {
                        _this.grid = this; 
                        _this.dialog = Pman.Dialog.Groups;
                        if (_this.panel.active) {
                            _this.grid.ds.load({});
                        }
                    },
                    rowdblclick : function (_self, rowIndex, e)
                    {
                        if (!_this.dialog) return;
                        var s = this.getDataSource().getAt(rowIndex);
                        if (s.data.id < 1 ) {
                            return;
                        }
                        _this.dialog.show( s.data, function() {
                            _this.ds.load({});
                        }); 
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
                            o.params._distinct = 'country';
                            o.params._columns = 'country,country_tr';
                            o.params.sort = 'country_tr';
                            o.params.limit = 9999;
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
                        url : baseURL + '/Roo/Clipping.php'
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
                                                _this.dialog.show( { id : 0,  type: 2 } , function() {
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
                                                if (s[0].data.id < 1 ) {
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
                        dataIndex : 'country',
                        header : 'Country',
                        width : 200,
                        renderer : function(v,x,r)
                        {   
                            return String.format('{0}', r.data.country_tr);
                        }
                    }
                ],
                sm : {
                    xtype: 'RowSelectionModel',
                    xns: Roo.grid,
                    listeners : {
                        afterselectionchange : function (_self)
                        {
                        //    Pman.Tab.AdminContacts.grid.footer.onClick('first');
                            var c = Pman.Tab.AdminContactsManager.layout.getRegion('center');
                            c.getActivePanel().grid.footer.onClick('first');
                            
                        }
                    },
                    singleSelect : true
                },
                dropTarget : {
                    xtype: 'DropTarget',
                    xns: Roo.dd,
                    listeners : {
                        drop : function (source, e, data)
                        {
                            // Roo.log("DROP");
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
                            this.success = false;
                            if (isFromGroup && isToGroup) {
                                return;
                            }
                            if (!isFromGroup && !isToGroup) {
                                return;
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
                        
                            new Pman.Request({
                                url: baseURL + '/Core/GroupMembers.php',
                                params: {
                                    action : action,
                                    group_id: action =='add' ? rid.id : s[0].data.id,
                                    type: _this.type,
                                    user_ids : sels.join(',')
                                    
                                },  
                                method: 'POST',  
                                success : function(res) {
                                    
                                    var data = res.data
                                    //refreshPager();
                                    // 
                                    // do we need to do anything??
                                    if (isFromGroup) {
                                        Pman.Tab.AdminContacts.grid.footer.onClick('refresh');
                                    }
                                }, 
                                
                                failure: function() {
                                    //Ext.get(document.body).unmask();
                                    //if (cb) {
                                    //    cb.call(false);
                                    //}
                                     
                                }
                            });
                        
                            this.success = true;
                        
                            //if (!isFromGroup && isToGroup) {
                                //return 'x-dd-drop-ok-add'; 
                            return;
                            //}
                        },
                        over : function (source, e, data)
                        {
                            // Roo.log("dragover");
                             
                            //Roo.log(e);
                            var t = Roo.lib.Event.getTarget(e); 
                               //  Roo.log(t);
                            var ri = _this.grid.view.findRowIndex(t);
                              //            Roo.log(ri);
                            
                            var rid  = false;
                            if (ri !== false) {
                                rid = _this.grid.getDataSource().getAt(ri).data;
                            }
                            
                            var s = _this.grid.getSelectionModel().getSelections();
                            
                            var isFromGroup = s.length ? s[0].data.id > 0 : false;
                            
                            var isToGroup = rid && rid.id > 0;
                            
                        //    Roo.log("isToGroup:"  + isToGroup + ", isFromGroup" + isFromGroup);
                             
                            if (isFromGroup && isToGroup) {
                                this.valid = false;
                        //        Roo.log('not valid');
                                return;
                            }
                            if (!isFromGroup && !isToGroup) {
                                this.valid = false;
                        //        Roo.log('not valid');
                                return  
                            }
                            if (isFromGroup && !isToGroup) {
                                this.valid = 'ok-sub'; 
                                return;
                            } 
                            //if (!isFromGroup && isToGroup) {
                            this.valid = 'ok-add';
                        //    Roo.log('add'); 
                            //}
                        }
                    },
                    ddGroup : 'groupDD'
                }
            }
        };
    }
});
