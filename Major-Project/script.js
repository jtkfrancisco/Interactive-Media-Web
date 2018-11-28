//todo
//animate background based on last refresh time [maybe]
//chatbot flowchart 
//flowchart data storage so users can refelct on how theyve been feeling
//implement settings and suggestions [reset name, manual city]
//make statements reflect sunset times

ipLookUp()
setBackground()

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