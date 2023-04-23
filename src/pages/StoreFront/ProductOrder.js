import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Button, Card, CardBody, Col, Container, Row, TabContent, Input, TabPane, Modal } from "reactstrap"
import { isEmpty } from "lodash"
import { formatCurrency } from "../../constants/utilities"

const ProductOrder = ({ modal_fullscreen, setmodal_fullscreen, tog_fullscreen, product }) => {
  const [activeTab, setActiveTab] = useState("1")
  const [couponApplied, setCouponApplied] = useState(false)
  const [Couponprice, setCouponPrice] = useState(0)
  const [couponPercent, setCouponPercent] = useState(0)

  const applyCoupon = () => {}

  // useEffect(() => {
  //   setPrice(product.product_price)
  // }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Modal
            size="xl"
            isOpen={modal_fullscreen}
            toggle={() => {
              tog_fullscreen()
            }}
            className="modal-fullscreen"
          >
            <div className="modal-header">
              <button
                onClick={() => {
                  setmodal_fullscreen(false)
                }}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              {!isEmpty(product) && (
                <Row>
                  <Col lg={12}>
                    <Card>
                      <CardBody>
                        <Row>
                          {/* IMAGE TAB */}
                          <Col xl={5}>
                            <div className="product-detail">
                              <Row>
                                <Col xs={12}>
                                  <TabContent activeTab={activeTab} className="position-relative">
                                    <TabPane tabId="1">
                                      <div className="product-img">
                                        <img src={product.product_image} alt="" id="expandedImg1" className="img-fluid mx-auto d-block" />
                                      </div>
                                    </TabPane>
                                  </TabContent>
                                </Col>
                              </Row>
                            </div>
                          </Col>
                          {/* ACTIONS TAB */}
                          <Col xl={7}>
                            <div className="mt-4 mt-xl-3 ps-xl-4">
                              <h5 className="font-size-14">
                                <Link to="#" className="text-muted">
                                  Nike
                                </Link>
                              </h5>
                              <h4 className="font-size-20 mb-3">{product?.product_name}</h4>

                              <div className="text-muted">
                                <span className="badge bg-success font-size-14 me-1">
                                  <i className="mdi mdi-star"></i> 4.2
                                </span>{" "}
                                200 Reviews
                              </div>

                              <h5 className="mt-4 pt-2">
                                {couponApplied ? (
                                  <>
                                    <del className="text-muted me-2">{formatCurrency(product.product_price)}</del>

                                    <span>{formatCurrency(Couponprice)} </span>
                                    <span className="text-danger font-size-14 ms-2">- {couponPercent} % Off</span>
                                  </>
                                ) : (
                                  <span>{formatCurrency(product.product_price)}</span>
                                )}
                              </h5>

                              <p className="mt-4 text-muted">{"the worlld best friend"}</p>

                              <div className="mt-3">
                                <h5 className="font-size-14 mb-3">
                                  <i className="bx bxs-discount font-size-20 text-primary align-middle me-2"></i>
                                  Coupon code
                                </h5>

                                <div className="d-inline-flex">
                                  <div className="input-group mb-3">
                                    <Input type="text" className="form-control" placeholder="Enter Coupon code" />

                                    <Button color="light" type="button">
                                      Check
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <Row>
                                  <Col md={12}>
                                    <div className="mt-3">
                                      <h5 className="font-size-14">Services :</h5>
                                      <ul className="list-unstyled product-desc-list text-muted">
                                        <li>
                                          <i className={"uil uil-" + "10-plus" + " text-primary me-1 font-size-16"}></i> 10 Days Replacement
                                        </li>
                                      </ul>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                              {/* Payment buttons */}
                              <Row className="text-center mt-2">
                                <Col sm={4} className="d-grid">
                                  <Button type="button" color="primary" className="btn-block waves-effect waves-light mt-2 me-1">
                                    <i className="bx bxl-stripe me-2"></i>Pay with stripe
                                  </Button>
                                </Col>
                                <Col sm={4} className="d-grid">
                                  <Button type="button" color="primary" className="btn-block waves-effect  mt-2 waves-light">
                                    <i className="bx bxl-paypal me-2"></i>Pay with PayPal
                                  </Button>
                                </Col>
                                <Col sm={4} className="d-grid">
                                  <Button type="button" color="primary" className="btn-block waves-effect  mt-2 waves-light">
                                    <i className="bx bxl-bitcoin me-2"></i>Pay with Coinbase
                                  </Button>
                                </Col>
                              </Row>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              )}
              {/* ENDS HERE */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={() => {
                  tog_fullscreen()
                }}
                className="btn btn-secondary waves-effect"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = ({ ecommerce }) => ({
  product: ecommerce.product,
})

export default connect(mapStateToProps)(ProductOrder)
