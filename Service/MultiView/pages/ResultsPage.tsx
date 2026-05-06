
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GeneratedImage } from '../types';
import { editImage } from '../services/geminiService';

interface ResultsPageProps {
  sourceImage: string | null;
  results: GeneratedImage[];
  onUpdateResults: (results: GeneratedImage[]) => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ sourceImage, results, onUpdateResults }) => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (results.length > 0) {
      const timer = setTimeout(() => {
        setIsRevealed(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [results]);

  const downloadImage = (url: string, filename: string) => {
    try {
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${filename}.png`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download failed", err);
      window.open(url, '_blank');
    }
  };

  const handleEdit = async () => {
    if (!prompt.trim() || !sourceImage) return;
    setIsEditing(true);
    setIsRevealed(false);
    try {
      const editedUrl = await editImage(sourceImage, prompt);
      if (editedUrl) {
        const newResults = [...results];
        newResults[0] = { ...newResults[0], url: editedUrl, title: `AI 편집: ${prompt}` };
        onUpdateResults(newResults);
      }
      setPrompt('');
    } catch (e) {
      console.error(e);
    } finally {
      setIsEditing(false);
      setIsRevealed(true);
    }
  };

  if (results.length === 0) return null;

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-dark">
 

      <main className="flex-1 flex justify-center py-6 px-4 md:px-8 lg:px-12">
        <div className="flex flex-col w-full max-w-[1200px] gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border-dark pb-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-black tracking-tight text-white">생성 결과</h1>
                <span className="bg-green-500/10 text-green-500 text-[10px] font-bold px-2 py-1 rounded border border-green-500/20 uppercase">High Fidelity</span>
              </div>
              <p className="text-text-secondary text-base">원본의 고유 형태를 유지하며 각도가 겹치지 않도록 설계된 4분할 시트입니다.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => navigate('/upload')}
                className="h-10 px-5 rounded-lg border border-border-dark text-white text-sm font-bold hover:bg-border-dark transition-colors"
              >
                다른 각도로 다시 생성
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {results.map((item, i) => (
              <div key={i} className="flex flex-col gap-6 rounded-2xl bg-card-dark p-6 border border-border-dark shadow-xl hover:border-primary/30 transition-all group">
                <div className={`relative w-full aspect-square overflow-hidden rounded-xl bg-[#0f1218] image-blur-container border border-border-dark`}>
                  <div className={`image-blur-overlay ${isRevealed ? 'revealed' : ''}`}>
                    {!isRevealed && (
                      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    )}
                  </div>
                  
                  <div 
                    className={`absolute inset-0 bg-contain bg-no-repeat bg-center transition-all duration-1000 image-main ${isRevealed ? 'revealed' : ''}`} 
                    style={{backgroundImage: `url("${item.url}")`}}
                  ></div>
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                       <span className={`size-2 rounded-full ${i === 0 ? 'bg-primary' : 'bg-green-500'}`}></span>
                       <h3 className="text-white text-lg font-bold">{item.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-text-secondary text-sm font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10">{item.view}</span>
                      {i === 1 && <span className="text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">Diverse Perspectives</span>}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => downloadImage(item.url, `result_${i === 0 ? 'custom' : 'sheet'}`)}
                    className="w-full flex items-center justify-center gap-2 bg-surface-dark group-hover:bg-primary border border-border-dark group-hover:border-primary text-white py-3 rounded-xl font-bold transition-all active:scale-95"
                  >
                    <span className="material-symbols-outlined">download</span>
                    <span>이미지 저장</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 border-dashed mt-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">auto_fix_high</span>
                <h3 className="text-white font-bold">리터칭 (커스텀 뷰 대상)</h3>
              </div>
              <p className="text-text-secondary text-sm">상단의 커스텀 뷰 이미지의 형태를 유지한 채 재질이나 효과를 변경합니다.</p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="예: '황금색 메탈릭 재질', '그림자 효과 강화'"
                  className="flex-1 bg-surface-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-600"
                  onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
                />
                <button 
                  onClick={handleEdit}
                  disabled={isEditing || !prompt.trim()}
                  className="bg-primary hover:bg-primary-hover disabled:opacity-50 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg shadow-primary/20"
                >
                  {isEditing ? '처리 중...' : '적용'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
