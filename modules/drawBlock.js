export function drawBlock(context, printX, printY, blockSize){
  context.fillStyle = "red";
  context.fillRect(printX, printY, blockSize, blockSize);
  context.strokeStyle ='black';
  context.strokeRect(printX, printY, blockSize, blockSize);
}
