//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminCoreEnum = {

 _strings : {
  '2df80d5febcde0c10a66818488622b7c' :"Pulldown Options",
  'd1228f5476d15142b1358ae4b5fa2454' :"Order #",
  '7af54708cf5a4286cf0cfa58ff5148a8' :"Internal #",
  'b48968e1c912da07df5e8d6d246291ec' :"Display Name",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  '510bc6e58593b2b8002c9fe0c21f3fde' :"Displaying core_enum{0} - {1} of {2}",
  '1ba4d808fc7b27a7f60ce2ff75a8af3a' :"No core_enum found",
  'd9ec74f5aa29ceef6bf7b45f7fec5d0f' :"Add Value",
  '49ee3087348e8d44e1feda1917443987' :"Name",
  '4d3d769b812b6faa6b76e1a8abaece2d' :"Active",
  'e0aa021e21dddbd6d8cecec71e9cf564' :"OK"
 },

 dialog : false,
 callback:  false,

 show : function(data, cb)
 {
  if (!this.dialog) {
   this.create();
  }

  this.callback = cb;
  this.data = data;
  this.dialog.show(this.data._el);
  if (this.form) {
   this.form.reset();
   this.form.setValues(data);
   this.form.fireEvent('actioncomplete', this.form,  { type: 'setdata', data: data });
  }

 },

 create : function()
 {
   var _this = this;
   this.dialog = Roo.factory({
    xtype : 'LayoutDialog',
    closable : false,
    height : 400,
    modal : true,
    resizable : false,
    title : _this._strings['2df80d5febcde0c10a66818488622b7c'] /* Pulldown Options */,
    width : 950,
    listeners : {
     show : function (_self)
      {
          if(!isAdmin && Pman.Tab.Hopedb){
              Roo.MessageBox.alert("Error", "Permission Denied", function(){
                  _this.dialog.hide();
              });
              return;
          }
          var name_hidden = false;
      
          if (typeof(_this.data._hide_name) != 'undefined') {
              name_hidden = true;
          
          }
          
        _this.grid.colModel.setHidden(1,name_hidden);
          _this.grid.footer.onClick('first');
      }
    },
    xns : Roo,
    '|xns' : 'Roo',
    center : {
     xtype : 'LayoutRegion',
     xns : Roo,
     '|xns' : 'Roo'
    },
    buttons : [
     {
      xtype : 'Button',
      text : _this._strings['ea4788705e6873b424c65e91c2846b19'] /* Cancel */,
      listeners : {
       click : function (_self, e)
        {
          _this.dialog.hide();
        }
      },
      xns : Roo,
      '|xns' : 'Roo'
     },
     {
      xtype : 'Button',
      text : _this._strings['e0aa021e21dddbd6d8cecec71e9cf564'] /* OK */,
      listeners : {
       click : function (_self, e)
        {
            var sel = _this.grid.selModel.getSelectedCell();
            if (!sel && _this.callback) {
                Roo.MessageBox.alert("Error", "Select an item");
                return;
            }
            
        
            if (_this.callback) {
                var rec = _this.grid.ds.getAt(sel[0]);
               _this.callback(rec.data);
           }
           _this.dialog.hide();
        }
      },
      xns : Roo,
      '|xns' : 'Roo'
     }
    ],
    items  : [
     {
      xtype : 'GridPanel',
      background : false,
      fitContainer : true,
      fitToframe : true,
      region : 'center',
      tableName : 'core_enum',
      title : _this._strings['2df80d5febcde0c10a66818488622b7c'] /* Pulldown Options */,
      listeners : {
       activate : function() {
            _this.panel = this;
            if (_this.grid) {
             //   _this.grid.footer.onClick('first');
            }
            
        }
      },
      xns : Roo,
      '|xns' : 'Roo',
      grid : {
       xtype : 'EditorGrid',
       autoExpandColumn : 'display_name',
       clicksToEdit : 1,
       loadMask : true,
       listeners : {
        afteredit : function (e)
         {
            e.record.commit();   
         },
        beforeedit : function (e)
         {
           
             // force fill in of name first.. (Except when it's hidden)
             if (typeof(_this.data._hide_name) != 'undefined') { 
                 if(e.field == 'display_name' && e.record.data.is_system_enum*1 == 1){
                     return ;
                 }
          
             }
             
             if(e.field == 'name' && e.record.data.is_system_enum*1 == 1){
                 Roo.log("block name?");
                 return false;
             }
         },
        cellclick : function (_self, rowIndex, columnIndex, e)
         {
         
                 var di = this.colModel.getDataIndex(columnIndex);
                 if (di != 'active') {
                     return;
                 }
                  
                 var rec = _this.grid.ds.getAt(rowIndex);
                 
                 rec.set('active', rec.data.active ? 0 : 1);
                 rec.commit();
                  
                 
         },
        render : function() 
         {
             _this.grid = this; 
             //_this.dialog = Pman.Dialog.FILL_IN
             if (_this.panel.active) {
            //    this.footer.onClick('first');
             }
         }
       },
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       footer : {
        xtype : 'PagingToolbar',
        displayInfo : true,
        displayMsg : _this._strings['510bc6e58593b2b8002c9fe0c21f3fde'] /* Displaying core_enum{0} - {1} of {2} */,
        emptyMsg : _this._strings['1ba4d808fc7b27a7f60ce2ff75a8af3a'] /* No core_enum found */,
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
          icon : Roo.rootURL + 'images/default/dd/drop-add.gif',
          text : _this._strings['d9ec74f5aa29ceef6bf7b45f7fec5d0f'] /* Add Value */,
          listeners : {
           click : function()
            {
                
                // if we do not have a selected type... - what should we show..?
                var et = _this.data.etype;
                var ds = _this.grid.getDataSource();
                if (!et) {
                    Roo.MessageBox.alert("Error", "Select a pulldown");
                    return;
                }
            
                var add = ds.reader.newRow({    
                         id: 0, 
                         display_name : '', 
                         name : '', 
                         etype: et, 
                         active: 1, 
                         seqid: 0
                  });
                 var r = ds.data.length;
                ds.insert(r  , add);  
                
                var ec = 1;
                if (typeof(_this.data._hide_name) != 'undefined') { 
                    ec =2;
                }
                _this.grid.startEditing(r, ec); // name... 
            }
          },
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         },
         {
          xtype : 'Fill',
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         }
        ]
       },
       dataSource : {
        xtype : 'Store',
        remoteSort : true,
        sortInfo : { field : 'etype', direction: 'ASC' },
        listeners : {
         beforeload : function (_self, options)
          {
          
              options.params.etype = _this.data.etype;
              if (!options.params.etype.length) {
                  return false;
              }
          },
         update : function (_self, record, operation)
          {
              if (operation != Roo.data.Record.COMMIT) {
                  return;
              }
              Roo.log(record);
          
              if (typeof(_this.data._hide_name) != 'undefined') {
                  record.set('name', record.data.display_name);
              }
              if (!record.data.name.length) {
                  return;
              }
              
              // got commit..
              new Pman.Request({
                  url : baseURL + '/Roo/Core_enum.php',
                  method : 'POST',
                  params : {
                      id : record.data.id,
                      etype : _this.data.etype,
                      name :  record.data.name,
                      active : record.data.active,
                      seqid : record.data.seqid,
                      display_name : record.data.display_name
                  }, 
                  success : function(res) {
                      //Roo.log(data);
                      // update the ID if it's not set..
                      if (record.data.id * 1 < 1) {
                          record.set('id', res.data.id);
                      }
                  }
              });
              
          }
        },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         url : baseURL + '/Roo/core_enum.php',
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
                 'name': 'etype',
                 'type': 'string'
             },
             {
                 'name': 'name',
                 'type': 'string'
             },
             {
                 'name': 'active',
                 'type': 'int'
             },
             {
                 'name': 'seqid',
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
         dataIndex : 'id',
         header : _this._strings['7af54708cf5a4286cf0cfa58ff5148a8'] /* Internal # */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 75,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'name',
         header : _this._strings['49ee3087348e8d44e1feda1917443987'] /* Name */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         editor : {
          xtype : 'GridEditor',
          xns : Roo.grid,
          '|xns' : 'Roo.grid',
          field : {
           xtype : 'TextField',
           xns : Roo.form,
           '|xns' : 'Roo.form'
          }
         }
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'display_name',
         header : _this._strings['b48968e1c912da07df5e8d6d246291ec'] /* Display Name */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         editor : {
          xtype : 'GridEditor',
          xns : Roo.grid,
          '|xns' : 'Roo.grid',
          field : {
           xtype : 'TextField',
           xns : Roo.form,
           '|xns' : 'Roo.form'
          }
         }
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'active',
         header : _this._strings['4d3d769b812b6faa6b76e1a8abaece2d'] /* Active */,
         renderer : function(v) {  
             var state = v> 0 ?  '-checked' : '';
         
             return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                         
          },
         width : 75,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'seqid',
         header : _this._strings['d1228f5476d15142b1358ae4b5fa2454'] /* Order # */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 75,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         editor : {
          xtype : 'GridEditor',
          xns : Roo.grid,
          '|xns' : 'Roo.grid',
          field : {
           xtype : 'NumberField',
           allowDecimals : false,
           allowNegative : true,
           decimalPrecision : 0,
           xns : Roo.form,
           '|xns' : 'Roo.form'
          }
         }
        }
       ]
      }
     }
    ]
   });
 }
};
