import { Rotation } from '../types';

export const generateSingleView = async (
  sourceBase64: string,
  cubeBase64: string,
  rotation: Rotation,
): Promise<string> => {
  const res = await fetch('/api/multiview/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      sourceDataUrl: sourceBase64,
      cubeDataUrl: cubeBase64,
      rotation,
    }),
  });
  const data = (await res.json()) as { url?: string; error?: string };
  if (!res.ok) {
    const msg = typeof data?.error === 'string' ? data.error : '생성에 실패했습니다.';
    if (msg.includes('Requested entity was not found') || msg.includes('API_KEY')) {
      throw new Error('API_KEY_RESET');
    }
    throw new Error(msg);
  }
  if (!data.url) throw new Error('이미지 응답이 없습니다.');
  return data.url;
};

export const editImage = async (base64Image: string, editPrompt: string): Promise<string | null> => {
  const res = await fetch('/api/multiview/edit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      imageDataUrl: base64Image,
      editPrompt,
    }),
  });
  const data = (await res.json()) as { url?: string | null; error?: string };
  if (!res.ok) {
    throw new Error(typeof data?.error === 'string' ? data.error : '편집에 실패했습니다.');
  }
  return data.url ?? null;
};
