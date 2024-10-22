export const resetCSS = {
  "html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, main, menu, nav, output, ruby, section, summary, time, mark, audio, video":
    {
      margin: "0",
      padding: "0",
      border: "0",
      fontSize: "100%",
      font: "inherit",
      verticalAlign: "baseline"
    },
  canvas: {
    outline: "none"
  },
  "article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section": {
    display: "block"
  },
  "*[hidden]": {
    display: "none"
  },
  "*": {
    boxSizing: "border-box"
  },
  body: {
    lineHeight: "1",
    background: "$gray1",
    fontSize: "14px"
  },
  a: {
    textDecoration: "none",
    color: "$gray12"
  },
  "ol, ul": {
    listStyle: "none"
  },
  "blockquote, q": {
    quotes: "none"
  },
  "blockquote:before, blockquote:after, q:before, q:after": {
    content: ""
  },
  table: {
    borderSpacing: "0"
  },
  /* Chrome, Safari, Edge, Opera */
  "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: 0
  },
  /* Firefox */
  "input[type=number]": {
    "-moz-appearance": "textfield"
  },
  "::-webkit-scrollbar": {
    background: "$gray3",
    width: "3px",
    height: 0
  },
  "::-webkit-scrollbar-thumb": {
    background: "$gray8",
    borderRadius: "3px"
  },
  "::selection": {
    backgroundColor: "$blue10",
    color: "$white"
  },
  "div[role=button]": {
    outline: "none"
  },
  svg: {
    outline: "none"
  }
};
