export function drawBlock (x, y, context, blockSize){
  let printX = x * blockSize;
  let printY = y * blockSize;

  context.fillStyle = "red";
  context.fillRect(printX, printY, blockSize, blockSize);
  context.strokeStyle ='black';
  context.strokeRect(printX, printY, blockSize, blockSize);
}

