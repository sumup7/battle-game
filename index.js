'use strict';
let turn = 0;//ターン性を区別する変数
let msW;
let enemyDamage = 0;//敵のダメージ
let playerDamage = 0;//プレイヤーのダメージ
let randomSpeed = 0;//素早くて軽い攻撃でランダムに上昇するスピードの値
let op1;
let op2;
let op3;
let s;
let m;
let re;
let pointArray = new Array;//敵の形を決める座標を入れとく配列
const speedArray = [10,20,30];//ランダムに上昇するスピードの値の候補をいれる配列

const canvas = document.body.querySelector('#draw');
let ctx = canvas.getContext('2d');
ctx.fillRect(50, 50, 800, 800);

enemy();
player();

function player() {
ctx.fillStyle = 'red';
ctx.beginPath(350, 350);
// パスの始点を設定する
ctx.moveTo(350, 350);
// 各頂点を結ぶパスを設定する
ctx.lineTo(400, 250);
ctx.lineTo(450, 350);

// パスを閉じることを明示する
ctx.closePath(450, 350);
// 設定したパスで多角形の描画を行う
ctx.fill();
}

function enemyRender() {
  let points = new Map();
  for(let i = 0; i < 8; ++i) {
    let n = Math.floor(Math.random() * 250) + 50;
    let a = Math.floor(Math.random() * 250) + 50;
    points.set(n,a);
  }
  pointArray = Array.from(points);
 }

 

function enemy() {
enemyRender();
ctx.fillStyle = 'yellow';
ctx.beginPath(pointArray[0][0],pointArray[0][1]);
// パスの始点を設定する
ctx.moveTo(pointArray[1][0], pointArray[1][1]);

ctx.lineTo(pointArray[2][0], pointArray[2][1]);
ctx.lineTo(pointArray[3][0], pointArray[3][1]);
ctx.lineTo(pointArray[4][0], pointArray[4][1]);
ctx.lineTo(pointArray[5][0], pointArray[5][1]);
ctx.lineTo(pointArray[6][0], pointArray[6][1]);
// パスを閉じることを明示する
ctx.closePath(pointArray[0][0],pointArray[0][1]);
// 設定したパスで多角形の描画を行う
ctx.fill();
}
//メッセージウインドウのcanvas
const msWindow = document.body.querySelector('#messageWindow');
const msw = msWindow.getContext('2d');

// メッセージウィンドウの描画
function  messageWindow(){
  msw.fillStyle = 'black';							//	ウィンドウの色
  msw.fillRect(50, 50, 800, 800);					//	矩形描画
}
messageWindow();
//自分のキャラのステータスのオブジェクト
const playerStatus = {
  hp: 100,
  offensive: 100,
  defense: 50,
  speed: 90
};
//敵キャラのステータスのオブジェクト
const enemyStatus = {
  hp: 100,
  offensive: 90,
  defense: 70,
  speed: 100
};

let currentPlayerHp = playerStatus.hp;//プレイヤーステータスから現在のプレイヤーのHPに値をいれる
let currentEnemyHp = enemyStatus.hp;//敵のステータスから現在の敵のHPに値をいれる
let currentPlayerSpeed = playerStatus.speed;//プレイヤーステータスから現在のプレイヤーのスピードに値をいれる
let currentEnemySpeed = enemyStatus.speed;//敵のステータスから現在の敵のスピードに値をいれる　

turnGame();

