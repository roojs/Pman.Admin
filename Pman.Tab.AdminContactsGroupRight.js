//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminContactsGroupRight = new Roo.XComponent({

 _strings : {
  '8444e81d652b084d70c71cd7d19ac0cf' :"Displaying Person{0} - {1} of {2}",
  '72670177480da92f72dc55e4aaff219b' :"Rights",
  'ec211f7c20af43e742bf2570c3cb84f9' :"Add",
  '7dce122004969d56ae2e0245cb754d35' :"Edit",
  '4110db87ce3ac86d603d03d691616b1e' :"Drag person to add or remove from group",
  '4d2d6b41cd520fa711073fffbfe81076' :"List/View",
  '6a0483c116671f74ffb653d4c85c4f55' :"Print/Export",
  'f1174ecbbc232f948717979daf04cf08' :"No Person found",
  'c9cc8cce247e49bae79f15173ce97354' :"Save",
  'b1c94ca2fbc3e78fc30069c8d0f01680' :"All",
  'e55f75a29310d7b60f7ac1d390c8ae42' :"Module",
  'ed5dea09095f671b801bee34ea28a319' :"Permission",
  'f2a6c498fb90ee345d997f888fce3b18' :"Delete"
 },

  part     :  ["Admin", "ContactsGroupRight" ],
  order    : '001-Pman.Tab.AdminContactsGroupRight',
  region   : 'center',
  parent   : 'Pman.Tab.AdminContactsManager',
  name     : "unnamed module",
  disabled : false, 
  permname : '', 
  _tree : function(_data)
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'GridPanel',
   autoScroll : true,
   background : true,
   fitContainer : true,
   fitToframe : true,
   region : 'center',
   tableName : 'Person',
   title : _this._strings['72670177480da92f72dc55e4aaff219b'] /* Rights */,
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
    ddGroup : 'groupDD',
    enableDrag : true,
    loadMask : true,
    listeners : {
     cellclick : function (_self, rowIndex, columnIndex, e)
      {
              _this.dataUpdate = typeof(_this.dataUpdate) =='undefined' ?  {} : _this.dataUpdate;
              
              var di = this.colModel.getDataIndex(columnIndex);
              var i = di.split('_').shift();
              var k = di.split('_').pop();
              if (i != 'accessmask') {
                  return;
              }
              var rec = _this.grid.ds.getAt(rowIndex);
              var fm = rec.data.FullMask.split('');        
              if(k == 'AA'){
      
                  Roo.each(fm, function(e){
                      rec.set(i+'_'+e, rec.data[i+'_'+k] ? 0 : 1);
                  });
              } 
              rec.set(i+'_'+k, rec.data[i+'_'+k] ? 0 : 1);
              
              var newmask = '';
              Roo.each(fm, function(e) {
                  if (rec.data[i+'_'+e] === 1) {
              
                      newmask += e;
                  }
              
              });        
              
              //rec.data.accessmask = rec.data.accessmask + rec
              //Roo.log(rec);
              _this.dataUpdate[rec.data.id] = newmask;
      
              //rec.commit();
               
              
      },
     render : function() 
      {
          _this.grid = this; 
          if (!_this.dialog) {
              _this.dialog = Pman.Dialog.PersonEdit;
              
          }
          //_this.dialog = Pman.Dialog.FILL_IN
          if (_this.panel.active) {
             this.footer.onClick('first');
          }
      }
    },
    xns : Roo.grid,
    '|xns' : 'Roo.grid',
    footer : {
     xtype : 'PagingToolbar',
     displayInfo : true,
     displayMsg : _this._strings['8444e81d652b084d70c71cd7d19ac0cf'] /* Displaying Person{0} - {1} of {2} */,
     emptyMsg : _this._strings['f1174ecbbc232f948717979daf04cf08'] /* No Person found */,
     pageSize : 25,
     xns : Roo,
     '|xns' : 'Roo',
     items  : [
      {
       xtype : 'TextItem',
       text : _this._strings['4110db87ce3ac86d603d03d691616b1e'] /* Drag person to add or remove from group */,
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar'
      }
     ]
    },
    toolbar : {
     xtype : 'Toolbar',
     xns : Roo,
     '|xns' : 'Roo',
     items  : [
      {
       xtype : 'Button',
       text : _this._strings['c9cc8cce247e49bae79f15173ce97354'] /* Save */,
       listeners : {
        click : function (_self, e)
         {
             
             var params = { group_id : _this.group_id };
             for(var i in _this.dataUpdate) {
                 params['dataUpdate[' + i + ']'] = _this.dataUpdate[i];
             }
             //Roo.log(params);return;
             
             new Pman.Request({
                 url : baseURL + '/Admin/GroupRights.php',
                 method :'POST',
                 mask: "Saving",
                 params : params,
                 success : function() {
                     // do nothing
                     
                     //_this.grid.ds.remove(record);
                     
                 },
                 failure : function() 
                 {
                     Roo.MessageBox.alert("Error", "saving failed", function() {
                         _this.grid.footer.onClick('first');
                     });
                 }
             });
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
     sortInfo : { field : 'id', direction: 'ASC' },
     listeners : {
      beforeload : function (_self, o)
       {
           if (!o.params) {
               o.params = {}
           }
               _this.group_id = -1;
           var s = Pman.Tab.AdminContactsGroup.grid.getSelectionModel().getSelections();
       
           if (!s.length) {
               o.params.group_id = -1;
           } else {
               o.params.group_id = s[0].data.id;
           }
           if (o.params.group_id < 0) {
               _this.grid.getView().el.mask("You can not set permissions for that group");
               return false;
           }
           _this.group_id = o.params.group_id;
           _this.grid.getView().el.unmask();
           return true;
         
       },
      load : function (_self, records, options)
       {
           _this.dataUpdate = {};
           var full = 'ADEPS'.split('');
           
           Roo.each(records, function(e){
               _this.dataUpdate[e.id] = e.data.accessmask;
           
               var k = e.data.accessmask.split('');
               var rm = e.data.FullMask.split('');
               
               Roo.each(full, function(ee){
                   if (rm.indexOf(ee) < 0) {
                       e.set('accessmask_'+ee, -1);          
                       return;
                   }
                   
                   e.set('accessmask_'+ee, (k.indexOf(ee) < 0) ? 0 : 1);
               });
               
               if(e.data.accessmask == e.data.FullMask){
                   e.set('accessmask_AA', 1);
               }
           });
       },
      update : function (_self, record, operation)
       {
           if (operation != 'commit') {
               return;
           }
           // only used to change active status.
           
           new Pman.Request({
               url : baseURL + '/Roo/GroupRights.php',
               method :'POST',
               params : {
                   id : record.data.id,
                   active: record.data.active
                   
               },
               success : function() {
                   // do nothing
                   
                   _this.grid.ds.remove(record);
                   
               },
               failure : function() 
               {
                   Roo.MessageBox.alert("Error", "saving failed", function() {
                       _this.grid.footer.onClick('first');
                   });
               }
           });
       }
     },
     xns : Roo.data,
     '|xns' : 'Roo.data',
     proxy : {
      xtype : 'HttpProxy',
      method : 'GET',
      url : baseURL + '/Admin/GroupRights.php',
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
              'name': 'rightname',
              'type': 'string'
          },
          {
              'name': 'descript',
              'type': 'string'
          },
          {
              'name': 'accessmask',
              'type': 'string'
          },
          {
              'name': 'FullMask',
              'type': 'string'
          },
          {
              'name': 'group_id',
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
    colModel : [
     {
      xtype : 'ColumnModel',
      dataIndex : 'accessmask_AA',
      header : _this._strings['b1c94ca2fbc3e78fc30069c8d0f01680'] /* All */,
      renderer : function(v,x,r) {
           
          var state = v> 0 ?  '-checked' : '';
      
          return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
      },
      sortable : false,
      width : 50,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'rightname',
      header : _this._strings['e55f75a29310d7b60f7ac1d390c8ae42'] /* Module */,
      renderer : function(v,x,r) {
          if(!v){
              return;
          }
          return String.format('<span qtip="{1}">{0}</span>', v.split('.').shift(), v);
      },
      sortable : false,
      width : 150,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'descript',
      header : _this._strings['ed5dea09095f671b801bee34ea28a319'] /* Permission */,
      renderer : function(v,x,r)
      {
          if (r.json.descript && r.json.descript.length) {
              return String.format('{0}',r.json.descript);
          }
          
          return '???' + v;
      },
      sortable : false,
      width : 300,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'accessmask_A',
      header : _this._strings['ec211f7c20af43e742bf2570c3cb84f9'] /* Add */,
      renderer : function(v) {  
          if (v < 0) {
              return '';
          }
          var state = v> 0 ?  '-checked' : '';
      
          return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                      
       },
      width : 75,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'accessmask_E',
      header : _this._strings['7dce122004969d56ae2e0245cb754d35'] /* Edit */,
      renderer : function(v) {  
         if (v < 0) {
              return '';
          }
          var state = v> 0 ?  '-checked' : '';
      
          return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                      
       },
      width : 75,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'accessmask_D',
      header : _this._strings['f2a6c498fb90ee345d997f888fce3b18'] /* Delete */,
      renderer : function(v) {  
          if (v < 0) {
              return '';
          }
          var state = v> 0 ?  '-checked' : '';
      
          return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                      
       },
      width : 75,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'accessmask_S',
      header : _this._strings['4d2d6b41cd520fa711073fffbfe81076'] /* List/View */,
      renderer : function(v) {  
          
          if (v < 0) {
              return '';
          }
          var state = v> 0 ?  '-checked' : '';
      
          return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                      
       },
      width : 75,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'accessmask_P',
      header : _this._strings['6a0483c116671f74ffb653d4c85c4f55'] /* Print/Export */,
      renderer : function(v,x,r) {  
          
          
          if (v < 0) {
              return '';
          }
          var state = v> 0 ?  '-checked' : '';
      
          return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                      
       },
      width : 75,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     }
    ]
   }
  };  }
});
