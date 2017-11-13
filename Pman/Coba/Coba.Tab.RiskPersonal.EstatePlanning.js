//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Coba.Tab.RiskPersonal');

Coba.Tab.RiskPersonal.EstatePlanning = new Roo.XComponent({

 _strings : {
  '964b03e94a6edfea87737f699fed5e16' :"11. Estate Planning",
  '8efb22767cae88d8b201f93d67317f62' :"Do you have any charitable causes or fundations you wish to discuss further?",
  '39d5089caa3c9caaa10b6d1a13216596' :"Have you empowered someone else to look after you medically in the event of disability or illness? This is known as an \"Advance Health Directive\"",
  '529d3b49eec19fe53051e19f8b285124' :"Have you empowered someone else to look after your finances in the event of disability or illness? This is known as an \"Enduring Power of Attorney\"",
  '6512bd43d9caa6e02c990b0a82652dca' :"11",
  '2dca51ee6dc27c6d61d11edc7c21ebf0' :"Do you have a will?",
  '3e30ef4abf20f94f57539695c792e0d5' :"If you do have a will, when was it last updated?",
  '7f4dc4b9041e1b0ea37cdb415a85961a' :"Do you have any special need requirements of any dependents?",
  'bf7d6c2a60f55d4ca507729b47f0ca74' :"Do you have a testamentary trust?",
  '26a710cd1671b5d262ccccf9a6998300' :"If yes please explain further."
 },

  part     :  ["Coba", "EstatePlanning" ],
  order    : '001-Coba.Tab.RiskPersonal.EstatePlanning',
  region   : 'center',
  parent   : 'Coba.Tab.RiskPersonal',
  name     : "unnamed module",
  disabled : false, 
  permname : '', 
  _tree : function(_data)
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'Content',
   region : 'center',
   title : 11,
   xns : Roo.bootstrap.panel,
   '|xns' : 'Roo.bootstrap.panel',
   items  : [
    {
     xtype : 'Container',
     header : _this._strings['964b03e94a6edfea87737f699fed5e16'] /* 11. Estate Planning */,
     panel : 'primary',
     style : 'margin:20px;',
     xns : Roo.bootstrap,
     '|xns' : 'Roo.bootstrap',
     items  : [
      {
       xtype : 'Form',
       xns : Roo.bootstrap,
       '|xns' : 'Roo.bootstrap',
       items  : [
        {
         xtype : 'Row',
         style : 'margin: 5px;',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Column',
           md : 4,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           items  : [
            {
             xtype : 'FieldLabel',
             html : _this._strings['2dca51ee6dc27c6d61d11edc7c21ebf0'] /* Do you have a will? */,
             style : 'line-height: 43px; margin-left:14px;',
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap'
            }
           ]
          },
          {
           xtype : 'Column',
           md : 8,
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
               md : 2,
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap',
               items  : [
                {
                 xtype : 'Radio',
                 boxLabel : 'Yes',
                 inputValue : 1,
                 labelAlign : 'top',
                 name : 'estate_is_will',
                 xns : Roo.bootstrap,
                 '|xns' : 'Roo.bootstrap'
                }
               ]
              },
              {
               xtype : 'Column',
               md : 2,
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap',
               items  : [
                {
                 xtype : 'Radio',
                 boxLabel : 'No',
                 inputValue : 0,
                 labelAlign : 'left',
                 name : 'estate_is_will',
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
         xtype : 'Row',
         style : 'margin: 5px;',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Column',
           md : 6,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           items  : [
            {
             xtype : 'Input',
             fieldLabel : _this._strings['3e30ef4abf20f94f57539695c792e0d5'] /* If you do have a will, when was it last updated? */,
             labelAlign : 'left',
             labelWidth : 8,
             name : 'estate_year_will',
             style : 'line-height:40px;',
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap'
            }
           ]
          }
         ]
        },
        {
         xtype : 'Row',
         style : 'margin: 5px;',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Column',
           md : 4,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           items  : [
            {
             xtype : 'FieldLabel',
             html : _this._strings['bf7d6c2a60f55d4ca507729b47f0ca74'] /* Do you have a testamentary trust? */,
             style : 'line-height: 43px; margin-left:14px;',
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap'
            }
           ]
          },
          {
           xtype : 'Column',
           md : 8,
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
               md : 2,
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap',
               items  : [
                {
                 xtype : 'Radio',
                 boxLabel : 'Yes',
                 inputValue : 1,
                 labelAlign : 'top',
                 name : 'estate_is_testamentary',
                 xns : Roo.bootstrap,
                 '|xns' : 'Roo.bootstrap'
                }
               ]
              },
              {
               xtype : 'Column',
               md : 2,
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap',
               items  : [
                {
                 xtype : 'Radio',
                 boxLabel : 'No',
                 inputValue : 0,
                 labelAlign : 'left',
                 name : 'estate_is_testamentary',
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
         xtype : 'Row',
         style : 'margin: 5px;',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Column',
           md : 4,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           items  : [
            {
             xtype : 'FieldLabel',
             html : _this._strings['529d3b49eec19fe53051e19f8b285124'] /* Have you empowered someone else to look after your finances in the event of disability or illness? This is known as an "Enduring Power of Attorney" */,
             style : ' margin-left:14px;',
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap'
            }
           ]
          },
          {
           xtype : 'Column',
           md : 8,
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
               md : 2,
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap',
               items  : [
                {
                 xtype : 'Radio',
                 boxLabel : 'Yes',
                 inputValue : 1,
                 labelAlign : 'top',
                 name : 'estate_is_enduring_power',
                 xns : Roo.bootstrap,
                 '|xns' : 'Roo.bootstrap'
                }
               ]
              },
              {
               xtype : 'Column',
               md : 2,
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap',
               items  : [
                {
                 xtype : 'Radio',
                 boxLabel : 'No',
                 inputValue : 0,
                 labelAlign : 'left',
                 name : 'estate_is_enduring_power',
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
         xtype : 'Row',
         style : 'margin: 5px;',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Column',
           md : 4,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           items  : [
            {
             xtype : 'FieldLabel',
             html : _this._strings['39d5089caa3c9caaa10b6d1a13216596'] /* Have you empowered someone else to look after you medically in the event of disability or illness? This is known as an "Advance Health Directive" */,
             style : 'margin-left:14px;',
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap'
            }
           ]
          },
          {
           xtype : 'Column',
           md : 8,
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
               md : 2,
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap',
               items  : [
                {
                 xtype : 'Radio',
                 boxLabel : 'Yes',
                 inputValue : 1,
                 labelAlign : 'top',
                 name : 'estate_is_health_directive',
                 xns : Roo.bootstrap,
                 '|xns' : 'Roo.bootstrap'
                }
               ]
              },
              {
               xtype : 'Column',
               md : 2,
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap',
               items  : [
                {
                 xtype : 'Radio',
                 boxLabel : 'No',
                 inputValue : 0,
                 labelAlign : 'left',
                 name : 'estate_is_health_directive',
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
         xtype : 'Row',
         style : 'margin: 5px;',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Column',
           md : 4,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           items  : [
            {
             xtype : 'FieldLabel',
             html : _this._strings['7f4dc4b9041e1b0ea37cdb415a85961a'] /* Do you have any special need requirements of any dependents? */,
             style : 'margin-left:14px;',
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap'
            }
           ]
          },
          {
           xtype : 'Column',
           md : 8,
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
               md : 2,
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap',
               items  : [
                {
                 xtype : 'Radio',
                 boxLabel : 'Yes',
                 inputValue : 1,
                 labelAlign : 'top',
                 name : 'estate_is_special_need',
                 xns : Roo.bootstrap,
                 '|xns' : 'Roo.bootstrap'
                }
               ]
              },
              {
               xtype : 'Column',
               md : 2,
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap',
               items  : [
                {
                 xtype : 'Radio',
                 boxLabel : 'No',
                 inputValue : 0,
                 labelAlign : 'left',
                 name : 'estate_is_special_need',
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
         xtype : 'Row',
         style : 'margin: 5px;',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Column',
           md : 6,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           items  : [
            {
             xtype : 'Input',
             fieldLabel : _this._strings['26a710cd1671b5d262ccccf9a6998300'] /* If yes please explain further. */,
             labelAlign : 'left',
             labelWidth : 8,
             name : 'estate_reason_special_need',
             style : 'line-height:40px;',
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap'
            }
           ]
          }
         ]
        },
        {
         xtype : 'Row',
         style : 'margin: 5px;',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Column',
           md : 4,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           items  : [
            {
             xtype : 'FieldLabel',
             html : _this._strings['8efb22767cae88d8b201f93d67317f62'] /* Do you have any charitable causes or fundations you wish to discuss further? */,
             style : 'margin-left:14px;',
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap'
            }
           ]
          },
          {
           xtype : 'Column',
           md : 8,
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
               md : 2,
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap',
               items  : [
                {
                 xtype : 'Radio',
                 boxLabel : 'Yes',
                 inputValue : 1,
                 labelAlign : 'top',
                 name : 'estate_is_charitable',
                 xns : Roo.bootstrap,
                 '|xns' : 'Roo.bootstrap'
                }
               ]
              },
              {
               xtype : 'Column',
               md : 2,
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap',
               items  : [
                {
                 xtype : 'Radio',
                 boxLabel : 'No',
                 inputValue : 0,
                 labelAlign : 'left',
                 name : 'estate_is_charitable',
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
    }
   ]
  };  }
});
