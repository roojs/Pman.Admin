//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminOAuthClient = new Roo.XComponent({

 _strings : {
  '16f63df432feae9fab6840eabc9d3704' :"No Clients found",
  'ec211f7c20af43e742bf2570c3cb84f9' :"Add",
  '76525f0f34b48475e5ca33f71d296f3b' :"Client ID",
  '27499763cc523271e74f32ff4f740a7f' :"Redirect URI",
  '1063e38cb53d94d386f21227fcd84717' :"Remove",
  '0c95cb44ad29b66991e47d3e27fecadc' :"Oauth2 Clients",
  '734082edf44417dd19cc65943aa65c36' :"Client Secret"
 },

  part     :  ["Admin", "OAuthClient" ],
  order    : '900-Pman.Tab.AdminOAuthClient',
  region   : 'center',
  parent   : 'Pman.Tab.Admin',
  name     : "unnamed module",
  disabled : false, 
  permname : '', 
  _tree : function()
  {
   var _this = this;
   var MODULE = this;
   return {
   region : 'center',
   title : _this._strings['0c95cb44ad29b66991e47d3e27fecadc'] /* Oauth2 Clients */,
   xns : Roo,
   '|xns' : 'Roo',
   xtype : 'NestedLayoutPanel',
   layout : {
    xns : Roo,
    '|xns' : 'Roo',
    xtype : 'BorderLayout',
    center : {
     autoScroll : false,
     split : true,
     xns : Roo,
     '|xns' : 'Roo',
     xtype : 'LayoutRegion'
    },
    items  : [
     {
      background : true,
      fitContainer : true,
      fitToframe : true,
      region : 'center',
      tableName : 'core_oauth_clients',
      title : _this._strings['0c95cb44ad29b66991e47d3e27fecadc'] /* Oauth2 Clients */,
      xns : Roo,
      '|xns' : 'Roo',
      xtype : 'GridPanel',
      listeners : {
       activate : function() {
            _this.panel = this;
            
            if (_this.grid) {
                _this.grid.footer.onClick('first');
            }
        }
      },
      grid : {
       autoExpandColumn : 'redirect_uri',
       clicksToEdit : 1,
       loadMask : true,
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       xtype : 'EditorGrid',
       listeners : {
        afteredit : function (e)
         {
             if(e.originalValue == e.value || !e.value.length){
                 return false;
             }
             
             Roo.log('commit it');
             e.record.commit();
         },
        render : function() 
         {
             _this.grid = this; 
             if (_this.panel.active) {
                this.footer.onClick('first');
             }
         }
       },
       footer : {
        displayInfo : true,
        emptyMsg : _this._strings['16f63df432feae9fab6840eabc9d3704'] /* No Clients found */,
        pageSize : 25,
        xns : Roo,
        '|xns' : 'Roo',
        xtype : 'PagingToolbar'
       },
       toolbar : {
        xns : Roo,
        '|xns' : 'Roo',
        xtype : 'Toolbar',
        items  : [
         {
          cls : 'x-btn-text-icon',
          icon : Roo.rootURL + 'images/default/dd/drop-add.gif',
          text : _this._strings['ec211f7c20af43e742bf2570c3cb84f9'] /* Add */,
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Button',
          listeners : {
           click : function()
            {
                
                var nr = _this.grid.ds.reader.newRow({
                    id : 0,
                    client_id : '',
                    client_secret : '',
                    redirect_uri : ''
                });
                
                _this.grid.stopEditing();
                _this.grid.ds.insert(_this.grid.ds.getCount(), nr); 
                _this.grid.startEditing(_this.grid.ds.getCount()-1, 0);
            }
          }
         },
         {
          cls : 'x-btn-text-icon',
          icon : rootURL + '/Pman/templates/images/trash.gif',
          text : _this._strings['1063e38cb53d94d386f21227fcd84717'] /* Remove */,
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Button',
          listeners : {
           click : function ()
            {   
                var cs = _this.grid.getSelectionModel().getSelectedCell();
                if (!cs) {
                    Roo.MessageBox.alert("Error", "Select a cell");
                    return;
                }
                _this.grid.stopEditing();
             
                var r = _this.grid.ds.getAt(cs[0]);
                
                Roo.MessageBox.confirm("Confirm", "Are you sure you want to delete this client?", function (v){
                    if (v != 'yes') {
                        return;
                    }
                    
                    new Pman.Request({
                        url : baseURL + '/Roo/Core_oauth_clients',
                        method : 'POST',
                        params : {
                            _delete : r.data.id
                        },
                        success : function(res) {
                            _this.grid.footer.onClick('refresh');
                        }
                    });
                });
            }
          }
         }
        ]
       },
       dataSource : {
        remoteSort : true,
        sortInfo : { field : 'client_id', direction: 'ASC' },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        xtype : 'Store',
        listeners : {
         beforeload : function (_self, o){
              o.params = o.params || {};
          
          },
         update : function (_self, record, operation)
          {
              if (operation != Roo.data.Record.COMMIT) {
                  return;
              }
          
              if (!record.data.client_id.length || !record.data.client_secret.length) {
                  return;
              }
              
              new Pman.Request({
                  url : baseURL + '/Roo/Core_oauth_clients',
                  method : 'POST',
                  params : {
                      id : record.data.id,
                      client_id : record.data.client_id,
                      client_secret : record.data.client_secret,
                      redirect_uri : record.data.redirect_uri
                  },
                  success : function(res) {
                      _this.grid.footer.onClick('refresh');
                  }
              });
              
          }
        },
        proxy : {
         method : 'GET',
         url : baseURL + '/Roo/Core_oauth_clients',
         xns : Roo.data,
         '|xns' : 'Roo.data',
         xtype : 'HttpProxy'
        },
        reader : {
         fields : [
             {
                 'name': 'id',
                 'type': 'int'
             },
             {
                 'name': 'client_id',
                 'type': 'string'
             },
             {
                 'name': 'client_secret',
                 'type': 'string'
             },
             {
                 'name': 'redirect_uri',
                 'type': 'string'
             }
         ],
         id : 'id',
         root : 'data',
         totalProperty : 'total',
         xns : Roo.data,
         '|xns' : 'Roo.data',
         xtype : 'JsonReader'
        }
       },
       colModel : [
        {
         dataIndex : 'client_id',
         header : _this._strings['76525f0f34b48475e5ca33f71d296f3b'] /* Client ID */,
         renderer : function(v) { 
             return String.format('{0}', v ? v : '');
         },
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel',
         editor : {
          xns : Roo.grid,
          '|xns' : 'Roo.grid',
          xtype : 'GridEditor',
          field : {
           allowBlank : false,
           xns : Roo.form,
           '|xns' : 'Roo.form',
           xtype : 'TextField'
          }
         }
        },
        {
         dataIndex : 'client_secret',
         header : _this._strings['734082edf44417dd19cc65943aa65c36'] /* Client Secret */,
         renderer : function(v) { 
             return String.format('{0}', v ? v : '');
         },
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel',
         editor : {
          xns : Roo.grid,
          '|xns' : 'Roo.grid',
          xtype : 'GridEditor',
          field : {
           allowBlank : false,
           xns : Roo.form,
           '|xns' : 'Roo.form',
           xtype : 'TextField'
          }
         }
        },
        {
         dataIndex : 'redirect_uri',
         header : _this._strings['27499763cc523271e74f32ff4f740a7f'] /* Redirect URI */,
         renderer : function(v) { 
             return String.format('{0}', v ? v : '');
         },
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel',
         editor : {
          xns : Roo.grid,
          '|xns' : 'Roo.grid',
          xtype : 'GridEditor',
          field : {
           xns : Roo.form,
           '|xns' : 'Roo.form',
           xtype : 'TextField'
          }
         }
        }
       ]
      }
     }
    ]
   }
  };  }
});
