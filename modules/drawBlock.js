export function drawBlock (x, y, context, blockSize, tetroType){
  let printX = x * blockSize;
  let printY = y * blockSize;

  context.fillStyle = TETRO_COLORS[tetroType];
  context.fillRect(printX, printY, blockSize, blockSize);
  context.strokeStyle ='black';
  context.strokeRect(printX, printY, blockSize, blockSize);
}

const TETRO_COLORS = [
  "",
  "#690202", // 赤気味
  "#946134", // オレンジ気味
  "#003669", // 青気味
  "#d2fbfc", // 水色気味
  "#0c6569", // 緑気味
  "#676902", // 黄色気味
  "#460c69", // 紫気味
];
