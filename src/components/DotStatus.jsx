const colors = {
  green: { ping: "bg-green-400", dot: "bg-green-500" },
  yellow: { ping: "bg-yellow-400", dot: "bg-yellow-500" },
  red: { ping: "bg-red-400", dot: "bg-red-500" },
  zinc: { ping: "bg-zinc-400", dot: "bg-zinc-500" },
};

export default function DotStatus({ color = "zinc" }) {
  return (
    <span className="relative flex size-3">
      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${colors[color]?.ping} opacity-75`}></span>
      <span className={`relative inline-flex size-3 rounded-full ${colors[color]?.dot}`}></span>
    </span>
  );
}
