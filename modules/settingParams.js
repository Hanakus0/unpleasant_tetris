/** ゲーム画面関連 */
const GAME_START_BTN = document.getElementById('start');
/** 画面描画パラメータ */
const BLOCK_SIZE = 30 // ブロックサイズ(px)
const DEFAULT_GAME_SPEED = 1000; // 初期ゲームスピード
/** canvasの設定 */
// テトリス領域 (20x10)
const FIELD_COL = 10;
const FIELD_ROW = 20;
// キャンバスのサイズ
const SCREEN_W = BLOCK_SIZE * FIELD_COL;
const SCREEN_H = BLOCK_SIZE * FIELD_ROW;

export { 
  GAME_START_BTN,
  BLOCK_SIZE, 
  DEFAULT_GAME_SPEED, 
  FIELD_COL, 
  FIELD_ROW, 
  SCREEN_W, 
  SCREEN_H 
};
