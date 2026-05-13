import { tools } from "@/data/tools";
import ToolCard from "@/components/ToolCard";

const FeaturedToolsSection = () => {
  const featured = tools.filter((t) => t.featured);

  return (
    <section className="py-20 sm:py-28 px-6 section-surface-alt">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-muted-foreground tracking-widest uppercase mb-3">
            Featured
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
            가장 많이 사용된 도구
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            가장 많이 사용된 도구를 지금 확인해보세요
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3 stagger-children">
          {featured.map((tool, i) => (
            <ToolCard key={tool.name} {...tool} index={i} featured />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedToolsSection;
