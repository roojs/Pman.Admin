//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminBulkPassword = {

 _strings : {
  'd94b42030b9785fd754d5c1754961269' :"Discard",
  'b273168a70495707e723f007feff42f4' :"Forward Email to",
  'c4ca4238a0b923820dcc509a6f75849b' :"1",
  '6501c88a27621469bbde6c7d962e056a' :"Check to stop you getting the email",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  'e47ca954fb02edc53af1507ac17d12a0' :"Bulk Change Passwords",
  'e0aa021e21dddbd6d8cecec71e9cf564' :"OK"
 },
 _named_strings : {
  'away_discard_value' : 'c4ca4238a0b923820dcc509a6f75849b' /* 1 */ ,
  'away_discard_boxLabel' : '6501c88a27621469bbde6c7d962e056a' /* Check to stop you getting the email */ ,
  'away_fwds_fieldLabel' : 'b273168a70495707e723f007feff42f4' /* Forward Email to */ ,
  'away_text_fieldLabel' : 'b273168a70495707e723f007feff42f4' /* Forward Email to */ ,
  'away_discard_fieldLabel' : 'd94b42030b9785fd754d5c1754961269' /* Discard */ 
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
    closable : false,
    height : 500,
    modal : true,
    resizable : false,
    title : _this._strings['e47ca954fb02edc53af1507ac17d12a0'] /* Bulk Change Passwords */,
    width : 500,
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
      text : _this._strings['ea4788705e6873b424c65e91c2846b19'] /* Cancel */,
      listeners : {
       click : function (_self, e)
        {
            _this.form.reset();
            _this.dialog.hide();
        }
      },
      xns : Roo,
      '|xns' : 'Roo'
     },
     {
      xtype : 'Button',
      text : _this._strings['e0aa021e21dddbd6d8cecec71e9cf564'] /* OK */,
      listeners : {
       click : function (_self, e)
        {
            _this.form.findField('away_fwd').setValue(_this.awayCombo.getValue());
          
            if (!(_this.form.findField('away_state').getValue() *1)) {
                _this.form.submit();
                return;
            }
          
            if (!_this.form.findField('away_from_dt').getValue().length) {
               Roo.MessageBox.alert("Error", "Fill in from date");
                return;
            }
            if (!_this.form.findField('away_to_dt').getValue().length) {
               Roo.MessageBox.alert("Error", "Fill in from date");
                return;
            }
          
            if ((_this.form.findField('away_msg_state').getValue() * 1) && !_this.form.findField('away_msg').getValue().length) {
                Roo.MessageBox.alert("Error", "Fill in an away message");
                return;
            }
           
            if ((_this.form.findField('away_fwd_state').getValue() * 1) && !_this.form.findField('away_fwd').getValue().length) {
                Roo.MessageBox.alert("Error", "Fill in who the emails should be forwarded to");
                return;
            }
            if (!(_this.form.findField('away_msg_state').getValue() * 1) && !(_this.form.findField('away_fwd_state').getValue() * 1)) {
                Roo.MessageBox.alert("Error", "Select what should happen when you are away (send reply and/or forward emails)");
                return;
            }
            // -- what's this for?? - setting the away foward to the text awway text message..?
            //if(_this.awayText.isVisible()){
              //  _this.form.findField('away_fwd').setValue(_this.awayText.getValue().replace("\n", ','));
            //}
            
            _this.form.submit();
        }
      },
      xns : Roo,
      '|xns' : 'Roo'
     }
    ],
    items  : [
     {
      xtype : 'ContentPanel',
      region : 'center',
      xns : Roo,
      '|xns' : 'Roo',
      items  : [
       {
        xtype : 'Form',
        labelAlign : 'right',
        labelWidth : 100,
        style : 'margin:5px',
        url : baseURL + '/Roo/Users',
        listeners : {
         actioncomplete : function (_self, action)
          { 
             if (action.type == 'setdata') {
          
                  
          
                return;
                
             }
              if (action.type == 'load') {
           
                  return;
              }
              if (action.type =='submit') {
          
                  
                  _this.dialog.hide();
          
          
                  if (_this.callback) {
                    _this.callback.call(_this, action.result.data);
                  }
                  _this.form.reset();
                  return;
                } 
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
          xtype : 'Row',
          labelAlign : 'top',
          xns : Roo.form,
          '|xns' : 'Roo.form',
          items  : [
           {
            xtype : 'ComboBoxArray',
            actionMode : 'fieldEl',
            fieldLabel : _this._strings['b273168a70495707e723f007feff42f4'] /* Forward Email to */,
            hiddenName : 'away_combo',
            name : 'away_fwds',
            width : 440,
            listeners : {
             render : function (_self)
              {
                  _this.awayCombo = _self;
              }
            },
            xns : Roo.form,
            '|xns' : 'Roo.form',
            combo : {
             xtype : 'ComboBox',
             allowBlank : true,
             alwaysQuery : true,
             displayField : 'login',
             editable : true,
             forceSelection : true,
             idField : 'code',
             listWidth : 300,
             minChars : 2,
             nameField : 'login',
             pageSize : 20,
             queryParam : 'query[starts_with]',
             triggerAction : 'all',
             valueField : 'login_email',
             width : 150,
             xns : Roo.form,
             '|xns' : 'Roo.form',
             store : {
              xtype : 'Store',
              remoteSort : true,
              sortInfo : { field: 'login', direction :'ASC' },
              listeners : {
               beforeload : function (_self, o)
                {
                    o.params = o.params || {};
                    o.params._getuser = 1;
                    o.params.dom_id_domain = _this.data.domain;
                }
              },
              xns : Roo.data,
              '|xns' : 'Roo.data',
              proxy : {
               xtype : 'HttpProxy',
               method : 'GET',
               url : baseURL + '/Roo/Users.php',
               xns : Roo.data,
               '|xns' : 'Roo.data'
              },
              reader : {
               xtype : 'JsonReader',
               fields : [
                   {
                       'name': 'login',
                       'type': 'string'
                   },
                   {
                       'name': 'login_email',
                       'type': 'string'
                   }
               ],
               id : 'code',
               root : 'data',
               totalProperty : 'total',
               xns : Roo.data,
               '|xns' : 'Roo.data'
              }
             }
            }
           },
           {
            xtype : 'TextArea',
            actionMode : 'fieldEl',
            fieldLabel : _this._strings['b273168a70495707e723f007feff42f4'] /* Forward Email to */,
            name : 'away_text',
            listeners : {
             render : function (_self)
              {
                  _this.awayText = _self;
              }
            },
            xns : Roo.form,
            '|xns' : 'Roo.form'
           }
          ]
         },
         {
          xtype : 'Checkbox',
          boxLabel : _this._strings['6501c88a27621469bbde6c7d962e056a'] /* Check to stop you getting the email */,
          fieldLabel : _this._strings['d94b42030b9785fd754d5c1754961269'] /* Discard */,
          name : 'away_discard',
          value : 1,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'Hidden',
          name : 'away_fwd',
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
