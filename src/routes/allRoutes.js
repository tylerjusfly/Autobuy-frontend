import React from "react"
import { Redirect } from "react-router-dom"
// Dashboard
import Dashboard from "../pages/Dashboard/index"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
// Profile
import UserProfile from "../pages/Authentication/user-profile"

import LatestTransaction from "../pages/Transaction"
import TopUser from "../pages/Transaction/TopUser"
import DatatableTables from "../pages/Transaction/Commerce"

const userRoutes = [
  { path: "/dashboard", component: Dashboard },

  // //profile
  { path: "/profile", component: UserProfile },

  { path: "/table", component: LatestTransaction },

  { path: "/comm", component: DatatableTables },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
]

const shopRoutes = [{ path: "/userss", component: TopUser }]

export { userRoutes, authRoutes, shopRoutes }
