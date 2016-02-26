//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.PressReleaseImage = {

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
    center : {
     '|xns' : 'Roo',
     xtype : 'LayoutRegion',
     xns : Roo,
     titlebar : false
    },
    '|xns' : 'Roo',
    modal : true,
    collapsible : false,
    background : true,
    title : "Edit Image Details",
    xtype : 'LayoutDialog',
    width : 580,
    xns : Roo,
    closable : false,
    resizable : false,
    height : 400,
    buttons : [
      {
       '|xns' : 'Roo',
       text : "Cancel",
       xtype : 'Button',
       xns : Roo,
       listeners : {
        click : function() {
         
                                             _this.form.reset();
         
                                             _this.dialog.hide();
         
                                         }
       }
      },
{
       '|xns' : 'Roo',
       text : "OK",
       xtype : 'Button',
       xns : Roo,
       listeners : {
        click : function() {
         
                                             _this.dialog.el.mask("Saving");
         
                                             _this.form.doAction("submit");
         
                                         }
       }
      }
    ],
    items : [
     {
      '|xns' : 'Roo',
      fitToFrame : true,
      background : true,
      region : 'center',
      xtype : 'ContentPanel',
      xns : Roo,
      items : [
       {
        '|xns' : 'Roo.form',
        url : baseURL + '/Roo/Images.php',
        xtype : 'Form',
        style : 'margin: 5px',
        method : 'POST',
        xns : Roo.form,
        listeners : {
         actionfailed : function (_self, action)
          {
              _this.dialog.el.unmask();
              Pman.standardActionFailed(_self, action);
          },
         actioncomplete : function (_s, action)
          {
              
             if (action.type =='submit') {
                 
                 _this.dialog.el.unmask();
                 _this.dialog.hide();
                 
                  if (_this.callback) {
                     _this.callback.call(_this, _this.form.getValues());
                  }
                  _this.form.reset();
                  return;
              }
          },
         rendered : function (_self)
          {
              _this.form = _self;
          }
        },
        items : [
         {
          '|xns' : 'Roo.form',
          labelAlign : 'top',
          xtype : 'Column',
          width : 200,
          xns : Roo.form,
          items : [
           {
            '|xns' : 'Roo.form',
            fieldLabel : 'Image Preview',
            xtype : 'DisplayImage',
            readOnly : true,
            width : 180,
            renderer : function(v)    {
                return String.format('<img src="{0}/Images/Thumb/200x200/{1}/{2}" width="180">', baseURL, _this.data.id, _this.data.filename);
                },
            xns : Roo.form,
            name : 'filename'
           }
          ]

         },
         {
          '|xns' : 'Roo.form',
          labelAlign : 'top',
          xtype : 'Column',
          width : 320,
          xns : Roo.form,
          items : [
           {
            '|xns' : 'Roo.form',
            fieldLabel : 'Press Release Name',
            xtype : 'TextField',
            width : 300,
            xns : Roo.form,
            name : 'title'
           },
           {
            '|xns' : 'Roo.form',
            fieldLabel : 'Photo Release Text',
            xtype : 'TextArea',
            width : 300,
            xns : Roo.form,
            name : 'descript',
            height : 100
           },
           {
            '|xns' : 'Roo.form',
            fieldLabel : 'Source',
            xtype : 'TextField',
            width : 300,
            xns : Roo.form,
            name : 'source'
           },
           {
            '|xns' : 'Roo.form',
            fieldLabel : 'Credit',
            xtype : 'TextField',
            width : 300,
            xns : Roo.form,
            name : 'credit'
           },
           {
            store : {
             proxy : {
              '|xns' : 'Roo.data',
              url : baseURL + '/Roo/core_enum.php',
              xtype : 'HttpProxy',
              method : 'GET',
              xns : Roo.data
             },
             reader : {
              '|xns' : 'Roo.data',
              id : 'id',
              root : 'data',
              xtype : 'JsonReader',
              xns : Roo.data,
              fields : [{"name":"id","type":"int"},{"name":"name","type":"string"}],
              totalProperty : 'total'
             },
             '|xns' : 'Roo.data',
             xtype : 'Store',
             remoteSort : true,
             sortInfo : { direction : 'ASC', field: 'id' },
             xns : Roo.data,
             listeners : {
              beforeload : function (_self, o){
                   o.params = o.params || {};
                   // set more here
                   o.params.etype="Image Types";
               }
             },
             items : [

             ]

            },
            '|xns' : 'Roo.form',
            alwaysQuery : true,
            listWidth : 400,
            triggerAction : 'all',
            fieldLabel : 'Type',
            forceSelection : true,
            selectOnFocus : true,
            pageSize : 20,
            displayField : 'name',
            emptyText : "Select Image type",
            minChars : 2,
            valueField : 'name',
            xtype : 'ComboBox',
            typeAhead : true,
            editable : false,
            width : 300,
            xns : Roo.form,
            name : 'imgtype',
            qtip : "Select Image type",
            queryParam : 'query[name]',
            tpl : '<div class=\"x-grid-cell-text x-btn button\"><b>{name}</b> </div>',
            loadingText : "Searching...",
            items : [

            ]

           }
          ]

         },
         {
          '|xns' : 'Roo.form',
          xtype : 'Hidden',
          xns : Roo.form,
          name : 'id'
         }
        ]

       }
      ]

     }
    ]

   });
 }
};
