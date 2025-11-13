// Array of possible button colors
var buttonColours = ["red", "blue", "green", "yellow"];

// Stores the sequence the game creates
var gamePattern = [];

// Stores the sequence of colors clicked by the user
var userClickedPattern = [];

// Variables to keep track of game state
var started = false; // Prevents restarting until game is over
var level = 0;       // Keeps track of the current level

// Detects when any key is pressed to start the game
$(document).keypress(function() {
  if (!started) { // Only start if not already started
    $("#level-title").text("Level " + level); // Update title to show level
    nextSequence(); // Generate first sequence
    started = true; // Mark game as started
  }
});

// Detects when one of the 4 color buttons is clicked
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id"); // Get ID of clicked button
  userClickedPattern.push(userChosenColour); // Add to user's pattern

  playSound(userChosenColour); // Play button sound
  animatePress(userChosenColour); // Add press animation

  // Check user's most recent answer
  checkAnswer(userClickedPattern.length - 1);
});

// Function that checks the user's answer at each step
function checkAnswer(currentLevel) {
  // Compare user's click with the game's pattern at same index
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    // If user has completed full sequence correctly
    if (userClickedPattern.length === gamePattern.length) {
      // Wait 1 second then move to next sequence
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else {
    // If user clicks wrong button
    playSound("wrong"); // Play error sound
    $("body").addClass("game-over"); // Flash red screen
    $("#level-title").text("Game Over, Press Any Key to Restart"); // Show message

    // Remove the red background after short delay
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // Reset variables to start fresh
    startOver();
  }
}

// Function to generate next color in the sequence
function nextSequence() {
  userClickedPattern = []; // Reset user pattern for new level
  level++; // Increase level count
  $("#level-title").text("Level " + level); // Update level title

  // Pick a random color and add to the game pattern
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Flash the chosen button (fade in/out effect)
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // Play its corresponding sound
  playSound(randomChosenColour);
}

// Function to animate a button when clicked or shown
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed"); // Add pressed effect
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed"); // Remove effect after 100ms
  }, 100);
}

// Function that plays the sound for the given color
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); // Create new Audio object
  audio.play(); // Play the sound
}

// Function to reset the game after losing
function startOver() {
  level = 0; // Reset level count
  gamePattern = []; // Clear the game's pattern
  started = false; // Allow restart
}