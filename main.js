'use strict'

import { BLOCK_SIZE, DEFAULT_GAME_SPEED, FIELD_COL, FIELD_ROW, SCREEN_W, SCREEN_H } from './modules/parentModule.js';
import { BASIC_TETRO_SIZE, TETRO_TYPES, TETRO_COLORS } from './modules/parentModule.js';
import { getRandomAlphabets } from './modules/parentModule.js';
import createListElement from './modules/parentModule.js';

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
// 前回プレイ
const PLAY_NUM = document.getElementById('play_num');
let playNumber = localStorage.getItem('PLAY_NUM');
PLAY_NUM.textContent = playNumber;
// 前回スコア
const BEFORE_SCORE = document.getElementById('before_score');
BEFORE_SCORE.textContent = localStorage.getItem('BEFORE_SCORE') || 0;
// ハイスコア
const HIGH_SCORE = document.getElementById('high_score');
const HIGH_SCORE_VAL = localStorage.getItem('HIGH_SCORE');
HIGH_SCORE.textContent = HIGH_SCORE_VAL || 0;

/** コントローラー関連 */
// 初期操作キー説明
const LEFT = document.getElementById('left');
const RIGHT = document.getElementById('right');
const DOWN = document.getElementById('down');
const HARD_DROP = document.getElementById('hard_drop');
const ROTATE = document.getElementById('rotate');
// 初期操作キー
let Dropkey = "ArrowUp";
let Downkey = "ArrowDown";
let Leftkey = "ArrowLeft";
let Rightkey = "ArrowRight";
let rotateKey = " ";

/** ゲームパラメータ*/
// 初回プレイフラグ
const playModeList = document.getElementById('mode_list');
// インターバルID
let intervalID;
// 初回プレイフラグ
let firstPlayFlg = true;

/** ギミックフラグ */
// ストレンジテトロフラグ
let addStrangeTetroFlg = false;
// ダークモードフラグ
let darkModeFlg = false;
// コントローラー変化フラグ
let changeControllerFlg = false;
// スピード変調フラグ
let changeSpeedFlg = false;

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
tetroType = Math.floor(Math.random() * (TETRO_TYPES.length - 1 - 5)) + 1; // 0-6(+1)をしない
tetro = TETRO_TYPES[tetroType];


/**
 * プロセス
*/

/** 描画処理 */
// スタートボタン押下後
START_BTN.onclick = function(){
  if(!firstPlayFlg) endProcess().then(() => window.location.reload());
  document.getElementById('score-container').remove();
  START_BTN.style.visibility = "hidden";
  GAME_OVER.style.visibility = "hidden";
  init();
  drawAll();
  // nowGameSpeed 毎にテトロミノを落下させる
  intervalID = setInterval( dropTetro, nowGameSpeed );
}


