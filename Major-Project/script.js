//alert(h+":"+m)

//date returns in 24h time. 
//every 4 minute the image will change.

//frames are in the following format:
//0001.png - 0360.png

//what needs to be done in order to make the image change every 4 minutes?

//image set starts at noon. 
//frame 0001.png is the sun directly above and time progresses forward like that.
//i want each image to fade to the next.

//1440 minutes in the day / 360 is 4.

//0 = 0
//6 = 360
//12 = 720
//18 = 1080
//24 = 1440

//1440/4 is 360

var apiURL ="https://api.openweathermap.org/data/2.5/weather?q=Toronto,ca&appid=43951fde831b13d6b31b5c68c389d843"
var d = new Date();

var timeInMinutes = 0

startString3 = "000"
startString2 = "00"
startString1 = "0"
frameTime = 1
frameName = "0000.png"
frameURL="0"


//open weather map key:
//43951fde831b13d6b31b5c68c389d843
$.ajax({
	url: apiURL,
	success: function(weather){
		$(".weatherNumber").html((weather.main.temp-273.15).toFixed(1)+"&deg; in Toronto");
		console.log("The cloudiness percentage is "+weather.clouds.all)
		console.log("The humidity percentage is "+weather.main.humidity)
		console.log("The rain in the last hour was "+weather.rain)
	}
})


function setBackground(){
	//get time
	minute = d.getMinutes();
	hour = d.getHours();
	//convert time
	timeInMinutes=hour*60+minute
	frameTime = (timeInMinutes/4).toFixed(0)
	console.log("frame time is "+frameTime)
		//convert for proper filename and change background based on time
		if(frameTime<10){
		frameName = startString3+frameTime
		frameTime+=1
		console.log("frame name is "+frameName)
		$(".background").css("background-image",'url(img/'+frameName+'.png)')
	}
		if(frameTime<100 && frameTime>10){
		frameName = startString2+frameTime
		frameTime+=1
		console.log("frame name is "+frameName)
		$(".background").css("background-image",'url(img/'+frameName+'.png)')
	}
		if(frameTime<361 && frameTime>100){
		frameName = startString1+frameTime
		frameTime+=1
		console.log("frame name is "+frameName)
		$(".background").css("background-image",'url(img/'+frameName+'.png)')
	}
}

setBackground()

//0 = 0
//6 = 360
//12 = 720
//18 = 1080
//24 = 1440

if(timeInMinutes>0 && timeInMinutes<360){$(".inquiry").text("It's very early, how are you feeling?")}
if(timeInMinutes>360 && timeInMinutes<720){$(".inquiry").text("how are you feeling this morning?")}
if(timeInMinutes>720 && timeInMinutes<1080){$(".inquiry").text("how are you feeling this afternoon?")}
if(timeInMinutes>1080 && timeInMinutes<1440){$(".inquiry").text("how are you feeling this evening?")}

// Store

userInput = $(".formInput").value

$(".greeting").text("hello there, "+userInput)

//localStorage.setItem("userName", userInput);
// Retrieve
//userName = localStorage.getItem("userName");

// document.cookie = "username="+userName+"; expires=Thu, 18 Dec 2013
