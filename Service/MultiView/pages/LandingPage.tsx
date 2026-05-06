
import React from 'react';
import { Link } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  return (
    <div className="w-full">
      <section className="w-full max-w-[1280px] px-4 md:px-10 py-12 md:py-24 flex flex-col items-center mx-auto">
        <div className="w-full relative rounded-3xl overflow-hidden min-h-[560px] flex flex-col items-center justify-center text-center p-10 gap-10 bg-cover bg-center shadow-2xl" style={{backgroundImage: 'linear-gradient(rgba(17, 23, 34, 0.8) 0%, rgba(17, 23, 34, 0.5) 50%, rgba(17, 23, 34, 0.9) 100%), url("https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop")'}}>
          <div className="flex flex-col gap-6 max-w-3xl z-10">
            <span className="text-primary font-black tracking-widest uppercase text-xs md:text-sm bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 self-center">Next-Gen 3D Vision AI</span>
            <h1 className="text-white text-4xl md:text-7xl font-black leading-tight tracking-tighter drop-shadow-2xl">
              단 한 장의 사진으로 <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">완벽한 3D 시각화</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto">
              2D 이미지를 업로드하고 즉시 사용 가능한 다각도 뷰를 생성하세요. <br className="hidden md:block"/> 복잡한 모델링 없이도 3D 에셋 확보가 가능해집니다.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-5 z-10 w-full sm:w-auto">
            <Link to="/generate" className="flex items-center justify-center rounded-2xl h-14 px-10 bg-primary hover:bg-blue-600 transition-all transform hover:scale-105 text-white text-lg font-black shadow-2xl shadow-blue-500/40">
              무료로 시작하기
            </Link>
            <button className="flex items-center justify-center rounded-2xl h-14 px-10 bg-surface-dark/80 backdrop-blur border border-border-dark hover:border-gray-500 transition-all text-white text-lg font-bold">
              기술 소개서 보기
            </button>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-80"></div>
        </div>
      </section>

      <section className="w-full bg-surface-dark/20 border-y border-border-dark py-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10">
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-4 text-center">
              <h2 className="text-white text-3xl md:text-5xl font-black tracking-tight">혁신적인 3단계 프로세스</h2>
              <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">최신 Gemini 2.5 AI 모델이 당신의 이미지를 입체적으로 재구성합니다.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: "cloud_upload", title: "이미지 업로드", text: "정지된 2D 소스 이미지를 업로드합니다. 피사체가 뚜렷할수록 더욱 정교한 결과가 생성됩니다." },
                { icon: "precision_manufacturing", title: "지능형 3D 투영", text: "신경망이 물체의 기하학적 특징을 파악하여 사용자가 지정한 X/Y 각도로 정밀하게 투영합니다." },
                { icon: "download_done", title: "에셋 다운로드", text: "모델링 파이프라인이나 스프라이트 시트에 즉시 활용 가능한 PNG 결과물을 저장하세요." }
              ].map((step, i) => (
                <div key={i} className="flex flex-col gap-8 rounded-3xl border border-border-dark bg-surface-dark/40 p-10 hover:border-primary/40 transition-all group">
                  <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">{step.icon}</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-white text-2xl font-black">{step.title}</h3>
                    <p className="text-text-secondary leading-relaxed text-base">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
