module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/styles/global.scss";`
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
