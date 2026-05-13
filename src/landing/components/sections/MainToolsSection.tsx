import { Link } from "react-router-dom";
import { ArrowRight, Wrench } from "lucide-react";

type MainTool = {
  key: string;
  name: string;
  desc: string;
  to?: string;
  active: boolean;
};

const mainTools: MainTool[] = [
  {
    key: "rotation",
    name: "Rotation",
    desc: "오브젝트를 정교하게 회전시킵니다",
    to: "/service/multiview",
    active: true,
  },
  {
    key: "creator-object",
    name: "Object Create",
    desc: "오브젝트를 생성합니다",
    to: "/service/creator-object",
    active: true,
  },
  {
    key: "sb-director",
    name: "SB Director",
    desc: "스토리보드로 장면을 생성합니다",
    to: "/service/storyboard-director",
    active: true,
  },
  {
    key: "variation",
    name: "Varivariaition",
    desc: "다양한 사이즈로 베리에이션합니다",
    active: false,
  },
  {
    key: "logo-maker",
    name: "LogoMaker",
    desc: "AI로 로고 컨셉을 생성·편집합니다",
    to: "/service/logo-maker",
    active: true,
  },
  {
    key: "soon-1",
    name: "...",
    desc: "준비중 입니다",
    active: false,
  },
];

const MainToolsSection = () => (
  <section id="main-tools" className="scroll-mt-20 px-6 pb-8 sm:pb-12">
    <div className="max-w-[980px] mx-auto grid grid-cols-3 gap-4 md:gap-6">
      {mainTools.map((tool) => {
        const clickable = tool.active && Boolean(tool.to);
        const cardClass = [
          "group text-left rounded-2xl md:rounded-3xl glass-card-glow overflow-hidden flex flex-col min-h-[168px] md:min-h-[200px]",
          clickable ? "cursor-pointer hover:-translate-y-0.5 transition-transform" : "opacity-70 cursor-default",
        ].join(" ");

        const body = (
          <>
            <div className="h-[72px] md:h-[96px] w-full bg-card/40 flex items-center justify-center border-b border-border/30">
              <Wrench
                className={`h-8 w-8 md:h-10 md:w-10 ${clickable ? "text-foreground/35" : "text-muted-foreground/40"}`}
              />
            </div>
            <div className="px-3 pb-4 pt-3 md:px-4 md:pb-5 md:pt-4 flex flex-col flex-1">
              <div className="min-h-[52px] md:min-h-[60px]">
                <div className="font-heading text-sm md:text-base font-bold text-foreground leading-tight">{tool.name}</div>
                <p className="mt-1 text-[11px] md:text-xs text-muted-foreground leading-snug">{tool.desc}</p>
              </div>
              <div className="mt-auto pt-3 flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                  {!tool.active ? "...soon" : "ready"}
                </span>
                <span
                  className={[
                    "h-8 w-8 rounded-full glass-card flex items-center justify-center",
                    clickable ? "group-hover:bg-foreground group-hover:text-background transition-colors" : "",
                  ].join(" ")}
                >
                  <ArrowRight className="h-3.5 w-3.5 opacity-70" />
                </span>
              </div>
            </div>
          </>
        );

        if (clickable && tool.to) {
          return (
            <Link key={tool.key} to={tool.to} className={cardClass}>
              {body}
            </Link>
          );
        }

        return (
          <div key={tool.key} className={cardClass}>
            {body}
          </div>
        );
      })}
    </div>
  </section>
);

export default MainToolsSection;
