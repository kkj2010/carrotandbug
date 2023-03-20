"use strict";
import PopUp from "./popup.js";
import {Field, ItemType} from "./field.js";
import * as sound from "./sound.js";
import GameBuilder from "./game.js";

const gameFinishbanner = new PopUp();
const game = new GameBuilder()
  .gameDuration(15)
  .carrotcount(10)
  .bugCount(5)
  .build();

game.setGameStopListener((reason) => {
  let message;
  {
    switch (reason) {
      case "cancel":
        message = "REPLAY?";
        break;
      case "win":
        message = "YOU WON";
        break;
      case "lose":
        message = "YOU LOST";
        break;
      default:
        throw new Error("not valid reason");
    }
    gameFinishbanner.showWithText(message);
  }
});

gameFinishbanner.setClickListner(() => {
  game.start();
});
