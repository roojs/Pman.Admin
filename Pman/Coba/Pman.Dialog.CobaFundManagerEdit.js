//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.CobaFundManagerEdit= function() {}
Roo.apply(Pman.Dialog.CobaFundManagerEdit.prototype, {

 _strings : {
  'ec211f7c20af43e742bf2570c3cb84f9' :"Add",
  '2b15fbffc15a21f95838d3338de6798f' :"Add Fund",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  '4d3d769b812b6faa6b76e1a8abaece2d' :"Active",
  '422918621aa6642c26d5ee9222765ddf' :"Fund Name",
  '2efbd104fbdac27979de616938992e78' :"Fund Code",
  'd41d8cd98f00b204e9800998ecf8427e' :" "
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
    title : _this._strings['2b15fbffc15a21f95838d3338de6798f'] /* Add Fund */,
    xns : Roo.bootstrap,
    '|xns' : 'Roo.bootstrap',
    items  : [
     {
      xtype : 'Container',
      style : 'width: 100%',
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap',
      items  : [
       {
        xtype : 'Form',
        method : 'GET',
        url : baseURL + '/Roo/Modx_accountmgmts',
        listeners : {
         actioncomplete : function (_self, action)
          {
              if(action.type == 'submit') {
                  
                  Roo.log('teststestset');
                  
              }
          },
         actionfailed : function (_self, action)
          {
              if (action.type == 'submit') {
                  
                  Roo.log('faul');
                  
              }
          },
         render : function (_self)
          {
              _this.form = this;
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
            md : 12,
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap',
            items  : [
             {
              xtype : 'Input',
              fieldLabel : _this._strings['2efbd104fbdac27979de616938992e78'] /* Fund Code */,
              labelAlign : 'top',
              name : 'isin_code',
              xns : Roo.bootstrap,
              '|xns' : 'Roo.bootstrap'
             }
            ]
           }
          ]
         },
         {
          xtype : 'Row',
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap',
          items  : [
           {
            xtype : 'Column',
            md : 12,
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap',
            items  : [
             {
              xtype : 'Input',
              fieldLabel : _this._strings['422918621aa6642c26d5ee9222765ddf'] /* Fund Name */,
              labelAlign : 'top',
              name : 'name',
              xns : Roo.bootstrap,
              '|xns' : 'Roo.bootstrap'
             }
            ]
           }
          ]
         },
         {
          xtype : 'Row',
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap',
          items  : [
           {
            xtype : 'Column',
            md : 2,
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap',
            items  : [
             {
              xtype : 'FieldLabel',
              html : _this._strings['4d3d769b812b6faa6b76e1a8abaece2d'] /* Active */,
              style : 'line-height: 40px;',
              target : 'is_active',
              xns : Roo.bootstrap,
              '|xns' : 'Roo.bootstrap'
             }
            ]
           },
           {
            xtype : 'Column',
            md : 3,
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap',
            items  : [
             {
              xtype : 'CheckBox',
              checked : false,
              fieldLabel : _this._strings['d41d8cd98f00b204e9800998ecf8427e'] /*   */,
              inputValue : 1,
              name : 'is_active',
              valueOff : 0,
              xns : Roo.bootstrap,
              '|xns' : 'Roo.bootstrap'
             }
            ]
           }
          ]
         }
        ]
       },
       {
        xtype : 'Row',
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap',
        items  : [
         {
          xtype : 'Column',
          md : 12,
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap',
          items  : [
           {
            xtype : 'Button',
            html : _this._strings['ea4788705e6873b424c65e91c2846b19'] /* Cancel */,
            style : 'margin: 10px; float:right',
            weight : 'danger',
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap'
           },
           {
            xtype : 'Button',
            html : _this._strings['ec211f7c20af43e742bf2570c3cb84f9'] /* Add */,
            style : 'margin: 10px; float:right',
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
Roo.apply(Pman.Dialog.CobaFundManagerEdit, Pman.Dialog.CobaFundManagerEdit.prototype);
