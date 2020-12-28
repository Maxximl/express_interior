declare namespace CanvasCssNamespace {
  export interface ICanvasCss {
    canvasContainer: string;
  }
}

declare const CanvasCssModule: CanvasCssNamespace.ICanvasCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CanvasCssNamespace.ICanvasCss;
};

export = CanvasCssModule;
