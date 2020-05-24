var gamePattern=[];
var userClickedPattern=[];
var level=0;
function nextSequence()
{
  userClickedPattern=[];
  $("h1").text("Level "+ ++level);
  var randomNumber=Math.floor(Math.random()*4);
  var buttonColors=["red","blue","yellow","green"];
  var randomColor=buttonColors[randomNumber];
  gamePattern.push(randomColor);
  animate(randomColor);
  playSound(randomColor);
  
}

function animate(id)
{
  button="#"+id;
  setTimeout(function(){
    $(button).addClass("pressed");
  },50);
  setTimeout(function(){$(button).removeClass("pressed");},100);
}

function playSound(color)
{
  var sound="sounds/";
  chosenSound=sound+color+".mp3";
  audio = new Audio(chosenSound);
  audio.play();

}


function buttonHandler(userChosenColor)
{

  userClickedPattern.push(userChosenColor);
  animate(userChosenColor);
  if (userClickedPattern.length< gamePattern.length)
  {
    if(compArrays(gamePattern,userClickedPattern))
    {
      playSound(userChosenColor);
    }
      else {
    gameOver();
  }
}
else {
  if(compArrays(gamePattern,userClickedPattern))
    {
    playSound(userChosenColor);
    setTimeout(nextSequence,1000);
    }
    else {
      gameOver();
    }
}
}
function gameOver()
{
  // console.log("game pattern: "+gamePattern);
  // console.log("user pattern: "+userClickedPattern);
  playSound("wrong");
  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").addClass("red");
  setTimeout(function(){$("body").removeClass("red");},200);
  setTimeout(starter,500);
}
function compArrays(gamePattern,userClickedPattern)
{
  for(i=0;i<userClickedPattern.length;i++)
  {
    if(gamePattern[i]!==userClickedPattern[i])
    {
      return false;
    }
  }
  return true;
}

function starter()
{
level=0;
userClickedPattern=[];
gamePattern=[];
$(document).on("keypress",function(){
  if(gamePattern.length==0)
  {
    nextSequence();
  }
});
}

$(".btn").click(function(){
  buttonHandler(this.id);
});

starter();
