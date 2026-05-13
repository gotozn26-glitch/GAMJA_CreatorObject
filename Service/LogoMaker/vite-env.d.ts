/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly CHAE_GPT_API_KEY?: string;
  readonly VITE_OPENAI_PLANNER_MODEL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
