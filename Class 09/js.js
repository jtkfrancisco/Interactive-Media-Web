$(".section1").click(function(){
	$(window).scrollTo(".section2",2000);
})

$(".section2").click(function(){
	$(window).scrollTo(".section1",2000);
})

var apiURL ="https://api.openweathermap.org/data/2.5/weather?q=Toronto,ca&appid=43951fde831b13d6b31b5c68c389d843"
//project challenge
//open weather map key:
//43951fde831b13d6b31b5c68c389d843
//

$.ajax({
	url: apiURL,
	success: function(cData){
		console.log("working");
		$(".section3").html("the current temp is "+(cData.main.temp-273.15).toFixed(1)+"&deg; in Toronto");

	}
})




//24hrs in kiev
//d3 
//due on the 11th


