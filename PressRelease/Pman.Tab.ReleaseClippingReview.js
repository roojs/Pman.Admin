//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.ReleaseClippingReview = new Roo.XComponent({

 _strings : {
  '10ac3d04253ef7e1ddc73e6091c0cd55' :"Next",
  'c4408d335012a56ff58937d78050efad' :"Accept",
  'd98ac12774fca5c3cbaffe276840c55f' :"Reject",
  '1ac5c7b6833c0609701f35f222b2978b' :"press release preview",
  '0557fa923dcee4d0f86b1409f5c2167f' :"Back",
  '99fa11bca0f5b0d2fb4ba8160784557a' :"press content",
  '457dd55184faedb7885afd4009d70163' :"Review",
  '0e3f13e85602295241eed316d31068fb' :"URL : "
 },

  part     :  ["PressRelease", "ReleaseClippingReview" ],
  order    : '400-Pman.Tab.ReleaseClippingReview',
  region   : 'center',
  parent   : 'Pman.Tab.ClippingTab',
  name     : "Pman.Tab.ReleaseClippingReview",
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
     width : 600,
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
      toolbar : {
       '|xns' : 'Roo',
       xns : Roo,
       xtype : 'Toolbar',
       items : [
        {
         store : {
          proxy : {
           '|xns' : 'Roo.data',
           method : 'GET',
           url : baseURL+'/Roo/Projects.php',
           xns : Roo.data,
           xtype : 'HttpProxy'
          },
          reader : {
           '|xns' : 'Roo.data',
           fields : [
               {
                   'name':'id',
                   'type':'int'
               },
               {
                   'name':'pressrelease_id',
                   'type':'int'
               },
               {
                   'name':'name',
                   'type':'string'
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
          sortInfo : {field:'pressrelease_id',direction:'DESC'},
          xns : Roo.data,
          xtype : 'Store',
          listeners : {
           beforeload : function (_self, o)
            {
                o.params = o.params || {};
                o.params.joinAddPressRelease = 1;
            }
          },
          items : [

          ]

         },
         '|xns' : 'Roo.form',
         alwaysQuery : true,
         displayField : 'name',
         editable : true,
         fieldLabel : 'press releases',
         forceSelection : true,
         hiddenName : 'project_id',
         listWidth : 400,
         minChars : 2,
         pageSize : 20,
         queryParam : 'query[name]',
         tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>#{pressrelease_id} - {name}</b> </div>',
         triggerAction : 'all',
         typeAhead : true,
         valueField : 'id',
         width : 300,
         xns : Roo.form,
         xtype : 'ComboBox',
         listeners : {
          render : function (_self)
           {
               _this.pressreleaseSel = this;
               
               _this.project_id = 0;
           },
          select : function (combo, record, index)
           {
               if(record.data.id * 1 < 1 || record.data.pressrelease_id * 1 < 1){
                   return;
               }
               
               _this.release_id = record.data.pressrelease_id;
               
               _this.release_lang = (record.data.languages.length) ? record.data.languages : 'en';
               
               _this.pressreleasePreview.view.store.load({});
               
               
               new Pman.Request({
                   url : baseURL + '/Roo/Clipping.php',
                   method : 'GET',
                   mask : 'Processing',
                   params : {
                       project_id : record.data.id,
                       rejected : 1,
                       release_review : 0,
                       _columns : 'id,language,remote_url',
                       sort : 'created',
                       dir : 'DESC'
                   }, 
                   success : function(res) {
                       
                       _this.url.reset();
                       
                       _this.clippingContent.el.dom.src =  'about:blank';
                       
                       _this.clipping_data = res.data;
                      
                       _this.clipping_current = 0;
                      
                       _this.backBtn.disable();
                       _this.nextBtn.disable();
                       _this.acceptBtn.disable();
                       _this.rejectBtn.disable();
                      
                       if(!res.data.length){
                            return;
                       }
                       
                       _this.acceptBtn.enable();
                       _this.rejectBtn.enable();
                      
                       if(_this.clipping_current > 0){
                           _this.backBtn.enable();
                       }
                      
           
                       if(_this.clipping_current < (_this.clipping_data.length - 1)){
                            _this.nextBtn.enable();
                       }
                      
                       _this.clippingContent.load();
                   }
               });
              
           }
         },
         items : [

         ]

        }
       ]

      },
      view : {
       store : {
        proxy : {
         '|xns' : 'Roo.data',
         method : 'GET',
         url : baseURL+'/Roo/Pressrelease_entry',
         xns : Roo.data,
         xtype : 'HttpProxy'
        },
        reader : {
         '|xns' : 'Roo.data',
         id : 'id',
         root : 'data',
         xns : Roo.data,
         xtype : 'JsonReader'
        },
        '|xns' : 'Roo.data',
        xns : Roo.data,
        xtype : 'Store',
        listeners : {
         beforeload : function (_self, options)
          {
              
              options.params = options.params || {};
              var pid = _this.release_id * 1;
              
              if (isNaN(pid) || pid < 1) {
                  this.removeAll();
                  return false;
              }
              
              options.params._pressrelease_clipping_review = 1;
              options.params.id = pid;
              
          },
         load : function (_self, records, options)
          {
              Roo.each(_this.pressreleasePreview.el.select('a.language', true).elements, function(v){
                  v.on('click',function(e){
                      var pid = v.attr('data-id') * 1;
                      
                      if(isNaN(pid) || pid < 1){
                          return;
                      }
                      
                      _this.release_id = pid;
                      
                      var lang = v.attr('data-langauge');
                      
                      _this.release_lang = (lang.length) ? lang : 'en';
              
                      _this.pressreleasePreview.view.store.load({});    
                  });
              
              });
          
          }
        },
        items : [

        ]

       },
       '|xns' : 'Roo',
       tpl : new Roo.DomTemplate({url : rootURL+'/Pman/PressRelease/domtemplates/pressrelease_entry.html'}),
       xns : Roo,
       xtype : 'View',
       listeners : {
        preparedata : function (_self, data, i, rec)
         {  
             Roo.apply(data, rec.json);
         }
       },
       items : [

       ]

      },
      '|xns' : 'Roo',
      autoScroll : true,
      fitToFrame : true,
      region : 'west',
      title : _this._strings['1ac5c7b6833c0609701f35f222b2978b'],
      xns : Roo,
      xtype : 'ContentPanel',
      listeners : {
       render : function (_self)
        {
             _this.pressreleasePreview = this;
        }
      },
      items : [

      ]

     },
     {
      layout : {
       center : {
        '|xns' : 'Roo',
        split : true,
        xns : Roo,
        xtype : 'LayoutRegion'
       },
       south : {
        '|xns' : 'Roo',
        height : 28,
        xns : Roo,
        xtype : 'LayoutRegion'
       },
       '|xns' : 'Roo',
       xns : Roo,
       xtype : 'BorderLayout',
       items : [
        {
         toolbar : {
          '|xns' : 'Roo',
          xns : Roo,
          xtype : 'Toolbar',
          items : [
           {
            '|xns' : 'Roo.Toolbar',
            text : _this._strings['0e3f13e85602295241eed316d31068fb'],
            xns : Roo.Toolbar,
            xtype : 'TextItem'
           },
           {
            '|xns' : 'Roo.Toolbar',
            xns : Roo.Toolbar,
            xtype : 'Spacer'
           },
           {
            '|xns' : 'Roo.form',
            fieldLabel : 'URL',
            readOnly : true,
            width : 400,
            xns : Roo.form,
            xtype : 'TextField',
            listeners : {
             render : function (_self)
              {
                  _this.url = this;
              }
            }
           }
          ]

         },
         '|xns' : 'Roo',
         autoCreate : { tag: 'iframe', src : 'about:blank' },
         autoScroll : true,
         background : false,
         fitToFrame : true,
         load : function() 
         {
             _this.layout.getRegion('center').el.mask('loading...');
             
             _this.layout.getRegion('center').el._mask.on('click', function(){
                 _this.layout.getRegion('center').el.unmask();
             });
             
             _this.backBtn.disable();
             _this.nextBtn.disable();
             _this.acceptBtn.disable();
             _this.rejectBtn.disable();
                     
             if(
                 _this.clipping_current < 0 || 
                 _this.clipping_current > (_this.clipping_data.length - 1) ||
                 typeof(_this.clipping_data[_this.clipping_current]) == 'undefined' ||
                 typeof(_this.clipping_data[_this.clipping_current].remote_url) == 'undefined'    
             ){
                 return;
             }
             
             _this.footerMsg.el.innerHTML = String.format('{0} of {1}', _this.clipping_current + 1, _this.clipping_data.length);
             
             _this.acceptBtn.enable();
             _this.rejectBtn.enable();
            
             if(_this.clipping_current > 0){
                 _this.backBtn.enable();
             }
            
         
             if(_this.clipping_current < (_this.clipping_data.length - 1)){
                  _this.nextBtn.enable();
             }
             
             var color = '#d9534f';
             
             if(
                 typeof(_this.clipping_data[_this.clipping_current].accepted) != 'undefined' && 
                 _this.clipping_data[_this.clipping_current].accepted
             ){
                 color = '#5cb85c';
             }
             
             _this.url.el.setStyle('background', color);
             
             _this.url.setValue(decodeURIComponent(_this.clipping_data[_this.clipping_current].remote_url));
             
             _this.clippingContent.el.dom.src =  _this.clipping_data[_this.clipping_current].remote_url;
             
             var clipping_lang = _this.clipping_data[_this.clipping_current].language.length ? _this.clipping_data[_this.clipping_current].language : 'en';
             
             if(clipping_lang == _this.release_lang){
                 return;
             }
             
             var refesh_release = function(){
             
                 if(!_this.pressreleasePreview.el.select('a.language', true).elements.length){
                     return;
                 }
                 
                 Roo.each(_this.pressreleasePreview.el.select('a.language', true).elements, function(v){
                 
                     var lang = v.attr('data-langauge');
                     
                     lang = (lang.length) ? lang : 'en';
                     
                     if(lang != clipping_lang){
                         return;
                     }
                     
                     var pid = v.attr('data-id') * 1;
                 
                     if(isNaN(pid) || pid < 1){
                         return;
                     }
                     
                     _this.release_lang = lang;
                     
                     _this.release_id = pid;
                     
                     _this.pressreleasePreview.view.store.load({});
                     
                     return false;
                     
                 });
             }
             
             if(!_this.pressreleasePreview.el.select('a.language', true).elements.length){
                 refesh_release.defer(500);
                 return;
             }
              
             refesh_release();
         },
         region : 'center',
         title : _this._strings['99fa11bca0f5b0d2fb4ba8160784557a'],
         xns : Roo,
         xtype : 'ContentPanel',
         listeners : {
          activate : function (_self)
           {
               this.el.addListener('load', function(){
                   if(typeof(_this.layout.getRegion('center').el._mask) == 'undefined'){
                       return;
                   }
                   
                   _this.layout.getRegion('center').el.unmask();
                   
               });
           },
          render : function (_self)
           {
               _this.clippingContent = this;
               
               
           }
         },
         items : [

         ]

        },
        {
         toolbar : {
          '|xns' : 'Roo',
          xns : Roo,
          xtype : 'Toolbar',
          items : [
           {
            '|xns' : 'Roo.Toolbar',
            minWidth : 50,
            text : _this._strings['0557fa923dcee4d0f86b1409f5c2167f'],
            xns : Roo.Toolbar,
            xtype : 'Button',
            listeners : {
             click : function (_self, e)
              {
                  if(_this.clipping_current < 1){
                      return;
                  }    
                  
                  _this.clipping_current = _this.clipping_current - 1;
                  
                  _this.clippingContent.load();
              },
             render : function (_self)
              {
                  _this.backBtn = this;
                  
                  this.disable();
              }
            }
           },
           {
            '|xns' : 'Roo.Toolbar',
            xns : Roo.Toolbar,
            xtype : 'Spacer',
            listeners : {
             render : function (_self)
              {
                  Roo.get(this.el).setStyle('width', '20px');
              }
            }
           },
           {
            '|xns' : 'Roo.Toolbar',
            minWidth : 50,
            text : _this._strings['10ac3d04253ef7e1ddc73e6091c0cd55'],
            xns : Roo.Toolbar,
            xtype : 'Button',
            listeners : {
             click : function (_self, e)
              {
                  if(_this.clipping_current >= (_this.clipping_data.length - 1)){
                      return;
                  }    
                  
                  _this.clipping_current = _this.clipping_current + 1;
                  
                  _this.clippingContent.load();
              },
             render : function (_self)
              {
                  _this.nextBtn = this;
                  
                  this.disable();
              }
            }
           },
           {
            '|xns' : 'Roo.Toolbar',
            xns : Roo.Toolbar,
            xtype : 'Spacer',
            listeners : {
             render : function (_self)
              {
                  Roo.get(this.el).setStyle('width', '20px');
              }
            }
           },
           {
            '|xns' : 'Roo.Toolbar',
            xns : Roo.Toolbar,
            xtype : 'TextItem',
            listeners : {
             render : function (_self)
              {
                  _this.footerMsg = this;
                  
              }
            }
           },
           {
            '|xns' : 'Roo.Toolbar',
            xns : Roo.Toolbar,
            xtype : 'Fill'
           },
           {
            '|xns' : 'Roo.Toolbar',
            minWidth : 50,
            text : _this._strings['c4408d335012a56ff58937d78050efad'],
            xns : Roo.Toolbar,
            xtype : 'Button',
            listeners : {
             click : function (_self, e)
              {
                  if(
                      _this.clipping_current < 0 || 
                      _this.clipping_current > (_this.clipping_data.length - 1) ||
                      typeof(_this.clipping_data[_this.clipping_current]) == 'undefined' ||
                      typeof(_this.clipping_data[_this.clipping_current].remote_url) == 'undefined' ||
                      typeof(_this.clipping_data[_this.clipping_current].id) == 'undefined' ||
                      isNaN(_this.clipping_data[_this.clipping_current].id * 1) ||
                      _this.clipping_data[_this.clipping_current].id * 1 < 0
                  ){
                      return;
                  }
                  
                  new Pman.Request({
                      url : baseURL + '/Roo/Clipping.php',
                      method : 'POST',
                      mask : 'Processing',
                      params : {
                          id : _this.clipping_data[_this.clipping_current].id * 1,
                          rejected : 0,
                          release_review : 1
                      }, 
                      success : function(res) {
                          _this.url.el.setStyle('background', '#5cb85c');
                          
                          _this.clipping_data[_this.clipping_current].accepted = true;
                          
                          return;
                      }
                  });
                  
              },
             render : function (_self)
              {
                  _this.acceptBtn = this;
                  
                  this.disable();
                  
                  this.el.setStyle('background', '#5cb85c');
                  this.el.select('.x-btn-left', true).first().setStyle('background', '#5cb85c');
                  this.el.select('.x-btn-center', true).first().setStyle('background', '#5cb85c');
                  this.el.select('.x-btn-right', true).first().setStyle('background', '#5cb85c');
                  
                  this.on('mouseover', function(){
                      _self.el.setStyle('background', '#449d44');
                      _self.el.select('.x-btn-left', true).first().setStyle('background', '#449d44');
                      _self.el.select('.x-btn-center', true).first().setStyle('background', '#449d44');
                      _self.el.select('.x-btn-right', true).first().setStyle('background', '#449d44');
                  });
                  
                  this.on('mouseout', function(){
                      _self.el.setStyle('background', '#5cb85c');
                      _self.el.select('.x-btn-left', true).first().setStyle('background', '#5cb85c');
                      _self.el.select('.x-btn-center', true).first().setStyle('background', '#5cb85c');
                      _self.el.select('.x-btn-right', true).first().setStyle('background', '#5cb85c');
                  });
              }
            }
           },
           {
            '|xns' : 'Roo.Toolbar',
            xns : Roo.Toolbar,
            xtype : 'Spacer',
            listeners : {
             render : function (_self)
              {
                  Roo.get(this.el).setStyle('width', '20px');
              }
            }
           },
           {
            '|xns' : 'Roo.Toolbar',
            minWidth : 50,
            text : _this._strings['d98ac12774fca5c3cbaffe276840c55f'],
            xns : Roo.Toolbar,
            xtype : 'Button',
            listeners : {
             click : function (_self, e)
              {
                  if(
                      _this.clipping_current < 0 || 
                      _this.clipping_current > (_this.clipping_data.length - 1) ||
                      typeof(_this.clipping_data[_this.clipping_current]) == 'undefined' ||
                      typeof(_this.clipping_data[_this.clipping_current].remote_url) == 'undefined' ||
                      typeof(_this.clipping_data[_this.clipping_current].id) == 'undefined' ||
                      isNaN(_this.clipping_data[_this.clipping_current].id * 1) ||
                      _this.clipping_data[_this.clipping_current].id * 1 < 0
                  ){
                      return;
                  }
                  
                  new Pman.Request({
                      url : baseURL + '/Roo/Clipping.php',
                      method : 'POST',
                      mask : 'Processing',
                      params : {
                          id : _this.clipping_data[_this.clipping_current].id * 1,
                          rejected : 1,
                          release_review : 1
                      }, 
                      success : function(res) {
                          _this.url.el.setStyle('background', '#d9534f');
                          _this.clipping_data[_this.clipping_current].accepted = false;
                          return;
                      }
                  });
                  
              },
             render : function (_self)
              {
                  _this.rejectBtn = this;
                  
                  this.disable();
                  
                  this.el.setStyle('background', '#d9534f');
                  this.el.select('.x-btn-left', true).first().setStyle('background', '#d9534f');
                  this.el.select('.x-btn-center', true).first().setStyle('background', '#d9534f');
                  this.el.select('.x-btn-right', true).first().setStyle('background', '#d9534f');
                  
                  this.on('mouseover', function(){
                      _self.el.setStyle('background', '#c9302c');
                      _self.el.select('.x-btn-left', true).first().setStyle('background', '#c9302c');
                      _self.el.select('.x-btn-center', true).first().setStyle('background', '#c9302c');
                      _self.el.select('.x-btn-right', true).first().setStyle('background', '#c9302c');
                  });
                  
                  this.on('mouseout', function(){
                      _self.el.setStyle('background', '#d9534f');
                      _self.el.select('.x-btn-left', true).first().setStyle('background', '#d9534f');
                      _self.el.select('.x-btn-center', true).first().setStyle('background', '#d9534f');
                      _self.el.select('.x-btn-right', true).first().setStyle('background', '#d9534f');
                  });
              }
            }
           }
          ]

         },
         '|xns' : 'Roo',
         region : 'south',
         xns : Roo,
         xtype : 'ContentPanel',
         items : [

         ]

        }
       ]

      },
      '|xns' : 'Roo',
      region : 'center',
      xns : Roo,
      xtype : 'NestedLayoutPanel',
      items : [

      ]

     }
    ]

   },
   '|xns' : 'Roo',
   region : 'center',
   title : _this._strings['457dd55184faedb7885afd4009d70163'],
   xns : Roo,
   xtype : 'NestedLayoutPanel',
   items : [

   ]

  };  }
});
