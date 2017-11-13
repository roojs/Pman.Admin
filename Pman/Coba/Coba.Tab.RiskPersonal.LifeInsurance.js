//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Coba.Tab.RiskPersonal');

Coba.Tab.RiskPersonal.LifeInsurance = new Roo.XComponent({

 _strings : {
  '2895e3be29309616204afd096d1e6653' :"Liabilities to be paid out (e.g. Mortgage, Personal Loans):",
  '74a2c78bffd362899c586b892448533e' :"Guarantor's insurance:",
  '1f20f91fae0ff79efca4d8d02306ba3e' :"Protecion of family and/ or assets in the event of Death or Total and Permanent Disablement",
  'ab91c7fde7e3f470415e967fd72f9332' :"Provide against Critical Illness or Major Trauma",
  'e1678dfbd206408d8ef5bfb94228bea5' :"Business Insurance",
  '4f81ff448f5008d6dfbe5b474d7521f2' :"Liabilities to be paid out (e.g. Mortgage, Loans):",
  'cbf07fc663c0d8d286520e88cef718d6' :"Amount of income to be covered:",
  'c262b5a5a8b218eaa0604f30bf75e7f6' :"For how long would you want your income replaced?",
  'd3d9446802a44259755d38e6d163e820' :"10",
  'b8fa154d2e9e40b9f339dba7dabde17c' :"Emergency fund:",
  'eedf4b0c45884f110a705535494c893f' :"Do you require Key-person insurance?",
  'dea938ebabb8ebbf5fe89506727bb247' :"Funeral expenses:",
  '7fe2a2366ed2550f552a84a37c46af56' :"Protect income against serious illness or injury",
  'f7302683963f2a1c38d31d48aa2a17ef' :"Waiting period (How long could you sustain lifestyle without earning income?)",
  '1447299d17e7910f74983c23e9d79d5b' :"Children's education expenses:",
  '70e9e572ab6623d0d2420faaa2c67adf' :"Other Expenses (e.g. Medical, Home Improvements):",
  '22dd14a1d6bbc507213d3502c364d721' :"Need for share purchase, partnership insurance for buy/sell arrangement:",
  '00c1ad871e16f31bc35aaeba5c71d296' :"Income to be replaced:",
  '176a8c52ebd1a2f21acceabb717334ec' :"Benefit period (If you needed to make claim, for how long would you like benefits paid?)",
  'ee629a7c963d602a41c6a4cdfd36673a' :"10. Life Insurance Objectives & Concerns",
  '66c4c5112f455a19afde47829df363fa' :"Total:",
  'fc1858e766ad35ccd1e3aaa0766a7fea' :"Other:"
 },

  part     :  ["Coba", "LifeInsurance" ],
  order    : '001-Coba.Tab.RiskPersonal.LifeInsurance',
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
   title : 10,
   xns : Roo.bootstrap.panel,
   '|xns' : 'Roo.bootstrap.panel',
   items  : [
    {
     xtype : 'Container',
     header : _this._strings['ee629a7c963d602a41c6a4cdfd36673a'] /* 10. Life Insurance Objectives & Concerns */,
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
         xtype : 'Container',
         header : _this._strings['1f20f91fae0ff79efca4d8d02306ba3e'] /* Protecion of family and/ or assets in the event of Death or Total and Permanent Disablement */,
         panel : 'info',
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
             md : 12,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'Input',
               fieldLabel : _this._strings['2895e3be29309616204afd096d1e6653'] /* Liabilities to be paid out (e.g. Mortgage, Personal Loans): */,
               labelAlign : 'left',
               labelWidth : 4,
               name : 'insurance_liability_family',
               style : 'line-height: 30px;',
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
             md : 12,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'Input',
               fieldLabel : _this._strings['1447299d17e7910f74983c23e9d79d5b'] /* Children's education expenses: */,
               labelAlign : 'left',
               labelWidth : 4,
               name : 'insurance_expense_edu_family',
               style : 'line-height: 30px;',
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
             md : 12,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'Input',
               fieldLabel : _this._strings['00c1ad871e16f31bc35aaeba5c71d296'] /* Income to be replaced: */,
               labelAlign : 'left',
               labelWidth : 4,
               name : 'insurance_income_replace_family',
               style : 'line-height: 30px;',
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
             md : 12,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'Input',
               fieldLabel : _this._strings['c262b5a5a8b218eaa0604f30bf75e7f6'] /* For how long would you want your income replaced? */,
               labelAlign : 'left',
               labelWidth : 4,
               name : 'insurance_year_replace_family',
               style : 'line-height: 30px;',
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
             md : 12,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'Input',
               fieldLabel : _this._strings['dea938ebabb8ebbf5fe89506727bb247'] /* Funeral expenses: */,
               labelAlign : 'left',
               labelWidth : 4,
               name : 'insurance_expense_funeral_family',
               style : 'line-height: 30px;',
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
             md : 12,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'Input',
               fieldLabel : _this._strings['b8fa154d2e9e40b9f339dba7dabde17c'] /* Emergency fund: */,
               labelAlign : 'left',
               labelWidth : 4,
               name : 'insurance_fund_emergency_family',
               style : 'line-height: 30px;',
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
             md : 12,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'Input',
               fieldLabel : _this._strings['66c4c5112f455a19afde47829df363fa'] /* Total: */,
               labelAlign : 'left',
               labelWidth : 4,
               style : 'line-height: 30px;',
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap'
              }
             ]
            }
           ]
          }
         ]
        },
        {
         xtype : 'Container',
         header : _this._strings['ab91c7fde7e3f470415e967fd72f9332'] /* Provide against Critical Illness or Major Trauma */,
         panel : 'info',
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
             md : 12,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'Input',
               fieldLabel : _this._strings['4f81ff448f5008d6dfbe5b474d7521f2'] /* Liabilities to be paid out (e.g. Mortgage, Loans): */,
               labelAlign : 'left',
               labelWidth : 4,
               name : 'insurance_liability_critical',
               style : 'line-height: 30px;',
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
             md : 12,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'Input',
               fieldLabel : _this._strings['70e9e572ab6623d0d2420faaa2c67adf'] /* Other Expenses (e.g. Medical, Home Improvements): */,
               labelAlign : 'left',
               labelWidth : 4,
               name : 'insurance_expense_critical',
               style : 'line-height: 30px;',
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
             md : 12,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'Input',
               fieldLabel : _this._strings['00c1ad871e16f31bc35aaeba5c71d296'] /* Income to be replaced: */,
               labelAlign : 'left',
               labelWidth : 4,
               name : 'insurance_income_replace_critical',
               style : 'line-height: 30px;',
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
             md : 12,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'Input',
               fieldLabel : _this._strings['fc1858e766ad35ccd1e3aaa0766a7fea'] /* Other: */,
               labelAlign : 'left',
               labelWidth : 4,
               name : 'insurance_income_other_critical',
               style : 'line-height: 30px;',
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
             md : 12,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'Input',
               fieldLabel : _this._strings['66c4c5112f455a19afde47829df363fa'] /* Total: */,
               labelAlign : 'left',
               labelWidth : 4,
               style : 'line-height: 30px;',
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap'
              }
             ]
            }
           ]
          }
         ]
        },
        {
         xtype : 'Container',
         header : _this._strings['7fe2a2366ed2550f552a84a37c46af56'] /* Protect income against serious illness or injury */,
         panel : 'info',
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
             md : 12,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'Input',
               fieldLabel : _this._strings['cbf07fc663c0d8d286520e88cef718d6'] /* Amount of income to be covered: */,
               labelAlign : 'left',
               labelWidth : 4,
               name : 'insurance_income_cover_serious',
               style : 'line-height: 30px;',
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
             md : 12,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'Input',
               fieldLabel : _this._strings['f7302683963f2a1c38d31d48aa2a17ef'] /* Waiting period (How long could you sustain lifestyle without earning income?) */,
               labelAlign : 'left',
               labelWidth : 4,
               name : 'insurance_year_sustain_serious',
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
             md : 12,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'Input',
               fieldLabel : _this._strings['176a8c52ebd1a2f21acceabb717334ec'] /* Benefit period (If you needed to make claim, for how long would you like benefits paid?) */,
               labelAlign : 'left',
               labelWidth : 4,
               name : 'insurance_year_benefit_serious',
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
             md : 12,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'Input',
               fieldLabel : _this._strings['fc1858e766ad35ccd1e3aaa0766a7fea'] /* Other: */,
               labelAlign : 'left',
               labelWidth : 4,
               name : 'insurance_income_other_serious',
               style : 'line-height: 30px;',
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
             md : 12,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'Input',
               fieldLabel : _this._strings['66c4c5112f455a19afde47829df363fa'] /* Total: */,
               labelAlign : 'left',
               labelWidth : 4,
               style : 'line-height: 30px;',
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap'
              }
             ]
            }
           ]
          }
         ]
        },
        {
         xtype : 'Container',
         header : _this._strings['e1678dfbd206408d8ef5bfb94228bea5'] /* Business Insurance */,
         panel : 'info',
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
             md : 12,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'Input',
               fieldLabel : _this._strings['22dd14a1d6bbc507213d3502c364d721'] /* Need for share purchase, partnership insurance for buy/sell arrangement: */,
               labelAlign : 'left',
               labelWidth : 4,
               name : 'insurance_expense_share_business',
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
             md : 12,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'Input',
               fieldLabel : _this._strings['74a2c78bffd362899c586b892448533e'] /* Guarantor's insurance: */,
               labelAlign : 'left',
               labelWidth : 4,
               name : 'insurance_expense_guarantor_business',
               style : 'line-height: 30px;',
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
               html : _this._strings['eedf4b0c45884f110a705535494c893f'] /* Do you require Key-person insurance? */,
               style : 'line-height: 45px; margin-left:14px;',
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
                   name : 'insurance_is_require_keyperson',
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
                   name : 'insurance_is_require_keyperson',
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
    }
   ]
  };  }
});
