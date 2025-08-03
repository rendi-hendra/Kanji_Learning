import { createClient } from "redis";

const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();

const data = {
  freq_mainichi_shinbun: 2,
  grade: 1,
  heisig_en: "one",
  jlpt: 5,
  kanji: "一",
  kun_readings: ["ひと-", "ひと.つ"],
  meanings: ["one", "one radical (no.1)"],
  name_readings: [
    "い",
    "いっ",
    "いる",
    "かず",
    "かつ",
    "かづ",
    "てん",
    "はじめ",
    "ひ",
    "ひとつ",
    "まこと",
  ],
  notes: [],
  on_readings: ["イチ", "イツ"],
  stroke_count: 1,
  unicode: "4E00",
};

// const res1 = await client.sAdd("setKanji", JSON.stringify(data));
// console.log(res1);

const result = JSON.parse(await client.SINTER("setKanji"));
console.log(result);
// console.log(JSON.parse(result).kanji == "一");
// const test = await client.lPush("arr", JSON.stringify(data));
// console.log(await client.lRange("arr", 0, -1));

// await client.set("testing", JSON.stringify(data));
// const result = await client.get("testing");
// await client.set("testing", JSON.stringify(result));
// console.log(JSON.parse(await client.get("testing")));
