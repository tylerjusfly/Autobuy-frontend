import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { connect, useDispatch } from "react-redux"
import { withRouter } from "react-router-dom"

import { discardSelectedShop, logoutUser } from "../../store/actions"

const Logout = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    props.logoutUser(props.history)

    // dispatch(discardSelectedShop())
  })

  return <></>
}

Logout.propTypes = {
  history: PropTypes.object,
  logoutUser: PropTypes.func,
}

export default withRouter(connect(null, { logoutUser })(Logout))
