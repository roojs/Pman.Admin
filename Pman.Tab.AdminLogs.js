//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminLogs = new Roo.XComponent({

 _strings : {
  'b2d37ae1cedf42ff874289b721860af2' :"Logs"
 },

  part     :  ["Admin", "Logs" ],
  order    : '999-Pman.Tab.AdminLogs',
  region   : 'center',
  parent   : 'Pman',
  name     : "Logs",
  disabled : false, 
  permname : '', 
  _tree : function(_data)
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'NestedLayoutPanel',
   background : true,
   fitToFrame : true,
   region : 'center',
   title : _this._strings['b2d37ae1cedf42ff874289b721860af2'] /* Logs */,
   listeners : {
    activate : function (_self)
     {
         var cr = this.layout.getRegion('center');
         if (cr) {
             cr.showPanel(cr.activePanel);
         }
     }
   },
   xns : Roo,
   '|xns' : 'Roo',
   layout : {
    xtype : 'BorderLayout',
    xns : Roo,
    '|xns' : 'Roo',
    center : {
     xtype : 'LayoutRegion',
     tabPosition : 'top',
     titlebar : false,
     xns : Roo,
     '|xns' : 'Roo'
    }
   }
  };  }
});
