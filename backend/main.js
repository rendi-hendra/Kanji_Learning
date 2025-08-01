import express from "express";
import cors from "cors";
const app = express();
import axios from "axios";
import JishoAPI from "unofficial-jisho-api";
import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 86400 }); // Cache selama 1 hari
import fs from "fs";
const port = 8080;
app.use(cors());

// const jisho = new JishoAPI();

// import { Credentials, Translator } from "@translated/lara";

// const LARA_ACCESS_KEY_ID = "BCECQU8FDCCGASG9763KV84VKH"; // Replace with your Access Key ID
// const LARA_ACCESS_KEY_SECRET = "2AwCk6LZMxocPJLJKGr3G0_poaJUvx55YP-5JGK0f-4"; // Replace with your Access Key SECRET

// const credentials = new Credentials(LARA_ACCESS_KEY_ID, LARA_ACCESS_KEY_SECRET);
// const lara = new Translator(credentials);

// jisho.searchForExamples("夜更かし").then((result) => {
//   console.log("Jisho Uri: " + result.uri);
//   console.log();

//   for (let i = 0; i < 3; ++i) {
//     let example = result.results[i];
//     lara.translate(example.english, "en-US", "id-ID").then((res) => {
//       console.log(example.kanji);
//       console.log(example.kana);
//       console.log(res.translation);
//       console.log(JSON.stringify(example.pieces));
//     });
//   }
// });

// app.get("/api/words/:word", async (req, res) => {
//   // const kanjiapi = "https://kanjiapi.dev/v1";
//   const jisho = "https://jisho.org/api/v1/search/words";
//   const tatoeba = "https://tatoeba.org/en/api_v0/search";

//   try {
//     const resJisho = await axios.get(jisho, {
//       headers: {
//         "User-Agent":
//           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
//         Accept: "application/json, text/plain, */*",
//       },
//       params: {
//         keyword: req.params.word,
//       },
//     });

//     const resTatoeba = await axios.get(tatoeba, {
//       params: {
//         from: "jpn",
//         to: "ind",
//         query: req.params.word,
//       },
//     });

//     const result = {
//       kanji: resJisho.data.data[0].slug,
//       meanings: resJisho.data.data[0].senses
//         .map((sense) => sense.english_definitions)
//         .flat(),
//       readings: resJisho.data.data[0].japanese.map(
//         (japanese) => japanese.reading
//       ),
//       jlpt: resJisho.data.data[0].jlpt,
//       parts_of_speech: resJisho.data.data[0].senses.map(
//         (sense) => sense.parts_of_speech
//       ),

//       examples: resTatoeba.data.results.map((result) => ({
//         text: result.text,
//         translations: result.translations
//           .flat()
//           .map((translation) => translation.text),
//         html: result.transcriptions[0].html,
//         // transcriptions: result.transcriptions.map((transcription) => ({
//         //   text: transcription.html,
//         // })),
//       })),
//     };

//     res.send(result);
//   } catch (error) {
//     console.error(error);
//   }
// });

app.get("/api/words/:word", async (req, res) => {
  // const kanjiapi = "https://kanjiapi.dev/v1";
  const jisho = "https://jisho.org/api/v1/search/words";
  const tatoeba = "https://tatoeba.org/en/api_v0/search";
  const filePath = "./data/words-jlpt-5.json";

  try {
    const resJisho = await axios.get(jisho, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
      },
      params: {
        keyword: req.params.word,
      },
    });

    const resTatoeba = await axios.get(tatoeba, {
      params: {
        from: "jpn",
        to: "ind",
        query: req.params.word,
      },
    });

    const result = {
      kanji: resJisho.data.data[0].slug,
      meanings: resJisho.data.data[0].senses
        .map((sense) => sense.english_definitions)
        .flat(),
      readings: resJisho.data.data[0].japanese.map(
        (japanese) => japanese.reading
      ),
      jlpt: resJisho.data.data[0].jlpt,
      parts_of_speech: resJisho.data.data[0].senses.map(
        (sense) => sense.parts_of_speech
      ),

      examples: resTatoeba.data.results.map((result) => ({
        text: result.text,
        translations: result.translations
          .flat()
          .map((translation) => translation.text),
        html: result.transcriptions[0].html,
      })),
    };

    const fileData = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileData);
    // 2. Cek apakah sudah ada kanji yang sama
    const isExist = jsonData.some((item) => item.kanji === result.kanji);

    if (!isExist) {
      // 3. Push jika belum ada
      jsonData.push(result);

      // 4. Simpan kembali ke file
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
      console.log("✅ Data berhasil ditambahkan!");
      res.send(result);
    } else {
      console.log("⚠️ Data sudah ada, tidak ditambahkan ulang.");
      res.send(result);
      // res.send(jsonData);
    }
  } catch (error) {
    console.error(error);
  }
});

app.get("/api/kanji/level/:level", async (req, res) => {
  const filePath = "./data/kanji-level-jlpt-5.json";
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(data);
    res.send(json);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Gagal mengambil data dari kanjiapi" });
  }
});

// instance.get("/kanji/level/jlpt-5").then((res) => {
//   Promise.all(res.data.map((v: string) => instance.get("/kanji/" + v))).then(
//     (responses) => {
//       const newData = responses.map((res) => res.data);
//       const combined = [...mockKanjiData, ...newData];
//       console.log("Data lengkap:", combined);
//     }
//   );
// });

// app.get("/api/kanji/level/:level", async (req, res) => {
//   const baseUrl = "https://kanjiapi.dev/v1/kanji";
//   const cacheKey = `kanji-level-${req.params.level}`;

//   const cached = cache.get(cacheKey);
//   if (cached) {
//     console.log(cached);
//     return res.send(cached); // langsung kirim cache
//   }

//   try {
//     const response = await axios.get(`${baseUrl}/${req.params.level}`);
//     Promise.all(
//       response.data.map((val) => axios.get(`${baseUrl}/${val}`))
//     ).then((responses) => {
//       const result = responses.map((res) => res.data);
//       // console.log(result);
//     });
//     // response.data.map(async (v) => {
//     //   const kanji = await axios.get(`${baseUrl}/${v}`);
//     //   // console.log(kanji.data);
//     //   // return kanji.data;
//     // });
//     res.send(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error);
//   }
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
