export const itemRender = (current, type, originalElement) => {
  if (type === "prev") {
    return <a>Previous</a>
  }
  if (type === "next") {
    return <a>Next</a>
  }
  return originalElement
}
