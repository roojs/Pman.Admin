//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.CobaInvestorModifyViewProfile = {

 _strings : {
  'c428704e24d1e6c1b7a914c2a6ba9695' :"Investor Profile"
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
    title : _this._strings['c428704e24d1e6c1b7a914c2a6ba9695'] /* Investor Profile */,
    xns : Roo.bootstrap,
    '|xns' : 'Roo.bootstrap'
   }  );
 }
};
