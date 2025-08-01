import fs from "fs";
import Redis from "ioredis";
import axios from "axios";

const redis = new Redis({
  host: "localhost",
  port: 6379,
  db: 0,
});

const filePath = "./data/kanji-level-jlpt-5.json";

if (fs.existsSync(filePath)) {
  console.log("✅ File ditemukan.");
  const data = fs.readFileSync(filePath, "utf-8");
  const json = JSON.parse(data);

  console.log(json);
}
// else {
//   console.log("❌ File tidak ditemukan.");
//   app.get("/api/kanji/level/:level", async (req, res) => {
//     const baseUrl = "https://kanjiapi.dev/v1/kanji";
//     const cacheKey = `kanji-level-${req.params.level}`;

//     // Coba ambil dari cache
//     const cached = cache.get(cacheKey);
//     if (cached) {
//       // console.log(cached);
//       return res.send(cached); // langsung kirim cache
//     }

//     try {
//       const response = await axios.get(`${baseUrl}/${req.params.level}`);

//       const details = await Promise.all(
//         response.data.map((kanji) => axios.get(`${baseUrl}/${kanji}`))
//       );

//       const result = details.map((res) => res.data);

//       // Simpan ke file JSON
//       fs.writeFileSync(
//         `./data/${cacheKey}.json`,
//         JSON.stringify(result, null, 2),
//         "utf-8"
//       );

//       // Simpan ke cache agar cepat
//       cache.set(cacheKey, result);

//       res.send(result);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({ error: "Gagal mengambil data dari kanjiapi" });
//     }
//   });
// }

// if (fs.existsSync(filePath)) {
//   console.log("✅ File ditemukan.");

//   fs.readFile("./data/kanji-level-jlpt-5.json", "utf-8", (err, data) => {
//     if (err) {
//       console.error("Gagal membaca file:", err);
//       return;
//     }

//     const json = JSON.parse(data);
//     console.log(json);
//   });
// } else {
//   console.log("❌ File tidak ditemukan.");

//   fs.writeFileSync(
//     `./data/${cacheKey}.json`,
//     JSON.stringify(result, null, 2),
//     "utf-8"
//   );
// }

const findKanjiAll = async () => {
  // apakah ada di redis atau tidak?
  //   const json = await redis.get("kanji");
  // kalo ada, kita kembalikan langsung yang di redis
  //   if(json) return JSON.parse(json);
  //   const kanji = await
  // simpan ke redis
  //   await redis.setex("categories", 60 * 60, JSON.stringify(parents));
  // iterasi semua parent, tambahkan children
  // for (let parent of parents) {
  //   parent.children = await prismaClient.category.findMany({
  //     where: {
  //       parent_id: parent.id
  //     },
  //     select: {
  //       id: true,
  //       name: true
  //     }
  //   })
  // }
  //   return parents;
};

// const data = fs.readFileSync("data/kanji-level-jlpt-5", "utf-8");
// const json = JSON.parse(data);

// console.log(json);

// fs.readFile("./data/jlpt-5.json", "utf-8", (err, data) => {
//   if (err) {
//     console.error("Gagal membaca file:", err);
//     return;
//   }

//   const json = JSON.parse(data);
//   console.log(json);
// });
