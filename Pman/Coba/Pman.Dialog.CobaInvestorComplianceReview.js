//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.CobaInvestorComplianceReview= function() {}
Roo.apply(Pman.Dialog.CobaInvestorComplianceReview.prototype, {

 _strings : {
  'd98ac12774fca5c3cbaffe276840c55f' :"Reject",
  'c4408d335012a56ff58937d78050efad' :"Accept",
  '57d3c3623b963750443582d79de27efc' :"Please review the Compliance Report"
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
    title : _this._strings['57d3c3623b963750443582d79de27efc'] /* Please review the Compliance Report */,
    listeners : {
     show : function (_self)
      {
          _this.acceptBtn.disableIt();
          _this.rejectBtn.disableIt();
          
          var url = 'about:blank';
          
          if(_this.data.userdata_id * 1 > 0){
              url = baseURL + '/Coba/Reports/ComplianceReport/' + _this.data.userdata_id;
          }
          
          window.addEventListener("resize", _this.compliance_report_frame.resize);
          
          _this.compliance_report_frame.el.dom.onload = function(){
              
              _this.compliance_report_frame.resize();
          
              var frame = _this.compliance_report_frame.el.dom.contentDocument || _this.compliance_report_frame.el.dom.contentWindow.document;
              
              var frameBody = Roo.get(frame.body);
              
              frameBody.scrollTo('top');
              
              frame.addEventListener('scroll', function(e) {
                  _this.compliance_report_frame.onScroll();
              }, false);
              
          };
          
          _this.compliance_report_frame.el.dom.src = url;
          
          
      }
    },
    xns : Roo.bootstrap,
    '|xns' : 'Roo.bootstrap',
    buttons : [
     {
      xtype : 'Button',
      disableIt : function() 
      { 
          this.setText('Scroll to end before accept');
          this.disable();
      },
      enableIt : function() 
      { 
          this.setText('Accept');
          
          this.enable();
      },
      html : _this._strings['c4408d335012a56ff58937d78050efad'] /* Accept */,
      weight : 'primary',
      listeners : {
       click : function (_self, e)
        {
            if(_this.data.id * 1 < 1){
                Roo.bootstrap.MessageBox.alert('Error', 'Invalid User ID');
                return;
            }
            
            new Pman.Request({
                url: baseURL + '/Roo/Ext_data.php',
                method : 'POST',
                params : {
                    id : _this.data.id,
                    _accept : 1
                }, 
                success : function(res) {
                    
                    _this.dialog.hide();
                    
                    if(_this.callback){
                        _this.callback.call(_this);
                    }
                    
                }
            });
            
        },
       render : function (_self)
        {
            _this.acceptBtn = this;
        }
      },
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap'
     },
     {
      xtype : 'Button',
      disableIt : function() 
      { 
          this.setText('Scroll to end before reject');
          this.disable();
      },
      enableIt : function() 
      { 
          this.setText('Reject');
          
          this.enable();
      },
      html : _this._strings['d98ac12774fca5c3cbaffe276840c55f'] /* Reject */,
      weight : 'danger',
      listeners : {
       click : function (_self, e)
        {
            if(_this.data.userdata_id * 1 < 1){
                Roo.bootstrap.MessageBox.alert('Error', 'Invalid User ID');
                return;
            }
            
            Pman.Dialog.CobaInvestorComplianceReject.show({
                id : 0,
                investor_id : _this.data.userdata_id
            }, function(res){
                
                _this.dialog.hide();
                
                if(_this.callback){
                    _this.callback.call(_this);
                }
                
            });
            
        },
       render : function (_self)
        {
            _this.rejectBtn = this;
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
            onScroll : function() 
            { 
                var frame = _this.compliance_report_frame.el.dom.contentDocument || _this.compliance_report_frame.el.dom.contentWindow.document;
                    
                var frameBody = Roo.get(frame.body);
                
                var scrollHeight = frameBody.dom.scrollHeight;
                
                var viewHeight = _this.compliance_report_frame.el.getHeight();
                
                var scrollTop = frame.documentElement.scrollTop || frame.body.scrollTop;
                
                if(scrollHeight - viewHeight > scrollTop){
                    return;
                }
                
                _this.acceptBtn.enableIt();
                _this.rejectBtn.enableIt();
                
            },
            resize : function() 
            { 
                var height = _this.dialog.bodyEl.getHeight(true);
                
                _this.compliance_report_frame.el.setHeight(height);
            },
            style : 'width:100%;border:none;',
            tag : 'iframe',
            listeners : {
             render : function (_self)
              {
                  _this.compliance_report_frame = this;
                  
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
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap'
       }
      ]
     }
    ]
   }  );
 }
});
Roo.apply(Pman.Dialog.CobaInvestorComplianceReview, Pman.Dialog.CobaInvestorComplianceReview.prototype);
