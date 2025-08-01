import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";

interface Kanji {
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

interface PracticeModeProps {
  kanjiList: Kanji[];
  onExit: () => void;
}

export function PracticeMode({ kanjiList, onExit }: PracticeModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (kanjiList.length === 0) {
    return (
      <div className="text-center space-y-4">
        <p>No kanji available for practice.</p>
        <Button onClick={onExit}>Back to Library</Button>
      </div>
    );
  }

  const currentKanji = kanjiList[currentIndex];

  const nextKanji = () => {
    setCurrentIndex((prev) => (prev + 1) % kanjiList.length);
    setShowAnswer(false);
  };

  const prevKanji = () => {
    setCurrentIndex((prev) => (prev - 1 + kanjiList.length) % kanjiList.length);
    setShowAnswer(false);
  };

  const resetPractice = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onExit}>
          <ChevronLeft className="size-4 mr-2" />
          Back to Library
        </Button>
        <Badge variant="outline">
          {currentIndex + 1} / {kanjiList.length}
        </Badge>
        <Button variant="outline" onClick={resetPractice}>
          <RotateCcw className="size-4 mr-2" />
          Reset
        </Button>
      </div>

      <Card className="min-h-96">
        <CardHeader className="text-center">
          <div className="text-8xl mb-4">{currentKanji.kanji}</div>
          <div className="flex justify-center gap-2">
            <Badge variant="outline">{currentKanji.jlpt}</Badge>
            <Badge variant="outline">{currentKanji.stroke_count} strokes</Badge>
          </div>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {showAnswer ? (
            <div className="space-y-4">
              <div>
                <h4 className="mb-2">Meanings</h4>
                <p className="text-lg">{currentKanji.meanings.join(", ")}</p>
              </div>
              {currentKanji.on_readings.length > 0 && (
                <div>
                  <h4 className="mb-2">On'yomi</h4>
                  <p className="text-lg">
                    {currentKanji.on_readings.join(", ")}
                  </p>
                </div>
              )}
              {currentKanji.kun_readings.length > 0 && (
                <div>
                  <h4 className="mb-2">Kun'yomi</h4>
                  <p className="text-lg">
                    {currentKanji.kun_readings.join(", ")}
                  </p>
                </div>
              )}
              <Button onClick={nextKanji} className="mt-6">
                Next Kanji
                <ChevronRight className="size-4 ml-2" />
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-muted-foreground">
                Do you know the meaning and readings of this kanji?
              </p>
              <Button onClick={() => setShowAnswer(true)} size="lg">
                Show Answer
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevKanji}>
          <ChevronLeft className="size-4 mr-2" />
          Previous
        </Button>
        <Button variant="outline" onClick={nextKanji}>
          Next
          <ChevronRight className="size-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
