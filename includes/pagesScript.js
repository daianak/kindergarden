//the script that pulls out the JSON file dynamically according to requested menu

$(document).ready(function(){

    $.getJSON("includes/menu.json",function(data){
    	//regex check the name current page
    	var menuSection = window.location.href.match(/(\w+)\.html$/i)[1];
//create list with menu content
      var sHTML = "<ul class='price-menu'>";
//for each row of drinks or sweets menu in JSON file- add content into list
      $.each(data[menuSection], function(key, val){
		  console.log(val);
	
			sHTML+= "<li><div class='price'>" + val.price+"</div><div class='thumbnail' style='background-image: url("+val.url+ ")'></div>" + val.name + "</li>";
		});		
		
		
		sHTML += "</ul>";

//	appending llist to the requestedMenu nav in the drinks/sweets page	
		$('#requestedMenu').append(sHTML);        
    });
});