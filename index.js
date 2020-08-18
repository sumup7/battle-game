'use strict';

let option1 = "風を使う";
let option2 = "火を使う";
let option3 = "水を使う";

let canvas = document.body.querySelector('#draw');
let ctx = canvas.getContext('2d');
ctx.fillRect(50, 50, 800, 800);

let msWindow = document.body.querySelector('#messageWindow');
let msw = msWindow.getContext('2d');

function messageWindow(e) {
  msw.fillStyle = 'black';							//	ウィンドウの色
  msw.fillRect(50, 50, 800, 800);					//	矩形描画
						
}

function optionButton1(x, y, width, height) {
  let oButton = document.body.querySelector('#option1');
  let ob1 = oButton.getContext('2d');
  ob1.font = "50px 'ＭＳ ゴシック'"; 									//	文字フォントを設定
  ob1.fillStyle = 'red'; //	文字色
  ob1.rect(60, 60, 100, 100);
  //ob1.stroke();
  ob1.fillText(option1, 60, 120);
  oButton.addEventListener('click', function (e) {
    let button = e.target.getBoundingClientRect();
    mouseX = e.clientX - button.left;
    mouseY = e.clientY - button.top;
    if (x < mouseX && mouseX < x + width) {
      if (y < mouseY && mouseY < y + height) {
        let one = 1;
        console.log(one);
}}})}

window.onload = function () {
        messageWindow();
        optionButton1();
}