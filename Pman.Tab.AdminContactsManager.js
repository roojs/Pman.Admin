//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminContactsManager = new Roo.XComponent({

 _strings : {
  '24638ac4ae95a8101b5b6e9d3b034d3a' :"(function() {\n    return _this.title || \"Contacts Manager\";\n})()"
 },

  part     :  ["Admin", "ContactsManager" ],
  order    : '060-Pman.Tab.AdminContactsManager',
  region   : 'center',
  parent   : 'Pman.Tab.Admin',
  name     : "Pman.Tab.AdminContactsManager",
  disabled : false, 
  permname : 'Core.Person', 
  _tree : function()
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'NestedLayoutPanel',
   background : true,
   region : 'center',
   title : (function() {
       return _this.title || "Contacts Manager";
   })(),
   xns : Roo,
   '|xns' : 'Roo',
   layout : {
    xtype : 'BorderLayout',
    xns : Roo,
    '|xns' : 'Roo',
    center : {
     xtype : 'LayoutRegion',
     tabPosition : 'top',
     xns : Roo,
     '|xns' : 'Roo'
    },
    west : {
     xtype : 'LayoutRegion',
     split : true,
     tabPosition : 'top',
     width : 250,
     xns : Roo,
     '|xns' : 'Roo'
    }
   }
  };  }
});
