import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface DifficultySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function DifficultySelector({ value, onChange }: DifficultySelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select JLPT level" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Levels</SelectItem>
        <SelectItem value="N5">JLPT N5 (Beginner)</SelectItem>
        <SelectItem value="N4">JLPT N4</SelectItem>
        <SelectItem value="N3">JLPT N3</SelectItem>
        <SelectItem value="N2">JLPT N2</SelectItem>
        <SelectItem value="N1">JLPT N1 (Advanced)</SelectItem>
      </SelectContent>
    </Select>
  );
}