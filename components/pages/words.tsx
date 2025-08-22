import { instance } from "@/lib/api";
import { BookOpen } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "../ui/badge";
import { SearchBar } from "../SearchBar";
import { DifficultySelector } from "../DifficultySelector";
import { WordsCard } from "../WordsCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "../ui/pagination";
import { Button, Switch } from "react-aria-components";

interface Iwords {
  word: string;
  meaning: string;
  furigana: string;
  romaji: string;
  level: number;
}
export default function Words() {
  const [words, setWords] = useState<Iwords[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // per page
  const [totalWords, setTotalWords] = useState(0);
  // const [audios, setAudios] = useState<(string | null)[]>([]); // array Blob URL audio
  // const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const offset = page - 1;
    instance
      .get(`words?offset=${offset}`)
      .then((res) => {
        setTotalWords(res.data.total);
        setWords(res.data.words);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  }, [page, limit]);

  const totalPages = Math.ceil(totalWords / limit);

  const getPageNumbers = () => {
    const totalNumbers = 5; // max tombol angka
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= totalNumbers) {
      // semua halaman ditampilkan
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // jika halaman sekarang di dekat awal
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "ellipsis", totalPages);
      }
      // jika halaman sekarang di dekat akhir
      else if (page >= totalPages - 2) {
        pages.push(
          1,
          "ellipsis",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      }
      // jika halaman sekarang di tengah-tengah
      else {
        pages.push(
          1,
          "ellipsis",
          page - 1,
          page,
          page + 1,
          "ellipsis",
          totalPages
        );
      }
    }

    return pages;
  };

  function handleWordsClick(words: Iwords) {
    // console.log(words);

    instance
      .post(`audio/${words.word}`, null, { responseType: "arraybuffer" })
      .then((res) => {
        const blob = new Blob([res.data], { type: "audio/wav" });
        const urls = URL.createObjectURL(blob); // hasil blob audio
        const audio = new Audio(urls);
        audio.play();
      });
  }

  const filteredWords = useMemo(() => {
    return words.filter((word) => {
      const matchesSearch =
        searchTerm === "" ||
        word.word.includes(searchTerm) ||
        word.meaning.includes(searchTerm.toLowerCase()) ||
        word.furigana.includes(searchTerm.toLowerCase()) ||
        word.romaji.includes(searchTerm.toLowerCase());

      const matchesLevel =
        selectedLevel === "all" ||
        "N" + word.level.toString() === selectedLevel;

      return matchesSearch && matchesLevel;
    });
  }, [searchTerm, selectedLevel, words]);

  return (
    <>
      <div className="min-h-screen bg-background">
        <header className="border-b border-border">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BookOpen className="size-8 text-primary" />
                <h1>Words Learning</h1>
                <Switch className="group relative flex gap-2 items-center text-black font-semibold text-lg">
                  <div className="flex h-[26px] w-[44px] shrink-0 cursor-default rounded-full shadow-inner bg-clip-padding border border-solid border-white/30 p-[3px] box-border transition duration-200 ease-in-out bg-yellow-600 group-pressed:bg-yellow-700 group-selected:bg-amber-800 group-selected:group-pressed:bg-amber-900 outline-hidden group-focus-visible:ring-2 ring-black">
                    <span className="h-[18px] w-[18px] transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out translate-x-0 group-selected:translate-x-[100%]" />
                  </div>
                  Words
                </Switch>
              </div>
              <Badge variant="outline">{totalWords} Words</Badge>
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
                  placeholder="Search by Words, meaning, or romanji..."
                />
              </div>
              <DifficultySelector
                value={selectedLevel}
                onChange={setSelectedLevel}
              />
            </div>

            {/* <Button
            onClick={() => setPracticeMode(true)}
            disabled={filteredKanji.length === 0}
            className="gap-2"
          >
            <Play className="size-4" />
            Practice Mode
          </Button> */}
          </div>

          {filteredWords.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No kanji found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {filteredWords.map((word, index) => (
                <WordsCard
                  key={`${word.word}-${index}`}
                  word={word.word}
                  meanings={word.meaning}
                  furigana={word.furigana}
                  romaji={word.romaji}
                  jlpt={word.level}
                  onClick={() => handleWordsClick(word)}
                />
              ))}
            </div>
          )}
          <Pagination>
            <PaginationContent>
              {/* Tombol Prev */}
              <PaginationItem>
                {page > 1 ? (
                  <PaginationPrevious
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page > 1) setPage(page - 1);
                    }}
                  />
                ) : (
                  ""
                )}
              </PaginationItem>

              {/* Nomor halaman + ellipsis */}
              {getPageNumbers().map((p, idx) =>
                p === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${idx}`}>
                    {/* <Input className="mx-5" type="number" /> */}
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink
                      className="cursor-pointer"
                      isActive={page === p}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(p as number);
                      }}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              {/* Tombol Next */}
              <PaginationItem>
                {page != 839 ? (
                  <PaginationNext
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page < totalPages) setPage(page + 1);
                    }}
                  />
                ) : (
                  ""
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </main>
      </div>
    </>
  );
}
