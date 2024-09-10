'use strict'

import { drawBlock } from './modules/parentModule.js';
import { BLOCK_SIZE, FIELD_COL, FIELD_ROW, SCREEN_W, SCREEN_H } from './modules/parentModule.js';

/** パラメータ*/
// `canvas`要素の取得および2d指定
let can = document.getElementById('can');
let context = can.getContext('2d');
// キャンバスのサイズ設定
can.width = SCREEN_W;
can.height = SCREEN_H;
can.style.border = "4px solid #898989";

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

// フィールド本体
// 一次元
let field = [];
function init() {
  // 二次元
  for(let row = 0; row < FIELD_ROW; row++){
    let rowAry = [];
    for(let col = 0; col < FIELD_COL; col++){
      rowAry.push(0);
    }
    field.push(rowAry);
  }
}

/**
 * プロセス
 */
/** 描画処理 */
init();
drawAll();

function drawAll(){
  // 画面クリア
  context.clearRect(0, 0, SCREEN_W, SCREEN_H);

  /** フィールドの描画 */
  for(let y = 0; y < field.length; y++ ){
    for(let x = 0; x < field[0].length; x++ ){
      // 1 (ブロック部分) ならば描画
      if(field[y][x]){
        // ブロックの描画
        drawBlock(x, y, context, BLOCK_SIZE);
      }
    }
  }

  /** テトロミノの描画 */
  for(let y = 0; y < tetro.length; y++ ){
    for(let x = 0; x < tetro[y].length; x++ ){
      // 1 (ブロック部分) ならば描画
      if(tetro[y][x]){
        // ブロックの描画
        drawBlock(tetro_x+x, tetro_y+y, context, BLOCK_SIZE);
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
  drawAll();
}
