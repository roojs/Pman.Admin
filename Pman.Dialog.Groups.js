//<script type="text/javascript">

// generic groups edit dialog 

Pman.Dialog.Groups = {
    dialog : false,
    form : false,
    id: 'Group',
    create: function()
    {
        if (this.dialog) {
            return;
        }
        var _this = this;
        this.dialog = new Roo.LayoutDialog(Roo.get(document.body).createChild({tag:'div'}),  { 
            autoCreated: true,
            title: 'edit team',
            modal: true,
            width:  650,
            height: 150,
            shadow:true,
            minWidth:200,
            minHeight:150,
            //proxyDrag: true,
            closable: false,
            draggable: false,
            center: {
                autoScroll:false,
                titlebar: false,
               // tabPosition: 'top',
                hideTabs: true,
                closeOnTab: true,
                alwaysShowTabs: false
            }
        });
        this.dialog.addKeyListener(27, this.dialog.hide, this.dialog);
        this.dialog.addButton("Cancel", this.dialog.hide, this.dialog);
       
        this.dialog.addButton("Save", this.save, this);
        this.layout = this.dialog.getLayout();
        this.layout.beginUpdate();
        
       
        
        this.form = new Roo.form.Form({
            labelWidth: 250 ,
            listeners : {
                actionfailed : function(f, act) {
                    _this.dialog.el.unmask();
                    // error msg???
                    
                    Pman.standardActionFailed(f,act);
                              
                },
                actioncomplete: function(f, act) {
                    _this.dialog.el.unmask();
                    //console.log('load completed'); 
                    // error messages?????
                    
                   
                    if (act.type == 'load') {
                        
                        _this.data = act.result.data;
                       // _this.loaded();
                        return;
                    }
                    
                    
                    if (act.type == 'submit') { // only submitted here if we are 
                        _this.dialog.hide();
                        if (_this.callback) {
                            _this.callback.call(this, act.result.data);
                        }
                        return; 
                    }
                    // unmask?? 
                }
            }
        
            
            
             
        });
        //?? will this work...
        this.form.addxtype.apply(this.form,[{
                name : 'name',
                fieldLabel : "Group Name",  // should be team name for other one.!!!!!
                value : '',
                allowBlank : false,
                qtip : "Enter Group name",
                xtype : 'TextField',
                width : 300
            },
            {
                
                xtype: 'ComboBox',
                fieldLabel: "Leader",
                name : 'leader_name',
                selectOnFocus:true,
                qtip : "Select Person Who opened",
                allowBlank : true,
                width: 280,
                
                store: new Roo.data.Store({
                      // load using HTTP
                    proxy: new Roo.data.HttpProxy({
                        url: baseURL + '/Roo/core_person',
                        method: 'GET'
                    }),
                    reader: new Roo.data.JsonReader({}, []),
                    listeners : {
                        beforeload : function(st,o)
                        {
                            // compnay myst be set..
                             
                            o.params.company_id = Pman.Login.authUser.company_id * 1;
                             
                             
                        }
                    }
                }),
                 
                
                displayField:'name',
                valueField : 'id',
                hiddenName:  'leader',
                typeAhead: true,
                forceSelection: true,
                doForce : function(){
                    if(this.el.dom.value.length > 0){
                        this.el.dom.value =
                            this.lastSelectionText === undefined ? "" : this.lastSelectionText;
                        this.applyEmptyText();
                        if (!this.el.dom.value.length) {
                            this.setFromData({  id: 0, name:  '----'  });
                        }
                    }
                },

                //mode: 'local',
                triggerAction: 'all',
                tpl: new Roo.Template(
                    '<div class="x-grid-cell-text x-btn button">',
                        '<b>{name}</b> {role}',
                    '</div>'
                ),
                queryParam: 'query[name]',
                loadingText: "Searching...",
                listWidth: 300,
               
                minChars: 2,
                pageSize:20 
                 
                 
            },
            
            
            {
                name : 'id',
                value : '',
                xtype : 'Hidden'
                
            },{
                name : 'type', // 0 == Group, 1 == team..
                value : '',
                xtype : 'Hidden'
                
            }
        ]);
        var ef = this.dialog.getLayout().getEl().createChild({tag: 'div'});
        ef.dom.style.margin = 10;
         
        this.form.render(ef.dom);

        var vp = this.dialog.getLayout().add('center', new Roo.ContentPanel(ef, {
            autoCreate : true,
            //title: 'Org Details',
            //toolbar: this.tb,
            width: 250,
            maxWidth: 250,
            fitToFrame:true
        }));
          

        
        
        this.layout.endUpdate();
    },
    _id : 0,
    show : function(data, callback)
    {
        this.callback= callback;
        this._id = data.id;
        this.data = data;
        this.create();
        this.form.reset();
        this.form.setValues(data);
        this.dialog.show();
        
        this.dialog.setTitle(data.type ? "Edit Group" : "Edit Team");
        var lw = Roo.get(this.form.findField('leader').el.dom.parentNode.parentNode.parentNode);
        // change the label!?!!?
        lw.setVisibilityMode(Roo.Element.DISPLAY);
        if (this.data.type) {
            // show the leader..
            lw.show();
            
            this.form.findField('leader').setFromData({
                id:  this.data.leader,
                name : this.data.leader ? this.data.leader_name : ''
            });
            
        } else {
            // hide the leader
            lw.hide();
        }
        
        
        

    },
    save : function()
    {
         this.form.doAction('submit', {
            url: baseURL + '/Roo/core_group.php',
            method: 'POST',
            params: {
                _id: this._id ,
                ts : Math.random()
            } 
        });
    }
     
         
};