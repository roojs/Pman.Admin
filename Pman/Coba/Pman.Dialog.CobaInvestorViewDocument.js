//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.CobaInvestorViewDocument= function() {}
Roo.apply(Pman.Dialog.CobaInvestorViewDocument.prototype, {

 _strings : {
  'd3d2e617335f08df83599665eef8a418' :"Close",
  'e8e7ffc6c93c719011760eefa8b92621' :"Download Original",
  '91fe4cf4aa01a04fe3cc52827c526097' :"View Document"
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
    xtype : 'Modal',
    allow_close : false,
    cls : 'enable-overflow document-slider-dialog',
    title : _this._strings['91fe4cf4aa01a04fe3cc52827c526097'] /* View Document */,
    listeners : {
     show : function (_self)
      {
          if(typeof(_this.data.file) == 'undefined' || _this.data.file.id * 1 < 1){
              _this.dialog.hide();
              return;
          }
          
          var width = _this.viewer.thumbEl.getWidth();
          
          var files = [
              baseURL +'/Images/Thumb/' + width + '/' + _this.data.file.id + '/' + _this.data.file.filename
          ];
          
          if(_this.data.file.no_of_pages * 1 > 1){
              
              files = [];
              
              for ( var i = 1; i <= _this.data.file.no_of_pages * 1; i++){
                  files.push(baseURL +'/Images/Thumb/' + width + '/' + _this.data.file.id + '/' + _this.data.file.filename + '?page=' + i);
              }
              
          }
          
          window.addEventListener("resize", _this.viewer.resize);
          
          _this.viewer.files = files;
          
          _this.viewer.initial();
          
          _this.viewer.resize();
          
      }
    },
    xns : Roo.bootstrap,
    '|xns' : 'Roo.bootstrap',
    buttons : [
     {
      xtype : 'Button',
      html : _this._strings['e8e7ffc6c93c719011760eefa8b92621'] /* Download Original */,
      weight : 'primary',
      listeners : {
       click : function (_self, e)
        {
            if(typeof(_this.data.file) == 'undefined' || _this.data.file.id * 1 < 1){
                return;
            }
            
            new Pman.Download({
                url: baseURL + '/Images/Download/' + _this.data.file.id
            });
            
        }
      },
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap'
     },
     {
      xtype : 'Button',
      html : _this._strings['d3d2e617335f08df83599665eef8a418'] /* Close */,
      listeners : {
       click : function (_self, e)
        {
            _this.dialog.hide();
        }
      },
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap'
     }
    ],
    items  : [
     {
      xtype : 'Row',
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap',
      items  : [
       {
        xtype : 'Column',
        xs : 12,
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap',
        items  : [
         {
          xtype : 'DocumentSlider',
          resize : function() 
          { 
              var view_height = Roo.lib.Dom.getViewHeight();
              
              var dialog_margins = _this.dialog.dialogEl.getMargins();
              
              var dialog_header = _this.dialog.headerEl.getHeight();
          
              var dialog_footer = _this.dialog.footerEl.getHeight();
              
              var dialog_usage = dialog_margins.top + dialog_margins.bottom + dialog_header + dialog_footer;
          
              var available_height = view_height - dialog_usage - _this.viewer.headerEl.getHeight();;
              
              _this.viewer.bodyEl.setHeight(available_height);
              
          },
          showTrash : false,
          listeners : {
           render : function (_self)
            {
                _this.viewer = this;
                
                this.el.setVisibilityMode(Roo.Element.DISPLAY);
                
            }
          },
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap'
         }
        ]
       }
      ]
     }
    ]
   }  );
 }
});
Roo.apply(Pman.Dialog.CobaInvestorViewDocument, Pman.Dialog.CobaInvestorViewDocument.prototype);
