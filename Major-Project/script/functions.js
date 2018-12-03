var d = new Date();
minute = d.getMinutes();
hour = d.getHours();
timeInMinutes = hour*60+minute

//prompts for username, stores in localStorage
function setName(){
	//initial name get and storage 
	if(localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null){
		userInput = prompt("Hello, its lovely to meet you. Can I ask your name?")
		localStorage.setItem("userName", userInput);
		$(".greeting").text("Hello, "+userInput)
	} else {
		//Retrieve and display name
		userName = localStorage.getItem("userName");
		$(".greeting").text("Hello again, "+userName)
	}
}

//Returns current time in minutes
function getTimeInMinutes(){

	return timeInMinutes	
}

function getDate(){

	return d.getDay()
}

//Changes the greeting to be appropriate for the time of day
function setInquiryCase(){
	//0 = 0
	//6 = 360
	//12 = 720
	//18 = 1080
	//24 = 1440
	//greeting case change
	if(timeInMinutes>0 && timeInMinutes<360){$(".inquiry").text("It's very early, how are you feeling?")}
	if(timeInMinutes>360 && timeInMinutes<720){$(".inquiry").text("how are you feeling this morning?")}
	if(timeInMinutes>720 && timeInMinutes<900){$(".inquiry").text("how are you feeling this afternoon?")}
	if(timeInMinutes>900 && timeInMinutes<1080){$(".inquiry").text("how are you feeling this evening?")}
	if(timeInMinutes>1080 && timeInMinutes<1440){$(".inquiry").text("how are you feeling tonight?")}
}

//Get location based on IP address and saves it into localStorage
function setLocation() {
  $.ajax('http://ip-api.com/json')
  .then(
      function success(response) {
          console.log("Raw city response is "+response.city+" based on your IP address");
          currentCity=response.city
          localStorage.setItem("rawCity",currentCity)
      },

      function fail(data, status) {
          console.log('Request failed.  Returned status of '+status);
      }
  );
}

//removes everything in the brackets from the result of setLocation()
function sanitizeCityName(userCity){
	if(userCity.indexOf("(")!=-1){
		cutOffIndex=userCity.indexOf("(")-1
		cleanCity=userCity.substring(0,cutOffIndex)
		localStorage.setItem("cleanCity",cleanCity)
		return cleanCity
	}
	return userCity
}

