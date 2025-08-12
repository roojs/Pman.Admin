//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminDomain = new Roo.XComponent({

 _strings : {
  'ec211f7c20af43e742bf2570c3cb84f9' :"Add",
  '86f600672d32a7be1dd6cb035ac61577' :"Regex",
  '7dce122004969d56ae2e0245cb754d35' :"Edit",
  'eae639a70006feff484a39363c977e24' :"Domain",
  'f2a6c498fb90ee345d997f888fce3b18' :"Delete",
  '49ee3087348e8d44e1feda1917443987' :"Name"
 },

  part     :  ["Admin", "Domain" ],
  order    : '9998-Pman.Tab.AdminDomain',
  region   : 'center',
  parent   : 'Pman.Tab.Admin',
  name     : "Domain",
  disabled : false, 
  permname : '', 
  _tree : function(_data)
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'Grid',
   autoScroll : true,
   background : true,
   fitContainer : true,
   fitToframe : true,
   region : 'center',
   tableName : 'core_domain',
   title : _this._strings['eae639a70006feff484a39363c977e24'] /* Domain */,
   listeners : {
    activate : function() {
         _this.domainPanel = this;
     }
   },
   xns : Roo.panel,
   '|xns' : 'Roo.panel',
   grid : {
    xtype : 'Grid',
    autoExpandColumn : 'match_regex',
    loadMask : true,
    listeners : {
     render : function() 
      {
          _this.domainGrid = this; 
          if (_this.domainPanel.active) {
             this.footer.onClick('first');
          }
      },
     rowdblclick : function (_self, rowIndex, e)
      {
         var el = _this.match_grid.ds.getAt(rowIndex);
         Pman.Dialog.MailRejectMatch.show({ id: el.id }, function() {
              _this.match_grid.footer.onClick('first');
            });
      }
    },
    xns : Roo.grid,
    '|xns' : 'Roo.grid',
    footer : {
     xtype : 'PagingToolbar',
     pageSize : 25,
     xns : Roo,
     '|xns' : 'Roo'
    },
    toolbar : {
     xtype : 'Toolbar',
     xns : Roo,
     '|xns' : 'Roo',
     items  : [
      {
       xtype : 'Button',
       text : _this._strings['ec211f7c20af43e742bf2570c3cb84f9'] /* Add */,
       listeners : {
        click : function()
         {
             Pman.Dialog.MailRejectMatch.show({ id:0 });
         }
       },
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar'
      },
      {
       xtype : 'Button',
       text : _this._strings['7dce122004969d56ae2e0245cb754d35'] /* Edit */,
       listeners : {
        click : function()
         {
             var el = _this.match_grid.getSelections();
             
             if(el.length < 1){
                 Roo.MessageBox.alert('Error', 'Please select the match first');
                 return;
             }
             Pman.Dialog.MailRejectMatch.show({ id: el[0].id });
         }
       },
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar'
      },
      {
       xtype : 'Fill',
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar'
      },
      {
       xtype : 'Button',
       text : _this._strings['f2a6c498fb90ee345d997f888fce3b18'] /* Delete */,
       listeners : {
        click : function()
         {
             Pman.Delete.simple(_this.match_panel, 'mail_reject_match');
         }
       },
       xns : Roo.Toolbar,
       '|xns' : 'Roo.Toolbar'
      }
     ]
    },
    dataSource : {
     xtype : 'Store',
     remoteSort : true,
     sortInfo : { field : 'name', direction: 'ASC' },
     xns : Roo.data,
     '|xns' : 'Roo.data',
     proxy : {
      xtype : 'HttpProxy',
      method : 'GET',
      url : baseURL + '/Roo/Mail_reject_match.php',
      xns : Roo.data,
      '|xns' : 'Roo.data'
     },
     reader : {
      xtype : 'JsonReader',
      fields : [
          {
              'name': 'id',
              'type': 'int'
          },
          {
              'name': 'name',
              'type': 'string'
          },
          {
              'name': 'match_regex',
              'type': 'string'
          }
      ],
      id : 'id',
      root : 'data',
      totalProperty : 'total',
      xns : Roo.data,
      '|xns' : 'Roo.data'
     }
    },
    colModel : [
     {
      xtype : 'ColumnModel',
      dataIndex : 'name',
      header : _this._strings['49ee3087348e8d44e1feda1917443987'] /* Name */,
      renderer : function(v) { return String.format('{0}', v); },
      sortable : true,
      width : 200,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'match_regex',
      header : _this._strings['86f600672d32a7be1dd6cb035ac61577'] /* Regex */,
      renderer : function(v) { 
          var ar = v.split("\n");
          if (ar.length > 5) {
              ar = ar.slice(0,5);
              ar.push("....");
          }
          return ar.join("<br>");
      },
      sortable : true,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     }
    ]
   }
  };  }
});
