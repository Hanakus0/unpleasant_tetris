export function getRandomAlphabets() {
  const alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomAlphabets = [];

  // ランダムな5つのアルファベットを選ぶ
  while (randomAlphabets.length < 5) {
      let randomChar = alphabets[Math.floor(Math.random() * alphabets.length)];
      if (!randomAlphabets.includes(randomChar)) {
          randomAlphabets.push(randomChar);
      }
  }

  return randomAlphabets;
}


// return [newDropkey, newDownkey, newLeftkey, newRightkey, newrotateKey] = alphabetsAry;
