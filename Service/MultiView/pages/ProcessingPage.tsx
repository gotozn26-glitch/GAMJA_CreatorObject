
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeneratedImage, Rotation } from '../types';
// Fixed: Removed generateMultiViewSheet which is not exported from geminiService
import { generateSingleView } from '../services/geminiService';

interface ProcessingPageProps {
  sourceImage: string | null;
  rotation: Rotation;
  onComplete: (results: GeneratedImage[]) => void;
}

export const ProcessingPage: React.FC<ProcessingPageProps> = ({ sourceImage, rotation, onComplete }) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const isCalled = useRef(false);

  useEffect(() => {
    if (!sourceImage) {
      navigate('/upload');
      return;
    }

    if (isCalled.current) return;
    isCalled.current = true;

    const interval = setInterval(() => {
      setProgress(p => (p < 95 ? p + Math.random() * 1.5 : p));
    }, 500);

    const callApi = async () => {
      try {
        const sourceBase64 = sourceImage as string;
        // Fixed: generateMultiViewSheet removed as it does not exist in the service
        const singleUrl = await generateSingleView(sourceBase64, sourceBase64, rotation);
        
        const results: GeneratedImage[] = [
          {
            url: singleUrl,
            title: '커스텀 뷰 (정밀 형태 보존)',
            // Updated view string to include X, Y, and Z axes
            view: `X:${rotation.x}°, Y:${rotation.y}°, Z:${rotation.z}°`
          }
        ];
        
        setProgress(100);
        setTimeout(() => {
          onComplete(results);
          navigate('/results');
        }, 1000);
      } catch (error) {
        console.error("API Call Failed", error);
        navigate('/upload');
      }
    };

    callApi();

    return () => clearInterval(interval);
  }, [sourceImage, rotation, navigate, onComplete]);

  return (
    <div className="bg-background-dark min-h-screen flex flex-col w-full">
      <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-[800px] flex flex-col gap-8">
          <div className="text-center space-y-2">
            <h1 className="text-white tracking-light text-3xl font-bold leading-tight">형태 보존 렌더링 진행 중</h1>
            <p className="text-text-secondary text-base font-normal">원본 객체의 기하학적 구조를 유지하며 지정된 각도로 투영하고 있습니다.</p>
          </div>
          <div className="bg-surface-dark rounded-xl shadow-sm border border-border-dark overflow-hidden">
            <div className="p-6 border-b border-border-dark/50 flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="relative group w-32 h-32 flex-shrink-0">
                <div 
                  className="w-full h-full bg-center bg-no-repeat bg-contain rounded-lg border border-[#324467]" 
                  style={{backgroundImage: `url("${sourceImage}")`}}
                >
                  <div className="absolute inset-0 overflow-hidden rounded-lg opacity-50">
                    <div className="scan-line"></div>
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full flex flex-col justify-center gap-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-white text-lg font-bold leading-tight">High-Fidelity 3D Engine</h3>
                    <p className="text-text-secondary text-sm mt-1">구조 분석 및 픽셀 단위 투영 연산 중</p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-blue-900/30 px-2.5 py-0.5 text-xs font-medium text-blue-300 ring-1 ring-inset ring-blue-400/20">
                    Identity Protected
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-6 justify-between items-end">
                    <p className="text-primary text-sm font-medium animate-pulse">정밀 기하학적 매핑 수행 중...</p>
                    <p className="text-white text-sm font-bold">{Math.round(progress)}%</p>
                  </div>
                  <div className="h-2 w-full bg-[#324467] rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-300 ease-out relative overflow-hidden" style={{width: `${progress}%`}}>
                      <div className="absolute top-0 left-0 bottom-0 right-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
