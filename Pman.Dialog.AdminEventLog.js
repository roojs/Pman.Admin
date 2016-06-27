//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminEventLog = {

 _strings : {
  '7a11042f53957727d8667732d7de1102' :"Ipaddr",
  '231bc72756b5e6de492aaaa1577f61b1' :"Remarks",
  '87f9f735a1d36793ceaecd4e47124b63' :"Events",
  'd9578744f1d4b13d40a51fbb8b9d6ea5' :"Person name",
  'c0a002606fb906d471e04fe02e5e53f9' :"Event history",
  '6be4aa550791c310e098cd6c234af7d8' :"Event when",
  'd3d2e617335f08df83599665eef8a418' :"Close",
  '7205d42d6d975c911bc1147259d78935' :"Displaying Events{0} - {1} of {2}",
  '004bf6c9a40003140292e97330236c53' :"Action",
  '90e4ac2e5a22e53df63b6b186d8727ba' :"No Events found"
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
    height : 500,
    title : _this._strings['c0a002606fb906d471e04fe02e5e53f9'] /* Event history */,
    width : 800,
    xns : Roo,
    '|xns' : 'Roo',
    xtype : 'LayoutDialog',
    listeners : {
     show : function (_self)
      {
          _this.grid.footer.onClick('first');
      }
    },
    center : {
     xns : Roo,
     '|xns' : 'Roo',
     xtype : 'LayoutRegion'
    },
    buttons : [
     {
      text : _this._strings['d3d2e617335f08df83599665eef8a418'] /* Close */,
      xns : Roo,
      '|xns' : 'Roo',
      xtype : 'Button',
      listeners : {
       click : function (_self, e)
        {
            _this.dialog.hide();
        }
      }
     }
    ],
    items  : [
     {
      background : false,
      fitContainer : true,
      fitToframe : true,
      region : 'center',
      tableName : 'Events',
      title : _this._strings['87f9f735a1d36793ceaecd4e47124b63'] /* Events */,
      xns : Roo,
      '|xns' : 'Roo',
      xtype : 'GridPanel',
      listeners : {
       activate : function() {
            _this.panel = this;
            if (_this.grid) {
                _this.grid.footer.onClick('first');
            }
        }
      },
      grid : {
       autoExpandColumn : 'remarks',
       loadMask : true,
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       xtype : 'Grid',
       listeners : {
        render : function() 
         {
             _this.grid = this; 
             //_this.dialog = Pman.Dialog.FILL_IN
             if (_this.panel.active) {
                this.footer.onClick('first');
             }
         }
       },
       footer : {
        displayInfo : true,
        displayMsg : _this._strings['7205d42d6d975c911bc1147259d78935'] /* Displaying Events{0} - {1} of {2} */,
        emptyMsg : _this._strings['90e4ac2e5a22e53df63b6b186d8727ba'] /* No Events found */,
        pageSize : 25,
        xns : Roo,
        '|xns' : 'Roo',
        xtype : 'PagingToolbar'
       },
       dataSource : {
        remoteSort : true,
        sortInfo : { field : 'event_when', direction: 'DESC' },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        xtype : 'Store',
        listeners : {
         beforeload : function (_self,o )
          {
              if (!_this.data || !_this.data.on_id) {
                  return false;
              }
              o.params.on_table = _this.data.on_table;
              o.params.on_id = _this.data.on_id;
              
              if (typeof(_this.data.person_table) != 'undefined') {
                   o.params.person_table =_this.data.person_table;
               }
          }
        },
        proxy : {
         method : 'GET',
         url : baseURL + '/Roo/Events.php',
         xns : Roo.data,
         '|xns' : 'Roo.data',
         xtype : 'HttpProxy'
        },
        reader : {
         fields : [
             {
                 'name': 'id',
                 'type': 'int'
             },
             {
                 'name': 'person_name',
                 'type': 'string'
             },
             {
                 'name': 'event_when',
                 'type': 'date',
                 'dateFormat': 'Y-m-d'
             },
             {
                 'name': 'action',
                 'type': 'string'
             },
             {
                 'name': 'ipaddr',
                 'type': 'string'
             },
             {
                 'name': 'on_id',
                 'type': 'int'
             },
             {
                 'name': 'on_table',
                 'type': 'string'
             },
             {
                 'name': 'person_id',
                 'type': 'int'
             },
             {
                 'name': 'remarks',
                 'type': 'string'
             },
             {
                 'name': 'person_table',
                 'type': 'string'
             },
             {
                 'name': 'person_id_id',
                 'type': 'int'
             },
             {
                 'name': 'person_id_office_id',
                 'type': 'int'
             },
             {
                 'name': 'person_id_name',
                 'type': 'string'
             },
             {
                 'name': 'person_id_phone',
                 'type': 'string'
             },
             {
                 'name': 'person_id_fax',
                 'type': 'string'
             },
             {
                 'name': 'person_id_email',
                 'type': 'string'
             },
             {
                 'name': 'person_id_company_id',
                 'type': 'int'
             },
             {
                 'name': 'person_id_role',
                 'type': 'string'
             },
             {
                 'name': 'person_id_active',
                 'type': 'int'
             },
             {
                 'name': 'person_id_remarks',
                 'type': 'string'
             },
             {
                 'name': 'person_id_passwd',
                 'type': 'string'
             },
             {
                 'name': 'person_id_owner_id',
                 'type': 'int'
             },
             {
                 'name': 'person_id_lang',
                 'type': 'string'
             },
             {
                 'name': 'person_id_no_reset_sent',
                 'type': 'int'
             },
             {
                 'name': 'person_id_action_type',
                 'type': 'string'
             },
             {
                 'name': 'person_id_project_id',
                 'type': 'int'
             },
             {
                 'name': 'person_id_deleted_by',
                 'type': 'int'
             },
             {
                 'name': 'person_id_deleted_dt',
                 'type': 'date'
             },
             {
                 'name': 'person_id_firstname',
                 'type': 'string'
             },
             {
                 'name': 'person_id_lastname',
                 'type': 'string'
             }
         ],
         id : 'id',
         root : 'data',
         totalProperty : 'total',
         xns : Roo.data,
         '|xns' : 'Roo.data',
         xtype : 'JsonReader'
        }
       },
       colModel : [
        {
         dataIndex : 'event_when',
         header : _this._strings['6be4aa550791c310e098cd6c234af7d8'] /* Event when */,
         renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y') : ''); },
         width : 75,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'person_id_name',
         header : _this._strings['d9578744f1d4b13d40a51fbb8b9d6ea5'] /* Person name */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'action',
         header : _this._strings['004bf6c9a40003140292e97330236c53'] /* Action */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 80,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'ipaddr',
         header : _this._strings['7a11042f53957727d8667732d7de1102'] /* Ipaddr */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 80,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        },
        {
         dataIndex : 'remarks',
         header : _this._strings['231bc72756b5e6de492aaaa1577f61b1'] /* Remarks */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid',
         xtype : 'ColumnModel'
        }
       ]
      }
     }
    ]
   });
 }
};
