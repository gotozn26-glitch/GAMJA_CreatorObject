import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const FluidNav = () => {
  const { theme, toggle } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
        <span className="font-heading text-base font-bold tracking-tight text-foreground">
          감자 스튜디오
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="h-8 w-8 rounded-full flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
            aria-label="테마 전환"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button className="btn-gradient rounded-full px-4 py-1.5 text-xs font-semibold">
            새 툴 추가
          </button>
        </div>
      </div>
    </nav>
  );
};

export default FluidNav;