function gameSetCheck() {
   //どちらかか両方のhpが０以下になった時引き分けまたは勝敗を表示してゲームが終わる処理
   if (currentPlayerHp <= 0 && currentEnemyHp <= 0) {
    // 双方相討ちで引き分けになったというメッセージを出す
    ;
    statusDraw(currentPlayerHp, currentEnemyHp,currentPlayerSpeed,currentEnemySpeed);
    message('お互いのHPがゼロになっった。引き分けになった。')
    restartButton();
  } else if (currentEnemyHp <= 0) {
    // 敵のライフがゼロになった。勝った。というメッセージを出す
    ;
    statusDraw(currentPlayerHp, currentEnemyHp,currentPlayerSpeed,currentEnemySpeed);
    message('敵のライフがゼロになった。勝った。');
    restartButton();
  } else if (currentPlayerHp <= 0) {
    // 自分のライフがゼロになった。負けた。というメッセージを出す
    ;
    statusDraw(currentPlayerHp, currentEnemyHp,currentPlayerSpeed,currentEnemySpeed);
    message('自分のライフがゼロになった。負けた。');
    restartButton();
    }else if(turn === 1 && currentPlayerSpeed > enemyStatus.speed){
      turn = 2;
      turnGame();
    }else if(turn === 1 && currentPlayerSpeed < enemyStatus.speed){
      turn = 3;
      turnGame();
    }else if(turn === 2 || turn === 3 || turn === 5){
      turn = 0;
      turnGame();
    }else if(turn === 4 && currentPlayerSpeed > enemyStatus.speed){
      turn = 2;
      turnGame();
    } else if(turn === 4 && currentPlayerSpeed < enemyStatus.speed) {
      turn = 5;
      turnGame();
    }
    else {
  ;
  statusDraw(currentPlayerHp, currentEnemyHp,currentPlayerSpeed,currentEnemySpeed);
  optionButton1();
  optionButton2();
  optionButton3();}
}

