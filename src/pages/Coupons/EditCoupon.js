import React, { useEffect, useState } from "react"
import { Card, CardBody, Col, Form, Input, Label, Row } from "reactstrap"
import AsyncSelect from "react-select/async"
import makeAnimated from "react-select/animated"
import { fetchRequest } from "../../helpers/api_helper"

const animatedComponents = makeAnimated()

const EditCoupon = ({ data }) => {
  const [selectedMulti, setselectedMulti] = useState([])

  const fetchProducts = async q => {
    if (!q || q.length < 1) {
      return []
    }
    const url = `/products/fetch?shop_id=${data.shopId}&page=1&limit=10&q=${q}`
    const rs = await fetchRequest(url, "GET", true)

    const { result } = rs

    const formatResult = result.map(product => ({
      value: product.id,
      label: product.product_name,
    }))

    return formatResult
  }

  function handleMulti(selectedMulti) {
    setselectedMulti(selectedMulti)
  }

  console.log(
    "nn",
    selectedMulti.map(m => m.value)
  )

  return (
    <Row>
      <Col lg={12}>
        <Card>
          <CardBody>
            <form
              onSubmit={e => {
                e.preventDefault()
                // validation.handleSubmit()
                // return false
              }}
            >
              <Row>
                <Col xl={6}>
                  <div className="mb-3">
                    <Label>Code</Label>
                    <Input type="text" className="form-control" value={data.code} readOnly disabled />
                  </div>
                </Col>
                <Col xl={3}>
                  <div className="mb-3">
                    <Label>Discount</Label>
                    <Input type="text" className="form-control" value={`${data.discount}%`} readOnly disabled />
                  </div>
                </Col>
                <Col xl={3}>
                  <div className="mb-3">
                    <Label>Max Use</Label>
                    <Input type="text" className="form-control" value={data.max_use} readOnly disabled />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xxl={12}>
                  <div className="mb-3" style={{ height: "300px" }}>
                    <label className="control-label">Products</label>

                    <AsyncSelect
                      cacheOptions
                      components={animatedComponents}
                      defaultOptions
                      loadOptions={fetchProducts}
                      isMulti
                      onChange={e => {
                        handleMulti(e)
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default EditCoupon
