//todo
//animate background based on last refresh time [maybe]
//chatbot flowchart 
//flowchart data storage so users can refelct on how theyve been feeling
//implement settings and suggestions [reset name, manual city]
//make statements reflect sunset times

//changeable settings
var timeDifferenceSetting = 10 //min time in minutes before weather refresh
var fadeTime = 300

//non-changeable settings
//var apiURL ="https://api.openweathermap.org/data/2.5/weather?q="+currentCity+",ca&appid=43951fde831b13d6b31b5c68c389d843"
var d = new Date();
var minute = d.getMinutes();
var hour = d.getHours();
var timeInMinutes = hour*60+minute
var startString3 = "000"
var startString2 = "00"
var startString1 = "0"
var frameTime = 1
var frameName = "0000.png"
var frameURL="0"


//initial name get and storage 
if(localStorage.getItem("userName")==undefined){
	userInput = prompt("Hello, its lovely to meet you. Can I ask your name?")
	// Store
	localStorage.setItem("userName", userInput);
}
//Retrieve and display name
userName = localStorage.getItem("userName");
$(".greeting").text("Hello again, "+userName)

//0 = 0
//6 = 360
//12 = 720
//18 = 1080
//24 = 1440
//greeting case change


if(timeInMinutes>0 && timeInMinutes<360){$(".inquiry").text("It's very early, how are you feeling?")}
if(timeInMinutes>360 && timeInMinutes<540){$(".inquiry").text("how are you feeling this morning?")}
	if(timeInMinutes>540 && timeInMinutes<720){$(".inquiry").text("how are you feeling this afternoon?")}
if(timeInMinutes>720 && timeInMinutes<1080){$(".inquiry").text("how are you feeling this evening?")}
if(timeInMinutes>1080 && timeInMinutes<1440){$(".inquiry").text("how are you feeling tonight?")}

//Get location
function ipLookUp () {
  $.ajax('http://ip-api.com/json')
  .then(
      function success(response) {
          console.log("Your current city is ",response.city);
          currentCity=response.city
          localStorage.setItem("userCity",currentCity)
      },

      function fail(data, status) {
          console.log('Request failed.  Returned status of',status);
      }
  );
}
ipLookUp()

var userCity=localStorage.getItem("userCity")

//Uses openweathermap api data to get current weather info
function weatherUpdate(){
	$.ajax({
	url: "https://api.openweathermap.org/data/2.5/weather?q="+userCity+",ca&appid=43951fde831b13d6b31b5c68c389d843",
	success: function(weather){
		//get, convert, and store weather for later
		temp = (weather.main.temp-273.15).toFixed(0)
		localStorage.setItem("currentTemp",temp)
		console.log("current weather stored as "+temp+"&deg;")

		//display current weather in html
		$(".weatherNumber").html(temp+"&deg; in "+userCity);
		console.log("The cloudiness percentage is "+weather.clouds.all)
		console.log("The humidity percentage is "+weather.main.humidity)

			//check which icon to display based on temp, humidity, and cloudiness
			if(weather.main.humidity>0 && weather.main.humidity<25 && weather.clouds.all>0 && weather.clouds.all<25){
				$(".weatherIcon").attr("src","icons/sunny.png")
				localStorage.setItem("currentIcon","icons/sunny.png")
			}
			if(weather.main.humidity>0 && weather.main.humidity<25 && weather.clouds.all>25 && weather.clouds.all<50){
				$(".weatherIcon").attr("src","icons/partly_cloudy.png")
				localStorage.setItem("currentIcon","icons/partly_cloudy.png")
			}
			if(weather.main.humidity>0 && weather.main.humidity<25 && weather.clouds.all>50 && weather.clouds.all<75){
				$(".weatherIcon").attr("src","icons/cloudy.png")
				localStorage.setItem("currentIcon","icons/cloudy.png")
			}
			if(weather.main.humidity>0 && weather.main.humidity<25 && weather.clouds.all>75 && weather.clouds.all<100){
				$(".weatherIcon").attr("src","icons/very_cloudy.png")
				localStorage.setItem("currentIcon","icons/very_cloudy.png")
			}
			if(temp>5 && weather.main.humidity>50 && weather.main.humidity<100 && weather.clouds.all>50 && weather.clouds.all<100){
				$(".weatherIcon").attr("src","icons/rainy.png")
				localStorage.setItem("currentIcon","icons/rainy.png")
			}
			if(temp<5 && weather.main.humidity>50 && weather.main.humidity<100 && weather.clouds.all>50 && weather.clouds.all<100){
				$(".weatherIcon").attr("src","icons/snowy.png")
				localStorage.setItem("currentIcon","icons/snowy.png")
			}
		}
	})
}

