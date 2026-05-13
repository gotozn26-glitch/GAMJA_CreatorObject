import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const CARD_GRADIENTS = [
  "from-[hsl(220,85%,55%)] to-[hsl(270,70%,55%)]",
  "from-[hsl(40,95%,55%)] to-[hsl(25,95%,55%)]",
  "from-[hsl(330,80%,55%)] to-[hsl(270,70%,55%)]",
  "from-[hsl(270,70%,55%)] to-[hsl(220,85%,55%)]",
  "from-[hsl(150,70%,45%)] to-[hsl(220,70%,55%)]",
  "from-[hsl(25,95%,55%)] to-[hsl(330,80%,55%)]",
  "from-[hsl(0,80%,55%)] to-[hsl(25,95%,55%)]",
];

interface ToolCardProps {
  name: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  category?: string;
  featured?: boolean;
  index?: number;
}

const cardClass =
  "group block rounded-2xl glass-card backlit transition-all duration-300 hover:-translate-y-1.5 overflow-hidden";

const ToolCard = ({ name, description, url, icon, category, featured, index = 0 }: ToolCardProps) => {
  const gradientClass = CARD_GRADIENTS[index % CARD_GRADIENTS.length];

  const inner = (
    <>
      <div
        className={`bg-gradient-to-br ${gradientClass} p-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02]`}
        style={{ minHeight: featured ? "140px" : "100px" }}
      >
        <div className="text-white/90 transition-transform duration-500 group-hover:scale-110">
          <div className={featured ? "scale-150" : "scale-125"}>{icon}</div>
        </div>
      </div>

      <div className={featured ? "p-6" : "p-5"}>
        {category && (
          <span className="inline-block mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {category}
          </span>
        )}
        <h3 className={`font-heading font-bold mb-1.5 text-foreground ${featured ? "text-xl" : "text-base"}`}>
          {name}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>
        <span className="btn-gradient inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3">
          {url ? "바로가기" : "준비 중"}
          {url ? <ExternalLink className="h-3.5 w-3.5" /> : null}
        </span>
      </div>
    </>
  );

  if (!url) {
    return (
      <div className={`${cardClass} opacity-60 cursor-not-allowed`} aria-disabled="true">
        {inner}
      </div>
    );
  }

  if (url.startsWith("/")) {
    return (
      <Link to={url} className={cardClass}>
        {inner}
      </Link>
    );
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={cardClass}>
      {inner}
    </a>
  );
};

export default ToolCard;
