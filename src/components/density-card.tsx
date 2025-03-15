import { Progress } from "./ui/progress";

export default function DensityCard({
  count,
  percentage,
  letter,
}: {
  count: number;
  percentage: string;
  letter: string;
}) {
  return (
    <div className="flex gap-2 items-center justify-between w-full">
      <span>{letter}</span>
      <Progress className="w-full" value={parseInt(percentage)} />
      <div className="flex items-center gap-1">
        <span>{count}</span>
        <span>({percentage}%)</span>
      </div>
    </div>
  );
}
