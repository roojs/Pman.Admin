//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminDomain = new Roo.XComponent({

 _strings : {
  '13348442cc6a27032d2b4aa28b75a5d3' :"Search",
  'ec211f7c20af43e742bf2570c3cb84f9' :"Add",
  '79ebd90228ae192321ca47951612dea5' :"Displaying email domains {0} - {1} of {2}",
  '7dce122004969d56ae2e0245cb754d35' :"Edit",
  '24e7d4799ecdbe08c291691323305006' :"Delete All Match",
  '996d8bde90930fead44cf1d6989e532a' :"No email domain found",
  '8f00afba26677da2da0b00ec8daf22bd' :"Email Domains",
  'b18d852fa0d2465fe38b05b96dd5b736' :"Bulk Update",
  'eae639a70006feff484a39363c977e24' :"Domain",
  '6aa48f150b0d29138ab848a1d4e6792c' :"No. of references",
  'a181a603769c1f98ad927e7367c7aa51' :"all",
  'f2a6c498fb90ee345d997f888fce3b18' :"Delete",
  '9732d2a193579388e6d9138368554966' :"MX Last Updated"
 },

  part     :  ["Admin", "Domain" ],
  order    : '9998-Pman.Tab.AdminDomain',
  region   : 'center',
  parent   : 'Pman.Tab.Admin',
  name     : "Domain",
  disabled : false, 
  permname : '', 
  _tree : function(_data)
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'Grid',
   autoScroll : true,
   background : true,
   fitContainer : true,
   fitToframe : true,
   region : 'center',
   tableName : 'core_domain',
   title : _this._strings['8f00afba26677da2da0b00ec8daf22bd'] /* Email Domains */,
   listeners : {
    activate : function() {
         _this.domainPanel = this;
     }
   },
   xns : Roo.panel,
   '|xns' : 'Roo.panel',
   grid : {
    xtype : 'Grid',
    autoExpandColumn : 'domain',
    loadMask : true,
    listeners : {
     render : function() 
      {
          _this.domainGrid = this; 
          if (_this.domainPanel.active) {
             this.footer.onClick('first');
          }
      },
     rowdblclick : function (_self, rowIndex, e)
      {
         var el = _this.domainGrid.ds.getAt(rowIndex);
      
         Pman.Dialog.AdminDomain.show({ id: el.id }, function() {
              _this.domainGrid.footer.onClick('first');
            });
      }
    },
    xns : Roo.grid,
    '|xns' : 'Roo.grid',
    footer : {
     xtype : 'PagingToolbar',
     displayInfo : true,
     displayMsg : _this._strings['79ebd90228ae192321ca47951612dea5'] /* Displaying email domains {0} - {1} of {2} */,
     emptyMsg : _this._strings['996d8bde90930fead44cf1d6989e532a'] /* No email domain found */,
     pageSize : 50,
     xns : Roo,
     '|xns' : 'Roo'
    },
    toolbar : {
     xtype : 'Toolbar',
     xns : Roo,
     '|xns' : 'Roo',
     items  : [
      {
       xtype : 'TextItem',
       text : _this._strings['13348442cc6a27032d2b4aa28b75a5d3'] /* Search */,
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar'
      },
      {
       xtype : 'TextField',
       listeners : {
        render : function (_self)
         {
             _this.searchBox = _self;
         },
        specialkey : function (_self, e)
         {
           if (e.getKey() == 13) {
             _this.domainGrid.footer.onClick('first');
           }
         }
       },
       xns : Roo.form,
       '|xns' : 'Roo.form'
      },
      {
       xtype : 'Button',
       cls : 'x-btn-icon',
       icon : rootURL + '/Pman/templates/images/search.gif',
       listeners : {
        click : function (_self, e)
         {
         _this.domainGrid.footer.onClick('first');
         }
       },
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar'
      },
      {
       xtype : 'Button',
       cls : 'x-btn-icon',
       icon : rootURL + '/Pman/templates/images/edit-clear.gif',
       listeners : {
        click : function (_self, e)
         {
             _this.searchBox.setValue('');
             _this.domainGrid.footer.onClick('first');
         }
       },
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar'
      },
      {
       xtype : 'ComboBox',
       allowBlank : true,
       displayField : 'value',
       editable : false,
       mode : 'local',
       triggerAction : 'all',
       value : _this._strings['a181a603769c1f98ad927e7367c7aa51'] /* all */,
       valueField : 'key',
       width : 100,
       listeners : {
        render : function (_self)
         {
             _this.statusSel = _self;
         },
        select : function (combo, record, index)
         {
             _this.domainGrid.footer.onClick('first');
         }
       },
       xns : Roo.form,
       '|xns' : 'Roo.form',
       store : {
        xtype : 'SimpleStore',
        data : [
            
             [ 'all', 'All' ],
             [ 'valid_mx', "Valid MX" ],
             [ 'invalid_mx', "Invalid MX" ]
        ],
        fields : [ 'key', 'value'],
        xns : Roo.data,
        '|xns' : 'Roo.data'
       }
      },
      {
       xtype : 'ComboBox',
       allowBlank : true,
       displayField : 'value',
       editable : false,
       mode : 'local',
       triggerAction : 'all',
       value : _this._strings['a181a603769c1f98ad927e7367c7aa51'] /* all */,
       valueField : 'key',
       width : 125,
       listeners : {
        render : function (_self)
         {
             _this.referenceSel = _self;
         },
        select : function (combo, record, index)
         {
             _this.domainGrid.footer.onClick('first');
         }
       },
       xns : Roo.form,
       '|xns' : 'Roo.form',
       store : {
        xtype : 'SimpleStore',
        data : [
             [ 'all', 'All' ],
             [ 'with_references', "Has References" ],
             [ 'without_reference', "No Reference" ]
        ],
        fields : [ 'key', 'value'],
        xns : Roo.data,
        '|xns' : 'Roo.data'
       }
      },
      {
       xtype : 'Button',
       text : _this._strings['ec211f7c20af43e742bf2570c3cb84f9'] /* Add */,
       listeners : {
        click : function()
         {
             Pman.Dialog.AdminDomain.show({ id:0 });
         }
       },
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar'
      },
      {
       xtype : 'Button',
       text : _this._strings['7dce122004969d56ae2e0245cb754d35'] /* Edit */,
       listeners : {
        click : function()
         {
             var el = _this.domainGrid.getSelections();
             
             if(el.length < 1){
                 Roo.MessageBox.alert('Error', 'Please select the match first');
                 return;
             }
             Pman.Dialog.AdminDomain.show({ id: el[0].id });
         
         }
       },
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar'
      },
      {
       xtype : 'Fill',
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar'
      },
      {
       xtype : 'Button',
       text : _this._strings['b18d852fa0d2465fe38b05b96dd5b736'] /* Bulk Update */,
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar',
       menu : {
        xtype : 'Menu',
        listeners : {
         beforeshow : function (_self)
          {
              _this.deleteAllMatch.hide();
              if(_this.statusSel.getValue() == 'unused') {
                  _this.deleteAllMatch.show();
              }
          }
        },
        xns : Roo.menu,
        '|xns' : 'Roo.menu',
        items  : [
         {
          xtype : 'Item',
          text : _this._strings['24e7d4799ecdbe08c291691323305006'] /* Delete All Match */,
          listeners : {
           click : function (_self, e)
            {
                Roo.MessageBox.confirm("Confirm", "Are you sure you want to delete all matching domains?", function(r) {
                    if (r!='yes') {
                        return;
                    }
                    
                    var batchDeleteStart = 0;
                    var batchDeleteLimit = 25;
                    
                    params = {
                        '_columns' : 'id',
                        'limit' : batchDeleteLimit
                    };
                    
                    params = _this.grid.ds.setLoadParams(params);
                    
                    var ids = [];
                    var total = 0;
                    
                    var fetchBatch = function() {
                        //params['start'] = batchDeleteStart;
                        
                        new Pman.Request({
                            url : baseURL + '/Roo/core_domain',
                            method : 'GET',
                            params : params,
                            success : function(res)
                            {
                                ids = [];
                                Roo.each(res.data, function(domain) {
                                    ids.push(domain.id);
                                });
                                if (total == 0) {
                                    total = res.total;
                                }
                                if(res.total == 0) {
                                    Roo.MessageBox.alert('Error', 'No matching domain');
                                    return;
                                }
                                deleteBatch();
                            }
                        });
                    }
                    
                    var deleteBatch = function() {
                        new Pman.Request({
                            url : baseURL + '/Roo/clipping_domain',
                            method : 'POST',
                            params : {
                                '_delete_ids' : ids.join(',')
                            },
                            success : function(res)
                            {
                                batchDeleteStart += batchDeleteLimit;
                                Roo.MessageBox.updateProgress(batchDeleteStart / total,
                                batchDeleteStart + " / " + total + " domains deleted");
                                if(batchDeleteStart >= total) {
                                    Roo.MessageBox.hide();
                                    _this.grid.footer.onClick('first');
                                    return;
                                }
                                fetchBatch();
                            }
                        });
                    };
                    
                    Roo.MessageBox.progress("Deleting matching domains", "Starting");
                    fetchBatch();
                });
            },
           render : function (_self)
            {
                _this.deleteAllMatch = this;
            }
          },
          xns : Roo.menu,
          '|xns' : 'Roo.menu'
         }
        ]
       }
      },
      {
       xtype : 'Button',
       text : _this._strings['f2a6c498fb90ee345d997f888fce3b18'] /* Delete */,
       listeners : {
        click : function()
         {
             Pman.Delete.simple(_this.domainPanel, 'core_domain');
         }
       },
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar'
      }
     ]
    },
    dataSource : {
     xtype : 'Store',
     remoteSort : true,
     sortInfo : { field : 'domain', direction: 'ASC' },
     listeners : {
      beforeload : function (_self, options)
       {
           options.params = options.params || {};
           options.params['query[domain]'] = _this.searchBox.getValue();
           options.params['_status'] = _this.statusSel.getValue();
           options.params['_with_reference_count'] = 1;
           options.params['_reference_status'] = _this.referenceSel.getValue();
       }
     },
     xns : Roo.data,
     '|xns' : 'Roo.data',
     proxy : {
      xtype : 'HttpProxy',
      method : 'GET',
      url : baseURL + '/Roo/Core_domain.php',
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
              'name': 'match_regex',
              'type': 'string'
          }
      ],
      id : 'id',
      root : 'data',
      totalProperty : 'total',
      xns : Roo.data,
      '|xns' : 'Roo.data'
     }
    },
    colModel : [
     {
      xtype : 'ColumnModel',
      dataIndex : 'domain',
      header : _this._strings['eae639a70006feff484a39363c977e24'] /* Domain */,
      renderer : function(v, x, r) {
          var format = "{0}";
          if(
              !(r.data.has_mx * 1) && 
              r.data.mx_updated.format('Y-m-d H:i:s') !== '1000-01-01 00:00:00'
          ) {
              format = "<span style='color:red;'>{0}</span>";
              var noMxDt = r.data.no_mx_dt.format('Y-m-d H:i:s'); 
              if(noMxDt !== '1000-01-01 00:00:00') {
                  format = "<span style='color:red;' qtip ='No MX since " + noMxDt + "'>{0}</span>";
              }
          }
          return String.format(format, v);
      },
      sortable : true,
      width : 200,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'mx_updated',
      header : _this._strings['9732d2a193579388e6d9138368554966'] /* MX Last Updated */,
      renderer : function(v) {
          return String.format('{0}', v ? v.format("Y-m-d H:i:s")  : ''); 
      },
      sortable : true,
      width : 120,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'person_reference_count',
      header : _this._strings['6aa48f150b0d29138ab848a1d4e6792c'] /* No. of references */,
      renderer : function(v) {
          return String.format('{0}', v); 
      },
      sortable : true,
      width : 100,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     }
    ]
   }
  };  }
});
