export const analyzeStoryboard = async (
  imageBase64: string,
  prompt: string,
  slots: { id: string; type: string }[],
): Promise<{ slotId: string; box: [number, number, number, number] }[]> => {
  const res = await fetch("/api/storyboard/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ imageDataUrl: imageBase64, prompt, slots }),
  });
  const data = (await res.json()) as { results?: unknown; error?: string };
  if (!res.ok) {
    throw new Error(typeof data?.error === "string" ? data.error : "분석에 실패했습니다.");
  }
  return Array.isArray(data.results) ? (data.results as { slotId: string; box: [number, number, number, number] }[]) : [];
};

export const generateDirectorImage = async (
  baseImageBase64: string,
  maskImageBase64: string,
  prompt: string,
  references: { color: string; type: string; image: string }[],
): Promise<string[]> => {
  const res = await fetch("/api/storyboard/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      baseDataUrl: baseImageBase64,
      maskDataUrl: maskImageBase64,
      prompt,
      references: references.map((r) => ({
        color: r.color,
        type: r.type,
        imageDataUrl: r.image,
      })),
    }),
  });
  const data = (await res.json()) as { images?: string[]; error?: string };
  if (!res.ok) {
    throw new Error(typeof data?.error === "string" ? data.error : "생성에 실패했습니다.");
  }
  return Array.isArray(data.images) ? data.images : [];
};
