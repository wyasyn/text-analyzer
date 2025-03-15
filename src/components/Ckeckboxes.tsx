import { useText } from "@/context/text-analizer-provider";
import { Checkbox } from "./ui/checkbox";

export default function Checkboxes() {
  const {
    includeSpaces,
    handleSetIncludeSpaces,
    useCharLimit,
    charLimit,
    handleSetCharLimit,
    handleUseCharLimit,
  } = useText();
  return (
    <div className="flex items-center gap-4 mt-2">
      {/* Include Spaces Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="include_spaces"
          checked={includeSpaces}
          onCheckedChange={handleSetIncludeSpaces}
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
          onCheckedChange={handleUseCharLimit}
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
          onChange={(e) => handleSetCharLimit(Number(e.target.value))}
          className="border p-1 rounded w-20"
          aria-label="Set character limit"
        />
      )}
    </div>
  );
}
