'use strict';
const fs = require('fs'); // fsモジュールを使用
const readline = require('readline');
const rs = fs.createReadStream('./popu-pref.csv'); //ファイルストリームを生成 fpみたいなもの
const rl = readline.createInterface({ input: rs });
const prefectureDataMap = new Map(); // key: 都道府県 value: 集計データのオブジェクト

rl.on('line', lineString => { //lineStringで1行ずつループ
  const columns = lineString.split(',');//コンマで区切って情報を配列化
  const year = parseInt(columns[0]);
  const prefecture = columns[1];
  const popu = parseInt(columns[3]);
  if (year === 2010 || year === 2015) {
    let value = null;
    // Mapに既存のデータがあるかチェック
    if (prefectureDataMap.has(prefecture)) {
      value = prefectureDataMap.get(prefecture);
    } else {
      //格納用の箱を作成
      value = {
        popu10: 0, //2010年度の総人口
        popu15: 0, //2015年度の総人口
        change: null //人口の変化率
      };
    }
    //年次に合わせてデータ取得
    if (year === 2010) {
      value.popu10 = popu;
    }
    if (year === 2015) {
      value.popu15 = popu;
    }
    prefectureDataMap.set(prefecture, value);
  }
});
//ファイル読み取り終了後の処理
rl.on('close', () => {
  //都道府県ごとに変化率の計算
  for (const [key,value] of prefectureDataMap){ //pythonでいうin節のようなのをjsだとfor ( 配列 of Map) で出来る模様(for-of構文)
    value.change = value.popu15 / value.popu10
  }
  console.log(prefectureDataMap);
});