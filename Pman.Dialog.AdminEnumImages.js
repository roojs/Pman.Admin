//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminEnumImages = {

 _strings : {
  '0c81971f67c0bd4b33799c5365ec2bf5' :"No Images found",
  '5b94af0908e765fe39e4d0e8f9c99ef8' :"Add / Edit Images",
  'fff0d600f8a0b5e19e88bfb821dd1157' :"Images",
  'ec211f7c20af43e742bf2570c3cb84f9' :"Add",
  '0eceeb45861f9585dd7a97a3e36f85c6' :"Created",
  '7dce122004969d56ae2e0245cb754d35' :"Edit",
  'be53a0541a6d36f6ecb879fa2c584b08' :"Image",
  'b78a3223503896721cca1303f776159b' :"Title",
  'd3d2e617335f08df83599665eef8a418' :"Close",
  'c0ed345ec857c06b31f7e88745c9bc40' :"Displaying Images  {0} - {1} of {2}",
  'f2a6c498fb90ee345d997f888fce3b18' :"Delete"
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
    height : 500,
    modal : true,
    title : _this._strings['5b94af0908e765fe39e4d0e8f9c99ef8'] /* Add / Edit Images */,
    width : 900,
    listeners : {
     show : function (_self)
      {
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
      text : _this._strings['d3d2e617335f08df83599665eef8a418'] /* Close */,
      listeners : {
       click : function (_self, e)
        {
            _this.dialog.hide();
            _this.callback(true);
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
      tableName : 'Images',
      title : _this._strings['fff0d600f8a0b5e19e88bfb821dd1157'] /* Images */,
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
       autoExpandColumn : 'title',
       loadMask : true,
       listeners : {
        render : function() { 
             _this.grid = this; 
             //_this.dialog = Pman.Dialog.FILL_IN
             //if (_this.panel.active) {
             //   this.footer.onClick('first');
             //}
         },
        rowdblclick : function (_self, rowIndex, e)
         {
           
            var s =  _self.getDataSource().getAt(rowIndex);
              Pman.Dialog.Image.show(s.data, function() {
                         _this.grid.footer.onClick('first');
                        }); 
         }
       },
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       footer : {
        xtype : 'PagingToolbar',
        displayInfo : true,
        displayMsg : _this._strings['c0ed345ec857c06b31f7e88745c9bc40'] /* Displaying Images  {0} - {1} of {2} */,
        emptyMsg : _this._strings['0c81971f67c0bd4b33799c5365ec2bf5'] /* No Images found */,
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
          text : _this._strings['ec211f7c20af43e742bf2570c3cb84f9'] /* Add */,
          listeners : {
           click : function()
            {
                        
                //var sel = Pman.Tab.PressReleaseCompanies  ? Pman.Tab.PressReleaseCompanies.grid.getSelectionModel().getSelected() : false
                 
                Pman.Dialog.Image.show({
                    id : 0, 
                    ontable: 'core_enum',
                    onid: _this.data.onid,
                    imgtype : ''
                }, function(data){
                    if (!data) { return; } 
                    _this.grid.footer.onClick('first');
                }); 
            
            }
          },
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         },
         {
          xtype : 'Button',
          cls : 'x-btn-text-icon',
          icon : Roo.rootURL + 'images/default/tree/leaf.gif',
          text : _this._strings['7dce122004969d56ae2e0245cb754d35'] /* Edit */,
          listeners : {
           click : function()
            {
                var s = _this.grid.getSelectionModel().getSelections();
                console.log(s);
                if (!s || s.length != 1) {
                    Roo.MessageBox.alert("Error", "Select a single image to edit");
                   return;
                 }
                 var data = _this.grid.getDataSource().getById(s[0].data.id).data;
                
                         Pman.Dialog.Image.show(data, function() {
                            _this.grid.footer.onClick('first');
                           });
                        
                    }
          },
          xns : Roo,
          '|xns' : 'Roo'
         },
         {
          xtype : 'Button',
          cls : 'x-btn-text-icon',
          icon : rootURL + '/Pman/templates/images/trash.gif',
          text : _this._strings['f2a6c498fb90ee345d997f888fce3b18'] /* Delete */,
          listeners : {
           click : function()
            {
                var ids = [];
                
                var sc = _this.grid.getSelectionModel().getSelections();
                
                if (!sc.length) {
                    Roo.MessageBox.alert("Error", "Select rows by clicking the row");
                    return;
                }
                Roo.each(sc, function(v){
                    ids.push(v.id);
                });
                Roo.MessageBox.confirm(
                    "Confirm", 
                    "Confirm Deletion of selected rows (some rows can not be deleted if they are referenced elsewhere", 
                    function(res) {
                        if(res != 'yes') {
                            return;
                        }
                        new Pman.Request({
                            method : 'POST',
                            url : baseURL + '/Roo/Images',
                            params : {
                                _delete  : ids.join(',')
                            },
                            success : function() {
                                _this.grid.footer.onClick('refresh');
                            }
                        });
                    }
                );
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
        sortInfo : { field: 'created' , direction: 'DESC' },
        listeners : {
         beforeload : function (_self, o)
          {
              //o.params.ontable = 'Companies';
              
            //   o.params.imgtype = 'PressRelease';
              
              o.params = o.params || {};
              o.params.onid = _this.data.onid;
              o.params.ontable = 'core_enum';
              Roo.log(_this);
              
          },
         load : function (_self, records, options)
          {
           _this.panel.el.unmask();
          }
        },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         url : baseURL + '/Roo/Images.php',
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
                 'name': 'filename',
                 'type': 'string'
             },
             {
                 'name': 'ontable',
                 'type': 'string'
             },
             {
                 'name': 'onid',
                 'type': 'int'
             },
             {
                 'name': 'mimetype',
                 'type': 'string'
             },
             {
                 'name': 'width',
                 'type': 'int'
             },
             {
                 'name': 'height',
                 'type': 'int'
             },
             {
                 'name': 'filesize',
                 'type': 'int'
             },
             {
                 'name': 'displayorder',
                 'type': 'int'
             },
             {
                 'name': 'language',
                 'type': 'string'
             },
             {
                 'name': 'parent_image_id',
                 'type': 'int'
             },
             {
                 'name': 'created',
                 'type': 'date',
                 'dateFormat' : 'Y-m-d H:i:s'
             },
             {
                 'name': 'imgtype',
                 'type': 'string'
             },
             {
                 'name': 'linkurl',
                 'type': 'string'
             },
             {
                 'name': 'descript',
                 'type': 'string'
             },
             {
                 'name': 'title',
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
       colModel : [
        {
         xtype : 'ColumnModel',
         dataIndex : 'created',
         header : _this._strings['0eceeb45861f9585dd7a97a3e36f85c6'] /* Created */,
         renderer : function(v,x,r) {
                return String.format('{0}<br/><i>{1}</i><br/>{2}<br/><i>{3}x{4}</i>',
                     v.format('d/M/Y'), r.data.mimetype, r.data.filename,
             r.data.width, r.data.height
             ); 
         },
         sortable : true,
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'id',
         header : _this._strings['be53a0541a6d36f6ecb879fa2c584b08'] /* Image */,
         renderer : function(v,x,r) { return String.format('<img src="{0}/Images/Thumb/100/{1}/{2}" width="100">', baseURL, v, r.data.filename); },
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'title',
         header : _this._strings['b78a3223503896721cca1303f776159b'] /* Title */,
         renderer : function(v,x,r) {
         //     var surl = r.json.url.replace(/\/release.php\/Images\//, '/i/').replace(/\/([0-9]+)\/.*$/, '/$1');;
           //   var svurl = r.json.url_view.replace(/\/release.php\/Images\//, '/i/').replace(/\/([0-9]+)\/.*$/, '/$1');;
             //  return String.format(
               //    'Download Url : <a href="http://{0}{1}" target="_new">http://{0}{1}</a>' + 
                 //  '<br/>View Url : <a href="http://{0}{2}" target="_new">http://{0}{2}</a>' + 
                   //'<br/><b>{3}</b><br/>{4}</i>', 
                  // window.location.host, surl, svurl,
                   // v, r.json.descript); 
              
             },
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        }
       ]
      }
     }
    ]
   });
 }
};
