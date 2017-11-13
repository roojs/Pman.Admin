//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Tab');

Pman.Tab.CobaInvestors = new Roo.XComponent({

 _strings : {
  'ce8ae9da5b7cd6c3df2929543a9af92d' :"Email",
  'c55bb3f1897a02f7c3be32fc933b0e0c' :"Create Investor",
  '801d0ba359252756108ad71d7032a67e' :"Investors",
  'ec53a8c4f07baed5d8825072c89799be' :"Status",
  'b718adec73e04ce3ec720dd11a06a308' :"ID",
  '52c649c38236206862e79e77f735902d' :"Investment Advisor",
  'bcc254b55c4a1babdf1dcb82c207506b' :"Phone",
  '58c98266099a5f6f52e211870dd620d6' :"Delete Investor",
  '679b01485de24a379e37b7023bd36116' :"Search for investor",
  'e7b47c58815acf1d3afa59a84b5db7fb' :"Company Name",
  '913ddd7613d305b4879b376adf3f798c' :"Import Investor",
  '49ee3087348e8d44e1feda1917443987' :"Name",
  'a1fa27779242b4902f7ae3bdd5c6d508' :"Type"
 },

  part     :  ["Coba", "Investors" ],
  order    : '001-Pman.Tab.CobaInvestors',
  region   : 'center',
  parent   : 'Pman.Tab.Coba',
  name     : "unnamed module",
  disabled : false, 
  permname : '', 
  _tree : function(_data)
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'Grid',
   autoScroll : true,
   closable : false,
   fitToFrame : true,
   region : 'center',
   title : _this._strings['801d0ba359252756108ad71d7032a67e'] /* Investors */,
   listeners : {
    activate : function (_self)
     {
         if(_this.table) {
             _this.table.footer.onClick('first');
         }
         
         if(_this.delete_btn) {
             if(Pman.Login.authUser.groups.indexOf("Administrators") >=0) {
                 _this.delete_btn.show();
             } else {
                 _this.delete_btn.hide();
             }
         }
         
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
          html : _this._strings['c55bb3f1897a02f7c3be32fc933b0e0c'] /* Create Investor */,
          style : 'margin:10px;',
          weight : 'primary',
          listeners : {
           click : function ()
            {
                if(Pman.Dialog.CobaInvestorCreate) {
                    Pman.Dialog.CobaInvestorCreate.show({}, function() {
                        if(_this.table){
                            _this.table.footer.onClick('first');
                        }
                    });
                } 
            }
          },
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap'
         },
         {
          xtype : 'Button',
          html : _this._strings['913ddd7613d305b4879b376adf3f798c'] /* Import Investor */,
          style : 'margin:10px;',
          weight : 'primary',
          listeners : {
           click : function (_self, e)
            {
            
                if(Pman.Dialog.CobaInvestorImport) {
                    Pman.Dialog.CobaInvestorImport.show({}, function() {
                        if(_this.table){
                            _this.table.footer.onClick('last');
                        }
                    });
                } 
            }
          },
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap'
         },
         {
          xtype : 'Button',
          html : _this._strings['58c98266099a5f6f52e211870dd620d6'] /* Delete Investor */,
          style : 'margin:10px;',
          weight : 'primary',
          listeners : {
           click : function (_self, e)
            {
            
                var s = _this.table.selModel.getSelections();
                if (!s.length || (s.length > 1))  {
                    Roo.bootstrap.MessageBox.alert("Error", s.length ? "Select only one Row" : "Select a Row");
                    return;
                }
                
                var sel = _this.table.getSelectionModel().getSelected();
                
                if(!sel){
                    Roo.bootstrap.MessageBox.alert('Error', 'Please select a Investor');
                    return;
                }
                
                if(sel.data.userdata_id * 1 < 1){
                    Roo.bootstrap.MessageBox.alert('Error', 'The selected Investor is not editable');
                    return;
                }
                
                var deleteIt = function()
                {    
                    new Pman.Request({
                        url: baseURL + '/Roo/Ext_data',
                        method: 'POST',
                        params: {
                            id : sel.data.id ,
                            _is_delete:1
                        },
                        success: function(res){
                            _this.table.footer.onClick('first');    
                            return;
                        }
                    });
                }
                
                Roo.bootstrap.MessageBox.confirm('Confirm', 'Are you sure to delete the Investor?',function(ret) {
                    //console.log(sel.data);
                    if(ret == 'no'){
                        return;
                    }
                     
                    deleteIt();
                    
                 }, this);
            },
           render : function (_self)
            {
                _this.delete_btn=_self;
            }
          },
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap'
         }
        ]
       },
       {
        xtype : 'NavItem',
        style : 'float: right; width: 250px',
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap',
        items  : [
         {
          xtype : 'Element',
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap',
          items  : [
           {
            xtype : 'Form',
            listeners : {
             render : function (_self)
              {
                  _this.form = _self;
              }
            },
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap',
            items  : [
             {
              xtype : 'Input',
              after : '<i class=\"fa fa-search\" arian-hidden=\"true\"></i>',
              inputType : 'input',
              name : 'search_filter',
              placeholder : _this._strings['679b01485de24a379e37b7023bd36116'] /* Search for investor */,
              style : 'margin:10px;',
              listeners : {
               keyup : function (_self, e)
                {
                    if(_self.keyCode == _self.ENTER) {
                        /*
                        options = {}
                        options.params = {};
                        options.params._with_status= 1;
                
                        var filter = _this.search_filter.getValue();  
                        if(filter !='') {
                            options.params._search_filter = filter;
                        }
                        */
                        
                        if (_this.table) {
                            //_this.table.store.load(options);
                            _this.table.footer.onClick('first'); 
                        }
                    
                    }
                },
               render : function (_self)
                {
                
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
   grid : {
    xtype : 'Table',
    cls : 'table-fixed',
    footerShow : true,
    hover : true,
    loadMask : true,
    responsive : true,
    rowSelection : true,
    striped : false,
    listeners : {
     render : function (_self)
      {
          _this.table = this;
      },
     rowdblclick : function (_self, el, rowIndex, e)
      {
          if (!Pman.Dialog.CobaInvestorModify) {
              return;
          }
          
          var row = _this.table.store.getAt(rowIndex);
          
          Pman.Dialog.CobaInvestorModify.show( {id : row.data.id}, function() {
              _this.table.footer.onClick('refresh');
          });
          
      
      }
    },
    xns : Roo.bootstrap,
    '|xns' : 'Roo.bootstrap',
    footer : {
     xtype : 'PagingToolbar',
     pageSize : 15,
     xns : Roo.bootstrap,
     '|xns' : 'Roo.bootstrap'
    },
    store : {
     xtype : 'Store',
     remoteSort : true,
     sortInfo : {field: 'full_name', direction: 'ASC'},
     listeners : {
      beforeload : function (_self, o)
       {
           o.params = o.params || {};
           o.params._with_status= 1;
           o.params.deleted_by = 0;
          // o.params.limit =   _this.table.footer.pageSize *1; 
           
           var filter = _this.form.findField('search_filter').getValue();  
           if(filter !='') {
               o.params._search_filter = filter;
           }
       
       }
     },
     xns : Roo.data,
     '|xns' : 'Roo.data',
     proxy : {
      xtype : 'HttpProxy',
      method : 'GET',
      url : baseURL + '/Roo/Ext_data',
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
              'name': 'userdata_id',
              'type': 'int'
          },
          {
              'name': 'full_name',
              'type': 'string'
          },
          {
              'name': 'company_name',
              'type': 'string'
          },
          {
              'name': 'account_type',
              'type': 'string'
          },
          {
              'name': 'in_email',
              'type': 'string'
          },
          {
              'name': 'in_contact_number',
              'type': 'string'
          },
          {
              'name': 'investment_advisor_id_name',
              'type': 'string'
          },
          {
              'name': 'fund_name',
              'type': 'string'
          },
          {
              'name': 'is_submit',
              'type': 'int'
          },
          {
              'name': 'check_complete',
              'type': 'string'
          },
          {
              'name': 'is_missing_document',
              'type': 'int'
          }
      ],
      id : 'id',
      totalProperty : 'total',
      xns : Roo.data,
      '|xns' : 'Roo.data'
     }
    },
    cm : [
     {
      xtype : 'ColumnModel',
      dataIndex : 'userdata_id',
      header : _this._strings['b718adec73e04ce3ec720dd11a06a308'] /* ID */,
      hidden : false,
      sortable : false,
      width : 50,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'full_name',
      header : _this._strings['49ee3087348e8d44e1feda1917443987'] /* Name */,
      locked : false,
      sortable : false,
      width : 300,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'company_name',
      header : _this._strings['e7b47c58815acf1d3afa59a84b5db7fb'] /* Company Name */,
      hidden : true,
      locked : false,
      sortable : false,
      width : 300,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'account_type',
      header : _this._strings['a1fa27779242b4902f7ae3bdd5c6d508'] /* Type */,
      locked : false,
      sortable : false,
      width : 100,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'in_email',
      header : _this._strings['ce8ae9da5b7cd6c3df2929543a9af92d'] /* Email */,
      renderer : function (v) {
              return (v.length && v.indexOf('@') > 0 ) ? 
                  String.format('<a href="mailto:{0}">{0}</a>',v) : v;
                  
          },
      sortable : false,
      width : 300,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'in_contact_number',
      header : _this._strings['bcc254b55c4a1babdf1dcb82c207506b'] /* Phone */,
      sortable : false,
      width : 150,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'investment_advisor_id_name',
      header : _this._strings['52c649c38236206862e79e77f735902d'] /* Investment Advisor */,
      sortable : false,
      width : 150,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'account_type',
      hidden : true,
      sortable : false,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'fund_name',
      hidden : true,
      sortable : false,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     },
     {
      xtype : 'ColumnModel',
      dataIndex : 'is_submit',
      header : _this._strings['ec53a8c4f07baed5d8825072c89799be'] /* Status */,
      locked : false,
      renderer : function(v,x,r) {  
      
          if(v * 1 > 0) {
          
              /*
              * Submitted but missing the documents...
              */
              
              if(r.data.is_missing_document * 1 == 1){
                  return String.format(
                      '<i style="color:green;" class="fa fa-check"></i> <span style="color:green;">Submitted</span>' +
                      ' <i style="color:#941B0C;" class="fa fa-times"></i> Missing : Document'
                  );
              }
              
              /*
              * Submitted and all documents have been upload...
              */
              
              return String.format(
                  '<i style="color:green;" class="fa fa-check"></i> <span style=color:green;">Submitted</span>'
              );
          }
          
          var fmt = '<i style="color:#941B0C;" class="fa fa-times"></i> Missing : {0}';
          
          if(!r.data.check_complete.length){
              fmt = 'Form Completed, but not Submitted';
          }
          
          return String.format(
              fmt, 
              r.data.check_complete.split(',').join(', ')
          );
       },
      sortable : false,
      width : 300,
      xns : Roo.grid,
      '|xns' : 'Roo.grid'
     }
    ]
   }
  };  }
});
