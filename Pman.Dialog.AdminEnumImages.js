//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Pman.Dialog.AdminEnumImages = {

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
                    background : true,
                    fitContainer : true,
                    fitToframe : true,
                    region : 'center',
                    tableName : 'Companies',
                    title : "Outlets",
                    grid : {
                        xtype: 'EditorGrid',
                        xns: Roo.grid,
                        listeners : {
                            render : function() 
                            {
                                _this.grid = this; 
                                _this.dialog = Pman.Dialog.PrettybookedOutlet;
                                if (_this.panel.active) {
                                   this.footer.onClick('first');
                                }
                            },
                            rowdblclick : function (_self, rowIndex, e)
                            {
                                //_this.dialog = Pman.Dialog.PrettybookOutlet;
                                _this.dialog.show( this.getDataSource().getAt(rowIndex).data, function() {
                                    _this.grid.footer.onClick('first');
                                }); 
                            },
                            cellclick : function (_self, rowIndex, columnIndex, e)
                            {
                                var di = this.colModel.getDataIndex(columnIndex);
                                if (di == 'is_active' || di == 'is_allow_booking') {
                            
                                    var rec = _this.grid.ds.getAt(rowIndex);
                                    if(di == 'is_active'){
                                        rec.set('is_active', rec.data.is_active ? 0 : 1);
                                    }else{
                                        rec.set('is_allow_booking', rec.data.is_allow_booking ? 0 : 1);
                                    }
                                    rec.commit();
                                }else{
                                    return;
                                }
                                
                            },
                            afteredit : function (e)
                            {
                               e.record.commit();     
                            }
                        },
                        clicksToEdit : 1,
                        loadMask : true,
                        dataSource : {
                            xtype: 'Store',
                            xns: Roo.data,
                            listeners : {
                                beforeload : function (_self, options)
                                {
                                    options.params = options.params || {};
                                    options.params.comptype='Outlet';
                                    options.params._search = _this.searchBox.getValue();
                                    for(var k in _this.pagetype) {
                                        if (!_this.pagetype[k].pressed) {
                                            continue;
                                        }
                                        switch(k) {
                                            case 'new':
                                                options.params.is_active = 0;
                                                break;
                                            case 'all':
                                                options.params.is_active = 1 ;
                                                break;
                                        }
                                    
                                    }
                                },
                                update : function (_self, record, operation)
                                {
                                    if (operation != Roo.data.Record.COMMIT) {
                                        return;
                                    }
                                    // got commit..
                                    if(record.data.id > 0){
                                        new Pman.Request({
                                            url : baseURL + '/Roo/Companies.php',
                                            method : 'POST',
                                            params : {
                                                id : record.data.id,
                                                is_active : record.data.is_active,
                                                owner_id_active_by : record.data.is_active ? 2 : 0,
                                                is_allow_booking : record.data.is_allow_booking
                                            }, 
                                            success : function(res) {
                                                //Roo.log(data);
                                                // update the ID if it's not set..
                                                if (record.data.id * 1 < 1) {
                                                    record.set('id', res.data.id);
                                                }
                                                // no need to reload this..
                                                //_this.grid.getDataSource().load({});
                                            }
                                        });
                                    }
                                    
                                }
                            },
                            remoteSort : true,
                            sortInfo : { field : 'created_dt', direction: 'DESC' },
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
                                fields : [
                                    {
                                        'name': 'id',
                                        'type': 'int'
                                    },
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
                                        'name': 'description',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'district_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'rating_average',
                                        'type': 'float'
                                    },
                                    {
                                        'name': 'rating_count',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'reviews_count',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'tel_other',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'is_active',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'is_allow_booking',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'price_range_min',
                                        'type': 'float'
                                    },
                                    {
                                        'name': 'price_range_max',
                                        'type': 'float'
                                    },
                                    {
                                        'name': 'favoured_value',
                                        'type': 'int'
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
                                    },
                                    {
                                        'name': 'district_id_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'district_id_name',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'district_id_parent_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'district_id_priority',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'district_id_created_dt',
                                        'type': 'date'
                                    },
                                    {
                                        'name': 'district_id_updated_dt',
                                        'type': 'date'
                                    },
                                    {
                                        'name': 'district_id_is_active',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'company_id_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'company_id_name',
                                        'type': 'string'
                                    },
                                    {
                                        'name': 'company_id_parent_id',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'company_id_priority',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'company_id_created_dt',
                                        'type': 'date'
                                    },
                                    {
                                        'name': 'company_id_updated_dt',
                                        'type': 'date'
                                    },
                                    {
                                        'name': 'company_id_is_active',
                                        'type': 'int'
                                    },
                                    {
                                        'name': 'company_id_top_id',
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
                            displayMsg : "Displaying Companies{0} - {1} of {2}",
                            emptyMsg : "No Companies found"
                        },
                        toolbar : {
                            xtype: 'Toolbar',
                            xns: Roo,
                            items : [
                                {
                                    xtype: 'TextField',
                                    xns: Roo.form,
                                    listeners : {
                                        render : function (_self)
                                        {
                                        _this.searchBox=  _self;
                                        },
                                        specialkey : function (_self, e)
                                        {
                                        _this.grid.footer.onClick('first');
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
                                    xtype: 'Separator',
                                    xns: Roo.Toolbar
                                },
                                {
                                    xtype: 'Button',
                                    xns: Roo.Toolbar,
                                    listeners : {
                                        render : function (_self)
                                        {
                                            _this.pagetype = _this.pagetype || {};
                                            _this.pagetype['new'] = _self;
                                        },
                                        click : function (_self, e)
                                        {
                                          _this.grid.footer.onClick('first');
                                        }
                                    },
                                    enableToggle : true,
                                    pressed : true,
                                    text : "New Outlets",
                                    toggleGroup : 'pagetype'
                                },
                                {
                                    xtype: 'Button',
                                    xns: Roo.Toolbar,
                                    listeners : {
                                        render : function (_self)
                                        {
                                            _this.pagetype = _this.pagetype || {};
                                            _this.pagetype['all'] = _self;
                                        },
                                        click : function (_self, e)
                                        {
                                          _this.grid.footer.onClick('first');
                                        }
                                    },
                                    enableToggle : true,
                                    pressed : false,
                                    text : "All Outlets",
                                    toggleGroup : 'pagetype'
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
                                        
                                            var sel = _this.grid.selModel.getSelectedCell();
                                            if (!sel) { 
                                                Roo.MessageBox.alert("Error", "Select an outlet");
                                                return;
                                            }
                                            var rec = _this.grid.ds.getAt(sel[0]);
                                            Pman.Dialog.PersonEdit.show( { id : rec.data.owner_id } , function() {
                                                _this.grid.footer.onClick('reload');
                                            }); 
                                         
                                           
                                        }
                                    },
                                    text : "Edit Owner password"
                                },
                                {
                                    xtype: 'Button',
                                    xns: Roo.Toolbar,
                                    listeners : {
                                        click : function()
                                        {
                                            if (!_this.dialog) return;
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
                                            //Pman.genericDelete(_this, 'Companies'); 
                                            
                                            var selection = _this.grid.getSelectionModel().getSelectedCell();
                                            var sn = _this.grid.ds.getAt(selection[0]);
                                            if (!sn || isNaN(sn.id *1)) {
                                                Roo.MessageBox.alert("Error", "Select a row"); 
                                                return;
                                            }
                                            Roo.MessageBox.confirm("Confirm", "Are sure you want to delete that?", function (v){
                                                if (v != 'yes') {
                                                    return;
                                                }
                                                Roo.log(sn);
                                                new Pman.Request({
                                                            url : baseURL + '/Roo/Companies.php',
                                                            method: 'POST',
                                                            params : {
                                                                _delete : sn.data.id
                                                            },
                                                            success : function()
                                                            {
                                                                Roo.log('Got Success!!');
                                                                _this.grid.footer.onClick('first');
                                                            }
                                                        });
                                                /*new Pman.Request({
                                                    url : baseURL + '/Roo/Person.php',
                                                    method: 'POST',
                                                    params : {
                                                        _delete : sn.data.owner_id
                                                    },
                                                    success : function()
                                                    {
                                                        Roo.log('Got Success!!');
                                                        
                                                        
                                                    }
                                                });
                                                */
                                            });
                                            
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
                                header : 'Id',
                                width : 75,
                                dataIndex : 'id',
                                renderer : function(v) { return String.format('{0}', v); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                header : 'Name',
                                width : 200,
                                dataIndex : 'name',
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
                                dataIndex : 'tel',
                                header : 'Tel',
                                width : 100,
                                renderer : function(v) { return String.format('{0}', v); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'email',
                                header : 'Email',
                                width : 100,
                                renderer : function(v) { return String.format('{0}', v); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'created_dt',
                                header : 'Created dt',
                                sortable : true,
                                width : 75,
                                renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y') : ''); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'updated_dt',
                                header : 'Updated dt',
                                sortable : true,
                                width : 75,
                                renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y') : ''); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'district_id_name',
                                header : 'District',
                                width : 75,
                                renderer : function(v) { return String.format('{0}', v); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'owner_id_is_pending',
                                header : 'Verified',
                                width : 75,
                                renderer : function(v) {  
                                     if (v) {
                                        return '<span style="color:red">PENDING</span>';
                                    }
                                    return 'VERIFIED';
                                 }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'is_active',
                                header : 'Is active',
                                width : 75,
                                renderer : function(v) {  
                                    var state = v * 1 > 0 ?  '-checked' : '';
                                
                                    return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                                                
                                 }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                header : 'Price range min',
                                width : 75,
                                dataIndex : 'price_range_min',
                                renderer : function(v) { return String.format('{0}', v); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                header : 'Price range max',
                                width : 75,
                                dataIndex : 'price_range_max',
                                renderer : function(v) { return String.format('{0}', v); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                header : 'Favoured value',
                                width : 75,
                                dataIndex : 'favoured_value',
                                renderer : function(v) { return String.format('{0}', v); }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'owner_id_active_by',
                                header : 'Active By',
                                width : 75,
                                renderer : function(v)
                                {
                                    switch(v){
                                        case 1:
                                            v = 'user';
                                            break;
                                        case 2:
                                            v = 'admin';
                                            break;
                                        default:
                                            v = '';
                                            break;
                                    }
                                    return String.format('{0}', v);
                                }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'is_allow_booking',
                                header : 'Allow Booking?',
                                width : 75,
                                renderer : function(v) {  
                                    var state = v * 1 > 0 ?  '-checked' : '';
                                
                                    return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                                                
                                 }
                            },
                            {
                                xtype: 'ColumnModel',
                                xns: Roo.grid,
                                dataIndex : 'total_value',
                                header : 'Total $ value',
                                width : 75,
                                renderer : function(v) { return String.format('{0}', v); }
                            }
                        ]
                    }
                }
            ],
            center : {
                xtype: 'LayoutRegion',
                xns: Roo
            }
        });
    }
};
