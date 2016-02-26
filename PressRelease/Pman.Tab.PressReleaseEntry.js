//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.PressReleaseEntry = new Roo.XComponent({

 _strings : {
  'cf665d20108543d49fca410b912cd2c3' :"(#Translation of)  - Headline",
  'ec211f7c20af43e742bf2570c3cb84f9' :"Add",
  '5a0f039d44c57a9b47cbd2505ec963a7' :"Add Translated release",
  'e3a17139bb26678a324baa72b69b96d4' :"Displaying pressrelease_entry{0} - {1} of {2}",
  '7dce122004969d56ae2e0245cb754d35' :"Edit",
  'ee466bd68fda0fe24a68d2ae95c3cccf' :"no#",
  '577d7068826de925ea2aec01dbadf5e4' :"Client",
  '2a73d657b6d37f556ee68e5231575b51' :"Publish Time",
  '9e5495bdd37ebf032f8174b7358352a8' :"Download Press releases",
  '236df51bb0e6416236e255b528346fca' :"Timezone",
  'f90c37083078653276bc49058e710233' :"Lang.",
  '01d78b8fc9c5d0667b1773f647c79463' :"Press Releases",
  'd12f84918a626e02bfb2a2cc8c8c3daa' :"No pressrelease_entry found",
  '6f15b8d4b7287d60a8ea3d1c5cbadc84' :"Words",
  '8c16cbebef45d87fd2b36ce69f46c526' :"Distributed",
  '4adaa93dd0e538c157d1bb9f44fe53cb' :"Rebuild Articles",
  'f2a6c498fb90ee345d997f888fce3b18' :"Delete",
  'b741fd0f757a1a9eae95a38169b9b8e3' :"Publish?"
 },

  part     :  ["PressRelease", "Entry" ],
  order    : '001-Pman.Tab.PressReleaseEntry',
  region   : 'center',
  parent   : 'Pman.Tab.PressReleaseTab',
  name     : "Press Releases",
  disabled : false, 
  permname : '', 
  _tree : function()
  {
   var _this = this;
   var MODULE = this;
   return {
   background : true,
   fitContainer : true,
   fitToframe : true,
   region : 'center',
   tableName : 'pressrelease_entry',
   title : _this._strings['01d78b8fc9c5d0667b1773f647c79463'] /* Press Releases */,
   xns : Roo,
   '|xns' : 'Roo',
   xtype : 'GridPanel',
   listeners : {
    activate : function() {
         _this.panel = this;
         if (_this.grid) {
          //   _this.grid.footer.onClick('first');
         }
     }
   },
   grid : {
    autoExpandColumn : 'headline',
    loadMask : true,
    xns : Roo.grid,
    '|xns' : 'Roo.grid',
    xtype : 'Grid',
    listeners : {
     render : function() 
      {
         _this.grid = this; 
          //_this.dialog = Pman.Dialog.FILL_IN
          if (_this.panel.active) {
         //    this.footer.onClick('first');
          }
      },
     rowdblclick : function (_self, rowIndex, e)
      {
           var s = _this.grid.getDataSource().getAt(rowIndex);
            
          Pman.Dialog.PressReleaseEdit.show(s.data, function() {
              _this.grid.footer.onClick('refresh');
            }); 
           
      }
    },
    footer : {
     displayInfo : true,
     displayMsg : _this._strings['e3a17139bb26678a324baa72b69b96d4'] /* Displaying pressrelease_entry{0} - {1} of {2} */,
     emptyMsg : _this._strings['d12f84918a626e02bfb2a2cc8c8c3daa'] /* No pressrelease_entry found */,
     pageSize : 25,
     xns : Roo,
     '|xns' : 'Roo',
     xtype : 'PagingToolbar',
     items  : [
      {
       text : _this._strings['9e5495bdd37ebf032f8174b7358352a8'] /* Download Press releases */,
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar',
       xtype : 'Button',
       listeners : {
        click : function (_self, e)
         {
           params = {
                'csvCols[0]' : 'id',
               'csvCols[1]' : 'client_id_name',
               'csvCols[2]' : 'language',
                'csvCols[3]' : 'publish_dt',
               'csvCols[4]' : 'publish_dt_tz',  
               'csvCols[5]' : 'headline',     
         
                'csvTitles[0]' : 'ID#',
               'csvTitles[1]' : 'Client',
               'csvTitles[2]' : 'language',
                'csvTitles[3]' : 'Publish',
               'csvTitles[4]' : 'Timezone',  
               'csvTitles[5]' : 'Headline',     
               
               'sort' : 'id',
               'dir' : 'DESC',
               'start' : 0,
               'limit' : 200
               
               
               
           };
            var sel = Pman.Tab.PressReleaseCompanies.grid.getSelectionModel().getSelected();
            if (sel) {
                 params.client_id = sel.data.id;
             }
          
          new Pman.Download({
             url: baseURL + '/Roo/pressrelease_entry.php',
             newWindow : false,
             params: params,
             success : function() {
                 Roo.MessageBox.alert("Complete", "File has downloaded");
             }
         });
                  Roo.MessageBox.alert("Downloading", "File should be downloading now - there is a maximum of 200 can be downloaded");
         
         }
       }
      }
     ]
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
            Pman.Dialog.PressReleaseEdit.show( { id : 0 } , function() {
               _this.grid.footer.onClick('first');
            }); 
         }
       }
      },
      {
       cls : 'x-btn-text-icon',
       icon : Roo.rootURL + 'images/default/dd/drop-add.gif',
       text : _this._strings['5a0f039d44c57a9b47cbd2505ec963a7'] /* Add Translated release */,
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar',
       xtype : 'Button',
       listeners : {
        click : function()
         {
             var s = _this.grid.getSelectionModel().getSelections();
             if (!s.length || (s.length > 1))  {
                 Roo.MessageBox.alert("Error", s.length ? "Select only one Row" : "Select a Row");
                 return;
             }
             
             Pman.Dialog.PressReleaseEdit.show( {id :  s[0].data.id, _translation_of : 1 } , function() {
                 _this.grid.footer.onClick('first');
             });  
         }
       }
      },
      {
       cls : 'x-btn-text-icon',
       icon : Roo.rootURL + 'images/default/tree/leaf.gif',
       text : _this._strings['7dce122004969d56ae2e0245cb754d35'] /* Edit */,
       xns : Roo,
       '|xns' : 'Roo',
       xtype : 'Button',
       listeners : {
        click : function()
         {
             var s = _this.grid.getSelectionModel().getSelections();
             if (!s.length || (s.length > 1))  {
                 Roo.MessageBox.alert("Error", s.length ? "Select only one Row" : "Select a Row");
                 return;
             }
             
             Pman.Dialog.PressReleaseEdit.show( _this.grid.getDataSource().getById(s[0].data.id), function() {
                 _this.grid.footer.onClick('first');
               }); 
             
         }
       }
      },
      {
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar',
       xtype : 'Fill'
      },
      {
       text : _this._strings['4adaa93dd0e538c157d1bb9f44fe53cb'] /* Rebuild Articles */,
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar',
       xtype : 'Button',
       listeners : {
        click : function (_self, e)
         {
             var s = _this.grid.getSelectionModel().getSelections();
             if (!s.length || (s.length > 1))  {
                 Roo.MessageBox.alert("Error", s.length ? "Select only one Row" : "Select a Row");
                 return;
             }
             
             new Pman.Request({
                 url : baseURL + '/PressRelease/View',
                 method : 'POST',
                 params : {
                     pid: s[0].data.id,
                     _rebuild: 1
                 },
                 success : function() {
                     // do nothing
                     Roo.MessageBox.alert('Rebuilded', 'Rebuild Search Complete.', function(){
                         _this.grid.footer.onClick('first');
                     });
                 },
                 failure : function() 
                 {
                     Roo.MessageBox.alert("Error", "saving failed", function() {
                         _this.grid.footer.onClick('first');
                     });
                 }
             });
             
         }
       }
      },
      {
       text : _this._strings['f2a6c498fb90ee345d997f888fce3b18'] /* Delete */,
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar',
       xtype : 'Button',
       listeners : {
        click : function (_self, e)
         {
             Pman.genericDelete(_this, 'pressrelease_entry');
         }
       }
      }
     ]
    },
    dataSource : {
     remoteSort : true,
     sortInfo : { field: 'id', direction: 'DESC' },
     xns : Roo.data,
     '|xns' : 'Roo.data',
     xtype : 'Store',
     listeners : {
      beforeload : function (_self, options)
       {
          var sel = Pman.Tab.PressReleaseCompanies.grid.getSelectionModel().getSelected();
          if (sel) {
               options.params.client_id = sel.data.id;
           }
           options.params['query[collapse_translation]'] = 1;
           options.params['query[with_distr_summary]'] = 1;
       },
      load : function (_self, records, options)
       {
          _this.grid.view.el.select('.press-release-edit-link', true).on('click', function() {
               // if you click on the translation.. you can edit it...
               var id = this.child('span').dom.textContent;
               
               //Roo.log(this);
               Pman.Dialog.PressReleaseEdit.show( { id : id}, function() {
                   _this.grid.footer.onClick('first');
                 });
          
          });
       }
     },
     proxy : {
      method : 'GET',
      url : baseURL + '/Roo/pressrelease_entry.php',
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
              'type': 'int'
          },
          {
              'name': 'client_id_name',
              'type': 'string'
          },
          {
              'name': 'language',
              'type': 'string'
          },
          {
              'name': 'publish_dt',
              'type': 'date',
              'dateFormat': 'Y-m-d H:i:s'
          },
          {
              'name': 'publish_dt_hour',
              'type': 'float'
          },
          {
              'name': 'publish_dt_tz',
              'type': 'float'
          },
          {
              'name': 'headline',
              'type': 'string'
          },
          {
              'name': 'content',
              'type': 'string'
          },
          {
              'name': 'content_data',
              'type': 'string'
          },
          {
              'name': 'content_links',
              'type': 'string'
          },
          {
              'name': 'updated',
              'type': 'string'
          },
          {
              'name': 'created',
              'type': 'string'
          },
          {
              'name': 'created_by',
              'type': 'int'
          },
          {
              'name': 'updated_by',
              'type': 'int'
          },
          {
              'name': 'owner_id',
              'type': 'int'
          },
          {
              'name': 'publish_status',
              'type': 'int'
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
      dataIndex : 'id',
      header : _this._strings['ee466bd68fda0fe24a68d2ae95c3cccf'] /* no# */,
      renderer : function(v) { return String.format('#{0}', v); },
      width : 35,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'client_id_name',
      header : _this._strings['577d7068826de925ea2aec01dbadf5e4'] /* Client */,
      renderer : function(v) { return String.format('{0}', v); },
      width : 75,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'language',
      header : _this._strings['f90c37083078653276bc49058e710233'] /* Lang. */,
      renderer : function(v,x,r) { 
      
      
         var ret =  [ String.format('{0}', v) ] ;
          
          Roo.each(r.json.children, function(ch) {
              ret.push( 
                String.format('{0}', ch.language) 
              );
              
              
          });
          return ret.join('<br/>');
           
          
      
      
      },
      width : 50,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'word_count',
      header : _this._strings['6f15b8d4b7287d60a8ea3d1c5cbadc84'] /* Words */,
      renderer : function(v,x,r) { 
      
         var ret =  [ v ] ;
          
          Roo.each(r.json.children, function(ch) {
              ret.push( ch.word_count )
              
              
          });
          return ret.join('<br/>');
           
          
      
      
      },
      width : 50,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'publish_dt',
      header : _this._strings['2a73d657b6d37f556ee68e5231575b51'] /* Publish Time */,
      renderer : function(v,x,r) { 
          
          
         var ret =  [ String.format('{0}', v ? v.format('d/M/Y H:i') : '') ] ;
          
          Roo.each(r.json.children, function(ch) {
              ret.push( 
                 String.format('{0}', ch.publish_dt ? Date.parseDate(ch.publish_dt, 'Y-m-d H:i:s').format('d/M/Y H:i') : '') 
              );
              
              
          });
          return ret.join('<br/>');
           
          
          
       
      },
      width : 150,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'publish_dt_tz',
      header : _this._strings['236df51bb0e6416236e255b528346fca'] /* Timezone */,
      renderer : function(v,x,r) { 
          var vv = 'GMT';
          if (v) {
              vv = 'GMT' + ((v > 0) ? '+' + v : v);
          } 
              
        
          var ret =  [vv] 
          
          Roo.each(r.json.children, function(ch) {
              ret.push( 
                  ch.publish_dt_tz ? 'GMT' + (( ch.publish_dt_tz > 0) ? '+' +  ch.publish_dt_tz :  ch.publish_dt_tz) : 'GMT'
              );
              
              
          });
          return ret.join('<br/>');
           
        
        
        },
      width : 75,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'headline',
      header : _this._strings['cf665d20108543d49fca410b912cd2c3'] /* (#Translation of)  - Headline */,
      renderer : function(v,x,r) { 
          //if (r.data.parent_id) {
          //        return String.format('... #{1} - {0}', v, r.data.parent_id); 
          //}
          if (!r.json.children.length) {
              return String.format('{0}', v); 
          }
          var ret =  [String.format('{0}', v) ] 
          
          Roo.each(r.json.children, function(ch) {
              ret.push( String.format('<span class="press-release-edit-link">' +
                   '#<span class="press-release-link-id">{0}</span> in {2} - {1}</span>',
                      ch.id, ch.headline,
                      Pman.I18n.toName('l', ch.language)
              ));
          });
          return ret.join('<br/>');
           
          
      },
      width : 200,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'publish_status',
      header : _this._strings['b741fd0f757a1a9eae95a38169b9b8e3'] /* Publish? */,
      renderer : function(v,x,r) {
         
          function toName(v) {
              switch (v*1) {
                  case 0: return "publish";
                  case 1: return "EMBARGOED";
                  case -1: return "DRAFT";
                  default : return '??' +v ;
              }
          }
         var ret =  [  toName(v)] ;
          
          Roo.each(r.json.children, function(ch) {
              ret.push( toName( ch.publish_status)); 
              
              
          });
          return ret.join('<br/>');
           
      },
      width : 75,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     },
     {
      dataIndex : 'dist_summary_all',
      header : _this._strings['8c16cbebef45d87fd2b36ce69f46c526'] /* Distributed */,
      renderer : function(v,x,r) {
          function row(d) {
              // "123,<red>/total
              var fn = '';
              var on = '';
              if (d.dist_summary_fail * 1 > 0) {
                  fn = ',<span style="color:red;font-face:bold">' + d.dist_summary_fail + '</span>';
              }
              if (d.dist_open_summary * 1 > 0) {
                  on = ',<span style="color:green;font-face:bold">' + d.dist_open_summary + '</span>';
              }
              return d.dist_summary_complete + fn + '/' + d.dist_summary_all + on;
          }
          var    ret = [ row(r.data) ] ;
           Roo.each(r.json.children, function(ch) {
              ret.push(   row(ch) );
              
          });
          return ret.join('<br/>');
          
      },
      width : 75,
      xns : Roo.grid,
      '|xns' : 'Roo.grid',
      xtype : 'ColumnModel'
     }
    ]
   }
  };  }
});
