//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminDomain = {

 _strings : {
  'd17c3b8fc5e4cddd032079b2e585cc15' :"Name (Move to this folder)",
  '20fb05af6ceff723f80826fdc916081b' :"Matches flagged as failed",
  '62903ec64f0871efe265cae3cef19190' :"Match Regex (one line for one regex)",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  '22e6e4a2e35eb478f37738da66480192' :"Add / Edit Core Domain",
  'c9cc8cce247e49bae79f15173ce97354' :"Save"
 },
 _named_strings : {
  'is_failure_fieldLabel' : '20fb05af6ceff723f80826fdc916081b' /* Matches flagged as failed */ ,
  'matches_fieldLabel' : '62903ec64f0871efe265cae3cef19190' /* Match Regex (one line for one regex) */ ,
  'name_fieldLabel' : 'd17c3b8fc5e4cddd032079b2e585cc15' /* Name (Move to this folder) */ 
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
            var str = _this.form.findField('matches').getValue().trim().split("\n");
        
            var r = [];
            Roo.each(str, function(v){
                if(!v){
                    return;
                }
                var a = v.trim();
                r.push(a);
            });
            _this.form.findField('match_regex').setValue(r.join("\n"));
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
        url : baseURL + '/Roo/Mail_reject_match.php',
        listeners : {
         actioncomplete : function (_self, action)
          {
            if (action.type == 'setdata') {
                 //_this.dialog.el.mask("Loading");
                 
                  if(_this.data.table == 'crm_smtp_reject_match') {
                      _self.url = baseURL + '/Roo/crm_smtp_reject_match.php';
                  }
                  
                 this.load({ method: 'GET', params: { '_id' : _this.data.id }});
                 return;
              }
              if (action.type == 'load') {
                  Roo.log(action);
                  var str = action.result.data.match_regex.replace(/\|/g,"\n");
                  
                  _this.form.findField('matches').setValue(str);
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
          fieldLabel : _this._strings['d17c3b8fc5e4cddd032079b2e585cc15'] /* Name (Move to this folder) */,
          name : 'name',
          width : 250,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'Row',
          labelAlign : 'top',
          xns : Roo.form,
          '|xns' : 'Roo.form',
          items  : [
           {
            xtype : 'TextArea',
            allowBlank : false,
            fieldLabel : _this._strings['62903ec64f0871efe265cae3cef19190'] /* Match Regex (one line for one regex) */,
            height : 180,
            name : 'matches',
            width : 450,
            xns : Roo.form,
            '|xns' : 'Roo.form'
           }
          ]
         },
         {
          xtype : 'Checkbox',
          fieldLabel : _this._strings['20fb05af6ceff723f80826fdc916081b'] /* Matches flagged as failed */,
          name : 'is_failure',
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'Hidden',
          name : 'id',
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'Hidden',
          name : 'match_regex',
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
