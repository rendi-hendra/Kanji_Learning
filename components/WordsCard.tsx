import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface WordsCardProps {
  word: string;
  meanings: string;
  furigana: string;
  romaji: string;
  jlpt: number;
  onClick?: () => void;
}

export function WordsCard({
  word,
  meanings,
  furigana,
  romaji,
  jlpt,
  onClick,
}: WordsCardProps) {
  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={onClick}
    >
      <CardHeader className="text-center pb-2">
        <div className="text-6xl mb-2">{word}</div>
        <div className="flex justify-center gap-2">
          <Badge variant="outline">N{jlpt}</Badge>
        </div>
      </CardHeader>
      <CardContent className="text-center space-y-3">
        <div>
          <h4 className="mb-1">Arti</h4>
          <p className="text-muted-foreground">{meanings}</p>
        </div>
        {furigana.length > 0 && (
          <div>
            <h4 className="mb-1">Furigana</h4>
            <p className="text-muted-foreground">{furigana}</p>
          </div>
        )}
        <div>
          <h4 className="mb-1">Romanji</h4>
          <p className="text-muted-foreground">{romaji}</p>
        </div>
      </CardContent>
    </Card>
  );
}
