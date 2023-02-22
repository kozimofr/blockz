declare module '@kozimo/blockz-icons';
declare module 'html-react-parser';
declare module 'intersection-observer';
declare module 'no-scroll';
declare module 'object-fit-images';
declare module 'query-string';
declare module 'react-popper';
declare module 'react-autosuggest';

// A SCSS module returns a map from string => string when imported.
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
