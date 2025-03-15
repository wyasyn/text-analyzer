import { useText } from "@/context/text-analizer-provider";
import { Textarea } from "./ui/textarea";
import Checkboxes from "./Ckeckboxes";
import { calculateStats } from "@/lib/utils";

export default function Editor() {
  const { text, textareaRef, handleSetText, includeSpaces, warning } =
    useText();
  const { readingTime } = calculateStats(text, includeSpaces);
  return (
    <div>
      {warning && <p className="text-destructive my-4">{warning}</p>}
      <Textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => handleSetText(e.target.value)}
        placeholder="Start typing here... (or paste your text)"
        className="placeholder:text-sm min-h-[100px] md:min-h-[200px]"
      />
      <div className="flex items-center justify-between flex-wrap gap-3 mt-4 mb-8">
        <Checkboxes />
        <p className="text-xs text-muted-foreground">
          Approx. reading time: {readingTime} minutes
        </p>
      </div>
    </div>
  );
}
