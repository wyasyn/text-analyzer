import Editor from "./components/editor";
import Header from "./components/header";
import Hero from "./components/hero";
import LetterDensity from "./components/letter-density";
import Shortcuts from "./components/short-cutts";
import Stats from "./components/Stats";

export default function App() {
  return (
    <div className="max-w-2xl mx-auto p-5">
      <Header />
      <Hero />
      <Editor />
      <Stats />
      <LetterDensity />
      <Shortcuts />
    </div>
  );
}