// ゲーム終了後の処理およびリロード
async function endProcess() {
  // 今回のプレイがハイスコアよりもスコアが高い場合は保存
  if (HIGH_SCORE_VAL < (lineCount*100)) {
    await localStorage.setItem("HIGH_SCORE", lineCount*100);
  }
  await localStorage.setItem("PLAY_NUM", ++playNumber);
  await localStorage.setItem("BEFORE_SCORE", lineCount*100);
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
  // テトロミノの色
	context.fillStyle = TETRO_COLORS[c];
  // テトロミノの枠色
	context.strokeStyle = "black";
  /** ギミックフラグ管理 */
    // ストレンジテトロフラグの確認
  if(darkModeFlg) {
    context.fillStyle="black";
    context.strokeStyle="#001433";
  }
	context.fillRect(px,py,BLOCK_SIZE,BLOCK_SIZE);
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
            nextY < 0          || // Y最低値オーバー
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
  for(let y = 0; y < tetroSize; y++){
    // 1次元配列
    newTetro[y] = [];
    for(let x = 0; x < tetroSize; x++ ){
      // 2次元配列
      // (配列の要素数-1 = ROWインデックス最大値) - x = 回転後のROW
      newTetro[y][x] = tetro[tetroSize-1-x][y];
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
      // スコアが上がるたびに落下速度を 10ms 早める
      nowGameSpeed = DEFAULT_GAME_SPEED - lineCount * 10;
      // 削除分ラインの移動
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

  console.log(TETRO_TYPES.length);
  console.log(tetro);
  console.log(tetroType);
  console.log(Math.floor(Math.random() * (TETRO_TYPES.length - 1 - 5)) + 1);
  console.log(Math.floor(Math.random() * (TETRO_TYPES.length - 1)) + 1);
  console.log(checkMove(0, 1));

  if ( checkMove(0, 1) ){
    tetro_y++;
  } else {

    // ギミックトリガー地点
    switchGimmick();
    
    // 次のテトロミノへの準備
    fixTetro();
    checkLine();
    // 次のテトロミノを設定
    tetroType = Math.floor(Math.random() * (TETRO_TYPES.length - 1 - 5)) + 1;
    /** ギミックフラグ管理 */
    // ストレンジテトロフラグの確認
    if(addStrangeTetroFlg) tetroType = Math.floor(Math.random() * (TETRO_TYPES.length - 1)) + 1;
    /** ギミックフラグ管理 */
    // コントローラー変化フラグの確認
    if(changeControllerFlg) changecontrollerKeys();
    /** ギミックフラグ管理 */
    // スピードギミックフラグの確認
    if(changeSpeedFlg) changeGameSpeed();
    
    // テトロの決定
    tetro = TETRO_TYPES[tetroType];
    // 座標をスタート位置へ
    tetro_x = START_X;
    tetro_y = START_Y;
    
    // パラメータ反映のためリスタート
    clearInterval(intervalID);
    intervalID = setInterval( dropTetro, nowGameSpeed );
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
    case Rightkey:
      if ( checkMove(1, 0) ) tetro_x++;
      break;
    // ↓
    case Downkey:
      if ( checkMove(0, 1) ) tetro_y++;
      break;
    // ←
    case Leftkey:
      if ( checkMove(-1, 0) ) tetro_x--;
      break;
    // ハードドロップ(↑)
    case Dropkey:
      while ( checkMove(0, +1) ) tetro_y++;
      fixTetro();
      break;
    // スペース
    case rotateKey:
      let newTetro = rotateTetro();
      if( checkMove(0 , 0, newTetro) ) tetro = newTetro;
      break;
  }
  // コントローラーを押下するたびに描画
  drawAll();
}

/** ギミックコード */
// ギミックのトリガー
function switchGimmick() {
  // let modeNum = (Math.floor(Math.random() * 20));
  let modeNum = (Math.floor(Math.random() * 10));
  // switch分岐
  // switch(modeNum) {
  //   case 0:
  //   case 1:
  //   case 2:
      (addStrangeTetroFlg) ? addStrangeTetroFlg = false :  addStrangeTetroFlg = true ;
      createListElement('add_strange', addStrangeTetroFlg);
      // break;
    // case 3:
    // case 4:
    // case 5:
    //   (darkModeFlg) ? darkModeFlg = false :  darkModeFlg = true ;
    //   changeDarkMode();
    //   break;
    // case 6:
    // case 7:
    // case 8:
    // case 9:
    // case 10:
    // case 11:
    //   (changeControllerFlg) ? changeControllerFlg = false :  changeControllerFlg = true ;
    //   changecontrollerKeys();
    //   break;
    // case 12:
    // case 13:
    // case 14:
    //   (changeSpeedFlg) ? changeSpeedFlg = false :  changeSpeedFlg = true ;
    //   changeGameSpeed();
    //   break;
  // }
}

// ギミック関数一覧
// addStrangeTetro()
// changecontrollerKeys()
// changeDarkMode()
// changeGameSpeed()

// 操作キーを変更
function changecontrollerKeys(){
  // ランダムでアルファベットを5つ取得
  let [newDropkey, newDownkey, newLeftkey, newRightkey, newrotateKey] = getRandomAlphabets();
  // 操作キーの変更
  Leftkey = newLeftkey;
  Rightkey = newRightkey;
  Downkey = newDownkey;
  Dropkey = newDropkey;
  rotateKey = newrotateKey;
  // 操作キーの説明表示を変更
  LEFT.textContent = newLeftkey;
  RIGHT.textContent = newRightkey;
  DOWN.textContent = newDownkey;
  HARD_DROP.textContent = newDropkey;
  ROTATE.textContent = newrotateKey;
  // モード表記追加
  createListElement('chg_Controller', changeControllerFlg);
}

// // テトロミノの形を追加
// function addStrangeTetroProc(){
//   // モード表記追加
//   createListElement('add_strange', addStrangeTetroFlg);
// }

// テトロミノの色、背景色を変更
function changeDarkMode(){
  // モード表記追加
  createListElement('dark_mode', darkModeFlg);
  // ダークモード用のフラグを立てる
  // if(darkModeFlg){
  //   // 画面背景色
  //   document.body.style.backgroundColor = "#000";
  // } else {
  //   document.body.style.backgroundColor = "#008";
  // }
}

// ランダムな落下スピードに変更
function changeGameSpeed(){
  // モード表記追加
  createListElement('chg_speed', changeSpeedFlg);
  // ランダムにスピードを決定(スピードは 400-800 で調整)
  nowGameSpeed = Math.floor(Math.random() * 5) * 200;
}
