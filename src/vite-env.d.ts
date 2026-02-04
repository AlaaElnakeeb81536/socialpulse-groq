/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GROQ_API_KEY: string;
  // اضيفي هنا أي متغيرات env ثانية لو موجودة
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
