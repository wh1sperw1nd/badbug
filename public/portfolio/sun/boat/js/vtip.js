$(document).ready(function() {
			setTimeout("cloudone()",10);
			setTimeout("cloudtwo()",10);
			setTimeout("cloudthree()",10);
			setTimeout("boat()",10);
});
	function cloudone(){
		$("#cloudone").animate({left:"+=1200px"},10000).animate({left:"-200px"}, 0)
		setTimeout("cloudone()",10000);
	}
	function cloudtwo(){
		$("#cloudtwo").animate({left:"+=1500px"},15000).animate({left:"-300px"}, 0)
		setTimeout("cloudtwo()",15000);
	}
	function cloudthree(){
		$("#cloudthree").animate({left:"+=2000px"},20000).animate({left:"-600px"}, 0)
		setTimeout("cloudthree()",20000);
	}
	function boat(){
		$("#boat").animate({right:"+=1000px"},20000).animate({right:"-200px"}, 0)
		setTimeout("boat()",20000);
	}	
	

