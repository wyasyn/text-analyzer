import { cn } from "@/lib/utils";

export default function CountCard({
  count,
  bg,
  title,
}: {
  count: number;
  bg: string;
  title: string;
}) {
  return (
    <div
      className={cn(
        "p-4 flex flex-col rounded-lg text-black overflow-clip relative z-10",
        bg
      )}
    >
      <span className="text-5xl font-bold tracking-tighter">
        {count < 10 ? `0${count}` : count}
      </span>
      <p>{title}</p>
      <div className="absolute -right-1/4 top-0 bottom-0 w-1/2 z-20 grid gap-1 grid-cols-2 p-1 rotate-45">
        <div className="w-full h-full aspect-square rounded-md bg-secondary/15" />
        <div className="w-full h-full aspect-square rounded-md bg-secondary/15" />
        <div className="w-full h-full aspect-square rounded-md bg-secondary/15" />
        <div className="w-full h-full aspect-square rounded-md bg-secondary/15" />
      </div>
    </div>
  );
}
