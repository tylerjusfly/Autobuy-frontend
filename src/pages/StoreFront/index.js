import React from "react"
import { Link } from "react-router-dom"
import { Card, CardBody, Col, Input, Row } from "reactstrap"

const index = () => {
  return (
    <Col lg={12} xl={12}>
      <Card>
        <CardBody>
          <div>
            <Row>
              <Col md={6}>
                <div>
                  <h5>Showing result for &quot;Shoes&quot;</h5>
                  <ol className="breadcrumb p-0 bg-transparent mb-2">
                    <li className="breadcrumb-item">
                      <Link to="#">Footwear</Link>
                    </li>
                  </ol>
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
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default index
