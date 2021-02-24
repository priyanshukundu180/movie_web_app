
Ext.application({
  name : 'Priyanshu Kundu',

  launch : function() {
    
    Ext.define('Movies', {
         extend: 'Ext.data.Model',
     pageSize:5,
         fields: ['film_id','title', 'description', 'release_year', 'name', 'rating', 'special_features']
       });
    

 Ext.define('languages', {
         extend: 'Ext.data.Model',
     pageSize:5,
         fields: ['name']
       });

 Ext.define('rating', {
         extend: 'Ext.data.Model',
     pageSize:5,
         fields: ['rating']
       });
 Ext.define('sf', {
         extend: 'Ext.data.Model',
     pageSize:5,
         fields: ['special_features']
       });


 var lang_store = Ext.create('Ext.data.Store', {
     model: 'languages',
     proxy: {
         type: 'ajax',
         url: 'http://localhost:8080/JAVA_Training/language',
         reader: {
             type: 'json',
             
         }
     },
     autoLoad: true
});


var rating_store=Ext.create('Ext.data.Store', {
  model: 'rating',
     proxy: {
         type: 'ajax',
         url: 'http://localhost:8080/JAVA_Training/rating',
         reader: {
             type: 'json',
             
         }
     },
     autoLoad: true
   
});


var sf_store=Ext.create('Ext.data.Store', {
  model: 'rating',
     proxy: {
         type: 'ajax',
         url: 'http://localhost:8080/JAVA_Training/specialfeaturesDropdown',
         reader: {
             type: 'json',
             
         }
     },
     autoLoad: true
   
});






var myform=Ext.create('Ext.form.Panel', {
        renderTo: document.body,
        title: 'Movie Advance Search',        
        bodyPadding: 50,
      buttonAlign : 'center',   
        items: [{
          defaultType: 'textfield',
                  layout : 'hbox',
          width : '100%',
          align:'center',
          border: false, 
          bodyPadding: 5,      
          items:[
              {
                  fieldLabel: 'Movie Name',
                  name: 'movieName',
            width:300,
            margin:'5 50 5 150',
			Id:'name_search',
              },
              {
                  fieldLabel: 'Director Name',
                  name: 'directorName',
            width:300,
            margin:'5 50 5 50'
              }],
          }, {
          defaultType: 'textfield',
                  layout : 'hbox',
          width : '100%',
          align:'center',
          border: false, 
          bodyPadding: 5,          
          items:[
              {
                  xtype: 'datefield',
                  fieldLabel: 'Release Year',
                  name: 'releaseYear',
				Id:'release_search',
				format: 'Y',
            width:300,
            margin:'5 50 5 150'          
              },
          {
            xtype: 'combobox',
                  fieldLabel: 'Language',
                  name: 'language',
            width:300,
            margin:'5 50 5 50',
			Id:'language_search'  ,
			label: 'Choose Language',
			displayField: 'name',
			 store:lang_store,
		queryMode: 'local'
      
              }]
        }
        ],

      buttons: [{
                text: 'Search',
                 //only enabled once the form is valid
                
		handler: function(button){
			
			var form = button.up('form').getForm();
			var gridPanel = Ext.ComponentQuery.query('grid[itemId=gateOprtnsGridIdddddd]')[0];
            var store=gridPanel.getStore();
			console.log(myform.getForm().getValues());
			
			if( myform.getForm().getValues().movieName)
			store.filter('title', myform.getForm().getValues().movieName);
			
			
			
			if( myform.getForm().getValues().releaseYear)
			store.filter('release_year', myform.getForm().getValues().releaseYear);
			
			if( myform.getForm().getValues().Language)
			store.filter('name', myform.getForm().getValues().Language);
			var formData = this.up('form').getForm(); 
			console.log(formData);
			formData.submit();

			
		

			//window.location.reload();


		}
               
            },
          {
				xtype: 'button',
                text: 'Reset',
				handler: function(){
					
					console.log(myform.getForm().getValues());
					console.log(myform.getForm().getValues());
					myform.getForm().reset();
					
					
					var gridPanel = Ext.ComponentQuery.query('grid[itemId=gateOprtnsGridIdddddd]')[0];
            		var store=gridPanel.getStore();
					store.clearFilter();
					
					
					
            }

            }],
    });
    


var formPanel2 = Ext.create('Ext.form.Panel',{
	xtype:'form',
	id:'formPanel2',
	target : document.getElementById('buttonId'),
	items: [{
		xtype : 'textfield',
		name:'film_id',
		itemId:'donid',
		fieldLabel: 'film_id',
		allowBlank: false,
		labelSeparator : '<span style="color:red">*</span>:',
		width:'95%',
		margin:{top:'5'},
		
	},{
		xtype : 'textfield',
		name:'title',
		itemId:'doni',
		fieldLabel: 'title',
		allowBlank: false,
		labelSeparator : '<span style="color:red">*</span>:',
		width:'95%',
		margin:{top:'5'},
	},
	{
		xtype : 'textfield',
		name:'description',
		itemId:'desc',
		fieldLabel: 'Description',
		allowBlank: false,
		labelSeparator : '<span style="color:red">*</span>:',
		width:'95%',
		margin:{top:'5'},
	},
	{
		xtype : 'datefield',
		name:'release_year',
		itemId:'rely',
		fieldLabel: 'Release Year',
		allowBlank: false,
		format: 'Y',
		labelSeparator : '<span style="color:red">*</span>:',
		width:'95%',
		margin:{top:'5'},
	},
	
	{
		xtype : 'textfield',
		name:'Language',
		itemId:'lang',
		fieldLabel: 'language',
		allowBlank: false,
		labelSeparator : '<span style="color:red">*</span>:',
		width:'95%',
		margin:{top:'5'}
	},
	{
		xtype: 'combobox',
                  fieldLabel: 'Rating',
                  name: 'rating',
           
            
			itemId:'ra'  ,
			labelSeparator : '<span style="color:red">*</span>:',
			width:'95%',
			label: 'Choose Rating',
			displayField: 'rating',
			 store:rating_store,
		queryMode: 'local'
	},
	
{
		xtype: 'combobox',
                  fieldLabel: 'Special Features',
                  name: 'special_features',
           
            
			itemId:'sf'  ,
			labelSeparator : '<span style="color:red">*</span>:',
			width:'95%',
			label: 'Choose SF',
			displayField: 'special_features',
			 store:sf_store,
		queryMode: 'local'
	}
	
	],
	buttons: [{
		xtype:'button',
		text: 'Edit',
		handler: function(button){
			var values = formPanel2.getForm().getValues();
			console.log(values);
			
			Ext.Ajax.request({
				url:'http://localhost:8080/JAVA_Training/edit',
				method:'POST',
				params:{
					id:values.film_id,
					title:values.title,
					desc:values.description,
					rely:values.release_year,
					rating:values.rating,
					language:values.Language,
					spf:values.special_features
					
				},
				success:function(){
					Ext.toast( 'Your data is updated for '+values.title);
                     paging.reload();
//paging.load();

				},
				failure: function(){
					Ext.toast('Your data could not be updated');
				}
				
				
			});
		


			win2.close();
		

			//window.location.reload();


		}
	},{
		text: 'Cancel',
		handler: function(){
			win2.close();
		}
	}],
	buttonAlign: 'center',


});


//form for add

var form = Ext.create('Ext.form.Panel',{
		xtype:'form',
	id:'form',
	target : document.getElementById('buttonId'),
	items: [{
		xtype : 'textfield',
		name:'film_id',
		itemId:'donid',
		fieldLabel: 'film_id',
		allowBlank: false,
		labelSeparator : '<span style="color:red">*</span>:',
		width:'95%',
		margin:{top:'5'}
		
	},{
		xtype : 'textfield',
		name:'title',
		itemId:'doni',
		fieldLabel: 'title',
		allowBlank: false,
		labelSeparator : '<span style="color:red">*</span>:',
		width:'95%',
		margin:{top:'5'},
	},
	{
		xtype : 'textfield',
		name:'description',
		itemId:'desc',
		fieldLabel: 'description',
		allowBlank: false,
		labelSeparator : '<span style="color:red">*</span>:',
		width:'95%',
		margin:{top:'5'},
	},
	{
		xtype : 'datefield',
		name:'release_year',
		itemId:'rely',
		fieldLabel: 'release_year',
		allowBlank: false,
		format: 'Y',
		labelSeparator : '<span style="color:red">*</span>:',
		width:'95%',
		margin:{top:'5'},
	},
	{
		xtype : 'textfield',
		name:'name',
		itemId:'na',
		fieldLabel: 'Language',
		allowBlank: false,
		labelSeparator : '<span style="color:red">*</span>:',
		width:'95%',
		margin:{top:'5'},
	},
	
	{
		xtype: 'combobox',
                  fieldLabel: 'Rating',
                  name: 'rating',
           
            
			itemId:'ra'  ,
			labelSeparator : '<span style="color:red">*</span>:',
			width:'95%',
			label: 'Choose Rating',
			displayField: 'rating',
			 store:rating_store,
		queryMode: 'local'
	},
	
{
		xtype: 'combobox',
                  fieldLabel: 'Special Features',
                  name: 'special_features',
           
            
			itemId:'sf'  ,
			labelSeparator : '<span style="color:red">*</span>:',
			width:'95%',
			label: 'Choose SF',
			displayField: 'special_features',
			 store:sf_store,
		queryMode: 'local'
	}
	
	
	
	
	
	
	
	],
	buttons: [{
		xtype:'button',
		text: 'Save',
		handler: function(button){
			var values = form.getForm().getValues();
			
			console.log(values);
			Ext.Ajax.request({
				url:'http://localhost:8080/JAVA_Training/add',
				method:'POST',
				params:{
					title: values.title,
					
					
					id:values.film_id,
					
					desc:values.description,
					rely:values.release_year,
					
					lang:values.name,
					rating:values.rating,
					special_features:values.special_features
					
					
					
				},
				success:function(){
					Ext.toast( 'Your data is Added for '+values.title);
		
				},
				failure: function(){
					Ext.toast('Your data could not be added');
				}
				
				
			});
		


			panel.close();
			paging.reload();
			

			

		}
	},{
		text: 'Cancel',
		handler: function(){
			win2.close();
		}
	}],
	buttonAlign: 'center',


});









var win2 = Ext.create('Ext.window.Window', {
    title: 'Add Movie Details',
    height: 500,
    width: 500,
    target : document.getElementById('buttonId'),
    layout: 'fit',
    items:[formPanel2]

});


	var panel = Ext.create('Ext.window.Window', {
    title: 'Add Movie Details',
    height: 500,
    width: 500,
    target : document.getElementById('buttonId'),
    layout: 'fit',
    items:[form]

});






var paging = Ext.create('Ext.data.Store',{
storeId:'paging',
model:'Movies',
storeId:'PagingStore',
enablePaging: true,
autoLoad: {params: {start: 0, limit: 10}},
pageSize:10,
proxy:{
type:'memory',
pageSize:10,
enablePaging:true,
reader:{
rootProperty:'data'
},},})








var title='';
var desc='';
var ry='';
var film_id='';
var lang='';
var rating='';
var special_features='';
Ext.application({
    name: 'Fiddle',

    launch: function() {
     var temp_store=Ext.define('DashBoard.store.GteOprtnsMntrngSore', {
            extend: 'Ext.data.Store',
			autoSync : true,
			autoLoad:true,
			pageSize:5,
			storeId:'DescriptionStore',
            alias: 'store.gtoprtnsmntrng',
			       model: 'Movies',
            enablePaging: true,
     
    

            fields: ['film_id','title', 'description', 'release_year', 'name','rating','special_features'],
            autoLoad: true,
            proxy: {
                url: 'http://localhost:8080/JAVA_Training/loads',
				enablePaging: true,
				 type: 'memory',
                type: 'ajax',
                reader: {
                    type: 'json'
                }
            },
			
			
	
		listeners:{
		load:function(){
		var store = Ext.data.StoreManager.lookup('DescriptionStore');
        
		var paging=Ext.data.StoreManager.lookup('PagingStore')
		paging.getProxy().setData(store.getRange());
		paging.load();}
}
        });



















      Ext.define('DashBoard.view.main.GateOprtnsMntrng', {
            extend: 'Ext.grid.Panel',
            xtype: 'gtOprtnsGrd',
 			id: 'mainPanel',
            itemId: 'gateOprtnsGridIdddddd',
			selModel: 'checkboxmodel',
            scrollable: true,
            requires: ['DashBoard.store.GteOprtnsMntrngSore'],
			pageSize:5,
			renderTo: Ext.getBody(),
			store: Ext.data.StoreManager.lookup('PagingStore'),
		  dockedItems: [{
              xtype: 'pagingtoolbar',
               store: Ext.data.StoreManager.lookup('PagingStore'),
              displayInfo: true,
              dock: 'top',
                displayMsg: 'Displaying {0} to {1} of {2} records ',
                emptyMsg: "No records to display;",

			items: [{
				xtype: 'button',
				text: 'Add ',
				textAlign: 'center',
				 handler: function() {
	                panel.show();
                              }
            },

{
				
                   
		xtype: 'button',
			text: 'Edit',
			itemId:'editbtn',
			renderTo:Ext.getElementById('buttonId'),
			listeners: {
				click: function() {
					var selected=Ext.getCmp('mainPanel').getSelection();
					if(selected.length==1) {
						selected.map(item => {
							title=item.get('title');
							desc=item.get('description');
							ry=item.get('release_year');
							film_id=item.get('film_id');
							lang=item.get('name');
							rating=item.get('rating');
							special_features=item.get('special_features');
							
						});
						Ext.ComponentQuery.query('#doni')[0].setValue(title);
						Ext.ComponentQuery.query('#desc')[0].setValue(desc);
						Ext.ComponentQuery.query('#rely')[0].setValue(ry);
						Ext.ComponentQuery.query('#donid')[0].setValue(film_id);
						Ext.ComponentQuery.query('#lang')[0].setValue(lang);
						Ext.ComponentQuery.query('#ra')[0].setValue(rating);
						Ext.ComponentQuery.query('#sf')[0].setValue(special_features);
						
						win2.show();
					} else {
                    Ext.Msg.alert('Error', 'Please select only one record');
                	}
				}
			}
		},
		{
				xtype: 'button',
				text: 'Delete',
				textAlign: 'center',
				 listeners: {
					formBind:true, 
                  click: function() {
                     Ext.MessageBox.confirm(
                        'Confirm', 'Are you sure you want to do this ?', callbackFunction);
                     function callbackFunction(btn) {
                        if(btn == 'yes') {
	var selectedRecord = Ext.getCmp('mainPanel').getSelectionModel().getSelection()[0];
	var selected=Ext.getCmp('mainPanel').getSelection();
var row = Ext.getCmp('mainPanel').store.indexOf(selectedRecord);
	paging.remove(selectedRecord);
	paging.sync();
	pkid="";
	val="";
	if(selected.length==1) {
						selected.map(item => {
							
							pkid+=item.get('title');
						    val+=item.get('title');
						});
	Ext.Ajax.request({
		 url: 'http://localhost:8080/JAVA_Training/delete', 

method: 'GET', 
params: { 
	pkid:pkid,
},

   success: function () {
                            Ext.toast('Record Deleted for '+val);
                        },
  failure: function () {
                            Ext.toast('fail');
                        }
		
	
})
}
	
	}
	
	
	
	
                     };
                  }
               }
            },
{
                xtype: 'button',
                text: 'Retrieve',
                handler: function() {
                    var gridPanel = Ext.ComponentQuery.query('grid[itemId=gateOprtnsGridIdddddd]')[0];
                    gridPanel.getStore().loadPage();
                }
            }


]           



}],
           


            store: {
                type: 'gtoprtnsmntrng'
            },
            
            columns: [{
                text: 'Film ID',
                dataIndex: 'film_id',
                flex: 1
            },{
                text: 'Title',
                dataIndex: 'title',
                flex: 1
            }, {
                text: 'description',
                dataIndex: 'description',
                flex: 1
            }, {
                text: 'release_year',
                dataIndex: 'release_year',
				format: 'Y',
                flex: 1
            }, {
                text: 'name',
                dataIndex: 'name',
                flex: 1
            },

 {
                text: 'rating',
                dataIndex: 'rating',
                flex: 1
            },


 {
                text: 'special_features',
                dataIndex:'special_features',
                flex: 1
            },




]
        });


        Ext.create('DashBoard.view.main.GateOprtnsMntrng', {
            renderTo: document.body,
            width: 1300,
            height: 300
        })
    }
});


}









});














