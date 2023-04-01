import React from "react"
import { MoonLoader } from "react-spinners"

import searchingGIF from "../../assets/images/searching.gif"

const TableLoading = () => {
  return (
    <div className="loading-block">
      <img alt="searching" src={searchingGIF} />
      {/* <MoonLoader size={37} /> */}
    </div>
  )
}

export default TableLoading
