import { useState, useMemo, useEffect } from "react";
import { KanjiCard } from "./components/KanjiCard";
import { SearchBar } from "./components/SearchBar";
import { DifficultySelector } from "./components/DifficultySelector";
import { PracticeMode } from "./components/PracticeMode";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { BookOpen, Play } from "lucide-react";
import { Kanji, ResponseWords } from "./lib/mockKanjiData";
import { instance } from "./lib/api";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedKanji, setSelectedKanji] = useState<Kanji | null>(null);
  const [practiceMode, setPracticeMode] = useState(false);
  const [words, setWords] = useState<ResponseWords>();
  const [kanjiList, setKanjiList] = useState<Kanji[]>([]);
  const [audios, setAudios] = useState<(string | null)[]>([]); // array Blob URL audio
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    instance.get<Kanji[]>("kanji/level/jlpt-5").then((res) => {
      setKanjiList(res.data);
    });

    if (!words?.examples) return;

    setLoading(true);
    const fetchAudios = async () => {
      const audioUrls = await Promise.all(
        words.examples.map(async (example) => {
          try {
            // console.log(example.text);
            const res = await axios.post(
              `http://localhost:8080/api/audio/${example.text}`, // contoh: "もう一回"
              null,
              { responseType: "arraybuffer" }
            );
            const blob = new Blob([res.data], { type: "audio/wav" });
            return URL.createObjectURL(blob); // hasil blob audio
          } catch (err) {
            console.error("Gagal ambil audio:", err);
            return null;
          }
        })
      ).finally(() => {
        console.log("Audio Sudah Selesai");
        setLoading(false);
      });
      setAudios(audioUrls);
    };

    fetchAudios();

    return () => {
      // cleanup jika ada audio URL sebelumnya
      audios.forEach((url) => url && URL.revokeObjectURL(url));
    };
  }, [words]);

  function handleKanjiClick(kanji: Kanji) {
    setSelectedKanji(kanji);
    instance.get(`kanji/${kanji.kanji}`).then((res) => {
      setWords(res.data);
    });
  }

  const filteredKanji = useMemo(() => {
    return kanjiList.filter((kanji) => {
      const matchesSearch =
        searchTerm === "" ||
        kanji.kanji.includes(searchTerm) ||
        kanji.meanings.some((meaning) =>
          meaning.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        kanji.on_readings.some((reading) =>
          reading.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        kanji.kun_readings.some((reading) =>
          reading.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesLevel =
        selectedLevel === "all" ||
        "N" + kanji.jlpt.toString() === selectedLevel;

      return matchesSearch && matchesLevel;
    });
  }, [searchTerm, selectedLevel, kanjiList]);

  if (practiceMode) {
    return (
      <div className="min-h-screen bg-background p-6">
        <PracticeMode
          kanjiList={filteredKanji}
          onExit={() => setPracticeMode(false)}
        />
      </div>
    );
  }

  if (selectedKanji) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <Button
            variant="outline"
            onClick={() => setSelectedKanji(null)}
            className="mb-4"
          >
            ← Back to Library
          </Button>

          <div className="text-center space-y-6">
            <div className="text-9xl">{selectedKanji.kanji}</div>
            <div className="flex justify-center gap-2">
              <Badge variant="outline">N{selectedKanji.jlpt}</Badge>
              <Badge variant="outline">
                strokes {selectedKanji.stroke_count}
              </Badge>
            </div>

            <div className="space-y-4 text-left max-w-md mx-auto">
              <div>
                <h3>Meanings</h3>
                <p className="text-muted-foreground">
                  {selectedKanji.meanings.join(", ")}
                </p>
              </div>

              {selectedKanji.on_readings.length > 0 && (
                <div>
                  <h3>On'yomi (Chinese reading)</h3>
                  <p className="text-muted-foreground">
                    {selectedKanji.on_readings.join(", ")}
                  </p>
                </div>
              )}

              {selectedKanji.kun_readings.length > 0 && (
                <div>
                  <h3>Kun'yomi (Japanese reading)</h3>
                  <p className="text-muted-foreground">
                    {selectedKanji.kun_readings.join(", ")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-20 mt-10">
          {words?.examples.map((example, index) => (
            <Card
              key={index}
              className={
                loading
                  ? "cursor-not-allowed hover:shadow-lg transition-shadow duration-200 bg-gray-300"
                  : "cursor-pointer hover:shadow-lg transition-shadow duration-200"
              }
              onClick={() => {
                const url = audios[index];
                if (url && !loading) {
                  const audio = new Audio(url);
                  audio.play();
                }
              }}
            >
              <CardContent className="mt-4">
                <div
                  className="text-primary font-bold text-5xl mb-5"
                  dangerouslySetInnerHTML={{ __html: example.html }}
                />
                <div>{example.text}</div>
                {example.translations.map((translation, i) => (
                  <p key={i} className="text-2xl text-muted-foreground">
                    {translation}
                  </p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="size-8 text-primary" />
              <h1>Kanji Learning</h1>
            </div>
            <Badge variant="outline">{kanjiList.length} kanji</Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="flex-1 max-w-md">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search by kanji, meaning, or reading..."
              />
            </div>
            <DifficultySelector
              value={selectedLevel}
              onChange={setSelectedLevel}
            />
          </div>

          <Button
            onClick={() => setPracticeMode(true)}
            disabled={filteredKanji.length === 0}
            className="gap-2"
          >
            <Play className="size-4" />
            Practice Mode
          </Button>
        </div>

        {filteredKanji.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No kanji found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredKanji.map((kanji, index) => (
              <KanjiCard
                key={`${kanji.kanji}-${index}`}
                kanji={kanji.kanji}
                meanings={kanji.meanings}
                on_readings={kanji.on_readings}
                kun_readings={kanji.kun_readings}
                jlpt={kanji.jlpt}
                stroke_count={kanji.stroke_count}
                onClick={() => handleKanjiClick(kanji)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
