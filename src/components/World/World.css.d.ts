declare namespace WorldCssNamespace {
  export interface IWorldCss {
    container: string;
  }
}

declare const WorldCssModule: WorldCssNamespace.IWorldCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: WorldCssNamespace.IWorldCss;
};

export = WorldCssModule;
