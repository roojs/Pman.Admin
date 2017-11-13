
Roo.onReady(function(){
    
    Roo.each(Roo.select('i.trigger', true).elements, function(t){
        
        t.on('click', function(e){
            
            e.preventDefault();
            
            var parent = t.findParent('div.rejected', false, true);
        
            parent.toggleClass('expanded');
        });
        
    });
    
});