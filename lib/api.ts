import axios from "axios";

// export const instance = axios.create({
//   baseURL: "https://kanjiapi.dev/v1/kanji",
//   timeout: 1000,
//   headers: { "X-Custom-Header": "foobar" },
// });
export const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" },
});
