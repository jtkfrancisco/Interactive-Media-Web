//todo
//implement settings and suggestions
//make statements reflect sunset times [later]
//fix weather icon

var timeDifferenceSetting = 10 //minimum amount of time in minutes between weathermap pings
var fadeTime = 300 //time in miliseconds it takes to fade certain animations
var increment = 20 //controls the amount in px per step in the graph [do not change]

setName()
checkMinimalMode()
console.log("minimalMode is "+localStorage.getItem("mainContainerOpen"))

setLocation()
setBackground()
setInquiryCase()
currentDateNumber = getDate()
retrieveDayData()
setupCurrentDayData(currentDateNumber)
timeInMinutes = getTimeInMinutes()




//gets raw city name from IP lookup
var userCity=localStorage.getItem("rawCity") 
//cleans city name for openweathermap, and stores in localStorage
var cleanCity=sanitizeCityName(userCity)


//ensures weather and location are filled
var historicalTemp = localStorage.getItem("currentTemp") 
$(".weatherNumber").text(historicalTemp+"°"+" in "+cleanCity)

//highlight current day [done]
$(".day"+currentDateNumber).css("background", "#EA9E65")

//Check when page was last reloaded. Ensures minimum time delay between pinging openweathermap api
if (performance.navigation.type == 0 || performance.navigation.type == 1){
	setReminder()
	timeToUpdate=checkLastReloadTime(timeDifferenceSetting)
	if(timeToUpdate==true){
		weatherUpdate(cleanCity)
	}
}

//opens settings panel
$(".settingsIcon").on("click", function(){
	settingsOpen()
})

//closes settings panel
$(".x").on("click", function(){
	settingsClose()
})

//opens graph panel
$(".graphButton").on("click", function(){
	graphOpen()
})

//closes graph panel
$(".closeGraphButton").on("click", function(){
	graphClose()
})

//on click, incrementally increase bar height by 20px [working]
$(".option1").on("click", function(){
	currentPosition=localStorage.getItem(".day"+currentDateNumber)

	if($(".day"+currentDateNumber).css("height")!="220px"){
		currentPosition = parseInt(currentPosition)+parseInt(increment)
		$(".day"+currentDateNumber).css("height",currentPosition)
		//swipeAwayOptions()
	}	
	localStorage.setItem(".day"+currentDateNumber, currentPosition)
})

//on click, incrementally decrease bar height by 20px [working]
$(".option3").on("click", function(){
	currentPosition=localStorage.getItem(".day"+currentDateNumber)

	if($(".day"+currentDateNumber).css("height")!="20px"){
		currentPosition = parseInt(currentPosition)-parseInt(increment)
		$(".day"+currentDateNumber).css("height",currentPosition)
		//swipeAwayOptions()
	}	
	localStorage.setItem(".day"+currentDateNumber, currentPosition)
})


$(".setting1").on("click", function(){

	setName(1)
})

$(".setting2").on("click", function(){
	checkMinimalMode()
	toggleMinimalMode()
	// console.log("setting2 clicked, container open is "+localStorage.getItem("mainContainerOpen"))
})

