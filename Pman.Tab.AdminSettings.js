//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminSettings = new Roo.XComponent({

 _strings : {
  '7dce122004969d56ae2e0245cb754d35' :"Edit",
  '7e17f8478e121357b78646ca5b5d5ac9' :"Displaying Settings  {0} - {1} of {2}",
  '689202409e48743b914713f96d93947c' :"Value",
  'e4709a73a287a5f033f5b1b5142cb74d' :"System Settings",
  '662de0725ac8055bff7edae51fbf3c78' :"No Settings Found",
  'f2a6c498fb90ee345d997f888fce3b18' :"Delete",
  'e55f75a29310d7b60f7ac1d390c8ae42' :"Module",
  '49ee3087348e8d44e1feda1917443987' :"Name",
  'b5a7adde1af5c87d7fd797b6245c2a39' :"Description"
 },

  part     :  ["Admin", "Settings" ],
  order    : '600-Pman.Tab.AdminSettings',
  region   : 'center',
  parent   : 'Pman.Tab.Admin',
  name     : "unnamed module",
  disabled : false, 
  permname : '', 
  _tree : function(_data)
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'GridPanel',
   background : true,
   fitContainer : true,
   fitToframe : true,
   region : 'center',
   title : _this._strings['e4709a73a287a5f033f5b1b5142cb74d'] /* System Settings */,
   listeners : {
    activate : function() {
         _this.panel = this;
      
         if (_this.grid) {
             _this.grid.footer.onClick('first');
         }
     }
   },
   xns : Roo,
   '|xns' : 'Roo',
   grid : {
    xtype : 'Grid',
    autoExpandColumn : 'name',
    loadMask : true,
    listeners : {
     render : function() 
      {
          _this.grid = this; 
          //_this.dialog = Pman.Dialog.FILL_IN
          if (_this.panel.active) {
             this.footer.onClick('first');
          }
      },
     rowdblclick : function (_self, rowIndex, e)
      {
          if (!_this.dialog) {
               return;
           }
          _this.dialog.show( this.getDataSource().getAt(rowIndex).data, function() {
              _this.grid.footer.onClick('refresh');
          }); 
      }
    },
    xns : Roo.grid,
    '|xns' : 'Roo.grid',
    footer : {
     xtype : 'PagingToolbar',
     displayInfo : true,
     displayMsg : _this._strings['7e17f8478e121357b78646ca5b5d5ac9'] /* Displaying Settings  {0} - {1} of {2} */,
     emptyMsg : _this._strings['662de0725ac8055bff7edae51fbf3c78'] /* No Settings Found */,
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
             if (!_this.dialog) {
                 return;
             }
             _this.dialog.show(s[0].data, function() {
                 _this.grid.footer.onClick('first');
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
       cls : 'x-btn-text-icon',
       icon : rootURL + '/Pman/templates/images/trash.gif',
       text : _this._strings['f2a6c498fb90ee345d997f888fce3b18'] /* Delete */,
       listeners : {
        click : function()
         {
              Pman.genericDelete(_this, 'core_setting'); 
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
     sortInfo : { field : 'name', direction: 'ASC' },
     listeners : {
      beforeload : function (_self, o)
       {
         
           o.params = o.params ? o.params : {};
           
          
       }
     },
     xns : Roo.data,
     '|xns' : 'Roo.data',
     proxy : {
      xtype : 'HttpProxy',
      method : 'GET',
      url : baseURL + '/Roo/core_setting',
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
    sm : {
     xtype : 'RowSelectionModel',
     singleSelect : true,
     listeners : {
      afterselectionchange : function (_self)
       {
           // load project members.
       }
     },
     xns : Roo.grid,
     '|xns' : 'Roo.grid'
    },
    colModel : [
     {
      xtype : 'ColumnModel',
      dataIndex : 'module',
      header : _this._strings['e55f75a29310d7b60f7ac1d390c8ae42'] /* Module */,
      sortable : true,
      width : 70,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'name',
      header : _this._strings['49ee3087348e8d44e1feda1917443987'] /* Name */,
      renderer : function(v) { return String.format('{0}', v); },
      width : 75,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'Description',
      header : _this._strings['b5a7adde1af5c87d7fd797b6245c2a39'] /* Description */,
      renderer : function(v) { return String.format('{0}', v); },
      sortable : true,
      width : 120,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'val',
      header : _this._strings['689202409e48743b914713f96d93947c'] /* Value */,
      renderer : function(v) { return String.format('{0}', v); },
      sortable : true,
      width : 200,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     }
    ]
   }
  };  }
});
