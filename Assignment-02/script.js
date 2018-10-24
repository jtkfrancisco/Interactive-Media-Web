var lightningTime = 0; //determines number of milliseconds between "lightning" strikes
var max = 4000;
var min = 2000;
var flashTime = 0; //determines length of the lightning effect
//var count = 0; 
var backgroundSound = new Audio("audio/Rain_Background.mp3");
var thunder01 = new Audio("audio/thunder_01.mp3");
var thunder02 = new Audio("audio/thunder_02.mp3");
var thunder03 = new Audio("audio/thunder_03.mp3");
var thunder04 = new Audio("audio/thunder_04.mp3");
var thunder05 = new Audio("audio/thunder_05.mp3");
var strikeNumber = 0; 
    
    lightningTime = Math.random()*(max-min)+min
    flashTime = Math.random()*(80-10)+10

setInterval(function(){ //makes <body> white and plays 1/5 sounds every [lightningTime] miliseconds
    $("body").css("background-color", "white")

    switch(strikeNumber+=1){
        case 0:
            thunder01.play()
            break;
        case 1:
            thunder02.play()
            break;
        case 2:
            thunder03.play()
            break;
        case 3:
            thunder04.play()
            break;
        case 4:
            thunder05.play()
            strikeNumber=0;
            break;
    }
    
}, lightningTime)


setInterval(function(){ //resets <body> after [lightningTime+flashTime] milisecons
    $("body").css("background-color", "black")
    lightningTime = Math.random()*(max-min)+min
    flashTime = Math.random()*(80-10)+10
    console.log("lighting time " + lightningTime)
}, lightningTime+flashTime)
    
    $(".link").click(function(){
    console.log("link clicked")
});






            