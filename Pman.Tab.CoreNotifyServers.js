//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.CoreNotifyServers = new Roo.XComponent({

 _strings : {
  'ac659513b2353187192e88c5d1988228' :"Servers",
  'ec211f7c20af43e742bf2570c3cb84f9' :"Add",
  '2ddb157d4780e8883fbde96f354c57d2' :"Displaying Blacklists {0} - {1} of {2}",
  'c348b06d2667edd048ded3c1b1878cc1' :"Recurrent Notifications",
  '774ff60df30a64fad1d29f6c2daa8691' :"No Servers found",
  '2023301a71db57f37d50da7d045b881a' :"Displaying Servers {0} - {1} of {2}",
  'c5dd93dd1011986763b5925e0af25e08' :"No Blacklists found",
  'f29ddbfb905eb2593fdcdfb243f9af85' :"Added",
  'b26686c0a708faee42861d8b905e882e' :"Last Sent",
  '1203cd27e4d1ab6f1296728c021d9c1a' :"Is Active",
  'def36b726efed529b13ba240dd331a12' :"Pool",
  'be6838286e448ad65c5b55d690e2c38b' :"In Queue",
  '3fbcd320695e3a01273994471d09cc36' :"IPV6",
  '902b0d55fddef6f8d651fe1035b7d4bd' :"Error",
  'eae639a70006feff484a39363c977e24' :"Domain",
  'e3974584afa867d8619253bc669d6197' :"Notify Servers",
  '825bd435c12978e8492330c2a0d823db' :"Helo",
  '1063e38cb53d94d386f21227fcd84717' :"Remove",
  'ffbaae475d62dafea56ae75770f64595' :"Hostnamee"
 },

  part     :  ["Admin", "CoreNotifyServers" ],
  order    : '900-Pman.Tab.CoreNotifyServers',
  region   : 'center',
  parent   : 'Pman.Tab.AdminWatchNotify',
  name     : "Pman.Tab.CoreNotifyServers",
  disabled : false, 
  permname : '', 
  _tree : function(_data)
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'NestedLayoutPanel',
   background : true,
   region : 'center',
   title : _this._strings['e3974584afa867d8619253bc669d6197'] /* Notify Servers */,
   xns : Roo,
   '|xns' : 'Roo',
   layout : {
    xtype : 'BorderLayout',
    xns : Roo,
    '|xns' : 'Roo',
    center : {
     xtype : 'LayoutRegion',
     xns : Roo,
     '|xns' : 'Roo'
    },
    south : {
     xtype : 'LayoutRegion',
     height : 200,
     split : true,
     xns : Roo,
     '|xns' : 'Roo'
    },
    items  : [
     {
      xtype : 'NestedLayoutPanel',
      region : 'center',
      title : _this._strings['ac659513b2353187192e88c5d1988228'] /* Servers */,
      xns : Roo,
      '|xns' : 'Roo',
      layout : {
       xtype : 'BorderLayout',
       xns : Roo,
       '|xns' : 'Roo',
       center : {
        xtype : 'LayoutRegion',
        xns : Roo,
        '|xns' : 'Roo'
       },
       east : {
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
         region : 'center',
         tableName : 'core_notify_server',
         title : _this._strings['ac659513b2353187192e88c5d1988228'] /* Servers */,
         listeners : {
          activate : function() {
               _this.spanel = this;
               if (_this.sgrid) {
                   _this.sgrid.footer.onClick('first');
               }
           }
         },
         xns : Roo,
         '|xns' : 'Roo',
         grid : {
          xtype : 'Grid',
          autoExpandColumn : 'hostname',
          loadMask : true,
          listeners : {
           render : function() 
            {
                _this.sgrid = this; 
                //_this.dialog = Pman.Dialog.FILL_IN
                if (_this.spanel.active) {
                   this.footer.onClick('first');
                }
            },
           rowclick : function (_self, rowIndex, e)
            {
                (function() { 
                    _this.bgrid.footer.onClick('first');
                }).defer(100);
            },
           rowdblclick : function (_self, rowIndex, e)
            {
                
                Pman.Dialog.CoreNotifyServer.show(
                     this.getDataSource().getAt(rowIndex).data, function() {
                    _this.sgrid.footer.onClick('first');
                }); 
            }
          },
          xns : Roo.grid,
          '|xns' : 'Roo.grid',
          footer : {
           xtype : 'PagingToolbar',
           displayInfo : true,
           displayMsg : _this._strings['2023301a71db57f37d50da7d045b881a'] /* Displaying Servers {0} - {1} of {2} */,
           emptyMsg : _this._strings['774ff60df30a64fad1d29f6c2daa8691'] /* No Servers found */,
           pageSize : 25,
           xns : Roo,
           '|xns' : 'Roo'
          },
          toolbar : {
           xtype : 'Toolbar',
           xns : Roo,
           '|xns' : 'Roo',
           items  : [
            {
             xtype : 'Button',
             text : _this._strings['ec211f7c20af43e742bf2570c3cb84f9'] /* Add */,
             listeners : {
              click : function() 
               {
                   Pman.Dialog.CoreNotifyServer.show(
                        {}, function() {
                       _this.sgrid.footer.onClick('first');
                   }); 
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
             text : _this._strings['1063e38cb53d94d386f21227fcd84717'] /* Remove */,
             listeners : {
              click : function (_self, e)
               {
                      Pman.genericDelete(_this.spanel, 'core_notify_server');
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
           sortInfo : { field : 'hostname', direction: 'ASC' },
           listeners : {
            beforeload : function (_self, options)
             {
                options.params._with_queue_size  =1 ;
                 
             }
           },
           xns : Roo.data,
           '|xns' : 'Roo.data',
           proxy : {
            xtype : 'HttpProxy',
            method : 'GET',
            timeout : 120000,
            url : baseURL + '/Roo/core_notify_server',
            xns : Roo.data,
            '|xns' : 'Roo.data'
           },
           reader : {
            xtype : 'JsonReader',
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
            dataIndex : 'is_active',
            header : _this._strings['1203cd27e4d1ab6f1296728c021d9c1a'] /* Is Active */,
            renderer : function(v) {
                var state = v> 0 ?  '-checked' : '';
            
                return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
            },
            width : 100,
            xns : Roo.grid,
            '|xns' : 'Roo.grid'
           },
           {
            xtype : 'ColumnModel',
            dataIndex : 'hostname',
            header : _this._strings['ffbaae475d62dafea56ae75770f64595'] /* Hostnamee */,
            width : 150,
            xns : Roo.grid,
            '|xns' : 'Roo.grid'
           },
           {
            xtype : 'ColumnModel',
            dataIndex : 'helo',
            header : _this._strings['825bd435c12978e8492330c2a0d823db'] /* Helo */,
            width : 150,
            xns : Roo.grid,
            '|xns' : 'Roo.grid'
           },
           {
            xtype : 'ColumnModel',
            dataIndex : 'poolname',
            header : _this._strings['def36b726efed529b13ba240dd331a12'] /* Pool */,
            width : 150,
            xns : Roo.grid,
            '|xns' : 'Roo.grid'
           },
           {
            xtype : 'ColumnModel',
            dataIndex : 'in_queue',
            header : _this._strings['be6838286e448ad65c5b55d690e2c38b'] /* In Queue */,
            renderer : function(v,x,r) {
            
                return r.data.in_queue || 0;
            },
            width : 150,
            xns : Roo.grid,
            '|xns' : 'Roo.grid'
           },
           {
            xtype : 'ColumnModel',
            dataIndex : 'last_send',
            header : _this._strings['b26686c0a708faee42861d8b905e882e'] /* Last Sent */,
            renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y  H:i:s') : ''); },
            width : 120,
            xns : Roo.grid,
            '|xns' : 'Roo.grid'
           }
          ]
         }
        },
        {
         xtype : 'GridPanel',
         background : true,
         fitContainer : true,
         fitToframe : true,
         region : 'center',
         tableName : 'core_notify_server_ipv6',
         title : _this._strings['3fbcd320695e3a01273994471d09cc36'] /* IPV6 */,
         listeners : {
          activate : function() {
               _this.spanel = this;
               if (_this.sgrid) {
                   _this.sgrid.footer.onClick('first');
               }
           }
         },
         xns : Roo,
         '|xns' : 'Roo',
         grid : {
          xtype : 'Grid',
          autoExpandColumn : 'hostname',
          loadMask : true,
          listeners : {
           render : function() 
            {
                _this.sgrid = this; 
                //_this.dialog = Pman.Dialog.FILL_IN
                if (_this.spanel.active) {
                   this.footer.onClick('first');
                }
            },
           rowclick : function (_self, rowIndex, e)
            {
                (function() { 
                    _this.bgrid.footer.onClick('first');
                }).defer(100);
            },
           rowdblclick : function (_self, rowIndex, e)
            {
                
                Pman.Dialog.CoreNotifyServer.show(
                     this.getDataSource().getAt(rowIndex).data, function() {
                    _this.sgrid.footer.onClick('first');
                }); 
            }
          },
          xns : Roo.grid,
          '|xns' : 'Roo.grid',
          footer : {
           xtype : 'PagingToolbar',
           displayInfo : true,
           displayMsg : _this._strings['2023301a71db57f37d50da7d045b881a'] /* Displaying Servers {0} - {1} of {2} */,
           emptyMsg : _this._strings['774ff60df30a64fad1d29f6c2daa8691'] /* No Servers found */,
           pageSize : 25,
           xns : Roo,
           '|xns' : 'Roo'
          },
          toolbar : {
           xtype : 'Toolbar',
           xns : Roo,
           '|xns' : 'Roo',
           items  : [
            {
             xtype : 'Button',
             text : _this._strings['ec211f7c20af43e742bf2570c3cb84f9'] /* Add */,
             listeners : {
              click : function() 
               {
                   Pman.Dialog.CoreNotifyServer.show(
                        {}, function() {
                       _this.sgrid.footer.onClick('first');
                   }); 
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
             text : _this._strings['1063e38cb53d94d386f21227fcd84717'] /* Remove */,
             listeners : {
              click : function (_self, e)
               {
                      Pman.genericDelete(_this.spanel, 'core_notify_server');
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
           sortInfo : { field : 'hostname', direction: 'ASC' },
           listeners : {
            beforeload : function (_self, options)
             {
                options.params._with_queue_size  =1 ;
                 
             }
           },
           xns : Roo.data,
           '|xns' : 'Roo.data',
           proxy : {
            xtype : 'HttpProxy',
            method : 'GET',
            timeout : 120000,
            url : baseURL + '/Roo/core_notify_server',
            xns : Roo.data,
            '|xns' : 'Roo.data'
           },
           reader : {
            xtype : 'JsonReader',
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
            dataIndex : 'is_active',
            header : _this._strings['1203cd27e4d1ab6f1296728c021d9c1a'] /* Is Active */,
            renderer : function(v) {
                var state = v> 0 ?  '-checked' : '';
            
                return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
            },
            width : 100,
            xns : Roo.grid,
            '|xns' : 'Roo.grid'
           },
           {
            xtype : 'ColumnModel',
            dataIndex : 'hostname',
            header : _this._strings['ffbaae475d62dafea56ae75770f64595'] /* Hostnamee */,
            width : 150,
            xns : Roo.grid,
            '|xns' : 'Roo.grid'
           },
           {
            xtype : 'ColumnModel',
            dataIndex : 'helo',
            header : _this._strings['825bd435c12978e8492330c2a0d823db'] /* Helo */,
            width : 150,
            xns : Roo.grid,
            '|xns' : 'Roo.grid'
           },
           {
            xtype : 'ColumnModel',
            dataIndex : 'poolname',
            header : _this._strings['def36b726efed529b13ba240dd331a12'] /* Pool */,
            width : 150,
            xns : Roo.grid,
            '|xns' : 'Roo.grid'
           },
           {
            xtype : 'ColumnModel',
            dataIndex : 'in_queue',
            header : _this._strings['be6838286e448ad65c5b55d690e2c38b'] /* In Queue */,
            renderer : function(v,x,r) {
            
                return r.data.in_queue || 0;
            },
            width : 150,
            xns : Roo.grid,
            '|xns' : 'Roo.grid'
           },
           {
            xtype : 'ColumnModel',
            dataIndex : 'last_send',
            header : _this._strings['b26686c0a708faee42861d8b905e882e'] /* Last Sent */,
            renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y  H:i:s') : ''); },
            width : 120,
            xns : Roo.grid,
            '|xns' : 'Roo.grid'
           }
          ]
         }
        }
       ]
      }
     },
     {
      xtype : 'GridPanel',
      background : true,
      fitContainer : true,
      fitToframe : true,
      region : 'south',
      tableName : 'core_notify_recur',
      title : _this._strings['c348b06d2667edd048ded3c1b1878cc1'] /* Recurrent Notifications */,
      listeners : {
       activate : function() {
            _this.bpanel = this;
           
        }
      },
      xns : Roo,
      '|xns' : 'Roo',
      grid : {
       xtype : 'Grid',
       autoExpandColumn : 'error_str',
       loadMask : true,
       listeners : {
        render : function() 
         {
             _this.bgrid = this; 
             //_this.dialog = Pman.Dialog.FILL_IN
             
         }
       },
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       footer : {
        xtype : 'PagingToolbar',
        displayInfo : true,
        displayMsg : _this._strings['2ddb157d4780e8883fbde96f354c57d2'] /* Displaying Blacklists {0} - {1} of {2} */,
        emptyMsg : _this._strings['c5dd93dd1011986763b5925e0af25e08'] /* No Blacklists found */,
        pageSize : 25,
        xns : Roo,
        '|xns' : 'Roo'
       },
       toolbar : {
        xtype : 'Toolbar',
        xns : Roo,
        '|xns' : 'Roo',
        items  : [
         {
          xtype : 'Fill',
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         },
         {
          xtype : 'Button',
          text : _this._strings['1063e38cb53d94d386f21227fcd84717'] /* Remove */,
          listeners : {
           click : function (_self, e)
            {
                Pman.Delete.progress(_this.bpanel, 'core_notify_blacklist');
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
        sortInfo : { field : 'person_id_name', direction: 'ASC' },
        listeners : {
         beforeload : function (_self, opts)
          {
              if(!_this.sgrid.getSelectionModel().getSelected()) {
                  return false;
              }
              
              opts.params.server_id =    _this.sgrid.getSelectionModel().getSelected().data.id;
          }
        },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         url : baseURL + '/Roo/core_notify_blacklist',
         xns : Roo.data,
         '|xns' : 'Roo.data'
        },
        reader : {
         xtype : 'JsonReader',
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
         dataIndex : 'added_dt',
         header : _this._strings['f29ddbfb905eb2593fdcdfb243f9af85'] /* Added */,
         renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y H:i:s') : ''); },
         sortable : true,
         width : 120,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'domain_id_domain',
         header : _this._strings['eae639a70006feff484a39363c977e24'] /* Domain */,
         sortable : true,
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'error_str',
         header : _this._strings['902b0d55fddef6f8d651fe1035b7d4bd'] /* Error */,
         sortable : true,
         width : 150,
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
