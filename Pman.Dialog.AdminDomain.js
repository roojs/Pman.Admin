//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminDomain = {

 _strings : {
  '77587239bf4c54ea493c7033e1dbf636' :"Last Name",
  'ce8ae9da5b7cd6c3df2929543a9af92d' :"Email",
  '842c51ab0d597b4c7c61066fecf42b44' :"MX last updated",
  'd95867deadfe690e40f42068d6b59df8' :"References",
  '3ec365dd533ddb7ef3d1c111186ce872' :"Details",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  'eae639a70006feff484a39363c977e24' :"Domain",
  '22e6e4a2e35eb478f37738da66480192' :"Add / Edit Core Domain",
  '6e53f65896ebebcd73fdafb389a7ecb9' :"Displaying Pages  {0} - {1} of {2}",
  'b331a153086a91e775f24c00de1f77d9' :"No mx record since",
  '3386fe0e5dfeb5c43e53bbce80f31f5a' :"No Pages found",
  '81c34401de67bbc904ea581fe1922c7b' :"Update Mx",
  'bc910f8bdf70f29374f496f05be0330c' :"First Name",
  'c9cc8cce247e49bae79f15173ce97354' :"Save",
  '289fe65c57825256edde389f99a1f05c' :"Has MX record"
 },
 _named_strings : {
  'mx_updated_fieldLabel' : '842c51ab0d597b4c7c61066fecf42b44' /* MX last updated */ ,
  'no_mx_dt_fieldLabel' : 'b331a153086a91e775f24c00de1f77d9' /* No mx record since */ ,
  'domain_fieldLabel' : 'eae639a70006feff484a39363c977e24' /* Domain */ ,
  'is_mx_valid_fieldLabel' : '289fe65c57825256edde389f99a1f05c' /* Has MX record */ 
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
    height : 275,
    modal : true,
    resizable : false,
    title : _this._strings['22e6e4a2e35eb478f37738da66480192'] /* Add / Edit Core Domain */,
    width : 500,
    xns : Roo,
    '|xns' : 'Roo',
    center : {
     xtype : 'LayoutRegion',
     tabPosition : 'top',
     xns : Roo,
     '|xns' : 'Roo'
    },
    buttons : [
     {
      xtype : 'Button',
      text : _this._strings['81c34401de67bbc904ea581fe1922c7b'] /* Update Mx */,
      listeners : {
       click : function (_self, e)
        {
            var id = _this.form.findField("id").getValue();
            
            if(!(id * 1)) {
                Roo.MessageBox.alert('Error', 'Please save first');
                return;
            }
            
            new Pman.Request({
               url : baseURL + '/Roo/core_domain.php',
               method : 'POST',
               mask: "Updating",
               params : {
                   id : id,
                   _update_mx : 1
               }, 
               success : function(res) {
                    if(!res.data.length){
                        return;
                    }
                    if(_this.data.id){
                        _this.form.load({ method: 'GET', params: { '_id' : _this.data.id }});
                    }
               }
           });
        }
      },
      xns : Roo,
      '|xns' : 'Roo'
     },
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
      title : _this._strings['3ec365dd533ddb7ef3d1c111186ce872'] /* Details */,
      xns : Roo,
      '|xns' : 'Roo',
      items  : [
       {
        xtype : 'Form',
        labelWidth : 180,
        method : 'POST',
        style : 'margin: 5px',
        url : baseURL + '/Roo/Core_domain.php',
        listeners : {
         actioncomplete : function (_self, action)
          {
            if (action.type == 'setdata') {
                 //_this.dialog.el.mask("Loading");
                  
                 this.load({ method: 'GET', params: { '_id' : _this.data.id }});
                 return;
              }
              if (action.type == 'load') {
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
          fieldLabel : _this._strings['eae639a70006feff484a39363c977e24'] /* Domain */,
          name : 'domain',
          width : 250,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'DisplayField',
          fieldLabel : _this._strings['b331a153086a91e775f24c00de1f77d9'] /* No mx record since */,
          name : 'no_mx_dt',
          valueRenderer : function()
          {
              if(!_this.form) {
                  return '';
              }
              
              var no_mx_dt = _this.form.findField('no_mx_dt').value;
              
              var ret = no_mx_dt instanceof Date ? no_mx_dt.format('Y-m-d H:i:s') : no_mx_dt;
              
              if(ret == '1000-01-01 00:00:00') {
                  return 'N/A'
              }
              
              return String.format("<span style='color:red;'>{0}</span>", ret);
          },
          width : 900,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'DisplayField',
          fieldLabel : _this._strings['842c51ab0d597b4c7c61066fecf42b44'] /* MX last updated */,
          name : 'mx_updated',
          width : 900,
          xns : Roo.form,
          '|xns' : 'Roo.form'
         },
         {
          xtype : 'Checkbox',
          fieldLabel : _this._strings['289fe65c57825256edde389f99a1f05c'] /* Has MX record */,
          name : 'is_mx_valid',
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
     },
     {
      xtype : 'GridPanel',
      background : true,
      fitContainer : true,
      fitToframe : true,
      region : 'center',
      tableName : 'core_domain',
      title : _this._strings['d95867deadfe690e40f42068d6b59df8'] /* References */,
      listeners : {
       activate : function() {
            _this.journalist_panel = this;
            if (_this.journalist_grid) {
                _this.journalist_grid.footer.onClick('first');
            }
        }
      },
      xns : Roo,
      '|xns' : 'Roo',
      grid : {
       xtype : 'Grid',
       autoExpandColumn : 'email',
       loadMask : true,
       listeners : {
        render : function() 
         {
             _this.journalist_grid = this;
             if (_this.journalist_panel.active) {
                this.footer.onClick('first')
             }
         },
        rowdblclick : function (_self, rowIndex, e)
         {
             var rec = _self.getDataSource().getAt(rowIndex);
             /*
             Pman.Dialog.PressReleaseContact.show({id: rec.data.id}, function() {
                 _self.footer.onClick('first');
             });
             */
         }
       },
       xns : Roo.grid,
       '|xns' : 'Roo.grid',
       footer : {
        xtype : 'PagingToolbar',
        displayInfo : true,
        displayMsg : _this._strings['6e53f65896ebebcd73fdafb389a7ecb9'] /* Displaying Pages  {0} - {1} of {2} */,
        emptyMsg : _this._strings['3386fe0e5dfeb5c43e53bbce80f31f5a'] /* No Pages found */,
        pageSize : 25,
        xns : Roo,
        '|xns' : 'Roo'
       },
       dataSource : {
        xtype : 'Store',
        remoteSort : true,
        sortInfo : { field : 'email', direction: 'ASC' },
        listeners : {
         beforeload : function (_self, o)
          {
              o.params = o.params || {};
              
              var domain_id = _this.form.findField('id').getValue();
              
              if(domain_id < 1){
                  this.removeAll();
                  return false;
              }
              
              o.params['_get_references'] = domain_id;
          }
        },
        xns : Roo.data,
        '|xns' : 'Roo.data',
        proxy : {
         xtype : 'HttpProxy',
         method : 'GET',
         url : baseURL + '/Roo/Core_domain.php',
         xns : Roo.data,
         '|xns' : 'Roo.data'
        },
        reader : {
         xtype : 'JsonReader',
         fields : [
             {
                 'name': 'id',
                 'type': 'int'
             }
         ],
         id : 'id',
         root : 'data',
         totalProperty : 'total',
         xns : Roo.data,
         '|xns' : 'Roo.data'
        }
       },
       cm : [
        {
         xtype : 'ColumnModel',
         dataIndex : 'firstname',
         header : _this._strings['bc910f8bdf70f29374f496f05be0330c'] /* First Name */,
         renderer : function(v) { return String.format('{0}', v ? v : ''); },
         sortable : true,
         width : 75,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'lastname',
         header : _this._strings['77587239bf4c54ea493c7033e1dbf636'] /* Last Name */,
         renderer : function(v) { return String.format('{0}', v ? v : ''); },
         width : 75,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        },
        {
         xtype : 'ColumnModel',
         dataIndex : 'email',
         header : _this._strings['ce8ae9da5b7cd6c3df2929543a9af92d'] /* Email */,
         renderer : function(v) { return String.format('{0}', v ? v : ''); },
         width : 150,
         xns : Roo.grid,
         '|xns' : 'Roo.grid'
        }
       ]
      }
     }
    ]
   });
 }
};
