//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.AdminNotify = new Roo.XComponent({

 _strings : {
  '136fac3c5c5881e0a7d0039e57decd68' :"Select notify type",
  'bf1cb7e2a337a5e2ebf614009cbce9cc' :"Current Notifications",
  '8535bcc0f05358a583bb432bbadf7e0d' :"Select type",
  'e12167aa0a7698e6ebc92b4ce3909b53' :"To",
  '478192f02d448c49bc6b7d76818d8483' :"Ontable",
  'dca4dd744d00b6fe1362ef7825ffdee5' :"No core_notify found",
  'dc873ea4b71ca217b0d8d1fdd45854ac' :"id#",
  '0f6d01b16d57911731aa44b94dbfefcc' :"Act when",
  '7f8c0283f16925caed8e632086b81b9c' :"Sent",
  'c956c97343a45cca5d492e70c56daa8e' :"Select person",
  '12832b4def6eb0b6105b3d11e16066ea' :"Msgid",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  '24463f10155b8af973300f86302c4fde' :"Who to notify",
  'b22e7ea679daf5146f08f477419dd8bd' :"Triggered by",
  '5da618e8e4b89c66fe86e32cdafde142' :"From",
  'e4b478c05a833569833f9cc63b6c4354' :"Displaying core_notify{0} - {1} of {2}",
  '4c3880bb027f159e801041b1021e88e8' :"Method",
  'a4ecfc70574394990cf17bd83df499f7' :"Event",
  '12ea1a38991aa3bc4992b10adac0f3bc' :"Event Details",
  'f2a6c498fb90ee345d997f888fce3b18' :"Delete",
  'f821027bade4aa6b7a4191cd1676cf41' :"Show Completed"
 },

  part     :  ["Admin", "Notify" ],
  order    : '001-Pman.Tab.AdminNotify',
  region   : 'center',
  parent   : 'Pman.Tab.AdminWatchNotify',
  name     : "Pman.Tab.AdminNotify",
  disabled : false, 
  permname : '', 
  _tree : function(_data)
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'NestedLayoutPanel',
   background : false,
   region : 'center',
   title : _this._strings['bf1cb7e2a337a5e2ebf614009cbce9cc'] /* Current Notifications */,
   listeners : {
    render : function (_self)
     {
         _this.nest = this;
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
     xns : Roo,
     '|xns' : 'Roo'
    },
    south : {
     xtype : 'LayoutRegion',
     autoScroll : true,
     collapsedTitle : 'View Details',
     collapsible : true,
     height : 150,
     split : true,
     title : _this._strings['12ea1a38991aa3bc4992b10adac0f3bc'] /* Event Details */,
     xns : Roo,
     '|xns' : 'Roo'
    },
    items  : [
     {
      xtype : 'GridPanel',
      background : true,
      fitContainer : true,
      fitToframe : true,
      region : 'center',
      tableName : 'core_notify',
      title : _this._strings['bf1cb7e2a337a5e2ebf614009cbce9cc'] /* Current Notifications */,
      listeners : {
       activate : function() {
            _this.panel = this;
            if (_this.grid) {
                _this.grid.footer.onClick('first');
            }
            
        }
      },
      xns : Roo,
      '|xns' : 'Roo',
      grid : {
       xtype : 'Grid',
       autoExpandColumn : 'person_id_name',
       loadMask : true,
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
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       footer : {
        xtype : 'PagingToolbar',
        displayInfo : true,
        displayMsg : _this._strings['e4b478c05a833569833f9cc63b6c4354'] /* Displaying core_notify{0} - {1} of {2} */,
        emptyMsg : _this._strings['dca4dd744d00b6fe1362ef7825ffdee5'] /* No core_notify found */,
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
          xtype : 'ComboBox',
          allowBlank : true,
          displayField : 'person_id_name',
          editable : true,
          emptyText : _this._strings['c956c97343a45cca5d492e70c56daa8e'] /* Select person */,
          forceSelection : true,
          listWidth : 400,
          loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
          minChars : 2,
          pageSize : 20,
          qtip : _this._strings['c956c97343a45cca5d492e70c56daa8e'] /* Select person */,
          queryParam : 'query[person_id_name]',
          selectOnFocus : true,
          tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{person_id_name}</b> {person_id_email}</div>',
          triggerAction : 'all',
          valueField : 'person_id',
          width : 200,
          listeners : {
           render : function (_self)
            {
               _this.personCombo = _self;
            },
           select : function (combo, record, index)
            {
               _this.grid.footer.onClick('first');
            }
          },
          xns : Roo.form,
          '|xns' : 'Roo.form',
          store : {
           xtype : 'Store',
           remoteSort : true,
           sortInfo : { direction : 'ASC', field: 'person_id_name' },
           listeners : {
            beforeload : function (_self, o){
                 o.params = o.params || {};
                 o.params._distinct='person_id';
                 o.params._columns='person_id,person_id_name,person_id_email';
                 o.params['!person_id_name'] = '';
                 
                 // set more here
             }
           },
           xns : Roo.data,
           '|xns' : 'Roo.data',
           proxy : {
            xtype : 'HttpProxy',
            method : 'GET',
            url : baseURL + '/Roo/core_notify.php',
            xns : Roo.data,
            '|xns' : 'Roo.data'
           },
           reader : {
            xtype : 'JsonReader',
            fields : [{"name":"id","type":"int"},{"name":"ontable","type":"string"}],
            id : 'id',
            root : 'data',
            totalProperty : 'total',
            xns : Roo.data,
            '|xns' : 'Roo.data'
           }
          }
         },
         {
          xtype : 'Separator',
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         },
         {
          xtype : 'ComboBox',
          allowBlank : true,
          displayField : 'display_name',
          editable : true,
          emptyText : _this._strings['136fac3c5c5881e0a7d0039e57decd68'] /* Select notify type */,
          forceSelection : true,
          listWidth : 400,
          loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
          minChars : 2,
          pageSize : 20,
          qtip : _this._strings['8535bcc0f05358a583bb432bbadf7e0d'] /* Select type */,
          queryParam : 'query[name]',
          selectOnFocus : true,
          tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{display_name}</b></div>',
          triggerAction : 'all',
          valueField : 'name',
          width : 200,
          listeners : {
           render : function (_self)
            {
               _this.typeCombo = _self;
            },
           select : function (combo, record, index)
            {
               _this.grid.footer.onClick('first');
            }
          },
          xns : Roo.form,
          '|xns' : 'Roo.form',
          store : {
           xtype : 'Store',
           remoteSort : true,
           sortInfo : { direction : 'ASC', field: 'id' },
           listeners : {
            beforeload : function (_self, o){
                 o.params = o.params || {};
                 o.params.etype = 'Core.NotifyType';
                 o.params.active = 1;
             }
           },
           xns : Roo.data,
           '|xns' : 'Roo.data',
           proxy : {
            xtype : 'HttpProxy',
            method : 'GET',
            url : baseURL + '/Roo/core_enum.php',
            xns : Roo.data,
            '|xns' : 'Roo.data'
           },
           reader : {
            xtype : 'JsonReader',
            fields : [{"name":"name","type":"string"},{"name":"display_name","type":"string"}],
            id : 'id',
            root : 'data',
            totalProperty : 'total',
            xns : Roo.data,
            '|xns' : 'Roo.data'
           }
          }
         },
         {
          xtype : 'Separator',
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         },
         {
          xtype : 'TextItem',
          text : _this._strings['5da618e8e4b89c66fe86e32cdafde142'] /* From */,
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         },
         {
          xtype : 'DateField',
          format : 'd/M/Y',
          width : 100,
          listeners : {
           render : function (_self)
            {
                _this.fromDateSel = _self;
               //_self.setValue(  new Date() );
            },
           select : function (combo, date)
            {
                _this.grid.footer.onClick('first');
            }
          },
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'Separator',
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         },
         {
          xtype : 'TextItem',
          text : _this._strings['e12167aa0a7698e6ebc92b4ce3909b53'] /* To */,
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         },
         {
          xtype : 'DateField',
          format : 'd/M/Y',
          width : 100,
          listeners : {
           render : function (_self)
            {
                _this.toDateSel = _self;
               //_self.setValue(  new Date() );
            },
           select : function (combo, date)
            {
                _this.grid.footer.onClick('first');
            }
          },
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'Fill',
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         },
         {
          xtype : 'Button',
          cls : 'x-btn-text-icon',
          icon : rootURL + '/Pman/templates/images/trash.gif',
          text : _this._strings['f2a6c498fb90ee345d997f888fce3b18'] /* Delete */,
          listeners : {
           click : function()
            {
                Pman.genericDelete(_this, 'core_notify'); 
            }
          },
          xns : Roo.Toolbar,
          '|xns' : 'Roo.Toolbar'
         },
         {
          xtype : 'Button',
          enableToggle : true,
          text : _this._strings['f821027bade4aa6b7a4191cd1676cf41'] /* Show Completed */,
          listeners : {
           render : function (_self)
            {
                _this.toggleBtn = _self;
            },
           toggle : function (_self, pressed)
            {
                this.setText(pressed ? "Hide Completed" : "Show Completed");
                _this.grid.footer.onClick('first');
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
        sortInfo : { field : 'act_when', direction: 'DESC' },
        listeners : {
         beforeload : function (_self, options)
          {
              options.params = options.params || {};
              
              options.params._evtype_align = 1;
              
              if (!_this.toggleBtn.pressed) {
                  options.params['event_id'] = 0;
              } else  {
                  options.params['!event_id'] = 0;
              }
              
              if (!_this.personCombo) {
                  return false;
              }
              var p = _this.personCombo.getValue();
              if (p*1) { 
                  options.params.person_id = p;
              }
              
              var from = _this.fromDateSel.getValue();
              
              if(from){
                  options.params.from = from.format('Y-m-d');
              }
              
              var to = _this.toDateSel.getValue();
              
              if(to){
                  options.params.to = to.format('Y-m-d');
              }
              
              var type = _this.typeCombo.getValue();
              
              if(type.length){
                  options.params.evtype = type;
              }
          }
        },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         url : baseURL + '/Roo/core_notify.php',
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
                 'name': 'act_when',
                 'type': 'date',
                 'dateFormat': 'Y-m-d'
             },
             {
                 'name': 'onid',
                 'type': 'int'
             },
             {
                 'name': 'ontable',
                 'type': 'string'
             },
             {
                 'name': 'person_id',
                 'type': 'int'
             },
             {
                 'name': 'msgid',
                 'type': 'string'
             },
             {
                 'name': 'sent',
                 'type': 'date',
                 'dateFormat': 'Y-m-d'
             },
             {
                 'name': 'event_id',
                 'type': 'int'
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
                 'name': 'event_id_id',
                 'type': 'int'
             },
             {
                 'name': 'event_id_person_name',
                 'type': 'string'
             },
             {
                 'name': 'event_id_event_when',
                 'type': 'date'
             },
             {
                 'name': 'event_id_action',
                 'type': 'string'
             },
             {
                 'name': 'event_id_ipaddr',
                 'type': 'string'
             },
             {
                 'name': 'event_id_on_id',
                 'type': 'int'
             },
             {
                 'name': 'event_id_on_table',
                 'type': 'string'
             },
             {
                 'name': 'event_id_person_id',
                 'type': 'int'
             },
             {
                 'name': 'event_id_remarks',
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
       sm : {
        xtype : 'RowSelectionModel',
        singleSelect : true,
        listeners : {
         afterselectionchange : function (_self)
          {
              // load detail log in _this.viewPanel;
              if (!this.getSelected()) {
                  this.viewPanel.setContent("Nothing Selected");
                  return;
              }
              var id = this.getSelected().data.event_id;
              if (id *1 < 1) {
              
                 _this.viewPanel.setContent("No Event for this line");    
                  return;
              }
              _this.viewPanel.load( { url : baseURL + "/Admin/EventView/" + id + ".html" });
              
          }
        },
        xns : Roo.grid,
        '|xns' : 'Roo.grid'
       },
       colModel : [
        {
         xtype : 'ColumnModel',
         dataIndex : 'id',
         header : _this._strings['dc873ea4b71ca217b0d8d1fdd45854ac'] /* id# */,
         renderer : function(v) { return String.format('{0}', v ); },
         sortable : true,
         width : 50,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'evtype',
         header : _this._strings['4c3880bb027f159e801041b1021e88e8'] /* Method */,
         renderer : function(v,x,r) 
         { 
             var vv = (typeof(r.data.evtype_align) != 'undefined' && r.data.evtype_align) ? r.data.evtype_align : v;
             return String.format('<span qtip="{0}">{1}</span>', v, vv ); 
         },
         sortable : true,
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'act_when',
         header : _this._strings['0f6d01b16d57911731aa44b94dbfefcc'] /* Act when */,
         renderer : function(v) { return String.format('{0}', v ? v.format('d/M/Y H:i:s') : ''); },
         sortable : true,
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'sent',
         header : _this._strings['7f8c0283f16925caed8e632086b81b9c'] /* Sent */,
         renderer : function(v,x,r) {
             if (r.data.event_id *1 == 0) {
                 return '';
             }
              return String.format('{0}', v ? v.format('d/M/Y H:i:s') : '');
           },
         sortable : true,
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'ontable',
         header : _this._strings['478192f02d448c49bc6b7d76818d8483'] /* Ontable */,
         renderer : function(v,x,r) { return String.format('{0}:{1}', v,r.data.onid); },
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'person_id_name',
         header : _this._strings['24463f10155b8af973300f86302c4fde'] /* Who to notify */,
         renderer : function(v,x,r) {
         
             var pt = r.data.person_table.toLowerCase() ;
             var pt = pt.length ? pt : 'person';
              var ecol = pt + '_id_email' ;
              var ncol = pt + '_id_name' ;
              return String.format('{0} <u>&lt;{1}&gt;</u>', r.data[ncol], r.data[ecol]); 
          },
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'trigger_event_id',
         header : _this._strings['b22e7ea679daf5146f08f477419dd8bd'] /* Triggered by */,
         renderer : function(v,x,r) {
              return String.format(
                     '{0} : {1} {2}', 
                     r.data.trigger_event_id_on_table, 
                     r.data.trigger_event_id_on_id, 
                     r.data.trigger_event_id_remarks
                 ); 
          },
         width : 100,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'msgid',
         header : _this._strings['12832b4def6eb0b6105b3d11e16066ea'] /* Msgid */,
         renderer : function(v) { return String.format('{0}', v); },
         width : 200,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'event_id_remarks',
         header : _this._strings['a4ecfc70574394990cf17bd83df499f7'] /* Event */,
         renderer : function(v) { return String.format('<span qtip="{0}">{0}</span>', v); },
         width : 300,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        }
       ]
      }
     },
     {
      xtype : 'ContentPanel',
      fitToFrame : true,
      region : 'south',
      listeners : {
       render : function (_self)
        {
          _this.viewPanel = _self;
        }
      },
      xns : Roo,
      '|xns' : 'Roo'
     }
    ]
   }
  };  }
});
