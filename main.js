'use strict'

import { BLOCK_SIZE, DEFAULT_GAME_SPEED, FIELD_COL, FIELD_ROW, SCREEN_W, SCREEN_H } from './modules/parentModule.js';
import { BASIC_TETRO_SIZE, TETRO_TYPES, TETRO_COLORS  } from './modules/parentModule.js';

// `canvas`要素の取得および2d指定
let can = document.getElementById('can');
let context = can.getContext('2d');
// キャンバスのサイズ設定
can.width = SCREEN_W;
can.height = SCREEN_H;
can.style.border = "4px solid #898989";
// スタートボタン取得
const START_BTN = document.getElementById('start');
const GAME_OVER = document.getElementById('gameover');
const SCORE = document.getElementById('score');
// 前回スコア
const BEFORE_SCORE = document.getElementById('before_score');
BEFORE_SCORE.textContent = localStorage.getItem('BEFORE_SCORE') || 0;

/** ゲームパラメータ*/
// 初回プレイフラグ
let firstPlayFlg = true;
// ゲームオーバーフラグ
let overFlg = false;
// テトロミノの落下速度
let nowGameSpeed = DEFAULT_GAME_SPEED;
// 消したラインおよびスコア用
let lineCount = 0;
//テトロミノのサイズ
let tetroSize = BASIC_TETRO_SIZE;
// テトロミノの座標
const START_X = FIELD_COL/2 - tetroSize/2;
const START_Y = 0;
// 操作中のテトロミノ
let tetro;
// テトロミノの種類(TETRO_TYPES:0-6)
let tetroType;

// 開始位置のテトロミノの座標
let tetro_x = START_X;
let tetro_y = START_Y;

let field = [];
tetroType = Math.floor(Math.random() * (TETRO_TYPES.length - 1)) + 1; // 0-6(+1)をしない
tetro = TETRO_TYPES[tetroType];


/**
 * プロセス
*/

/** 描画処理 */
// スタートボタン押下後
START_BTN.onclick = function(){
  if(!firstPlayFlg) endProcess().then(() => window.location.reload());
  START_BTN.style.visibility = "hidden";
  GAME_OVER.style.visibility = "hidden";
  init();
  drawAll();
  // nowGameSpeed 毎にテトロミノを落下させる
  setInterval( dropTetro, nowGameSpeed );
}


// ゲーム終了後の処理およびリロード
async function endProcess() {
  // let playerName = await window.prompt("（7文字以下）ユーザー名を入力してください", "")
  // await localStorage.setItem(playerName.slice(0, 7), lineCount);
  await localStorage.setItem("BEFORE_SCORE", lineCount * 100);
}

// フィールド本体
function init() {
  // 一次元
  for(let row = 0; row < FIELD_ROW; row++){
    let rowAry = [];
    // 二次元
    for(let col = 0; col < FIELD_COL; col++){
      rowAry.push(0);
    }
    field.push(rowAry);
  }
}

//ブロック一つを描画する
function drawBlock(x,y,c)
{
	let px = x * BLOCK_SIZE;
	let py = y * BLOCK_SIZE;
	context.fillStyle=TETRO_COLORS[c];
	context.fillRect(px,py,BLOCK_SIZE,BLOCK_SIZE);
	context.strokeStyle="black";
	context.strokeRect(px,py,BLOCK_SIZE,BLOCK_SIZE);
}

/** フィールドの描画 */
function drawAll(){
  SCORE.textContent = lineCount * 100;

  // 画面クリア
  context.clearRect(0, 0, SCREEN_W, SCREEN_H);

  for(let y = 0; y < FIELD_ROW; y++ ){
    for(let x = 0; x < FIELD_COL; x++ ){
      // 1 (ブロック部分) ならば描画
      if(field[y][x]){
        // ブロックの描画
        // ドロップ後は色情報をフィールドに代入
        drawBlock(x,y,field[y][x]);
      }
    }
  }

  /** テトロミノの描画 */
  for(let y=0; y<tetroSize ; y++ ){
    for(let x=0; x<tetroSize ; x++ ){
      // 1 (ブロック部分) ならば描画
      if(tetro[y][x]){
        // ブロックの描画
        drawBlock(tetro_x+x, tetro_y+y, tetroType);
      }
    }
  }
  // ゲーム進行確認
  if(overFlg){
    // スタートボタン再表示
    START_BTN.textContent = 'RETRY';
    START_BTN.style.visibility = "visible";
    firstPlayFlg = false;
    
    // ゲームオーバー表示
    GAME_OVER.style.visibility = "visible";
  }
};

