const SiteFooter = () => (
  <footer className="relative z-10 border-t border-border/30 bg-card/90 backdrop-blur-xl text-foreground py-10 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-heading text-sm font-bold text-gradient">감자 스튜디오</span>
          <p className="text-xs text-muted-foreground">© 2026 AI Tool Hub. All rights reserved.</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-5 text-xs text-muted-foreground">
          <span>제작자: 김지은, 김영경, 안영채</span>
          <span>문의: 두레이</span>
        </div>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
