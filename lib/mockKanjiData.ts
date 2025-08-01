export interface Kanji {
  freq_mainichi_shinbun?: number;
  grade?: number;
  heisig_en?: string;
  jlpt: string;
  kanji: string;
  kun_readings: string[];
  meanings: string[];
  name_readings?: string[];
  notes?: [];
  on_readings: string[];
  stroke_count: number;
  unicode?: string;
}

export interface ResponseKanji {
  furigana: string[];
  level: string;
  meaning: string[];
  romaji: string[];
  word: string;
}

export interface ResponseWords {
  Kanji: string;
  meanings: string[];
  readings: string[];
  jlpt: string[];
  parts_of_speech: string[];
  examples: [
    {
      text: string;
      html: string;
      translations: string[];
    }
  ];
}

// export const mockKanjiData: Kanji[] = [
//   {
//     kanji: "日",
//     meanings: ["sun", "day"],
//     on_readings: ["ニチ", "ジツ"],
//     kun_readings: ["ひ", "か"],
//     jlpt: "N5",
//     strokes: 4,
//   },
//   {
//     kanji: "月",
//     meanings: ["moon", "month"],
//     onReadings: ["ゲツ", "ガツ"],
//     kunReadings: ["つき"],
//     jlptLevel: "N5",
//     strokes: 4,
//   },
//   {
//     kanji: "水",
//     meanings: ["water"],
//     onReadings: ["スイ"],
//     kunReadings: ["みず"],
//     jlptLevel: "N5",
//     strokes: 4,
//   },
//   {
//     kanji: "火",
//     meanings: ["fire"],
//     onReadings: ["カ"],
//     kunReadings: ["ひ"],
//     jlptLevel: "N5",
//     strokes: 4,
//   },
//   {
//     kanji: "木",
//     meanings: ["tree", "wood"],
//     onReadings: ["ボク", "モク"],
//     kunReadings: ["き"],
//     jlptLevel: "N5",
//     strokes: 4,
//   },
//   {
//     kanji: "金",
//     meanings: ["gold", "money", "metal"],
//     onReadings: ["キン", "コン"],
//     kunReadings: ["かね"],
//     jlptLevel: "N5",
//     strokes: 8,
//   },
//   {
//     kanji: "土",
//     meanings: ["earth", "soil"],
//     onReadings: ["ド", "ト"],
//     kunReadings: ["つち"],
//     jlptLevel: "N5",
//     strokes: 3,
//   },
//   {
//     kanji: "人",
//     meanings: ["person", "people"],
//     onReadings: ["ジン", "ニン"],
//     kunReadings: ["ひと"],
//     jlptLevel: "N5",
//     strokes: 2,
//   },
//   {
//     kanji: "学",
//     meanings: ["study", "learning"],
//     onReadings: ["ガク"],
//     kunReadings: ["まな"],
//     jlptLevel: "N5",
//     strokes: 8,
//   },
//   {
//     kanji: "生",
//     meanings: ["life", "birth", "student"],
//     onReadings: ["セイ", "ショウ"],
//     kunReadings: ["い", "う", "なま"],
//     jlptLevel: "N5",
//     strokes: 5,
//   },
//   {
//     kanji: "時",
//     meanings: ["time", "hour"],
//     onReadings: ["ジ"],
//     kunReadings: ["とき"],
//     jlptLevel: "N4",
//     strokes: 10,
//   },
//   {
//     kanji: "間",
//     meanings: ["interval", "space", "between"],
//     onReadings: ["カン", "ケン"],
//     kunReadings: ["あいだ", "ま"],
//     jlptLevel: "N4",
//     strokes: 12,
//   },
//   {
//     kanji: "心",
//     meanings: ["heart", "mind", "spirit"],
//     onReadings: ["シン"],
//     kunReadings: ["こころ"],
//     jlptLevel: "N4",
//     strokes: 4,
//   },
//   {
//     kanji: "思",
//     meanings: ["think", "thought"],
//     onReadings: ["シ"],
//     kunReadings: ["おも"],
//     jlptLevel: "N4",
//     strokes: 9,
//   },
//   {
//     kanji: "考",
//     meanings: ["think", "consider"],
//     onReadings: ["コウ"],
//     kunReadings: ["かんが"],
//     jlptLevel: "N4",
//     strokes: 6,
//   },
//   {
//     kanji: "経",
//     meanings: ["sutra", "manage", "pass through"],
//     onReadings: ["ケイ", "キョウ"],
//     kunReadings: ["へ"],
//     jlptLevel: "N3",
//     strokes: 11,
//   },
//   {
//     kanji: "済",
//     meanings: ["finish", "complete", "settle"],
//     onReadings: ["サイ"],
//     kunReadings: ["す"],
//     jlptLevel: "N3",
//     strokes: 11,
//   },
//   {
//     kanji: "政",
//     meanings: ["politics", "government"],
//     onReadings: ["セイ", "ショウ"],
//     kunReadings: ["まつりごと"],
//     jlptLevel: "N3",
//     strokes: 9,
//   },
// ];

// instance.get("/kanji/level/jlpt-5").then((res) => {
//   Promise.all(res.data.map((v: string) => instance.get("/kanji/" + v))).then(
//     (responses) => {
//       const newData = responses.map((res) => res.data);
//       const combined = [...mockKanjiData, ...newData];
//       console.log("Data lengkap:", combined);
//     }
//   );
// });
