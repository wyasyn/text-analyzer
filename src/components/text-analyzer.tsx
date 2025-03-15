import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/context/theme-provider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";

const calculateStats = (text: string, includeSpaces: boolean) => {
  const charCount = includeSpaces
    ? text.length
    : text.replace(/\s/g, "").length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;
  const readingTime = (wordCount / 200).toFixed(2); // Assuming 200 WPM

  // Letter Frequency Analysis
  const letterCounts: Record<string, number> = {};
  const lettersOnly = text.replace(/[^a-zA-Z]/g, "").toLowerCase(); // Only letters
  for (const letter of lettersOnly) {
    letterCounts[letter] = (letterCounts[letter] || 0) + 1;
  }

  // Sort letters by frequency (descending order)
  const sortedLetterCounts = Object.entries(letterCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([letter, count]) => ({
      letter,
      count,
      percentage: ((count / charCount) * 100).toFixed(2),
    }));

  return {
    charCount,
    wordCount,
    sentenceCount,
    readingTime,
    sortedLetterCounts,
  };
};

const TextAnalyzer = () => {
  const [text, setText] = useState<string>("");
  const [includeSpaces, setIncludeSpaces] = useState<boolean>(true);
  const [useCharLimit, setUseCharLimit] = useState<boolean>(false);
  const [charLimit, setCharLimit] = useState<number>(200);
  const [warning, setWarning] = useState<string>("");
  const [showAllLetters, setShowAllLetters] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { theme, setTheme } = useTheme();

  // Calculate stats
  const {
    charCount,
    wordCount,
    sentenceCount,
    readingTime,
    sortedLetterCounts,
  } = calculateStats(text, includeSpaces);

  useEffect(() => {
    if (useCharLimit && charCount > charLimit) {
      setWarning("⚠️ Character limit exceeded!");
    } else {
      setWarning("");
    }
  }, [charCount, charLimit, useCharLimit]);

  // Handle Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "l") setIncludeSpaces((prev) => !prev);
      if (e.ctrlKey && e.key === "t")
        setTheme(theme === "light" ? "dark" : "light");
      if (e.ctrlKey && e.key === "f") textareaRef.current?.focus();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setTheme, theme]);

  return (
    <div className="max-w-2xl mx-auto p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Text Analyzer</h1>
      </div>

      <Textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste text here..."
        className="w-full mt-3 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 dark:bg-gray-800"
      />

      <div className="flex items-center gap-2 mt-2">
        {/* Include Spaces Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="include_spaces"
            checked={includeSpaces}
            onCheckedChange={() => setIncludeSpaces(!includeSpaces)}
          />
          <label htmlFor="include_spaces" className="text-sm font-medium">
            Include spaces
          </label>
        </div>

        {/* Enable Character Limit Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="use_char_limit"
            checked={useCharLimit}
            onCheckedChange={() => setUseCharLimit(!useCharLimit)}
          />
          <label htmlFor="use_char_limit" className="text-sm font-medium">
            Enable character limit
          </label>
        </div>

        {/* Character Limit Input (only shown if enabled) */}
        {useCharLimit && (
          <input
            type="number"
            value={charLimit}
            onChange={(e) => setCharLimit(Number(e.target.value))}
            className="border p-1 rounded w-20"
            aria-label="Set character limit"
          />
        )}
      </div>

      {warning && <p className="text-red-500">{warning}</p>}

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <p>
          <strong>Characters:</strong> {charCount}
        </p>
        <p>
          <strong>Words:</strong> {wordCount}
        </p>
        <p>
          <strong>Sentences:</strong> {sentenceCount}
        </p>
        <p>
          <strong>Reading Time:</strong> {readingTime} min
        </p>
      </div>

      {/* Letter Density Section */}
      <div className="mt-4 text-sm">
        <h2 className="text-lg font-semibold mb-2">Letter Density</h2>
        <div className="grid grid-cols-4 gap-2">
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
                <span className="font-bold">{letter.toUpperCase()}:</span>
                <span>
                  {count} ({percentage}%)
                </span>
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
            <Button
              onClick={() => setShowAllLetters(!showAllLetters)}
              variant="link"
            >
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

      <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
        <p>
          <kbd>Ctrl + L</kbd> Toggle spaces
        </p>
        <p>
          <kbd>Ctrl + T</kbd> Toggle theme
        </p>
        <p>
          <kbd>Ctrl + F</kbd> Focus on text area
        </p>
      </div>
    </div>
  );
};

export default TextAnalyzer;
