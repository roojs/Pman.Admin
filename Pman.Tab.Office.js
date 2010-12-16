 //<script type="text/javascript">

 
Pman.Tab.Office = {
    grid : false,
    panel : false,
    add : function(parentLayout, region) {
        
        if (!Pman.hasPerm('Core.Office')) {
            return;
        }
        

        if (this.panel) {
            parentLayout.getRegion(region).showPanel(this.panel);
            return;
        }
     
        
        this.innerLayout = new Ext.BorderLayout(
            parentLayout.getEl().createChild({tag:'div'}),
            {
               
                center: {
                    autoScroll:true,
                    hideTabs: true
                }
            }
        );

 
        this.tab = parentLayout.add(region,  new Ext.NestedLayoutPanel(
            this.innerLayout, {title: "Offices / Departments / Sub-Companies" }));

       
        this.innerLayout.beginUpdate();
        var _dialog = Pman.Dialog.Office;
        var refreshPager = function() {
            _this.paging.onClick('refresh');
        }
      
        //this.grid = new Ext.grid.EditorGrid(frm,  {
        this.grid = new Ext.grid.Grid(this.innerLayout.getEl().createChild({tag:'div'}),  {
                id: 'grid-Office',
                ds:   new Ext.data.Store({
                    // load using HTTP
                    proxy: new Ext.data.HttpProxy({
                        url: baseURL + '/Roo/Office.html',
                        method: 'GET'
                    }),
                    reader: Pman.Readers.Office,
                    remoteSort: true,
                    listeners : {
                        beforeload: function(t, o) {
                            //console.log(o.params);
                            o.params.company_id = Pman.Tab.Companies.getSelectedId();
                            if (!o.params.company_id) {
                                return false;
                               }
                            
                        },
                     
                        loadexception : Pman.loadException
                    
                    }
                }),
                cm: new Ext.grid.ColumnModel(
                    [ {
                        'id' : 'Office-name',
                        header : "Name / Department / Sub Comp.",
                        'dataIndex' : 'name',
                        'sortable' : true,
                        'width' : 200
                    },{
                        'id' : 'Office-phone',
                        header : "Phone",
                        'dataIndex' : 'phone',
                        'sortable' : true,
                        'width' : 100
                    },{
                        'id' : 'Office-fax',
                        header : "Fax",
                        'dataIndex' : 'fax',
                        'sortable' : true,
                        'width' : 100
                    },{
                        'id' : 'Office-email',
                        header : "Email",
                        'dataIndex' : 'email',
                        'sortable' : true,
                        'width' : 150,
                        renderer : function (v) {
                            return (v.length && v.indexOf('@') > 0 ) ? 
                                String.format('<a href="mailto:{0}">{0}</a>',v) : v;
                                
                        }
                    },{
                        'id' : 'Office-address',
                        header : "Address",
                        'dataIndex' : 'address',
                        'sortable' : true,
                        'width' : 300
                    }]
                ),
                autoExpandColumn: 'Office-address' , // fixme!!!!
                clicksToEdit : 1,
                
                loadMask: true,

                listeners : {
                    rowdblclick : function(g, ri, e) {
                        var s = g.getDataSource().getAt(ri).data
                        s.company_name = Pman.Tab.Companies.grid.getSelectionModel().getSelected().data.name;
                        _dialog.show(s, refreshPager); 
                    }
                }
                 
        });
        this.panel  = this.innerLayout.add('center',  new Ext.GridPanel(this.grid ,
            { fitToframe: true,fitContainer: true })
        );
        this.grid.render();
        var gridFoot = this.grid.getView().getFooterPanel(true);
        this.paging = new Ext.PagingToolbar(gridFoot, this.grid.getDataSource(), {
            pageSize: 25,
            displayInfo: true,
            displayMsg: "Displaying Offices {0} - {1} of {2}",
            emptyMsg: "No Offices found"
        });
        var grid = this.grid;
 
        var gridHead = this.grid.getView().getHeaderPanel(true);
        var tb = new Ext.Toolbar(gridHead);
        var _this = Pman.Tab.Office;
         
       
        
        tb.add(
            {
                text: "Add",
                cls: 'x-btn-text-icon',
                icon: Ext.rootURL + 'images/default/dd/drop-add.gif',
                hidden : !Pman.hasPerm('Core.Offices', 'A'),
                handler : function(){
                    if (!Pman.Tab.Companies.grid.getSelectionModel().getSelections().length) {
                        Ext.MessageBox.alert("Select a company to add a office to");
                        return;
                    }
                    var cdata = Pman.Tab.Companies.grid.getSelectionModel().getSelected().data;
                    _dialog.show( { 
                        id : 0 ,
                        company_name : cdata.name,
                        company_id : cdata.id,
                        address : cdata.address,
                        phone : cdata.tel,
                        fax : cdata.fax,
                        email  : cdata.email
                    }, refreshPager );  
                }
            }, 
            {
                text: "Edit",
                cls: 'x-btn-text-icon',
                icon: Ext.rootURL + 'images/default/tree/leaf.gif',
               hidden : !Pman.hasPerm('Core.Offices', 'E'),
                handler : function(){
                    var s = grid.getSelectionModel().getSelections();
                    if (!s.length || (s.length > 1))  {
                        Ext.MessageBox.alert("Error", s.length ? "Select only one Row" : "Select a Row");
                        return;
                    }
                    // we should have company_id - just need name..
                    s[0].data.company_name = Pman.Tab.Companies.grid.getSelectionModel().getSelected().data.name;
                    _dialog.show(s[0].data, refreshPager); 
                    
                }
            },  
            {
                text: "Delete",
                cls: 'x-btn-text-icon',
                icon: rootURL + '/Pman/templates/images/trash.gif',
                hidden : !Pman.hasPerm('Core.Offices', 'D'),
                handler : function(){
                    Pman.genericDelete(_this, 'Office'); 
                }
            } 
        );
        this.tab.on('activate', function() {
           //_this.paging.onClick('refresh');
        });
            
        //this.toolbar = tb;
        // add stuff to toolbar?
        this.innerLayout.endUpdate();
        
        
        
    },
    show: function (parentLayout, region)
    {
        this.add(parentLayout, region);
        this.grid.getDataSource().load({
            params: {
                start:0, 
                limit:25
            }
        });

    }
};
