var redOn=true;
var greenOn=true;
var blueOn=true;

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

	// verticalPos=event.pageY-window.innerWidth;
	// horisontalPos=event.pageX-window.innerHeight;
	// $(".greenChannel").css("top",verticalPos);
	// $(".greenChannel").css("left",horisontalPos);

	xPos=event.pageX/window.innerWidth;
	$(".redChannel").css("opacity",xPos)
	$(".redButton").text(xPos)

	yPos=event.pageY/window.innerHeight;
	Math.round(yPos * 100) / 100;
	$(".blueChannel").css("opacity",yPos)
	$(".blueButton").text(yPos)
})


