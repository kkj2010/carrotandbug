'use strict'

export default class PopUp{
 constructor(){
this.popUp = document.querySelector(".pop-up");
this.popUpText = document.querySelector(".pop-up_message");
this.popUpRefresh = document.querySelector(".pop-up_refresh");
this.popUpRefresh.addEventListener('click',()=>{
  this.onClick && this.onClick();
  hide()
})
}

setClickListner(onClick){
 this.onClick= onClick;
}

showWithText(text) {
  this.popUpText.innerText = text;
  this.popUp.classList.remove("pop-up--hide");
}


hide(){
  this.popUp.classList.add('pop-up--hide')
}

}