//sets background image based on time of day
function setBackground(){
	//convert time
	frameTime = (timeInMinutes/4).toFixed(0)
	console.log("frame time is "+frameTime)
		//convert for proper filename and change background based on time
		if(frameTime<10){
		frameName = startString3+frameTime
		frameTime+=1
		$(".background").css("background-image",'url(img/'+frameName+'.png)')
	}
		if(frameTime<100 && frameTime>10){
		frameName = startString2+frameTime
		frameTime+=1
		$(".background").css("background-image",'url(img/'+frameName+'.png)')
	}
		if(frameTime<361 && frameTime>100){
		frameName = startString1+frameTime
		frameTime+=1
		$(".background").css("background-image",'url(img/'+frameName+'.png)')
	}
}
setBackground()

//Swipes away options
function swipeAwayOptions(){
	$(".option1").animate({ left: "-50%", opacity: "-100"},10000)
	$(".option2").animate({ left: "-50%", opacity: "-100"},10000)
	$(".option3").animate({ left: "-50%", opacity: "-100"},10000)
	//setTimeout(4000)
	//$(".response").animate({ left: "-50%", opacity: "-100"},30000)
}

//Check when page was last reloaded. Ensures minimum time delay between pinging openweathermap api
if (performance.navigation.type == 0 || performance.navigation.type == 1){ //check if page reloaded or new tab opened
  console.log( "Page reloaded at "+timeInMinutes);
  lastRefresh=localStorage.getItem("lastRefresh")
  if(lastRefresh>0){//if lastRefresh exists create timeDifference and check additional
  		timeDifference = timeInMinutes - localStorage.getItem("lastRefresh")
  		console.log("lastRefresh exists: "+lastRefresh+". timeDifference is: "+timeDifference);
	  	if(timeDifference>timeDifferenceSetting){ //if 10 mins has passed since lastRefresh update weather and lastRefresh
	  		weatherUpdate()
	  		localStorage.setItem("lastRefresh",timeInMinutes)
	  	} else {//if time difference is not large enough then dont refresh page
	  		console.log("Page not updated, old data used.")
	  		temp = localStorage.getItem("currentTemp")
	  		$(".weatherNumber").html(temp+"&deg; in "+userCity);
	  		icon = localStorage.getItem("currentIcon")
	  		$(".weatherIcon").attr("src",icon)
	  	}
  } else { //if lastRefresh does not exist, create it and update page.
  	localStorage.setItem("lastRefresh",timeInMinutes)
  	weatherUpdate()
  }
}

function dumpStorage(){
	console.log("local storage");
	for (i = 0; i < localStorage.length; i++)   {
	    console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
	}
}

$(".settingsIcon").on("click", function(){
	$(".settingsBox").animate({height: "340px", width:"210px" , right: "4.7%" , bottom:"6%"},500)
	$(".x").css("display", "initial")
	$(".settingsTitle").css("display","initial")
	$(".setting1").css("display","initial")
	$(".setting2").css("display","initial")
	$(".setting3").css("display","initial")

})
$(".x").on("click",function(){
	$(".settingsBox").animate({height: "0", width:"0" , right:"5.88%" , bottom:"8.004%"},500)
	$(".x").css("display", "none")
	$(".settingsTitle").css("display","none")
	$(".setting1").css("display","none")
	$(".setting2").css("display","none")
	$(".setting3").css("display","none")
})


$(".option1").on("click", function(){
	$(".response").text("That is great!");
	$(".response").fadeIn(fadeTime)
	swipeAwayOptions()
})
$(".option2").on("click",function(){
	$(".response").text("Is something wrong?");
	$(".response").fadeIn(fadeTime)
	swipeAwayOptions()
})
$(".option3").on("click",function(){
	$(".response").text("Oh, I hope you feel better soon...")
	$(".response").fadeIn(fadeTime)
	swipeAwayOptions()
})