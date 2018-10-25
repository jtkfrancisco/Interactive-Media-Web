var redOn=true;
var greenOn=true;
var blueOn=true;
var autoOn=false;

var t = 0;

var horizontalCenter = Math.floor(window.innerWidth/2);
var verticalCener = Math.floor(window.innerHeight/2);

function moveit(){
    t += 0.03;

    var r = 300;         // radius
    var xcenter = horizontalCenter;   // center X position
    var ycenter = verticalCener;   // center Y position

    var newLeft = Math.floor(xcenter + (r * Math.cos(t)));
    var newTop = Math.floor(ycenter + (r * Math.sin(t)));

    console.log(newTop);
	console.log(newLeft);

    $('.testDiv').animate({
        top: newTop,
        left: newLeft,
    }, 1, function() {
        moveit();
    });
    $(".greenChannel").css("opacity",newLeft)
    $(".greenButton").text(newLeft)
}



// $(document).ready(function() {
//     moveit();
// });​

// $(".autoButton").click(moveit())

$(".autoButton").click(function(){
	if (autoOn==false){
		$(".autoButton").text("Auto-ON");
		autoOn=true;
		moveit();
	} else {
		$(".autoButton").text("Auto-OFF");
		autoOn=false;
	}
})

$(".redButton").click(function(){
	if (redOn==true){
		$(".redChannel").css("opacity","0");
		$(".redButton").text("OFF")
		redOn=false;
	} else {
		$(".redChannel").css("opacity","1");
		$(".redButton").text("ON");
		redOn=true;
	}
})

$(".greenButton").click(function(){
	if (greenOn==true){
		$(".greenChannel").css("opacity","0");
		$(".greenButton").text("OFF");
		greenOn=false;
	} else {
		$(".greenChannel").css("opacity","1");
		$(".greenButton").text("ON");
		greenOn=true;
	}
})

$(".blueButton").click(function(){
	if (blueOn==true){
		$(".blueChannel").css("opacity","0");
		$(".blueButton").text("OFF")
		blueOn=false;
	} else {
		$(".blueChannel").css("opacity","1");
		$(".blueButton").text("ON")
		blueOn=true;
	}
})

$("html").mousemove(function(){
	$(".blackSquare").text(event.pageX + ", " + event.pageY);

	xPos=event.pageX/window.innerWidth;
	$(".redChannel").css("opacity",xPos)
	$(".redButton").text(xPos)

	yPos=event.pageY/window.innerHeight;
	Math.round(yPos * 100) / 100;
	$(".blueChannel").css("opacity",yPos)
	$(".blueButton").text(yPos)
})


