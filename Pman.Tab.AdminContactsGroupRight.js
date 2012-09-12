//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Pman.Tab.AdminContactsGroupRight = new Roo.XComponent({
    part     :  ["Admin","ContactsGroupRight"],
    order    : '001-Pman.Tab.AdminContactsGroupRight',
    region   : 'center',
    parent   : 'Pman.Tab.AdminContactsManager',
    name     : "unnamed module",
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
            autoScroll : true,
            background : true,
            fitContainer : true,
            fitToframe : true,
            region : 'center',
            tableName : 'Person',
            title : "Rights",
            grid : {
                xtype: 'Grid',
                xns: Roo.grid,
                listeners : {
                    render : function() 
                    {
                        _this.grid = this; 
                        if (!_this.dialog) {
                            _this.dialog = Pman.Dialog.PersonEdit;
                            
                        }
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
                    },
                    cellclick : function (_self, rowIndex, columnIndex, e)
                    {
                    
                            var di = this.colModel.getDataIndex(columnIndex);
                            if (di != 'active') {
                                return;
                            }
                             
                            var rec = _this.grid.ds.getAt(rowIndex);
                            
                            rec.set('active', rec.data.active ? 0 : 1);
                            rec.commit();
                             
                            
                    }
                },
                autoExpandColumn : 'name',
                ddGroup : 'groupDD',
                enableDrag : true,
                loadMask : true,
                dataSource : {
                    xtype: 'Store',
                    xns: Roo.data,
                    listeners : {
                        beforeload : function (_self, o)
                        {
                            if (!o.params) {
                                o.params = {}
                            }
                            var s = Pman.Tab.Groups.grid.getSelectionModel().getSelections();
                            if (!s.length) {
                                o.params.group_id = -1;
                            } else {
                                o.params.group_id = s[0].data.id;
                            }
                            if (o.params.group_id < 0) {
                                _this.grid.getView().el.mask("You can not set permissions for that group");
                                return false;
                            }
                            _this.grid.getView().el.unmask();
                            return true;
                          
                        },
                        update : function (_self, record, operation)
                        {
                            if (operation != 'commit') {
                                return;
                            }
                            // only used to change active status.
                            
                            new Pman.Request({
                                url : baseURL + '/Roo/Person.php',
                                method :'POST',
                                params : {
                                    id : record.data.id,
                                    active: record.data.active
                                    
                                },
                                success : function() {
                                    // do nothing
                                    
                                    _this.grid.ds.remove(record);
                                    
                                },
                                failure : function() 
                                {
                                    Roo.MessageBox.alert("Error", "saving failed", function() {
                                        _this.grid.footer.onClick('first');
                                    });
                                }
                            });
                        }
                    },
                    remoteSort : true,
                    sortInfo : { field : 'name', direction: 'ASC' },
                    proxy : {
                        xtype: 'HttpProxy',
                        xns: Roo.data,
                        method : 'GET',
                        url : baseURL + '/Admin/GroupRights.php'
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
                            }
                        ]
                    }
                },
                footer : {
                    xtype: 'PagingToolbar',
                    xns: Roo,
                    pageSize : 25,
                    displayInfo : true,
                    displayMsg : "Displaying Person{0} - {1} of {2}",
                    emptyMsg : "No Person found",
                    items : [
                        {
                            xtype: 'TextItem',
                            xns: Roo.Toolbar,
                            text : "Drag person to add or remove from group"
                        }
                    ]
                },
                toolbar : {
                    xtype: 'Toolbar',
                    xns: Roo,
                    items : [
                        {
                            xtype: 'TextItem',
                            xns: Roo.Toolbar,
                            text : "Search"
                        },
                        {
                            xtype: 'TextField',
                            xns: Roo.form,
                            listeners : {
                                render : function (_self)
                                {
                                    _this.searchBox = _self;
                                },
                                show : function (_self,e)
                                {
                                    if (e.getCharCode() != 13) {
                                        return;
                                    }
                                    _this.grid.footer.onClick('first');
                                },
                                specialkey : function (_self, e)
                                {
                                  if (e.getKey() == 13) {
                                    _this.grid.footer.onClick('first');
                                  }
                                }
                            }
                        },
                        {
                            xtype: 'ComboBox',
                            xns: Roo.form,
                            listeners : {
                                render : function (_self)
                                {
                                  _this.companyCombo = _self;
                                },
                                select : function (combo, record, index)
                                {
                                   _this.grid.footer.onClick.defer(300,_this.grid.footer,[ 'first'] );
                                }
                            },
                            displayField : 'name',
                            editable : true,
                            emptyText : "Select Company",
                            forceSelection : true,
                            hiddenName : 'company_id',
                            listWidth : 400,
                            loadingText : "Searching...",
                            minChars : 2,
                            name : 'company_name',
                            pageSize : 20,
                            qtip : "Select Companies",
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
                                listeners : {
                                    beforeload : function (_self, o){
                                        o.params = o.params || {};
                                        // set more here
                                    }
                                },
                                remoteSort : true,
                                sortInfo : { direction : 'ASC', field: 'name' },
                                proxy : {
                                    xtype: 'HttpProxy',
                                    xns: Roo.data,
                                    method : 'GET',
                                    url : baseURL + '/Roo/Companies.php'
                                },
                                reader : {
                                    xtype: 'JsonReader',
                                    xns: Roo.data,
                                    id : 'id',
                                    root : 'data',
                                    totalProperty : 'total',
                                    fields : [{"name":"id","type":"int"},{"name":"code","type":"string"}]
                                }
                            }
                        },
                        {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            listeners : {
                                click : function (_self, e)
                                {
                                _this.grid.footer.onClick('first');
                                }
                            },
                            cls : 'x-btn-icon',
                            icon : rootURL + '/Pman/templates/images/search.gif'
                        },
                        {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            listeners : {
                                click : function (_self, e)
                                {
                                _this.searchBox.setValue('');
                                    _this.grid.footer.onClick('first');
                                }
                            },
                            cls : 'x-btn-icon',
                            icon : rootURL + '/Pman/templates/images/edit-clear.gif'
                        },
                        {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            listeners : {
                                toggle : function (_self, pressed)
                                {
                                   _this.grid.footer.onClick('first');
                                   this.setText(pressed ? "Show Active" : "Show Removed");
                                   
                                   
                                },
                                render : function (_self)
                                {
                                  _this.activeButton = _self;
                                }
                            },
                            enableToggle : true,
                            text : "Show Removed"
                        },
                        {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            listeners : {
                                toggle : function (_self, pressed)
                                {
                                   _this.grid.footer.onClick('first');
                                   this.setText(pressed ? "Show Company" : "Show No Company");
                                   
                                   
                                },
                                render : function (_self)
                                {
                                  _this.active_company_button = _self;
                                }
                            },
                            enableToggle : true,
                            text : "Show No Company"
                        },
                        {
                            xtype: 'Fill',
                            xns: Roo.Toolbar
                        },
                        {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            listeners : {
                                click : function()
                                {
                                    
                                    _this.dialog.show( { id : 0 } , function() {
                                        _this.grid.footer.onClick('first');
                                   }); 
                                }
                            },
                            cls : 'x-btn-text-icon',
                            text : "Add",
                            icon : Roo.rootURL + 'images/default/dd/drop-add.gif'
                        },
                        {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            listeners : {
                                click : function()
                                {
                                    
                                    Pman.Dialog.PersonBulkAdd.show( { id : 0 } , function() {
                                        _this.grid.footer.onClick('first');
                                   }); 
                                }
                            },
                            cls : 'x-btn-text-icon',
                            text : "Bulk Add",
                            icon : Roo.rootURL + 'images/default/dd/drop-add.gif'
                        },
                        {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            listeners : {
                                click : function()
                                {
                                    var s = _this.grid.getSelectionModel().getSelections();
                                    if (!s.length || (s.length > 1))  {
                                        Roo.MessageBox.alert("Error", s.length ? "Select only one Row" : "Select a Row");
                                        return;
                                    }
                                  
                                    _this.dialog.show(s[0].data, function() {
                                        _this.grid.footer.onClick('first');
                                    }); 
                                    
                                }
                            },
                            cls : 'x-btn-text-icon',
                            text : "Edit",
                            icon : Roo.rootURL + 'images/default/tree/leaf.gif'
                        },
                        {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            listeners : {
                                click : function()
                                {
                                     Pman.genericDelete(_this, 'Person'); 
                                }
                            },
                            cls : 'x-btn-text-icon',
                            text : "Delete",
                            icon : rootURL + '/Pman/templates/images/trash.gif'
                        }
                    ]
                },
                colModel : [
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'accessmask',
                        header : 'All',
                        sortable : false,
                        width : 50,
                        renderer : function(v,x,r) {
                        
                            state = (v == fm) ? '-checked' : '';
                        
                            
                            return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                        }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'rightname',
                        header : 'Module',
                        sortable : true,
                        width : 150,
                        renderer : function(v,x,r) {
                            return String.format('<span qtip="{1}">{0}</span>', v.split('.').shift(), v);
                        }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'name',
                        header : 'Name',
                        sortable : true,
                        width : 200,
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'role',
                        header : 'Role',
                        width : 100,
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'phone',
                        header : 'Phone',
                        width : 100,
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'fax',
                        header : 'Fax',
                        width : 100,
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'email',
                        header : 'Email',
                        sortable : true,
                        width : 200,
                        renderer : function(v) {
                           return (v.length && v.indexOf('@') > 0 ) ? 
                                            String.format('<a href="mailto:{0}">{0}</a>',v) : v;
                         }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'active',
                        header : 'Active',
                        width : 75,
                        renderer : function(v) {  
                            var state = v> 0 ?  '-checked' : '';
                        
                            return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                                        
                         }
                    }
                ]
            }
        };
    }
});
