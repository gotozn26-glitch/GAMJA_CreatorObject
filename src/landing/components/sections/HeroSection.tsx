const HeroSection = () => {
  const scrollToCategories = () => {
    document.getElementById("main-tools")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-14 overflow-hidden min-h-[52vh] flex items-center">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <p className="text-foreground/60 text-sm font-medium tracking-widest uppercase mb-2">
          AI 프로젝트 허브
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-2 leading-[1.05] text-gradient">
          감자 스튜디오
        </h1>
        <p className="text-foreground/60 text-base max-w-md mx-auto mb-4 leading-relaxed">
          감자스튜디오의 다양한 AI툴을 확인해보세요
        </p>
        <button
          type="button"
          onClick={scrollToCategories}
          className="btn-gradient inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-semibold"
        >
          툴 확인하기
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
