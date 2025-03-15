import { useText } from "@/context/text-analizer-provider";
import { Button } from "./ui/button";

export default function ClearText() {
  const { handleSetText, text } = useText();
  return (
    text && (
      <Button
        className="absolute right-0 -top-10 cursor-pointer"
        size="sm"
        variant="destructive"
        onClick={() => handleSetText("")}
      >
        Clear
      </Button>
    )
  );
}
