import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreatorObjectPage from './pages/CreatorObjectPage';
import MultiViewPage from './pages/MultiViewPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service/multiview" element={<MultiViewPage />} />
        <Route path="/service/creator-object" element={<CreatorObjectPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
