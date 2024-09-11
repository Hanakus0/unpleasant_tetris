/** パラメータ*/
const BLOCK_SIZE = 30 // ブロックサイズ(px)
const DEFAULT_GAME_SPEED = 1000;
// const TETRO_SIZE = 4; // テトロミノの描画グリッド幅
/** canvasの設定 */
// テトリス領域 (20x10)
const FIELD_COL = 10;
const FIELD_ROW = 20;
// キャンバスのサイズ
const SCREEN_W = BLOCK_SIZE * FIELD_COL;
const SCREEN_H = BLOCK_SIZE * FIELD_ROW;

export { BLOCK_SIZE, DEFAULT_GAME_SPEED, FIELD_COL, FIELD_ROW, SCREEN_W, SCREEN_H };
