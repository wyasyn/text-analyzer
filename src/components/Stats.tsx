import { useText } from "@/context/text-analizer-provider";
import { calculateStats } from "@/lib/utils";
import CountCard from "./CountCard";

export default function Stats() {
  const { text, includeSpaces } = useText();
  const { charCount, wordCount, sentenceCount } = calculateStats(
    text,
    includeSpaces
  );
  return (
    <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
      <CountCard
        count={charCount}
        title="Total Characters"
        bg=" bg-purple-400"
      />
      <CountCard count={wordCount} title="Word Count" bg=" bg-orange-300" />
      <CountCard
        count={sentenceCount}
        title="Sentence Count"
        bg=" bg-orange-600"
      />
    </div>
  );
}
