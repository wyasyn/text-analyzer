import Logo from "./logo";
import ModeToggle from "./mode-toggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 py-4">
      <Logo />
      <ModeToggle />
    </header>
  );
}
