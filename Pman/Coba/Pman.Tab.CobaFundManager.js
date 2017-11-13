//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.CobaFundManager = new Roo.XComponent({

 _strings : {
  'cdb6b6bab1fd18b9dbfe3fb84a5d34ae' :"<i class=\"fa fa-search\"></i>",
  'b718adec73e04ce3ec720dd11a06a308' :"ID",
  'f9a6fb555aa3dd3b3fa8fa13420075a2' :"Fund Manager",
  'fd5293a712d172f5c556a83c62d44bd6' :"<i class=\"fa fa-plus\"></i> Add",
  '4d3d769b812b6faa6b76e1a8abaece2d' :"Active",
  '2efbd104fbdac27979de616938992e78' :"Fund Code",
  '422918621aa6642c26d5ee9222765ddf' :"Fund Name"
 },

  part     :  ["Coba", "FundManager" ],
  order    : '002-Pman.Tab.CobaFundManager',
  region   : 'center',
  parent   : 'Pman.Tab.Coba',
  name     : "unnamed module",
  disabled : false, 
  permname : '', 
  _tree : function(_data)
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'Grid',
   autoScroll : true,
   background : false,
   closable : false,
   fitContainer : true,
   fitToFrame : true,
   region : 'center',
   title : _this._strings['f9a6fb555aa3dd3b3fa8fa13420075a2'] /* Fund Manager */,
   listeners : {
    activate : function (_self)
     {
         if(_this.table) {
             
             _this.table.footer.onClick('first');
             
         }
         
         /*
         if(_this.delete_btn) {
             if(Pman.Login.authUser.groups.indexOf("Administrators") >=0) {
                 _this.delete_btn.show();
             } else {
                 _this.delete_btn.hide();
             }
         }
         */
     }
   },
   xns : Roo.bootstrap.panel,
   '|xns' : 'Roo.bootstrap.panel',
   toolbar : {
    xtype : 'NavSimplebar',
    xns : Roo.bootstrap,
    '|xns' : 'Roo.bootstrap',
    items  : [
     {
      xtype : 'NavGroup',
      style : 'width: 100%',
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap',
      items  : [
       {
        xtype : 'NavItem',
        style : 'width: 100%;',
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap',
        items  : [
         {
          xtype : 'Container',
          style : 'width: 100%;',
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap',
          items  : [
           {
            xtype : 'Row',
            style : 'padding: 10px;',
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap',
            items  : [
             {
              xtype : 'Column',
              md : 2,
              xns : Roo.bootstrap,
              '|xns' : 'Roo.bootstrap',
              items  : [
               {
                xtype : 'Input',
                xns : Roo.bootstrap,
                '|xns' : 'Roo.bootstrap',
                after : {
                 xtype : 'Button',
                 html : _this._strings['cdb6b6bab1fd18b9dbfe3fb84a5d34ae'] /* <i class="fa fa-search"></i> */,
                 xns : Roo.bootstrap,
                 '|xns' : 'Roo.bootstrap'
                }
               }
              ]
             },
             {
              xtype : 'Column',
              md : 7,
              xns : Roo.bootstrap,
              '|xns' : 'Roo.bootstrap'
             },
             {
              xtype : 'Column',
              md : 3,
              xns : Roo.bootstrap,
              '|xns' : 'Roo.bootstrap',
              items  : [
               {
                xtype : 'ButtonGroup',
                style : 'float: right',
                xns : Roo.bootstrap,
                '|xns' : 'Roo.bootstrap',
                items  : [
                 {
                  xtype : 'Button',
                  html : _this._strings['fd5293a712d172f5c556a83c62d44bd6'] /* <i class="fa fa-plus"></i> Add */,
                  listeners : {
                   click : function (_self, e)
                    {
                        Pman.Dialog.CobaFundManagerEdit.show({});
                    }
                  },
                  xns : Roo.bootstrap,
                  '|xns' : 'Roo.bootstrap'
                 }
                ]
               }
              ]
             }
            ]
           }
          ]
         }
        ]
       }
      ]
     }
    ]
   },
   grid : {
    xtype : 'Table',
    cls : 'table-fixed',
    footerShow : true,
    hover : true,
    loadMask : true,
    responsive : true,
    rowSelection : true,
    listeners : {
     render : function (_self)
      {
          _this.table = this;
      },
     rowdblclick : function (_self, el, rowIndex, e)
      {
          /*
          if (!Pman.Dialog.CobaInvestorModify) {
              return;
          }
          
          var row = _this.table.store.getAt(rowIndex);
          
          Pman.Dialog.CobaInvestorModify.show( {id : row.data.id}, function() {
              _this.table.footer.onClick('refresh');
          });
          */
      
      }
    },
    xns : Roo.bootstrap,
    '|xns' : 'Roo.bootstrap',
    footer : {
     xtype : 'PagingToolbar',
     pageSize : 15,
     xns : Roo.bootstrap,
     '|xns' : 'Roo.bootstrap'
    },
    store : {
     xtype : 'Store',
     remoteSort : true,
     sortInfo : {field: 'name', direction: 'ASC'},
     listeners : {
      beforeload : function (_self, o)
       {
           o.params = o.params || {};
           
           
           /*
           o.params._with_status= 1;
           o.params.deleted_by = 0;
          // o.params.limit =   _this.table.footer.pageSize *1; 
           
           var filter = _this.form.findField('search_filter').getValue();  
           if(filter !='') {
               o.params._search_filter = filter;
           }
           */
       
       }
     },
     xns : Roo.data,
     '|xns' : 'Roo.data',
     proxy : {
      xtype : 'HttpProxy',
      method : 'GET',
      url : baseURL + '/Roo/Modx_accountmgmts',
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
              'name': 'isin_code',
              'type': 'string'
          },
          {
              'name': 'name',
              'type': 'string'
          },
          {
              'name': 'is_active',
              'type': 'int'
          }
      ],
      id : 'id',
      totalProperty : 'total',
      xns : Roo.data,
      '|xns' : 'Roo.data'
     }
    },
    cm : [
     {
      xtype : 'ColumnModel',
      dataIndex : 'id',
      header : _this._strings['b718adec73e04ce3ec720dd11a06a308'] /* ID */,
      md : 3,
      sortable : true,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'isin_code',
      header : _this._strings['2efbd104fbdac27979de616938992e78'] /* Fund Code */,
      md : 3,
      sortable : true,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'name',
      header : _this._strings['422918621aa6642c26d5ee9222765ddf'] /* Fund Name */,
      md : 3,
      sortable : true,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'is_active',
      header : _this._strings['4d3d769b812b6faa6b76e1a8abaece2d'] /* Active */,
      md : 3,
      sortable : true,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     }
    ]
   }
  };  }
});
