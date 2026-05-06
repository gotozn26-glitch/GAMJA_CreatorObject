
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rotation } from '../types';

interface UploadPageProps {
  sourceImage: string | null;
  onImageUpload: (img: string | null) => void;
  rotation: Rotation;
  onRotationChange: (rotation: Rotation) => void;
}

export const UploadPage: React.FC<UploadPageProps> = ({ 
  sourceImage, 
  onImageUpload, 
  rotation, 
  onRotationChange 
}) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => onImageUpload(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRotationChange = (axis: keyof Rotation, value: string) => {
    const numValue = parseInt(value) || 0;
    onRotationChange({ ...rotation, [axis]: numValue });
  };

  const handleStart = () => navigate('/processing');

  return (
    <div className="flex flex-col items-center pt-12 pb-20 px-4 md:px-10">
      <div className="flex flex-col gap-4 text-center max-w-[720px] mb-12">
        <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-tight">지능형 3D 회전 제어</h1>
        <h2 className="text-text-secondary text-lg">
          이미지를 업로드하고 3D 큐브의 방향에 맞춰 회전 값을 설정하세요.
        </h2>
      </div>

      <div className="w-full max-w-[1000px] flex flex-col gap-8">
        <div className="bg-surface-dark rounded-[2rem] border border-border-dark overflow-hidden shadow-2xl p-8 md:p-10">
          {!sourceImage ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="group flex flex-col items-center justify-center w-full h-80 rounded-2xl border-2 border-dashed border-border-dark bg-[#0b0f17]/50 hover:border-primary hover:bg-[#0b0f17] transition-all cursor-pointer"
            >
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[40px]">cloud_upload</span>
                </div>
                <p className="text-white text-xl font-bold">이미지 업로드 (FRONT)</p>
                <p className="text-text-secondary text-sm font-medium">이 이미지는 3D 공간의 정면(FRONT) 기준점이 됩니다.</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-12">
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-white text-xs font-black uppercase tracking-widest text-primary">원본 이미지 (FRONT)</h3>
                  <button onClick={() => onImageUpload(null)} className="text-xs text-red-400 font-bold hover:underline uppercase">교체하기</button>
                </div>
                <div className="aspect-square w-full rounded-2xl bg-[#0b0f17] border border-border-dark flex items-center justify-center overflow-hidden p-6">
                  <img src={sourceImage} className="max-w-full max-h-full object-contain drop-shadow-2xl" />
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-8">
                <div className="flex flex-col items-center bg-[#0b0f17] rounded-2xl p-6 border border-border-dark relative">
                  <h3 className="text-white text-[10px] font-black uppercase tracking-widest mb-6 self-start opacity-50">3D ORIENTATION SYNC</h3>
                  
                  <div className="cube-container mb-6">
                    <div 
                      className="cube"
                      style={{ 
                        transform: `rotateZ(${rotation.x}deg) rotateX(${-rotation.y}deg) rotateY(${rotation.z}deg)` 
                      }}
                    >
                      <div className="face front">FRONT</div>
                      <div className="face back">BACK</div>
                      <div className="face right">RIGHT</div>
                      <div className="face left">LEFT</div>
                      <div className="face top">TOP</div>
                      <div className="face bottom">BOTTOM</div>
                    </div>
                  </div>

                  <div className="flex gap-4 w-full">
                    <div className="flex-1 text-center py-2 bg-primary/10 border border-primary/20 rounded-xl">
                      <p className="text-[10px] font-bold text-primary/60 uppercase">Pitch</p>
                      <p className="text-white font-black">{rotation.y}°</p>
                    </div>
                    <div className="flex-1 text-center py-2 bg-primary/10 border border-primary/20 rounded-xl">
                      <p className="text-[10px] font-bold text-primary/60 uppercase">Yaw</p>
                      <p className="text-white font-black">{rotation.z}°</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex flex-col gap-3">
                    <label className="text-text-secondary text-[11px] font-black flex justify-between uppercase tracking-widest">
                      <span>Yaw (좌/우 회전 - Z)</span>
                      <span className="text-primary">{rotation.z}°</span>
                    </label>
                    <input 
                      type="range" min="-180" max="180" 
                      value={rotation.z}
                      onChange={(e) => handleRotationChange('z', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-text-secondary text-[11px] font-black flex justify-between uppercase tracking-widest">
                      <span>Pitch (위/아래 각도 - Y)</span>
                      <span className="text-primary">{rotation.y}°</span>
                    </label>
                    <input 
                      type="range" min="-90" max="90" 
                      value={rotation.y}
                      onChange={(e) => handleRotationChange('y', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-3 opacity-50">
                    <label className="text-text-secondary text-[11px] font-black flex justify-between uppercase tracking-widest">
                      <span>Roll (시계방향 회전 - X)</span>
                      <span className="text-primary">{rotation.x}°</span>
                    </label>
                    <input 
                      type="range" min="-180" max="180" 
                      value={rotation.x}
                      onChange={(e) => handleRotationChange('x', e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                <button 
                  onClick={handleStart}
                  disabled={!sourceImage}
                  className="w-full h-14 bg-primary hover:bg-[#00bda2] text-white rounded-xl font-black text-sm tracking-widest transition-all shadow-xl shadow-primary/10 active:scale-95 disabled:opacity-50"
                >
                  3D 정밀 렌더링 시작
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
