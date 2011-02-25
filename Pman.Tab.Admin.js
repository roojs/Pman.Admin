//<script type="text/javascript">


/**
* Tab for fax stuff..
*/

Pman.on('beforeload', function()
{
    
    // only the system admin company can see this!!
    if (Pman.Login.authUser.company_id_isOwner * 1 < 1) {
        return;
    }
    Pman.register({
        modKey : '900-pman-tab-admin',
        module : Pman.Tab.Admin,
        region : 'center',
        parent : Pman,
        name : "Administration"
    });
     if (Pman.hasPerm('Core.Projects_All', 'E')) {
        
        Pman.subMenuItems.push({
                seqid : 401,
                text: "Add Project",
                cls: 'x-btn-text-icon',
                icon: Ext.rootURL + 'images/default/dd/drop-add.gif',
                
                handler : function() {
                    Pman.Dialog.Projects.show( 
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
        
    }
});
 
Pman.Tab.Admin = {
    
    tab : false,
    
    add : function(parentLayout, region)
    {
        
        if (!Pman.hasPerm('Admin.Admin_Tab', 'S')) {
            return;
        }
        if (this.tab) {
            return;
        }
                
        
        this.layout = new Ext.BorderLayout(
            parentLayout.getEl().createChild({tag:'div'}),
            {
                center: {
                    autoScroll:true,
                    hideTabs: false,
                    tabPosition: 'top'
                }
            }
        );
            
                //this.mainTab.on('activate', function() {
                //    Pman.adminLayout.showPanel(0);
                  //  Pman.Tab.Documents_In.paging.onClick('first');
               // });

        var _this = this;
        this.tab = parentLayout.add('center',  
            new Ext.NestedLayoutPanel(
                this.layout, {
                    title: "Admin",
                    background : true
                }));

        this.tab.on('activate', function() {
            try {
                this.layout.showPanel(0)
            } catch(e) { }
            
            //_this.layout.getRegion('center').showPanel(0);
            
            //try {
            //    Pman.Tab.ProjectsMgr.paging.onClick('first');
            //} catch(e) {
            // do nothing .. - if projects is not avail...
            //}
            
            // auto loads?!?!
            //Pman.Tab.ProjectsMgr.paging.onClick('first');
        });
        //this.adminLayout.beginUpdate();
    },

 
    
    buildAdminLayout : function() 
    {
         
        if (isDev) {
            Pman.Translation.add(this.layout, 'center');
        }
       
        
    }
};
        
    