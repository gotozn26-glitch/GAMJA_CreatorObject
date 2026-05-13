import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type ToolCard = {
  key: string;
  name: string;
  desc: string;
  image?: string | null;
  active: boolean;
  to?: string;
};

export default function Home() {
  const navigate = useNavigate();

  const tools: ToolCard[] = [
    {
      key: 'rotation',
      name: 'Rotation',
      desc: '오브젝트를 정교하게 회전시킵니다',
      image: 'https://picsum.photos/seed/cube/900/600',
      active: true,
      to: '/service/multiview',
    },
    {
      key: 'creator-object',
      name: 'Object Create',
      desc: '오브젝트를 생성합니다',
      image: 'https://picsum.photos/seed/puppy/900/600',
      active: true,
      to: '/service/creator-object',
    },
    {
      key: 'sb-director',
      name: 'SB Director',
      desc: '스토리보드로 장면을 생성합니다',
      image: 'https://picsum.photos/seed/storyboard/900/600',
      active: true,
      to: '/service/storyboard-director',
    },
    {
      key: 'variation',
      name: 'Varivariaition',
      desc: '다양한 사이즈로 베리에이션합니다',
      image: null,
      active: false,
    },
    {
      key: 'logo-maker',
      name: 'LogoMaker',
      desc: 'AI로 로고 컨셉을 생성·편집합니다',
      image: null,
      active: true,
      to: '/service/logo-maker',
    },
    { key: 'soon-2', name: '...', desc: '준비중 입니다', image: null, active: false },
  ];

  return (
    <div className="min-h-screen text-[#0b0f1a] overflow-x-hidden bg-gradient-to-b from-[#bfe7ff] via-[#c8efff] to-[#d4ffd2]">
      <main className="mx-auto w-full max-w-[980px] px-6 pb-12 pt-14 md:pt-20">
        <header className="mb-10 md:mb-14">
          <div className="text-[18px] font-extrabold tracking-tight md:text-[20px]">
            <span className="mr-1">🥔🥔🥔</span>
            <span className="opacity-90">’s Lab</span>
          </div>
          <h1 className="mt-2 text-[60px] font-black leading-[0.92] tracking-[-0.05em] md:text-[104px]">
            AI STUDIO
          </h1>
        </header>

        <section className="grid grid-cols-3 gap-4 md:gap-7">
          {tools.map((tool, idx) => {
            const clickable = tool.active && tool.to;
            return (
              <motion.button
                key={tool.key}
                type="button"
                onClick={() => clickable && navigate(tool.to!)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                className={[
                  'group text-left rounded-[18px] md:rounded-[22px] bg-white/55 backdrop-blur-xl',
                  'shadow-[0_14px_36px_-18px_rgba(0,0,0,0.35)] border border-white/70 overflow-hidden',
                  'flex flex-col',
                  clickable ? 'cursor-pointer hover:bg-white/75' : 'cursor-default opacity-85',
                ].join(' ')}
              >
                <div className="h-[88px] md:h-[140px] w-full bg-white/40 overflow-hidden">
                  {tool.image ? (
                    <img
                      src={tool.image}
                      alt={tool.name}
                      className={[
                        'h-full w-full object-cover',
                        clickable ? 'group-hover:scale-[1.03] transition-transform duration-500' : '',
                      ].join(' ')}
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-white/50">
                      <Wrench className="h-10 w-10 text-black/25" />
                    </div>
                  )}
                </div>

                <div className="px-3 pb-4 pt-3 md:px-5 md:pb-5 md:pt-4">
                  <div className="min-h-[56px] md:min-h-[66px]">
                    <div className="text-[14px] font-black leading-tight md:text-[18px]">{tool.name}</div>
                    <div className="mt-1 text-[11px] font-semibold leading-snug text-black/55 md:text-[13px]">
                      {tool.desc}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    {!tool.active ? (
                      <div className="text-[11px] font-black tracking-widest text-black/25 uppercase">...soon</div>
                    ) : (
                      <div className="text-[11px] font-black tracking-widest text-black/25 uppercase">ready</div>
                    )}
                    <div
                      className={[
                        'h-9 w-9 shrink-0 rounded-full bg-black/5 flex items-center justify-center',
                        clickable ? 'group-hover:bg-black group-hover:text-white transition-colors' : '',
                      ].join(' ')}
                    >
                      <ArrowRight className="h-4 w-4 opacity-70" />
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </section>

        <div className="mt-10 flex items-center justify-center py-10 text-black/40">
          <div className="flex flex-col items-center gap-2">
            <div className="leading-none">·</div>
            <div className="leading-none">·</div>
            <div className="leading-none">·</div>
          </div>
        </div>

        <footer className="mt-4 rounded-[999px] bg-[#0b0f1a] px-8 py-5 text-[11px] font-extrabold tracking-[0.18em] text-white/55 uppercase md:px-12">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <span>Last Update 26.04.28 — Operational</span>
            <button
              type="button"
              className="flex items-center gap-2 text-white/65 hover:text-white transition-colors"
            >
              개선사항 제안하기 <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}

