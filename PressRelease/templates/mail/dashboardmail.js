//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

dashboardmail = new Roo.XComponent({

 _strings : {
  'cfbb11cc8aee42c22634027806a48d90' :"<small> Total Clippings :</small><B> {release.clipping_total} </B>  ",
  'c4969a309475aca5ebd7ebc92191d4f7' :"<table width=\"100%\">\n    <tr style=\"font-weight:bold\"><td><small>Source</small></td><td><small>Source Link</small></td><td><small>Download</small></td><td><small>Circulation</small></td></tr>\n    <tr flexy:foreach=\"release.clippings_dist,c\">\n        <td style=\"width:50%\"><small>{c.media_name} ({c.language_tr})</small></td>\n        <td><a href=\"{c.remote_url}\" target=\"_new\"><img src=\"https://{t.HTTP_HOST}{t.rootURL}/Pman/templates/images/view-document.gif\" title=\"View\"/></a></td>\n        <td><a href=\"https://{HTTP_HOST}{baseURL}/Clipping/View/download/{c.id}.pdf?authkey=\" target=\"_new\"><img src=\"https://{t.HTTP_HOST}{t.rootURL}/Pman/templates/images/save.gif\" title=\"Download\"/></a></td>\n        <td><small>{c.circulationFormated()}</small></td>\n    </tr>\n    \n </table>\n",
  '76c5232418eec0a94c56dd5ac98daa91' :"Historical Comparison",
  'f0bac093bb884df2891d32385d053788' :"Distribution",
  '886db5abb60274dd672e67bf0bebd6dd' :"<small> Unique Web sites :</small><B> {release.media_total} </B>  ",
  'f8998f1fd787adb9dc08b3e91f4e2171' :"<ul>\n   <li flexy:if=\"distribution.international\">International (Outside of Asia Pacific)</li>\n   <li flexy:foreach=\"distribution.regions,c\">Regional: {c}</li>\n   <li flexy:foreach=\"distribution.countries,c\">{c}</li>\n</ul>",
  '1bdbef3a4e139b098d750c51192e9ac2' :"<B> Release Details: </B>  ",
  '5a455010b42d6056df9ac7c17682e52b' :"<small> Total Online News Posting :</small><B> {news_online_posting_total()} </B>  ",
  '5b6ac829e60dcb06b6620d075ba6373b' :"Media OutReach News Dashboard - {daysHtml():h} Day Report",
  '48cf7b62b0ae1dfeb5149e8e237d0c91' :"Top Media by Reach - Media Write-up Coverage",
  'bc95d77e53cbe571952328a7727a57a8' :"<table width=\"100%\" style=\"table-layout:fixed;font-size:14px;\">\n    <thead>\n      <tr style=\"font-weight:bold\"><td>Date</td><td>Headline</td><td>Clippings</td><td>Circulation</td><td>Advalue</td></tr>\n  </thead>\n    <tbody flexy:foreach=\"history,h\">\n    <tr>\n        <td ><small> {h.publish_dt(#d/M/Y#)} </small></td>\n        <td colspan=\"4\" style=\"word-wrap: break-word;\"><small> #{h.id} {h.headline}</small> </td>\n    </tr>\n    <tr style=\"font-weight:bold\">\n        <td>&nbsp;</td>\n        <td>&nbsp;</td>\n        <td><small>{h.clipping_total}</small></td>\n        <td><small>{h.reach_total}</small></td>\n        <td><small>{h.advalue_total}</small></td>\n    </tr>\n    </tbody>\n </table>\n  ",
  'ff562acaea20914448cb40525abd2623' :"Media Write-up Coverage",
  '1f67d5fa612e2acf6fe7254c7bc701c2' :"<small> Languages:</small> <b> {languages_total} </b>",
  'e918cef139697603dcac357ae876d489' :"as MS Word",
  '41fc5e35e878b4095deb838ca1cfa80a' :"<small>Total Distribution Points:</small><B> {release.delivered_total} </B>  ",
  '76f3187439a504e6cd587924886c9b8c' :"Media OutReach Press release distribution report",
  'd903de581cf0ccea6e227b6ec1806054' :"{t.releaseLogo():h}",
  '71db76a2a279a14e4952d729d705c157' :"<ul>\n    <li flexy:foreach=\"suppliers,s\">{s.name}</li>\n</ul>\n",
  'b4642b75f343d6999b762e00624c1273' :"<img src=\"https://{t.HTTP_HOST}{t.rootURL}/Release/templates/images/widget-logo.png\" class=\"roo-m-column-image\" style=\"max-width: 260px;\">",
  'e63c9f056ac343dbafa63d3209bda690' :"<a href=\"http://{t.HTTP_HOST}{t.baseURL}/Clipping/View/download/{clip.id}.pdf?authkey={t.authKey}\"><img \n\t\t\twidth=\"200\"\n\t\t\tmailembed=\"no\"\n\t\t\tsrc=\"http://{t.HTTP_HOST}{t.baseURL}/Clipping/View/thumb/{clip.id}.jpg?authkey={t.authKey}\"></a>",
  '553b4e75b4621742af0fc169b4d97f25' :"Distribution Details",
  'dc683222b89e1db7ca4c12742851a762' :"<B> Description : </B> {release.headline}",
  'b2e5425ba7928f8efddb04ce61d2614b' :"<ul><li flexy:foreach=\"languages,l\">{l}</li></ul>",
  '80ef4578af7f6fd57678b5b49abf0db3' :"Share of Voice By Type of News Coverage",
  'fdfd14a238a79f88aab3a7280bb7ccb1' :"Volume over time",
  '52e6ca91ffeff2db060a1403eb07e992' :"<small> Total Media Write-up Coverage :</small><B> {media_write_up_total()} </B>  ",
  '8f3e1295a3a1d30b6ee5d8de6e0b8c0a' :"as Excel",
  'c22cbfe0fa9b97323840213b74e5cd59' :"Total Coverage",
  '3a08e2e340ab29fd9263af48193cbf8e' :"Languages",
  'a7bea2907eb650d8016e559e7dfcbb0d' :"<img src=\"https://{HTTP_HOST}{baseURL}/PressRelease/DistributionReport/BreakdownByCountry/image?release_id={release.id}&days={days}\">",
  'cd2119f4c4a6bc283173f26747a3c775' :"<small> Media Write Up Advalue :</small><B> US${advalue_total(#media#)} </B>  ",
  'dd5ba7fb87f4b9c3f95280b06144d396' :"Breakdown by country",
  '26d1c91c990ee713e2a93e7faf8a21ae' :"<small> Total Advalue :</small><B> US${advalue_total(#all#)} </B>  ",
  'af23cecc757c6fe3b8b69b0b0100e96b' :"<small> Total Reach :</small><B> {release.reach_total} </B>  ",
  '790d59ef178acbc75d233bf4211763c6' :"Countries",
  '3ba45f71401982ffb72268f81537fec3' :"<img src=\"https://{HTTP_HOST}{baseURL}/PressRelease/DistributionReport/BreakdownByLanguage/image?release_id={release.id}&days={days}\">",
  '40f5c2ed25804bc5229fc0d30ffcf8a4' :"<table width=\"100%\">\n    <tr style=\"font-weight:bold\"><td><small>Source</small></td><td><small>Source Link</small></td><td><small>Download</small></td><td><small>Circulation</small></td></tr>\n    <tr flexy:foreach=\"release.clippings_dist_feed,c\">\n        <td style=\"width:50%\"><small>{c.media_name} ({c.language_tr})</small></td>\n        <td><a href=\"{c.remote_url}\" target=\"_new\"><img src=\"https://{t.HTTP_HOST}{t.rootURL}/Pman/templates/images/view-document.gif\" title=\"View\"/></a></td>\n        <td><a href=\"https://{HTTP_HOST}{baseURL}/Clipping/View/download/{c.id}.pdf?authkey=\" target=\"_new\"><img src=\"https://{t.HTTP_HOST}{t.rootURL}/Pman/templates/images/save.gif\" title=\"Download\"/></a></td>\n        <td><small>{c.circulationFormated()}</small></td>\n    </tr>\n    \n </table>\n",
  'c02f226ecf3f20e24e102b8f4809dc1b' :" | ",
  '35a7b35ed73cc092ab53e483a03df0e3' :"<B>#{rr.id}</B> -  {rr.publish_dt(#d F Y h:ia#)} - {rr.inlanguages}",
  'e28787c9b209f2a0dbfc21545ed4f3bc' :"<a href=\"https://{t.HTTP_HOST}{t.baseURL}/Clipping/View/download/{clip.id}.pdf?authkey={t.authKey}\"><img \n\t\t\twidth=\"200\"\n\t\t\tmailembed=\"no\"\n\t\t\tsrc=\"https://{t.HTTP_HOST}{t.baseURL}/Clipping/View/thumb/{clip.id}.jpg?authkey={t.authKey}\"></a>",
  'aab26161b230a5f238cfd958ffced969' :"Download Report : ",
  '0f872003bb73e5f7a8c8e6bb59da52bc' :"Found on these Search Engines",
  '3b878279a04dc47d60932cb294d96259' :"Overview",
  '1992faaf8cfa18ac4578e08c4d7f6bff' :" \nHeadline: <a href=\"http://{t.HTTP_HOST}/index.php/Clipping/View/download/{clip.id}.pdf?authkey={t.authKey}\"><B>{clip.headline()}</b></a><br/>\nMedia Title: {clip.media_name} <br/>\nPublished: {clip.published()} <br/>\nCountry: {clip.country(#en#)} <br/>\nLanguage: {clip.language(#en#)}<br/>\nAdValue: US${clip.advalue} <br/>\nCirculation: {clip.circulationFormated()}<br/>\nURL: <a target=\"_new\" href=\"{clip.remote_url}\">{clip.media_name}</a><br/>\n<br/>\n ",
  'be9d418e92e41156493c6241374b659b' :"<small>Countries Targeted :</small> <b>{countries_total}</b>",
  '7d24cc805dd8e5910bf9b882ae8a55f7' :"<small> Online News Posting Advalue :</small><B> US${advalue_total(#posting#)} </B>  ",
  '6302799cad82c70e780a75f94adccb3c' :"<img src=\"https://{HTTP_HOST}{baseURL}/PressRelease/DistributionReport/BreakdownByNewsCoverage/image?release_id={release.id}&days={days}\">",
  'e65bd2101f7b815610283c6209da6e93' :"Online News Posting",
  '433d3c16a783c0427da55ee22f803f06' :" The news clipping shall not be copied, redistributed, reproduced or passed on\n        directly or indirectly to any 3rd party in whole or in part for any purpose at anytime.\n        This news clipping is intended for client's internal usage only.\n",
  '7c3a21b4cd6180476ac198f341e9666c' :"<img src=\"https://{HTTP_HOST}{baseURL}/PressRelease/DistributionReport/VolumeOverTime/image?release_id={release.id}&days={days}\">",
  'd03b57561f46520029ba6df8f941c1cd' :"Top Media by Reach - Online News Posting",
  'fadbb12cf481859fe32ee875dfd7e05e' :"<small> Beats Covered :</small> <b>{beats_total}</b>",
  '5bfd1992799a6417b3b25c4373586da8' :"Breakdown by language"
 },

  part     :  ["mail", "dashboardmail" ],
  order    : '001-dashboardmail',
  region   : 'center',
  parent   : false,
  name     : "unnamed module",
  disabled : false, 
  permname : '', 
  _tree : function()
  {
   var _this = this;
   var MODULE = this;
   return {
   cls : 'mailer-body',
   xns : Roo.mailer,
   '|xns' : 'Roo.mailer',
   xtype : 'Body',
   items  : [
    {
     xns : Roo.mailer,
     '|xns' : 'Roo.mailer',
     xtype : 'BodyContainer',
     items  : [
      {
       blocktype : 'preheader',
       html : _this._strings['76f3187439a504e6cd587924886c9b8c'] /* Media OutReach Press release distribution report */,
       style : 'padding-top:10px; padding-right:20px; padding-bottom:10px; padding-left:20px;',
       xns : Roo.mailer,
       '|xns' : 'Roo.mailer',
       xtype : 'Block'
      },
      {
       blocktype : 'header',
       xns : Roo.mailer,
       '|xns' : 'Roo.mailer',
       xtype : 'Block',
       items  : [
        {
         html : _this._strings['5b6ac829e60dcb06b6620d075ba6373b'] /* Media OutReach News Dashboard - {daysHtml():h} Day Report */,
         level : 2,
         style : 'padding:10px',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         xtype : 'Header'
        }
       ]
      },
      {
       blocktype : 'row',
       xns : Roo.mailer,
       '|xns' : 'Roo.mailer',
       xtype : 'Block',
       items  : [
        {
         column : 'left',
         html : _this._strings['b4642b75f343d6999b762e00624c1273'] /* <img src="https://{t.HTTP_HOST}{t.rootURL}/Release/templates/images/widget-logo.png" class="roo-m-column-image" style="max-width: 260px;"> */,
         xns : Roo.mailer,
         '|xns' : 'Roo.mailer',
         xtype : 'Column'
        },
        {
         column : 'right',
         html : _this._strings['d903de581cf0ccea6e227b6ec1806054'] /* {t.releaseLogo():h} */,
         xns : Roo.mailer,
         '|xns' : 'Roo.mailer',
         xtype : 'Column'
        }
       ]
      },
      {
       blocktype : 'body',
       xns : Roo.mailer,
       '|xns' : 'Roo.mailer',
       xtype : 'Block',
       items  : [
        {
         html : _this._strings['dc683222b89e1db7ca4c12742851a762'] /* <B> Description : </B> {release.headline} */,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         xtype : 'Container'
        },
        {
         html : _this._strings['1bdbef3a4e139b098d750c51192e9ac2'] /* <B> Release Details: </B>   */,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         xtype : 'Container'
        },
        {
         'flexy:foreach' : 'releases,rr',
         html : _this._strings['35a7b35ed73cc092ab53e483a03df0e3'] /* <B>#{rr.id}</B> -  {rr.publish_dt(#d F Y h:ia#)} - {rr.inlanguages} */,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         xtype : 'Container'
        }
       ]
      },
      {
       blocktype : 'body',
       xns : Roo.mailer,
       '|xns' : 'Roo.mailer',
       xtype : 'Block',
       items  : [
        {
         style : 'text-align: center;',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         xtype : 'Container',
         items  : [
          {
           html : _this._strings['aab26161b230a5f238cfd958ffced969'] /* Download Report :  */,
           tag : 'span',
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           xtype : 'Container'
          },
          {
           href : '{toWordUrl()}',
           html : _this._strings['e918cef139697603dcac357ae876d489'] /* as MS Word */,
           target : '_blank',
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           xtype : 'Link'
          },
          {
           html : _this._strings['c02f226ecf3f20e24e102b8f4809dc1b'] /*  |  */,
           tag : 'span',
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           xtype : 'Container'
          },
          {
           href : '{toExcelUrl()}',
           html : _this._strings['8f3e1295a3a1d30b6ee5d8de6e0b8c0a'] /* as Excel */,
           target : '_blank',
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           xtype : 'Link'
          }
         ]
        }
       ]
      },
      {
       blocktype : 'body',
       xns : Roo.mailer,
       '|xns' : 'Roo.mailer',
       xtype : 'Block',
       items  : [
        {
         html : _this._strings['3b878279a04dc47d60932cb294d96259'] /* Overview */,
         level : 2,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         xtype : 'Header'
        }
       ]
      },
      {
       blocktype : 'row',
       xns : Roo.mailer,
       '|xns' : 'Roo.mailer',
       xtype : 'Block',
       items  : [
        {
         column : 'left',
         xns : Roo.mailer,
         '|xns' : 'Roo.mailer',
         xtype : 'Column',
         items  : [
          {
           html : _this._strings['f0bac093bb884df2891d32385d053788'] /* Distribution */,
           level : 5,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           xtype : 'Header'
          },
          {
           html : _this._strings['41fc5e35e878b4095deb838ca1cfa80a'] /* <small>Total Distribution Points:</small><B> {release.delivered_total} </B>   */,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           xtype : 'Container'
          },
          {
           html : _this._strings['be9d418e92e41156493c6241374b659b'] /* <small>Countries Targeted :</small> <b>{countries_total}</b> */,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           xtype : 'Container'
          },
          {
           html : _this._strings['1f67d5fa612e2acf6fe7254c7bc701c2'] /* <small> Languages:</small> <b> {languages_total} </b> */,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           xtype : 'Container'
          },
          {
           html : _this._strings['fadbb12cf481859fe32ee875dfd7e05e'] /* <small> Beats Covered :</small> <b>{beats_total}</b> */,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           xtype : 'Container'
          }
         ]
        },
        {
         column : 'right',
         xns : Roo.mailer,
         '|xns' : 'Roo.mailer',
         xtype : 'Column',
         items  : [
          {
           html : _this._strings['c22cbfe0fa9b97323840213b74e5cd59'] /* Total Coverage */,
           level : 5,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           xtype : 'Header'
          },
          {
           html : _this._strings['886db5abb60274dd672e67bf0bebd6dd'] /* <small> Unique Web sites :</small><B> {release.media_total} </B>   */,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           xtype : 'Container'
          },
          {
           html : _this._strings['cfbb11cc8aee42c22634027806a48d90'] /* <small> Total Clippings :</small><B> {release.clipping_total} </B>   */,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           xtype : 'Container'
          },
          {
           html : _this._strings['af23cecc757c6fe3b8b69b0b0100e96b'] /* <small> Total Reach :</small><B> {release.reach_total} </B>   */,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           xtype : 'Container'
          },
          {
           'flexy:if' : 'release_is_feed()',
           html : _this._strings['cd2119f4c4a6bc283173f26747a3c775'] /* <small> Media Write Up Advalue :</small><B> US${advalue_total(#media#)} </B>   */,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           xtype : 'Container'
          },
          {
           'flexy:if' : 'release_is_feed()',
           html : _this._strings['7d24cc805dd8e5910bf9b882ae8a55f7'] /* <small> Online News Posting Advalue :</small><B> US${advalue_total(#posting#)} </B>   */,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           xtype : 'Container'
          },
          {
           html : _this._strings['26d1c91c990ee713e2a93e7faf8a21ae'] /* <small> Total Advalue :</small><B> US${advalue_total(#all#)} </B>   */,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           xtype : 'Container'
          },
          {
           'flexy:if' : 'release_is_feed()',
           html : _this._strings['52e6ca91ffeff2db060a1403eb07e992'] /* <small> Total Media Write-up Coverage :</small><B> {media_write_up_total()} </B>   */,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           xtype : 'Container'
          },
          {
           'flexy:if' : 'release_is_feed()',
           html : _this._strings['5a455010b42d6056df9ac7c17682e52b'] /* <small> Total Online News Posting :</small><B> {news_online_posting_total()} </B>   */,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           xtype : 'Container'
          }
         ]
        }
       ]
      },
      {
       blocktype : 'body',
       xns : Roo.mailer,
       '|xns' : 'Roo.mailer',
       xtype : 'Block',
       items  : [
        {
         html : _this._strings['553b4e75b4621742af0fc169b4d97f25'] /* Distribution Details */,
         level : 2,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         xtype : 'Header'
        }
       ]
      },
      {
       blocktype : 'row',
       xns : Roo.mailer,
       '|xns' : 'Roo.mailer',
       xtype : 'Block',
       items  : [
        {
         column : 'left',
         xns : Roo.mailer,
         '|xns' : 'Roo.mailer',
         xtype : 'Column',
         items  : [
          {
           html : _this._strings['790d59ef178acbc75d233bf4211763c6'] /* Countries */,
           level : 5,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           xtype : 'Header'
          },
          {
           html : _this._strings['f8998f1fd787adb9dc08b3e91f4e2171'] /* 
           <ul>           
   <li flexy:if="distribution.international">International (Outside of Asia Pacific)</li>           
   <li flexy:foreach="distribution.regions,c">Regional: {c}</li>           
   <li flexy:foreach="distribution.countries,c">{c}</li>           
</ul>
           */ ,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           xtype : 'Container'
          }
         ]
        },
        {
         column : 'right',
         xns : Roo.mailer,
         '|xns' : 'Roo.mailer',
         xtype : 'Column',
         items  : [
          {
           html : _this._strings['3a08e2e340ab29fd9263af48193cbf8e'] /* Languages */,
           level : 5,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           xtype : 'Header'
          },
          {
           html : _this._strings['b2e5425ba7928f8efddb04ce61d2614b'] /* <ul><li flexy:foreach="languages,l">{l}</li></ul> */,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           xtype : 'Container'
          }
         ]
        }
       ]
      },
      {
       blocktype : 'row',
       xns : Roo.mailer,
       '|xns' : 'Roo.mailer',
       xtype : 'Block',
       items  : [
        {
         column : 'left',
         xns : Roo.mailer,
         '|xns' : 'Roo.mailer',
         xtype : 'Column',
         items  : [
          {
           html : _this._strings['0f872003bb73e5f7a8c8e6bb59da52bc'] /* Found on these Search Engines */,
           level : 5,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           xtype : 'Header'
          },
          {
           html : _this._strings['71db76a2a279a14e4952d729d705c157'] /* 
           <ul>           
    <li flexy:foreach="suppliers,s">{s.name}</li>           
</ul>           

           */ ,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           xtype : 'Container'
          }
         ]
        }
       ]
      },
      {
       blocktype : 'body',
       xns : Roo.mailer,
       '|xns' : 'Roo.mailer',
       xtype : 'Block',
       items  : [
        {
         html : _this._strings['fdfd14a238a79f88aab3a7280bb7ccb1'] /* Volume over time */,
         level : 2,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         xtype : 'Header'
        },
        {
         html : _this._strings['7c3a21b4cd6180476ac198f341e9666c'] /* <img src="https://{HTTP_HOST}{baseURL}/PressRelease/DistributionReport/VolumeOverTime/image?release_id={release.id}&days={days}"> */,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         xtype : 'Container'
        }
       ]
      },
      {
       blocktype : 'body',
       xns : Roo.mailer,
       '|xns' : 'Roo.mailer',
       xtype : 'Block',
       items  : [
        {
         html : _this._strings['5bfd1992799a6417b3b25c4373586da8'] /* Breakdown by language */,
         level : 2,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         xtype : 'Header'
        },
        {
         html : _this._strings['3ba45f71401982ffb72268f81537fec3'] /* <img src="https://{HTTP_HOST}{baseURL}/PressRelease/DistributionReport/BreakdownByLanguage/image?release_id={release.id}&days={days}"> */,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         xtype : 'Container'
        }
       ]
      },
      {
       blocktype : 'body',
       xns : Roo.mailer,
       '|xns' : 'Roo.mailer',
       xtype : 'Block',
       items  : [
        {
         html : _this._strings['dd5ba7fb87f4b9c3f95280b06144d396'] /* Breakdown by country */,
         level : 2,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         xtype : 'Header'
        },
        {
         html : _this._strings['a7bea2907eb650d8016e559e7dfcbb0d'] /* <img src="https://{HTTP_HOST}{baseURL}/PressRelease/DistributionReport/BreakdownByCountry/image?release_id={release.id}&days={days}"> */,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         xtype : 'Container'
        }
       ]
      },
      {
       blocktype : 'body',
       'flexy:if' : 'release_is_feed()',
       xns : Roo.mailer,
       '|xns' : 'Roo.mailer',
       xtype : 'Block',
       items  : [
        {
         html : _this._strings['80ef4578af7f6fd57678b5b49abf0db3'] /* Share of Voice By Type of News Coverage */,
         level : 2,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         xtype : 'Header'
        },
        {
         html : _this._strings['6302799cad82c70e780a75f94adccb3c'] /* <img src="https://{HTTP_HOST}{baseURL}/PressRelease/DistributionReport/BreakdownByNewsCoverage/image?release_id={release.id}&days={days}"> */,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         xtype : 'Container'
        }
       ]
      },
      {
       blocktype : 'body',
       'flexy:if' : 'hasClippingsDist()',
       xns : Roo.mailer,
       '|xns' : 'Roo.mailer',
       xtype : 'Block',
       items  : [
        {
         html : _this._strings['48cf7b62b0ae1dfeb5149e8e237d0c91'] /* Top Media by Reach - Media Write-up Coverage */,
         level : 2,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         xtype : 'Header'
        },
        {
         html : _this._strings['c4969a309475aca5ebd7ebc92191d4f7'] /* 
         <table width="100%">         
    <tr style="font-weight:bold"><td><small>Source</small></td><td><small>Source Link</small></td><td><small>Download</small></td><td><small>Circulation</small></td></tr>         
    <tr flexy:foreach="release.clippings_dist,c">         
        <td style="width:50%"><small>{c.media_name} ({c.language_tr})</small></td>         
        <td><a href="{c.remote_url}" target="_new"><img src="https://{t.HTTP_HOST}{t.rootURL}/Pman/templates/images/view-document.gif" title="View"/></a></td>         
        <td><a href="https://{HTTP_HOST}{baseURL}/Clipping/View/download/{c.id}.pdf?authkey=" target="_new"><img src="https://{t.HTTP_HOST}{t.rootURL}/Pman/templates/images/save.gif" title="Download"/></a></td>         
        <td><small>{c.circulationFormated()}</small></td>         
    </tr>         
             
 </table>         

         */ ,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         xtype : 'Container'
        }
       ]
      },
      {
       blocktype : 'body',
       'flexy:if' : 'hasClippingsDistFeed()',
       xns : Roo.mailer,
       '|xns' : 'Roo.mailer',
       xtype : 'Block',
       items  : [
        {
         html : _this._strings['d03b57561f46520029ba6df8f941c1cd'] /* Top Media by Reach - Online News Posting */,
         level : 2,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         xtype : 'Header'
        },
        {
         html : _this._strings['40f5c2ed25804bc5229fc0d30ffcf8a4'] /* 
         <table width="100%">         
    <tr style="font-weight:bold"><td><small>Source</small></td><td><small>Source Link</small></td><td><small>Download</small></td><td><small>Circulation</small></td></tr>         
    <tr flexy:foreach="release.clippings_dist_feed,c">         
        <td style="width:50%"><small>{c.media_name} ({c.language_tr})</small></td>         
        <td><a href="{c.remote_url}" target="_new"><img src="https://{t.HTTP_HOST}{t.rootURL}/Pman/templates/images/view-document.gif" title="View"/></a></td>         
        <td><a href="https://{HTTP_HOST}{baseURL}/Clipping/View/download/{c.id}.pdf?authkey=" target="_new"><img src="https://{t.HTTP_HOST}{t.rootURL}/Pman/templates/images/save.gif" title="Download"/></a></td>         
        <td><small>{c.circulationFormated()}</small></td>         
    </tr>         
             
 </table>         

         */ ,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         xtype : 'Container'
        }
       ]
      },
      {
       blocktype : 'body',
       'flexy:if' : 'hasClippings()',
       xns : Roo.mailer,
       '|xns' : 'Roo.mailer',
       xtype : 'Block',
       items  : [
        {
         html : _this._strings['ff562acaea20914448cb40525abd2623'] /* Media Write-up Coverage */,
         level : 2,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         xtype : 'Header'
        }
       ]
      },
      {
       blocktype : 'row',
       'flexy:foreach' : 'release.clippings,clip',
       xns : Roo.mailer,
       '|xns' : 'Roo.mailer',
       xtype : 'Block',
       items  : [
        {
         column : 'left',
         html : _this._strings['e28787c9b209f2a0dbfc21545ed4f3bc'] /* 
         <a href="https://{t.HTTP_HOST}{t.baseURL}/Clipping/View/download/{clip.id}.pdf?authkey={t.authKey}"><img          
			width="200"         
			mailembed="no"         
			src="https://{t.HTTP_HOST}{t.baseURL}/Clipping/View/thumb/{clip.id}.jpg?authkey={t.authKey}"></a>
         */ ,
         width : 200,
         xns : Roo.mailer,
         '|xns' : 'Roo.mailer',
         xtype : 'Column'
        },
        {
         column : 'right',
         html : _this._strings['1992faaf8cfa18ac4578e08c4d7f6bff'] /* 
                   
Headline: <a href="http://{t.HTTP_HOST}/index.php/Clipping/View/download/{clip.id}.pdf?authkey={t.authKey}"><B>{clip.headline()}</b></a><br/>         
Media Title: {clip.media_name} <br/>         
Published: {clip.published()} <br/>         
Country: {clip.country(#en#)} <br/>         
Language: {clip.language(#en#)}<br/>         
AdValue: US${clip.advalue} <br/>         
Circulation: {clip.circulationFormated()}<br/>         
URL: <a target="_new" href="{clip.remote_url}">{clip.media_name}</a><br/>         
<br/>         
 
         */ ,
         width : 340,
         xns : Roo.mailer,
         '|xns' : 'Roo.mailer',
         xtype : 'Column'
        }
       ]
      },
      {
       blocktype : 'body',
       'flexy:if' : 'hasClippingsFeed()',
       xns : Roo.mailer,
       '|xns' : 'Roo.mailer',
       xtype : 'Block',
       items  : [
        {
         html : _this._strings['e65bd2101f7b815610283c6209da6e93'] /* Online News Posting */,
         level : 2,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         xtype : 'Header'
        }
       ]
      },
      {
       blocktype : 'row',
       'flexy:foreach' : 'release.clippings_feed,clip',
       xns : Roo.mailer,
       '|xns' : 'Roo.mailer',
       xtype : 'Block',
       items  : [
        {
         column : 'left',
         html : _this._strings['e63c9f056ac343dbafa63d3209bda690'] /* 
         <a href="http://{t.HTTP_HOST}{t.baseURL}/Clipping/View/download/{clip.id}.pdf?authkey={t.authKey}"><img          
			width="200"         
			mailembed="no"         
			src="http://{t.HTTP_HOST}{t.baseURL}/Clipping/View/thumb/{clip.id}.jpg?authkey={t.authKey}"></a>
         */ ,
         width : 200,
         xns : Roo.mailer,
         '|xns' : 'Roo.mailer',
         xtype : 'Column'
        },
        {
         column : 'right',
         html : _this._strings['1992faaf8cfa18ac4578e08c4d7f6bff'] /* 
                   
Headline: <a href="http://{t.HTTP_HOST}/index.php/Clipping/View/download/{clip.id}.pdf?authkey={t.authKey}"><B>{clip.headline()}</b></a><br/>         
Media Title: {clip.media_name} <br/>         
Published: {clip.published()} <br/>         
Country: {clip.country(#en#)} <br/>         
Language: {clip.language(#en#)}<br/>         
AdValue: US${clip.advalue} <br/>         
Circulation: {clip.circulationFormated()}<br/>         
URL: <a target="_new" href="{clip.remote_url}">{clip.media_name}</a><br/>         
<br/>         
 
         */ ,
         width : 340,
         xns : Roo.mailer,
         '|xns' : 'Roo.mailer',
         xtype : 'Column'
        }
       ]
      },
      {
       blocktype : 'body',
       xns : Roo.mailer,
       '|xns' : 'Roo.mailer',
       xtype : 'Block',
       items  : [
        {
         html : _this._strings['76c5232418eec0a94c56dd5ac98daa91'] /* Historical Comparison */,
         level : 2,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         xtype : 'Header'
        },
        {
         html : _this._strings['bc95d77e53cbe571952328a7727a57a8'] /* 
         <table width="100%" style="table-layout:fixed;font-size:14px;">         
    <thead>         
      <tr style="font-weight:bold"><td>Date</td><td>Headline</td><td>Clippings</td><td>Circulation</td><td>Advalue</td></tr>         
  </thead>         
    <tbody flexy:foreach="history,h">         
    <tr>         
        <td ><small> {h.publish_dt(#d/M/Y#)} </small></td>         
        <td colspan="4" style="word-wrap: break-word;"><small> #{h.id} {h.headline}</small> </td>         
    </tr>         
    <tr style="font-weight:bold">         
        <td>&nbsp;</td>         
        <td>&nbsp;</td>         
        <td><small>{h.clipping_total}</small></td>         
        <td><small>{h.reach_total}</small></td>         
        <td><small>{h.advalue_total}</small></td>         
    </tr>         
    </tbody>         
 </table>         
  
         */ ,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         xtype : 'Container'
        }
       ]
      },
      {
       blocktype : 'footer',
       html : _this._strings['433d3c16a783c0427da55ee22f803f06'] /* 
        The news clipping shall not be copied, redistributed, reproduced or passed on       
        directly or indirectly to any 3rd party in whole or in part for any purpose at anytime.       
        This news clipping is intended for client's internal usage only.       

       */ ,
       xns : Roo.mailer,
       '|xns' : 'Roo.mailer',
       xtype : 'Block'
      }
     ]
    }
   ]
  };  }
});
