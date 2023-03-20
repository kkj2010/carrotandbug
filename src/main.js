"use strict";
import PopUp from "./popup.js";
import Field from "./field.js";
import * as sound from './sound.js'

const CARROT_COUNT = 15;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 30;

const gameBtn = document.querySelector(".game_button");
const gameTimer = document.querySelector(".game_timer");
const gameScore = document.querySelector(".game_score");



let started = false;
let score = 0;
let timer = undefined;

const gameFinishbanner = new PopUp();
gameFinishbanner.setClickListner(() => {
  startGame();
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT
  );
gameField.setClickListener(onItemClick);

function onItemClick(item) {
  if (!started) {
    return;
  }
  if (item === "carrot") {
    score++;
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (item === "bug") {
    finishGame(false);
  }
}

// field.addEventListener("click", onFieldClick);

gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  sound.playBackground();
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  gameFinishbanner.showWithText("REPLAY?");
  sound.playAlert();
  sound.stopBackground();
}

function finishGame(win) {
  started = false;
  hideGameButton();
  if (win) {
    sound.playWin();
  } else {
    sound.playBug();
  }
  stopGameTimer();
  sound.stopBackground();
  gameFinishbanner.showWithText(win ? "YOU WON" : "YOU LOST");
}

function showStopButton() {
  const icon = gameBtn.querySelector(".fa");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
  gameBtn.style.visibility = "visible";
}

function hideGameButton() {
  gameBtn.style.visibility = "hidden";
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);

  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(timer) {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  gameTimer.innerText = `${minutes}: ${seconds}`;
}

function initGame() {
  score = 0;
  gameScore.innerText = CARROT_COUNT;
  gameField.init();
}



function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}

