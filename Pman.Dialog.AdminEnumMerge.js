//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminEnumMerge = {

 _strings : {
  '0b3e4317865feb6f0224397600b7cafc' :"Merge Core Enum",
  '03e956f1dca2b4d525df03cb1899cb6f' :"Merge with",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
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
    background : true,
    closable : false,
    collapsible : false,
    height : 150,
    modal : true,
    resizable : false,
    title : _this._strings['0b3e4317865feb6f0224397600b7cafc'] /* Merge Core Enum */,
    width : 400,
    xns : Roo,
    '|xns' : 'Roo',
    xtype : 'LayoutDialog',
    listeners : {
     show : function (_self)
      {
          _this.merge.focus();
      }
    },
    center : {
     titlebar : false,
     xns : Roo,
     '|xns' : 'Roo',
     xtype : 'LayoutRegion'
    },
    buttons : [
     {
      text : _this._strings['ea4788705e6873b424c65e91c2846b19'] /* Cancel */,
      xns : Roo,
      '|xns' : 'Roo',
      xtype : 'Button',
      listeners : {
       click : function() {
            _this.form.reset();
            _this.dialog.hide();
        }
      }
     },
     {
      text : _this._strings['e0aa021e21dddbd6d8cecec71e9cf564'] /* OK */,
      xns : Roo,
      '|xns' : 'Roo',
      xtype : 'Button',
      listeners : {
       click : function() 
        {
            if(typeof(_this.data._confirm) != 'undefined' && _this.data._confirm * 1 == 1){
                Roo.MessageBox.confirm(
                    "Confirm", 
                    "Are you sure '" + _this.data.display_name + "' Merge with " + _this.form.findField('merge_id'), 
                    function(res) {
                        if(res != 'yes') {
                            return;
                        }
                        new Pman.Request({
                            method : 'POST',
                            url : baseURL + '/Roo/Core_enum',
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
            _this.form.doAction('submit');
            
        }
      }
     }
    ],
    items  : [
     {
      background : true,
      fitToFrame : true,
      region : 'center',
      xns : Roo,
      '|xns' : 'Roo',
      xtype : 'ContentPanel',
      items  : [
       {
        method : 'POST',
        style : 'margin: 5px',
        url : baseURL + '/Roo/core_enum.php',
        xns : Roo.form,
        '|xns' : 'Roo.form',
        xtype : 'Form',
        listeners : {
         actioncomplete : function (_self, action)
          {
            if (action.type == 'setdata') {
          
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
                     _this.callback.call(_this, action.result.data);
                  }
                  _this.form.reset();
              }
          },
         rendered : function (form)
          {
             _this.form = form;
          }
        },
        items  : [
         {
          alwaysQuery : true,
          displayField : 'display_name',
          editable : true,
          fieldLabel : _this._strings['03e956f1dca2b4d525df03cb1899cb6f'] /* Merge with */,
          forceSelection : true,
          hiddenName : '_merge_id',
          listWidth : 250,
          minChars : 2,
          name : 'merge_display_name',
          pageSize : 50,
          queryParam : 'query[search]',
          selectOnFocus : true,
          tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{display_name}</b> </div>',
          triggerAction : 'all',
          valueField : 'id',
          width : 250,
          xns : Roo.form,
          '|xns' : 'Roo.form',
          xtype : 'ComboBox',
          listeners : {
           render : function (_self)
            {
                _this.merge = this;
            }
          },
          store : {
           remoteSort : true,
           sortInfo : { direction : 'ASC', field: 'display_name' },
           xns : Roo.data,
           '|xns' : 'Roo.data',
           xtype : 'Store',
           listeners : {
            beforeload : function (_self, o){
                 o.params = o.params || {};
                 
                 o.params.active = 1;
                 o.params.etype = _this.data.etype;
                 o.params['!id'] = _this.data.id;
             }
           },
           proxy : {
            method : 'GET',
            url : baseURL + '/Roo/Core_enum.php',
            xns : Roo.data,
            '|xns' : 'Roo.data',
            xtype : 'HttpProxy'
           },
           reader : {
            fields : [
                {
                    "name":"id",
                    "type":"int"
                },
                {
                    "name":"display_name",
                    "type":"string"
                }
            ],
            id : 'id',
            root : 'data',
            totalProperty : 'total',
            xns : Roo.data,
            '|xns' : 'Roo.data',
            xtype : 'JsonReader'
           }
          }
         },
         {
          name : 'id',
          xns : Roo.form,
          '|xns' : 'Roo.form',
          xtype : 'Hidden'
         }
        ]
       }
      ]
     }
    ]
   });
 }
};
