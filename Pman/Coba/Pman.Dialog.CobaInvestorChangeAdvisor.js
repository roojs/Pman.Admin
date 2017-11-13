//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.CobaInvestorChangeAdvisor= function() {}
Roo.apply(Pman.Dialog.CobaInvestorChangeAdvisor.prototype, {

 _strings : {
  '5cfee765454e9ab499d547c20476f696' :"Change Advisor",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  'c9cc8cce247e49bae79f15173ce97354' :"Save",
  '76f6e3fca8e568586bf04d22f80c5628' :"Please select an advisor"
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
    title : _this._strings['5cfee765454e9ab499d547c20476f696'] /* Change Advisor */,
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
      html : _this._strings['c9cc8cce247e49bae79f15173ce97354'] /* Save */,
      weight : 'primary',
      listeners : {
       click : function (_self, e)
        {
            _this.form.doAction("submit");
        
            return;
        }
      },
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap'
     }
    ],
    items  : [
     {
      xtype : 'Form',
      labelAlign : 'top',
      url : baseURL + '/Roo/Ext_data',
      listeners : {
       actioncomplete : function (_self, action)
        {
            if(action.type == 'setdata'){
                
                if(_this.data.id * 1 > 0) {
                    this.doAction('load',{ method: 'GET', params: { '_id' : _this.data.id }});
                }
                
                return;
            }
           
            if (action.type == 'load') {
            
                _this.data = action.result.data;
                
                return;
            }
            
            
            if (action.type == 'submit') {
            
                _this.dialog.hide();
               
                if (_this.callback) {
                    _this.callback.call(this, action.result.data);
                }
                
                return; 
            }
        },
       actionfailed : function (_self, action)
        {
            Roo.log(action);
            
            var err = 'Please fill in all the request fields';
            
            if (typeof(action) != 'undefined' && (action.failureType == 'server' || action.failureType == 'load')) {    
                err = action.result.errorMsg;
            }
            
            Roo.bootstrap.MessageBox.alert('Error', err);
        
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
        xtype : 'ComboBox',
        allowBlank : false,
        alwaysQuery : true,
        displayField : 'name',
        editable : false,
        hiddenName : 'investment_advisor_id',
        minChars : 2,
        name : 'investment_advisor_id_name',
        pageSize : 25,
        placeholder : _this._strings['76f6e3fca8e568586bf04d22f80c5628'] /* Please select an advisor */,
        queryParam : 'query[name_starts]',
        tpl : '<div class=\"roo-select2-result\"><b>{name}</b></div>',
        triggerAction : 'all',
        typeAhead : true,
        valueField : 'id',
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap',
        store : {
         xtype : 'Store',
         remoteSort : true,
         sortInfo : {field:"name",direction:"ASC"},
         listeners : {
          beforeload : function (_self, o)
           {
               o.params = o.params || {};
               
               o.params.active = 1;
               
               o.params.in_group_name = 'Adviser';
           }
         },
         xns : Roo.data,
         '|xns' : 'Roo.data',
         proxy : {
          xtype : 'HttpProxy',
          method : 'GET',
          url : baseURL+'/Roo/Core_person',
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
                  'name': 'name',
                  'type': 'string'
              }
          ],
          xns : Roo.data,
          '|xns' : 'Roo.data'
         }
        }
       },
       {
        xtype : 'Input',
        inputType : 'hidden',
        name : 'id',
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap'
       }
      ]
     }
    ]
   }  );
 }
});
Roo.apply(Pman.Dialog.CobaInvestorChangeAdvisor, Pman.Dialog.CobaInvestorChangeAdvisor.prototype);
