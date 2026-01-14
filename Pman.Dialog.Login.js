//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.Login = {

 _strings : {
  '4994a8ffeba4ac3140beb89e8d41f174' :"Language",
  '99dea78007133396a7b8ed70578ac6ae' :"Login",
  '9ec54ec336b65da6179cf750de33ecd7' :"Forgot Password",
  'cfcd208495d565ef66e7dff9f98764da' :"0",
  'dc647eb65e6711e155375218212b3964' :"Password",
  '42d15cbad8e0268cbad01372c7e7542e' :"<div class=\"x-combo-list-item\">{ldisp}</div>",
  '643a860f992333b8600ea264aca7c4fc' :"Email Address",
  '5da1e201cb7f08519d07290abf226cfb' :"Select a Language..."
 },
 _named_strings : {
  'logout_other_windows_value' : 'cfcd208495d565ef66e7dff9f98764da' /* 0 */ ,
  'password_fieldLabel' : 'dc647eb65e6711e155375218212b3964' /* Password */ ,
  'langdisp_fieldLabel' : '4994a8ffeba4ac3140beb89e8d41f174' /* Language */ ,
  'username_fieldLabel' : '643a860f992333b8600ea264aca7c4fc' /* Email Address */ ,
  'langdisp_emptyText' : '5da1e201cb7f08519d07290abf226cfb' /* Select a Language... */ 
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
    collapsible : false,
    draggable : false,
    height : 230,
    minHeight : 180,
    minWidth : 200,
    modal : true,
    resizable : false,
    shadow : true,
    title : _this._strings['99dea78007133396a7b8ed70578ac6ae'] /* Login */,
    width : 350,
    xns : Roo,
    '|xns' : 'Roo',
    center : {
     xtype : 'Region',
     alwaysShowTabs : false,
     autoScroll : false,
     hideTabs : true,
     titlebar : false,
     xns : Roo.layout,
     '|xns' : 'Roo.layout'
    },
    buttons : [
     {
      xtype : 'Button',
      text : _this._strings['9ec54ec336b65da6179cf750de33ecd7'] /* Forgot Password */,
      listeners : {
       click : function (_self, e)
        {
            var n = _this.form.findField('username').getValue();
            if (!n.length) {
                Roo.MessageBox.alert("Error", "Fill in your email address");
                return;
            }
            new Pman.Request({
                url: baseURL + '/Core/Auth/PasswordRequest',
                mask : "Sending Password Reset email",
                params: {
                    email: n
                },
                method: 'POST',  
                success:  function(res)  {  // check successfull...
                
                    if (!res.success) { // error!
                       Roo.MessageBox.alert("Error" , res.errorMsg ? res.errorMsg  : "Problem Requesting Password Reset");
                       return;
                    }
                    Roo.MessageBox.alert("Notice" , "Please check you email for the Password Reset message");
                },
                failure : function() {
                    Roo.MessageBox.alert("Error" , "Problem Requesting Password Reset");
                }
                
            });
        }
      },
      xns : Roo,
      '|xns' : 'Roo'
     },
     {
      xtype : 'Button',
      text : _this._strings['99dea78007133396a7b8ed70578ac6ae'] /* Login */,
      listeners : {
       click : function (_self, e)
        {
            _this.dialog.el.mask("Logging in");
            _this.form.doAction('submit' );
        }
      },
      xns : Roo,
      '|xns' : 'Roo'
     }
    ],
    items  : [
     {
      xtype : 'Content',
      autoCreate : true,
      fitToFrame : true,
      region : 'center',
      style : 'margin: 10px',
      xns : Roo.panel,
      '|xns' : 'Roo.panel',
      items  : [
       {
        xtype : 'Form',
        labelWidth : 100,
        method : 'POST',
        resizeToLogo : function() {
            var sz = Roo.get(_this.form.el.query('img')[0]).getSize();
            if (!sz) {
                this.resizeToLogo.defer(1000,this);
                return;
            }
            var w = Roo.lib.Dom.getViewWidth() - 100;
            var h = Roo.lib.Dom.getViewHeight() - 100;
            _this.dialog.resizeTo(Math.max(350, Math.min(sz.width + 30, w)),Math.min(sz.height+200, h));
            _this.dialog.center();
        },
        url : baseURL + '/Core/Auth/Login',
        listeners : {
         actioncomplete : function (_self, act)
          {
              Roo.log(act);
              if (act.type == "submit") {
                   
                  Roo.state.Manager.set('Pman.Login.username.'+appNameShort, this.findField('username').getValue() );
                  Roo.state.Manager.set('Pman.Login.lang.'+appNameShort,  this.findField('lang').getValue() );
          
                  // session expired && login as another user => reload
                  if(
                      Pman.Login.oldAuthUser && 
                      Pman.Login.oldAuthUser.email != this.findField('username').getValue()
                  ) {
                      window.onbeforeunload = function() { };
                      document.location = baseURL + '?ts=' + Math.random();
                  }
          
                 
                  _this.dialog.hide();
                  if (Roo.get('loading-mask')) {
                      //Roo.get('loading').show();
                      Roo.get('loading-mask').show();
                  }
                  
                  if (_this.callback) {
                      _this.callback(act.result);
                   
                  }
                  return;
              }
              if (act.type == 'setdata') {
                  
                  if (Roo.get('loading')) {
                      Roo.get('loading').remove();
                  }
                  if (Roo.get('loading-mask')) {
                      Roo.get('loading-mask').hide();
                  }
                  // why would we not want it to be modal?
                  _this.dialog.el.unmask();
                   this.resizeToLogo.defer(500,this);
                   if (!Roo.state.Manager.getProvider().expires) { 
                      Roo.state.Manager.setProvider(new Roo.state.CookieProvider());
                  }
                   
                   
                  this.setValues({
                      'username' : Roo.state.Manager.get('Pman.Login.username.'+appNameShort, ''),
                      'lang' : Roo.state.Manager.get('Pman.Login.lang.'+appNameShort, 'en'),
                      'window_id' : Pman.Login.window_id
                  });
                  
                  Pman.Login.switchLang(Roo.state.Manager.get('Pman.Login.lang.'+appNameShort, ''));
                  if (this.findField('username').getValue().length > 0 ){
                      this.findField('password').focus();
                  } else {
                     this.findField('username').focus();
                  }
                  
                  return;
              }
          },
         actionfailed : function (_self, act)
          {
           //act.result.errors // invalid form element list...
              //act.result.errorMsg// invalid form element list...
              
              _this.dialog.el.unmask();
              var msg = act.result.errorMsg || act.result.message;
              msg = msg ||   "Login failed - communication error - try again.";
              Roo.MessageBox.alert("Error",  msg); 
          },
         rendered : function (form)
          {
              _this.form = form;
               if (_this.has_image) {
                  return;
              }
              _this.has_image = true;
              
                 var img = typeof(appLogo) != 'undefined'  && appLogo.length ? appLogo :
                      rootURL + '/Pman/'+appNameShort + '/templates/images/logo.gif' ;
               
              
              _this.form.el.createChild({
                      tag: 'img', 
                      src: img,
                      style: 'margin-bottom: 10px;'
                  },
                  _this.form.el.dom.firstChild 
              ).on('error', function() {
                  this.dom.style.visibility = 'hidden';
                      this.dom.style.height = '10px';
                  });
          }
        },
        xns : Roo.form,
        '|xns' : 'Roo.form',
        items  : [
         {
          xtype : 'TextField',
          fieldLabel : _this._strings['643a860f992333b8600ea264aca7c4fc'] /* Email Address */,
          name : 'username',
          width : 200,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'Password',
          fieldLabel : _this._strings['dc647eb65e6711e155375218212b3964'] /* Password */,
          name : 'password',
          width : 200,
          listeners : {
           specialkey : function (_self, ev)
            {
                if (ev.keyCode == 13) {
                    _this.dialog.el.mask("Logging in");
                    _this.form.doAction('submit');
                }
            }
          },
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'ComboBox',
          displayField : 'ldisp',
          editable : false,
          emptyText : _this._strings['5da1e201cb7f08519d07290abf226cfb'] /* Select a Language... */,
          fieldLabel : _this._strings['4994a8ffeba4ac3140beb89e8d41f174'] /* Language */,
          hiddenName : 'lang',
          mode : 'local',
          name : 'langdisp',
          triggerAction : 'all',
          typeAhead : false,
          valueField : 'lang',
          width : 200,
          listeners : {
           select : function (combo, rec, index)
            {
                Pman.Login.switchLang(rec.data.lang);
            }
          },
          xns : Roo.form,
          '|xns' : 'Roo.form',
          store : {
           xtype : 'SimpleStore',
           data : [
               [ 'en', 'English' ],
               [ 'zh_HK' , '\u7E41\u4E2D' ],
               [ 'zh_CN', '\u7C21\u4E2D' ]
           ],
           fields : [
           'lang', 'ldisp'
           ],
           xns : Roo.data,
           '|xns' : 'Roo.data'
          },
          tpl : {
           xtype : 'ReplaceTemplate',
           html : _this._strings['42d15cbad8e0268cbad01372c7e7542e'] /* <div class="x-combo-list-item">{ldisp}</div> */,
           xns : Roo,
           '|xns' : 'Roo'
          }
         },
         {
          xtype : 'Hidden',
          name : 'window_id',
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'Hidden',
          name : 'app_id',
          value : appNameShort,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'Hidden',
          name : 'logout_other_windows',
          value : 0,
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
