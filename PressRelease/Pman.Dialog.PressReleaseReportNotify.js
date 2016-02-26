//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Pman.Dialog');

Pman.Dialog.PressReleaseReportNotify = {

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
                xns : Roo
            },
            '|xns' : 'Roo',
            modal : true,
            collapsible : false,
            title : "Edit / Create Report Notification",
            xtype : 'LayoutDialog',
            width : 400,
            xns : Roo,
            closable : false,
            resizable : false,
            height : 180,
            buttons : [
            	 {
            	        '|xns' : 'Roo',
            	        text : "Send now",
            	        xtype : 'Button',
            	        xns : Roo,
            	        listeners : {
            	        	click : function (_self, e)
            	        	   {
            	        	       
            	        	       if (!_this.form.isValid()) {
            	        	           Roo.MessageBox.alert("Error", "Please fill in the details");
            	        	           return;
            	        	       }
            	        	       
            	        	       new Pman.Request({
            	        	           url : baseURL + '/PressRelease/DistributionReport',
            	        	           method : 'POST',
            	        	           mask : 'Sending',
            	        	           params : {
            	        	               days : _this.form.findField('act_when_days').getValue(),
            	        	               email : _this.form.findField('to_email').getValue(),
            	        	               id : _this.form.findField('onid').getValue()
            	        	           },
            	        	           success : function() {
            	        	               Roo.MessageBox.alert("Sent", "Message has been sent");
            	        	           }
            	        	      
            	        	      });
            	        	      
            	        	       
            	        	       
            	        	   }
            	        }
            	    },
{
            	        '|xns' : 'Roo',
            	        text : "Cancel",
            	        xtype : 'Button',
            	        xns : Roo,
            	        listeners : {
            	        	click : function (_self, e)
            	        	   {
            	        	       _this.dialog.hide();
            	        	   }
            	        }
            	    },
{
            	        '|xns' : 'Roo',
            	        text : "Save",
            	        xtype : 'Button',
            	        xns : Roo,
            	        listeners : {
            	        	click : function (_self, e)
            	        	   {
            	        	       // do some checks?
            	        	        
            	        	       
            	        	       
            	        	       _this.form.doAction("submit");
            	        	   
            	        	   }
            	        }
            	    }
            ],
            items : [
            	{
                    '|xns' : 'Roo',
                    region : 'center',
                    xtype : 'ContentPanel',
                    xns : Roo,
                    items : [
                    	{
                            '|xns' : 'Roo.form',
                            url : baseURL + '/Roo/core_notify.php',
                            method : 'POST',
                            xtype : 'Form',
                            style : 'margin:10px;',
                            labelAlign : 'right',
                            xns : Roo.form,
                            labelWidth : 150,
                            listeners : {
                            	actioncomplete : function(_self,action)
                            	   {
                            	       if (action.type == 'setdata') {
                            	          //_this.dialog.el.mask("Loading");
                            	          if (_this.data.id) { 
                            	               this.load({ method: 'GET', params: { '_id' : _this.data.id }});
                            	               return;
                            	           }
                            	          
                            	          this.findField('act_when_dis').setValue("");
                            	          
                            	          return;
                            	       }
                            	       if (action.type == 'load') {
                            	           this.findField('act_when_dis').updateFromWhen();
                            	           return;
                            	       }
                            	       if (action.type =='submit') {
                            	       
                            	          
                            	           _this.dialog.hide();
                            	       
                            	            if (_this.callback) {
                            	               _this.callback.call(_this, _this.form.getValues());
                            	            }
                            	            _this.form.reset();
                            	            return;
                            	       }
                            	   },
                            	rendered : function (form)
                            	   {
                            	       _this.form= form;
                            	   }
                            },
                            items : [
                            	{
                                    '|xns' : 'Roo.form',
                                    allowBlank : false,
                                    name : 'act_when_days',
                                    width : 50,
                                    xtype : 'NumberField',
                                    allowDecimals : false,
                                    xns : Roo.form,
                                    fieldLabel : 'Days after release',
                                    allowNegative : false,
                                    minValue : 1,
                                    maxValue : 15,
                                    listeners : {
                                    	valid : function (_self)
                                    	   {
                                    	       _this.form.findField('act_when_dis').updateVal();
                                    	   }
                                    }
                                },
                            	{
                                    '|xns' : 'Roo.form',
                                    xtype : 'Row',
                                    labelSeparator : '',
                                    xns : Roo.form,
                                    width : 200,
                                    items : [
                                    	{
                                            '|xns' : 'Roo.form',
                                            name : 'act_when_dis',
                                            width : 200,
                                            updateVal : function() {
                                               var tz = _this.form.findField('act_when_tz').getValue();
                                               var reltime = _this.data.release_dt;
                                               var parts = tz.split('.');
                                               
                                               var hkt = reltime.add(Date.HOUR, -1 * parts[0]).add(Date.MINUTE, -1 * parts[1]).add(Date.HOUR, 8);
                                               
                                               var days = 1*  _this.form.findField('act_when_days').getValue();
                                               var disptime = reltime.add(Date.DAY,days);
                                               Roo.log([ hkt, hkt.add(Date.DAY,days) ]);
                                               var act_when = hkt.add(Date.DAY,days).format('Y-m-d H:i:s');
                                               Roo.log('set actwhen = ' + act_when);
                                               _this.form.findField('act_start').setValue(act_when);
                                               this.setValue(disptime.format('d/M/Y h:ia') + ' (GMT+'+tz+')');
                                            
                                             },
                                            xtype : 'DisplayField',
                                            xns : Roo.form,
                                            updateFromWhen : function() {
                                            
                                               var tz = _this.form.findField('act_when_tz').getValue();
                                               var reltime = _this.data.release_dt;
                                               var parts = tz.split('.');
                                               
                                            
                                               
                                               var hkt = reltime.add(Date.HOUR, -1 * parts[0]).add(Date.MINUTE, -1 * parts[1]).add(Date.HOUR, 8);
                                               
                                               var dt = Date.parseDate (
                                                    _this.form.findField('act_start').getValue()
                                                 , "Y-m-d H:i:s");
                                            
                                               var diff =  Math.round(dt.getElapsed(hkt) / (1000 * 60 * 60 * 24));
                                               this.form.findField('act_when_days').setValue(diff);
                                               this.updateVal();
                                             }
                                        }
                                    ]

                                },
                            	{
                                    '|xns' : 'Roo.form',
                                    name : 'to_email',
                                    width : 200,
                                    xtype : 'TextField',
                                    xns : Roo.form,
                                    fieldLabel : 'To',
                                    vtype : 'email'
                                },
                            	{
                                    '|xns' : 'Roo.form',
                                    xtype : 'Hidden',
                                    xns : Roo.form,
                                    name : 'id'
                                },
                            	{
                                    '|xns' : 'Roo.form',
                                    xtype : 'Hidden',
                                    xns : Roo.form,
                                    name : 'onid'
                                },
                            	{
                                    '|xns' : 'Roo.form',
                                    xtype : 'Hidden',
                                    xns : Roo.form,
                                    name : 'ontable'
                                },
                            	{
                                    '|xns' : 'Roo.form',
                                    xtype : 'Hidden',
                                    xns : Roo.form,
                                    name : 'evtype'
                                },
                            	{
                                    '|xns' : 'Roo.form',
                                    xtype : 'Hidden',
                                    xns : Roo.form,
                                    name : 'act_start'
                                },
                            	{
                                    '|xns' : 'Roo.form',
                                    xtype : 'Hidden',
                                    xns : Roo.form,
                                    name : 'act_when_tz'
                                }
                            ]

                        }
                    ]

                }
            ]

        });
    }
};
