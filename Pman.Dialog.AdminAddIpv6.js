//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.AdminAddIpv6 = {

 _strings : {
  '8d8dc49a5d1a8ab581b46c94f70882de' :"Add Ipv6",
  '681ecbfa9647e806effd6d73a57c33f5' :"IPv6 address",
  '1243daf593fa297e07ab03bf06d925af' :"Searching...",
  'ea4788705e6873b424c65e91c2846b19' :"Cancel",
  'b307273bc0a7b15dbdaf547e7b7c3782' :"Select Domain",
  'eae639a70006feff484a39363c977e24' :"Domain",
  '3426b2cb01ebac796514393b541455e2' :"Select domain",
  '70c8913c048813c3c137b593cef5a75a' :"Allocation reason",
  'c9cc8cce247e49bae79f15173ce97354' :"Save"
 },
 _named_strings : {
  'domain_id_domain_fieldLabel' : 'eae639a70006feff484a39363c977e24' /* Domain */ ,
  'domain_id_domain_qtip' : '3426b2cb01ebac796514393b541455e2' /* Select domain */ ,
  'domain_id_domain_loadingText' : '1243daf593fa297e07ab03bf06d925af' /* Searching... */ ,
  'allocation_reason_fieldLabel' : '70c8913c048813c3c137b593cef5a75a' /* Allocation reason */ ,
  'domain_id_domain_emptyText' : 'b307273bc0a7b15dbdaf547e7b7c3782' /* Select Domain */ ,
  'ipv6_addr_fieldLabel' : '681ecbfa9647e806effd6d73a57c33f5' /* IPv6 address */ 
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
    autoCreate : true,
    closable : false,
    collapsible : false,
    draggable : true,
    height : 150,
    modal : true,
    resizable : false,
    shadow : true,
    title : _this._strings['8d8dc49a5d1a8ab581b46c94f70882de'] /* Add Ipv6 */,
    width : 550,
    xns : Roo,
    '|xns' : 'Roo',
    center : {
     xtype : 'LayoutRegion',
     alwaysShowTabs : false,
     autoScroll : true,
     closeOnTab : true,
     hideTabs : true,
     titlebar : false,
     xns : Roo,
     '|xns' : 'Roo'
    },
    buttons : [
     {
      xtype : 'Button',
      text : _this._strings['ea4788705e6873b424c65e91c2846b19'] /* Cancel */,
      listeners : {
       click : function (_self, e)
        {
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
       click : function (_self, e)
        {
            _this.dialog.el.mask("Saving");
            _this.form.doAction("submit");
        }
      },
      xns : Roo,
      '|xns' : 'Roo'
     }
    ],
    items  : [
     {
      xtype : 'ContentPanel',
      autoCreate : true,
      background : true,
      fitToFrame : true,
      region : 'center',
      xns : Roo,
      '|xns' : 'Roo',
      items  : [
       {
        xtype : 'Form',
        fileUpload : false,
        labelWidth : 160,
        url : baseURL + '/Roo/crm_person',
        listeners : {
         actioncomplete : function(f, act) {
              _this.dialog.el.unmask();
              if(act.type == 'setdata'){
                  return;
              }
             
              if (act.type == 'load') {
                  return;
              }
              
              
              if (act.type == 'submit') {
                  _this.dialog.hide();
                 
                  if (_this.callback) {
                      _this.callback.call(this, act.result.data);
                  }
                  return; 
              }
          },
         actionfailed : function(f, act) {
              _this.dialog.el.unmask();
              // error msg???
              Pman.standardActionFailed(f,act);
                        
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
          xtype : 'Column',
          width : 500,
          xns : Roo.form,
          '|xns' : 'Roo.form',
          items  : [
           {
            xtype : 'ComboBox',
            allowBlank : true,
            alwaysQuery : true,
            displayField : 'domain',
            editable : true,
            emptyText : _this._strings['b307273bc0a7b15dbdaf547e7b7c3782'] /* Select Domain */,
            fieldLabel : _this._strings['eae639a70006feff484a39363c977e24'] /* Domain */,
            forceSelection : true,
            hiddenName : 'domain_id',
            listWidth : 400,
            loadingText : _this._strings['1243daf593fa297e07ab03bf06d925af'] /* Searching... */,
            minChars : 2,
            name : 'domain_id_domain',
            pageSize : 20,
            qtip : _this._strings['3426b2cb01ebac796514393b541455e2'] /* Select domain */,
            queryParam : 'query[domain]',
            selectOnFocus : true,
            tpl : '<div class=\"x-grid-cell-text x-btn button\">{domain}</div>',
            triggerAction : 'all',
            typeAhead : false,
            valueField : 'id',
            width : 197,
            listeners : {
             render : function (_self)
              {
                  _this.domainCombo = _self;
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
               }
             },
             xns : Roo.data,
             '|xns' : 'Roo.data',
             proxy : {
              xtype : 'HttpProxy',
              method : 'GET',
              url : baseURL + '/Roo/core_domain.php',
              xns : Roo.data,
              '|xns' : 'Roo.data'
             },
             reader : {
              xtype : 'JsonReader',
              fields : [{"name":"id","type":"int"},{"name":"domain","type":"string"}],
              id : 'id',
              root : 'data',
              totalProperty : 'total',
              xns : Roo.data,
              '|xns' : 'Roo.data'
             }
            }
           },
           {
            xtype : 'TextField',
            allowBlank : false,
            fieldLabel : _this._strings['681ecbfa9647e806effd6d73a57c33f5'] /* IPv6 address */,
            name : 'ipv6_addr',
            width : 380,
            xns : Roo.form,
            '|xns' : 'Roo.form'
           },
           {
            xtype : 'TextField',
            allowBlank : false,
            fieldLabel : _this._strings['70c8913c048813c3c137b593cef5a75a'] /* Allocation reason */,
            name : 'allocation_reason',
            width : 380,
            xns : Roo.form,
            '|xns' : 'Roo.form'
           },
           {
            xtype : 'Hidden',
            name : '_person_ids',
            xns : Roo.form,
            '|xns' : 'Roo.form'
           }
          ]
         }
        ]
       }
      ]
     }
    ]
   });
 }
};
