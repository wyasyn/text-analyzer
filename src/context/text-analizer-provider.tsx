import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useTheme } from "./theme-provider";
import { calculateStats } from "@/lib/utils";

type TextProviderState = {
  text: string;
  includeSpaces: boolean;
  useCharLimit: boolean;
  charLimit: number;
  warning: string;
  showAllLetters: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  handleSetText: (text: string) => void;
  handleSetIncludeSpaces: () => void;
  handleUseCharLimit: () => void;
  handleSetCharLimit: (value: number) => void;
  handleSetShowAllLetters: () => void;
};

const TextAnalyzerProviderContext = createContext<
  TextProviderState | undefined
>(undefined);

export const TextAnalyzerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [text, setText] = useState<string>("");
  const [includeSpaces, setIncludeSpaces] = useState<boolean>(true);
  const [useCharLimit, setUseCharLimit] = useState<boolean>(false);
  const [charLimit, setCharLimit] = useState<number>(200);
  const [warning, setWarning] = useState<string>("");
  const [showAllLetters, setShowAllLetters] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { theme, setTheme } = useTheme();

  const { charCount } = calculateStats(text, includeSpaces);

  useEffect(() => {
    setWarning(
      useCharLimit && charCount > charLimit
        ? "⚠️ Character limit exceeded!"
        : ""
    );
  }, [charCount, charLimit, useCharLimit]);

  const handleSetText = useCallback((text: string) => setText(text), []);
  const handleSetIncludeSpaces = useCallback(
    () => setIncludeSpaces((prev) => !prev),
    []
  );
  const handleUseCharLimit = useCallback(
    () => setUseCharLimit((prev) => !prev),
    []
  );
  const handleSetCharLimit = useCallback(
    (value: number) => setCharLimit(value),
    []
  );
  const handleSetShowAllLetters = useCallback(
    () => setShowAllLetters((prev) => !prev),
    []
  );

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

  const value = useMemo(
    () => ({
      text,
      includeSpaces,
      useCharLimit,
      charLimit,
      warning,
      showAllLetters,
      textareaRef,
      handleSetText,
      handleSetIncludeSpaces,
      handleUseCharLimit,
      handleSetCharLimit,
      handleSetShowAllLetters,
    }),
    [
      text,
      includeSpaces,
      useCharLimit,
      charLimit,
      warning,
      showAllLetters,
      handleSetText,
      handleSetIncludeSpaces,
      handleUseCharLimit,
      handleSetCharLimit,
      handleSetShowAllLetters,
    ]
  );

  return (
    <TextAnalyzerProviderContext.Provider value={value}>
      {children}
    </TextAnalyzerProviderContext.Provider>
  );
};

export const useText = () => {
  const context = useContext(TextAnalyzerProviderContext);
  if (!context) {
    throw new Error("useText must be used within a TextAnalyzerProvider");
  }
  return context;
};
