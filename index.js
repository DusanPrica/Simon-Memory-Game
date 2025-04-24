/*var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;
var highScore = 0;

$(document).keydown(function (){
    if (gameStarted === false) {
        nextSequence();
        gameStarted = true;
    }
})

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
})

function nextSequence(){

    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }  else {
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}*/

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var highScore = localStorage.getItem("highScore") || 0;

$(document).ready(function () {
  $(document).keydown(function () {
    if (!started) {
      $("#highscore").text("High Score: " + highScore);
      nextSequence();
      started = true;
    }
  });

$(".btn").on("click touchstart", function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  });
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * buttonColours.length);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  setTimeout(function () {
    playSound(randomChosenColour);
  }, 500);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    if (level > highScore) {
      highScore = level;
      localStorage.setItem("highScore", highScore);
    }

    $("#highscore").text("High Score: " + highScore);
    $("h1").text("Game Over! Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

