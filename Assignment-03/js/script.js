var redOn=true; //pertains to the state of the red button
var greenOn=true;
var blueOn=true;
var autoOn=false;

var horizontalCenter = Math.floor(window.innerWidth/2);
var verticalCener = Math.floor(window.innerHeight/2);

var t1=0;
var t2=0;
var t3=0;
var r = 745; //radius 
var xcenter = horizontalCenter; // center X position
var ycenter = 0; // center Y position
var divisor=745*2; //idk why this number works, but through trial and error this is what I figured out.

// function moveit(){
//     t += 0.01;
//     var newLeft = Math.floor(xcenter + (r * Math.cos(t)));
//     var newTop = ycenter;
//     $(animatedLine).animate({top: newTop,left: newLeft,}, 1, function(){moveitRed()});//can be redDiv, greenDiv, or BlueDiv
//     $(colorChannel).css("opacity",newLeft/divisor) //changes opacity of the channel. can be redChannel, greenChannel, or blueChannel
//     $(colorButton).text(newLeft/divisor) //displayes opacity of the channel on the button. can be redButton, greenButton, or blueButton
// }

function moveitRed(){
    t1 += 0.01;
    var newLeft = Math.floor(xcenter + (r * Math.cos(t1)));
    var newTop = ycenter;
    $('.redDiv').animate({top: newTop,left: newLeft,}, 1, function(){moveitRed()});
    $(".redChannel").css("opacity",newLeft/divisor)
    $(".redButton").text(newLeft/divisor)
}

function moveitGreen(){
    t2 += 0.01;
    var newLeft = Math.floor(xcenter + (r * Math.cos(t2)));
    var newTop = ycenter;
    $('.greenDiv').animate({top: newTop,left: newLeft,}, 1, function(){moveitGreen()});
    $(".greenChannel").css("opacity",newLeft/divisor)
    $(".greenButton").text(newLeft/divisor)
}

function moveitBlue(){
    t3 += 0.01;
    var newLeft = Math.floor(xcenter + (r * Math.cos(t3)));
    var newTop = ycenter;
    $('.blueDiv').animate({top: newTop,left: newLeft,}, 1, function(){moveitBlue()});
    $(".blueChannel").css("opacity",newLeft/divisor)
    $(".blueButton").text(newLeft/divisor)
}

$(".redButton").click(function(){
	console.log(this); //<div class="redButton">OFF</div>
	if (redOn==true){
		$(".redButton").text("OFF")
		moveitRed();
		redOn=false;
	} else {
		$(".redButton").text("ON");
		redOn=true;
	}
})

$(".greenButton").click(function(){
	if (greenOn==true){
		$(".greenButton").text("OFF");
		moveitGreen();
		greenOn=false;
	} else {
		$(".greenButton").text("ON");
		greenOn=true;
	}
})

$(".blueButton").click(function(){ 
	if (blueOn==true){
		$(".blueButton").text("OFF");
		moveitBlue();
		blueOn=false;
	} else {
		$(".blueButton").text("ON");
		blueOn=true;
	}
})

$("html").mousemove(function(){
	$(".blackSquare").text(event.pageX + ", " + event.pageY);

	xPos=event.pageX/window.innerWidth;
	$(".redChannel").css("opacity",xPos)

	yPos=event.pageY/window.innerHeight;
	Math.round(yPos * 100) / 100;
	$(".blueChannel").css("opacity",yPos)
})


