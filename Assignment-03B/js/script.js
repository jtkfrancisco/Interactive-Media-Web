var cyanOn=true; //pertains to the state of the cyan button
var magentaOn=true;
var yellowOn=true;
var x=0;
var y=0;
var j=window.innerWidth;
var i=window.innerHeight;
var horizontalCenter = Math.floor(window.innerWidth/2);
var verticalCener = Math.floor(window.innerHeight/2);

var t1=0;
var t2=0;
var t3=0;
var r = 745; //radius 
var xcenter = horizontalCenter; // center X position
var ycenter = 0; // center Y position
var divisor=745*2; //idk why this number works, but through trial and error this is what I figured out.

function moveitcyan(){
    t1 += 0.01;
    var newLeft = Math.floor(xcenter + (r * Math.cos(t1)));
    var newTop = ycenter;
    $('.cyanDiv').animate({left: newLeft,}, 1, function(){moveitcyan()});
    $(".cyanChannel").css("opacity",newLeft/divisor)
    $(".cyanButton").text(newLeft/divisor)
}

function moveitmagenta(){
    t2 += 0.01;
    var newLeft = Math.floor(xcenter + (r * Math.cos(t2)));
    var newTop = ycenter;
    $('.magentaDiv').animate({left: newLeft,}, 1, function(){moveitmagenta()});
    $(".magentaChannel").css("opacity",newLeft/divisor)
    $(".magentaButton").text(newLeft/divisor)
}

function moveityellow(){
    t3 += 0.01;
    var newLeft = Math.floor(xcenter + (r * Math.cos(t3)));
    var newTop = ycenter;
    $('.yellowDiv').animate({left: newLeft,}, 1, function(){moveityellow()});
    $(".yellowChannel").css("opacity",newLeft/divisor)
    $(".yellowButton").text(newLeft/divisor)
}

$(".cyanButton").click(function(){
	console.log(this); //returns: <div class="cyanButton">OFF</div>
	if (cyanOn==true){
		$(".cyanButton").text("OFF")
		moveitcyan();
		cyanOn=false;
	} else {
		$(".cyanButton").text("ON");
		cyanOn=true;
	}
})

$(".magentaButton").click(function(){
	console.log(this); //returns: <div class="magentaButton">OFF</div>
	if (magentaOn==true){
		$(".magentaButton").text("OFF");
		moveitmagenta();
		magentaOn=false;
	} else {
		$(".magentaButton").text("ON");
		magentaOn=true;
	}
})

$(".yellowButton").click(function(){ 
	console.log(this); //returns: <div class="yellowButton">OFF</div>
	if (yellowOn==true){
		$(".yellowButton").text("OFF");
		moveityellow();
		yellowOn=false;
	} else {
		$(".yellowButton").text("ON");
		yellowOn=true;
	}
})

$(".centralBox").hover(function(){
	$("body").css("background",'url("img/CMYK.jpg"')
})

