//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminEmailTemplates = new Roo.XComponent({

 _strings : {
  'ec211f7c20af43e742bf2570c3cb84f9' :"Add",
  'c7d299bf3f9e37c77ab646f7e5366696' :"core_email",
  '00d6e06d2f3c092b4f5e1e708a360b0f' :"Displaying Message{0} - {1} of {2}",
  '9076cbba1d9ef79280b4f39e2aa0d115' :"Nothing found",
  'b78a3223503896721cca1303f776159b' :"Title",
  '9e11143e29a031212f2cdefcf61f39e9' :"View Message",
  'f49559cda3fb906fbd7736f8b8a0e37d' :"Email Template",
  '4a4a8fe0c6dfb6bd2a41755d15eb6f0b' :"From Name",
  '4ca679a383343ab3d4ca1cd7c91b43f7' :"From Email",
  '5fb63579fc981698f97d55bfecb213ea' :"Copy",
  'f2a6c498fb90ee345d997f888fce3b18' :"Delete",
  '49ee3087348e8d44e1feda1917443987' :"Name"
 },

  part     :  ["Admin", "EmailTemplates" ],
  order    : '999-Pman.Tab.AdminEmailTemplates',
  region   : 'center',
  parent   : 'Pman.Tab.Admin',
  name     : "Manage Email Templates",
  disabled : false, 
  permname : '', 
  _tree : function()
  {
   var _this = this;
   var MODULE = this;
   return {
   region : 'center',
   title : _this._strings['f49559cda3fb906fbd7736f8b8a0e37d'] /* Email Template */,
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
    south : {
     autoScroll : false,
     height : 300,
     split : true,
     titlebar : true,
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
      tableName : 'core_email',
      title : _this._strings['c7d299bf3f9e37c77ab646f7e5366696'] /* core_email */,
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
       autoExpandColumn : 'subject',
       loadMask : true,
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       xtype : 'Grid',
       listeners : {
        render : function() 
         {
             _this.grid = this; 
             _this.dialog = Pman.Dialog.CoreEmail;
             if (_this.panel.active) {
                _this.grid.footer.onClick('first');
             }
         },
        rowclick : function (_self, rowIndex, e)
         {
            // _this.grid.ds.load({});
             _this.viewPanel.view.store.load({});
         },
        rowdblclick : function (_self, rowIndex, e)
         {
             if (!_this.dialog) return;
             var data = this.getDataSource().getAt(rowIndex).data;
             _this.dialog.show( {id : data.id, module : 'core_email'} , function() {
                 _this.grid.footer.onClick('first');
             }); 
         }
       },
       footer : {
        displayInfo : true,
        displayMsg : _this._strings['00d6e06d2f3c092b4f5e1e708a360b0f'] /* Displaying Message{0} - {1} of {2} */,
        emptyMsg : _this._strings['9076cbba1d9ef79280b4f39e2aa0d115'] /* Nothing found */,
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
          xns : Roo.form,
          '|xns' : 'Roo.form',
          xtype : 'TextField',
          listeners : {
           render : function (_self)
            {
                _this.searchBox = _self;
            },
           specialkey : function (_self, e)
            {
              _this.grid.footer.onClick('first');
            }
          }
         },
         {
          cls : 'x-btn-icon',
          icon : rootURL + '/Pman/templates/images/search.gif',
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Button',
          listeners : {
           click : function (_self, e)
            {
                _this.grid.footer.onClick('first');
            }
          }
         },
         {
          cls : 'x-btn-icon',
          icon : rootURL + '/Pman/templates/images/edit-clear.gif',
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Button',
          listeners : {
           click : function (_self, e)
            {
                _this.searchBox.setValue('');
                _this.grid.footer.onClick('first');
            }
          }
         },
         {
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Fill'
         },
         {
          cls : 'x-btn-text-icon',
          icon : Roo.rootURL + 'images/default/dd/drop-add.gif',
          text : _this._strings['5fb63579fc981698f97d55bfecb213ea'] /* Copy */,
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Button',
          listeners : {
           click : function()
            {
              var sel = _this.grid.selModel.getSelected();
              if (!sel) {
                    Roo.MessageBox.alert("Error", "Select a message to copy");
                    return;
                }
            new Pman.Request({
                url : baseURL + '/Roo/Core_email',
                method : 'POST',
                params : {
                    id : sel.data.id,
                    _make_copy : 1
                },
                success : function() {
                    _this.grid.footer.onClick('refresh');
                }
            });
              
            }
          }
         },
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
                if (!_this.dialog) return;
                _this.dialog.show( { id : 0, module : 'core_email' } , function() {
                    _this.grid.footer.onClick('first');
               }); 
            }
          }
         },
         {
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Separator'
         },
         {
          cls : 'x-btn-text-icon',
          icon : rootURL + '/Pman/templates/images/trash.gif',
          text : _this._strings['f2a6c498fb90ee345d997f888fce3b18'] /* Delete */,
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Button',
          listeners : {
           click : function()
            {
                Pman.genericDelete(_this, 'core_email');
                
            }
          }
         }
        ]
       },
       dataSource : {
        remoteSort : true,
        sortInfo : { field : 'id', direction: 'DESC' },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        xtype : 'Store',
        listeners : {
         beforeload : function (_self, options)
          {
              options.params = options.params || {};
              
              var s = _this.searchBox.getValue();
              
              if(s.length){
                  options.params['search[nameortitle]'] = s;
              }
          
          }
        },
        proxy : {
         method : 'GET',
         url : baseURL + '/Roo/Core_email.php',
         xns : Roo.data,
         '|xns' : 'Roo.data',
         xtype : 'HttpProxy'
        },
        reader : {
         fields : [
             {
                 "name":"name",
                 "type":"string"
             },
             {
                 "name":"subject",
                 "type":"string"
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
       sm : {
        singleSelect : true,
        xns : Roo.grid,
        '|xns' : 'Roo.grid',
        xtype : 'RowSelectionModel'
       },
       colModel : [
        {
         dataIndex : 'name',
         header : _this._strings['49ee3087348e8d44e1feda1917443987'] /* Name */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 250,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'subject',
         header : _this._strings['b78a3223503896721cca1303f776159b'] /* Title */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 300,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'from_name',
         header : _this._strings['4a4a8fe0c6dfb6bd2a41755d15eb6f0b'] /* From Name */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 400,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'from_email',
         header : _this._strings['4ca679a383343ab3d4ca1cd7c91b43f7'] /* From Email */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 400,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        }
       ]
      }
     },
     {
      autoScroll : true,
      background : false,
      fitContainer : true,
      fitToFrame : true,
      region : 'south',
      title : _this._strings['9e11143e29a031212f2cdefcf61f39e9'] /* View Message */,
      xns : Roo,
      '|xns' : 'Roo',
      xtype : 'ContentPanel',
      listeners : {
       render : function (_self)
        {
            _this.viewPanel = _self;
        }
      },
      view : {
       tpl : new Roo.DomTemplate({url : rootURL+'/Pman/Crm/domtemplates/crm_mail.html'}),
       xns : Roo,
       '|xns' : 'Roo',
       xtype : 'View',
       listeners : {
        preparedata : function (_self, data, i, rec)
         {
            // Roo.log(data);
             //Roo.apply(data, rec.json);
         }
       },
       store : {
        xns : Roo.data,
        '|xns' : 'Roo.data',
        xtype : 'Store',
        listeners : {
         beforeload : function (_self, options)
          {
              options.params = options.params || {};
              var p = _this.grid.selModel.getSelected();
              if (!p || !p.data.id) {
                  this.removeAll();
                  return false;
              }
             
              options.params['id'] = p.data.id;
           
          },
         load : function (_self, records, options)
          {
              var p = _this.grid.selModel.getSelected();
            //  Roo.log(p);
              if (!p || !p.data.id) {
                  this.removeAll();
                  return false;
              }
            /*  
              new Pman.Request({
                  url : baseURL + '/Roo/crm_action.php',
                  method : 'GET',
                  params : {
                      person_id : p.data.id,
                      sort : 'action_dt',
                      dir : 'DESC'
                  },
                  success : function(res) {
                      if(res.success){
                          var el = _this.cpanel.el.select('.crm-history-content').first();
                          _this.historyTemplate.overwrite(el, res);
                          el.select('.crm-history-log').on('click', Pman.Crm.auditToggle);
                          //Roo.log(res);
                      }
                  },
                  failure : function(e) {
                      //Roo.log(e);
                    _this.grid.ds.load({});
                  }
                  
              });
              */
          
          //_this.historyTemplate = new Roo.DomTemplate({url : rootURL+'/Pman/Crm/domtemplates/crm_history.html'})
          
          /*
            new pman request ([
            
            } successs(data)
                 el = _this.elemmnt.select('.services')
                 _this.serviceTemplate.overwite(el, data)
            */
          }
        },
        proxy : {
         method : 'GET',
         url : baseURL+'/Roo/Core_email.php',
         xns : Roo.data,
         '|xns' : 'Roo.data',
         xtype : 'HttpProxy'
        },
        reader : {
         id : 'id',
         root : 'data',
         totalProperty : 'total',
         xns : Roo.data,
         '|xns' : 'Roo.data',
         xtype : 'JsonReader'
        }
       }
      }
     }
    ]
   }
  };  }
});
