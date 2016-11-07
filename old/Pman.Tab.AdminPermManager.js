//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminPermManager = new Roo.XComponent({

 _strings : {
  'a37ede293936e29279ed543129451ec3' :"Groups",
  'ec211f7c20af43e742bf2570c3cb84f9' :"Add",
  '7dce122004969d56ae2e0245cb754d35' :"Edit",
  '911051bc8a5abedcc127334f0f70b78a' :"Permission Manager",
  '4d1c8263ba1036754f8db14a98f9f006' :"Reload",
  'f2a6c498fb90ee345d997f888fce3b18' :"Delete",
  '49ee3087348e8d44e1feda1917443987' :"Name",
  'aba9f7d7443652e858969bfc280690b1' :"Manage Groups"
 },

  part     :  ["old", "AdminPermManager" ],
  order    : '700-Pman.Tab.AdminPermManager',
  region   : 'center',
  parent   : 'Pman.Tab.Admin',
  name     : "Pman.Tab.AdminPermManager",
  disabled : false, 
  permname : 'Core.Groups', 
  _tree : function()
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'NestedLayoutPanel',
   background : true,
   region : 'center',
   title : _this._strings['911051bc8a5abedcc127334f0f70b78a'] /* Permission Manager */,
   xns : Roo,
   '|xns' : 'Roo',
   layout : {
    xtype : 'BorderLayout',
    xns : Roo,
    '|xns' : 'Roo',
    center : {
     xtype : 'LayoutRegion',
     tabPosition : 'top',
     xns : Roo,
     '|xns' : 'Roo'
    },
    west : {
     xtype : 'LayoutRegion',
     width : 200,
     xns : Roo,
     '|xns' : 'Roo'
    },
    items  : [
     {
      xtype : 'GridPanel',
      background : true,
      fitContainer : true,
      fitToframe : true,
      region : 'west',
      tableName : 'Groups',
      title : _this._strings['a37ede293936e29279ed543129451ec3'] /* Groups */,
      listeners : {
       activate : function() {
            _this.panel = this;
            if (_this.grid) {
                _this.grid.ds.load({});
            }
        }
      },
      xns : Roo,
      '|xns' : 'Roo',
      grid : {
       xtype : 'Grid',
       autoExpandColumn : 'name',
       ddGroup : 'groupDD',
       enableDrop : true,
       loadMask : true,
       listeners : {
        render : function() 
         {
             _this.grid = this; 
             _this.dialog = Pman.Dialog.Groups;
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
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       toolbar : {
        xtype : 'Toolbar',
        xns : Roo,
        '|xns' : 'Roo',
        items  : [
         {
          xtype : 'Button',
          text : _this._strings['aba9f7d7443652e858969bfc280690b1'] /* Manage Groups */,
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          menu : {
           xtype : 'Menu',
           xns : Roo.menu,
           '|xns' : 'Roo.menu',
           items  : [
            {
             xtype : 'Item',
             cls : 'x-btn-text-icon',
             icon : Roo.rootURL + 'images/default/dd/drop-add.gif',
             text : _this._strings['ec211f7c20af43e742bf2570c3cb84f9'] /* Add */,
             listeners : {
              click : function()
               {
                   if (!_this.dialog) return;
                   _this.dialog.show( { id : 0,  type: 0 } , function() {
                        _this.grid.ds.load({});
                  }); 
               }
             },
             xns : Roo.menu,
             '|xns' : 'Roo.menu'
            },
            {
             xtype : 'Item',
             cls : 'x-btn-text-icon',
             icon : Roo.rootURL + 'images/default/tree/leaf.gif',
             text : _this._strings['7dce122004969d56ae2e0245cb754d35'] /* Edit */,
             listeners : {
              click : function()
               {
                   var s = _this.grid.getSelectionModel().getSelections();
                   if (!s.length || (s.length > 1))  {
                       Roo.MessageBox.alert("Error", s.length ? "Select only one Row" : "Select a Row");
                       return;
                   }
                   if (s[0].data.id < 1 ) {
                       return;
                   }
                   if (!_this.dialog) return;
                   _this.dialog.show(s[0].data, function() {
                        _this.grid.ds.load({});
                   }); 
                   
               }
             },
             xns : Roo.menu,
             '|xns' : 'Roo.menu'
            },
            {
             xtype : 'Item',
             cls : 'x-btn-text-icon',
             icon : rootURL + '/Pman/templates/images/trash.gif',
             text : _this._strings['f2a6c498fb90ee345d997f888fce3b18'] /* Delete */,
             listeners : {
              click : function()
               {
                    Pman.genericDelete(_this, 'Groups'); 
               }
             },
             xns : Roo.menu,
             '|xns' : 'Roo.menu'
            },
            {
             xtype : 'Separator',
             xns : Roo.menu,
             '|xns' : 'Roo.menu'
            },
            {
             xtype : 'Item',
             text : _this._strings['4d1c8263ba1036754f8db14a98f9f006'] /* Reload */,
             listeners : {
              click : function (_self, e)
               {
                 _this.grid.ds.load({});
               }
             },
             xns : Roo.menu,
             '|xns' : 'Roo.menu'
            }
           ]
          }
         }
        ]
       },
       dataSource : {
        xtype : 'Store',
        remoteSort : true,
        sortInfo : { field : 'name', direction: 'ASC' },
        listeners : {
         beforeload : function (_self, o)
          {
              o.params = o.params || {};
              o.params.type =0;
              
          },
         load : function (_self, records, options)
          {
              var sm = _this.grid.getSelectionModel();
              if (!sm.getSelections().length) {
                  sm.selectFirstRow();
              }
              // should refresh righthand side grid..
               //   Pman.Tab.AdminContacts.grid.footer.onClick('first');
          }
        },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         url : baseURL + '/Roo/Groups.php',
         xns : Roo.data,
         '|xns' : 'Roo.data'
        },
        reader : {
         xtype : 'JsonReader',
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
         ],
         id : 'id',
         root : 'data',
         totalProperty : 'total',
         xns : Roo.data,
         '|xns' : 'Roo.data'
        }
       },
       dropTarget : {
        xtype : 'DropTarget',
        ddGroup : 'groupDD',
        listeners : {
         drop : function (source, e, data)
          {
              // Roo.log("DROP");
              var t = Roo.lib.Event.getTarget(e); 
              var ri = _this.grid.view.findRowIndex(t);
              var rid  = false;
              if (ri !== false) {
                  rid = _this.grid.getDataSource().getAt(ri).data;
              }
              var s = _this.grid.getSelectionModel().getSelections();
                
              //console.log(data);
              var isFromGroup = s.length ? s[0].data.id > 0 : false;
          
              var isToGroup = rid && rid.id > 0;
              this.success = false;
              if (isFromGroup && isToGroup) {
                  return;
              }
              if (!isFromGroup && !isToGroup) {
                  return;
              }
              var action = 'add';
              if (isFromGroup && !isToGroup) {
                  action = 'sub';
                  //return 'x-dd-drop-ok-sub'; 
              }
              // build a list of selections.
              var sels = [];
              for (var i=0; i < data.selections.length; i++) {
                  sels.push(data.selections[i].data.id);
              }
          
              Pman.request({
                  url: baseURL + '/Core/GroupMembers.php',
                  params: {
                      action : action,
                      group_id: action =='add' ? rid.id : s[0].data.id,
                      type: _this.type,
                      user_ids : sels.join(',')
                      
                  },  
                  method: 'POST',  
                  success : function(data) {
                      //refreshPager();
                      // 
                      // do we need to do anything??
                      if (isFromGroup) {
                          Pman.Tab.AdminPermMembers.grid.footer.onClick('refresh');
                      }
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
              // Roo.log("dragover");
               
              //Roo.log(e);
              var t = Roo.lib.Event.getTarget(e); 
                 //  Roo.log(t);
              var ri = _this.grid.view.findRowIndex(t);
                //            Roo.log(ri);
              
              var rid  = false;
              if (ri !== false) {
                  rid = _this.grid.getDataSource().getAt(ri).data;
              }
              
              var s = _this.grid.getSelectionModel().getSelections();
              
              var isFromGroup = s.length ? s[0].data.id > 0 : false;
              
              var isToGroup = rid && rid.id > 0;
              
          //    Roo.log("isToGroup:"  + isToGroup + ", isFromGroup" + isFromGroup);
               
              if (isFromGroup && isToGroup) {
                  this.valid = false;
          //        Roo.log('not valid');
                  return;
              }
              if (!isFromGroup && !isToGroup) {
                  this.valid = false;
          //        Roo.log('not valid');
                  return  
              }
              if (isFromGroup && !isToGroup) {
                  this.valid = 'ok-sub'; 
                  return;
              } 
              //if (!isFromGroup && isToGroup) {
              this.valid = 'ok-add';
          //    Roo.log('add'); 
              //}
          }
        },
        xns : Roo.dd,
        '|xns' : 'Roo.dd'
       },
       sm : {
        xtype : 'RowSelectionModel',
        singleSelect : true,
        listeners : {
         afterselectionchange : function (_self)
          {
              Pman.Tab.AdminPermMembers.grid.footer.onClick('first');
          }
        },
        xns : Roo.grid,
        '|xns' : 'Roo.grid'
       },
       colModel : [
        {
         xtype : 'ColumnModel',
         dataIndex : 'name',
         header : _this._strings['49ee3087348e8d44e1feda1917443987'] /* Name */,
         renderer : function(v,x,r) { 
             if (r.data.id == -1) {
                 return '<b>' + "Not in a Group" + '</b>';
             }
             if ((r.data.id == 0) && (_this.type == 0)) {
                 return '<b>' + "All Staff (Default Permissions)" + '</b>';
             }
             if ((r.data.id == 0) && (_this.type == 2)) {
                 return '<b>' + "Everybody" + '</b>';
             }
             if (r.data.id == 0) {
                 return '<b>' + "All Staff" + '</b>';
             }
             if (v == 'Administrators') {
                 return '<b>' + "Adminstrators" + '</b>';
             }
             if (r.data.leader) {
                 return v + ' (' + r.data.leader_name + ')';
             }
             
             return v;
         },
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        }
       ]
      }
     }
    ]
   }
  };  }
});
