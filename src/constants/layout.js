const layoutTypes = {
  HORIZONTAL: "horizontal",
  VERTICAL: "vertical",
}

const layoutModeTypes = {
  LIGHT: "light",
  DARK: "dark",
}

const layoutWidthTypes = {
  FLUID: "lg",
  BOXED: "boxed",
}

const topBarThemeTypes = {
  LIGHT: "light",
  DARK: "dark",
}

const sidebarSizeTypes = {
  DEFAULT: "lg",
  COMPACT: "small",
  ICON: "sm",
}

const leftSideBarThemeTypes = {
  LIGHT: "light",
  COLORED: "colored",
  DARK: "dark",
}

const isObjectEmpty = object => {
  return Object.keys(object).length === 0 && object.constructor === Object
}

const paginate = {
  page: 0,
  pages: 0,
  total: 0,
}

export { layoutTypes, layoutModeTypes, layoutWidthTypes, topBarThemeTypes, sidebarSizeTypes, leftSideBarThemeTypes, isObjectEmpty, paginate }
