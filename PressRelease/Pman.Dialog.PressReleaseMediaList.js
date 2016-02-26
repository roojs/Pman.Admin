//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Pman.Dialog.PressReleaseMediaList = {

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
            xtype: 'LayoutDialog',
            xns: Roo,
            closable : false,
            height : 110,
            modal : true,
            resizable : false,
            title : "Download Media List",
            width : 400,
            items : [
                {
                    xtype: 'ContentPanel',
                    xns: Roo,
                    region : 'center',
                    items : [
                        {
                            xtype: 'Form',
                            xns: Roo.form,
                            listeners : {
                                rendered : function (form)
                                {
                                   _this.form = form;
                                }
                            },
                            collapsible : true,
                            constraintoviewport : true,
                            draggable : true,
                            fixedcenter : true,
                            height : 0,
                            minButtonWidth : 0,
                            minHeight : 0,
                            minWidth : 0,
                            modal : true,
                            proxyDrag : true,
                            resizable : true,
                            resizeHandles : '',
                            shadow : '',
                            shadowOffset : 0,
                            shim : true,
                            syncHeightBeforeShow : true,
                            tabTag : '',
                            title : "",
                            width : 0,
                            x : 0,
                            y : 0,
                            items : [
                                {
                                    xtype: 'ComboBox',
                                    xns: Roo.form,
                                    allowBlank : 'false',
                                    displayField : 'country_name',
                                    editable : 'false',
                                    emptyText : "Select country",
                                    fieldLabel : 'Country',
                                    forceSelection : true,
                                    hiddenName : 'country',
                                    listWidth : 400,
                                    loadingText : "Searching...",
                                    minChars : 2,
                                    name : 'country',
                                    pageSize : 20,
                                    qtip : "Select pressrelease_contact",
                                    queryParam : '',
                                    selectOnFocus : true,
                                    tpl : '<div class="x-grid-cell-text x-btn button"><b>{country_name}</b> </div>',
                                    triggerAction : 'all',
                                    typeAhead : true,
                                    valueField : 'country',
                                    width : 200,
                                    store : {
                                        xtype: 'Store',
                                        xns: Roo.data,
                                        listeners : {
                                            beforeload : function (_self, o){
                                                o.params = o.params || {};
                                                o.params._distinct = 'country';
                                                o.params._columns = 'country,country_name';
                                                // set more here
                                            }
                                        },
                                        remoteSort : true,
                                        sortInfo : { direction : 'ASC', field: 'country_name' },
                                        proxy : {
                                            xtype: 'HttpProxy',
                                            xns: Roo.data,
                                            method : 'GET',
                                            url : baseURL + '/Roo/pressrelease_contact.php'
                                        },
                                        reader : {
                                            xtype: 'JsonReader',
                                            xns: Roo.data,
                                            id : 'id',
                                            root : 'data',
                                            totalProperty : 'total',
                                            fields : [{"name":"id","type":"int"},{"name":"honor","type":"string"}]
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            center : {
                xtype: 'LayoutRegion',
                xns: Roo
            },
            buttons : [
                {
                    xtype: 'Button',
                    xns: Roo,
                    listeners : {
                        click : function (_self, e)
                        {
                            _this.dialog.hide();
                        }
                    },
                    text : "Cancel"
                },
                {
                    xtype: 'Button',
                    xns: Roo,
                    listeners : {
                        click : function (_self, e)
                        {
                        
                            cn = _this.form.findField('country').getValue();
                            if (!cn.length) {
                                      Roo.MessageBox.alert("Error", "Select a country");
                                    return;
                                }
                        
                              new Pman.Download({
                              
                                url : baseURL + '/PressRelease/MediaListExport/' + cn
                              
                              });
                              
                              _this.dialog.hide();
                              Roo.MessageBox.alert("Notice", "File should start downloading");
                        }
                    },
                    text : "Download"
                }
            ]
        });
    }
};
