//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.PressReleasePreview = {

 _strings : {
  'e45c559f5de4a9f38b3cc11ffd7fef1c' :"Preview Release",
  '99f1888871e14cbf8bca1cd8db21e400' :"No pressrelease_contact found",
  'e12167aa0a7698e6ebc92b4ce3909b53' :"To",
  'e925915109b4a15c1f15b2c0e9739bac' :"Contact language",
  'eea7699a7f07e294c651d3842569512c' :"Send a copy to me",
  '4f604bfc9885126ed4a7a986d0145aff' :"Preview press release",
  '91a105e1c679f3320b6372a2f6e00de5' :"Approve for distribution",
  '326185f4d4dfc0ef9df05d4de4ad5b5e' :"Displaying pressrelease_contact{0} - {1} of {2}",
  'ffebf16bea0aaac6cf0c3b15e2b3fa76' :"Send a copy to",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  'e3d388b2c43e5ba0905702620ae2abc1' :"Search for",
  'a47ed9d50ffef087c683dc24f9a413db' :"Distribution Summary",
  'cb50207904226f8409d63b3f1a6b8ccb' :"Distribution to",
  '648a529e2eddc96da88575f89353f810' :"Publication name",
  '94966d90747b97d1f0f206c98a8b1ac3' :"Send",
  'bbbabdbe1b262f75d99d62880b953be1' :"Role"
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
    closable : false,
    collapsible : false,
    height : 600,
    modal : true,
    resizable : false,
    title : _this._strings['4f604bfc9885126ed4a7a986d0145aff'] /* Preview press release */,
    width : 750,
    xns : Roo,
    '|xns' : 'Roo',
    xtype : 'LayoutDialog',
    listeners : {
     show : function (_self)
      {
          // this overlays the loaded data onto a spreadsheet layout.
          if (!_this.data) {
           
              // products..
               _this.data =  {
                  title : "Preview Press release",
                  id : 1,
      
              };
          }
          _this.dialog.setTitle(_this.data.title);
          var reg = _this.dialog.layout.getRegion('center');
          var pan = reg.getPanel(0);
          var sz = reg.el.getSize();
          var psz = pan.el.getSize();
          pan.setContent(
              '<iframe ' + 
              'style="border: 0px;width:' + psz.width +'px;height:' + psz.height +'px" ' +
              'src="' +  baseURL + '/PressRelease/ViewDistribution/' + _this.data.id + '.html' + 
              '"/>'
              );
           pan = reg.getPanel(1);
           sz = reg.el.getSize();
           psz = pan.el.getSize();
          pan.setContent(
              '<iframe ' + 
              'style="border: 0px;width:' + psz.width +'px;height:' + psz.height +'px" ' +
              'src="' +  baseURL + '/PressRelease/View/' + _this.data.id + '.html' + 
              '"/>'
              );
           reg.showPanel(0);
      
      }
    },
    center : {
     tabPosition : 'top',
     xns : Roo,
     '|xns' : 'Roo',
     xtype : 'LayoutRegion'
    },
    buttons : [
     {
      text : _this._strings['ffebf16bea0aaac6cf0c3b15e2b3fa76'] /* Send a copy to */,
      xns : Roo,
      '|xns' : 'Roo',
      xtype : 'Button',
      listeners : {
       click : function (_self, e)
        {
            // do some checks?
            
            // Roo.log(_this.data);
            Pman.Dialog.PressReleasePreviewSend.show({ id : _this.data.id });
            
            
        }
      }
     },
     {
      text : _this._strings['eea7699a7f07e294c651d3842569512c'] /* Send a copy to me */,
      xns : Roo,
      '|xns' : 'Roo',
      xtype : 'Button',
      listeners : {
       click : function (_self, e)
        {
            // do some checks?
            
            // Roo.log(_this.data);
            
            
            new Pman.Request({
                url : baseURL + '/PressRelease/View/' + _this.data.id,
                method : 'GET',
                params : {
                    send_test : 1
                },
                success : function()
                {
                    Roo.MessageBox.alert("Notice", "Release set to " + Pman.Login.authUser.email);
        
                }
            
            
            })
            
        }
      }
     },
     {
      text : _this._strings['91a105e1c679f3320b6372a2f6e00de5'] /* Approve for distribution */,
      xns : Roo,
      '|xns' : 'Roo',
      xtype : 'Button',
      listeners : {
       click : function (_self, e)
        {
            // do some checks?
            
            // Roo.log(_this.data);
            
            
            new Pman.Request({
                url : baseURL + '/PressRelease/View/' + _this.data.id,
                method : 'POST',
                success : function(res)
                {
        
                    Roo.log(res);
                    Roo.MessageBox.alert("Queued",
                        "Release is queued for delivery to " +
                        res.data +
                        " Journalists - if this looks wrong - go to Circulation and remove undelivered " +
                        " Messages, and check with support to find out why"
                    );
                        
        
                    _this.dialog.hide();
                    Pman.Dialog.PressReleaseEdit.dialog.hide();            
                    Pman.Dialog.PressReleaseEdit.callback();
        
                }
            
            
            })
            
        }
      }
     },
     {
      text : _this._strings['ea4788705e6873b424c65e91c2846b19'] /* Cancel */,
      xns : Roo,
      '|xns' : 'Roo',
      xtype : 'Button',
      listeners : {
       click : function (_self, e)
        {
            _this.dialog.hide();
        }
      }
     }
    ],
    items  : [
     {
      autoScroll : false,
      fitContainer : true,
      fitToFrame : true,
      region : 'center',
      title : _this._strings['a47ed9d50ffef087c683dc24f9a413db'] /* Distribution Summary */,
      xns : Roo,
      '|xns' : 'Roo',
      xtype : 'ContentPanel'
     },
     {
      autoScroll : false,
      fitContainer : true,
      fitToFrame : true,
      region : 'center',
      title : _this._strings['e45c559f5de4a9f38b3cc11ffd7fef1c'] /* Preview Release */,
      xns : Roo,
      '|xns' : 'Roo',
      xtype : 'ContentPanel'
     },
     {
      background : true,
      fitContainer : true,
      fitToframe : true,
      region : 'center',
      tableName : 'pressrelease_contact',
      title : _this._strings['cb50207904226f8409d63b3f1a6b8ccb'] /* Distribution to */,
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
       autoExpandColumn : 'email',
       loadMask : true,
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       xtype : 'Grid',
       listeners : {
        cellclick : function (_self, ri, ci , e) {
           
             var di = this.colModel.getDataIndex(ci);
             if (di != 'blacklist_pos') {
                 return;
             }
             
                    
             var rec = this.ds.getAt(ri);
             rec.set('blacklist_pos', (rec.data.blacklist_pos * 1) ? 0 : 1);
             rec.commit();
                 
                    //_this.countrygrid.ds.load({});
         },
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
             if (!_this.dialog) return;
             _this.dialog.show( this.getDataSource().getAt(rowIndex), function() {
                 _this.grid.footer.onClick('first');
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
        xtype : 'PagingToolbar'
       },
       toolbar : {
        xns : Roo,
        '|xns' : 'Roo',
        xtype : 'Toolbar',
        items  : [
         {
          text : _this._strings['e3d388b2c43e5ba0905702620ae2abc1'] /* Search for */,
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'TextItem'
         },
         {
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
                _this.grid.footer.onClick('first');
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
                     
            
                
                _this.grid.footer.onClick('first');
            }
          }
         }
        ]
       },
       dataSource : {
        remoteSort : true,
        sortInfo : { field : 'honor', direction: 'ASC' },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        xtype : 'Store',
        listeners : {
         beforeload : function (_self, options)
          {
             
              if (typeof(_this.data) == 'undefined') {
                  return false;
              }
              options.params['distfilter[beats]'] = _this.data.beats;
              options.params['distfilter[countries]'] = _this.data.countries;    
              options.params['distfilter[blacklist]'] = _this.data.blacklist_ids;    
              
              options.params['query[search_name]'] = _this.searchBox.getValue();
              
              
          },
         update : function (_self, record, operation)
          {
             if (operation != Roo.data.Record.COMMIT) {
                 return;
             }
             var id = record.data.id;
             var chg = record.data.blacklist_pos * 1;
             var olds  = '' + _this.data.blacklist_ids;
             var ar  =  _this.data.blacklist_ids.split(',');
             var ix = ar.indexOf(new String(id));
             if (!chg) {
              // removed..
                  if (ix > -1) {
                      ar.splice(ix,1);
          
                  }
                  
             } else {
                  if (ix < 0) {
                      ar.push(id);
                  }
             
             }
             
             _this.data.blacklist_ids = ar.join(',');
             Pman.Dialog.PressReleaseEdit.form.findField('blacklist_ids').setValue(
                 _this.data.blacklist_ids
             );
             
             if (olds != _this.data.blacklist_ids) {
               // send it off..
                  new Pman.Request({
                      url : baseURL + '/Roo/Pressrelease_entry',
                      method : 'POST',
                      params : {
                          id : _this.data.id,
                          blacklist_ids : _this.data.blacklist_ids
                      }
                  });
              
             
             }
             
             
             
             
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
                 'name': 'contact_language',
                 'type': 'string'
             },
             {
                 'name': 'url',
                 'type': 'string'
             },
             {
                 'name': 'remarks',
                 'type': 'string'
             },
             {
                 'name': 'phone_mobile',
                 'type': 'string'
             },
             {
                 'name': 'phone_direct',
                 'type': 'string'
             },
             {
                 'name': 'firstname',
                 'type': 'string'
             },
             {
                 'name': 'lastname',
                 'type': 'string'
             },
             {
                 'name': 'firstname_alt',
                 'type': 'string'
             },
             {
                 'name': 'lastname_alt',
                 'type': 'string'
             },
             {
                 'name': 'publication_name',
                 'type': 'string'
             },
             {
                 'name': 'publication_name_alt',
                 'type': 'string'
             },
             {
                 'name': 'publication_lang',
                 'type': 'string'
             },
             {
                 'name': 'category_scope_id',
                 'type': 'int'
             },
             {
                 'name': 'contact_language_alt',
                 'type': 'string'
             },
             {
                 'name': 'country',
                 'type': 'string'
             },
             {
                 'name': 'best_contact_method',
                 'type': 'string'
             },
             {
                 'name': 'best_contact_from',
                 'type': 'string'
             },
             {
                 'name': 'best_contact_to',
                 'type': 'string'
             },
             {
                 'name': 'best_contact_days',
                 'type': 'string'
             },
             {
                 'name': 'publication_lang_alt',
                 'type': 'string'
             },
             {
                 'name': 'city',
                 'type': 'string'
             },
             {
                 'name': 'category_type_id_id',
                 'type': 'int'
             },
             {
                 'name': 'category_type_id_parent_id',
                 'type': 'int'
             },
             {
                 'name': 'category_type_id_name',
                 'type': 'string'
             },
             {
                 'name': 'category_type_id_display_order',
                 'type': 'int'
             },
             {
                 'name': 'category_type_id_visible',
                 'type': 'int'
             },
             {
                 'name': 'category_type_id_hgroup',
                 'type': 'string'
             },
             {
                 'name': 'category_media_id_id',
                 'type': 'int'
             },
             {
                 'name': 'category_media_id_parent_id',
                 'type': 'int'
             },
             {
                 'name': 'category_media_id_name',
                 'type': 'string'
             },
             {
                 'name': 'category_media_id_display_order',
                 'type': 'int'
             },
             {
                 'name': 'category_media_id_visible',
                 'type': 'int'
             },
             {
                 'name': 'category_media_id_hgroup',
                 'type': 'string'
             },
             {
                 'name': 'category_scope_id_id',
                 'type': 'int'
             },
             {
                 'name': 'category_scope_id_parent_id',
                 'type': 'int'
             },
             {
                 'name': 'category_scope_id_name',
                 'type': 'string'
             },
             {
                 'name': 'category_scope_id_display_order',
                 'type': 'int'
             },
             {
                 'name': 'category_scope_id_visible',
                 'type': 'int'
             },
             {
                 'name': 'category_scope_id_hgroup',
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
         dataIndex : 'publication_name',
         header : _this._strings['648a529e2eddc96da88575f89353f810'] /* Publication name */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'role',
         header : _this._strings['bbbabdbe1b262f75d99d62880b953be1'] /* Role */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'email',
         header : _this._strings['e12167aa0a7698e6ebc92b4ce3909b53'] /* To */,
         renderer : function(v,x,r) { 
         
             var ar = [];
             if (v.length) ar.push(v);
             if (r.data.email2.length) ar.push(r.data.email2);
             if (r.data.email3.length) ar.push(r.data.email3);    
         
         
             if (!Pman.hasPerm('PressRelease.JournalistAll', 'S')) {
                 
               return String.format('{0} {1} ({2} addresses)', 
                         r.data.firstname, r.data.lastname, ar.length
                 );   
             
             }
         
             //if (r.data.email_personal.length) ar.push(r.data.email_personal);
             return String.format('<span qtip="{3}">{0} {1}</span> ({2} addresses)',
                         r.data.firstname, r.data.lastname, ar.length,
                          ar.join(' / ')); 
         },
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'contact_language',
         header : _this._strings['e925915109b4a15c1f15b2c0e9739bac'] /* Contact language */,
         renderer : function(v,x,r) { 
             var ar = [];
             if (v.length) ar.push(v);
             if (r.data.contact_language_alt.length) ar.push(r.data.contact_language_alt);
             //if (r.data.email_personal.length) ar.push(r.data.email_personal);
             return String.format('{0}', ar.join(' / ')); 
         },
         width : 70,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'blacklist_pos',
         header : _this._strings['94966d90747b97d1f0f206c98a8b1ac3'] /* Send */,
         renderer : function(v) {
              var state = v < 1 ?  '-checked' : '';
                                                     
             return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                                                               
         },
         width : 50,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        }
       ]
      }
     }
    ]
   });
 }
};
