// https://github.com/jaredpalmer/tsdx/issues/186#issuecomment-549601364
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
