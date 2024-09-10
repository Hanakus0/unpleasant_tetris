'use strict'

import {drawBlock} from './modules/parentModule.js';

/** パラメータ*/
const BLOCK_SIZE = 30 // ブロックサイズ(px)
// const TETRO_SIZE = 4; // テトロミノの描画グリッド幅
/** canvasの設定 */
// テトリス領域 (20x10)
const FIELD_COL = 10;
const FIELD_ROW = 20;
// キャンバスのサイズ
const SCREEN_W = BLOCK_SIZE * FIELD_COL;
const SCREEN_H = BLOCK_SIZE * FIELD_ROW;
// 取得および2d指定
let can = document.getElementById('can');
let context = can.getContext('2d');
// キャンバスのサイズ設定
can.width = SCREEN_W
can.height = SCREEN_H;


// テトロミノのグリッド (ブロック部分 = １)
let tetro = [
  [0, 0, 0, 0],
  [1, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0]
];

// テトロミノの座標
let tetro_x = 0;
let tetro_y = 0;

/** テトロミノの描画 */
drawTetro(); // 初期描画

function drawTetro(){

  context.clearRect(0, 0, SCREEN_W, SCREEN_H);

  for(let y = 0; y < tetro.length; y++ ){
    for(let x = 0; x < tetro[y].length; x++ ){
      // 1 (ブロック部分) ならば描画
      if(tetro[y][x]){
        let px = (tetro_x + x) * BLOCK_SIZE;
        let py = (tetro_y + y) * BLOCK_SIZE;
        // ブロックの描画
        drawBlock(context, px, py, BLOCK_SIZE);
      }
    }
  }
};


// コントローラー
// 十字キーでの操作
document.onkeydown = function(e){
  switch( e.key ){
    // →
    case "ArrowRight":
      console.log("Right");
      tetro_x++;
      break;
    // ↓
    case "ArrowDown":
      console.log("Down");
      tetro_y++;
      break;
    // ←
    case "ArrowLeft":
      console.log("Left");
      tetro_x--;
      break;
    // ↑
    case "ArrowUp":
      console.log("Up");
      tetro_y--;
      break;
    // スペース
    case " ":
      console.log("␣");
      break;
  }
  // コントローラーを押下するたびに描画
  drawTetro();
}
