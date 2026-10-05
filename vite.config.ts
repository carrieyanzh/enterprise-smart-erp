import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 专门为生产环境定制的极致构建包优化引擎配置
export default defineConfig({
  plugins: [react()],
  build: {
    // 强制关闭严苛的 CSS 代码空规则压缩检查，防止样式打包报错
    cssCodeSplit: true,
    minify: 'esbuild',
    chunkSizeWarningLimit: 1500,
  },
});
