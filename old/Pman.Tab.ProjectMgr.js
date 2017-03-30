//<script type="text/javascript">
  
// tab on left...  
Pman.on('beforeload', function()
{
    //                case 1 : Pman.Tab.Projects.add(this.mainLayout, 'west'); break;
    
    return;
    if (!Pman.hasPerm('Core.Projects_All', 'E')) {
        return;
    }
    Pman.register({
        modKey : '010-pman-tab-projectmgr',
        module : Pman.Tab.ProjectsMgr,
        region : 'center',
        parent : Pman.Tab.Admin,
        name : "Project Manager"
    });
});
 
   

Pman.Tab.ProjectsMgr = {
    grid : false,
    panel : false,
    disabled:  false,
    filter : 'P,N,U',
    searchBox : false,
    add : function(parentLayout, region) {
        if (this.disabled) {
            return;
        }
        // add to the menu!!
        Pman.subMenuItems.push({
                seqid : 401,
                text: "Add Project",
                cls: 'x-btn-text-icon',
                icon: Ext.rootURL + 'images/default/dd/drop-add.gif',
                
                handler : function() {
                    Pman.Dialog.CoreProject.show( 
                        { 
                            id : 0
                        },
                        function(data) {
                            Pman.refreshActivePanel();
                    }); 
                }
        });
        Pman.subMenuItems.push( new Roo.menu.Separator({
            seqid : 402
        }));
        
        
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

        var _this = this;

        this.tab = parentLayout.add(region,  new Ext.NestedLayoutPanel(
            this.innerLayout, {title: "Projects", background: true}));
            
        this.tab.on('activate', function() {
           // console.log('activate');
            _this.delayedCreate();
            _this.paging.onClick('refresh');
        });
    },
    delayedCreate :  function() 
    {
        if (this.grid) {
            return;
        }
        var _this = this;
        this.innerLayout.beginUpdate();
        var refreshPager = function() {
            _this.paging.onClick('refresh');
        }

        var frm = this.innerLayout.getEl().createChild({tag:'div'});
        //this.grid = new Ext.grid.EditorGrid(frm,  {
        this.grid = new Ext.grid.Grid(frm,  {
                id: 'grid-projectsmgr',
                ds:   new Ext.data.Store({
                    // load using HTTP
                    proxy: new Ext.data.HttpProxy({
                        url: baseURL + '/Roo/core_project.php',
                        method: 'GET'
                    }),
                    remoteSort: true,
                    reader: Pman.Readers.Projects,
                     
                    listeners : {
                        
                        beforeload: function(t, o) {
                            //console.log(o.params);
                            // teams!?!
                            o.params = o.params ? o.params : {};
                            o.params['query[project_search]'] = _this.searchBox.getValue();
                            o.params['query[project_filter]'] = _this.filter;
                            
                            
                        },
                        loadexception : Pman.loadException
                    
                    },
                    sortInfo: {
                        field: 'code', direction: 'DESC'
                    }
                }),
                cm: new Ext.grid.ColumnModel(
                    [
                    {
                    //    id : 'Projects-type',
                        header : "Type",
                        dataIndex : 'type',
                        sortable : true,
                        width : 130,
                        renderer : function(v)
                        {
                            return _this.typeToString(v)
                        }
                    },
                    
                    {
                       // id : 'Projects-code',
                        header : "Code",
                        dataIndex : 'code',
                        sortable : true,
                        width : 70
                    }, 
                    {
                     //   id : 'Projects-name',
                        header : "Project Name",
                        dataIndex : 'name',
                        sortable : true,
                        width : 300
                    },
                    {
                     //   id : 'Projects-name',
                        header : "Client",
                        dataIndex : 'client_id_name',
                        sortable : true,
                        width : 150
                    },
                    {
                     //   id : 'Projects-name',
                        header : "Team",
                        dataIndex : 'team_id_name',
                        sortable : true,
                        width : 100
                    },
                    
                    
                    {
                        id : 'projects-remarks',
                        header : "Remarks",
                        dataIndex : 'remarks',
                        sortable : true,
                        width : 300
                    }  ]
                ),
                autoExpandColumn: 'projects-remarks' , // fixme!!!!
                clicksToEdit : 1,
                
                loadMask: true,

                listeners: {
                    
                    rowdblclick : function(g, ri, e) {
                        var s = g.getDataSource().getAt(ri).data;
                      
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
            displayMsg: "",
            emptyMsg: ""
        });
        var grid = this.grid;
 
        var gridHead = this.grid.getView().getHeaderPanel(true);
        var tb = new Ext.Toolbar(gridHead);
        
       
        this.searchBox = new Ext.form.TextField({
            name: 'search',
            width:135,
            listeners : {
                specialkey : function(f,e)
                {
                    
                    if (e.getKey() == 13) {
                        
                        refreshPager();
                    } 
                   
                
                }
            }
         
        });
    
       
        var _dialog = Pman.Dialog.CoreProject;
        tb.add(
            {
                text: "Add",
                cls: 'x-btn-text-icon',
                icon: Ext.rootURL + 'images/default/dd/drop-add.gif',
                handler : function(){
                    _dialog.show( { id: 0 }, refreshPager); 
                }
            }, 
            {
                text: "Edit",
                cls: 'x-btn-text-icon',
                icon: Ext.rootURL + 'images/default/tree/leaf.gif',
                   
                handler : function(){
                    var s = grid.getSelectionModel().getSelections();
                    if (!s.length || (s.length > 1))  {
                        Ext.MessageBox.alert("Error", s.length ? "Select only one Row" : "Select a Row");
                        return;
                    }
                    _dialog.show(s[0].data, refreshPager); 
                }
            }, '-',
            'Search: ',
            this.searchBox,
            {
                
               
                icon: rootURL + '/Pman/templates/images/search.gif', // icons can also be specified inline
                cls: 'x-btn-icon',
                qtip: "Search",
                handler : function () {
                    //_this.grid.getSelectionModel().clearSelections();
                    refreshPager();
                }
            },   
             {
                
               
                icon: rootURL + '/Pman/templates/images/edit-clear.gif', // icons can also be specified inline
                cls: 'x-btn-icon',
                qtip: "Reset Search",
                handler : function () {
                    _this.searchBox.setValue('');
                    //_this.grid.getSelectionModel().clearSelections();
                    refreshPager();
                }
            },
            '-',
            'Show : ',
            {
                text: "All",
                toggleGroup : 'pgrp',
                pressed : true,
                enableToggle: true,
                toggleHandler : function(b, st) { if (st) { _this.filter = 'P,N,U'; } refreshPager();}
            },
            {
                text: "Projects",
                toggleGroup : 'pgrp',
                pressed : false,
                enableToggle: true,
                toggleHandler : function(b, st) { if (st) { _this.filter = 'P,U'; } refreshPager();}
            },
            {
                text: "Non-Projects",
                toggleGroup : 'pgrp',
                pressed : false,
                enableToggle: true,
                toggleHandler : function(b, st) { if (st) { _this.filter = 'N'; } refreshPager();}
            },
            {
                text: "Closed",
                toggleGroup : 'pgrp',
                pressed : false,
                enableToggle: true,
                toggleHandler : function(b, st) { if (st) { _this.filter = 'X,C'; } refreshPager();}
            }
             
        );
        
            
        //this.toolbar = tb;
        // add stuff to toolbar?
        this.innerLayout.endUpdate();
        
         // _this.paging.onClick('refresh');
        
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
    
    getTypes: function()
    {
        //return Pman.Dialog.Projects.getTypes();
        // we need to decide where this list goes.. 
        return [
            [  'U' , "Project (Unconfirmed)" ],
            [  'P' , "Project" ],
            [  'C' , "Project (Closed)" ],
            [  'N' , "Non-Project" ],
            [  'X' , "Non-Project (Closed)" ]
        
        ];
    },
    typeToString : function(v)
    {
        var ar = this.getTypes();
        var ret = '';
        Ext.each(ar, function(a) {
            if (a[0] == v) {
                ret = a[1];
                return false;
            }
        });
        return ret;
    }
    
    
    
};   
    
