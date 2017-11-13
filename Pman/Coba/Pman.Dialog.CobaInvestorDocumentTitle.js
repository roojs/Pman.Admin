//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.CobaInvestorDocumentTitle= function() {}
Roo.apply(Pman.Dialog.CobaInvestorDocumentTitle.prototype, {

 _strings : {
  'cc50e67baddb78229bf62a269e95b3fe' :"Enter Document Title",
  'e0aa021e21dddbd6d8cecec71e9cf564' :"OK",
  'e647ea78eaa03bc9426685b054758bb9' :"Please enter the document title"
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
    animate : false,
    cls : 'enable-overflow',
    title : _this._strings['cc50e67baddb78229bf62a269e95b3fe'] /* Enter Document Title */,
    listeners : {
     show : function (_self)
      {
          this.setTitle("Enter Document Title For " + _this.data.name)
      }
    },
    xns : Roo.bootstrap,
    '|xns' : 'Roo.bootstrap',
    buttons : [
     {
      xtype : 'Button',
      html : _this._strings['e0aa021e21dddbd6d8cecec71e9cf564'] /* OK */,
      weight : 'primary',
      listeners : {
       click : function (_self, e)
        {
            if(!_this.form.isValid()){
                Roo.bootstrap.MessageBox.alert('Error', 'Please fill in all the require field');
                return;
            }
            
            _this.dialog.hide();
            
            if (_this.callback) {
                _this.callback.call(_this, _this.form.getValues());
            }
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
      url : baseURL + '/Roo/Invalid',
      listeners : {
       actioncomplete : function (_self, action)
        {
            if(action.type == 'setdata'){
                return;
            }
        
            if (action.type =='submit') {
                return;
            }
        
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
            xtype : 'Input',
            allowBlank : false,
            name : 'title',
            placeholder : _this._strings['e647ea78eaa03bc9426685b054758bb9'] /* Please enter the document title */,
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap'
           }
          ]
         }
        ]
       }
      ]
     }
    ]
   }  );
 }
});
Roo.apply(Pman.Dialog.CobaInvestorDocumentTitle, Pman.Dialog.CobaInvestorDocumentTitle.prototype);