// // 当たり判定
function checkMove(moveX, moveY, rotatedTetro=null) {
  // 現状のテトロミノを代入
  // 回転処理の場合は回転後のテトロミノを代入
  let movedTetro = tetro;
  if (rotatedTetro) movedTetro = rotatedTetro;

  // 座標での移動可否の判定処理
  for(let y = 0; y < tetroSize; y++ ){
    for(let x = 0; x < tetroSize; x++ ){
      // テトロミノ内で 値があるか どうか
      if(movedTetro[y][x]){
        let nextX = tetro_x + moveX + x;
        let nextY = tetro_y + moveY + y;
        // 衝突すると判定された場合 false
        // 最低値・最高値を超えていないか→ブロックが存在しないかで確認
        if( nextX < 0          || // X最低値オーバー
            nextX >= FIELD_COL || // X最高値オーバー
            nextY < -1          || // Y最低値オーバー
            nextY >= FIELD_ROW || // Y最高値オーバー
            field[nextY][nextX]   // 移動後の座標に 1 が存在するか
        ) return false;
      }
    }
  }
  return true;
}


// テトロミノの回転
// 現テトロミノを別配列にコピー
function rotateTetro() {
  let newTetro = [];
  for(let y = 0; y < tetro.length; y++){
    // 1次元配列
    newTetro[y] = [];
    for(let x = 0; x < tetro[0].length; x++ ){
      // 2次元配列
      // (配列の要素数-1 = ROWインデックス最大値) - x = 回転後のROW
      newTetro[y][x] = tetro[tetro.length-1-x][y];
    }
  }
  return newTetro;
}
// テトロミノのドロップ後の固定
function fixTetro() {
  // 1次元配列
  for(let y = 0; y < tetroSize; y++){
    // 2次元配列
    for(let x = 0; x < tetroSize; x++ ){
      if(tetro[y][x]){
        // 着地時点の座標からテトロミノの描画をするイメージ
        field[tetro_y + y][tetro_x + x] = tetroType
      }
    }
  }
}

// ラインがそろったかチェック
function checkLine(){
  // 1次元配列
  for(let y = 0; y < FIELD_ROW; y++){
    // 2次元配列
    let flag = true;
    for(let x = 0; x < FIELD_COL; x++ ){
      // ライン単位で 0 が存在するかチェック
      if(!field[y][x]){
          flag=false;
          break;
      }
    }
    // ラインが全て 1 の場合削除処理
    if(flag){
      lineCount++;

      for(let newY = y; newY > 0; newY--){
        for(let newX = 0; newX < FIELD_COL; newX++){
          field[newY][newX] = field[newY-1][newX];
        }
      }
    }
  }
}

// テトロミノの落下＆落下毎に再描画
function dropTetro(){
  // ゲームオーバーか否か
  if(overFlg) return;
  // 移動可能ならば下へ移動
  // 移動できなければ位置を固定
  if ( checkMove(0, 1) ){
    tetro_y++;
  } else {
    // 次のテトロミノへの準備
    fixTetro();
    checkLine();
    // 次のテトロミノを設定
    tetroType = Math.floor(Math.random() * (TETRO_TYPES.length - 1)) + 1;
    tetro = TETRO_TYPES[tetroType];
    // 座標をスタート位置へ
    tetro_x = START_X;
    tetro_y = START_Y;

    if(!checkMove(0, 0)){
      overFlg = true;
    }
  }
  drawAll(); //再描画
}

// コントローラー
// 十字キーでの操作
document.onkeydown = function(e){
  if(overFlg) return;
  switch( e.key ){
    // →
    case "ArrowRight":
      if ( checkMove(1, 0) ) tetro_x++;
      break;
    // ↓
    case "ArrowDown":
      if ( checkMove(0, 1) ) tetro_y++;
      break;
    // ←
    case "ArrowLeft":
      if ( checkMove(-1, 0) ) tetro_x--;
      break;
    // ハードドロップ(↑)
    case "ArrowUp":
      while ( checkMove(0, +1) ) tetro_y++;
      fixTetro();
      break;
    // スペース
    case " ":
      let newTetro = rotateTetro();
      if( checkMove(0 , 0, newTetro) ) tetro = newTetro;
      break;
  }

  // コントローラーを押下するたびに描画
  drawAll();
}