// ターン制の戦闘処理
function turnGame() {
 
  if (turn === 0
    ) {
    gameSetCheck();
  } else if (turn === 1 && currentPlayerSpeed > enemyStatus.speed) {
    //技１を選んで自分のスピードが敵のスピードを上まって先攻の場合
    ;
    waza1damage();
    statusDraw(currentPlayerHp, currentEnemyHp,currentPlayerSpeed,currentEnemySpeed);
    message('先手をとった。重くて遅い一撃' + enemyDamage + 'のダメージ');
    turnNext();
  } else if (turn === 1 && currentPlayerSpeed <= enemyStatus.speed) {
    //技１を選んで相手のスピードが自分のスピードを上まった後攻の場合または双方のスピードが同じだった後攻の場合
    ;
    enemyOffensive();
    statusDraw(currentPlayerHp, currentEnemyHp,currentPlayerSpeed,currentEnemySpeed);
    message('素早さで負けた。相手の攻撃' + playerDamage + 'のダメージ');
    turnNext();
  } else if (turn === 2) {
    //先攻した時の相手の攻撃
    ;
    enemyOffensive();
    statusDraw(currentPlayerHp, currentEnemyHp,currentPlayerSpeed,currentEnemySpeed);
    message('相手の攻撃のターン。相手の攻撃' + playerDamage + 'のダメージ');
    turnNext();
  } else if (turn === 3) {
    //相手に先攻された時の後攻の攻撃
    ;
    waza1damage();
    statusDraw(currentPlayerHp, currentEnemyHp,currentPlayerSpeed,currentEnemySpeed);
    message('自分の攻撃のターン。重くて遅い一撃' + enemyDamage + 'のダメージ');
    // statusDraw(currentPlayerHp, currentEnemyHp,currentPlayerSpeed,currentEnemySpeed);
    turnNext();
  } else if (turn === 4 && currentPlayerSpeed > enemyStatus.speed) {
    //技２で相手のスピードを上回り先攻した場合
    ;
    waza2damage();
    message('先手をとった。素早くて軽い攻撃' + enemyDamage + 'のダメージ。自分のスピードが'+ randomSpeed + '上がった。');
    statusDraw(currentPlayerHp, currentEnemyHp,currentPlayerSpeed,currentEnemySpeed);
    turnNext();
  } else if (turn === 4 && currentPlayerSpeed < enemyStatus.speed) {
    //技２でスピード負けて相手の先攻になった場合
    ;
    enemyOffensive();
    message('素早さで負けた。相手の攻撃' + playerDamage + 'のダメージ');
    statusDraw(currentPlayerHp, currentEnemyHp,currentPlayerSpeed,currentEnemySpeed);
    turnNext();
  } else if(turn === 5) {
    //技２で後攻になった時の自分の攻撃のターン
    ;
    waza2damage();
    message('自分の攻撃のターン。素早くて軽い攻撃' + enemyDamage + 'のダメージ。自分のスピードが' + randomSpeed + '上がった。');
    statusDraw(currentPlayerHp, currentEnemyHp,currentPlayerSpeed,currentEnemySpeed);
    turnNext();
    }else if(turn === 6 && currentPlayerSpeed > enemyStatus.speed){
    //技３で相手のスピードを上まって先に回復を使う場合
    ;
    waza3recoveryHp();
    message('先手をとった。自分のHPを回復。HPが50回復して'+ currentPlayerHp + 'になっった。');
    statusDraw(currentPlayerHp, currentEnemyHp,currentPlayerSpeed,currentEnemySpeed);
    document.body.onkeydown = () => {
      turn = 2;
      eraserStatusAndMessage();
      turnGame();}
    }else if(turn === 6 && currentPlayerSpeed < enemyStatus.speed) {
      //技３で相手のスピードが上まって先攻される場合
      ;
      enemyOffensive();
      message('先手を取られた。相手の攻撃' + playerDamage + 'のダメージ');
      statusDraw(currentPlayerHp, currentEnemyHp,currentPlayerSpeed,currentEnemySpeed);
      document.body.onkeydown = () => {
        turn = 7;
        eraserStatusAndMessage();
        turnGame();}
    }else if(turn === 7) {
      //技３で先攻された場合の自分の回復ターン
      ;
      waza3recoveryHp();
      message('自分のターン。自分のHPを回復。HPが50回復した'+ currentPlayerHp + 'になっった。');
      statusDraw(currentPlayerHp, currentEnemyHp,currentPlayerSpeed,currentEnemySpeed);
      document.body.onkeydown = () => {
        turn = 0;
        eraserStatusAndMessage();
        turnGame();}
    } 
    }

    //技１の選択肢を選んだ時の処理
    function waza1damage() {
      enemyDamage = (playerStatus.offensive - enemyStatus.defense) * 1.5;
      currentEnemyHp = currentEnemyHp - enemyDamage;
      //ライフがゼロ以下ならゼロにする
      if(currentEnemyHp < 0){
        currentEnemyHp = 0;
        return;
    }}
    //技２の選択肢を選んだ時の処理
    function waza2damage() {
      enemyDamage = playerStatus.offensive - enemyStatus.defense;
      const r = Math.floor(Math.random() * 100);
      const i = r % speedArray.length;
      randomSpeed = speedArray[i];
      currentPlayerSpeed = currentPlayerSpeed + randomSpeed;
      currentEnemyHp = currentEnemyHp - enemyDamage;
      //ライフがゼロ以下ならゼロにする
      if(currentEnemyHp < 0){
        currentEnemyHp = 0;
        return;
    }}
    //技３の選択肢を選んだ時の処理
    function waza3recoveryHp() {
      currentPlayerHp = currentPlayerHp + 50;
    }
    //敵の攻撃
    function enemyOffensive() {
      playerDamage = enemyStatus.offensive - playerStatus.defense;
      currentPlayerHp = currentPlayerHp - playerDamage;
      //ライフがゼロ以下ならゼロにする
      if(currentPlayerHp < 0){
        currentPlayerHp = 0;
      return;
    }}
    //自分と敵のHPとスピードを表示する処理
    function statusDraw(currentPlayerHp, currentEnemyHp,currentPlayerSpeed,currentEnemySpeed) {
      msW = msWindow.parentNode;
      s = document.createElement('div');
      s.setAttribute('id', 'status');
      s.style.position = 'absolute';
      s.style.top = '730px';
      s.style.left = '60px';
      s.style.width = '800px';
      s.style.height = '100px';
      s.style.color = 'white';
      s.style.font = '28px monospace';
      msW.appendChild(s);
      s.innerHTML = '自分のHP' + currentPlayerHp + 'スピード'+ currentPlayerSpeed + ' ' + '敵のHP' + currentEnemyHp + 'スピード' + currentEnemySpeed;
    }

    //メッセージを描画する関数
    function message(textMessage) {
      msW = msWindow.parentNode;
      m = document.createElement('div');
      m.setAttribute('id', 'message');
      m.style.position = 'absolute';
      m.style.top = '800px';
      m.style.left = '60px';
      m.style.width = '700px';
      m.style.height = '100px';
      m.style.color = 'white';
      m.style.textAlign = 'center';
      m.style.font = '50px monospace';
      msW.appendChild(m);
      m.innerHTML = textMessage;
    }
    //キーを押してターンを進める
    function turnNext() {
      document.body.onkeydown = () => {
        eraserStatusAndMessage();
        gameSetCheck();
      }
    }
    //画面の初期情報を消す関数
    function eraser() {
      msW.removeChild(op1);
      msW.removeChild(op2);
      msW.removeChild(op3);
      msW.removeChild(s);
    }
    //画面のステータス情報とメッセージを消す関数
    function eraserStatusAndMessage() {
      msW.removeChild(s);
      msW.removeChild(m);
    }
    //技１を選択するボタン
    function optionButton1() {
      msW = msWindow.parentNode;
      op1 = document.createElement('div');
      op1.setAttribute('id', 'option1');
      op1.style.position = 'absolute';
      op1.style.top = '780px';
      op1.style.left = '60px';
      op1.style.width = '400px';
      op1.style.height = '300px';
      // op1.style.background = 'transparent';
      op1.style.color = 'white';
      op1.style.textAlign = 'left';
      op1.style.font = '50px monospace';
      msW.appendChild(op1);
      op1.innerHTML = "重く遅い一撃";
      op1.addEventListener('click', ()　=> {
        eraser();
        turn = 1;
        turnGame()
      })}

      //技２を選択するボタン２
      function optionButton2() {
        msW = msWindow.parentNode;
        op2 = document.createElement('div');
        op2.setAttribute('id', 'option2');
        op2.style.position = 'absolute';
        op2.style.top = '870px';
        op2.style.left = '60px';
        op2.style.width = '500px';
        op2.style.height = '300px';
        op2.style.color = 'white';
        op2.style.textAlign = 'left';
        op2.style.font = '50px monospace';
        msW.appendChild(op2);
        op2.innerHTML = "素早く軽い攻撃";
        op2.addEventListener('click', () => {
          eraser();
          turn = 4;
          turnGame();
        })
      }
      //技３を選択するボタン３
      function optionButton3() {
        msW = msWindow.parentNode;
        op3 = document.createElement('div');
        op3.setAttribute('id', 'option3');
        op3.style.position = 'absolute';
        op3.style.top = '960px';
        op3.style.left = '60px';
        op3.style.width = '400px';
        op3.style.height = '300px';
        op3.style.background = 'transparent';
        op3.style.color = 'white';
        op3.style.textAlign = 'left';
        op3.style.font = '50px monospace';
        msW.appendChild(op3);
        op3.innerHTML = "回復";
        op3.addEventListener('click', () => {
          eraser();
          turn = 6;
　　　　　　turnGame();
        })}
    //もう１回戦うボタン
    function restartButton() {
      msW = msWindow.parentNode;
      re = document.createElement('div');
      re.setAttribute('id', 'restart');
      re.style.position = 'absolute';
      re.style.top = '960px';
      re.style.left = '60px';
      re.style.width = '550px';
      re.style.height = '300px';
      re.style.color = 'pink';
      re.style.textAlign = 'left';
      re.style.font = '40px monospace';
      msW.appendChild(re);
      re.innerHTML = "もう一度戦うならここをクリック";
      re.addEventListener('click', () => {
        location.reload();
      })}        