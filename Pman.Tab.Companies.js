//<script type="text/javascript">
 
 
Pman.on('beforeload', function()
{
    //                case 1 : Pman.Tab.Projects.add(this.mainLayout, 'west'); break;
    
  
    
    Pman.register({
        modKey : '030-pman-tab-companies',
        module : Pman.Tab.Companies,
        region : 'center',
        parent : Pman.Tab.Admin,
        name : "Contact Companies Manager",
        permname : 'Admin.Companies'
    });

        
});

Pman.Tab.Companies = new Roo.util.Observable({
    events : {
        'beforerender' : true // trigger so we can add modules later..
    },
    colExtra : [], // extra items on columns
    
    grid : false,
    panel : false,
    add : function(parentLayout, region) {
        
        var _this = this;
        if (this.tab) {
            parentLayout.getRegion(region).showPanel(this.panel);
            return;
        }
     
        
        this.innerLayout = new Ext.BorderLayout(
            parentLayout.getEl().createChild({tag:'div'}),
            {
               
                center: {
                    autoScroll:true,
                    hideTabs: true
                },
                south : {
                    split:true,
                    hidden : !Pman.hasPerm('Core.Office','S'),
                    title: "Offices",
                    autoScroll:true,
                    hideTabs: true,
                    height: 200
                }
            }
        );



        this.tab = parentLayout.add(region,  new Ext.NestedLayoutPanel(
            this.innerLayout, {title: "Companies", background: true, controller : this}));

        this.tab.on('activate', function() {
            _this.delayedCreate();
            _this.paging.onClick('refresh');
        });
    },
    delayedCreate : function () 
    {
        var _this = this;
        if (this.grid) {
            return;
           }
        this.innerLayout.beginUpdate();
       

        var frm = this.innerLayout.getEl().createChild({tag:'div'});
        //this.grid = new Ext.grid.EditorGrid(frm,  {
        this.grid = new Ext.grid.Grid(frm,  {
                id: 'grid-companies',
                ds:   new Ext.data.Store({
                    // load using HTTP
                    proxy: new Ext.data.HttpProxy({
                        url: baseURL + '/Roo/Companies.html',
                        method: 'GET'
                    }),
                    reader: Pman.Readers.Companies,
                       
                    listeners : {
                        load : function()
                        {
                            Pman.Tab.Office.paging.onClick('refresh');
                        },
                        loadexception : Pman.loadException
                    },
                    remoteSort: true
                }),
                cm:  new Ext.grid.ColumnModel(
                    [
                    {
                        
                        header : "Type",
                        dataIndex : 'comptype',
                        sortable : true,
                        width : 90,
                        renderer : function (v,x ,r) {
                            return Pman.Dialog.Companies.comptypeListToString(r.data.isOwner ? 'OWNER' : v);
                        }
                    },
                    
                    
                    {
                        
                        header : "Ref#",
                        dataIndex : 'code',
                        sortable : true,
                        width : 50
                    },{
                        id : 'companies-name',
                        header : "Name",
                        dataIndex : 'name',
                        sortable : true,
                        width : 200,
                        renderer : function(v,x,r) {
                            return String.format(r.data.isOwner ? '<B>{0}</B>' : '{0}',v);    
                        }
                    },{
                        header : "Tel",
                        dataIndex : 'tel',
                        sortable : true,
                        width : 100
                    },{
                        header : "Fax",
                        dataIndex : 'fax',
                        sortable : true,
                        width : 100
                    },{
                        header : "Email",
                        dataIndex : 'email',
                        sortable : true,
                        width : 100,
                        renderer : function (v) {
                            return (v.length && v.indexOf('@') > 0 ) ? 
                                String.format('<a href="mailto:{0}">{0}</a>',v) : v;
                                
                        }
                    },{
                        id : 'companies-address',
                        header : "Address",
                        dataIndex : 'address',
                        sortable : true,
                        width : 200
                    },{
                        id : 'companies-remarks',
                        header : "Remarks",
                        dataIndex : 'remarks',
                        sortable : true,
                        width : 200
                    }
                ]),
                autoExpandColumn: 'companies-address' , // fixme!!!!
                clicksToEdit : 1,
                
                loadMask: true,

                
                listeners : {
                   
                    cellclick : function(g, ri, ci ,e) {
                       
                        Pman.Tab.Office.paging.onClick('refresh');
                          
                    },
                    rowdblclick : function(g, ri, e) {
                        var s = g.getDataSource().getAt(ri).data;
                      
                        _dialog.show(s, refreshPager); 
                    }
                }
                 
        });
        this.panel  = this.innerLayout.add('center',  new Ext.GridPanel(this.grid ,
            { fitToframe: true,fitContainer: true, controller : this })
        );
        this.grid.render();
        var gridFoot = this.grid.getView().getFooterPanel(true);
        this.paging = new Ext.PagingToolbar(gridFoot, this.grid.getDataSource(), {
            pageSize: 25,
            displayInfo: true,
            displayMsg: "Displaying Companies {0} - {1} of {2}",
            emptyMsg: "No Companies found"
        });
        var grid = this.grid;
 
        var gridHead = this.grid.getView().getHeaderPanel(true);
        var tb = new Ext.Toolbar(gridHead);
    
        var refreshPager = function() {
            _this.paging.onClick('refresh');
        }
        var _dialog = Pman.Dialog.Companies;
        tb.add(
            {
                text: "Add",
                cls: 'x-btn-text-icon',
                icon: Ext.rootURL + 'images/default/dd/drop-add.gif',
                hidden : !Pman.hasPerm('Core.Companies', 'A'),
                handler : function(){
                    _dialog.show( { id : 0 }, refreshPager ); 
                }
            }, 
            {
                text: "Edit",
                cls: 'x-btn-text-icon',
                icon: Ext.rootURL + 'images/default/tree/leaf.gif',
                hidden : !Pman.hasPerm('Core.Companies', 'E'),
                handler : function(){
                    var s = grid.getSelectionModel().getSelections();
                    if (!s.length || (s.length > 1))  {
                        Ext.MessageBox.alert("Error", s.length ? "Select only one Row" : "Select a Row");
                        return;
                    }
                    
                    _dialog.show(s[0].data, refreshPager); 
                }
            },  
            {
                text: "Delete",
                cls: 'x-btn-text-icon',
                hidden : !Pman.hasPerm('Core.Companies', 'D'),
                icon: rootURL + '/Pman/templates/images/trash.gif',
               
                handler : function(){
                    Pman.genericDelete(_this, 'Companies'); 
                }
            }
        );
    
        Pman.Tab.Office.add(this.innerLayout, 'south');
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

    },
    getSelectedId : function()
    {
        var s = this.grid.getSelectionModel().getSelections();
        if (s.length != 1)  {
            return 0;
        }
        return s[0].data.id;
        
    }
});

 
