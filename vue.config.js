module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/styles/global-imports.scss";`
      }
    }
  },
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:8000",
        ws: true,
        changeOrigin: true
      }
    }
  }
};
