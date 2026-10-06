export default {
  plugins: {
    '@tailwindcss/postcss': {}, // ❗ 完美替换掉之前会报错的旧版 'tailwindcss'，锁定新版集成桥接器
    'autoprefixer': {},
  },
};
