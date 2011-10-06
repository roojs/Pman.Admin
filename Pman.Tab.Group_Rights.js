//<script type="text/javascript">

/**
 * 
 * needs a translation list..
 * 
 * 
 */
 Pman.on('beforeload', function()
{ 
    
    
  Pman.register({
        modKey : '002-pman-tab-groups-rights',
        module : Pman.Tab.Group_Rights,
        region : 'center',
        parent : Pman.Tab.GroupMgr,
        name : "Permission Groups"
    });
});
 
 

Pman.ColModels.Group_RightsRenderer =  function(v, c, r, ri, ci, st) {
        // work out what the column is..
        var h = Pman.Tab.Group_Rights.grid.getColumnModel().getColumnId(ci).toUpperCase();
        // ADESPIM
        var fm = r.json.FullMask;
        state = '';
        if (h == 'AA') { // All....
            state = v== fm ? '-checked' : '';
        } else if (v.indexOf(h.substring(3)) > -1) {
            state = '-checked';
        }
        if (fm.indexOf(h.substring(3)) < 0) { // dont show checkboxes for no perms.
            return '';
        }
        
        return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
        
        
};

 
Pman.Tab.Group_Rights = {
    rightNames : { }, // filled in by modules.
       
    
    grid : false,
    panel : false,
    add : function(parentLayout, region) {
        

        if (this.panel) {
            parentLayout.getRegion(region).showPanel(this.panel);
            return;
        }
        var _this= this;
        /*
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
            this.innerLayout, {title: "Rights", id: 'Group_Rights'}));
        */
       
        //this.innerLayout.beginUpdate();
       

        var frm = parentLayout.getRegion(region).getEl().createChild({tag:'div', id: 'grid-group_rights'});
        //this.grid = new Ext.grid.EditorGrid(frm,  {
        this.grid = new Ext.grid.Grid(frm,  {
                
                ds:   new Ext.data.Store({
                    // load using HTTP
                    proxy: new Ext.data.HttpProxy({
                        url: baseURL + '/Admin/GroupRights.php',
                        method: 'GET'
                    }),
                    reader: Pman.Readers.Group_Rights,
                    remoteSort: false,
                    listeners : {
                        beforeload : function(t,o)
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
                        loadexception : Pman.loadException
                    
                    }
                }), 
                selModel: new Ext.grid.CellSelectionModel(),
                cm: new Ext.grid.ColumnModel([
                    {
                        'id' : 'aa',
                        header : "[All]",
                        dataIndex : 'AccessMask',
                        'sortable' : false,
                        'width' : 50,
                        renderer : Pman.ColModels.Group_RightsRenderer
                    },
                    
                    {
                        'id' : 'group-rights-module',
                        header : "Module",
                        dataIndex : 'rightname',
                        'sortable' : false,
                        'width' : 50,
                        renderer : function(v,x,r)
                        {
                            return String.format('<span qtip="{1}">{0}</span>',
                                v.split('.').shift(), v);
                        }
                    },
                    
                    {
                        'id' : 'group_rights-rightname',
                        header : "Permission",
                        'dataIndex' : 'rightname',
                        'sortable' : false,
                        'width' : 300,
                        renderer : function (v,x,r) {
                            
                            if (r.json.descript && r.json.descript.length) {
                                return String.format('{0}',r.json.descript);
                            }
                            
                            
                            // this needs to be generated by the modules..
                            /*
                            if (typeof(Pman.rightNames[v]) == 'string' && Pman.rightNames[v].length) {
                                return String.format('{0}',Pman.rightNames[v]);
                            }
                            */
                            return '???' + v;
                             
                            
                            
                        }
                    },
                    {
                        'id' : 'am-a',
                        header : "Add",
                        'dataIndex' : 'AccessMask',
                        'width' : 50,
                        'sortable' : false,
                        renderer : Pman.ColModels.Group_RightsRenderer
                    },
                    {
                        'id' : 'am-e',
                        header : "Edit",
                        'dataIndex' : 'AccessMask',
                        'width' : 50,
                        'sortable' : false,
                        renderer : Pman.ColModels.Group_RightsRenderer
                    },
                    {
                        'id' : 'am-d',
                        header : "Delete",
                        'dataIndex' : 'AccessMask',
                        'width' : 50,
                        'sortable' : false,
                        renderer : Pman.ColModels.Group_RightsRenderer
                    },
                    {
                        'id' : 'am-s', // S
                        header : "List/View",
                        'dataIndex' : 'AccessMask',
                        'width' : 90,
                        'sortable' : false,
                        renderer : Pman.ColModels.Group_RightsRenderer
                    }, // P= print / I= import (not used)
                    
                     {
                        'id' : 'am-p',
                        header : "Print / Export",
                        'dataIndex' : 'AccessMask',
                        'width' : 100,
                        'sortable' : false,
                        renderer : Pman.ColModels.Group_RightsRenderer
                    }, /*
                    {
                        'id' : 'AM-I',
                        header : "Import",
                        'dataIndex' : 'AccessMask',
                        'width' : 50,
                        'sortable' : false,
                        renderer : Pman.ColModels.Group_RightsRenderer
                    },
                    /*
                    {
                        'id' : 'AM-M',
                        'header' : 'Admin mode',
                        'dataIndex' : 'AccessMask',
                        'width' : 100,
                        'sortable' : false,
                        renderer : Pman.ColModels.Group_RightsRenderer
                    },
                    */
                    {
                        'id': 'group_rights-remarks',
                        header : '',
                        dataIndex : 'Remarks',
                        'sortable' : false,
                        'width' : 50 
                    }
                ]),
                autoExpandColumn: 'group_rights-remarks' , // fixme!!!!
                clicksToEdit : 1,
                
                loadMask: true,
                trackMouseOver : false,
                listeners : {
                    cellclick: function (g, ri, ci, e)
                    {
                        var h = g.getColumnModel().getColumnId(ci);
                        //console.log(h);
                        var fm = g.getDataSource().getAt(ri).json.FullMask;
                        
                        if (h.substring(0,2) == 'aa') {
                            var old = g.getDataSource().getAt(ri).data.AccessMask;
                            
                            g.getDataSource().getAt(ri).set('AccessMask',
                                old == fm ? "" : fm );
                            return;
                        }
                        
                        if (h.substring(0,2) != 'am') {
                            return;
                        }
                        var c = h.substring(3).toUpperCase();
                        
                        if (fm.indexOf(c) < 0) {
                            return; // skip no perms boxes
                        }
                        // ADESPIM
                        //var def = 'ADESPIM';
                        function toKV(str) {
                           
                            var ret = { };
                            for(var i = 0;i< fm.length; i++) {
                                var cc = fm.substring(i,i+1);
                                ret[cc] = str.indexOf(cc) > -1;
                            }
                            return ret;
                        }
                        function toStr(obj) {
                           
                            var ret = '';
                            for(var i = 0;i< fm.length; i++) {
                                var cc = fm.substring(i,i+1);
                                if (obj[cc]) {
                                    ret += cc;
                                }
                            }
                            //console.log(ret);
                            return ret;    
                        }
                        
                        
                        // get existing value..
                        var conf = toKV(g.getDataSource().getAt(ri).data.AccessMask);
                        conf[c] = !conf[c];
                        g.getDataSource().getAt(ri).set('AccessMask',toStr(conf));
                    }
                    
                }
                 
        });
        this.grid.getSelectionModel().lock();
        this.panel  = parentLayout.add(region,  new Ext.GridPanel(this.grid ,
            { fitToframe: true,fitContainer: true, title: "Rights", id: 'group_rights', controller : this })
        );
        this.grid.render();
        /*
        var gridFoot = this.grid.getView().getFooterPanel(true);
        
        this.paging = new Ext.PagingToolbar(gridFoot, this.grid.getDataSource(), {
            pageSize: 25,
            displayInfo: true,
            displayMsg: "", 
            emptyMsg: ""
        });
        */
        var grid = this.grid;
 
        var gridHead = this.grid.getView().getHeaderPanel(true);
        var tb = new Ext.Toolbar(gridHead);
        
      
        
        tb.add(
            {
                text: "Save",
                cls: 'x-btn-text-icon',
                icon: rootURL + '/Pman/templates/images/save.gif',
                hidden : !Pman.hasPerm('Core.Groups', 'E'),
                handler : function(){
                    var data = {}; 
                    grid.getDataSource().each(function(r) {
                            if (!r.dirty) {
                                return;
                            }
                            data[r.data.id > -1 ? 'dataUpdate['+r.data.id+']' : 'dataAdd['+r.data.rightname+']'] = r.data.AccessMask;
                            
                    });
                    
                    data.group_id = grid.getDataSource().lastOptions.params.group_id;
                    Ext.Ajax.request({
                        url: baseURL + '/Admin/GroupRights.php',
                        params : data,
                        method: 'POST',
                        success : function() {
                            _this.refresh();
                            //Pman.Tab.Group_Rights.paging.onClick('first');
                        },
                        failure: function() {
                            Ext.MessageBox.alert("There was a problem saving the data");
                        }
                    });
                }
            }, 
            '-',
            {
                text: "Reload",
                 cls: 'x-btn-text-icon',
                icon: rootURL + '/Pman/templates/images/refresh.gif',
                handler : function(){
                    _this.refresh();
                }
            } 
        );
        this.panel.on('activate', function() {
            _this.refresh();
        });
            
        //this.toolbar = tb;
        // add stuff to toolbar?
        //this.innerLayout.endUpdate();
        
        
        
    },
    refresh : function() {
        this.grid.getDataSource().reload();
    },
    /*
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
    */
    renderer: function(v, c, r, ri, ci, st) {
        // work out what the column is..
        var h = Pman.Tab.Group_Rights.grid.getColumnModel().getColumnId(ci).toUpperCase();
        // ADESPIM
        
        if (v.indexOf(h.substring(3)) > -1) {
            return 'Y';
        }
        
        return '-';
        
    },
    save : function()
    {
       
    }
        
        
};
 
