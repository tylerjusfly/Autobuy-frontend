import { isEmpty } from "lodash"
import React, { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Card, CardBody, Col, Input, Nav, NavItem, NavLink, Row } from "reactstrap"
import { fetchRequest } from "../../helpers/api_helper"
import { paginate } from "../../constants/layout"

const ShopFront = props => {
  const [loading, setLoading] = useState(true)
  const [productList, setProductList] = useState([])
  const [meta, setMeta] = useState({ ...paginate })
  const ShopFrontName = props.match.params[0]

  const fetchAllProducts = useCallback(async page => {
    const p = page || 1
    const shopname = props.match.params[0]

    try {
      setLoading(true)
      const url = `/products/fetch?shopname=${shopname}&limit=20&page=1`
      const rs = await fetchRequest(url, "GET", false)

      if (rs.success) {
        const { result, paging } = rs

        setProductList(result)
        setMeta(paging)
        setLoading(false)
      } else {
        console.log("failed", rs)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (loading) {
      fetchAllProducts()
    }
  }, [])

  return (
    <Col lg={12} xl={12}>
      <Card>
        <CardBody>
          <div>
            <Row>
              <Col md={6}>
                <div>
                  <h5>Showing result for {ShopFrontName}</h5>
                  <div className="text-muted">
                    <span className="badge bg-success font-size-14 me-1">
                      <i className="mdi mdi-star"></i> 4.2
                    </span>
                    {200} Reviews
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="form-inline float-md-end">
                  <div className="search-box ml-2">
                    <div className="position-relative">
                      <Input type="text" className="orm-control bg-light border-light rounded" placeholder="Search..." />
                      <i className="mdi mdi-magnify search-icon"></i>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            {/* End of top Row */}
            <Nav tabs className="nav-tabs-custom mt-3 mb-2 ecommerce-sortby-list">
              <NavItem>
                <NavLink className="disabled fw-medium">Sort by:</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="active">Popularity</NavLink>
              </NavItem>
              <NavItem>
                <NavLink>Newest</NavLink>
              </NavItem>
              <NavItem>
                <NavLink>Discount</NavLink>
              </NavItem>
            </Nav>
            {/* END OF NAV  */}
            <Row>
              {!isEmpty(productList) &&
                productList.map((product, key) => (
                  <Col xl={4} sm={6} key={"_col_" + key}>
                    <div
                      className="product-box"
                      // onClick={() => history.push(`/ecommerce-products/${product.unique_id}`)}
                    >
                      <div className="product-img pt-4 px-4">
                        {/* {product.isOffer ? (
                                  <div className="product-ribbon badge bg-danger">
                                    {`-${product.offer}%`}
                                  </div>
                                ) : null} */}
                        {/* <div className="product-wishlist">
                          <Link to="#">
                            <i className="mdi mdi-heart-outline"></i>
                          </Link>
                        </div> */}
                        <img src={product.product_image} alt="" className="img-fluid mx-auto d-block" width={50} />
                      </div>

                      <div className="text-center product-content p-4 mt-3">
                        <h5 className="mb-1">
                          <Link to={"/ecommerce-product-detail/" + product.unique_id} className="text-dark">
                            {product.product_name}
                          </Link>
                        </h5>
                        <p className="text-muted font-size-13">{product.product_type ?? "not Specified"}</p>

                        <h5 className="mt-3 mb-0">
                          {/* <span className="text-muted me-2">
                                    <del>${product.oldPrice}</del>
                                  </span> */}
                          <b>${product.product_price}</b>
                        </h5>
                      </div>
                    </div>
                    <Row className="text-center mt-2">
                      <Col sm={6} className="d-grid">
                        <Button type="button" color="primary" className="btn-block waves-effect waves-light mt-2 me-1">
                          <i className="uil uil-shopping-cart-alt me-2"></i>Proceed To Order
                        </Button>
                      </Col>
                      {/* <Col sm={6} className="d-grid">
                        <Button type="button" color="light" className="btn-block waves-effect  mt-2 waves-light">
                          <i className="uil uil-shopping-basket me-2"></i>Buy now
                        </Button>
                      </Col> */}
                    </Row>
                  </Col>
                ))}
            </Row>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default ShopFront
