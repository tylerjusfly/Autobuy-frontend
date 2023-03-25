import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"

const Shopmiddleware = ({ component: Component, layout: Layout, isAuthProtected, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (isAuthProtected && !localStorage.getItem("shop")) {
        return <Redirect to={{ pathname: "/dashboard", state: { from: props.location } }} />
      }

      return (
        <Layout>
          <Component {...props} />
        </Layout>
      )
    }}
  />
)

Shopmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
}

export default Shopmiddleware
