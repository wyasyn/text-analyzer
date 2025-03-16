import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateStats = (text: string, includeSpaces: boolean) => {
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
      percentage: ((count / charCount) * 100).toFixed(0),
    }));

  return {
    charCount,
    wordCount,
    sentenceCount,
    readingTime,
    sortedLetterCounts,
  };
};
