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

import { createClient } from "redis";

const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();

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

app.post("/api/audio/:text", async (req, res) => {
  const baseURL = "http://127.0.0.1:50021";
  const speaker = 2;
  const text = req.params.text;

  try {
    // ✅ Cek dari Redis
    const cacheRaw = await client.get(`audio:${text}`);
    const cache = cacheRaw ? Buffer.from(cacheRaw, "base64") : null;

    if (cache) {
      res.setHeader("Content-Type", "audio/wav");
      return res.send(cache);
    }

    // 🔄 Generate audio
    const audioQueryRes = await axios.post(`${baseURL}/audio_query`, null, {
      params: { text, speaker },
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const synthRes = await axios.post(
      `${baseURL}/synthesis`,
      audioQueryRes.data,
      {
        params: { speaker },
        responseType: "arraybuffer",
        headers: { "Content-Type": "application/json" },
      }
    );

    const audioBuffer = Buffer.from(synthRes.data);

    // ✅ Simpan ke Redis (pakai base64)
    await client.set(`audio:${text}`, audioBuffer.toString("base64"), {
      EX: 60 * 60 * 24, // expire 1 hari
    });

    res.setHeader("Content-Type", "audio/wav");
    res.send(audioBuffer);
  } catch (error) {
    console.error("❌ Gagal:", error);
    res.status(500).send("Gagal mengambil audio");
  }
});

app.get("/api/words/:word", async (req, res) => {
  // const kanjiapi = "https://kanjiapi.dev/v1";
  const jisho = "https://jisho.org/api/v1/search/words";
  const tatoeba = "https://tatoeba.org/en/api_v0/search";

  // 2. Cek apakah sudah ada kanji yang sama

  try {
    const words = await client.sInter("words");

    const alreadyExists = words.some((entry) => {
      const parsed = JSON.parse(entry);
      return parsed.kanji === req.params.word;
    });
    if (!alreadyExists) {
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
        kanji: req.params.word,
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
      await client.sAdd("words", JSON.stringify(result));
    }

    const result = await client.sInter("words");
    const data = result.filter((v) => JSON.parse(v).kanji == req.params.word);
    res.send(JSON.parse(data));
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
