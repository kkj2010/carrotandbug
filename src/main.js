"use strict";
import PopUp from "./popup.js";
import Field from "./field.js";
import * as sound from './sound.js'
import Game from "./game.js";


const gameFinishbanner = new PopUp();
const game= new Game(30, 15, 5);

game.setGameStopListener(reason=>{
  let message;{
  switch(reason){
    case 'cancel':
    message= "REPLAY?"
    break;
    case 'win':
    message="YOU WON"
    break;
    case 'lose':
    message="YOU LOST"
    break;
    default:
    throw new Error('not valid reason')
  }
 gameFinishbanner.showWithText(message)
  }
})

gameFinishbanner.setClickListner(() => {
  game.start()
});

