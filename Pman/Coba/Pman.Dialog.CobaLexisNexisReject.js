//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.CobaLexisNexisReject= function() {}
Roo.apply(Pman.Dialog.CobaLexisNexisReject.prototype, {

 _strings : {
  'faaa46e5416608c7bd60089125d8ad37' :"explain why you do not think this match is relivant - please quote from the text if necessary.",
  '6bb61e3b7bce0931da574d19d1d82c88' :"-1",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  '1556cbebad269b3687e8b7265acd8530' :"Please explain why this match is not relivant",
  'e0aa021e21dddbd6d8cecec71e9cf564' :"OK"
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
    cls : 'enable-overflow',
    fitwindow : true,
    title : _this._strings['1556cbebad269b3687e8b7265acd8530'] /* Please explain why this match is not relivant */,
    listeners : {
     show : function (_self)
      {
          window.addEventListener("resize", _this.lexis_nexis_frame.resize);
          
          _this.lexis_nexis_frame.resize();
          
          var url = 'about:blank';
          
          if(_this.data.id * 1 > 0){
              url = baseURL + '/Coba/Reports/LexisNexisDetail/' + _this.data.id;
          }
          
          _this.lexis_nexis_frame.el.dom.src = url;
      }
    },
    xns : Roo.bootstrap,
    '|xns' : 'Roo.bootstrap',
    buttons : [
     {
      xtype : 'Button',
      html : _this._strings['ea4788705e6873b424c65e91c2846b19'] /* Cancel */,
      listeners : {
       click : function (_self, e)
        {
            _this.dialog.hide();
        }
      },
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap'
     },
     {
      xtype : 'Button',
      html : _this._strings['e0aa021e21dddbd6d8cecec71e9cf564'] /* OK */,
      weight : 'primary',
      listeners : {
       click : function (_self, e)
        {
            _this.form.doAction('submit');
        }
      },
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap'
     }
    ],
    items  : [
     {
      xtype : 'Form',
      loadMask : false,
      method : 'POST',
      style : 'margin:15px;',
      url : baseURL+'/Roo/Coba_investor_lexis_results',
      listeners : {
       actioncomplete : function (_self, action)
        {
            if(action.type == 'setdata'){
            
                return;
            }
        
        
            if (action.type =='submit') {
                
                _this.dialog.hide();
                
                if (_this.callback) {
                    _this.callback.call(_this, action.result);
                }
                
                _this.form.reset();
                
                return;
            }
        
        },
       actionfailed : function (_self, action)
        {
            Roo.log(action);
            
            var err = 'Please Correct all the errors in red';
           
            if (
                    typeof(action) != 'undefined' && 
                    (
                        action.failureType == 'server' ||
                        action.failureType == 'load'
                    )
            ) {
                err = action.result.errorMsg;
            }
            
            Roo.bootstrap.MessageBox.alert('Error', err);
            return;
            
        },
       render : function (_self)
        {
            _this.form = _self;
        }
      },
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap',
      items  : [
       {
        xtype : 'Row',
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap',
        items  : [
         {
          xtype : 'Column',
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap',
          items  : [
           {
            xtype : 'TextArea',
            allowBlank : false,
            name : 'reason',
            placeholder : _this._strings['faaa46e5416608c7bd60089125d8ad37'] /* explain why you do not think this match is relivant - please quote from the text if necessary. */,
            rows : 2,
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap'
           }
          ]
         }
        ]
       },
       {
        xtype : 'Row',
        style : 'margin-top: 15px;',
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap',
        items  : [
         {
          xtype : 'Column',
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap',
          items  : [
           {
            xtype : 'Element',
            resize : function() 
            { 
                var height = _this.dialog.bodyEl.getHeight(true);
                
                var reason_height = _this.form.findField('reason').el.getHeight();
                
                _this.lexis_nexis_frame.el.setHeight(height - reason_height);
                
            },
            style : 'width:100%;border:none;',
            tag : 'iframe',
            listeners : {
             render : function (_self)
              {
                  _this.lexis_nexis_frame = this;
                  
              }
            },
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap'
           }
          ]
         }
        ]
       },
       {
        xtype : 'Input',
        inputType : 'hidden',
        name : 'id',
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap'
       },
       {
        xtype : 'Input',
        inputType : 'hidden',
        name : 'status',
        value : _this._strings['6bb61e3b7bce0931da574d19d1d82c88'] /* -1 */,
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap'
       }
      ]
     }
    ]
   }  );
 }
});
Roo.apply(Pman.Dialog.CobaLexisNexisReject, Pman.Dialog.CobaLexisNexisReject.prototype);
