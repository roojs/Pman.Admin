//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.CobaInvestorModify= function() {}
Roo.apply(Pman.Dialog.CobaInvestorModify.prototype, {

 _strings : {
  '44749712dbec183e983dcd78a7736c41' :"Date",
  '4e97aeeaa8b15ca1180fcd1f3ac478d1' :"When",
  'e1d496d505f34ae1866fc7ad0e59e7ac' :"Compliance Review",
  'f28128b38efbc6134dc40751ee21fd29' :"Documents",
  'd41d8cd98f00b204e9800998ecf8427e' :" ",
  '3e4901127828df59e44a55af7659e508' :"<i class=\"fa fa-times-circle\"></i> not complete",
  '457dd55184faedb7885afd4009d70163' :"Review",
  '231bc72756b5e6de492aaaa1577f61b1' :"Remarks",
  'b80bb7740288fda1f201890375a60c8f' :"id",
  '09677be3a36334e7fcad710832364b77' :"Add a Note",
  '418c5509e2171d55b0aee5c2ea4442b5' :"action",
  '31e41095bfaa14799239e8d9ba7ad438' :"Application Details",
  'd41d8cd98f00b204e9800998ecf8427e' :"",
  '13348442cc6a27032d2b4aa28b75a5d3' :"Search",
  '93b6fe26d96a3a9812a34cb6ba9b3567' :"Historical Notes",
  '5cfee765454e9ab499d547c20476f696' :"Change Advisor",
  '1eb39f9b4c58313ca684e44d590b1d82' :"Lexis Nexis",
  '2b16564e6e838ce86608620b70beb570' :"Activity Log",
  '3e4696aa5313272da1baa6497c82a9b5' :"Notes about User",
  '4b1b4dc8cf38b3c64b1d657da8f5ac8c' :"Report",
  '0945359809dad1fbf3dea1c95a0da951' :"Document",
  'b46df2f1d2e702b38d83cc22954263c6' :"Un-submit",
  'f018a137eb54d99d29a9b41fb6b061b5' :"Add Note",
  '269d037052d86346356a8077aee32baf' :"View Reason",
  '0e883c2b722f8a57275b249bef7c94db' :"Lexis Nexis Search",
  '4ee972120bcda675f75222c87cb9d356' :"Who",
  '292659c2de7f3de1a9ab2abfef6839a4' :"Uploaded Documents",
  '801ab24683a4a8c433c6eb40c48bcd9d' :"Download",
  '405e3e5c89b4b29dcb052614626788bb' :"View / Status",
  'cce99c598cfdb9773ab041d54c3d973a' :"Profile",
  '3b878279a04dc47d60932cb294d96259' :"Overview",
  '8f2ec0b04f61587a0e83068e5ef842bd' :"<i class=\"fa fa-times-circle\" aria-hidden=\"true\"></i>  not complete",
  'a14739916eebbb7689b495e07b15fe2a' :"Edit Accreditation",
  '66e77e7bfdc713de218e85cf6655b9d1' :"Modify / View Investor",
  'f4c6f851b00d5518bf888815de279aba' :"Notes",
  'e3a96404a82d284db5e77ec5a0d9d6cb' :"Change User's Password",
  'd3d2e617335f08df83599665eef8a418' :"Close"
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
    fitwindow : true,
    title : _this._strings['66e77e7bfdc713de218e85cf6655b9d1'] /* Modify / View Investor */,
    listeners : {
     hide : function (_self)
      {
          if (_this.callback) {
              _this.callback.call(_self, _this.data);
          } 
      },
     show : function (_self)
      {
          _this.dialog.items[0].getRegion('center').showPanel(0); 
          
          new Pman.Request({
              url: baseURL + '/Roo/Core_group.php',
              method : 'GET',
              params : {
                  _count_member_by_name : 'Compliance Officers'
              }, 
              success : function(res) {
      
                  if(res.data * 1 > 0){
                      return;
                  }
                  
                  Roo.bootstrap.MessageBox.alert('Warning', "There is no any memeber in 'Compliance Officers' group");
                  
              }
          });
      }
    },
    xns : Roo.bootstrap,
    '|xns' : 'Roo.bootstrap',
    buttons : [
     {
      xtype : 'Button',
      html : _this._strings['a14739916eebbb7689b495e07b15fe2a'] /* Edit Accreditation */,
      weight : 'warning',
      listeners : {
       click : function (_self, e)
        {
            if(_this.data.is_submit * 1 == 1){
                Roo.bootstrap.MessageBox.alert('Application has been submittted', "You should 'un-submit' the application if you wish to edit it.");
                return;
            }
            
            _this.dialog.el.mask('Sending');
            
            new Pman.Request({
                url: baseURL + '/Coba/ModxSession',
                method: 'GET',
                params: {
                    investor_id: _this.data.userdata_id,
                    account_type: _this.data.account_type
                },
                success:  function(res)  {
                    if (res.success && res.data) {
                        window.onbeforeunload  =null;
                        window.onunload  = function () {
                            _this.dialog.el.unmask()
                        };
                        var win = window.open(res.data, '_self');
                    }
                },
                failure : function(res)
                {
                    _this.dialog.el.unmask();
                    Roo.bootstrap.MessageBox.alert("Error",  res.errorMsg);
                }
            });
             
        }
      },
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap'
     },
     {
      xtype : 'Button',
      html : _this._strings['5cfee765454e9ab499d547c20476f696'] /* Change Advisor */,
      listeners : {
       click : function (_self, e)
        {   
            Pman.Dialog.CobaInvestorChangeAdvisor.show({id: _this.data.id}, function(){
                _this.form.fireEvent('actioncomplete', _this.form,  { type: 'setdata', data: { id : _this.data.id }});
            });
            
        }
      },
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap'
     },
     {
      xtype : 'Button',
      html : _this._strings['e3a96404a82d284db5e77ec5a0d9d6cb'] /* Change User's Password */,
      listeners : {
       click : function (_self, e)
        {
            Pman.Dialog.CobaInvestorChangePassword.show({id: _this.data.userdata_id})
            
        
        }
      },
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap'
     },
     {
      xtype : 'Button',
      html : _this._strings['d3d2e617335f08df83599665eef8a418'] /* Close */,
      listeners : {
       click : function (_self, e)
        {
            _this.dialog.hide();
        //     if (_this.callback) {
        //         _this.callback.call(this, _this.data);
        //     }
        }
      },
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap'
     }
    ],
    items  : [
     {
      xtype : 'Border',
      listeners : {
       render : function (_self)
        {
            _this.layout = _self;
        }
      },
      xns : Roo.bootstrap.layout,
      '|xns' : 'Roo.bootstrap.layout',
      center : {
       xtype : 'Region',
       alwaysShowTabs : true,
       tabPosition : 'top',
       xns : Roo.bootstrap.layout,
       '|xns' : 'Roo.bootstrap.layout'
      },
      items  : [
       {
        xtype : 'Nest',
        autoScroll : false,
        fitContainer : true,
        fitToFrame : true,
        region : 'center',
        title : _this._strings['3b878279a04dc47d60932cb294d96259'] /* Overview */,
        xns : Roo.bootstrap.panel,
        '|xns' : 'Roo.bootstrap.panel',
        layout : {
         xtype : 'Border',
         xns : Roo.bootstrap.layout,
         '|xns' : 'Roo.bootstrap.layout',
         center : {
          xtype : 'Region',
          hideTabs : true,
          xns : Roo.bootstrap.layout,
          '|xns' : 'Roo.bootstrap.layout'
         },
         north : {
          xtype : 'Region',
          height : 280,
          hideTabs : true,
          split : true,
          xns : Roo.bootstrap.layout,
          '|xns' : 'Roo.bootstrap.layout'
         },
         items  : [
          {
           xtype : 'Content',
           autoScroll : true,
           fitContainer : true,
           fitToFrame : true,
           region : 'north',
           title : _this._strings['3b878279a04dc47d60932cb294d96259'] /* Overview */,
           listeners : {
            render : function (_self)
             {
                 _this.overview_tab = _self;
             }
           },
           xns : Roo.bootstrap.panel,
           '|xns' : 'Roo.bootstrap.panel',
           items  : [
            {
             xtype : 'Form',
             loadMask : false,
             reloadData : function() 
             {
                 _this.dialog.el.mask('Loading...');
                 
                 _this.form.doAction('load', { method: 'GET', params: { 
                     '_id' : _this.data.id, 
                     _with_status : 1, 
                     _with_lexis_nexis : 1,
                     _with_compliance_status : 1
                 }});
             },
             url : baseURL + '/Roo/Ext_data',
             listeners : {
              actioncomplete : function (_self, action)
               {
                   if(action.type == 'setdata'){
               
                       _this.form.reset();
               
                       if(_this.data.id * 1 > 0) {
                           
                           _this.form.reloadData();
                           
                       }
                       
                       return;
                   }
                   
                   if(action.type == 'load') {
                       
                       _this.data = action.result.data;
                       
                       _this.dialog.el.unmask();
                       
                       _this.dialog.setTitle('Manage Investor - ' + String.format('{0}', _this.data.full_name));
                       
                       _this.profile_indicator.update();
                       
                       _this.documents_indicator.update();
                       
                       _this.lexis_nexis_indicator.update();
                       
                       _this.compliance_indicator.update();
                       
                       _this.account_type_notice.update();
                       
                       _this.fund_name_notice.update();
                       
                       _this.advisor_notice.update();
                       
                       _this.lexis_nexis_panel.update();
                       
                       _this.reportGrid.store.load({});
               
                       return;
                   }
                   
                   if(action.type == 'submit') {
               
                       return;
                   }
               },
              render : function (_self)
               {
                   _this.form = _self; 
               }
             },
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'Container',
               style : 'margin-top:5px;',
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap',
               items  : [
                {
                 xtype : 'Row',
                 style : 'margin-top: 10px; margin-bottom: 10px;',
                 xns : Roo.bootstrap,
                 '|xns' : 'Roo.bootstrap',
                 items  : [
                  {
                   xtype : 'Column',
                   cls : 'text-center',
                   sm : 4,
                   update : function() 
                   { 
                       this.el.dom.innerHTML = String.format('<b>Type:</b> {0}', _this.data.account_type);
                   },
                   listeners : {
                    render : function (_self)
                     {
                         _this.account_type_notice = this;
                     }
                   },
                   xns : Roo.bootstrap,
                   '|xns' : 'Roo.bootstrap'
                  },
                  {
                   xtype : 'Column',
                   cls : 'text-center',
                   sm : 4,
                   update : function() 
                   { 
                       this.el.dom.innerHTML = String.format('<b>Fund Name:</b> {0}', _this.data.fund_name);
                   },
                   listeners : {
                    render : function (_self)
                     {
                         _this.fund_name_notice = this;
                     }
                   },
                   xns : Roo.bootstrap,
                   '|xns' : 'Roo.bootstrap'
                  },
                  {
                   xtype : 'Column',
                   cls : 'text-center',
                   sm : 4,
                   update : function() 
                   { 
                       this.el.dom.innerHTML = String.format('<b>Advisor:</b> {0}', _this.data.investment_advisor_id_name);
                   },
                   listeners : {
                    render : function (_self)
                     {
                         _this.advisor_notice = this;
                     }
                   },
                   xns : Roo.bootstrap,
                   '|xns' : 'Roo.bootstrap'
                  }
                 ]
                },
                {
                 xtype : 'Row',
                 xns : Roo.bootstrap,
                 '|xns' : 'Roo.bootstrap',
                 items  : [
                  {
                   xtype : 'Column',
                   sm : 3,
                   style : 'text-align:center',
                   update : function() 
                   { 
                       var icon = 'fa-times-circle';
                       var msg = 'Not Submitted';
                       var color = '#941B0C';
                       
                       _this.unSubmitBtn.el.hide();
                       
                       if(_this.data.is_submit * 1) {
                       
                           icon = 'fa-check';
                           msg = 'Submitted';
                           color = 'green';
                           
                           _this.unSubmitBtn.el.show();
                       }
                       
                       _this.profile_icon.el.setStyle('color', color);
                       
                       _this.profile_message.el.dom.innerHTML = String.format('<i style="color:{0}" class="fa {1}"></i> {2}', color, icon, msg);
                       
                   },
                   listeners : {
                    render : function (_self)
                     {
                         _this.profile_indicator = this;
                     }
                   },
                   xns : Roo.bootstrap,
                   '|xns' : 'Roo.bootstrap',
                   items  : [
                    {
                     xtype : 'Container',
                     cls : 'fa-5x',
                     fa : 'user',
                     listeners : {
                      render : function (_self)
                       {
                           _this.profile_icon = this;
                       }
                     },
                     xns : Roo.bootstrap,
                     '|xns' : 'Roo.bootstrap'
                    },
                    {
                     xtype : 'Element',
                     html : _this._strings['cce99c598cfdb9773ab041d54c3d973a'] /* Profile */,
                     xns : Roo.bootstrap,
                     '|xns' : 'Roo.bootstrap'
                    },
                    {
                     xtype : 'Element',
                     html : _this._strings['3e4901127828df59e44a55af7659e508'] /* <i class="fa fa-times-circle"></i> not complete */,
                     listeners : {
                      render : function (_self)
                       {
                           _this.profile_message = this;
                           
                       }
                     },
                     xns : Roo.bootstrap,
                     '|xns' : 'Roo.bootstrap'
                    },
                    {
                     xtype : 'Element',
                     xns : Roo.bootstrap,
                     '|xns' : 'Roo.bootstrap',
                     items  : [
                      {
                       xtype : 'Row',
                       xns : Roo.bootstrap,
                       '|xns' : 'Roo.bootstrap',
                       items  : [
                        {
                         xtype : 'Column',
                         xs : 12,
                         xns : Roo.bootstrap,
                         '|xns' : 'Roo.bootstrap',
                         items  : [
                          {
                           xtype : 'Button',
                           html : _this._strings['b46df2f1d2e702b38d83cc22954263c6'] /* Un-submit */,
                           style : 'margin-left: auto; margin-right: auto; margin-bottom: 10px; width: 150px; text-align: center;',
                           weight : 'info',
                           listeners : {
                            click : function (_self, e)
                             {
                                 if(!_this.data.id* 1) {
                                     return;
                                 }
                             
                                 Roo.bootstrap.MessageBox.confirm("Confirm", "Are sure you want to Un-submit?", function (v){
                                     if (v != 'yes') {
                                         return;
                                     }
                             
                                     new Pman.Request({
                                         url : baseURL + '/Roo/Ext_data',
                                         method: 'POST',
                                         mask : 'Loading',
                                         params : {
                                             id : _this.data.id* 1,
                                             is_submit: 0
                                         },
                                         success : function(res)
                                         {
                                             _this.form.reloadData();
                                         }
                                     });
                                 });
                                 
                             },
                            render : function (_self)
                             {
                                 _this.unSubmitBtn = this;
                                 
                                 this.el.setVisibilityMode(Roo.Element.DISPLAY);
                                 
                                 this.el.hide();
                             }
                           },
                           xns : Roo.bootstrap,
                           '|xns' : 'Roo.bootstrap'
                          }
                         ]
                        }
                       ]
                      }
                     ]
                    }
                   ]
                  },
                  {
                   xtype : 'Column',
                   sm : 3,
                   style : 'text-align:center',
                   update : function() 
                   { 
                       var icon = 'fa-times-circle';
                       var msg = 'Not Complete';
                       var color = '#941B0C';
                       
                       if(_this.data.is_missing_document * 1 == 0) {
                           icon = 'fa-check';
                           msg = 'Complete';
                           color = 'green';
                       }
                       
                       _this.check_document_icon.el.setStyle('color', color);
                       
                       _this.documents_message.el.dom.innerHTML = String.format('<i style="color:{0}" class="fa {1}"></i> {2}', color, icon, msg);
                   },
                   listeners : {
                    render : function (_self)
                     {
                         _this.documents_indicator = this;
                         
                     }
                   },
                   xns : Roo.bootstrap,
                   '|xns' : 'Roo.bootstrap',
                   items  : [
                    {
                     xtype : 'Container',
                     cls : 'fa-5x',
                     fa : 'file-text',
                     listeners : {
                      render : function (_self)
                       {
                           _this.check_document_icon = _self;
                       }
                     },
                     xns : Roo.bootstrap,
                     '|xns' : 'Roo.bootstrap'
                    },
                    {
                     xtype : 'Element',
                     html : _this._strings['f28128b38efbc6134dc40751ee21fd29'] /* Documents */,
                     xns : Roo.bootstrap,
                     '|xns' : 'Roo.bootstrap'
                    },
                    {
                     xtype : 'Element',
                     html : _this._strings['8f2ec0b04f61587a0e83068e5ef842bd'] /* <i class="fa fa-times-circle" aria-hidden="true"></i>  not complete */,
                     listeners : {
                      render : function (_self)
                       {
                           _this.documents_message = this;
                           
                       }
                     },
                     xns : Roo.bootstrap,
                     '|xns' : 'Roo.bootstrap'
                    }
                   ]
                  },
                  {
                   xtype : 'Column',
                   sm : 3,
                   style : 'text-align:center',
                   update : function() 
                   { 
                       var textIcon = '';
                       var msg = 'Status : Search not done';
                       var textColor = '#941B0C';
                       var color = '#941B0C';
                       
                       if(_this.data.is_lexis_nexis_search_completed * 1 == 1) {
                           msg = String.format('Status : {0} Matches Found', (_this.data.total_lexis_nexis * 1 > 0) ? _this.data.total_lexis_nexis: 'No');
                           textColor = 'green';
                           color = 'green';
                       }
                       
                       if(_this.data.is_missing_document * 1 == 1) {
                           textIcon = 'fa-times-circle';
                           msg = 'Document Not Upload';
                           textColor = '#941B0C';
                           color = '#999';
                       }
                       
                       if(_this.data.is_submit * 1 == 0) {
                           textIcon = 'fa-times-circle';
                           msg = 'Application Not complete';
                           textColor = '#941B0C';
                           color = '#999';
                       }
                       
                       
                       _this.lexis_nexis_icon.el.setStyle('color', color);
                       
                       _this.lexis_nexis_message.el.dom.innerHTML = String.format(
                           '<span style="color:{0}">{1}</span>', 
                           textColor, 
                           msg
                       );
                       
                       if(textIcon.length){
                           _this.lexis_nexis_message.el.dom.innerHTML = String.format(
                               '<i style="color:{0}" class="fa {1}"></i> <span style="color:{0}">{2}</span>', 
                               textColor, 
                               textIcon, 
                               msg
                           );
                       }
                       
                       _this.lexis_nexis_btn.disable();
                                          
                       if(_this.data.is_submit * 1 == 1 && _this.data.is_missing_document * 1 == 0){
                           _this.lexis_nexis_btn.enable();
                       }
                       
                   },
                   listeners : {
                    render : function (_self)
                     {
                         _this.lexis_nexis_indicator = this;
                     }
                   },
                   xns : Roo.bootstrap,
                   '|xns' : 'Roo.bootstrap',
                   items  : [
                    {
                     xtype : 'Container',
                     cls : 'fa-5x',
                     fa : 'search',
                     listeners : {
                      render : function (_self)
                       {
                           _this.lexis_nexis_icon = this;
                       }
                     },
                     xns : Roo.bootstrap,
                     '|xns' : 'Roo.bootstrap'
                    },
                    {
                     xtype : 'Element',
                     html : _this._strings['1eb39f9b4c58313ca684e44d590b1d82'] /* Lexis Nexis */,
                     xns : Roo.bootstrap,
                     '|xns' : 'Roo.bootstrap'
                    },
                    {
                     xtype : 'Element',
                     html : _this._strings['d41d8cd98f00b204e9800998ecf8427e'] /*   */,
                     listeners : {
                      render : function (_self)
                       {
                           _this.lexis_nexis_message = this;
                       }
                     },
                     xns : Roo.bootstrap,
                     '|xns' : 'Roo.bootstrap'
                    },
                    {
                     xtype : 'Button',
                     disabled : false,
                     html : _this._strings['0e883c2b722f8a57275b249bef7c94db'] /* Lexis Nexis Search */,
                     weight : 'primary',
                     listeners : {
                      click : function (_self, e)
                       {
                           if(_this.data.userdata_id * 1 < 1){
                               return;
                           }
                           
                           new Pman.Request({
                               url: baseURL + '/Coba/LexisNexis/Search/' + _this.data.userdata_id,
                               method: 'GET',
                               mask: 'Processing...',
                               success : function(res) {
                                   var total = res.data.total;
                                   
                                   var msg = 'No Matching Records where found';
                                   
                                   if(res.data.total * 1 > 0){
                                       msg = String.format('{0} Matching Records where found - please review them on the Lexis Nexis Tab.', res.data.total);
                                   }
                                   
                                   var m = new Roo.bootstrap.Modal({ 
                                       html : msg, 
                                       title:'Lexis Nexis Search Succeed', 
                                       buttons : [
                                           {
                                               name : 'ok',
                                               html : 'OK',
                                               weight : 'primary'
                                           }
                                       ],
                                       listeners : { 
                                           btnclick : function(name, e) { 
                                               
                                               this.hide();
                                               
                                               _this.form.reloadData();
                                               
                                               if(res.data.total * 1 == 0){
                                                   return;
                                               }
                                               
                                               _this.dialog.items[0].getRegion('center').showPanel(3); 
                                               
                                           }
                                       }
                                   });
                             
                                   m.show();
                                   
                               }
                           });
                           
                       },
                      render : function (_self)
                       {
                           _this.lexis_nexis_btn = this;
                       }
                     },
                     xns : Roo.bootstrap,
                     '|xns' : 'Roo.bootstrap'
                    }
                   ]
                  },
                  {
                   xtype : 'Column',
                   sm : 3,
                   style : 'text-align:center',
                   update : function() 
                   {
                       var msg = 'Pending Approval';
                       var textColor = '#337ab7';
                       var color = '#337ab7';
                       var icon = 'fa-user';
                       
                       var isComplianceOfficer = (Pman.Login.authUser.groups.indexOf('Compliance Officers') == -1) ? false : true;
                       var isAdministrator = (Pman.Login.authUser.groups.indexOf('Administrators') == -1) ? false : true;
                       
                       _this.compliance_review_btn.el.hide();
                       _this.compliance_view_reason_btn.el.hide();
                       
                       if(isComplianceOfficer){
                           _this.compliance_review_btn.el.show();
                       }
                       
                       switch (_this.data.compliance_status) {
                           case 'APPROVED' : 
                               msg = String.format('Approved by {0}', _this.data.compliance_status_by);
                               textColor = 'green';
                               color = 'green';
                               icon = 'fa-check';
                               
                               _this.compliance_review_btn.el.hide();
                               _this.compliance_view_reason_btn.el.hide();
                               
                               break;
                           case 'REJECTED' : 
                               msg = String.format('Reject by {0}', _this.data.compliance_status_by);
                               textColor = '#941B0C';
                               color = '#941B0C';
                               icon = 'fa-times';
                               
                               _this.compliance_review_btn.el.hide();
                               
                               if(isComplianceOfficer || isAdministrator){
                                   _this.compliance_view_reason_btn.el.show();
                               }
                       
                               break;
                           default :
                               break;
                       }
                       
                       if(_this.data.is_lexis_nexis_view_completed * 1 == 0){
                           msg = 'Nexis Lexis needs reviewing';
                           color = '#999';
                           textColor = '#941B0C';
                           _this.compliance_review_btn.el.hide();
                           _this.compliance_view_reason_btn.el.hide();
                       }
                       
                       if(_this.data.is_lexis_nexis_search_completed * 1 == 0) {
                           msg = 'Nexis Lexis not run';
                           color = '#999';
                           textColor = '#941B0C';
                           _this.compliance_review_btn.el.hide();
                           _this.compliance_view_reason_btn.el.hide();
                       }
                       
                       _this.compliance_icon.el.setStyle('color', color);
                       
                       _this.compliance_icon.el.select('i', true).first().removeClass(['fa-user', 'fa-check']).addClass(icon);
                       
                       _this.compliance_message.el.dom.innerHTML = String.format('<span style="color:{0}">{1}</span>', textColor, msg);
                       
                   },
                   listeners : {
                    render : function (_self)
                     {
                         _this.compliance_indicator = this;
                     }
                   },
                   xns : Roo.bootstrap,
                   '|xns' : 'Roo.bootstrap',
                   items  : [
                    {
                     xtype : 'Container',
                     cls : 'fa-5x',
                     fa : 'user',
                     listeners : {
                      render : function (_self)
                       {
                           _this.compliance_icon = this;
                       }
                     },
                     xns : Roo.bootstrap,
                     '|xns' : 'Roo.bootstrap'
                    },
                    {
                     xtype : 'Element',
                     html : _this._strings['e1d496d505f34ae1866fc7ad0e59e7ac'] /* Compliance Review */,
                     xns : Roo.bootstrap,
                     '|xns' : 'Roo.bootstrap'
                    },
                    {
                     xtype : 'Element',
                     html : _this._strings['d41d8cd98f00b204e9800998ecf8427e'] /*  */,
                     listeners : {
                      render : function (_self)
                       {
                           _this.compliance_message = this;
                           
                       }
                     },
                     xns : Roo.bootstrap,
                     '|xns' : 'Roo.bootstrap'
                    },
                    {
                     xtype : 'Element',
                     xns : Roo.bootstrap,
                     '|xns' : 'Roo.bootstrap',
                     items  : [
                      {
                       xtype : 'Row',
                       xns : Roo.bootstrap,
                       '|xns' : 'Roo.bootstrap',
                       items  : [
                        {
                         xtype : 'Column',
                         xs : 12,
                         xns : Roo.bootstrap,
                         '|xns' : 'Roo.bootstrap',
                         items  : [
                          {
                           xtype : 'Button',
                           html : _this._strings['457dd55184faedb7885afd4009d70163'] /* Review */,
                           style : 'width: 150px; text-align: center;',
                           weight : 'primary',
                           listeners : {
                            click : function (_self, e)
                             {
                                 if(_this.data.id * 1 < 1) {
                                     return;
                                 }
                                 
                                 Pman.Dialog.CobaInvestorComplianceReview.show({
                                     id : _this.data.id,
                                     userdata_id : _this.data.userdata_id
                                 }, function(){
                                     _this.form.reloadData();
                                 });
                                 
                             },
                            render : function (_self)
                             {
                                 _this.compliance_review_btn = this;
                                 
                                 this.el.setVisibilityMode(Roo.Element.DISPLAY);
                                 
                                 this.el.hide();
                             }
                           },
                           xns : Roo.bootstrap,
                           '|xns' : 'Roo.bootstrap'
                          },
                          {
                           xtype : 'Button',
                           html : _this._strings['269d037052d86346356a8077aee32baf'] /* View Reason */,
                           style : 'width: 150px; text-align: center;',
                           weight : 'danger',
                           listeners : {
                            click : function (_self, e)
                             {
                                 if(!_this.data.compliance_coba_investor_notes || _this.data.compliance_coba_investor_notes.id * 1 < 1) {
                                     return;
                                 }
                                 
                                 Roo.bootstrap.MessageBox.alert('Reason', _this.data.compliance_coba_investor_notes.notes);
                                 
                             },
                            render : function (_self)
                             {
                                 _this.compliance_view_reason_btn = this;
                                 
                                 this.el.setVisibilityMode(Roo.Element.DISPLAY);
                                 
                                 this.el.hide();
                             }
                           },
                           xns : Roo.bootstrap,
                           '|xns' : 'Roo.bootstrap'
                          }
                         ]
                        }
                       ]
                      }
                     ]
                    }
                   ]
                  }
                 ]
                }
               ]
              },
              {
               xtype : 'Input',
               inputType : 'hidden',
               name : 'id',
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap'
              }
             ]
            }
           ]
          },
          {
           xtype : 'Grid',
           autoScroll : true,
           fitContainer : true,
           fitToFrame : true,
           region : 'center',
           xns : Roo.bootstrap.panel,
           '|xns' : 'Roo.bootstrap.panel',
           grid : {
            xtype : 'Table',
            footerShow : false,
            listeners : {
             render : function (_self)
              {
                  _this.reportGrid = this;
              }
            },
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap',
            store : {
             xtype : 'SimpleStore',
             data : [[ "Client Summary Report", "ClientSummary" ],
               [ "Compliance Report", "ComplianceReport" ],
               [ "Investor Risk Profile", "InvestorRiskProfile" ]
              ],
             fields : [ 'name', 'url' ],
             isLocal : true,
             xns : Roo.data,
             '|xns' : 'Roo.data'
            },
            cm : [
             {
              xtype : 'ColumnModel',
              dataIndex : 'name',
              header : _this._strings['4b1b4dc8cf38b3c64b1d657da8f5ac8c'] /* Report */,
              renderer : function(v,x,r) {    
                   return v;
              },
              xs : 6,
              xns : Roo.grid,
              '|xns' : 'Roo.grid'
             },
             {
              xtype : 'ColumnModel',
              dataIndex : 'url',
              header : _this._strings['801ab24683a4a8c433c6eb40c48bcd9d'] /* Download */,
              renderer : function(v,x,r) {
                   return String.format( '<a href="{0}/Coba/Reports/'+ r.data.url.trim() +'/{1}" target="_new">Download</a>', 
                          baseURL, _this.data.userdata_id
                   );
              },
              xs : 6,
              xns : Roo.grid,
              '|xns' : 'Roo.grid'
             }
            ]
           }
          }
         ]
        }
       },
       {
        xtype : 'Content',
        autoScroll : false,
        background : true,
        fitContainer : true,
        fitToFrame : true,
        region : 'center',
        title : _this._strings['31e41095bfaa14799239e8d9ba7ad438'] /* Application Details */,
        listeners : {
         activate : function (_self)
          {
              var url = 'about:blank';
              
              if(_this.data.userdata_id * 1 > 0){
                  url = baseURL + '/Coba/Reports/ApplicationSummary/' + _this.data.userdata_id;
              }
               
              _this.app_summary_frame.el.dom.src = url;
          },
         render : function (_self)
          {
              _this.detail_tab = _self;
          }
        },
        xns : Roo.bootstrap.panel,
        '|xns' : 'Roo.bootstrap.panel',
        items  : [
         {
          xtype : 'Element',
          style : 'width:100%;height:100%;border:none;',
          tag : 'iframe',
          listeners : {
           render : function (_self)
            {
                _this.app_summary_frame = this; 
            }
          },
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap'
         }
        ]
       },
       {
        xtype : 'Grid',
        background : false,
        region : 'center',
        title : _this._strings['292659c2de7f3de1a9ab2abfef6839a4'] /* Uploaded Documents */,
        listeners : {
         activate : function (_self)
          {
              if(_this.documentGrid){
                  _this.documentGrid.store.load({});
              }
          }
        },
        xns : Roo.bootstrap.panel,
        '|xns' : 'Roo.bootstrap.panel',
        grid : {
         xtype : 'Table',
         cls : 'coba-document-table',
         condensed : true,
         footerShow : false,
         listeners : {
          render : function (_self)
           {
               _this.documentGrid = this;
           }
         },
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         store : {
          xtype : 'Store',
          remoteSort : true,
          sortInfo : { direction : 'ASC', field: 'seq_order' },
          listeners : {
           beforeload : function (_self, options)
            { 
                options.params = options.params || {};
                
                if(typeof(_this.data.userdata_id) == 'undefined' || _this.data.userdata_id * 1 < 1){
                    this.removeAll();
                    return false;
                }
                
                options.params.is_active = 1;
                options.params.dec_type = 'checklist';
                
                options.params._user_id = _this.data.userdata_id;
                
                options.params._with_others = 1;
            }
          },
          xns : Roo.data,
          '|xns' : 'Roo.data',
          proxy : {
           xtype : 'HttpProxy',
           method : 'GET',
           url : baseURL + '/Roo/coba_declarations',
           xns : Roo.data,
           '|xns' : 'Roo.data'
          },
          reader : {
           xtype : 'JsonReader',
           id : 'id',
           root : 'data',
           xns : Roo.data,
           '|xns' : 'Roo.data'
          }
         },
         cm : [
          {
           xtype : 'ColumnModel',
           dataIndex : 'title',
           header : _this._strings['0945359809dad1fbf3dea1c95a0da951'] /* Document */,
           sortable : true,
           xs : 4,
           xns : Roo.grid,
           '|xns' : 'Roo.grid'
          },
          {
           xtype : 'ColumnModel',
           dataIndex : 'images_ids',
           header : _this._strings['405e3e5c89b4b29dcb052614626788bb'] /* View / Status */,
           renderer : function(v,x,r) {
           
               var types = [
                   'image/png',
                   'image/jpeg',
                   'application/pdf',
                   'application/msword',
                   'application/mswordapplication',
                   'application/vnd.oasis.opendocument.text',
                   'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                   'application/x-abiword'
               ];
                 
               var manager = new Roo.bootstrap.DocumentManager({
                   url : baseURL + '/Roo/Images',
                   editable: false,
                   toolTipName: 'title',
                   listeners : {
                       render : function (_self) {
                           
                       },
                       beforeselectfile : function(_self){
                           
                           if(typeof(window.FileReader) == 'undefined' || !window.FileReader) {
                               Roo.bootstrap.MessageBox.alert('Sorry', 'Your browser is not support to upload file, Please upgrade it.');
                               return false;
                           }
                           
                           return true;
                       },
                       initial : function (_self) {
                           
                           this.files = r.data.coba_investor_declarations_documents;
                           this.queue();
                       },
                       process : function (_self, file) {
                           
                           if(types.indexOf(file.type) == -1){
                               this.progressDialog.hide();
                               Roo.bootstrap.MessageBox.alert('Sorry', 'Invalid File Format');
                               return false;
                           }
                           
                           if(file.size > 8388608){
                               this.progressDialog.hide();
                               Roo.bootstrap.MessageBox.alert('Sorry', 'Maximum size is 8MB');
                               return false;
                           }
                       },
                       prepare : function (_self, formData, options) {
                           
                           if(r.data.id * 1 == -1){
                               
                               options.manually = true;
                               
                               Pman.Dialog.CobaInvestorDocumentTitle.show({name : options.file.name}, function(res){
                                   formData.append('_coba_document', 'upload');
                                   formData.append('title', res.title);
                                   formData.append('ontable', 'modx_users');
                                   formData.append('onid', r.data.coba_investor_declarations_id);
                                   formData.append('imgtype', 'other_documents');
                                   
                                   _self.xhr.send(formData);
                                   
                                   return;
                               });
                               
                               return;
                           }
                           
                           formData.append('_coba_document', 'upload');
                           formData.append('ontable', 'coba_investor_declarations');
                           formData.append('onid', r.data.coba_investor_declarations_id);
                       },
                       remove : function (_self, file) {
                           
                           if(typeof(file) == 'undefined' || file.id * 1 < 1){
                               return;
                           }
                           
                           var m = new Roo.bootstrap.Modal({ 
                               html : 'Are you sure want to remove this document', 
                               title:'Confirm',
                               buttons : [
                                   {
                                       name : 'yes',
                                       html : 'Yes'
                                   },
                                   {
                                       name : 'no',
                                       html : 'No',
                                       weight : 'primary'
                                   }
                               ],
                               listeners : { 
                                  btnclick : function(name, e) {
                                  
                                       this.hide();
                                       
                                       if(name == 'no'){
                                           return;
                                       }
                                       
                                       file.target.mask();
                                  
                                       new Pman.Request({
                                           url: baseURL + '/Roo/Images',
                                           method: 'POST',
                                           params: {
                                               _coba_document : 'remove',
                                               _delete : file.id
                                           },
                                           success: function(res){
                                               _self.remove(file);
                                               _this.form.reloadData();
                                               return;
                                           },
                                           failure : function(ret) {
                                               (function(){Roo.bootstrap.MessageBox.alert('Error', ret.errorMsg);}).defer(100);
                                               return;
                                           }
                                       });
                                       
                                       return;
                                  }
                              }
                           });
                           
                           m.show();
                        
                       },
                       afterupload : function(_self, xhr)
                       {
                           _this.form.reloadData();
                       },
                       click : function (_self, file) 
                       {
                           Pman.Dialog.CobaInvestorViewDocument.show({
                               file : file
                           }, function(ret){
                           
                               if(typeof(ret) != 'string'){
                                   return;
                               }
                               
                               if(ret == 'trash'){
                                   _self.fireEvent('remove', _self, file);
                                   return;
                               }
                               
                           });
                           
                           return;
                       }
                  }
                  
               });
               
               return manager;
               
            },
           sortable : false,
           xs : 8,
           xns : Roo.grid,
           '|xns' : 'Roo.grid'
          }
         ]
        }
       },
       {
        xtype : 'Content',
        background : true,
        fitContainer : true,
        fitToFrame : true,
        region : 'center',
        title : _this._strings['1eb39f9b4c58313ca684e44d590b1d82'] /* Lexis Nexis */,
        tpl : '<a href=\"#\"><span unselectable=\"on\" title=\"{text}\">{text}</span> <span class=\"badge\">{badge}</span><span class=\"icon\"><i class=\"fa fa-cog\"></i></span></a>',
        update : function() 
        { 
            var badges = this.tabItem.el.select('span.badge', true).first();
            
            var icon = this.tabItem.el.select('span.icon', true).first();
            
            if(!badges || !icon){
                return;
            }
            
            badges.setVisibilityMode(Roo.Element.DISPLAY).hide();
            icon.setVisibilityMode(Roo.Element.DISPLAY).hide();
            
            if(_this.data.is_lexis_nexis_search_completed * 1 != 1){
                icon.show();
                return;
            }
            
            badges.removeClass(['badge-success', 'badge-error']).addClass('badge-error');
            
            if(_this.data.is_lexis_nexis_view_completed * 1 == 1){
                badges.removeClass(['badge-success', 'badge-error']).addClass('badge-success');
            }
            
            badges.show();
            
            badges.dom.innerHTML = _this.data.total_lexis_nexis;
            
        },
        listeners : {
         activate : function (_self)
          {
              var url = 'about:blank';
              
              if(_this.data.userdata_id * 1 > 0){
                  url = baseURL + '/Coba/Reports/LexisNexis/' + _this.data.userdata_id;
              }
              
              var updateMatchStatus = function(frame, id, status) {
                  new Pman.Request({
                      url: baseURL + '/Roo/Coba_investor_lexis_results.php',
                      method : 'POST',
                      params : {
                          id : id,
                          status : status,
                          reason : ''
                      }, 
                      success : function(res) {
                          _this.form.reloadData();
                          _this.lexis_nexis_frame.el.dom.src = url;
                          scrollTop = frame.documentElement.scrollTop || frame.body.scrollTop;
                      }
                  });
              };
              
              var scrollTop = 0;
              
              _this.lexis_nexis_frame.el.dom.onload = function(){
                  
                  var frame = _this.lexis_nexis_frame.el.dom.contentDocument || _this.lexis_nexis_frame.el.dom.contentWindow.document;
                  
                  var scrollTarget = (typeof(frame.documentElement.scrollTop) != 'undefined') ? frame.documentElement : frame.body;
                  
                  frame.documentElement.scrollTop = scrollTop;
                  frame.body.scrollTop = scrollTop;
                  
                  Roo.each(Roo.get(frame.body).select('button.reject-match', true).elements, function(button){
                  
                      var id = button.attr('data-id');
                      
                      button.on('click', function(e){
                      
                          e.preventDefault();
                          
                          Pman.Dialog.CobaLexisNexisReject.show({ id : id }, function(){
                              _this.form.reloadData();
                              _this.lexis_nexis_frame.el.dom.src = url;
                              scrollTop = Roo.get(frame.body).getScroll().top;
                          });
                          
                      });
                      
                  });
                  
                  Roo.each(Roo.get(frame.body).select('button.accept-match', true).elements, function(button){
                  
                      var id = button.attr('data-id');
                      
                      button.on('click', function(e){
                      
                          e.preventDefault();
                          
                          updateMatchStatus(frame, id, 1);
                          
                      });
                  });
                  
                  Roo.each(Roo.get(frame.body).select('button.un-accept-match', true).elements, function(button){
                  
                      var id = button.attr('data-id');
                      
                      button.on('click', function(e){
                      
                          e.preventDefault();
                          
                          updateMatchStatus(frame, id, 0);
                          
                      });
                  });
                  
                  Roo.each(Roo.get(frame.body).select('button.un-reject-match', true).elements, function(button){
                  
                      var id = button.attr('data-id');
                      
                      button.on('click', function(e){
                      
                          e.preventDefault();
                          
                          updateMatchStatus(frame, id, 0);
                          
                      });
                  });
                  
              };
              
              _this.lexis_nexis_frame.el.dom.src = url;
              
              _this.lexis_nexis_search.update();
          },
         render : function (_self)
          {
              _this.lexis_nexis_panel = this;
          }
        },
        xns : Roo.bootstrap.panel,
        '|xns' : 'Roo.bootstrap.panel',
        toolbar : {
         xtype : 'NavSimplebar',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'NavGroup',
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           items  : [
            {
             xtype : 'NavItem',
             style : 'float: left',
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'Button',
               html : _this._strings['13348442cc6a27032d2b4aa28b75a5d3'] /* Search */,
               style : 'margin:5px;',
               update : function() 
               { 
                   _this.lexis_nexis_search.disable();
                   
                   if(_this.data.is_submit * 1 == 1 && _this.data.is_missing_document * 1 == 0){
                       _this.lexis_nexis_search.enable();
                   }
                   
               },
               weight : 'primary',
               listeners : {
                click : function (_self, e)
                 {
                     if(_this.data.userdata_id * 1 < 1){
                         return;
                     }
                     
                     new Pman.Request({
                         url: baseURL + '/Coba/LexisNexis/Search/' + _this.data.userdata_id,
                         method: 'GET',
                         mask: 'Processing...',
                         success : function(res) {
                             var total = res.data.total;
                             
                             var msg = 'No Matching Records where found';
                             
                             if(res.data.total * 1 > 0){
                                 msg = String.format('{0} Matching Records where found - please review them on the Lexis Nexis Tab.', res.data.total);
                             }
                             
                             Roo.bootstrap.MessageBox.alert('Lexis Nexis Search Succeed', msg);
                             
                             _this.form.reloadData();
                             
                             var url = 'about:blank';
                     
                             if(_this.data.userdata_id * 1 > 0){
                                 url = baseURL + '/Coba/Reports/LexisNexis/' + _this.data.userdata_id;
                             }
                             
                             _this.lexis_nexis_frame.el.dom.src = url;
                         }
                     });
                     
                 },
                render : function (_self)
                 {
                     _this.lexis_nexis_search = this;
                 }
               },
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap'
              }
             ]
            }
           ]
          }
         ]
        },
        items  : [
         {
          xtype : 'Element',
          style : 'width:100%;height:100%;border:none;',
          tag : 'iframe',
          listeners : {
           render : function (_self)
            {
                _this.lexis_nexis_frame = this;
                
            }
          },
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap'
         }
        ]
       },
       {
        xtype : 'Grid',
        background : false,
        region : 'center',
        title : _this._strings['2b16564e6e838ce86608620b70beb570'] /* Activity Log */,
        listeners : {
         activate : function (_self)
          {
              if(_this.activityGrid ) {
                  _this.activityGrid.footer.onClick('first');
              }
          }
        },
        xns : Roo.bootstrap.panel,
        '|xns' : 'Roo.bootstrap.panel',
        grid : {
         xtype : 'Table',
         cls : 'coba-activity-table',
         condensed : false,
         loadMask : true,
         listeners : {
          render : function (_self)
           {
               _this.activityGrid = _self;;
           }
         },
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         footer : {
          xtype : 'PagingToolbar',
          pageSize : 10,
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap'
         },
         store : {
          xtype : 'Store',
          remoteSort : true,
          sortInfo : { direction : 'DESC', field: 'event_when' },
          listeners : {
           beforeload : function (_self, options)
            { 
                options.params = options.params || {};
                
                if(typeof(_this.data.userdata_id) == 'undefined' || _this.data.userdata_id * 1 < 1){
                    this.removeAll();
                    return false;
                }
                options.params._with_dupe_count = 1;
            
            
                options.params.modx_users_id = _this.data.userdata_id; 
            
            
                
            }
          },
          xns : Roo.data,
          '|xns' : 'Roo.data',
          proxy : {
           xtype : 'HttpProxy',
           method : 'GET',
           url : baseURL + '/Roo/Events.php',
           xns : Roo.data,
           '|xns' : 'Roo.data'
          },
          reader : {
           xtype : 'JsonReader',
           id : 'id',
           root : 'data',
           xns : Roo.data,
           '|xns' : 'Roo.data'
          }
         },
         cm : [
          {
           xtype : 'ColumnModel',
           dataIndex : 'event_when',
           header : _this._strings['4e97aeeaa8b15ca1180fcd1f3ac478d1'] /* When */,
           renderer : function(v) 
           { 
               return v ? v.dateFormat('d/M/Y H:i') : ''; 
           },
           sortable : true,
           xs : 3,
           xns : Roo.grid,
           '|xns' : 'Roo.grid'
          },
          {
           xtype : 'ColumnModel',
           dataIndex : 'action',
           header : _this._strings['418c5509e2171d55b0aee5c2ea4442b5'] /* action */,
           renderer : function(v) 
           { 
               return String.format('{0}', v ? v : '');
           },
           sortable : true,
           xs : 3,
           xns : Roo.grid,
           '|xns' : 'Roo.grid'
          },
          {
           xtype : 'ColumnModel',
           header : _this._strings['4ee972120bcda675f75222c87cb9d356'] /* Who */,
           renderer : function(v,x,r) {
                if(r.data.person_id* 1 > 0) {
                    return String.format('{0}', r.data.person_id_name );
                }
                if(r.data.modx_users_id_in_middlename !='')
                {
                    return String.format('{0} {1} {2}', r.data.modx_users_id_in_firstname, r.data.modx_users_id_in_middlename, r.data.modx_users_id_in_lastname );
                }
                return String.format('{0} {1}', r.data.modx_users_id_in_firstname, r.data.modx_users_id_in_lastname  );
           
           },
           sortable : true,
           xs : 3,
           xns : Roo.grid,
           '|xns' : 'Roo.grid'
          },
          {
           xtype : 'ColumnModel',
           dataIndex : 'remarks',
           header : _this._strings['231bc72756b5e6de492aaaa1577f61b1'] /* Remarks */,
           renderer : function(v,x,r) {
                if(r.data.dupe_count*1 > 1) {
                    return String.format('{0} ({1})', v ? v : '', r.data.dupe_count);
                }
                return String.format('{0}', v ? v : ''); 
           },
           sortable : false,
           xs : 3,
           xns : Roo.grid,
           '|xns' : 'Roo.grid'
          }
         ]
        }
       },
       {
        xtype : 'Nest',
        autoScroll : true,
        background : true,
        fitContainer : true,
        fitToFrame : true,
        region : 'center',
        title : _this._strings['3e4696aa5313272da1baa6497c82a9b5'] /* Notes about User */,
        listeners : {
         activate : function (_self)
          {
              if(_this.notes_table ) {
                  _this.notes_table.footer.onClick('first');
              }
              
              _this.coba_person_id.setValue(_this.data.userdata_id);
              
          },
         render : function (_self)
          {
              _this.notes_tab = _self;
          }
        },
        xns : Roo.bootstrap.panel,
        '|xns' : 'Roo.bootstrap.panel',
        layout : {
         xtype : 'Border',
         xns : Roo.bootstrap.layout,
         '|xns' : 'Roo.bootstrap.layout',
         center : {
          xtype : 'Region',
          hideTabs : true,
          xns : Roo.bootstrap.layout,
          '|xns' : 'Roo.bootstrap.layout'
         },
         north : {
          xtype : 'Region',
          height : 280,
          hideTabs : true,
          split : true,
          xns : Roo.bootstrap.layout,
          '|xns' : 'Roo.bootstrap.layout'
         },
         items  : [
          {
           xtype : 'Content',
           autoScroll : true,
           fitContainer : true,
           fitToFrame : true,
           region : 'north',
           title : _this._strings['09677be3a36334e7fcad710832364b77'] /* Add a Note */,
           xns : Roo.bootstrap.panel,
           '|xns' : 'Roo.bootstrap.panel',
           items  : [
            {
             xtype : 'Form',
             loadMask : true,
             method : 'POST',
             style : 'margin:15px;',
             url : baseURL + '/Roo/Coba_person_notes',
             listeners : {
              actioncomplete : function (_self, action)
               {
                  if (action.type == 'submit') { // only submitted here if we are 
                       _this.add_notes_button.enable();
                       _this.add_notes_button.setText('Add Note');
               
                  
                       if (_this.callback) {
                           _this.callback.call(this, action.result.data);
                       }
                      _this.notes_textarea.setValue('');
                      if(_this.notes_table ) {
                         _this.notes_table.footer.onClick('first');
                      }
                       return; 
                   }
               },
              actionfailed : function (_self, action)
               {
                    Roo.bootstrap.MessageBox.alert(action.result.errorMsg);
               },
              render : function (_self)
               {
                   _this.notes_form = _self; 
               }
             },
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'Container',
               expandable : false,
               header : _this._strings['09677be3a36334e7fcad710832364b77'] /* Add a Note */,
               panel : 'primary',
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap',
               items  : [
                {
                 xtype : 'Row',
                 xns : Roo.bootstrap,
                 '|xns' : 'Roo.bootstrap',
                 items  : [
                  {
                   xtype : 'Column',
                   sm : 12,
                   xns : Roo.bootstrap,
                   '|xns' : 'Roo.bootstrap',
                   items  : [
                    {
                     xtype : 'TextArea',
                     allowBlank : false,
                     name : 'notes',
                     rows : 5,
                     listeners : {
                      render : function (_self)
                       {
                           _this.notes_textarea = _self;
                       }
                     },
                     xns : Roo.bootstrap,
                     '|xns' : 'Roo.bootstrap'
                    },
                    {
                     xtype : 'Input',
                     inputType : 'input',
                     name : 'coba_person_id',
                     style : 'display: none;',
                     listeners : {
                      render : function (_self)
                       {
                           _this.coba_person_id = this;
                       }
                     },
                     xns : Roo.bootstrap,
                     '|xns' : 'Roo.bootstrap'
                    },
                    {
                     xtype : 'Button',
                     html : _this._strings['f018a137eb54d99d29a9b41fb6b061b5'] /* Add Note */,
                     style : 'float: right; margin: 10px; width: 100px; ',
                     weight : 'primary',
                     listeners : {
                      click : function (_self, e)
                       {
                           if(!_this.notes_form.isValid()){
                                 Roo.bootstrap.MessageBox.alert('Error', 'Please enter note');
                                 return;
                           }
                           
                           _this.notes_form.doAction('submit');
                           _this.add_notes_button.disable();
                           _this.add_notes_button.setText('sending...');
                       
                       },
                      render : function (_self)
                       {
                           _this.add_notes_button = _self;
                       }
                     },
                     xns : Roo.bootstrap,
                     '|xns' : 'Roo.bootstrap'
                    }
                   ]
                  }
                 ]
                }
               ]
              }
             ]
            }
           ]
          },
          {
           xtype : 'Grid',
           fitContainer : true,
           fitToFrame : true,
           region : 'center',
           title : _this._strings['93b6fe26d96a3a9812a34cb6ba9b3567'] /* Historical Notes */,
           xns : Roo.bootstrap.panel,
           '|xns' : 'Roo.bootstrap.panel',
           grid : {
            xtype : 'Table',
            cellSelection : true,
            loadMask : true,
            responsive : true,
            listeners : {
             render : function (_self)
              {
                  _this.notes_table = _self;
              }
            },
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap',
            footer : {
             xtype : 'PagingToolbar',
             pageSize : 5,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap'
            },
            store : {
             xtype : 'Store',
             remoteSort : true,
             sortInfo : '{ direction : \'ASC\', field: \'id\' } ',
             listeners : {
              beforeload : function (_self, options)
               {
                   options.params = options.params || {};
                   // set more here
                   options.params.coba_person_id =  _this.data.userdata_id; 
                   options.params.limit =   _this.notes_table.footer.pageSize *1; 
                   options.params._order_by =   'date_created desc, id desc'; 
               }
             },
             xns : Roo.data,
             '|xns' : 'Roo.data',
             proxy : {
              xtype : 'HttpProxy',
              method : 'GET',
              url : baseURL + '/Roo/Coba_person_notes',
              xns : Roo.data,
              '|xns' : 'Roo.data'
             },
             reader : {
              xtype : 'JsonReader',
              id : 'id',
              root : 'data',
              xns : Roo.data,
              '|xns' : 'Roo.data'
             }
            },
            cm : [
             {
              xtype : 'ColumnModel',
              dataIndex : 'date_created',
              header : _this._strings['44749712dbec183e983dcd78a7736c41'] /* Date */,
              hidden : false,
              renderer : function(v) { return v ? v.dateFormat('d/m/Y') : ''; },
              sortable : false,
              xs : 3,
              xns : Roo.grid,
              '|xns' : 'Roo.grid'
             },
             {
              xtype : 'ColumnModel',
              dataIndex : 'id',
              header : _this._strings['b80bb7740288fda1f201890375a60c8f'] /* id */,
              hidden : true,
              sortable : true,
              xs : 2,
              xns : Roo.grid,
              '|xns' : 'Roo.grid'
             },
             {
              xtype : 'ColumnModel',
              dataIndex : 'notes',
              header : _this._strings['f4c6f851b00d5518bf888815de279aba'] /* Notes */,
              hidden : false,
              renderer : function(v) { 
              
                  //if(v.length > 200) {
                  //    return v.substring(0,199) + '...';
                  //}
                   
                  return v;
              },
              sortable : false,
              xs : 9,
              xns : Roo.grid,
              '|xns' : 'Roo.grid'
             }
            ]
           }
          }
         ]
        }
       }
      ]
     }
    ]
   }  );
 }
});
Roo.apply(Pman.Dialog.CobaInvestorModify, Pman.Dialog.CobaInvestorModify.prototype);
