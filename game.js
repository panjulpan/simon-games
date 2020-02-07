var buttonColours = ["red", "green", "blue", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(() => {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click( function() {
    var userChoosenColours = $(this).attr("id");
    userClickedPattern.push(userChoosenColours);

    playSound(userChoosenColours);
    animatePress(userChoosenColours);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }

    } else {

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        var audio = new Audio(src= "sounds/wrong.mp3");
        audio.play();
        startOver();

    }
  }

function nextSequence() {


    userClickedPattern = []

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColour);
    // console.log(gamePattern);
    
    $("#" + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColour);
};

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(name) {
    var audio = new Audio(src= "sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColours) {
    $("#" + currentColours).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColours).removeClass("pressed");
    }, 100);
}

