//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.ReaderArticle = new Roo.XComponent({

 _strings : {
  '59716c97497eb9694541f7c3d37b1a4d' :"Country",
  '490aa6e856ccf208a054389e47ce0d06' :"Id",
  '4994a8ffeba4ac3140beb89e8d41f174' :"Language",
  '8444e81d652b084d70c71cd7d19ac0cf' :"Displaying Person{0} - {1} of {2}",
  '13348442cc6a27032d2b4aa28b75a5d3' :"Search",
  'b841c326ce2658d34b4430a9dc46c0e4' :"Rebuild & Download",
  '479e527f94b9416c7c642519be65f1f2' :"Reader Article",
  'b718adec73e04ce3ec720dd11a06a308' :"ID",
  'f00a1d99f6f47917006e88a803ecde1f' :"Campaign",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  '07f366f8c885267f837f79170f05a990' :"Build feeds",
  'a2ceb7c17a391cb351d6f4b084fc9c3d' :"reader_sub",
  '5a7b0bf7386b00815019c1381be4f425' :"Last Fetch",
  '30232180c3389e421452954d1790036e' :"Reader Articles",
  '5da618e8e4b89c66fe86e32cdafde142' :"From",
  '24f27bda5dd2c488aa9bc7700ba98c34' :"Select Projects",
  'ac101b32dda4448cf13a93fe283dddd8' :"Body",
  'a80425472d94ae02c836da5b6f205b7b' :"Feed",
  '0553dc409f5f786ede7dc1dd1f94c2d8' :"Diff Article",
  '689252537fba5b4613c47664625652b0' :"Fetched",
  'ac78da22726179c0aca7474021f77977' :"Link Check",
  '175b08878b33de0ba64fb8072292c69d' :"Download Article",
  'c6568e77f61109390e82d035aaacaef0' :"Headline",
  'e6b391a8d2c4d45902a23a8b6585703d' :"URL"
 },

  part     :  ["PressRelease", "ReaderArticle" ],
  order    : '999-Pman.Tab.ReaderArticle',
  region   : 'center',
  parent   : 'Pman.Tab.PressReleaseTab',
  name     : "unnamed module",
  disabled : false, 
  permname : '', 
  _tree : function()
  {
   var _this = this;
   var MODULE = this;
   return {
   background : true,
   region : 'center',
   title : _this._strings['30232180c3389e421452954d1790036e'] /* Reader Articles */,
   xns : Roo,
   '|xns' : 'Roo',
   xtype : 'NestedLayoutPanel',
   layout : {
    xns : Roo,
    '|xns' : 'Roo',
    xtype : 'BorderLayout',
    center : {
     xns : Roo,
     '|xns' : 'Roo',
     xtype : 'LayoutRegion'
    },
    south : {
     height : 300,
     split : true,
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
      tableName : 'reader_sub',
      title : _this._strings['a2ceb7c17a391cb351d6f4b084fc9c3d'] /* reader_sub */,
      xns : Roo,
      '|xns' : 'Roo',
      xtype : 'GridPanel',
      listeners : {
       activate : function() {
            _this.feedpanel = this;
            if (_this.feedgrid) {
                _this.feedgrid.ds.load({});
            }
        }
      },
      grid : {
       autoExpandColumn : 'supplier_id_code',
       loadMask : true,
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       xtype : 'Grid',
       listeners : {
        render : function() 
         {
             _this.feedgrid = this; 
             //_this.dialog = Pman.Dialog.FILL_IN
             if (_this.feedpanel.active) {
             
                 this.ds.load({});
         
             }
         },
        rowdblclick : function (_self, rowIndex, e)
         {
             if (!_this.dialog) return;
             _this.dialog.show( this.getDataSource().getAt(rowIndex).data, function() {
                 _this.grid.footer.onClick('first');
             }); 
         }
       },
       toolbar : {
        xns : Roo,
        '|xns' : 'Roo',
        xtype : 'Toolbar',
        items  : [
         {
          allowBlank : true,
          displayField : 'name',
          editable : false,
          emptyText : _this._strings['24f27bda5dd2c488aa9bc7700ba98c34'] /* Select Projects */,
          forceSelection : true,
          listWidth : 400,
          loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
          minChars : 2,
          pageSize : 20,
          qtip : _this._strings['24f27bda5dd2c488aa9bc7700ba98c34'] /* Select Projects */,
          queryParam : '',
          selectOnFocus : true,
          tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>#{pressrelease_id} {name}</b></div>',
          triggerAction : 'all',
          typeAhead : true,
          valueField : 'id',
          width : 300,
          xns : Roo.form,
          '|xns' : 'Roo.form',
          xtype : 'ComboBox',
          listeners : {
           render : function (_self)
            {
                _this.projectCombo = _self;
            },
           select : function (combo, record, index)
            {
               _this.feedgrid.ds.load({});
            }
          },
          store : {
           remoteSort : true,
           sortInfo : { direction : 'DESC', field: 'pressrelease_id' },
           xns : Roo.data,
           '|xns' : 'Roo.data',
           xtype : 'Store',
           listeners : {
            beforeload : function (_self, o){
                 o.params = o.params || {};
                 // set more here
                 o.params['query[project_indaterange]'] = 'C';
                 
             }
           },
           proxy : {
            method : 'GET',
            url : baseURL + '/Roo/Projects.php',
            xns : Roo.data,
            '|xns' : 'Roo.data',
            xtype : 'HttpProxy'
           },
           reader : {
            fields : [{"name":"id","type":"int"},{"name":"name","type":"string"}],
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
          text : _this._strings['07f366f8c885267f837f79170f05a990'] /* Build feeds */,
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Button',
          listeners : {
           click : function()
            {
             
                
                new Pman.Request({
            
                    url : baseURL + '/Roo/Pressrelease_entry',
                    method  : 'GET',
                    params : {
                        _build_feed :     _this.projectCombo.getValue()
                    },
                    success : function () {
                         _this.feedgrid.ds.load({});
                    }
                    
            
                });
                
            }
          }
         }
        ]
       },
       dataSource : {
        remoteSort : true,
        sortInfo : { field : '', direction: 'ASC' },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        xtype : 'Store',
        listeners : {
         beforeload : function (_self, o)
          {
              o.params = o.params || {};
              o.params.limit = 100;
              o.params.project_id = _this.projectCombo.getValue();
              if (!    o.params.project_id ) {
                  return false;
              }
              
              
          }
        },
        proxy : {
         method : 'GET',
         url : baseURL + '/Roo/CampaignAssign.php',
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
                 'name': 'person_id',
                 'type': 'int'
             },
             {
                 'name': 'feed_id',
                 'type': 'int'
             },
             {
                 'name': 'campaign_assign_id',
                 'type': 'int'
             },
             {
                 'name': 'person_id_id',
                 'type': 'int'
             },
             {
                 'name': 'person_id_office_id',
                 'type': 'int'
             },
             {
                 'name': 'person_id_name',
                 'type': 'string'
             },
             {
                 'name': 'person_id_phone',
                 'type': 'string'
             },
             {
                 'name': 'person_id_fax',
                 'type': 'string'
             },
             {
                 'name': 'person_id_email',
                 'type': 'string'
             },
             {
                 'name': 'person_id_alt_email',
                 'type': 'string'
             },
             {
                 'name': 'person_id_company_id',
                 'type': 'int'
             },
             {
                 'name': 'person_id_role',
                 'type': 'string'
             },
             {
                 'name': 'person_id_active',
                 'type': 'int'
             },
             {
                 'name': 'person_id_remarks',
                 'type': 'string'
             },
             {
                 'name': 'person_id_passwd',
                 'type': 'string'
             },
             {
                 'name': 'person_id_owner_id',
                 'type': 'int'
             },
             {
                 'name': 'person_id_lang',
                 'type': 'string'
             },
             {
                 'name': 'person_id_no_reset_sent',
                 'type': 'int'
             },
             {
                 'name': 'person_id_action_type',
                 'type': 'string'
             },
             {
                 'name': 'person_id_project_id',
                 'type': 'int'
             },
             {
                 'name': 'person_id_deleted_by',
                 'type': 'int'
             },
             {
                 'name': 'person_id_deleted_dt',
                 'type': 'date'
             },
             {
                 'name': 'person_id_firstname',
                 'type': 'string'
             },
             {
                 'name': 'person_id_lastname',
                 'type': 'string'
             },
             {
                 'name': 'person_id_name_facebook',
                 'type': 'string'
             },
             {
                 'name': 'person_id_url_blog',
                 'type': 'string'
             },
             {
                 'name': 'person_id_url_twitter',
                 'type': 'string'
             },
             {
                 'name': 'person_id_url_linkedin',
                 'type': 'string'
             },
             {
                 'name': 'person_id_phone_mobile',
                 'type': 'string'
             },
             {
                 'name': 'person_id_phone_direct',
                 'type': 'string'
             },
             {
                 'name': 'person_id_honor',
                 'type': 'string'
             },
             {
                 'name': 'person_id_countries',
                 'type': 'string'
             },
             {
                 'name': 'person_id_addr_state',
                 'type': 'string'
             },
             {
                 'name': 'person_id_country_id',
                 'type': 'int'
             },
             {
                 'name': 'person_id_city_id',
                 'type': 'int'
             },
             {
                 'name': 'person_id_chosen_title',
                 'type': 'string'
             },
             {
                 'name': 'person_id_url_google_plus',
                 'type': 'string'
             },
             {
                 'name': 'person_id_url_blog2',
                 'type': 'string'
             },
             {
                 'name': 'person_id_url_blog3',
                 'type': 'string'
             },
             {
                 'name': 'feed_id_id',
                 'type': 'int'
             },
             {
                 'name': 'feed_id_name',
                 'type': 'string'
             },
             {
                 'name': 'feed_id_url',
                 'type': 'string'
             },
             {
                 'name': 'feed_id_lastfetch_dt',
                 'type': 'date'
             },
             {
                 'name': 'feed_id_description',
                 'type': 'string'
             },
             {
                 'name': 'feed_id_parser',
                 'type': 'string'
             },
             {
                 'name': 'feed_id_params',
                 'type': 'string'
             },
             {
                 'name': 'feed_id_country',
                 'type': 'string'
             },
             {
                 'name': 'campaign_assign_id_id',
                 'type': 'int'
             },
             {
                 'name': 'campaign_assign_id_supplier_id',
                 'type': 'int'
             },
             {
                 'name': 'campaign_assign_id_assigntype',
                 'type': 'string'
             },
             {
                 'name': 'campaign_assign_id_languages',
                 'type': 'string'
             },
             {
                 'name': 'campaign_assign_id_countries',
                 'type': 'string'
             },
             {
                 'name': 'campaign_assign_id_description',
                 'type': 'string'
             },
             {
                 'name': 'campaign_assign_id_project_id',
                 'type': 'int'
             },
             {
                 'name': 'campaign_assign_id_sourcelanguages',
                 'type': 'string'
             },
             {
                 'name': 'campaign_assign_id_assignimage_id',
                 'type': 'int'
             },
             {
                 'name': 'campaign_assign_id_remote_username',
                 'type': 'string'
             },
             {
                 'name': 'campaign_assign_id_remote_password',
                 'type': 'string'
             },
             {
                 'name': 'campaign_assign_id_delivery_time',
                 'type': 'string'
             },
             {
                 'name': 'campaign_assign_id_search_terms',
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
       sm : {
        singleSelect : true,
        xns : Roo.grid,
        '|xns' : 'Roo.grid',
        xtype : 'RowSelectionModel',
        listeners : {
         afterselectionchange : function (_self)
          {
              _this.grid.footer.onClick('first');
          }
        }
       },
       colModel : [
        {
         dataIndex : 'id',
         header : _this._strings['490aa6e856ccf208a054389e47ce0d06'] /* Id */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 50,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'lastfetched',
         header : _this._strings['5a7b0bf7386b00815019c1381be4f425'] /* Last Fetch */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 130,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'supplier_id_code',
         header : _this._strings['a80425472d94ae02c836da5b6f205b7b'] /* Feed */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'countries',
         header : _this._strings['59716c97497eb9694541f7c3d37b1a4d'] /* Country */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 50,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'languages',
         header : _this._strings['4994a8ffeba4ac3140beb89e8d41f174'] /* Language */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        }
       ]
      }
     },
     {
      autoScroll : true,
      background : false,
      fitContainer : true,
      fitToframe : true,
      region : 'south',
      tableName : 'reader_article',
      title : _this._strings['479e527f94b9416c7c642519be65f1f2'] /* Reader Article */,
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
       autoExpandColumn : 'headline',
       loadMask : true,
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       xtype : 'Grid',
       listeners : {
        cellclick : function (_self, rowIndex, columnIndex, e)
         {
             return;
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
             if (!_this.dialog) {
                 _this.dialog = Pman.Dialog.PersonEdit;
                 
             }
             //_this.dialog = Pman.Dialog.FILL_IN
             if (_this.panel.active) {
                this.footer.onClick('first');
             }
         },
        rowdblclick : function (_self, rowIndex, e)
         {
             return;
             if (!_this.dialog) return;
             _this.dialog.show( this.getDataSource().getAt(rowIndex), function() {
                 _this.grid.footer.onClick('first');
             }); 
         }
       },
       footer : {
        displayInfo : true,
        displayMsg : _this._strings['8444e81d652b084d70c71cd7d19ac0cf'] /* Displaying Person{0} - {1} of {2} */,
        pageSize : 100,
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
          text : _this._strings['13348442cc6a27032d2b4aa28b75a5d3'] /* Search */,
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
           show : function (_self,e)
            {
                if (e.getCharCode() != 13) {
                    return;
                }
                _this.grid.footer.onClick('first');
            },
           specialkey : function (_self, e)
            {
              if (e.getKey() == 13) {
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
         },
         {
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Fill'
         },
         {
          text : _this._strings['ac78da22726179c0aca7474021f77977'] /* Link Check */,
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Button',
          listeners : {
           click : function()
            {
                var sels= _this.grid.selModel.getSelections();
                
                if (!sels || !sels.length) {
                    Roo.MessageBox.alert("Error", "Select some documents");
                    return;
                }
                
                if(sels.length > 1){
                    Roo.MessageBox.alert('Error', 'you can only select one document');
                    return;
                }
                var d = sels[0].data;
                
                //Roo.MessageBox.prompt('Debugging Diff', 'Fill in the release id', function(e, v){
                
                    new Pman.Request({
                        url : baseURL + '/PressRelease/Import/Debug.php',
                        method :'GET',
                        params : {
                            action: '_linkcheck',
                            reader_id : d.id,
                            project_id: _this.projectCombo.getValue()
                        },
                        success : function(res) {
                            // do nothing
                            Roo.MessageBox.alert('Done', res.data+'% Matched');
                        },
                        failure : function() 
                        {
                            Roo.MessageBox.alert("Error", "saving failed", function() {
                                _this.grid.footer.onClick('first');
                            });
                        }
                    });
                    
                   // });
                
                
                
                
                
            }
          }
         },
         {
          text : _this._strings['0553dc409f5f786ede7dc1dd1f94c2d8'] /* Diff Article */,
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Button',
          listeners : {
           click : function()
            {
                var sels= _this.grid.selModel.getSelections();
                
                if (!sels || !sels.length) {
                    Roo.MessageBox.alert("Error", "Select some documents");
                    return;
                }
                
                if(sels.length > 1){
                    Roo.MessageBox.alert('Error', 'you can only select one document');
                    return;
                }
                var d = sels[0].data;
                
                //Roo.MessageBox.prompt('Debugging Diff', 'Fill in the release id', function(e, v){
                
                    new Pman.Request({
                        url : baseURL + '/PressRelease/Import/Debug.php',
                        method :'GET',
                        params : {
                            action: '_diff',
                            reader_id : d.id,
                            project_id: _this.projectCombo.getValue()
                        },
                        success : function(res) {
                            // do nothing
                            Roo.MessageBox.alert('Done', res.data+'% Matched');
                        },
                        failure : function() 
                        {
                            Roo.MessageBox.alert("Error", "saving failed", function() {
                                _this.grid.footer.onClick('first');
                            });
                        }
                    });
                    
                   // });
                
                
                
                
                
            }
          }
         },
         {
          text : _this._strings['175b08878b33de0ba64fb8072292c69d'] /* Download Article */,
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Button',
          listeners : {
           click : function()
            {
                var sels= _this.grid.selModel.getSelections();
                
                if (!sels || !sels.length) {
                    Roo.MessageBox.alert("Error", "Select some documents");
                    return;
                }
                
                if(sels.length > 1){
                    Roo.MessageBox.alert('Error', 'you can only select one document');
                    return;
                }
                var d = sels[0].data;
                
                
                new Pman.Download({
                    newWindow: true,
                    url : baseURL + '/PressRelease/Import/Debug.php',
                    params : {
                        action: '_download',
                        reader_id : d.id
                    }
                });
                
            }
          }
         },
         {
          text : _this._strings['b841c326ce2658d34b4430a9dc46c0e4'] /* Rebuild & Download */,
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar',
          xtype : 'Button',
          listeners : {
           click : function()
            {
                var sels= _this.grid.selModel.getSelections();
                
                if (!sels || !sels.length) {
                    Roo.MessageBox.alert("Error", "Select some documents");
                    return;
                }
                
                if(sels.length > 1){
                    Roo.MessageBox.alert('Error', 'you can only select one document');
                    return;
                }
                var d = sels[0].data;
                
                
                new Pman.Download({
                    newWindow: true,
                    url : baseURL + '/PressRelease/Import/Debug.php',
                    params : {
                        action: '_rebuild',
                        reader_id : d.id
                    }
                });
                
            }
          }
         }
        ]
       },
       dataSource : {
        remoteSort : true,
        sortInfo : { field : 'id', direction: 'DESC' },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        xtype : 'Store',
        listeners : {
         beforeload : function (_self, o)
          {
              if (!_this.feedgrid) {
                  return false;
              }
              
              o.params = o.params || {};
              
              var pr = _this.projectCombo.getValue();
              if (pr *1 > 0 ) {
                  o.params.campaign_id = pr;
              }
              
              o.params._search = _this.searchBox.getValue();
          
              var fg = _this.feedgrid.selModel.getSelected();
              if (fg) {
                  o.params.src_id = fg.data.id;
              }
              
          },
         update : function (_self, record, operation)
          {
              if (operation != 'commit') {
                  return;
              }
              // only used to change active status.
              
              new Pman.Request({
                  url : baseURL + '/Roo/Person.php',
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
        proxy : {
         method : 'GET',
         url : baseURL + '/Roo/Reader_article.php',
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
                 'name': 'office_id',
                 'type': 'int'
             },
             {
                 'name': 'name',
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
                 'name': 'email',
                 'type': 'string'
             },
             {
                 'name': 'company_id',
                 'type': 'int'
             },
             {
                 'name': 'role',
                 'type': 'string'
             },
             {
                 'name': 'active',
                 'type': 'int'
             },
             {
                 'name': 'remarks',
                 'type': 'string'
             },
             {
                 'name': 'passwd',
                 'type': 'string'
             },
             {
                 'name': 'owner_id',
                 'type': 'int'
             },
             {
                 'name': 'lang',
                 'type': 'string'
             },
             {
                 'name': 'no_reset_sent',
                 'type': 'int'
             },
             {
                 'name': 'action_type',
                 'type': 'string'
             },
             {
                 'name': 'project_id',
                 'type': 'int'
             },
             {
                 'name': 'office_id_id',
                 'type': 'int'
             },
             {
                 'name': 'office_id_company_id',
                 'type': 'int'
             },
             {
                 'name': 'office_id_name',
                 'type': 'string'
             },
             {
                 'name': 'office_id_address',
                 'type': 'string'
             },
             {
                 'name': 'office_id_phone',
                 'type': 'string'
             },
             {
                 'name': 'office_id_fax',
                 'type': 'string'
             },
             {
                 'name': 'office_id_email',
                 'type': 'string'
             },
             {
                 'name': 'office_id_role',
                 'type': 'string'
             },
             {
                 'name': 'company_id_code',
                 'type': 'string'
             },
             {
                 'name': 'company_id_name',
                 'type': 'string'
             },
             {
                 'name': 'company_id_remarks',
                 'type': 'string'
             },
             {
                 'name': 'company_id_owner_id',
                 'type': 'int'
             },
             {
                 'name': 'company_id_address',
                 'type': 'string'
             },
             {
                 'name': 'company_id_tel',
                 'type': 'string'
             },
             {
                 'name': 'company_id_fax',
                 'type': 'string'
             },
             {
                 'name': 'company_id_email',
                 'type': 'string'
             },
             {
                 'name': 'company_id_id',
                 'type': 'int'
             },
             {
                 'name': 'company_id_isOwner',
                 'type': 'int'
             },
             {
                 'name': 'company_id_logo_id',
                 'type': 'int'
             },
             {
                 'name': 'company_id_background_color',
                 'type': 'string'
             },
             {
                 'name': 'company_id_comptype',
                 'type': 'string'
             },
             {
                 'name': 'company_id_url',
                 'type': 'string'
             },
             {
                 'name': 'company_id_main_office_id',
                 'type': 'int'
             },
             {
                 'name': 'company_id_created_by',
                 'type': 'int'
             },
             {
                 'name': 'company_id_created_dt',
                 'type': 'date'
             },
             {
                 'name': 'company_id_updated_by',
                 'type': 'int'
             },
             {
                 'name': 'company_id_updated_dt',
                 'type': 'date'
             },
             {
                 'name': 'company_id_passwd',
                 'type': 'string'
             },
             {
                 'name': 'project_id_id',
                 'type': 'int'
             },
             {
                 'name': 'project_id_name',
                 'type': 'string'
             },
             {
                 'name': 'project_id_remarks',
                 'type': 'string'
             },
             {
                 'name': 'project_id_owner_id',
                 'type': 'int'
             },
             {
                 'name': 'project_id_code',
                 'type': 'string'
             },
             {
                 'name': 'project_id_active',
                 'type': 'int'
             },
             {
                 'name': 'project_id_type',
                 'type': 'string'
             },
             {
                 'name': 'project_id_client_id',
                 'type': 'int'
             },
             {
                 'name': 'project_id_team_id',
                 'type': 'int'
             },
             {
                 'name': 'project_id_file_location',
                 'type': 'string'
             },
             {
                 'name': 'project_id_open_date',
                 'type': 'date'
             },
             {
                 'name': 'project_id_open_by',
                 'type': 'int'
             },
             {
                 'name': 'project_id_close_date',
                 'type': 'date'
             },
             {
                 'name': 'project_id_countries',
                 'type': 'string'
             },
             {
                 'name': 'project_id_languages',
                 'type': 'string'
             },
             {
                 'name': 'project_id_agency_id',
                 'type': 'int'
             },
             {
                 'name': 'owner_id_id',
                 'type': 'int'
             },
             {
                 'name': 'owner_id_office_id',
                 'type': 'int'
             },
             {
                 'name': 'owner_id_name',
                 'type': 'string'
             },
             {
                 'name': 'owner_id_phone',
                 'type': 'string'
             },
             {
                 'name': 'owner_id_fax',
                 'type': 'string'
             },
             {
                 'name': 'owner_id_email',
                 'type': 'string'
             },
             {
                 'name': 'owner_id_company_id',
                 'type': 'int'
             },
             {
                 'name': 'owner_id_role',
                 'type': 'string'
             },
             {
                 'name': 'owner_id_active',
                 'type': 'int'
             },
             {
                 'name': 'owner_id_remarks',
                 'type': 'string'
             },
             {
                 'name': 'owner_id_passwd',
                 'type': 'string'
             },
             {
                 'name': 'owner_id_owner_id',
                 'type': 'int'
             },
             {
                 'name': 'owner_id_lang',
                 'type': 'string'
             },
             {
                 'name': 'owner_id_no_reset_sent',
                 'type': 'int'
             },
             {
                 'name': 'owner_id_action_type',
                 'type': 'string'
             },
             {
                 'name': 'owner_id_project_id',
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
         header : _this._strings['b718adec73e04ce3ec720dd11a06a308'] /* ID */,
         renderer : function(v,x,r) {
             return String.format('{0}', v); 
         },
         sortable : true,
         width : 50,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'fetched_dt',
         header : _this._strings['689252537fba5b4613c47664625652b0'] /* Fetched */,
         renderer : function(v,x,r) { 
             return String.format('{0}', r.data.fetched * 1 ? v.format('h:i d/M') : '-'); 
         },
         width : 50,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'campaign_id_name',
         header : _this._strings['f00a1d99f6f47917006e88a803ecde1f'] /* Campaign */,
         renderer : function(v,x,r) {
             return String.format('{0}', v); 
         },
         sortable : true,
         width : 50,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'headline',
         header : _this._strings['c6568e77f61109390e82d035aaacaef0'] /* Headline */,
         renderer : function(v,x,r) {
             
             return String.format('{0}', v); 
         },
         sortable : true,
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'body',
         header : _this._strings['ac101b32dda4448cf13a93fe283dddd8'] /* Body */,
         renderer : function(v) { return String.format('{0}', v); },
         sortable : true,
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'src_id_description',
         header : _this._strings['5da618e8e4b89c66fe86e32cdafde142'] /* From */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'real_url',
         header : _this._strings['e6b391a8d2c4d45902a23a8b6585703d'] /* URL */,
         renderer : function(v,x,r) { return String.format('<a href="{0}" target="_new">{0}</a>', v.length ? v : r.data.url ); },
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'language',
         header : _this._strings['4994a8ffeba4ac3140beb89e8d41f174'] /* Language */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 50,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        }
       ]
      }
     }
    ]
   }
  };  }
});
