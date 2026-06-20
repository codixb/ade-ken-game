var colors = ["red", "blue", "green", "yellow"];

var gamePattern =[];
var userClickedPattern=[];

var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started){
        $("#level-title").text("Level " + level);
        started = true;
        nextSequence();
    }
}
);

function nextSequence() {
    level++;
    userClickedPattern = [];
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = colors[randomNumber];
    gamePattern.push(randomChosenColor);

$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    playSound(userChosenColor);
    animatePress(userChosenColor);
});

 function checkAnswer(currentLevel) {
if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
        }, 1000);
        
    }
}
else {
    playSound("wrong");
$("#level-title").text("Game Over, Press Any Key to Restart");
$("body").addClass("game-over");
setTimeout(function(){
    $("body").removeClass("game-over");
}, 1000);
restartGame();
}
}

 function restartGame() {
    level = 0;
    gamePattern = [];
    started = false;
}
 
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}