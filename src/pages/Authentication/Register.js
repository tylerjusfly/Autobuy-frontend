import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

// action
import { registerUser, apiError } from "../../store/actions"

// Redux
import { useSelector, useDispatch } from "react-redux"

import { withRouter, Link } from "react-router-dom"

// import images
import logo from "../../assets/images/logo-dark.png"
import logolight from "../../assets/images/logo-light.png"

const Register = props => {
  const dispatch = useDispatch()

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Please Enter Your Firstname"),
      lastname: Yup.string().required("Please Enter Your Lastname"),
      email: Yup.string().required("Please Enter Your Email"),
      username: Yup.string().required("Please Enter Your Username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: values => {
      dispatch(registerUser(values))
    },
  })

  const { user, registrationError } = useSelector(state => ({
    user: state.Account.user,
    registrationError: state.Account.registrationError,
    loading: state.Account.loading,
  }))

  // handleValidSubmit
  // const handleValidSubmit = (event, values) => {
  //   dispatch(registerUser(values));
  // }

  useEffect(() => {
    dispatch(apiError(""))
    document.body.className = "authentication-bg"
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = ""
    }
  }, [dispatch])

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
                    <h5 className="text-primary">Register Account</h5>
                    <p className="text-muted">Get your free Minible account now.</p>
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
                      {user && user ? <Alert color="success">Account Registered, Kindly check you mail</Alert> : null}

                      {registrationError && registrationError ? <Alert color="danger">{registrationError}</Alert> : null}

                      <div className="mb-3">
                        <Label className="form-label">Firstname</Label>
                        <Input
                          id="firstname"
                          name="firstname"
                          className="form-control"
                          placeholder="Enter firstname"
                          type="firstname"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.firstname || ""}
                          invalid={validation.touched.firstname && validation.errors.firstname ? true : false}
                        />
                        {validation.touched.firstname && validation.errors.firstname ? <FormFeedback type="invalid">{validation.errors.firstname}</FormFeedback> : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Lastname</Label>
                        <Input
                          id="lastname"
                          name="lastname"
                          className="form-control"
                          placeholder="Enter lastname"
                          type="lastname"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.lastname || ""}
                          invalid={validation.touched.lastname && validation.errors.lastname ? true : false}
                        />
                        {validation.touched.lastname && validation.errors.lastname ? <FormFeedback type="invalid">{validation.errors.lastname}</FormFeedback> : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          id="email"
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
                        <Label className="form-label">Username</Label>
                        <Input
                          name="username"
                          type="text"
                          placeholder="Enter username"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.username || ""}
                          invalid={validation.touched.username && validation.errors.username ? true : false}
                        />
                        {validation.touched.username && validation.errors.username ? <FormFeedback type="invalid">{validation.errors.username}</FormFeedback> : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={validation.touched.password && validation.errors.password ? true : false}
                        />
                        {validation.touched.password && validation.errors.password ? <FormFeedback type="invalid">{validation.errors.password}</FormFeedback> : null}
                      </div>
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="auth-terms-condition-check" />
                        <label className="form-check-label" htmlFor="auth-terms-condition-check">
                          I accept{" "}
                          <Link to="#" className="text-dark">
                            Terms and Conditions
                          </Link>
                        </label>
                      </div>

                      <div className="mt-3 text-end">
                        <button className="btn btn-primary w-sm waves-effect waves-light" type="submit">
                          Register
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="text-muted mb-0">
                          Already have an account ?
                          <Link to="/login" className="fw-medium text-primary">
                            {" "}
                            Login
                          </Link>
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  © {new Date().getFullYear()} Minible. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
export default withRouter(Register)

Register.propTypes = {
  registerUser: PropTypes.func,
  // registerUserFailed: PropTypes.func,
  registrationError: PropTypes.any,
  user: PropTypes.any,
}
