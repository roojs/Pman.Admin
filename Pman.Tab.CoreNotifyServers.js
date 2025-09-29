//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.CoreNotifyServers = new Roo.XComponent({

 _strings : {
  'ac659513b2353187192e88c5d1988228' :"Servers",
  '8535bcc0f05358a583bb432bbadf7e0d' :"Select type",
  'ec211f7c20af43e742bf2570c3cb84f9' :"Add",
  '2ddb157d4780e8883fbde96f354c57d2' :"Displaying Blacklists {0} - {1} of {2}",
  'c348b06d2667edd048ded3c1b1878cc1' :"Recurrent Notifications",
  '774ff60df30a64fad1d29f6c2daa8691' :"No Servers found",
  '2023301a71db57f37d50da7d045b881a' :"Displaying Servers {0} - {1} of {2}",
  'c5dd93dd1011986763b5925e0af25e08' :"No Blacklists found",
  'f29ddbfb905eb2593fdcdfb243f9af85' :"Added",
  'b78a3223503896721cca1303f776159b' :"Title",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  '529701d5ccccf8a1c604c27f48ce7d82' :"Mimetype",
  'b26686c0a708faee42861d8b905e882e' :"Last Sent",
  '1203cd27e4d1ab6f1296728c021d9c1a' :"Is Active",
  'def36b726efed529b13ba240dd331a12' :"Pool",
  'c9d03748d1a54666b5c7a5187109301b' :"Delete Selected File or  Image",
  'be6838286e448ad65c5b55d690e2c38b' :"In Queue",
  '902b0d55fddef6f8d651fe1035b7d4bd' :"Error",
  '8e16a71b3d8217eb80b39b7d8dec4296' :"Image Type",
  '471ddaf9e80da04dd5a3a54daa0239b0' :"Select Image Type",
  'eae639a70006feff484a39363c977e24' :"Domain",
  'e3974584afa867d8619253bc669d6197' :"Notify Servers",
  '825bd435c12978e8492330c2a0d823db' :"Helo",
  '1d05bbecb1dd9127ccc9a5efaf492a2c' :"crm_person",
  'b18c29b8470190a02813415a04a2191f' :"Filesize",
  '55cfeeacad2f92b9fea0a1bbb6449fac' :"Update Image Details",
  '1063e38cb53d94d386f21227fcd84717' :"Remove",
  'c8f4b8c435b3d99a66e1b91bec60737c' :"Hostname",
  'ea72bacd2fdfa818907bb9559e6905a1' :"Upload Image or File"
 },
 _named_strings : {
  'imgtype_fieldLabel' : '8e16a71b3d8217eb80b39b7d8dec4296' /* Image Type */ ,
  'title_fieldLabel' : 'b78a3223503896721cca1303f776159b' /* Title */ ,
  'imgtype_qtip' : '471ddaf9e80da04dd5a3a54daa0239b0' /* Select Image Type */ ,
  'imgtype_loadingText' : '1243daf593fa297e07ab03bf06d925af' /* Searching... */ ,
  'mimetype_fieldLabel' : '529701d5ccccf8a1c604c27f48ce7d82' /* Mimetype */ ,
  'imageUpload_fieldLabel' : 'ea72bacd2fdfa818907bb9559e6905a1' /* Upload Image or File */ ,
  'ontable_value' : '1d05bbecb1dd9127ccc9a5efaf492a2c' /* crm_person */ ,
  'imgtype_emptyText' : '8535bcc0f05358a583bb432bbadf7e0d' /* Select type */ ,
  'filesize_fieldLabel' : 'b18c29b8470190a02813415a04a2191f' /* Filesize */ 
 },

  part     :  ["Admin", "CoreNotifyServers" ],
  order    : '900-Pman.Tab.CoreNotifyServers',
  region   : 'center',
  parent   : 'Pman.Tab.AdminWatchNotify',
  name     : "Pman.Tab.CoreNotifyServers",
  disabled : false, 
  permname : '', 
  _tree : function(_data)
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'NestedLayoutPanel',
   background : true,
   region : 'center',
   title : _this._strings['e3974584afa867d8619253bc669d6197'] /* Notify Servers */,
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
    south : {
     xtype : 'LayoutRegion',
     height : 200,
     split : true,
     xns : Roo,
     '|xns' : 'Roo'
    },
    items  : [
     {
      xtype : 'NestedLayoutPanel',
      region : 'center',
      title : _this._strings['ac659513b2353187192e88c5d1988228'] /* Servers */,
      listeners : {
       activate : function (_self)
        {
           _this.imagePanel = _self;
            
           
         
           
        //   console.log('activate');
           if (typeof(_this.imageView) == 'undefined') {
             return;
           }
           _this.imageView.el.unmask();
           if (_this.viewPerson) {
               _this.imageView.loadImages();
           } else {
              _this.imageView.el.mask("Select a Person First");
           }
           
           if (_this.hasUploadWatch) {
             return;
           }
            _this.hasUploadWatch =true;
            _this.uploadSending =false;
            window.setInterval( function() {
                // prevent warning in editor..
                if (!_this.uploadForm) {return; }
                 
                
                var val = _this.uploadForm.findField('imageUpload').getValue();
                if (!val || !val.length) {
                    return;
                }
                 var id = _this.viewPerson.id * 1;
                if (!id) {
                    Roo.MessageBox.alert("Error", "Select a person first");
                   _this.uploadForm.reset();
                    return;
                }
                if (_this.uploadSending) {
                    return;
                }
                 _this.uploadSending =true;
                _this.uploadForm.findField('onid').setValue(_this.viewPerson.id);
                _this.uploadForm.el.mask("Sending");
                _this.uploadForm.submit.defer(100, _this.uploadForm);
           
          }, 1000)  
           
        }
      },
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
       east : {
        xtype : 'LayoutRegion',
        hidden : true,
        width : 200,
        xns : Roo,
        '|xns' : 'Roo'
       },
       south : {
        xtype : 'LayoutRegion',
        height : 60,
        xns : Roo,
        '|xns' : 'Roo'
       },
       items  : [
        {
         xtype : 'ContentPanel',
         autoScroll : true,
         fitContainer : true,
         fitToFrame : true,
         region : 'center',
         xns : Roo,
         '|xns' : 'Roo',
         toolbar : {
          xtype : 'Toolbar',
          xns : Roo,
          '|xns' : 'Roo',
          items  : [
           {
            xtype : 'Fill',
            xns : Roo.Toolbar,
            '|xns' : 'Roo.Toolbar'
           },
           {
            xtype : 'Button',
            text : _this._strings['c9d03748d1a54666b5c7a5187109301b'] /* Delete Selected File or  Image */,
            listeners : {
             click : function (_self, e)
              {
                  if (!_this.imageView.getSelectedNodes().length) {
                   Roo.MessageBox.alert("Error", "Select an Image");
                   return;
                 }
                 var id  = _this.imageView.getNodeData(_this.imageView.getSelectedNodes()[0]).id;
                 _this.imageView.el.mask('Deleting');
                 
                 Roo.Ajax.request({
                    url : baseURL + '/Roo/Images.php',
                    params : {
                       _delete : id
                    },
                    method : 'POST',
                    success : function() {
                        _this.imageView.loadImages();
                    },
                    failure : function() {
                         _this.imageView.el.unmask();
                         Roo.MessageBox.alert("Error", "Error deleting image");
                         return;
                    }
                });
               }
            },
            xns : Roo.Toolbar,
            '|xns' : 'Roo.Toolbar'
           }
          ]
         },
         items  : [
          {
           xtype : 'JsonView',
           jsonRoot : 'data',
           loadImages : function() {
               var imgbase = typeof(publicBaseURL) != 'undefined' ? publicBaseURL : rootURL + '/crm.php';
           
                this.load({
                   url : baseURL + '/Roo/Images.php',
                   method : 'GET',
                   params : {
                      ontable : 'crm_person',
                      onid : _this.viewPerson.id,
                      'query[imagesize]' : '150x150',
                      'query[imageBaseURL]' : imgbase,
                      limit : 150
                   },
                   text : 'Loading'
              });
              
           },
           singleSelect : true,
           listeners : {
            beforerender : function (_self, data)
             {
                _this.imageView = _self;
                
                if (this.stylesheet) {
                   return;
                }
                this.el.addClass('thumb-browser');
             
                
                this.stylesheet = Roo.util.CSS.createStyleSheet(
                     {
                       '.thumb-browser .thumb-wrap' : {
                             border:'3px solid #EEE',
                             'float':'left',
                             height:'190px',
                             margin:'2px',
                             'padding-left':'5px',
                             'padding-top':'5px',
                             width:'160px'
                         },
                         '.thumb-browser .x-view-selected' : {
                           border:'3px solid #333'
                       
                         },
                         '.thumblabel' : {
                             'font-size': '11px',
                             'font-family' : 'tahoma, verdana, helvetica',
                             'max-width': '153px',
                                 'overflow': 'hidden',
                                 'white-space': 'nowrap'
                         }
             
                     }, Roo.id()
                     );
                
             },
            dblclick : function (_self, index, node, e)
             {
                    
                    if (!node) {
                     return;
                     }
                    var snode = false;
                    try {
                         snode =  _this.imageView.getNodeData(node);
                     } catch (e) {}
                     
                      
                     if (!snode) {
                         return;
                     }
                     new Pman.Download({
                         url : baseURL + '/Images/Download/' + snode.id + '/'  + snode.shorten_name
                       }); 
             },
            selectionchange : function (_self, selections)
             {
                  
                  var snode = false;
                  if (selections && selections.length) {
                     try {
                        var snode =  _this.imageView.getNodeData(selections[0]);
                     } catch (e) {}
                 }
                  
                 if (!snode) {
                      _this.imagePanel.layout.getRegion('east').hide();
                     return;
                 }
                 _this.imagePanel.layout.getRegion('east').show();    
              
                 _this.imageForm.setValues(snode);
             }
           },
           xns : Roo,
           '|xns' : 'Roo',
           tpl : {
            xtype : 'Template',
            html : '<div class="thumb-wrap"> ' + 
              '<div class="thumb"><img  src="{url_thumb}" class="thumb-img"></div>' + 
              '<div class="thumblabel" qtip="{linkurl}">{title}<br/>{linkurl}</div>' + 
            '</div>',
            xns : Roo,
            '|xns' : 'Roo'
           }
          }
         ]
        },
        {
         xtype : 'ContentPanel',
         region : 'south',
         xns : Roo,
         '|xns' : 'Roo',
         items  : [
          {
           xtype : 'Form',
           fileUpload : true,
           labelWidth : 200,
           progressUrl : baseURL  + '/Core/UploadProgress.php',
           style : 'margin: 10px;',
           url : baseURL + '/Roo/Images.php',
           listeners : {
            actioncomplete : function (_self, action)
             {
             // only action this will handle is submit?
             // should test for errors..
                 if (action.failureType) {
                     _this.uploadForm.el.unmask();
                     _this.uploadSending = false;
                     Roo.MessageBox.alert("Error", "Upload Failed");
                     return false;
                 
                 }
                   
                 
                 if (action.type =='submit') {
                      _this.uploadForm.reset();
                        _this.uploadSending = false;
                       _this.uploadForm.el.unmask();         
                       _this.imageView.loadImages();
                      return;
                 }
                  
             },
            actionfailed : function (_self, action)
             {
             
                _this.uploadForm.el.unmask();
                _this.uploadForm.reset();
                 _this.uploadSending = false;
                 Roo.MessageBox.alert("Error", "Upload Failed");
                 _this.imageView.loadImages();
                 
               
             },
            rendered : function (form)
             {
               _this.uploadForm = form;
             }
           },
           xns : Roo.form,
           '|xns' : 'Roo.form',
           items  : [
            {
             xtype : 'Row',
             xns : Roo.form,
             '|xns' : 'Roo.form',
             items  : [
              {
               xtype : 'Column',
               width : 600,
               xns : Roo.form,
               '|xns' : 'Roo.form',
               items  : [
                {
                 xtype : 'TextField',
                 allowBlank : false,
                 fieldLabel : _this._strings['ea72bacd2fdfa818907bb9559e6905a1'] /* Upload Image or File */,
                 inputType : 'file',
                 name : 'imageUpload',
                 width : 250,
                 listeners : {
                  change : function (_self, newValue, oldValue)
                   {
                       
                   }
                 },
                 xns : Roo.form,
                 '|xns' : 'Roo.form'
                },
                {
                 xtype : 'Hidden',
                 name : 'onid',
                 xns : Roo.form,
                 '|xns' : 'Roo.form'
                },
                {
                 xtype : 'Hidden',
                 name : 'ontable',
                 value : _this._strings['1d05bbecb1dd9127ccc9a5efaf492a2c'] /* crm_person */,
                 xns : Roo.form,
                 '|xns' : 'Roo.form'
                }
               ]
              }
             ]
            }
           ]
          }
         ]
        },
        {
         xtype : 'ContentPanel',
         region : 'east',
         xns : Roo,
         '|xns' : 'Roo',
         items  : [
          {
           xtype : 'Form',
           labelAlign : 'top',
           method : 'POST',
           style : 'margin:10px;',
           url : baseURL + '/Roo/Images.php',
           listeners : {
            actioncomplete : function(_self,action)
             {
                 if (action.type == 'setdata') {
                    //_this.dialog.el.mask("Loading");
                    //this.load({ method: 'GET', params: { '_id' : _this.data.id }});
                    return;
                 }
                 if (action.type == 'load') {
             
                     return;
                 }
                 if (action.type =='submit') {
                      _this.selectAfterLoad = this.findField('id').getValue();
                        var lr =  _this.imagePanel.layout.getRegion('east');
                     lr.el.unmask();
                     _this.imageView.loadImages();
                      return;
                 }
             },
            actionfailed : function (_self, action)
             {
                     var lr =  _this.imagePanel.layout.getRegion('east');
                     lr.el.unmask();
                if (action.failureType ==  Roo.form.Action.CLIENT_INVALID) {
                 Roo.MessageBox.alert("Error", "Correct All the errors in Red");
                 return;
                }
                 Roo.MessageBox.alert("Error", "Problem sending to server");
             },
            rendered : function (form)
             {
             
                 _this.imageForm= form;
             }
           },
           xns : Roo.form,
           '|xns' : 'Roo.form',
           items  : [
            {
             xtype : 'TextArea',
             fieldLabel : _this._strings['b78a3223503896721cca1303f776159b'] /* Title */,
             height : 50,
             name : 'title',
             width : 150,
             xns : Roo.form,
             '|xns' : 'Roo.form'
            },
            {
             xtype : 'ComboBox',
             alwaysQuery : true,
             displayField : 'name',
             editable : false,
             emptyText : _this._strings['8535bcc0f05358a583bb432bbadf7e0d'] /* Select type */,
             fieldLabel : _this._strings['8e16a71b3d8217eb80b39b7d8dec4296'] /* Image Type */,
             forceSelection : true,
             listWidth : 200,
             loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
             minChars : 2,
             name : 'imgtype',
             pageSize : 20,
             qtip : _this._strings['471ddaf9e80da04dd5a3a54daa0239b0'] /* Select Image Type */,
             queryParam : 'query[name]',
             selectOnFocus : true,
             tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{name}</b> </div>',
             triggerAction : 'all',
             typeAhead : true,
             valueField : 'name',
             width : 150,
             xns : Roo.form,
             '|xns' : 'Roo.form',
             store : {
              xtype : 'Store',
              remoteSort : true,
              sortInfo : { direction : 'ASC', field: 'id' },
              listeners : {
               beforeload : function (_self, o){
                    o.params = o.params || {};
                    // set more here
                       // set more here
                    o.params.etype="Image Types";
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
               fields : [],
               id : 'id',
               root : 'data',
               totalProperty : 'total',
               xns : Roo.data,
               '|xns' : 'Roo.data'
              }
             }
            },
            {
             xtype : 'TextField',
             fieldLabel : _this._strings['529701d5ccccf8a1c604c27f48ce7d82'] /* Mimetype */,
             name : 'mimetype',
             readOnly : true,
             width : 150,
             xns : Roo.form,
             '|xns' : 'Roo.form'
            },
            {
             xtype : 'TextField',
             fieldLabel : _this._strings['b18c29b8470190a02813415a04a2191f'] /* Filesize */,
             name : 'filesize',
             readOnly : true,
             width : 75,
             xns : Roo.form,
             '|xns' : 'Roo.form'
            },
            {
             xtype : 'Hidden',
             name : 'id',
             xns : Roo.form,
             '|xns' : 'Roo.form'
            },
            {
             xtype : 'Button',
             text : _this._strings['55cfeeacad2f92b9fea0a1bbb6449fac'] /* Update Image Details */,
             listeners : {
              click : function (_self, e)
               {
               
                   var lr =  _this.imagePanel.layout.getRegion('east');
                   lr.el.mask("Saving");
                  _this.imageForm.submit();
               }
             },
             xns : Roo,
             '|xns' : 'Roo'
            }
           ]
          }
         ]
        }
       ]
      }
     },
     {
      xtype : 'GridPanel',
      background : true,
      fitContainer : true,
      fitToframe : true,
      region : 'center',
      tableName : 'core_notify_server',
      title : _this._strings['ac659513b2353187192e88c5d1988228'] /* Servers */,
      listeners : {
       activate : function() {
            _this.spanel = this;
            if (_this.sgrid) {
                _this.sgrid.footer.onClick('first');
            }
        }
      },
      xns : Roo,
      '|xns' : 'Roo',
      grid : {
       xtype : 'Grid',
       autoExpandColumn : 'hostname',
       loadMask : true,
       listeners : {
        render : function() 
         {
             _this.sgrid = this; 
             //_this.dialog = Pman.Dialog.FILL_IN
             if (_this.spanel.active) {
                this.footer.onClick('first');
             }
         },
        rowclick : function (_self, rowIndex, e)
         {
             (function() { 
                 _this.bgrid.footer.onClick('first');
             }).defer(100);
         },
        rowdblclick : function (_self, rowIndex, e)
         {
             
             Pman.Dialog.CoreNotifyServer.show(
                  this.getDataSource().getAt(rowIndex).data, function() {
                 _this.sgrid.footer.onClick('first');
             }); 
         }
       },
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       footer : {
        xtype : 'PagingToolbar',
        displayInfo : true,
        displayMsg : _this._strings['2023301a71db57f37d50da7d045b881a'] /* Displaying Servers {0} - {1} of {2} */,
        emptyMsg : _this._strings['774ff60df30a64fad1d29f6c2daa8691'] /* No Servers found */,
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
          text : _this._strings['ec211f7c20af43e742bf2570c3cb84f9'] /* Add */,
          listeners : {
           click : function() 
            {
                Pman.Dialog.CoreNotifyServer.show(
                     {}, function() {
                    _this.sgrid.footer.onClick('first');
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
          text : _this._strings['1063e38cb53d94d386f21227fcd84717'] /* Remove */,
          listeners : {
           click : function (_self, e)
            {
                   Pman.genericDelete(_this.spanel, 'core_notify_server');
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
        sortInfo : { field : 'hostname', direction: 'ASC' },
        listeners : {
         beforeload : function (_self, options)
          {
             options.params._with_queue_size  =1 ;
              
          }
        },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         timeout : 120000,
         url : baseURL + '/Roo/core_notify_server',
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
       colModel : [
        {
         xtype : 'ColumnModel',
         dataIndex : 'is_active',
         header : _this._strings['1203cd27e4d1ab6f1296728c021d9c1a'] /* Is Active */,
         renderer : function(v) {
             var state = v> 0 ?  '-checked' : '';
         
             return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
         },
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'hostname',
         header : _this._strings['c8f4b8c435b3d99a66e1b91bec60737c'] /* Hostname */,
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'helo',
         header : _this._strings['825bd435c12978e8492330c2a0d823db'] /* Helo */,
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'poolname',
         header : _this._strings['def36b726efed529b13ba240dd331a12'] /* Pool */,
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'in_queue',
         header : _this._strings['be6838286e448ad65c5b55d690e2c38b'] /* In Queue */,
         renderer : function(v,x,r) {
         
             return r.data.in_queue || 0;
         },
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'last_send',
         header : _this._strings['b26686c0a708faee42861d8b905e882e'] /* Last Sent */,
         renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y  H:i:s') : ''); },
         width : 120,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        }
       ]
      }
     },
     {
      xtype : 'GridPanel',
      background : true,
      fitContainer : true,
      fitToframe : true,
      region : 'south',
      tableName : 'core_notify_recur',
      title : _this._strings['c348b06d2667edd048ded3c1b1878cc1'] /* Recurrent Notifications */,
      listeners : {
       activate : function() {
            _this.bpanel = this;
           
        }
      },
      xns : Roo,
      '|xns' : 'Roo',
      grid : {
       xtype : 'Grid',
       autoExpandColumn : 'error_str',
       loadMask : true,
       listeners : {
        render : function() 
         {
             _this.bgrid = this; 
             //_this.dialog = Pman.Dialog.FILL_IN
             
         }
       },
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       footer : {
        xtype : 'PagingToolbar',
        displayInfo : true,
        displayMsg : _this._strings['2ddb157d4780e8883fbde96f354c57d2'] /* Displaying Blacklists {0} - {1} of {2} */,
        emptyMsg : _this._strings['c5dd93dd1011986763b5925e0af25e08'] /* No Blacklists found */,
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
          xtype : 'Fill',
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         },
         {
          xtype : 'Button',
          text : _this._strings['1063e38cb53d94d386f21227fcd84717'] /* Remove */,
          listeners : {
           click : function (_self, e)
            {
                Pman.Delete.progress(_this.bpanel, 'core_notify_blacklist');
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
        sortInfo : { field : 'person_id_name', direction: 'ASC' },
        listeners : {
         beforeload : function (_self, opts)
          {
              if(!_this.sgrid.getSelectionModel().getSelected()) {
                  return false;
              }
              
              opts.params.server_id =    _this.sgrid.getSelectionModel().getSelected().data.id;
          }
        },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         url : baseURL + '/Roo/core_notify_blacklist',
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
       colModel : [
        {
         xtype : 'ColumnModel',
         dataIndex : 'added_dt',
         header : _this._strings['f29ddbfb905eb2593fdcdfb243f9af85'] /* Added */,
         renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y H:i:s') : ''); },
         sortable : true,
         width : 120,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'domain_id_domain',
         header : _this._strings['eae639a70006feff484a39363c977e24'] /* Domain */,
         sortable : true,
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'error_str',
         header : _this._strings['902b0d55fddef6f8d651fe1035b7d4bd'] /* Error */,
         sortable : true,
         width : 150,
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
