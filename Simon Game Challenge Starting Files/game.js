var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


/*
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];
var started= false;
var level=0;
*/
$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
  

/*$(document).keypress(function(){
    if( !started ){
     $("#level-title").text("Level "+ level);
     nextSequence();
      started= true;
    }
   
});*/
$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);
  
    //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
  });
  
/*
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userChosenColor.length-1);
});*/

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over, Press Any Key to Restart");

      startOver();

    }

}
/*
function checkAnswer(currentColour){
    if(userClickedPattern[currentColour]===gamePattern[currentColour]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(nextSequence(),1000);
        }
    }else{
        console.log("wrong");
    }
}
*/


function nextSequence() {
    userClickedPattern=[];

    //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;
  
    //5. Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level);
  
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  }
  function playSound(name) {
    var audio = new Audio("./sounds/" +  name + ".mp3");
    audio.play();
  }


function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColor).removeClass("pressed");
    },100);
  }
  function startOver(){
    level = 0;
    started = false;
    gamePattern=[];
  }