var redOn=true;
var greenOn=true;
var blueOn=true;
var autoOn=false;

var horizontalCenter = Math.floor(window.innerWidth/2);
var verticalCener = Math.floor(window.innerHeight/2);

var r = 745;
var xcenter = horizontalCenter; // center X position
var ycenter = 0 // center Y position
var t = 0;
var t2 = 0;
var t3 = 0; //time
var divisor=745*2;


function moveitRed(){
    t += 0.01;
    var newLeft = Math.floor(xcenter + (r * Math.cos(t)));
    //var newTop = Math.floor(ycenter + (r * Math.sin(t)));
    var newTop = ycenter;

    $('.testDiv2').animate({top: newTop,left: newLeft,}, 1, function(){moveitRed()});

    $(".redChannel").css("opacity",newLeft/divisor)
    $(".redButton").text(newLeft/divisor)
}

function moveitGreen(){
    t2 += 0.01;
    var newLeft = Math.floor(xcenter + (r * Math.cos(t2)));
    //var newTop = Math.floor(ycenter + (r * Math.sin(t)));
    var newTop = ycenter;

    $('.testDiv').animate({top: newTop,left: newLeft,}, 1, function(){moveitGreen()});

    $(".greenChannel").css("opacity",newLeft/divisor)
    $(".greenButton").text(newLeft/divisor)
}

function moveitBlue(){
    t3 += 0.01;
    var newLeft = Math.floor(xcenter + (r * Math.cos(t3)));
    //var newTop = Math.floor(ycenter + (r * Math.sin(t)));
    var newTop = ycenter;

    $('.testDiv3').animate({top: newTop,left: newLeft,}, 1, function(){moveitBlue()});

    $(".blueChannel").css("opacity",newLeft/divisor)
    $(".blueButton").text(newLeft/divisor)
}

// $(".autoButton").click(function(){
// 	if (autoOn==false){
// 		$(".autoButton").text("Auto-ON");
// 		autoOn=true;
// 		moveitRed();
// 		moveitGreen();
// 		moveitBlue();
// 	} else {
// 		$(".autoButton").text("Auto-OFF");
// 		autoOn=false;
// 	}
// })

$(".redButton").click(function(){
	if (redOn==true){
		// $(".redChannel").css("opacity","0"); //old functionality to turn off colour channel
		$(".redButton").text("OFF")
		moveitRed();
		redOn=false;
	} else {
		// $(".redChannel").css("opacity","1");
		$(".redButton").text("ON");
		redOn=true;
	}
})

$(".greenButton").click(function(){
	if (greenOn==true){
		// $(".greenChannel").css("opacity","0"); //old functionality to turn off colour channel
		$(".greenButton").text("OFF");
		moveitGreen();
		greenOn=false;
	} else {
		// $(".greenChannel").css("opacity","1");
		$(".greenButton").text("ON");
		greenOn=true;
	}
})

$(".blueButton").click(function(){ 
	if (blueOn==true){
		// $(".blueChannel").css("opacity","0");//old functionality to turn off colour channel
		$(".blueButton").text("OFF");
		moveitBlue();
		blueOn=false;
	} else {
		// $(".blueChannel").css("opacity","1");
		$(".blueButton").text("ON");
		blueOn=true;
	}
})

$("html").mousemove(function(){ //changes red and blue channel opacity based on mouse pos.
	$(".blackSquare").text(event.pageX + ", " + event.pageY);

	xPos=event.pageX/window.innerWidth;
	$(".redChannel").css("opacity",xPos)
	// $(".redButton").text(xPos)

	yPos=event.pageY/window.innerHeight;
	Math.round(yPos * 100) / 100;
	$(".blueChannel").css("opacity",yPos)
	// $(".blueButton").text(yPos)
})