//Given userCity, gets and displayes current weather info, the appropriate icon, and current city
function weatherUpdate(userCity){
	$.ajax({
	url: "https://api.openweathermap.org/data/2.5/weather?q="+userCity+",ca&appid=43951fde831b13d6b31b5c68c389d843",
	success: function(weather){
		//get, convert, and store weather for later
		temp = (weather.main.temp-273.15).toFixed(0)
		localStorage.setItem("currentTemp",temp)
		//console.log("current weather stored as "+temp+"&deg;")

		//display current weather in html
		$(".weatherNumber").html(temp+"° in "+userCity);
		//console.log("The cloudiness percentage is "+weather.clouds.all)
		//console.log("The humidity percentage is "+weather.main.humidity)

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

//Checks when the last page reload occured, and if a given number of mins has passed since then.
function checkLastReloadTime(timeDifferenceSetting){
	console.log( "Page reloaded at "+timeInMinutes);
	lastRefresh=localStorage.getItem("lastRefresh")
	if(lastRefresh>0){//if lastRefresh exists create timeDifference and check if 10 mins has passed
			timeDifference = timeInMinutes - localStorage.getItem("lastRefresh")
			console.log("lastRefresh exists: "+lastRefresh+". timeDifference is: "+timeDifference);
	  	if(timeDifference>timeDifferenceSetting||Math.sign(timeDifference)==-1){ //if 10 mins has passed since lastRefresh update weather and lastRefresh
	  		localStorage.setItem("lastRefresh",timeInMinutes)
	  		console.log("Page updated")
	  		return true;
	  	} else if (localStorage.getItem("currentTemp")==undefined){//if time difference is not large enough, but no weather data exists, update weather
	  		weatherUpdate()
	  		console.log("weather instantiated")
	  	} else {//if time difference is not large enough then dont refresh page
	  		console.log("Page not updated, old data used.")
	  		temp = localStorage.getItem("currentTemp")
	  		userCity = localStorage.getItem("cleanCity")
	  		$(".weatherNumber").html(temp+"&deg; in "+userCity);
	  		icon = localStorage.getItem("currentIcon")
	  		$(".weatherIcon").attr("src",icon)
	  	}
	} else { //if lastRefresh does not exist, create it and update page.
		localStorage.setItem("lastRefresh",timeInMinutes)
		return true;
	}
}

//Sets background image based on time of day
function setBackground(){
	//variables related to setting the background image
	var startString3 = "000"
	var startString2 = "00"
	var startString1 = "0"
	var frameName = "0000.png"
	//convert time
	frameTime = (timeInMinutes/4).toFixed(0)
	console.log("frame time is "+frameTime)
		//convert for proper filename and change background based on time
		if(frameTime<10){
		frameName = startString3+frameTime
		$(".background").css("background-image",'url(img/'+frameName+'.png)')
	}
		if(frameTime<100 && frameTime>=10){
		frameName = startString2+frameTime
		$(".background").css("background-image",'url(img/'+frameName+'.png)')
	}
		if(frameTime<361 && frameTime>=100){
		frameName = startString1+frameTime
		$(".background").css("background-image",'url(img/'+frameName+'.png)')
	}
}

//Animates away ".options"
function swipeAwayOptions(){
	$(".option1").animate({ left: "-50%", opacity: "-100"},10000)
	$(".graphButon").animate({ left: "-50%", opacity: "-100"},10000)
	$(".option3").animate({ left: "-50%", opacity: "-100"},10000)
	//setTimeout(4000)
	//$(".response").animate({ left: "-50%", opacity: "-100"},30000)
}

//expands the settings box via an animation
function settingsOpen(){
	$(".settingsBox").animate({height: "340px", width:"210px" , right: "3.5px", bottom: "-3.5px"},500)
	$(".x").css("display", "initial")
	//$(".settingsIcon").css("display", "none")
	$(".settingsTextContainer").animate({opacity: "1"},600)	
}

//collapses the settings box via an animation
function settingsClose(){
	$(".settingsBox").animate({height: "0", width:"0" , right: "23.5px" , bottom:"16.5px"},500)
	$(".x").css("display", "none")
	//$(".settingsIcon").css("display", "initial")
	$(".settingsTextContainer").animate({opacity: "0"},200)	
}

//opens the canvas window that stores the graph
function graphOpen(){
	$(".closeGraphButton").css("display", "initial")
	$(".canvas").css("display","initial")
	$(".canvas").animate({width: "600px", height:"240px", bottom:"4%", left: "4%"},500)
	$(".graphButton").css("background", "cornflowerblue")
}

//closes the canvas window that stores the graph
function graphClose(){
	$(".canvas").animate({width: "30px", height:"30px", bottom:"334px", left: "480px"},500)
	$(".canvas").toggle(5)
	$(".closeGraphButton").css("display", "none")
	$(".graphButton").css("background", "initial")
}

//Prints all items in the localStorage to console
function printStorage(){
	console.log("local storage contents:");
	for (i = 0; i < localStorage.length; i++)   {
	    console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
	}
}

//Prints all items in the localStorage to console
function resetStorage(){
	for (i = 0; i <= localStorage.length; i++)   {
	    localStorage.removeItem(localStorage.key(i))
	}
	console.log("local storage contents reset")
}

//displays a mindfulness reminder from a list of options
function setReminder(){
	max = 13 //max must be equal to the number of cases ex. 1-10 = 11 cases
	randomCaseNumber=Math.floor(Math.random() * Math.floor(max))
	switch(randomCaseNumber){
		case 0:
        	$(".reminder").text("Don't forget to drink enough water! 😊")
        	break;
		case 1:
        	$(".reminder").text("have you eaten a vegetable lately? 😋")
        	break;
        case 2:
        	$(".reminder").text("I hope you're feeling well today! 😄")
        	break;
        case 3:
        	$(".reminder").text("Remember to take frequent breaks from screens! 😉")
        	break;
        case 4:
        	$(".reminder").text("Don't forget that you are special! ❤️")
        	break;
        case 5:
        	$(".reminder").text("Sleeping well is a very important ingredient to feeling well. 😴\nTry to rest early!😄").wrap('<pre />')
        	break;
        case 6:
        	$(".reminder").text("Your body wants you to get up and shake it baby! 🕺 💃")
        	break;
        case 7:
        	$(".reminder").text("Take a deep breath... In... and... out... 🙂")
        	break;
        case 8:
        	$(".reminder").text("I promise, it's all gonna be okay.")
        	break;
        case 9:
        	$(".reminder").text("Just do what you can in this moment. 🙂")
        	break;
        case 10:
        	$(".reminder").text("Please don't be afraid to ask for help.")
        	break;
        case 11:
        	$(".reminder").text("I am proud of you! 😺")
        	break;
        case 12:
        	$(".reminder").text("Humans are basically plants that decided to get up and walk around one day. 🌱\nDon't forget to get some sunlight! 🌞").wrap('<pre />')
        	break;
	}
}

//retrieve all days data (if exists) from localStorage and display[test]
function retrieveDayData(){
	for(dayNumber = 0; dayNumber <=6; dayNumber++){
		if(localStorage.getItem(".day"+dayNumber)!=undefined){
			storedDayHeight = parseInt(localStorage.getItem(".day"+dayNumber))
			$(".day"+dayNumber).css("height", storedDayHeight)
			console.log("Data for day "+dayNumber+" loaded")
		}
	}
	console.log("No more stored day data found")
}

//instantiate current day current position if it does not exist [test]
function setupCurrentDayData(currentDateNumber){
	if(localStorage.getItem(".day"+currentDateNumber)<20){
		localStorage.setItem(".day"+currentDateNumber, parseInt(20))
		console.log("storing default currentPosition")
	} 
}
