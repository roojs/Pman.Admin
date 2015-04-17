//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminEnum = new Roo.XComponent({

 _strings : {
  '2df80d5febcde0c10a66818488622b7c' :"Pulldown Options",
  'd1228f5476d15142b1358ae4b5fa2454' :"Order #",
  'fdff10eac021dfbb69e9c38204237fdc' :"Add new pulldown list",
  '1206eb8aea05be4625371c9c12818785' :"Pulldown",
  '801ab24683a4a8c433c6eb40c48bcd9d' :"Download",
  '7af54708cf5a4286cf0cfa58ff5148a8' :"Internal #",
  'be53a0541a6d36f6ecb879fa2c584b08' :"Image",
  'b48968e1c912da07df5e8d6d246291ec' :"Display Name",
  '510bc6e58593b2b8002c9fe0c21f3fde' :"Displaying core_enum{0} - {1} of {2}",
  '1ba4d808fc7b27a7f60ce2ff75a8af3a' :"No core_enum found",
  'c550aeed26e71a81a88360c1889245ab' :"Upload Values",
  'd9ec74f5aa29ceef6bf7b45f7fec5d0f' :"Add Value",
  'b9c49611cfda3259a2b837b39489e650' :"Add Image",
  '4d3d769b812b6faa6b76e1a8abaece2d' :"Active",
  '49ee3087348e8d44e1feda1917443987' :"Name",
  '7215ee9c7d9dc229d2921a40e899ec5f' :" "
 },

  part     :  ["Admin", "Enum" ],
  order    : '500-Pman.Tab.AdminEnum',
  region   : 'center',
  parent   : 'Pman.Tab.Admin',
  name     : "Pman.Tab.AdminEnum",
  disabled : false, 
  permname : '', 
  _tree : function()
  {
   var _this = this;
   var MODULE = this;
   return {
   layout : {
    west : {
     '|xns' : 'Roo',
     split : true,
     width : 200,
     xns : Roo,
     xtype : 'LayoutRegion'
    },
    center : {
     '|xns' : 'Roo',
     xns : Roo,
     xtype : 'LayoutRegion'
    },
    '|xns' : 'Roo',
    xns : Roo,
    xtype : 'BorderLayout',
    items : [
     {
      grid : {
       dataSource : {
        proxy : {
         '|xns' : 'Roo.data',
         method : 'GET',
         url : baseURL + '/Roo/core_enum.php',
         xns : Roo.data,
         xtype : 'HttpProxy'
        },
        reader : {
         '|xns' : 'Roo.data',
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
         xtype : 'JsonReader'
        },
        '|xns' : 'Roo.data',
        remoteSort : true,
        sortInfo : { field : 'etype', direction: 'ASC' },
        xns : Roo.data,
        xtype : 'Store',
        listeners : {
         beforeload : function (_self, o)
          {
              o.params['query[empty_etype]'] = 1; 
            
          },
         update : function (_self, record, operation)
          {
              if (operation != Roo.data.Record.COMMIT) {
                  return;
              }
              // got commit..
              new Pman.Request({
                  url : baseURL + '/Roo/Core_enum.php',
                  method : 'POST',
                  params : {
                      id : record.data.id,
                      etype : _this.grid.ds.getById(record.id).data.etype,
                      name : record.data.name,
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
        items : [

        ]

       },
       sm : {
        '|xns' : 'Roo.grid',
        xns : Roo.grid,
        xtype : 'CellSelectionModel',
        listeners : {
         selectionchange : function (_self, selection)
          {
              _this.grid.footer.onClick('first');
          }
        }
       },
       footer : {
        '|xns' : 'Roo',
        displayInfo : false,
        displayMsg : _this._strings['7215ee9c7d9dc229d2921a40e899ec5f'],
        emptyMsg : _this._strings['1ba4d808fc7b27a7f60ce2ff75a8af3a'],
        pageSize : 100,
        xns : Roo,
        xtype : 'PagingToolbar'
       },
       toolbar : {
        '|xns' : 'Roo',
        xns : Roo,
        xtype : 'Toolbar',
        items : [
         {
          '|xns' : 'Roo.Toolbar',
          cls : 'x-btn-text-icon',
          icon : Roo.rootURL + 'images/default/dd/drop-add.gif',
          text : _this._strings['fdff10eac021dfbb69e9c38204237fdc'],
          xns : Roo.Toolbar,
          xtype : 'Button',
          listeners : {
           click : function()
            {
                
                var data = {
                    active:1,
                    display_name:'',
                    etype:'',
                    name:''
                };
                Pman.Dialog.AdminEnumType.show(data,function(){
                    
                    _this.egrid.footer.onClick('first');
                });
                     
                     
            
            }
          }
         }
        ]

       },
       '|xns' : 'Roo.grid',
       autoExpandColumn : 'display_name',
       clicksToEdit : 1,
       loadMask : true,
       xns : Roo.grid,
       xtype : 'EditorGrid',
       colModel : [
         {
          '|xns' : 'Roo.grid',
          dataIndex : 'display_name',
          header : _this._strings['1206eb8aea05be4625371c9c12818785'],
          renderer : function(v,x,r) { 
          
          
              return String.format('<span qtip="{1}">{0}</span>', (''+v).length ? v : r.data.name, r.data.name); 
          },
          width : 200,
          xns : Roo.grid,
          xtype : 'ColumnModel'
         },
{
          '|xns' : 'Roo.grid',
          dataIndex : 'active',
          header : _this._strings['4d3d769b812b6faa6b76e1a8abaece2d'],
          renderer : function(v) {  
              var state = v> 0 ?  '-checked' : '';
          
              return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                          
           },
          width : 50,
          xns : Roo.grid,
          xtype : 'ColumnModel'
         }
       ],
       listeners : {
        afteredit : function (e)
         {
            e.record.commit();     
         },
        beforeedit : function (e)
         {
             if(e.field == 'name' && e.record.data.is_system_enum*1 == 1){
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
        celldblclick : function (_self, rowIndex, columnIndex, e)
         {
             var rec = _this.egrid.ds.getAt(rowIndex);
             Pman.Dialog.AdminEnumType.show(rec.data,function(){
                 
                 _this.egrid.footer.onClick('first');
             });
         },
        render : function() 
         {
             _this.egrid = this; 
             //_this.dialog = Pman.Dialog.FILL_IN
             if (_this.epanel.active) {
                this.footer.onClick('first');
             }
         }
       },
       items : [

       ]

      },
      '|xns' : 'Roo',
      background : false,
      region : 'west',
      tableName : 'core_enum',
      title : _this._strings['2df80d5febcde0c10a66818488622b7c'],
      xns : Roo,
      xtype : 'GridPanel',
      listeners : {
       activate : function() {
            _this.epanel = this;
            //if (_this.egrid) {
            //    _this.egrid.footer.onClick('first');
            //}
        }
      },
      items : [

      ]

     },
     {
      grid : {
       dataSource : {
        proxy : {
         '|xns' : 'Roo.data',
         method : 'GET',
         url : baseURL + '/Roo/core_enum.php',
         xns : Roo.data,
         xtype : 'HttpProxy'
        },
        reader : {
         '|xns' : 'Roo.data',
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
         xtype : 'JsonReader'
        },
        '|xns' : 'Roo.data',
        remoteSort : true,
        sortInfo : { field : 'etype', direction: 'ASC' },
        xns : Roo.data,
        xtype : 'Store',
        listeners : {
         beforeload : function (_self, options)
          {
          
              var s =     _this.egrid.getSelectionModel().getSelectedCell();
              
          
              if (!s) {
                  return false;
              }
              var d = _this.egrid.dataSource.getAt(s[0]);
              
              options.params.etype = d.data.name;
              options.params['query[search]'] = _this.searchBox.getValue();
              if (!options.params.etype.length) {
                  return false;
              }
          },
         update : function (_self, record, operation)
          {
              if (operation != Roo.data.Record.COMMIT) {
                  return;
              }
              // got commit..
              new Pman.Request({
                  url : baseURL + '/Roo/Core_enum.php',
                  method : 'POST',
                  params : {
                      id : record.data.id,
                      etype : _this.grid.ds.getById(record.id).data.etype,
                      name : record.data.name,
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
        items : [

        ]

       },
       footer : {
        '|xns' : 'Roo',
        displayInfo : true,
        displayMsg : _this._strings['510bc6e58593b2b8002c9fe0c21f3fde'],
        emptyMsg : _this._strings['1ba4d808fc7b27a7f60ce2ff75a8af3a'],
        pageSize : 25,
        xns : Roo,
        xtype : 'PagingToolbar',
        items : [
         {
          '|xns' : 'Roo.Toolbar',
          text : _this._strings['801ab24683a4a8c433c6eb40c48bcd9d'],
          xns : Roo.Toolbar,
          xtype : 'Button',
          listeners : {
           click : function (_self, e)
            {
                new Pman.Download({
                    grid : _this.grid
                });
                Roo.MessageBox.alert("Downloading", "File is downloading");
            }
          }
         },
         {
          '|xns' : 'Roo.Toolbar',
          text : _this._strings['c550aeed26e71a81a88360c1889245ab'],
          xns : Roo.Toolbar,
          xtype : 'Button',
          listeners : {
           click : function (_self, e)
            {
            
              var s =     _this.egrid.getSelectionModel().getSelectedCell();
                
            
                if (!s) {
                    Roo.MessageBox.alert("Error", "Select a pulldown");
                }
                
                var d = _this.egrid.dataSource.getAt(s[0]);
             
            
                var etype = d.data.name;
                
                if(!etype.length){
                    Roo.MessageBox.alert('Error', 'Please select a pulldown');
                    return;
                }
                
                Pman.Dialog.Image.show(
                   {
                        _url : baseURL+'/Admin/Import/Enum?' + Roo.urlEncode({'etype' : etype})
                    
                   },
                   function () {
                        _this.grid.footer.onClick('first');
                   }
               );
            }
          }
         }
        ]

       },
       toolbar : {
        '|xns' : 'Roo',
        xns : Roo,
        xtype : 'Toolbar',
        items : [
         {
          '|xns' : 'Roo.Toolbar',
          cls : 'x-btn-text-icon',
          icon : baseURL + '/Pman/templates/images/search.gif',
          text : _this._strings['d9ec74f5aa29ceef6bf7b45f7fec5d0f'],
          xns : Roo.Toolbar,
          xtype : 'Button',
          listeners : {
           click : function()
            {
                
                // if we do not have a selected type... - what should we show..?
                
                
                var s =     _this.egrid.getSelectionModel().getSelectedCell();
                
            
                if (!s) {
                    Roo.MessageBox.alert("Error", "Select a pulldown");
                }
                
                var d = _this.egrid.dataSource.getAt(s[0]);
             
            
                var ds = _this.grid.getDataSource();
            
                var add = ds.reader.newRow({    
                         id: 0, 
                         display_name : '', 
                         name : '', 
                         etype: d.data.name, 
                         active: 1, 
                         seqid: 0
                  });
                 var r = ds.data.length;
                ds.insert(r  , add);  
                _this.grid.startEditing(r, 1); // name... 
            }
          }
         },
         {
          '|xns' : 'Roo.Toolbar',
          cls : 'x-btn-text-icon',
          icon : Roo.rootURL + 'images/default/dd/drop-add.gif',
          text : _this._strings['b9c49611cfda3259a2b837b39489e650'],
          xns : Roo.Toolbar,
          xtype : 'Button',
          listeners : {
           click : function()
            {
                
                // if we do not have a selected type... - what should we show..?
                var et = _this.etypeCombo.getValue();
                
                if (!et) {
                    Roo.MessageBox.alert("Error", "Select a pulldown");
                    return;
                }
                var sc = _this.grid.getSelectionModel().getSelectedCell();
                Roo.log(sc);
                var ds = _this.grid.ds.getAt(sc[0]);
                if (!ds) {
                    Roo.MessageBox.alert("Error", "Select enum");
                    return;
                }
                
                Roo.log(ds);
                Pman.Dialog.AdminEnumImages.show({onid:ds.data.id}, function(){
                    _this.grid.footer.onClick('first');
                });
                
            }
          }
         },
         {
          '|xns' : 'Roo.form',
          fieldLabel : 'Search',
          name : 'search',
          xns : Roo.form,
          xtype : 'TextField',
          listeners : {
           render : function (_self)
            {
                _this.searchBox = this;
            }
          }
         },
         {
          '|xns' : 'Roo.Toolbar',
          cls : 'x-btn-icon',
          icon : rootURL + '/Pman/templates/images/search.gif',
          xns : Roo.Toolbar,
          xtype : 'Button',
          listeners : {
           click : function (_self, e)
            {
                _this.grid.footer.onClick('first');
            }
          }
         },
         {
          '|xns' : 'Roo.Toolbar',
          cls : 'x-btn-icon',
          icon : rootURL + '/Pman/templates/images/edit-clear.gif',
          xns : Roo.Toolbar,
          xtype : 'Button',
          listeners : {
           click : function (_self, e)
            {
                 _this.searchBox.setValue('');
                 _this.grid.footer.onClick('first');
            }
          }
         }
        ]

       },
       '|xns' : 'Roo.grid',
       autoExpandColumn : 'display_name',
       clicksToEdit : 1,
       loadMask : true,
       xns : Roo.grid,
       xtype : 'EditorGrid',
       colModel : [
         {
          '|xns' : 'Roo.grid',
          dataIndex : 'id',
          header : _this._strings['7af54708cf5a4286cf0cfa58ff5148a8'],
          renderer : function(v,x,r) { 
              var fmt = '{0}';
              if (r.selected) {
                  fmt = '<span style="color:orange;font-weight:bold;">{0}</span>';
              }
              return String.format(fmt, v); },
          sortable : true,
          width : 75,
          xns : Roo.grid,
          xtype : 'ColumnModel'
         },
{
          '|xns' : 'Roo.grid',
          dataIndex : 'images_id_id',
          header : _this._strings['be53a0541a6d36f6ecb879fa2c584b08'],
          renderer : function(v,x,r) { return String.format('<img src="{0}/Images/Thumb/25/{1}/{2}" width="25" height="25">', baseURL, v, r.data.images_id_filename); },
          width : 75,
          xns : Roo.grid,
          xtype : 'ColumnModel'
         },
{
          editor : {
           field : {
            '|xns' : 'Roo.form',
            xns : Roo.form,
            xtype : 'TextField'
           },
           '|xns' : 'Roo.grid',
           xns : Roo.grid,
           xtype : 'GridEditor',
           items : [

           ]

          },
          '|xns' : 'Roo.grid',
          dataIndex : 'name',
          header : _this._strings['49ee3087348e8d44e1feda1917443987'],
          renderer : function(v) { return String.format('{0}', v); },
          sortable : true,
          width : 200,
          xns : Roo.grid,
          xtype : 'ColumnModel',
          items : [

          ]

         },
{
          editor : {
           field : {
            '|xns' : 'Roo.form',
            xns : Roo.form,
            xtype : 'TextField'
           },
           '|xns' : 'Roo.grid',
           xns : Roo.grid,
           xtype : 'GridEditor',
           items : [

           ]

          },
          '|xns' : 'Roo.grid',
          dataIndex : 'display_name',
          header : _this._strings['b48968e1c912da07df5e8d6d246291ec'],
          renderer : function(v) { return String.format('{0}', v); },
          sortable : true,
          width : 200,
          xns : Roo.grid,
          xtype : 'ColumnModel',
          items : [

          ]

         },
{
          '|xns' : 'Roo.grid',
          dataIndex : 'active',
          header : _this._strings['4d3d769b812b6faa6b76e1a8abaece2d'],
          renderer : function(v) {  
              var state = v> 0 ?  '-checked' : '';
          
              return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                          
           },
          sortable : true,
          width : 75,
          xns : Roo.grid,
          xtype : 'ColumnModel'
         },
{
          editor : {
           field : {
            '|xns' : 'Roo.form',
            allowDecimals : false,
            allowNegative : true,
            decimalPrecision : 0,
            xns : Roo.form,
            xtype : 'NumberField'
           },
           '|xns' : 'Roo.grid',
           xns : Roo.grid,
           xtype : 'GridEditor',
           items : [

           ]

          },
          '|xns' : 'Roo.grid',
          dataIndex : 'seqid',
          header : _this._strings['d1228f5476d15142b1358ae4b5fa2454'],
          renderer : function(v) { return String.format('{0}', v); },
          sortable : true,
          sortable : true,
          width : 75,
          xns : Roo.grid,
          xtype : 'ColumnModel',
          items : [

          ]

         }
       ],
       listeners : {
        afteredit : function (e)
         {
            e.record.commit();     
         },
        beforeedit : function (e)
         {
             if(e.field == 'name' && e.record.data.is_system_enum*1 == 1){
                 return false;
             }
         },
        cellclick : function (_self, rowIndex, columnIndex, e)
         {
         
                 var di = this.colModel.getDataIndex(columnIndex);
                 var rec = _this.grid.ds.getAt(rowIndex);
                     
                 if (di == 'active') {
                     
                     rec.set('active', rec.data.active ? 0 : 1);
                     rec.commit();
                     return;
                 }
                 if (di == 'id' ) {
                     rec.selected = rec.selected ? 0 : 1;
                     rec.set('sel', rec.data.sel ? 0 : 1);
                 }
                  
         
                  
                 
         },
        keypress : function (e)
         {
             if(e.keyCode == 13){
                 _this.grid.footer.onClick('first');
             }
         },
        render : function() 
         {
             _this.grid = this; 
             //_this.dialog = Pman.Dialog.FILL_IN
             if (_this.panel.active) {
                this.footer.onClick('first');
             }
         }
       },
       items : [

       ]

      },
      '|xns' : 'Roo',
      background : false,
      fitToframe : true,
      region : 'center',
      tableName : 'core_enum',
      title : _this._strings['2df80d5febcde0c10a66818488622b7c'],
      xns : Roo,
      xtype : 'GridPanel',
      listeners : {
       activate : function() {
            _this.panel = this;
            if (_this.grid) {
                _this.grid.footer.onClick('first');
            }
        }
      },
      items : [

      ]

     }
    ]

   },
   '|xns' : 'Roo',
   region : 'center',
   title : _this._strings['2df80d5febcde0c10a66818488622b7c'],
   xns : Roo,
   xtype : 'NestedLayoutPanel',
   items : [

   ]

  };  }
});
