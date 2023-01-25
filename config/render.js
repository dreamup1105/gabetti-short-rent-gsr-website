  // Render Configuration:
export const render = {
  http2: {
    push: true,
    pushAssets: (req, res, publicPath, preloadFiles) =>
      preloadFiles
        .filter(f => f.asType === 'script' && f.file === 'runtime.js')
        .map(f => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`)
  }
}
