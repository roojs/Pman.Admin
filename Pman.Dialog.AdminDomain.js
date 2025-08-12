//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminDomain = {

 _strings : {
  '842c51ab0d597b4c7c61066fecf42b44' :"MX last updated",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  '22e6e4a2e35eb478f37738da66480192' :"Add / Edit Core Domain",
  'eae639a70006feff484a39363c977e24' :"Domain",
  'b331a153086a91e775f24c00de1f77d9' :"No mx record since",
  'c9cc8cce247e49bae79f15173ce97354' :"Save",
  '289fe65c57825256edde389f99a1f05c' :"Has MX record"
 },
 _named_strings : {
  'mx_updated_fieldLabel' : '842c51ab0d597b4c7c61066fecf42b44' /* MX last updated */ ,
  'no_mx_dt_fieldLabel' : 'b331a153086a91e775f24c00de1f77d9' /* No mx record since */ ,
  'domain_fieldLabel' : 'eae639a70006feff484a39363c977e24' /* Domain */ ,
  'is_mx_valid_fieldLabel' : '289fe65c57825256edde389f99a1f05c' /* Has MX record */ 
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
  this.dialog.show.apply(this.dialog,  Array.prototype.slice.call(arguments).slice(2));
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
    background : true,
    closable : false,
    collapsible : false,
    height : 340,
    modal : true,
    resizable : false,
    title : _this._strings['22e6e4a2e35eb478f37738da66480192'] /* Add / Edit Core Domain */,
    width : 500,
    xns : Roo,
    '|xns' : 'Roo',
    center : {
     xtype : 'LayoutRegion',
     titlebar : false,
     xns : Roo,
     '|xns' : 'Roo'
    },
    buttons : [
     {
      xtype : 'Button',
      text : _this._strings['ea4788705e6873b424c65e91c2846b19'] /* Cancel */,
      listeners : {
       click : function() {
            _this.form.reset();
            _this.dialog.hide();
        }
      },
      xns : Roo,
      '|xns' : 'Roo'
     },
     {
      xtype : 'Button',
      text : _this._strings['c9cc8cce247e49bae79f15173ce97354'] /* Save */,
      listeners : {
       click : function()
        {
            _this.dialog.el.mask("Saving");
            _this.form.doAction('submit');
            
        }
      },
      xns : Roo,
      '|xns' : 'Roo'
     }
    ],
    items  : [
     {
      xtype : 'ContentPanel',
      background : true,
      fitToFrame : true,
      region : 'center',
      xns : Roo,
      '|xns' : 'Roo',
      items  : [
       {
        xtype : 'Form',
        labelWidth : 180,
        method : 'POST',
        style : 'margin: 5px',
        url : baseURL + '/Roo/Core_domain.php',
        listeners : {
         actioncomplete : function (_self, action)
          {
            if (action.type == 'setdata') {
                 //_this.dialog.el.mask("Loading");
                  
                 this.load({ method: 'GET', params: { '_id' : _this.data.id }});
                 return;
              }
              if (action.type == 'load') {
                  _this.dialog.el.unmask();
                  return;
              }
              if (action.type == 'submit' ) {
                  _this.dialog.el.unmask();
                  _this.dialog.hide();
          
                  if (_this.callback) {
                     _this.callback.call(_this, _this.form.getValues());
                  }
                  _this.form.reset();
              }
          },
         actionfailed : function (_self, action)
          {
              _this.dialog.el.unmask(); 
             
          },
         rendered : function (form)
          {
             _this.form = form;
          }
        },
        xns : Roo.form,
        '|xns' : 'Roo.form',
        items  : [
         {
          xtype : 'TextField',
          allowBlank : false,
          fieldLabel : _this._strings['eae639a70006feff484a39363c977e24'] /* Domain */,
          name : 'domain',
          width : 250,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'DisplayField',
          fieldLabel : _this._strings['b331a153086a91e775f24c00de1f77d9'] /* No mx record since */,
          name : 'no_mx_dt',
          valueRenderer : function()
          {
              if(!_this.form) {
                  return '';
              }
              
              var no_mx_dt = _this.form.findField('no_mx_dt').value;
              
              var ret = no_mx_dt instanceof Date ? no_mx_dt.format('Y-m-d H:i:s') : no_mx_dt;
              
              if(ret == '1000-01-01 00:00:00') {
                  return 'N/A'
              }
              
              return String.format("<span style='color:red;'>{0}</span>", ret);
          },
          width : 900,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'DisplayField',
          fieldLabel : _this._strings['842c51ab0d597b4c7c61066fecf42b44'] /* MX last updated */,
          name : 'mx_updated',
          width : 900,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'Checkbox',
          fieldLabel : _this._strings['289fe65c57825256edde389f99a1f05c'] /* Has MX record */,
          name : 'is_mx_valid',
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'Hidden',
          name : 'id',
          xns : Roo.form,
          '|xns' : 'Roo.form'
         }
        ]
       }
      ]
     }
    ]
   });
 }
};
