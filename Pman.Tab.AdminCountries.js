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
            listeners : {
                activate : function (_self)
                {
                    _this.panel = this;
                    if (_this.grid){
                        _this.grid.ds.load({});
                    }
                }
            },
            background : true,
            fitContainer : true,
            fitToFrame : true,
            region : 'west',
            tableName : 'Person',
            title : "Countries",
            grid : {
                xtype: 'Grid',
                xns: Roo.grid,
                listeners : {
                    render : function() 
                    {
                        _this.grid = this; 
                        //_this.dialog = Pman.Dialog.Groups;
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
                autoExpandColumn : 'country',
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
                            o.params.limit = 9999;
                            o.params._hideEmptyCountry = 1;
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
                    sortInfo : { field : 'country_tr', direction: 'ASC' },
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
                colModel : [
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'country',
                        header : 'Country',
                        width : 200,
                        renderer : function(v,x,r)
                        {
                            if(v*1 == -1){
                                return String.format('<b>{0}</b>', r.data.country_tr);
                            }
                            
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
                            Roo.log("DROP");
                            
                            var t = Roo.lib.Event.getTarget(e); 
                            var ri = _this.grid.view.findRowIndex(t);
                            var rid  = false;
                            if (ri !== false) {
                                rid = _this.grid.getDataSource().getAt(ri).data;
                            }
                            var s = _this.grid.getSelectionModel().getSelections();
                              
                            //console.log(data);
                            var isFromGroup = _this.grid.getSelectionModel().isSelected(ri);;
                        
                            var isToGroup = rid && rid.id > 0;
                            this.success = false;
                            
                            if (isFromGroup){
                                return;
                            }
                            var targetCountry = rid.country;
                            var action = 'add';
                            
                            if (targetCountry*1 == -1) {
                                action = 'sub';
                                //return 'x-dd-drop-ok-sub'; 
                            }
                            // build a list of selections.
                            var sels = [];
                            
                            for (var i=0; i < data.selections.length; i++){
                                var c = data.selections[i].data.countries.split(',');
                                if(c.indexOf(targetCountry) > -1){
                                    //Roo.log("skipped : "+data.selections[i].data.id);
                                    continue;
                                }
                                Roo.log(data.selections[i].data);
                                sels.push(data.selections[i].data.id);
                            }
                            Roo.log('submit');
                            Roo.log(sels);
                            Roo.log(action);
                            Roo.log(targetCountry);
                            //return;
                            if(sels.length < 1){
                                Roo.MessageBox.alert('Error', 'No person add to group');
                                return;
                            }
                            
                            new Pman.Request({
                                url: baseURL + '/Core/GroupCountries.php',
                                params: {
                                    action : action,
                                    country: (targetCountry != -1) ? targetCountry : _this.grid.getSelectionModel().getSelected().data.country,
                                    user_ids : sels.join(',')
                                },
                                method: 'POST',  
                                success : function(res) {
                                    
                                    //var data = res.data
                                    //refreshPager();
                                    // 
                                    // do we need to do anything??
                                    //if (isFromGroup) {
                                    //    Pman.Tab.AdminContacts.grid.footer.onClick('refresh');
                                    //}
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
                            Roo.log("dragover");
                            
                            var t = Roo.lib.Event.getTarget(e);
                            var ri = _this.grid.view.findRowIndex(t);
                            var rid  = false;
                            if (ri !== false) {
                                rid = _this.grid.getDataSource().getAt(ri).data;
                            }
                            
                            var c = _this.grid.getSelectionModel().getSelected().data.country;
                            
                            var isFromGroup = _this.grid.getSelectionModel().isSelected(ri);
                            
                        //    var isToGroup = rid && rid.id > 0;
                            
                            Roo.log(", isFromGroup:" + isFromGroup);
                             
                            if (isFromGroup) {
                                this.valid = false;
                        //        Roo.log('not valid');
                                return;
                            }
                            /*
                            if (!isFromGroup && !isToGroup) {
                                this.valid = false;
                        //        Roo.log('not valid');
                                return  
                            }
                            */
                            if(rid.country*1 == -1) {
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