$("html").mousemove(function(){
	$(".keyButton").text(event.pageX + ", " + event.pageY); //displays mouse pos
	x=event.pageX;
	y=event.pageY;

	if(x<j && x>j/2+j/4 && y<i/4 && y>0){ //1,1
		$(".cyanChannel").css("opacity",0); $(".cyanButton").text("0%");
		$(".magentaChannel").css("opacity",1); $(".magentaButton").text("100%");
		$(".yellowChannel").css("opacity",0); $(".yellowButton").text("0%");
		$(".keyChannel").css("opacity",0); $(".keyButton").text("0%");
	}
	if(x<j && x>j/2+j/4 && y<i/2 && y>i/4){ //1,2
		$(".cyanChannel").css("opacity",0); $(".cyanButton").text("0%");
		$(".magentaChannel").css("opacity",0.66); $(".magentaButton").text("66%");
		$(".yellowChannel").css("opacity",0.33); $(".yellowButton").text("33%");
		$(".keyChannel").css("opacity",0); $(".keyButton").text("0%");
	}
	if(x<j && x>j/2+j/4 && y<i/2+i/4 && y>i/2){ //1,3
		$(".cyanChannel").css("opacity",0); $(".cyanButton").text("0%");
		$(".magentaChannel").css("opacity",0.33); $(".magentaButton").text("33%");
		$(".yellowChannel").css("opacity",0.66); $(".yellowButton").text("66%");
		$(".keyChannel").css("opacity",0); $(".keyButton").text("0%");
	}
	if(x<j && x>j/2+j/4 && y<i && y> i/2+i/4){ //1,4
		$(".cyanChannel").css("opacity",0); $(".cyanButton").text("0%");
		$(".magentaChannel").css("opacity",0); $(".magentaButton").text("0%");
		$(".yellowChannel").css("opacity",1); $(".yellowButton").text("100%");
		$(".keyChannel").css("opacity",0); $(".keyButton").text("0%");
	}

	if(x<j/2+j/4 && x>j/2 && y<i/4 && y>0){ //2,1
		$(".cyanChannel").css("opacity",0.33); $(".cyanButton").text("33%");
		$(".magentaChannel").css("opacity",0.66); $(".magentaButton").text("66%");
		$(".yellowChannel").css("opacity",0); $(".yellowButton").text("0%");
		$(".keyChannel").css("opacity",0); $(".keyButton").text("0%");
	}
	if(x<j/2+j/4 && x>j/2 && y<i/2 && y>i/4){ //2,2
		$(".cyanChannel").css("opacity",0.33); $(".cyanButton").text("33%");
		$(".magentaChannel").css("opacity",0.66); $(".magentaButton").text("66%");
		$(".yellowChannel").css("opacity",0.33); $(".yellowButton").text("33%");
		$(".keyChannel").css("opacity",0.33); $(".keyButton").text("33%");
	}
	if(x<j/2+j/4 && x>j/2 && y<i/2+i/4 && y>i/2){ //2,3
		$(".cyanChannel").css("opacity",0.33); $(".cyanButton").text("33%");
		$(".magentaChannel").css("opacity",0.33); $(".magentaButton").text("33%");
		$(".yellowChannel").css("opacity",0.66); $(".yellowButton").text("66%");
		$(".keyChannel").css("opacity",0.33); $(".keyButton").text("33%");
	}
	if(x<j/2+j/4 && x>j/2 && y<i && y> i/2+i/4){ //2,4
		$(".cyanChannel").css("opacity",0); $(".cyanButton").text("0%");
		$(".magentaChannel").css("opacity",0); $(".magentaButton").text("0%");
		$(".yellowChannel").css("opacity",0.66); $(".yellowButton").text("66%");
		$(".keyChannel").css("opacity",0.33); $(".keyButton").text("33%");
	}

	if(x<j/2 && x>j/4 && y<i/4 && y>0){ //3,1
		$(".cyanChannel").css("opacity",0.66); $(".cyanButton").text("66%");
		$(".magentaChannel").css("opacity",0.33); $(".magentaButton").text("33%");
		$(".yellowChannel").css("opacity",0); $(".yellowButton").text("0%");
		$(".keyChannel").css("opacity",0); $(".keyButton").text("0%");
	}
	if(x<j/2 && x>j/4 && y<i/2 && y>i/4){ //3,2
		$(".cyanChannel").css("opacity",0.66); $(".cyanButton").text("66%");
		$(".magentaChannel").css("opacity",0.33); $(".magentaButton").text("33%");
		$(".yellowChannel").css("opacity",0.33); $(".yellowButton").text("33%");
		$(".keyChannel").css("opacity",0.33); $(".keyButton").text("33%");
	}
	if(x<j/2 && x>j/4 && y<i/2+i/4 && y>i/2){ //3,3
		$(".cyanChannel").css("opacity",0.33); $(".cyanButton").text("33%");
		$(".magentaChannel").css("opacity",0.33); $(".magentaButton").text("33%");
		$(".yellowChannel").css("opacity",0.33); $(".yellowButton").text("33%");
		$(".keyChannel").css("opacity",0.66); $(".keyButton").text("66%");
	}
	if(x<j/2 && x>j/4 && y<i && y> i/2+i/4){ //3,4
		$(".cyanChannel").css("opacity",0); $(".cyanButton").text("0%");
		$(".magentaChannel").css("opacity",0); $(".magentaButton").text("0%");
		$(".yellowChannel").css("opacity",0.33); $(".yellowButton").text("33%");
		$(".keyChannel").css("opacity",0.66); $(".keyButton").text("66%");
	}

	if(x<j/4 && x>0 && y<i/4 && y>0){ //4,1
		$(".cyanChannel").css("opacity",1); $(".cyanButton").text("100%");
		$(".magentaChannel").css("opacity",0); $(".magentaButton").text("0%");
		$(".yellowChannel").css("opacity",0); $(".yellowButton").text("0%");
		$(".keyChannel").css("opacity",0); $(".keyButton").text("0%");
	}
	if(x<j/4 && x>0 && y<i/2 && y>i/4){ //4,2
		$(".cyanChannel").css("opacity",0.66); $(".cyanButton").text("66%");
		$(".magentaChannel").css("opacity",0); $(".magentaButton").text("0%");
		$(".yellowChannel").css("opacity",0); $(".yellowButton").text("0%");
		$(".keyChannel").css("opacity",0.33); $(".keyButton").text("33%");
	}
	if(x<j/4 && x>0 && y<i/2+i/4 && y>i/2){ //4,3
		$(".cyanChannel").css("opacity",0.33); $(".cyanButton").text("33%");
		$(".magentaChannel").css("opacity",0); $(".magentaButton").text("0%");
		$(".yellowChannel").css("opacity",0); $(".yellowButton").text("0%");
		$(".keyChannel").css("opacity",0.66); $(".keyButton").text("33%");
	}
	if(x<j/4 && x>0 && y<i && y> i/2+i/4){ //4,4
		$(".cyanChannel").css("opacity",0); $(".cyanButton").text("0%");
		$(".magentaChannel").css("opacity",0); $(".magentaButton").text("0%");
		$(".yellowChannel").css("opacity",0); $(".yellowButton").text("0%");
		$(".keyChannel").css("opacity",1); $(".keyButton").text("100%");
	}
})

