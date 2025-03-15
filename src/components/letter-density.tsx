import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useText } from "@/context/text-analizer-provider";
import { calculateStats } from "@/lib/utils";
import DensityCard from "./density-card";

export default function LetterDensity() {
  const { showAllLetters, handleSetShowAllLetters, text, includeSpaces } =
    useText();

  const { sortedLetterCounts } = calculateStats(text, includeSpaces);
  return (
    <section>
      {/* Letter Density Section */}
      <div className="mt-4 text-sm">
        <h2 className="text-lg font-medium mt-8 mb-3">Letter Density</h2>
        {!text && (
          <p className="text-muted-foreground text-sm">
            No Characters found. Start typing to see letter density.
          </p>
        )}
        <div className="flex flex-col w-full gap-2">
          <AnimatePresence>
            {(showAllLetters
              ? sortedLetterCounts
              : sortedLetterCounts.slice(0, 5)
            ).map(({ letter, count, percentage }) => (
              <motion.div
                key={letter}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-1"
              >
                <DensityCard
                  letter={letter.toUpperCase()}
                  count={count}
                  percentage={percentage}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show More / Show Less Button */}
        {sortedLetterCounts.length > 5 && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button onClick={handleSetShowAllLetters} variant="link">
              {showAllLetters ? "Show Less" : "Show More"}
              {showAllLetters ? (
                <ChevronUp className="w-4 h-4 ml-3" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-3" />
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
