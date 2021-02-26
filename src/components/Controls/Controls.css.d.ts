declare namespace ControlsCssNamespace {
  export interface IControlsCss {
    materialControl: string;
  }
}

declare const ControlsCssModule: ControlsCssNamespace.IControlsCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ControlsCssNamespace.IControlsCss;
};

export = ControlsCssModule;
