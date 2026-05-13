import { ThemeProvider } from '../landing/hooks/use-theme';
import Index from '../landing/pages/Index';

export default function Home() {
  return (
    <ThemeProvider>
      <Index />
    </ThemeProvider>
  );
}
