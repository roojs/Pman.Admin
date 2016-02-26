//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.PressReleaseDistribution = new Roo.XComponent({

 _strings : {
  '6bd6beac1da76b2d2a9c3b7914ba034c' :"Publication",
  'f77f8c0e4a05a384a886554d76cbd6b1' :"Import XLS",
  'f2a6c498fb90ee345d997f888fce3b18' :"Delete",
  '326185f4d4dfc0ef9df05d4de4ad5b5e' :"Displaying pressrelease_contact{0} - {1} of {2}",
  '754e1e134bc554a0af39749edbb59b9f' :"Job Title",
  '8cd0d0c99b062b3d22e8c7188ba33ab2' :"Show All",
  '99f1888871e14cbf8bca1cd8db21e400' :"No pressrelease_contact found",
  'b1b8216a01f7fec51609d6ab603a2678' :"Publication Scope",
  '7dce122004969d56ae2e0245cb754d35' :"Edit",
  '8e00ca0fe378bbb01e656c1e7b4c4cff' :"Select Job Type",
  '9d9547134d119ba7ea10eb67db6da7c6' :"Job Type",
  'ce8ae9da5b7cd6c3df2929543a9af92d' :"Email",
  'ed75712b0eb1913c28a3872731ffd48d' :"Duplicate",
  '12e28060a861b508cec510804b77a5ef' :"Journalist Contacts",
  'ec211f7c20af43e742bf2570c3cb84f9' :"Add",
  '080041a74a22e43b60dd8592afc6ee22' :"Select Media Type",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  '3c1df4260ce594cb5594696461087f2f' :"Select Country",
  '6ab9375e8f8108c11f21ab43d913e79c' :"Tel.",
  '20db0bfeecd8fe60533206a2b5e9891a' :"First name",
  '0f3826dedd3d37a53eaa3aaffbc0dc65' :"Publ. Name",
  'bea37067b23b94efbe261d48afe12c39' :"Media List Download",
  '904062c33353866aa5234f35ed29e114' :"Download Results",
  '2750dfebe7e01be17a0aaadf6b5effcc' :"Category Tree",
  '2b2edc156a7f3e035b3d234fee57daf2' :"All Contacts",
  '9475887273d313badb0bd602d137d055' :"Restore Saved Search",
  '21dfb254ef22912f7e12236f245751fe' :"Manage Categories",
  'cee41f552b98c04de1623e556fcf14f0' :"Select Publication Name",
  '59716c97497eb9694541f7c3d37b1a4d' :"Country",
  '5ca219b54399500b176823f866ee1383' :"Media Type",
  'b4e1a66c9679eccc7fa6a5dd36f4bbb8' :"Reload Tree",
  '1f96b7ecf6ec7e9ce1d960453af38752' :"News Beat(s)",
  'a7f0ba4d77215ad8a7ca74781933c94f' :"Family Name",
  'e55458ac9b2afe0910d1ed25115ec02c' :"Right Click on Item to add/edit ",
  'fd8fd9dc60679287f17bb085a8f3752b' :"Show Bad Addresses",
  '55842c6c0d769b6008f3d957b4d0b5cd' :"Save Search",
  '37812357a4cd25b17d95104efe022401' :"Publ. Lang",
  '3a2144c282d31ed1c7d57a7140fcf96d' :"Select Publication Language",
  '5a6c05f48afd958dcb5989bd66ed4783' :"Add / Edit Contacts"
 },

  part     :  ["PressRelease", "Distribution" ],
  order    : '800-Pman.Tab.PressReleaseDistribution',
  region   : 'center',
  parent   : 'Pman.Tab.ReleaseJournalistTab',
  name     : "Pman.Tab.PressReleaseDistribution",
  disabled : false, 
  permname : '', 
  _tree : function()
  {
   var _this = this;
   var MODULE = this;
   return {
   background : true,
   region : 'center',
   title : _this._strings['12e28060a861b508cec510804b77a5ef'] /* Journalist Contacts */,
   xns : Roo,
   '|xns' : 'Roo',
   xtype : 'NestedLayoutPanel',
   layout : {
    xns : Roo,
    '|xns' : 'Roo',
    xtype : 'BorderLayout',
    center : {
     tabPosition : 'top',
     xns : Roo,
     '|xns' : 'Roo',
     xtype : 'LayoutRegion'
    },
    west : {
     split : true,
     width : 200,
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
      tableName : 'pressrelease_contact',
      title : _this._strings['5a6c05f48afd958dcb5989bd66ed4783'] /* Add / Edit Contacts */,
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
       autoExpandColumn : 'lastname',
       loadMask : true,
       multiSort : true,
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       xtype : 'Grid',
       listeners : {
        render : function() 
         {
             _this.grid = this; 
             _this.dialog = Pman.Dialog.PressReleaseContact;
             if (_this.panel.active) {
                this.footer.onClick('first');
             }
         },
        rowdblclick : function (_self, rowIndex, e)
         {
             if (!_this.dialog) return;
             _this.dialog.show( this.getDataSource().getAt(rowIndex), function() {
                 _this.grid.footer.onClick('refresh');
             }); 
         }
       },
       footer : {
        displayInfo : true,
        displayMsg : _this._strings['326185f4d4dfc0ef9df05d4de4ad5b5e'] /* Displaying pressrelease_contact{0} - {1} of {2} */,
        emptyMsg : _this._strings['99f1888871e14cbf8bca1cd8db21e400'] /* No pressrelease_contact found */,
        pageSize : 25,
        xns : Roo,
        '|xns' : 'Roo',
        xtype : 'PagingToolbar',
        items  : [
         {
          text : _this._strings['9475887273d313badb0bd602d137d055'] /* Restore Saved Search */,
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Button',
          listeners : {
           click : function (_self, e)
            {
                    Pman.Dialog.PressReleaseSearch.show({}, function(data) {
                        
                    // code from beforeload
                        var o = Roo.decode(data);
                       // Roo.log(data);
            
                        _this.searchBox.setValue(typeof(o['query[search_name]']) =='undefined'  ? '' : o['query[search_name]']);
                        
                        
                        
                        var ar = [ 'publication_name', 'publication_lang' , 'country', 'category_media_id', 'role' ];
                        var val = '';
                        Roo.each(ar, function(a) {
                            if (typeof( _this[a + '_combo']) == 'undefined') {
                                Roo.log('missing ' + a );
                                return;
                            }
                            var el = _this[a + '_combo'];
                            // needs more thought...
                            if (typeof(o[a]) == 'undefined') {
                                el.setValue('');
                            }
                            if (['publication_lang' , 'country', 'category_media_id'].indexOf(a) < 0) {
                                el.setValue(o[a]);
                                return;
                            }
                            var d = {};
                            d[a] = o[a];
                            d[a+'_name'] = o[a+'_name'];
                            
                            el.setFromData( d);                // do clever crap...
            
                         });
                        // reset tree???
                        
                        var cid = typeof(o['query[category_id]']) == 'undefined' ? 0 : o['query[category_id]']*1;
                        _this.treepanel.tree.getSelectionModel().clearSelections();
                        if (!cid) {
                            _this.grid.footer.onClick('first');
                            return;
                        }
                        
                        // at this point we have to expand the tree to find the element we need..
                        var ar = o.category_id_parents;
                        ar.push(cid*1);
                        var t =  _this.treepanel.tree;
                        
                        function nodeHasChild(n, id) {
                            var match = false;
                            n.eachChild(function(cn) {
                               // Roo.log("Checking: " + cn.attributes.id + " for " + id);
                                if ((cn.attributes.id*1) == (id*1)) {
                                    match = cn;
                                    return false;
                                }
                            });
                          //  Roo.log("nodeHasChild " + id  + "=" + (match ? 'Y' : 'N'));
                            return match;
                        }
                        //Roo.log(ar);
                        var runv = 0;
                        function expand_or_select()
                        {
                            
                            runv++;
                            if (runv > 10) {
                               // Roo.log('oops');
                                return;
                            }
                            var n = t.root;
                            var expand = false;
                            
                            Roo.each(ar, function(id) {
                                var cn = nodeHasChild(n,id);
                                id = id *1;
                                if (!cn) {
                                    expand = n;
                                    return false;
                                }
                                if (id == cid) {
                                    n = cn;
                                    return false;
                                }
                                if (!n.isExpanded()) {
                                    expand = n;
                                    return false;
                                }
            
                                n = cn;
                            });
                            
                            
                            if (expand) {
                                //Roo.log('expand');
                                expand.expand(false, true, function() {
                                    expand_or_select();
                                });
                                return;
                            }
                            // n should now contain 'node that we want...'
                            
                            t.getSelectionModel().select(n);
                        
                           _this.grid.footer.onClick('first');  
                        }
                        
                        expand_or_select();
                        // = _this.treepanel.tree.getSelectionModel().
                        // has something been selected in the tree..
            
                    
                    });
                }
          }
         },
         {
          text : _this._strings['55842c6c0d769b6008f3d957b4d0b5cd'] /* Save Search */,
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Button',
          listeners : {
           click : function (_self, e)
            {
            
                options = {};
                
                
                    // code from beforeload
                options.params =     options.params || {};
                
                options.params['query[search_name]'] = _this.searchBox.getValue();
                
                var ar = [ 'publication_name', 'publication_lang' , 'country', 'category_media_id', 'role' ];
                var val = '';
                Roo.each(ar, function(a) {
                    if (typeof( _this[a + '_combo']) == 'undefined') {
                        Roo.log('missing ' + a );
                        return;
                    }
                    val = _this[a + '_combo'].getValue();
                    if ((new String(val)).length > 0) {
                        options.params[a] = val;
                        return;
                    }
                    if (_this[a + '_combo'].el.dom.value == '??') {
                        options.params['search[' + a +']'] = '??';
                    }
                 });
                
                
                // has something been selected in the tree..
                var id = 0;
                try {
                    id = _this.treepanel.tree.getSelectionModel().getSelectedNode().attributes.id;
                } catch (e) {}
                
                if (!isNaN(id) && id) {
                    options.params['query[category_id]'] = id;
                }
                options.params['query[_with_beats]'] = 1;
                
                // END from beforeload..
                
                Roo.MessageBox.confirm("Save Search", "Do you want to save this search?", function(r) {
                    if (r != 'yes') {
                        return;
                    }
                    
                    new Pman.Request({
                        url : baseURL + '/Roo/Pressrelease_search',
                        method : 'POST',
                        params : {
                            data : Roo.encode(options.params),
                            person_id : Pman.Login.authUser.id,
                        }
                    });
                    
                    
                });
                
                
                
            }
          }
         },
         {
          text : _this._strings['f77f8c0e4a05a384a886554d76cbd6b1'] /* Import XLS */,
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Button',
          listeners : {
           click : function (_self, e)
            {
                    Pman.Dialog.Image.show({
                        _url : baseURL + '/PressRelease/Import/Journalist'
                    
                    }, function (d) {
                        //Roo.log(d);
                        
                        Pman.Dialog.PressReleaseJournalistImport.show({
                            data:d
                         });
                
                    });
            }
          }
         },
         {
          text : _this._strings['904062c33353866aa5234f35ed29e114'] /* Download Results */,
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Button',
          listeners : {
           click : function (_self, e)
            {
                      /* csvCols[0] csvCols[1]....    = .... column titles for CSV output
                     * 
                     * csvTitles[0], csvTitles[1] ....  = columns to use for CSV output
                     *
                     * sort        = sort column (',' comma delimited)
                     * dir         = sort direction ?? in future comma delimited...
                     * limit       = limit number 
                     */
                     if (!Pman.Login.inGroup('Administrators')) {
                        Roo.MesssageBox.alert("Sorry", "This is only available for adminstrators");
                        return;
                        
                     }
                    var o = {};
                    _this.grid.ds.buildQuery(o);
                     
                     
                    var params = o.params;
                
                    var ar = []
                    var i = 0;
                    Roo.each(_this.grid.cm.config, function (o,l) {
                      switch (o.dataIndex) {
                            case 'phone' : 
                                params['csvTitles[' + i +']'] = "Phone";
                                params['csvCols[' + i +']'] = o.dataIndex;
                                break;
            
                            case 'country' : 
                                params['csvTitles[' + i +']'] = "Country";
                                params['csvCols[' + i +']'] = 'country_name';
                                break;
                                
                            default: 
                                params['csvCols[' + i +']'] = o.dataIndex;
                                params['csvTitles[' + i +']'] = o.header;
                                break;
                      }
            
                      
                      i++;
                      
                    });
            
                
            
                    params['csvCols[' + i +']'] = 'phone_mobile';
                    params['csvTitles[' +i  +']'] = "Mobile";
                    i++;
                    
                    params['csvCols[' + i +']'] = 'phone_direct';
                    params['csvTitles[' +i  +']'] = "Direct Line";
                    i++;
                     
                    params.limit = 9999;
                    params['sort'] = _this.grid.ds.sortOrder[0];
                    params.dir = 'ASC';
                    
                    
                    new Pman.Download({
                        url : baseURL + '/Roo/pressrelease_contact.php',
                        method : 'GET',
                        params : params
                        
                    
                    });
                    Roo.MessageBox.alert("Downloading", "Your report is downloading");
            }
          }
         },
         {
          text : _this._strings['bea37067b23b94efbe261d48afe12c39'] /* Media List Download */,
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Button',
          listeners : {
           click : function (_self, e)
            {
                     Pman.Dialog.PressReleaseMediaList.show({});
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
          width : 100,
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
            
                if (e.getCharCode() == 13) {
                    _this.grid.footer.onClick('first');
                }
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
          },
          menu : {
           xns : Roo.menu,
           '|xns' : 'Roo.menu',
           xtype : 'Menu',
           items  : [
            {
             text : _this._strings['8cd0d0c99b062b3d22e8c7188ba33ab2'] /* Show All */,
             xns : Roo.menu,
             '|xns' : 'Roo.menu',
             xtype : 'Item',
             listeners : {
              activate : function (_self)
               {
                   _this.show_bad_addr = false;
                   _this.grid.footer.onClick('first');
               }
             }
            },
            {
             text : _this._strings['fd8fd9dc60679287f17bb085a8f3752b'] /* Show Bad Addresses */,
             xns : Roo.menu,
             '|xns' : 'Roo.menu',
             xtype : 'Item',
             listeners : {
              activate : function (_self)
               {
                   _this.show_bad_addr = true;
                   _this.grid.footer.onClick('first');
               }
             }
            }
           ]
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
                _this.publication_name_combo.setValue('');
                _this.publication_lang_combo.setValue('');
                
                _this.country_ar_combo.reset();
                
                _this.category_media_id_combo.reset();
                _this.role_combo.reset();      
            
                // clear the tree..
                
                 Roo.each(_this.treepanel.tree.getChecked(), function(n) {
                        n.ui.checkbox.checked = false;
                        n.attributes.checked = false;
                  });
                  
                _this.grid.footer.onClick('first');
            }
          }
         },
         {
          alwaysQuery : false,
          displayField : 'publication_name',
          editable : true,
          emptyText : _this._strings['0f3826dedd3d37a53eaa3aaffbc0dc65'] /* Publ. Name */,
          forceSelection : true,
          listWidth : 200,
          loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
          minChars : 2,
          pageSize : 25,
          qtip : _this._strings['cee41f552b98c04de1623e556fcf14f0'] /* Select Publication Name */,
          queryParam : 'search[publication_name]',
          selectOnFocus : true,
          tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{publication_name}</b> </div>',
          triggerAction : 'all',
          typeAhead : true,
          valueField : 'publication_name',
          width : 120,
          xns : Roo.form,
          '|xns' : 'Roo.form',
          xtype : 'ComboBox',
          listeners : {
           beforeselect : function (combo, record, index)
            {
              _this.grid.footer.onClick.defer(100, _this.grid.footer,[ 'first' ]);
            },
           render : function (_self)
            {
                _this.publication_name_combo = _self;
            }
          },
          store : {
           remoteSort : true,
           sortInfo : { direction : 'ASC', field: 'publication_name' },
           xns : Roo.data,
           '|xns' : 'Roo.data',
           xtype : 'Store',
           listeners : {
            beforeload : function (_self, o){
                 o.params = o.params || {};
                 // set more here
                 o.params['_distinct'] = 'publication_name';
                 o.params['_columns'] = 'publication_name';
             }
           },
           proxy : {
            method : 'GET',
            url : baseURL + '/Roo/pressrelease_contact.php',
            xns : Roo.data,
            '|xns' : 'Roo.data',
            xtype : 'HttpProxy'
           },
           reader : {
            fields : [{"name":"id","type":"int"},{"name":"honor","type":"string"}],
            id : 'id',
            root : 'data',
            totalProperty : 'total',
            xns : Roo.data,
            '|xns' : 'Roo.data',
            xtype : 'JsonReader'
           }
          }
         },
         {
          alwaysQuery : true,
          displayField : 'publication_lang_name',
          editable : false,
          emptyText : _this._strings['37812357a4cd25b17d95104efe022401'] /* Publ. Lang */,
          forceSelection : true,
          listWidth : 200,
          loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
          minChars : 2,
          pageSize : 25,
          qtip : _this._strings['3a2144c282d31ed1c7d57a7140fcf96d'] /* Select Publication Language */,
          queryParam : 'search[publication_lang]',
          selectOnFocus : true,
          tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{publication_lang_name}</b> </div>',
          triggerAction : 'all',
          typeAhead : true,
          valueField : 'publication_lang',
          width : 120,
          xns : Roo.form,
          '|xns' : 'Roo.form',
          xtype : 'ComboBox',
          listeners : {
           beforeselect : function (combo, record, index)
            {
              _this.grid.footer.onClick.defer(100, _this.grid.footer,[ 'first' ]);
            },
           render : function (_self)
            {
              _this.publication_lang_combo = _self;
            }
          },
          store : {
           remoteSort : true,
           sortInfo : { direction : 'ASC', field: 'publication_lang_name' },
           xns : Roo.data,
           '|xns' : 'Roo.data',
           xtype : 'Store',
           listeners : {
            beforeload : function (_self, o){
                 o.params = o.params || {};
                 // set more here
                 o.params['_distinct'] = 'publication_lang';
                 o.params['_columns'] = 'publication_lang,publication_lang_name';
             }
           },
           proxy : {
            method : 'GET',
            url : baseURL + '/Roo/pressrelease_contact.php',
            xns : Roo.data,
            '|xns' : 'Roo.data',
            xtype : 'HttpProxy'
           },
           reader : {
            fields : [{"name":"id","type":"int"},{"name":"honor","type":"string"}],
            id : 'id',
            root : 'data',
            totalProperty : 'total',
            xns : Roo.data,
            '|xns' : 'Roo.data',
            xtype : 'JsonReader'
           }
          }
         },
         {
          alwaysQuery : true,
          displayField : 'country_name',
          editable : false,
          emptyText : _this._strings['59716c97497eb9694541f7c3d37b1a4d'] /* Country */,
          forceSelection : false,
          hiddenName : 'country',
          listWidth : 300,
          loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
          minChars : 2,
          pageSize : 999,
          qtip : _this._strings['3c1df4260ce594cb5594696461087f2f'] /* Select Country */,
          queryParam : 'search[country_name]',
          selectOnFocus : true,
          triggerAction : 'all',
          typeAhead : true,
          valueField : 'country',
          width : 120,
          xns : Roo.form,
          '|xns' : 'Roo.form',
          xtype : 'ComboCheck',
          listeners : {
           change : function (combo, record, index)
            {
              _this.grid.footer.onClick.defer(100, _this.grid.footer,[ 'first' ]);
            },
           render : function (_self)
            {
              _this.country_ar_combo = _self;
            }
          },
          store : {
           remoteSort : true,
           sortInfo : { direction : 'ASC', field: 'country_name'  },
           xns : Roo.data,
           '|xns' : 'Roo.data',
           xtype : 'Store',
           listeners : {
            beforeload : function (_self, o){
                 o.params = o.params || {};
                 // set more here
                 o.params['_distinct'] = 'country';
                 o.params['_with_country_name'] =1;
                 o.params['_columns'] = 'country_name,country';
             }
           },
           proxy : {
            method : 'GET',
            url : baseURL + '/Roo/pressrelease_contact.php',
            xns : Roo.data,
            '|xns' : 'Roo.data',
            xtype : 'HttpProxy'
           },
           reader : {
            fields : [{"name":"id","type":"int"},{"name":"honor","type":"string"}],
            id : 'id',
            root : 'data',
            totalProperty : 'total',
            xns : Roo.data,
            '|xns' : 'Roo.data',
            xtype : 'JsonReader'
           }
          }
         },
         {
          alwaysQuery : true,
          displayField : 'category_media_id_name',
          editable : false,
          emptyText : _this._strings['5ca219b54399500b176823f866ee1383'] /* Media Type */,
          forceSelection : false,
          hiddenName : 'category_media_id_name',
          listWidth : 300,
          loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
          minChars : 2,
          pageSize : 999,
          qtip : _this._strings['080041a74a22e43b60dd8592afc6ee22'] /* Select Media Type */,
          queryParam : 'search[category_media_id_name]',
          selectOnFocus : true,
          triggerAction : 'all',
          typeAhead : true,
          valueField : 'category_media_id',
          width : 120,
          xns : Roo.form,
          '|xns' : 'Roo.form',
          xtype : 'ComboCheck',
          listeners : {
           change : function (combo, record, index)
            {
              _this.grid.footer.onClick.defer(100, _this.grid.footer,[ 'first' ]);
            },
           render : function (_self)
            {
              _this.category_media_id_combo = _self;
            }
          },
          store : {
           remoteSort : true,
           sortInfo : { direction : 'ASC', field: 'category_media_id_name' },
           xns : Roo.data,
           '|xns' : 'Roo.data',
           xtype : 'Store',
           listeners : {
            beforeload : function (_self, o){
                 o.params = o.params || {};
                 // set more here
                 o.params['_distinct'] = 'category_media_id';
                 o.params['_columns'] = 'category_media_id_name,category_media_id';
             }
           },
           proxy : {
            method : 'GET',
            url : baseURL + '/Roo/pressrelease_contact.php',
            xns : Roo.data,
            '|xns' : 'Roo.data',
            xtype : 'HttpProxy'
           },
           reader : {
            fields : [{"name":"id","type":"int"},{"name":"honor","type":"string"}],
            id : 'id',
            root : 'data',
            totalProperty : 'total',
            xns : Roo.data,
            '|xns' : 'Roo.data',
            xtype : 'JsonReader'
           }
          }
         },
         {
          alwaysQuery : true,
          displayField : 'role',
          editable : false,
          emptyText : _this._strings['9d9547134d119ba7ea10eb67db6da7c6'] /* Job Type */,
          forceSelection : false,
          hiddenName : 'role',
          listWidth : 300,
          loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
          minChars : 2,
          pageSize : 999,
          qtip : _this._strings['8e00ca0fe378bbb01e656c1e7b4c4cff'] /* Select Job Type */,
          queryParam : 'search[role]',
          selectOnFocus : true,
          triggerAction : 'all',
          typeAhead : true,
          valueField : 'role',
          width : 120,
          xns : Roo.form,
          '|xns' : 'Roo.form',
          xtype : 'ComboCheck',
          listeners : {
           change : function (combo, record, index)
            {
              _this.grid.footer.onClick.defer(100, _this.grid.footer,[ 'first' ]);
            },
           render : function (_self)
            {
              _this.role_combo = _self;
            }
          },
          store : {
           remoteSort : true,
           sortInfo : { direction : 'ASC', field: 'role' },
           xns : Roo.data,
           '|xns' : 'Roo.data',
           xtype : 'Store',
           listeners : {
            beforeload : function (_self, o){
                 o.params = o.params || {};
                 // set more here
                 o.params['_distinct'] = 'role';
                 o.params['_columns'] = 'role';
             }
           },
           proxy : {
            method : 'GET',
            url : baseURL + '/Roo/pressrelease_contact.php',
            xns : Roo.data,
            '|xns' : 'Roo.data',
            xtype : 'HttpProxy'
           },
           reader : {
            fields : [{"name":"id","type":"int"},{"name":"honor","type":"string"}],
            id : 'id',
            root : 'data',
            totalProperty : 'total',
            xns : Roo.data,
            '|xns' : 'Roo.data',
            xtype : 'JsonReader'
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
          text : _this._strings['ec211f7c20af43e742bf2570c3cb84f9'] /* Add */,
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Button',
          listeners : {
           click : function()
            {
                if (!_this.dialog) return;
                _this.dialog.show( { id : 0 } , function() {
                    _this.grid.footer.onClick('first');
               }); 
            }
          }
         },
         {
          cls : 'x-btn-text-icon',
          icon : Roo.rootURL + 'images/default/tree/leaf.gif',
          text : _this._strings['ed75712b0eb1913c28a3872731ffd48d'] /* Duplicate */,
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
                if (!_this.dialog) return;
                
                var data = {};
                Roo.apply(data,s[0].data);
                data.id = 0;
                data.firstname = '';
                data.lastname = '';
                data.firstname_alt = '';
                data.lastname_alt = '';
                data.email = '';
                
                _this.dialog.show(data, function() {
                    _this.grid.footer.onClick('refresh');
                }); 
                
            }
          }
         },
         {
          cls : 'x-btn-text-icon',
          icon : Roo.rootURL + 'images/default/tree/leaf.gif',
          text : _this._strings['7dce122004969d56ae2e0245cb754d35'] /* Edit */,
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
                if (!_this.dialog) return;
                _this.dialog.show(s[0].data, function() {
                    _this.grid.footer.onClick('refresh');
                }); 
                
            }
          }
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
                 Pman.genericDelete(_this, 'pressrelease_contact'); 
            }
          }
         }
        ]
       },
       dataSource : {
        buildQuery : function(options) {
            options.params =     options.params || {};
            options.params['query[search_name]'] = _this.searchBox.getValue();
            
            
            var ar = [ 'publication_name', 'publication_lang'  ];
            var val = '';
            Roo.each(ar, function(a) {
                if (typeof( _this[a + '_combo']) == 'undefined') {
                    Roo.log('missing ' + a );
                    return;
                }
                val = _this[a + '_combo'].getValue();
                if ((new String(val)).length > 0) {
                    options.params[a] = val;
                    return;
                }
                if (_this[a + '_combo'].el.dom.value == '??') {
                    options.params['search[' + a +']'] = '??';
                }
             });
             options.params['search[role]'] =  _this.role_combo.getValue();  
             options.params['search[category_media_id]'] =  _this.category_media_id_combo.getValue();  
             options.params['search[country_ar]'] =  _this.country_ar_combo.getValue();  
        
             if (_this.show_bad_addr) {
                 options.params['query[bad_only]'] = 1;
             }
                 
            
        
            
            // has something been selected in the tree..
            // build members..
        
        
            try {
                var mem = {};
                Roo.each(_this.treepanel.tree.getChecked(), function(n) {
                    var pn = n.parentNode.attributes.id;
                    mem[pn] = mem[pn] || [];
                    mem[pn].push(n.attributes.id);
                
                });
                for (var m in mem) {
                    options.params['query[members]['+ m +']'] = mem[m].join(',');
                }
                
            } catch (e) {
                Roo.log('error building beat categories..');
                Roo.log(e);
            }
            
            options.params['query[_with_beats]'] = 1;
             
        },
        multiSort : true,
        remoteSort : true,
        sortInfo : { field : 'lastname', direction: 'ASC' },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        xtype : 'Store',
        listeners : {
         beforeload : function (_self, options)
          {
              this.buildQuery(options);
               
              options.params['query[with_failed_flag]'] = 1;
                   
          }
        },
        proxy : {
         method : 'GET',
         url : baseURL + '/Roo/pressrelease_contact.php',
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
                 'name': 'category_type_id',
                 'type': 'int'
             },
             {
                 'name': 'honor',
                 'type': 'string'
             },
             {
                 'name': 'name',
                 'type': 'string'
             },
             {
                 'name': 'name_alt',
                 'type': 'string'
             },
             {
                 'name': 'company_id_name',
                 'type': 'string'
             },
             {
                 'name': 'role',
                 'type': 'string'
             },
             {
                 'name': 'email',
                 'type': 'string'
             },
             {
                 'name': 'email_personal',
                 'type': 'string'
             },
             {
                 'name': 'phone',
                 'type': 'string'
             },
             {
                 'name': 'fax',
                 'type': 'string'
             },
             {
                 'name': 'address',
                 'type': 'string'
             },
             {
                 'name': 'category_media_id',
                 'type': 'int'
             },
             {
                 'name': 'submission_time',
                 'type': 'string'
             },
             {
                 'name': 'media_language',
                 'type': 'string'
             },
             {
                 'name': 'url',
                 'type': 'string'
             },
             {
                 'name': 'remarks',
                 'type': 'string'
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
         dataIndex : 'firstname',
         header : _this._strings['20db0bfeecd8fe60533206a2b5e9891a'] /* First name */,
         renderer : function(v,x,r) { 
             var d = r.data;
             if (d.firstname_alt.length) {
             
                 return String.format('{0} ({1})', d.firstname, d.firstname_alt ); 
             }
             return String.format('{0}', d.firstname); 
         },
         sortable : true,
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'lastname',
         header : _this._strings['a7f0ba4d77215ad8a7ca74781933c94f'] /* Family Name */,
         renderer : function(v,x,r) { 
             var d = r.data;
             if (d.lastname_alt.length) {
             
                 return String.format('{0} ({1})', d.lastname, d.lastname_alt ); 
             }
             return String.format('{0}', d.lastname); 
         },
         sortable : true,
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'role',
         header : _this._strings['754e1e134bc554a0af39749edbb59b9f'] /* Job Title */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'publication_name',
         header : _this._strings['6bd6beac1da76b2d2a9c3b7914ba034c'] /* Publication */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'category_scope_id_name',
         header : _this._strings['b1b8216a01f7fec51609d6ab603a2678'] /* Publication Scope */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'beats',
         header : _this._strings['1f96b7ecf6ec7e9ce1d960453af38752'] /* News Beat(s) */,
         renderer : function(v) { return String.format('{0}',v).split(',').join('<BR/>'); },
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'country',
         header : _this._strings['59716c97497eb9694541f7c3d37b1a4d'] /* Country */,
         renderer : function(v) { return String.format('{0}', v ? Pman.I18n.toName('c', v) : ''); },
         sortable : true,
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'email',
         header : _this._strings['ce8ae9da5b7cd6c3df2929543a9af92d'] /* Email */,
         renderer : function(v,x,r) {
         
               
             var f = (
                     r.data.email_fails > 0 ? '<span style="color:red">{0}</span>' : '{0}'
                 ) + (
                 r.data.email2.length > 0 ? 
                     (r.data.email2_fails > 0 ? '<br/><span style="color:red">{1}</span>' : '<br/>{1}')    : ''
                 ) + (
                 r.data.email3.length > 0 ? 
                     (r.data.email3_fails > 0 ? '<br/><span style="color:red">{2}</span>' : '<br/>{2}')    : ''
                 );
                 
                 
             
             return String.format(f, v, r.data.email2, r.data.email3); 
             
         },
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'phone',
         header : _this._strings['6ab9375e8f8108c11f21ab43d913e79c'] /* Tel. */,
         renderer : function(v,x,r) { 
         
             var map =  {
                 phone : 'Phone',
                 phone_mobile : 'Mobile',
                 phone_direct: 'Direct Line'
             }
             var ret = [];
             for (var i in map) {
                 if (r.data[i].length) {
                     ret.push( map[i]+': ' +  String.format('{0}' , r.data[i]))
                 }
             }
         
             return ret.join('<BR/>');
             
         },
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        }
       ]
      }
     },
     {
      autoScroll : true,
      fitToFrame : true,
      region : 'west',
      title : _this._strings['2750dfebe7e01be17a0aaadf6b5effcc'] /* Category Tree */,
      xns : Roo,
      '|xns' : 'Roo',
      xtype : 'TreePanel',
      listeners : {
       activate : function (_self)
        {
            
            _this.treepanel = _self;
        }
      },
      menu : {
       xns : Roo.menu,
       '|xns' : 'Roo.menu',
       xtype : 'Menu',
       items  : [
        {
         icon : Roo.rootURL + 'images/default/tree/drop-add.gif',
         text : _this._strings['ec211f7c20af43e742bf2570c3cb84f9'] /* Add */,
         xns : Roo.menu,
         '|xns' : 'Roo.menu',
         xtype : 'Item',
         listeners : {
          click : function (_self, e)
           {
           
               var sel = _this.cxnode;
               var id =  (!sel || isNaN(parseInt(sel.id))) ? 0 : sel.id;
               if (!id) {
                   Roo.MessageBox.alert("Error", "Select a category to add a item to");
                   return;
                   var sel = _this.treepanel.tree.root;
               }
           
            
               Pman.Dialog.PressReleaseCategory.show(
                    { id : 0 , parent_id : id }, 
                    function(r)
                   {
                      
                      //Roo.log(r);
                       if (r && r.name) {
                           if(sel.reload) {
                               sel.reload();
                               return;
                           }
                           // otherwise it's a treenode, and needs replacing...
                           var attr = sel.attributes;
                           attr.leaf = false;
                           var repnode = new Roo.tree.AsyncTreeNode(attr);
                           sel.parentNode.replaceChild(repnode, sel);
                           repnode.expand();
                      }
               });
           }
         }
        },
        {
         icon : Roo.rootURL + 'images/default/tree/leaf.gif',
         text : _this._strings['7dce122004969d56ae2e0245cb754d35'] /* Edit */,
         xns : Roo.menu,
         '|xns' : 'Roo.menu',
         xtype : 'Item',
         listeners : {
          click : function (_self, e)
           {
           
              
               var sel = _this.cxnode;
               if (!sel || isNaN(parseInt(sel.id))) {
                   Roo.MessageBox.alert("Error", "select a category to edit");
                   return;
               }
             
              Pman.Dialog.PressReleaseCategory.show( sel.attributes  , function(attr)
               {
                  if (attr && attr.name) {
                        
                       sel.setText((attr.hgroup ? attr.hgroup + ' : ' : '' ) + attr.name);
                  }
               });
           }
         }
        },
        {
         xns : Roo.menu,
         '|xns' : 'Roo.menu',
         xtype : 'Separator'
        },
        {
         text : _this._strings['f2a6c498fb90ee345d997f888fce3b18'] /* Delete */,
         xns : Roo.menu,
         '|xns' : 'Roo.menu',
         xtype : 'Item',
         listeners : {
          click : function (_self, e)
           {
               var sel = _this.cxnode;
               if (!sel || isNaN(parseInt(sel.id))) {
                   Roo.MessageBox.alert("Error", "you can not delete that category");
                   return;
               }
               var par = sel.parentNode;
               Roo.MessageBox.confirm("Confirm", "Are you sure you want to delete that?", function(b)
               {
                  // console.log(b);
                   if (b!='yes') {
                       return;
                   }
           
                     new Pman.request({
                       method : 'POST',
                       params : {
                           _delete : sel.id
                       },
                       url : baseURL + '/Roo/Pressrelease_category.php',
                       success : function(r, o) { 
                           par.removeChild(sel);
                           // do nothing..
                       } 
                   });
                   
               });
                    
               
           }
         }
        },
        {
         xns : Roo.menu,
         '|xns' : 'Roo.menu',
         xtype : 'Separator'
        },
        {
         text : _this._strings['b4e1a66c9679eccc7fa6a5dd36f4bbb8'] /* Reload Tree */,
         xns : Roo.menu,
         '|xns' : 'Roo.menu',
         xtype : 'Item',
         listeners : {
          click : function (_self, e)
           {
              _this.treepanel.tree.root.reload();
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
         text : _this._strings['21dfb254ef22912f7e12236f245751fe'] /* Manage Categories */,
         xns : Roo.Toolbar,
         '|xns' : 'Roo.Toolbar',
         xtype : 'Button',
         menu : {
          xns : Roo.menu,
          '|xns' : 'Roo.menu',
          xtype : 'Menu',
          items  : [
           {
            icon : Roo.rootURL + 'images/default/tree/drop-add.gif',
            text : _this._strings['e55458ac9b2afe0910d1ed25115ec02c'] /* Right Click on Item to add/edit  */,
            xns : Roo.menu,
            '|xns' : 'Roo.menu',
            xtype : 'Item'
           },
           {
            xns : Roo.menu,
            '|xns' : 'Roo.menu',
            xtype : 'Separator'
           },
           {
            text : _this._strings['b4e1a66c9679eccc7fa6a5dd36f4bbb8'] /* Reload Tree */,
            xns : Roo.menu,
            '|xns' : 'Roo.menu',
            xtype : 'Item',
            listeners : {
             click : function (_self, e)
              {
                 _this.treepanel.tree.root.reload();
              }
            }
           }
          ]
         }
        }
       ]
      },
      tree : {
       ddGroup : 'contactsDD',
       enableDrag : false,
       enableDrop : true,
       xns : Roo.tree,
       '|xns' : 'Roo.tree',
       xtype : 'TreePanel',
       listeners : {
        beforenodedrop : function (dropEvent)
         {
             //Roo.log('beforenodedrop');
             Roo.log(dropEvent);
             // comming from grid..
             if (dropEvent.data.grid) {
                 // comming from grid..
                  if (!dropEvent.data.selections.length) {
                      return false;
                  }
                 // prevents dropping onto top level
                  if (isNaN(parseInt(dropEvent.target.id))) {
                      return false;
                  }
         
                  if (dropEvent.point !='append') {
                     return false; 
                  }
                  var ids = [];
                  Roo.each(dropEvent.data.selections, function(d) {
                     ids.push(d.data.id)
                  });
                  /*
                  Roo.Ajax.request({
                     method : 'POST',
                     params : {
                         _ids : ids.join(','),
                         category_id : dropEvent.target.id
                     },
                     url : baseURL + '/Roo/Product.php',
                     success : function(r, o) { 
                         dropEvent.data.grid.footer.onClick('refresh');
                     },
                     failure : function () {
                         Roo.messageBox.alert('Error', 'Error updating categories');
                     }
                 });
                  */
                  
                  
                  return true;
             }
             
          
             
             
             
             
             return true;
         },
        checkchange : function (node, checked)
         {
             
             //Roo.log(this.getChecked('id'));
             
              (function() {
                _this.grid.footer.onClick('first');
             }).defer(200);
             
         },
        click : function (node, e)
         {
            if (node.ui.checkbox) {
                node.ui.checkbox.checked = !node.ui.checkbox.checked;
                node.ui.onCheckChange();
            }
            
             // (function() {
             //   _this.grid.footer.onClick('first');
            // }).defer(200);
         },
        contextmenu : function (node, e)
         {
             
             _this.treepanel.tree.selModel.select(node);
             var menu = Roo.factory(_this.treepanel.menu);
             _this.cxnode = node;
             menu.showAt(e.getXY());
         },
        nodedragover : function (dragOverEvent)
         {
              Roo.log('nodedragover');
              Roo.log(dragOverEvent);     
              
              if (dragOverEvent.data.grid) {
                 // comming from grid..
                  if (!dragOverEvent.data.selections.length) {
                      return false;
                  }
                
                  if (isNaN(parseInt(dragOverEvent.target.id))) {
                     return false;
                  }
         
                  if (dragOverEvent.point !='append') {
                     return false; 
                  }
                  return true;
             }
             // only allow append..
              if (dragOverEvent.point !='append') {
                  return false; 
              }
              // drop onto top level.
              if (dragOverEvent.target.attributes &&
                  isNaN(parseInt(dragOverEvent.target.attributes.id))) {
                  return false;
               }
               // dragging top level node....
               if (dragOverEvent.dropNode && dragOverEvent.dropNode.attributes.parent_id * 1 < 1) {
                     return false;
              }
             
         },
        nodedrop : function (dropEvent)
         {
            // now handle node drop..
             // if it fails, we just reload the tree..  a bit messy, but acceptable..
             var _t = this;
             
             Roo.Ajax.request({
                 method : 'POST',
                 params : {
                     id : dropEvent.dropNode.id,
                     parent_id : dropEvent.target.id
                 },
                 url : baseURL + '/Roo/Pressrelease_category.php',
                 success : function(r, o) { 
                     
                     // do nothing..
                 },
                 failure : function () {
                     Roo.messageBox.alert('Error', 'Error updating categories');
                     _this.root.reload()
                 }
             });
              
         }
       },
       root : {
        text : _this._strings['2b2edc156a7f3e035b3d234fee57daf2'] /* All Contacts */,
        xns : Roo.tree,
        '|xns' : 'Roo.tree',
        xtype : 'AsyncTreeNode'
       },
       selModel : {
        xns : Roo.tree,
        '|xns' : 'Roo.tree',
        xtype : 'DefaultSelectionModel',
        listeners : {
         beforeselect : function (_self, node, node)
          {
              Roo.log("before select");
                return false;
          }
        }
       },
       loader : {
        baseParams : { _tree: 1, limit: 9999, sort: 'hgroup,name', dir : 'ASC'  },
        dataUrl : baseURL + '/Roo/Pressrelease_category.php',
        queryParam : 'parent_id',
        requestMethod : 'GET',
        root : 'data',
        xns : Roo.tree,
        '|xns' : 'Roo.tree',
        xtype : 'TreeLoader',
        listeners : {
         create : function (self, attr)
          {
              //Roo.log(attr);
              attr.text = (attr.hgroup ?  attr.hgroup +' : ' : '' ) + attr.name;
          
              attr.allowChildren = attr.parent_id * 1 ? false : true;
              
              attr.leaf   = attr.parent_id * 1 ? true : false;
              
              
              attr.checked = attr.leaf ? false : undefined;
              
              if (attr.name == 'Regional') {
                  attr.allowChildren = true;
                  attr.leaf = false;
                   attr.checked  = undefined;
              }
              
          }
        }
       }
      }
     }
    ]
   }
  };  }
});
