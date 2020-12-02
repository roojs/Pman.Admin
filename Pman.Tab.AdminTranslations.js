//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminTranslations = new Roo.XComponent({

 _strings : {
  '0a52da7a03a6de3beefe54f8c03ad80d' :"Original",
  '0b8d92bc19b720bb1065649535463409' :"Translations",
  '69fd71b6f79260924a32a45850a13ab7' :"Translations (rescan this to update strings)",
  '9d1ead73e678fa2f51a70a933b0bf017' :"Not Found",
  '801ab24683a4a8c433c6eb40c48bcd9d' :"Download",
  '6dd08874f83507e9c7b23f1a46b7fa7c' :"Translation",
  'e3d388b2c43e5ba0905702620ae2abc1' :"Search for",
  'e2f9d206562d8f5ea421ad51100f7151' :"Displaying petition_entry{0} - {1} of {2}",
  'cd6ae20e52d83f601c5fa12b66f0f6d0' :"Rescan",
  '4d1c8263ba1036754f8db14a98f9f006' :"Reload",
  'f2a6c498fb90ee345d997f888fce3b18' :"Delete",
  '03c2e7e41ffc181a4e84080b4710e81e' :"New",
  '193cfc9be3b995831c6af2fea6650e60' :"Page",
  '1bc29b36f623ba82aaf6724fd3b16718' :"md5"
 },

  part     :  ["Admin", "Translations" ],
  order    : '950-Pman.Tab.AdminTranslations',
  region   : 'center',
  parent   : 'Pman.Tab.Admin',
  name     : "Admin - Translations",
  disabled : false, 
  permname : 'Admin.Translations', 
  _tree : function(_data)
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'NestedLayoutPanel',
   region : 'center',
   title : _this._strings['0b8d92bc19b720bb1065649535463409'] /* Translations */,
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
    west : {
     xtype : 'LayoutRegion',
     split : true,
     width : 450,
     xns : Roo,
     '|xns' : 'Roo'
    },
    items  : [
     {
      xtype : 'TreePanel',
      region : 'west',
      listeners : {
       render : function (_self)
        {
            _this.treepanel = _self;
        }
      },
      xns : Roo,
      '|xns' : 'Roo',
      toolbar : {
       xtype : 'Toolbar',
       xns : Roo,
       '|xns' : 'Roo',
       items  : [
        {
         xtype : 'Button',
         text : _this._strings['03c2e7e41ffc181a4e84080b4710e81e'] /* New */,
         listeners : {
          click : function (_self, e)
           {
               Pman.Dialog.AdminLanguagePick.show( {  }, function(lang) {
                   
                   new Pman.Request({
                       url : baseURL + '/Roo/core_templatestr',
                       method : 'POST',
                       params : {
                           _rescan : lang
                       }, 
                       success : function()
                       {
                           _this.treepanel.tree.getRootNode().reload();
                       }
                   });
               
               });
               
           }
         },
         xns : Roo.Toolbar,
         '|xns' : 'Roo.Toolbar'
        },
        {
         xtype : 'Separator',
         xns : Roo.Toolbar,
         '|xns' : 'Roo.Toolbar'
        },
        {
         xtype : 'Button',
         text : _this._strings['f2a6c498fb90ee345d997f888fce3b18'] /* Delete */,
         listeners : {
          click : function (_self, e)
           {
               var tree = _this.treepanel.tree;
               var sn  = tree.getSelectionModel().getSelectedNode();
           
               if (!sn || typeof(sn.attributes.language) == 'undefined' || !sn.attributes.language) {
                   Roo.MessageBox.alert("Error", "Select a language");
                   return;
               }
           
                Roo.MessageBox.confirm("Confirm", "Are sure you want to delete the language", function (v){
                       if (v != 'yes') {
                           return;
                       }
                       Roo.MessageBox.alert("Not yet", "not done yet");
                       return;
                       
                       
                       
                       
                   });
           }
         },
         xns : Roo.Toolbar,
         '|xns' : 'Roo.Toolbar'
        },
        {
         xtype : 'Separator',
         xns : Roo.Toolbar,
         '|xns' : 'Roo.Toolbar'
        },
        {
         xtype : 'Button',
         text : _this._strings['cd6ae20e52d83f601c5fa12b66f0f6d0'] /* Rescan */,
         listeners : {
          click : function (_self, e)
           {
               var tree = _this.treepanel.tree;
               Roo.log(tree);
               var sn  = tree.getSelectionModel().getSelectedNode();
           
               if (!sn) {
                   Roo.MessageBox.alert("Error", "Select a node");
                   return;
               }
               
               var syncTemplate = function(){
                   new Pman.Request({
                       url : baseURL + '/Admin/UpdateBjsTemplates',
                       method : 'GET',
                       mask : 'Processing...',
                       timeout : 9000000,
                       success : function()
                       {
                           _this.treepanel.tree.getRootNode().reload();
                       }
                   });
               
               };
               
               
               var syncLanguage = function(){
                   new Pman.Request({
                       url : baseURL + '/Roo/Core_templatestr',
                       method : 'POST',
                       mask : 'Processing...',
                       params : {
                           _rescan : sn.attributes.id.split(':')[1]
                       }, 
                       success : function()
                       {
                           _this.treepanel.tree.getRootNode().reload();
                       }
                   });
               };
               
               if(typeof(sn.isRoot) != 'undefined' && sn.isRoot){
                   syncTemplate();
                   return;
               }
               
               if(typeof(sn.attributes.language) != 'undefined' && sn.attributes.language){
                   syncLanguage();
                   return;
               }
               
               
               
               
               
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
         text : _this._strings['801ab24683a4a8c433c6eb40c48bcd9d'] /* Download */,
         listeners : {
          click : function (_self, e)
           {
               var tree = _this.treepanel.tree;
           
               var sn  = tree.getSelectionModel().getSelectedNode();
               
               p = {
                   csvCols : 'src_id_mdsum,template_id_view_name,template_id_template,src_id_txt,lang,txt',
                   csvTitles : 'Code,Module,Template,Original,Language,Translation',
                   limit : 9999,
                   sort: 'template_id_view_name,template_id_template,src_id_txt',
                   dir: 'ASC'
               };
               if (!sn ||  sn.id == 'transtree') {
                   Roo.MessageBox.alert("Error", "Select language, module or page");
                   return;
               }
               if (typeof(sn.id) == 'number') {
                   p.template_id = sn.id;
           
               }
               if (sn.id.match(/^view:/)) {
                   var sns = sn.id.split(':');
                   p.lang = sns[1];
                   p.template_id_view_name = sns[2];
               }
               if (sn.id.match(/^lang:/)) {
                   var sns = sn.id.split(':');
                   p.lang = sns[1];
           
              }
               // transtree
               // view: {lang} : {view_name}
               // lang:
                
               new Pman.Download({
                   url : baseURL + '/Roo/Core_templatestr',
                   params : p,
                   method : 'GET' 
               });
               
               
               
               
               
           }
         },
         xns : Roo.Toolbar,
         '|xns' : 'Roo.Toolbar'
        },
        {
         xtype : 'Separator',
         xns : Roo.Toolbar,
         '|xns' : 'Roo.Toolbar'
        },
        {
         xtype : 'Button',
         text : _this._strings['4d1c8263ba1036754f8db14a98f9f006'] /* Reload */,
         listeners : {
          click : function (_self, e)
           {
               _this.treepanel.tree.getRootNode().reload();
               
           }
         },
         xns : Roo.Toolbar,
         '|xns' : 'Roo.Toolbar'
        }
       ]
      },
      tree : {
       xtype : 'TreePanel',
       containerScroll : false,
       rootVisible : true,
       xns : Roo.tree,
       '|xns' : 'Roo.tree',
       root : {
        xtype : 'AsyncTreeNode',
        id : 'transtree',
        text : _this._strings['69fd71b6f79260924a32a45850a13ab7'] /* Translations (rescan this to update strings) */,
        xns : Roo.tree,
        '|xns' : 'Roo.tree'
       },
       selModel : {
        xtype : 'DefaultSelectionModel',
        listeners : {
         selectionchange : function (_self, node)
          {
              Roo.log(node);
              
              //if (node.id.split('/').length < 2) {
              //    return;
             // }
              (function() {
                  _this.grid.footer.onClick('first');
              }).defer(100);
              
          }
        },
        xns : Roo.tree,
        '|xns' : 'Roo.tree'
       },
       loader : {
        xtype : 'TreeLoader',
        baseParams : { _tree : 1 },
        dataUrl : baseURL + '/Roo/Core_templatestr',
        requestMethod : 'GET',
        listeners : {
         beforeload : function (This, node, callback)
          {
              // set some params.
              Roo.log(node);
              this.baseParams._tree = 1;
              
              //this.baseParams.category = node.attributes.category;
          },
         loadexception : function (This, node, response)
          {
              Roo.MessageBox.alert("Error", "Problem loading tree");
          }
        },
        xns : Roo.tree,
        '|xns' : 'Roo.tree'
       }
      }
     },
     {
      xtype : 'GridPanel',
      background : false,
      fitContainer : true,
      fitToframe : true,
      region : 'center',
      tableName : 'Page',
      title : _this._strings['193cfc9be3b995831c6af2fea6650e60'] /* Page */,
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
       xtype : 'EditorGrid',
       autoExpandColumn : 'txt',
       clicksToEdit : 1,
       loadMask : true,
       listeners : {
        afteredit : function (e)
         {
             e.record.commit();
         },
        beforeedit : function (e)
         {   
             /*if (e.record.data.src_id_txt.indexOf('<') > -1) {
                // console.log("HTML EDITOR!!");
                 Pman.Dialog.CmsTranslateEditor.show(e.record);
                 return false;
             }*/
             
             var str=e.record.data.src_id_txt;
             var patt=/{(.*?)}/g;
             
             Roo.log(str.length);
             
             
             if(patt.test(str)){
                 e.cancel = true;
                 Pman.Dialog.AdminTranslateTemplates.show(e.record.data, function(v){
                     Roo.log(v);
                     e.value = v.txt;
                     e.record.set('txt', v.txt);
                     e.record.commit();
                 });
                 /*
                 Roo.MessageBox.prompt('WARNING', 'This text is with {TEMPLATE VARIABLE}, PLEASE BE CAREFUL EDITING. What\'s change? '+str, function(btn, text){
                     if (btn == 'ok'){
                         e.value = text;
                         e.record.set('txt', text);
                         e.record.commit();
                     }
                 });*/
                 return;
             }
             
             if(str.length > 150){
                 e.cancel = true;
                 Pman.Dialog.AdminTranslateTemplates.show(e.record.data, function(v){
                     e.value = v.txt;
                     e.record.set('txt', v.txt);
                     e.record.commit();
                 });
                 /*
                 Roo.MessageBox.prompt('WARNING', 'This text is with {TEMPLATE VARIABLE}, PLEASE BE CAREFUL EDITING. What\'s change? '+str, function(btn, text){
                     if (btn == 'ok'){
                         e.value = text;
                         e.record.set('txt', text);
                         e.record.commit();
                     }
                 });*/
                 return;
             }
             
         
             if (e.record.data.txt.replace(/\s+/, '').length) {
                 return true;
             }
             
             var tl = _this.treepanel.tree.getSelectionModel().getSelectedNode().parentNode.attributes.id;
             // mapping?
             
             tl = (tl == 'zh_HK') ? 'zh-TW' : tl;
             
             if (tl == 'en' && !e.value.length) {
         
                 e.value = e.record.data.src_id_txt;
                 e.record.set('txt', e.record.data.src_id_txt);
                 return true;
             }
             
             Pman.GoogleTranslate(e.record.data.src_id_txt, "en", tl, function(result) {
                // Roo.log(result);
                 _this.grid.activeEditor.setValue(result);
                 //console.log(result.translation);
             });
             
         
             
             return true;
         },
        render : function() 
         {
             _this.grid = this; 
             //_this.dialog = Pman.Dialog.FILL_IN
             if (_this.panel.active) {
                 this.footer.onClick('first');
               // this.ds.onc.onClick('first');
             }
         },
        rowdblclick : function (_self, rowIndex, e)
         {
             if (!_this.dialog) {
                 return;
             }
             _this.dialog.show( this.getDataSource().getAt(rowIndex).data, function() {
                 _this.grid.footer.onClick('first');
             }); 
         }
       },
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       footer : {
        xtype : 'PagingToolbar',
        displayInfo : true,
        displayMsg : _this._strings['e2f9d206562d8f5ea421ad51100f7151'] /* Displaying petition_entry{0} - {1} of {2} */,
        emptyMsg : _this._strings['9d1ead73e678fa2f51a70a933b0bf017'] /* Not Found */,
        pageSize : 100,
        xns : Roo,
        '|xns' : 'Roo'
       },
       toolbar : {
        xtype : 'Toolbar',
        xns : Roo,
        '|xns' : 'Roo',
        items  : [
         {
          xtype : 'TextField',
          emptyText : _this._strings['e3d388b2c43e5ba0905702620ae2abc1'] /* Search for */,
          listeners : {
           render : function (_self)
            {
                _this.searchBox = this;
            },
           specialkey : function (_self, e)
            {
            _this.grid.footer.onClick('first');
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
            _this.grid.footer.onClick('first');
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
                
                _this.grid.footer.onClick('first');
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
        sortInfo : { field : 'src_id_txt', direction: 'ASC' },
        listeners : {
         beforeload : function (_self, o)
          {
             
              var sn = _this.treepanel.tree.getSelectionModel().getSelectedNode();
          
              if (!sn || typeof(sn.attributes) == 'undefined' || typeof(sn.attributes.leaf) == 'undefined' || !sn.attributes.leaf) { 
                  _this.grid.ds.removeAll();
                  return false;
              }
          
              o.params = o.params || {};
              o.params.lang =  sn.parentNode.attributes.id.split(':')[1];
              o.params.template_id = sn.attributes.id * 1;
              o.params.active = 1;
              o.params['!src_id'] = 0;
              
              if (_this.searchBox && _this.searchBox.getValue().length) { 
                  o.params['_search_txt'] = _this.searchBox.getValue();
              }
              
              
              if(sn.attributes.on_table){
                  o.params.on_table = sn.attributes.on_table;
              }
              
          },
         update : function (_self, rec, operation)
          {
              Roo.log(operation);
              
              if (operation != 'commit') {
                  return;
              }
              
          
              _this.grid.getView().el.mask("Saving");
              new Pman.Request({
                  url : baseURL + '/Roo/Core_templatestr',
                  method: 'POST',
                  params : {
                      id : rec.get('id'),
                      txt : rec.get('txt')
                  },
                  success : function()
                  {
                      _this.grid.getView().el.unmask();
                          //g.getDataSource().reload();
                  },
                  failure : function()
                  {
                      _this.grid.getView().el.unmask();
                      Roo.MessageBox.alert("Error", "There was a problem saving the data - try reloading");
                   }
                      
              });
              
          }
        },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         url : baseURL + '/Roo/Core_templatestr.php',
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
                 'name': 'shortname',
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
       cm : [
        {
         xtype : 'ColumnModel',
         dataIndex : 'src_id_txt',
         header : _this._strings['0a52da7a03a6de3beefe54f8c03ad80d'] /* Original */,
         renderer : function(v,x,r) 
         {
             var c = '#666';
             if (r.data.updated  < r.data.src_id_updated) {
                 c = 'red';
             }
             
             return String.format('<div style="color:'+c+'";>{0}</div>', v)
         
         },
         width : 300,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'txt',
         header : _this._strings['6dd08874f83507e9c7b23f1a46b7fa7c'] /* Translation */,
         renderer : function(v,x,r) 
         { 
         
             var c = '#666';
             if (r.data.updated  < r.data.src_id_updated) {
                 c = 'red';
             }
             
             return String.format('<div style="color:'+c+'";>{0}</div>', v)
         
         },
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         editor : {
          xtype : 'GridEditor',
          xns : Roo.grid,
          '|xns' : 'Roo.grid',
          field : {
           xtype : 'TextField',
           allowBlank : false,
           xns : Roo.form,
           '|xns' : 'Roo.form'
          }
         }
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'src_id_mdsum',
         header : _this._strings['1bc29b36f623ba82aaf6724fd3b16718'] /* md5 */,
         hidden : true,
         renderer : function(v,x,r) 
         {
             return v ? v : '';
         
         },
         width : 250,
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
