'use strict';
const fs = require('fs'); // fsモジュールを使用
const readline = require('readline');
const rs = fs.createReadStream('./popu-pref.csv'); //ファイルストリームを生成 fpみたいなもの
const rl = readline.createInterface({ input: rs });
rl.on('line', lineString => {
  console.log(lineString);
});