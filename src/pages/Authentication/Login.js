import PropTypes from "prop-types"
import React, { useEffect } from "react"

import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap"

// Redux
import { withRouter, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

// actions
import { loginUser } from "../../store/actions"

// import images
import logo from "../../assets/images/logo-dark.png"
import logolight from "../../assets/images/logo-light.png"

const Login = props => {
  const dispatch = useDispatch()

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "tylerjusfly1@gmail.com" || "",
      password: "ladygaga" || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: values => {
      dispatch(loginUser(values, props.history))
    },
  })

  const { error } = useSelector(state => ({
    error: state.Login.error,
  }))

  useEffect(() => {
    document.body.className = "authentication-bg"
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = ""
    }
  })

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center">
                <Link to="/" className="mb-5 d-block auth-logo">
                  <img src={logo} alt="" height="22" className="logo logo-dark" />
                  <img src={logolight} alt="" height="22" className="logo logo-light" />
                </Link>
              </div>
            </Col>
          </Row>
          <Row className="align-items-center justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card>
                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Welcome Back !</h5>
                    <p className="text-muted">Sign in to continue to Riggs.</p>
                  </div>
                  <div className="p-2 mt-4">
                    <Form
                      className="form-horizontal"
                      onSubmit={e => {
                        e.preventDefault()
                        validation.handleSubmit()
                        return false
                      }}
                    >
                      {error ? <Alert color="danger">{error}</Alert> : null}

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={validation.touched.email && validation.errors.email ? true : false}
                        />
                        {validation.touched.email && validation.errors.email ? <FormFeedback type="invalid">{validation.errors.email}</FormFeedback> : null}
                      </div>

                      <div className="mb-3">
                        <div className="float-end">
                          <Link to="/forgot-password" className="text-muted">
                            Forgot password?
                          </Link>
                        </div>
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          value={validation.values.password || ""}
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={validation.touched.password && validation.errors.password ? true : false}
                        />
                        {validation.touched.password && validation.errors.password ? <FormFeedback type="invalid">{validation.errors.password}</FormFeedback> : null}
                      </div>

                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="customControlInline" />
                        <label className="form-check-label" htmlFor="customControlInline">
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3">
                        <button className="btn btn-primary w-100 waves-effect waves-light" type="submit">
                          Log In
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          Don&apos;t have an account ?
                          <Link to="/register" className="fw-medium text-primary">
                            Signup now
                          </Link>
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                {/* <p>
                  © {new Date().getFullYear()}
                  Minible. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand
                </p> */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Login)

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func,
}
