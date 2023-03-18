'use strict'

const CARROT_SIZE= 80;
const field= document.querySelector('.game_field')
const fieldRect= field.getBoundingClientRect();

function initGame(){
  console.log(fieldRect);
  addItem('carrot', 5, 'img/carrot.png');
  addItem('bug', 5, 'img/bug.png')
}


function addItem(className, count, imgPath){
const x1= 0;
const y1= 0;
const x2= fieldRect.width- CARROT_SIZE;
const y2= fieldRect.height- CARROT_SIZE;
for(let i=0; i<count; i++){
  const item= document.createElement('img');
  item.setAttribute('class', className);
  item.setAttribute('src', imgPath);
  item.style.position= 'absolute';
  const x= randomNumber(x1,x2);
  const y= randomNumber(y1, y2)
  item.style.left=`${x}px`;
  item.style.top=`${y}px`;
  field.appendChild(item)
}
}

function randomNumber(min, max){
  return Math.random() * (max-min)+ min
}

initGame()