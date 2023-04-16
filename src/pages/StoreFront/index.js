import { isEmpty } from "lodash"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardBody, Col, Input, Nav, NavItem, NavLink, Row } from "reactstrap"

const ShopFront = () => {
  const [productList, setProductList] = useState([
    {
      product_image: "https://media.naheed.pk/catalog/product/cache/49dcd5d85f0fa4d590e132d0368d8132/i/u/iub1099661-1.jpg",
      unique_id: "wmemdmd2222",
      product_name: "Cigars",
      product_price: 300,
      type: "cigers",
    },
    {
      product_image: "https://media.naheed.pk/catalog/product/cache/49dcd5d85f0fa4d590e132d0368d8132/i/u/iub1099661-1.jpg",
      unique_id: "wmemdqasdda",
      product_name: "Beans Grag",
      product_price: 100,
      type: "cigers",
    },
    {
      product_image: "https://maltandgrape.com/products/xl_efes-malt-can-beer-500ml.png",
      unique_id: "wmw32221sds",
      product_name: "Adult Hood",
      product_price: 2000,
      type: "cigers",
    },
    {
      product_image: "https://media.naheed.pk/catalog/product/cache/49dcd5d85f0fa4d590e132d0368d8132/i/u/iub1099661-1.jpg",
      unique_id: "wmw322sw3222s",
      product_name: "Addmddd",
      product_price: 2000,
      type: "cigers",
    },
  ])

  return (
    <Col lg={12} xl={12}>
      <Card>
        <CardBody>
          <div>
            <Row>
              <Col md={6}>
                <div>
                  <h5>Showing result for SnapIt</h5>
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
                        <p className="text-muted font-size-13">{product.type}, Shoes</p>

                        <h5 className="mt-3 mb-0">
                          {/* <span className="text-muted me-2">
                                    <del>${product.oldPrice}</del>
                                  </span> */}
                          <b>${product.product_price}</b>
                        </h5>
                      </div>
                    </div>
                  </Col>
                ))}
            </Row>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

// ShopFront.propTypes = {
//   history: PropTypes.object,
// }

export default ShopFront
