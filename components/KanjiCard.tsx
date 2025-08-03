import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface KanjiCardProps {
  kanji: string;
  meanings: string[];
  on_readings: string[];
  kun_readings: string[];
  jlpt: string;
  stroke_count: number;
  onClick?: () => void;
}

export function KanjiCard({
  kanji,
  meanings,
  on_readings,
  kun_readings,
  jlpt,
  stroke_count,
  onClick,
}: KanjiCardProps) {
  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={onClick}
    >
      <CardHeader className="text-center pb-2">
        <div className="text-6xl mb-2">{kanji}</div>
        <div className="flex justify-center gap-2">
          <Badge variant="outline">N{jlpt}</Badge>
          <Badge variant="outline">{stroke_count} strokes</Badge>
        </div>
      </CardHeader>
      <CardContent className="text-center space-y-3">
        <div>
          <h4 className="mb-1">Meanings</h4>
          <p className="text-muted-foreground">{meanings.join(", ")}</p>
        </div>
        {on_readings.length > 0 && (
          <div>
            <h4 className="mb-1">On'yomi</h4>
            <p className="text-muted-foreground">{on_readings.join(", ")}</p>
          </div>
        )}
        {kun_readings.length > 0 && (
          <div>
            <h4 className="mb-1">Kun'yomi</h4>
            <p className="text-muted-foreground">{kun_readings.join(", ")}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
