import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/use-theme";

const InteractiveGradient = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.3 });
  const animMouse = useRef({ x: 0.5, y: 0.3 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const blobs = [
      { hue: 330, sat: 80, light: 55, size: 0.5 },
      { hue: 270, sat: 70, light: 55, size: 0.45 },
      { hue: 220, sat: 80, light: 55, size: 0.5 },
      { hue: 30, sat: 90, light: 55, size: 0.35 },
    ];

    const draw = (t: number) => {
      const w = canvas.width;
      const h = canvas.height;

      // Smooth follow
      animMouse.current.x += (mouse.current.x - animMouse.current.x) * 0.02;
      animMouse.current.y += (mouse.current.y - animMouse.current.y) * 0.02;

      const mx = animMouse.current.x;
      const my = animMouse.current.y;

      const isDark = theme === "dark";
      ctx.fillStyle = isDark ? "hsl(240,10%,4%)" : "hsl(220,20%,97%)";
      ctx.fillRect(0, 0, w, h);

      blobs.forEach((b, i) => {
        const angle = t * 0.0003 + i * 1.5;
        const cx = w * (0.3 + i * 0.15 + Math.sin(angle) * 0.08 + (mx - 0.5) * 0.15);
        const cy = h * (0.3 + Math.cos(angle + i) * 0.1 + (my - 0.5) * 0.15);
        const r = Math.min(w, h) * b.size;

        const alpha = isDark ? 0.15 : 0.12;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, `hsla(${b.hue},${b.sat}%,${b.light}%,${alpha})`);
        grad.addColorStop(1, `hsla(${b.hue},${b.sat}%,${b.light}%,0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      });

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default InteractiveGradient;
