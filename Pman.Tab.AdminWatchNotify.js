//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminWatchNotify = new Roo.XComponent({

 _strings : {
  'a274f4d4670213a9045ce258c6c56b80' :"Notifications"
 },

  part     :  ["Admin", "WatchNotify" ],
  order    : '860-Pman.Tab.AdminWatchNotify',
  region   : 'center',
  parent   : 'Pman.Tab.Admin',
  name     : "Notifications",
  disabled : false, 
  permname : '', 
  _tree : function(_data)
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'NestedLayout',
   background : true,
   region : 'center',
   title : _this._strings['a274f4d4670213a9045ce258c6c56b80'] /* Notifications */,
   xns : Roo.panel,
   '|xns' : 'Roo.panel',
   layout : {
    xtype : 'BorderLayout',
    xns : Roo,
    '|xns' : 'Roo',
    center : {
     xtype : 'LayoutRegion',
     tabPosition : 'top',
     xns : Roo,
     '|xns' : 'Roo'
    }
   }
  };  }
});
