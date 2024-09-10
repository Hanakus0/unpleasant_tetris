'use strict'

import {drawBlock} from './modules/parentModule.js';

// パラメータ
const BLOCK_SIZE = 30 // ブロックサイズ(px)
// const TETRO_SIZE = 4; // テトロミノの描画グリッド幅
// canvasの取得および2d指定
let can = document.getElementById('can');
let context = can.getContext('2d');


// テトロミノのグリッド (ブロック部分 = １)
let tetro = [
  [0, 0, 0, 0],
  [1, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0]
];

for(let y = 0; y < tetro.length; y++ ){
  for(let x = 0; x < tetro[y].length; x++ ){
    // 1 (ブロック部分) ならば描画
    if(tetro[y][x]){
      let px = x * BLOCK_SIZE;
      let py = y * BLOCK_SIZE;
      // ブロックの描画
      drawBlock(context, px, py, BLOCK_SIZE);
    }
  }
}
