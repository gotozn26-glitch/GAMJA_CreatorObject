import type { ReactNode } from "react";
import { Box, Image as ImageIcon, Clapperboard, Layers, Sparkles } from "lucide-react";

export interface Tool {
  name: string;
  description: string;
  url: string;
  icon: ReactNode;
  category: string;
  featured?: boolean;
}

export const tools: Tool[] = [
  {
    name: "Rotation",
    description: "오브젝트를 정교하게 회전시킵니다",
    url: "/service/multiview",
    icon: <Layers className="h-6 w-6" />,
    category: "이미지",
    featured: true,
  },
  {
    name: "Object Create",
    description: "오브젝트를 생성합니다",
    url: "/service/creator-object",
    icon: <Box className="h-6 w-6" />,
    category: "이미지",
    featured: true,
  },
  {
    name: "SB Director",
    description: "스토리보드로 장면을 생성합니다",
    url: "/service/storyboard-director",
    icon: <Clapperboard className="h-6 w-6" />,
    category: "이미지",
    featured: true,
  },
  {
    name: "Logo Maker",
    description: "AI로 로고 컨셉을 생성·편집합니다",
    url: "/service/logo-maker",
    icon: <Sparkles className="h-6 w-6" />,
    category: "이미지",
    featured: true,
  },
  {
    name: "Varivariaition",
    description: "다양한 사이즈로 베리에이션합니다",
    url: "",
    icon: <ImageIcon className="h-5 w-5" />,
    category: "이미지",
  },
];
