import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect, useDispatch } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// users
import user4 from "../../../assets/images/users/avatar-4.jpg"
import { discardSelectedShop } from "../../../store/actions"

const ProfileMenu = props => {
  const dispatch = useDispatch()
  // const history = useHistory()
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)

  const [username, setusername] = useState("Tyler")

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))

      if (obj?.user.username) {
        setusername(obj.user.username)
      } else {
        localStorage.removeItem("authUser")
        // history.push("/login")
      }
    }
  }, [props.success])

  const callBeforeLogOut = () => {
    console.log("callBeforeLogOut")
    localStorage.removeItem("authUser")

    dispatch(discardSelectedShop())
  }

  return (
    <React.Fragment>
      <Dropdown isOpen={menu} toggle={() => setMenu(!menu)} className="d-inline-block">
        <DropdownToggle className="btn header-item waves-effect" id="page-header-user-dropdown" tag="button">
          <img className="rounded-circle header-profile-user" src={user4} alt="Header Avatar" />
          <span className="d-none d-xl-inline-block ms-1 fw-medium font-size-15">{username}</span>{" "}
          <i className="uil-angle-down d-none d-xl-inline-block font-size-15"></i>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem>
            <Link to="/profile" className="text-black">
              <i className="uil uil-user-circle font-size-18 align-middle text-muted me-1"></i>
              {"View Profile"}
            </Link>
          </DropdownItem>
          {/* <DropdownItem tag="a" href="/">
            <i className="uil uil-wallet font-size-18 align-middle me-1 text-muted"></i>
            My Wallet
          </DropdownItem> */}
          <DropdownItem tag="a" href="#">
            <i className="uil uil-cog font-size-18 align-middle me-1 text-muted"></i>
            {"Settings"}
            {/* <span className="badge bg-soft-success rounded-pill mt-1 ms-2">03</span> */}
          </DropdownItem>
          {/* <DropdownItem tag="a" href="auth-lock-screen">
            <i className="uil uil-lock-alt font-size-18 align-middle me-1 text-muted"></i>
            Lock screen
          </DropdownItem> */}
          <div className="dropdown-divider" />
          <Link to="/login" className="dropdown-item" onClick={callBeforeLogOut}>
            <i className="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted"></i>
            <span>{"Logout"}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(connect(mapStatetoProps, {})(withTranslation()(ProfileMenu)))
