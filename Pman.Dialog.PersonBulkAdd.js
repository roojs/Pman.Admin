//<script type="text/javascript">
// for needed for new person in External contacts...



// needs adding to init!!!!
Pman.on('beforeload', function() {
     // new - company/office pulldowns.
     // used by pman
    Pman.Dialog.PersonBulkAdd = new Pman.Dialog.PersonEditor({
        type : 'new',
        dialogConfig : {
            title: "Bulk add Contacts",
            height: 350 // slightly taller..
        },
        itemList : [
            'company_id_name',
            'office_id_name',
            'bulklist',
            
            'id',   // 0
            'active'
         
            
        ]
    });
    
    
    
    
});