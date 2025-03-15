import ModeToggle from "./components/mode-toggle";

export default function App() {
  return (
    <main className="min-h-dvh grid place-items-center">
      <div className="flex flex-col gap-3 items-center justify-center">
        <ModeToggle />
        <h1 className="text-7xl font-bold text-center">Starter</h1>
      </div>
    </main>
  );
}
