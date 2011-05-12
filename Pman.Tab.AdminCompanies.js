//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)



// register the module first
Pman.on('beforeload', function()
{
    Pman.register({
        modKey : '001-Pman.Tab.AdminCompanies',
        module : Pman.Tab.AdminCompanies,
        region : 'center',
        parent : false,
        name : "unnamed module",
        disabled : false, 
        permname: '' 
    });
});

Pman.Tab.AdminCompanies = new Roo.util.Observable({

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
            title : "Companies",
            fitToframe : true,
            fitContainer : true,
            tableName : 'Companies',
            background : true,
            region : 'center',
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
                autoExpandColumn : 'name',
                loadMask : true,
                dataSource : {
                    xtype: 'Store',
                    xns: Roo.data,
                    listeners : {
                        load : function (_self, records, options)
                        {
                           try {
                                Pman.Tab.Office.grid.footer.onClick('refresh');
                            } catch (e) {}
                        }
                    },
                    remoteSort : true,
                    sortInfo : { field : 'code', direction: 'ASC' },
                    proxy : {
                        xtype: 'HttpProxy',
                        xns: Roo.data,
                        listeners : {
                            load : function (This, o, arg)
                            {
                             
                            }
                        },
                        method : 'GET',
                        url : baseURL + '/Roo/Companies.php'
                    },
                    reader : {
                        xtype: 'JsonReader',
                        xns: Roo.data,
                        totalProperty : 'total',
                        root : 'data',
                        id : 'id',
                        fields : [
                            {
                                'name': 'code',
                                'type': 'string'
                            },
                            {
                                'name': 'name',
                                'type': 'string'
                            },
                            {
                                'name': 'remarks',
                                'type': 'string'
                            },
                            {
                                'name': 'owner_id',
                                'type': 'int'
                            },
                            {
                                'name': 'address',
                                'type': 'string'
                            },
                            {
                                'name': 'tel',
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
                                'name': 'id',
                                'type': 'int'
                            },
                            {
                                'name': 'isOwner',
                                'type': 'int'
                            },
                            {
                                'name': 'logo_id',
                                'type': 'int'
                            },
                            {
                                'name': 'background_color',
                                'type': 'string'
                            },
                            {
                                'name': 'comptype',
                                'type': 'string'
                            },
                            {
                                'name': 'url',
                                'type': 'string'
                            },
                            {
                                'name': 'main_office_id',
                                'type': 'int'
                            },
                            {
                                'name': 'created_by',
                                'type': 'int'
                            },
                            {
                                'name': 'created_dt',
                                'type': 'date',
                                'dateFormat': 'Y-m-d'
                            },
                            {
                                'name': 'updated_by',
                                'type': 'int'
                            },
                            {
                                'name': 'updated_dt',
                                'type': 'date',
                                'dateFormat': 'Y-m-d'
                            },
                            {
                                'name': 'passwd',
                                'type': 'string'
                            },
                            {
                                'name': 'dispatch_port',
                                'type': 'string'
                            },
                            {
                                'name': 'province',
                                'type': 'string'
                            },
                            {
                                'name': 'country',
                                'type': 'string'
                            },
                            {
                                'name': 'logo_id_id',
                                'type': 'int'
                            },
                            {
                                'name': 'logo_id_filename',
                                'type': 'string'
                            },
                            {
                                'name': 'logo_id_ontable',
                                'type': 'string'
                            },
                            {
                                'name': 'logo_id_onid',
                                'type': 'int'
                            },
                            {
                                'name': 'logo_id_mimetype',
                                'type': 'string'
                            },
                            {
                                'name': 'logo_id_width',
                                'type': 'int'
                            },
                            {
                                'name': 'logo_id_height',
                                'type': 'int'
                            },
                            {
                                'name': 'logo_id_filesize',
                                'type': 'int'
                            },
                            {
                                'name': 'logo_id_displayorder',
                                'type': 'int'
                            },
                            {
                                'name': 'logo_id_language',
                                'type': 'string'
                            },
                            {
                                'name': 'logo_id_parent_image_id',
                                'type': 'int'
                            },
                            {
                                'name': 'logo_id_created',
                                'type': 'date'
                            },
                            {
                                'name': 'logo_id_imgtype',
                                'type': 'string'
                            },
                            {
                                'name': 'logo_id_linkurl',
                                'type': 'string'
                            },
                            {
                                'name': 'logo_id_descript',
                                'type': 'string'
                            },
                            {
                                'name': 'logo_id_title',
                                'type': 'string'
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
                            },
                            {
                                'name': 'main_office_id_id',
                                'type': 'int'
                            },
                            {
                                'name': 'main_office_id_company_id',
                                'type': 'int'
                            },
                            {
                                'name': 'main_office_id_name',
                                'type': 'string'
                            },
                            {
                                'name': 'main_office_id_address',
                                'type': 'string'
                            },
                            {
                                'name': 'main_office_id_phone',
                                'type': 'string'
                            },
                            {
                                'name': 'main_office_id_fax',
                                'type': 'string'
                            },
                            {
                                'name': 'main_office_id_email',
                                'type': 'string'
                            },
                            {
                                'name': 'main_office_id_role',
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
                    displayMsg : 'Displaying Companies{0} - {1} of {2}',
                    emptyMsg : 'No Companies found'
                },
                toolbar : {
                    xtype: 'Toolbar',
                    xns: Roo,
                    items : [
                        {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            text : "Add",
                            cls : 'x-btn-text-icon',
                            icon : Roo.rootURL + 'images/default/dd/drop-add.gif',
                            listeners : {
                                click : function()
                                {
                                    if (!_this.dialog) return;
                                    _this.dialog.show( { id : 0 } , function() {
                                        _this.grid.footer.onClick('first');
                                   }); 
                                }
                            }
                        },
                        {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            text : "Edit",
                            cls : 'x-btn-text-icon',
                            icon : Roo.rootURL + 'images/default/tree/leaf.gif',
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
                                        _this.grid.footer.onClick('first');
                                    }); 
                                    
                                }
                            }
                        },
                        {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            text : "Delete",
                            cls : 'x-btn-text-icon',
                            icon : rootURL + '/Pman/templates/images/trash.gif',
                            listeners : {
                                click : function()
                                {
                                     Pman.genericDelete(_this, 'Companies'); 
                                }
                            }
                        }
                    ]
                },
                colModel : [
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'comptype',
                        header : 'Type',
                        sortable : true,
                        width : 90,
                        renderer : function (v,x ,r) {
                            return Pman.Dialog.Companies.comptypeListToString(r.data.isOwner ? 'OWNER' : v);
                        }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'code',
                        header : 'Ref#',
                        width : 50,
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'name',
                        header : 'Name',
                        width : 200,
                        renderer : function(v,x,r) {
                            return String.format(r.data.isOwner ? '<B>{0}</B>' : '{0}',v);    
                        }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        dataIndex : 'tel',
                        header : 'Tel',
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
                        width : 100,
                        renderer : function (v) {
                                return (v.length && v.indexOf('@') > 0 ) ? 
                                    String.format('<a href="mailto:{0}">{0}</a>',v) : v;
                                    
                            }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Address',
                        width : 200,
                        dataIndex : 'address',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Remarks',
                        width : 200,
                        dataIndex : 'remarks',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Owner',
                        width : 75,
                        dataIndex : 'owner_id',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Address',
                        width : 200,
                        dataIndex : 'address',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Tel',
                        width : 200,
                        dataIndex : 'tel',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Fax',
                        width : 200,
                        dataIndex : 'fax',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Email',
                        width : 200,
                        dataIndex : 'email',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Id',
                        width : 75,
                        dataIndex : 'id',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'IsOwner',
                        width : 75,
                        dataIndex : 'isOwner',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Logo',
                        width : 75,
                        dataIndex : 'logo_id',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Background color',
                        width : 200,
                        dataIndex : 'background_color',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Comptype',
                        width : 200,
                        dataIndex : 'comptype',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Url',
                        width : 200,
                        dataIndex : 'url',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Main office',
                        width : 75,
                        dataIndex : 'main_office_id',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Created by',
                        width : 75,
                        dataIndex : 'created_by',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Created dt',
                        width : 75,
                        dataIndex : 'created_dt',
                        renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y') : ''); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Updated by',
                        width : 75,
                        dataIndex : 'updated_by',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Updated dt',
                        width : 75,
                        dataIndex : 'updated_dt',
                        renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y') : ''); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Passwd',
                        width : 200,
                        dataIndex : 'passwd',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Dispatch port',
                        width : 200,
                        dataIndex : 'dispatch_port',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Province',
                        width : 200,
                        dataIndex : 'province',
                        renderer : function(v) { return String.format('{0}', v); }
                    },
                    {
                        xtype: 'ColumnModel',
                        xns: Roo.grid,
                        header : 'Country',
                        width : 200,
                        dataIndex : 'country',
                        renderer : function(v) { return String.format('{0}', v); }
                    }
                ]
            }
        });
        this.layout = this.panel.layout;

    }
});
