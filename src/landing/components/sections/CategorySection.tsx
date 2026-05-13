import { FileText, Image, Code, Music } from "lucide-react";
import { Link } from "react-router-dom";
import { tools } from "@/data/tools";

const categories = [
  { id: "텍스트", label: "카피수정도구", icon: <FileText className="h-5 w-5" /> },
  { id: "이미지", label: "이미지수정도구", icon: <Image className="h-5 w-5" /> },
  { id: "개발", label: "그 외 도구", icon: <Code className="h-5 w-5" /> },
  { id: "오디오", label: "플러그인 & 스크립트", icon: <Music className="h-5 w-5" /> },
];

const CategorySection = () => (
  <section
    id="tool-categories"
    className="scroll-mt-20 py-20 sm:py-28 px-6 section-surface"
  >
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold text-muted-foreground tracking-widest uppercase mb-3">
          카테고리
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
          기능별 도구 확인
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          카테고리별로 원하는 도구를 빠르게 찾아보세요
        </p>
      </div>
      <div className="space-y-6">
        {categories.map((cat) => {
          const catTools = tools.filter((t) => t.category === cat.id);
          return (
            <div key={cat.id} className="glass-card-glow rounded-3xl p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl glass-card flex items-center justify-center text-foreground">
                  {cat.icon}
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">{cat.label}</h3>
                <span className="text-sm text-muted-foreground ml-auto">{catTools.length}개 도구</span>
              </div>
              {catTools.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catTools.map((tool) => {
                    const row = (
                      <>
                        <div className="h-9 w-9 rounded-lg glass-card-glow flex items-center justify-center text-foreground shrink-0">
                          {tool.icon}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-heading font-semibold text-sm text-foreground mb-1">{tool.name}</h4>
                          <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">{tool.description}</p>
                        </div>
                      </>
                    );
                    const cls =
                      "glass-card rounded-2xl p-5 flex items-start gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-400/30 group";
                    if (!tool.url) {
                      return (
                        <div key={tool.name} className={`${cls} opacity-60 cursor-not-allowed`} aria-disabled="true">
                          {row}
                        </div>
                      );
                    }
                    if (tool.url.startsWith("/")) {
                      return (
                        <Link key={tool.name} to={tool.url} className={cls}>
                          {row}
                        </Link>
                      );
                    }
                    return (
                      <a
                        key={tool.name}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cls}
                      >
                        {row}
                      </a>
                    );
                  })}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">아직 등록된 도구가 없습니다</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default CategorySection;
