import React, { useEffect, useState } from "react"
import { Card, CardBody, Col, Form, Input, Label, Row } from "reactstrap"
import AsyncSelect from "react-select/async"
import makeAnimated from "react-select/animated"
import { fetchRequest } from "../../helpers/api_helper"
import { Link } from "react-router-dom"

const animatedComponents = makeAnimated()

const EditCoupon = ({ data, close }) => {
  const [selectedMulti, setselectedMulti] = useState([])
  const [productArray, setProductArray] = useState([])

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
  console.log("data", data)

  return (
    <>
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
                    <div className="mb-3" style={{ height: "200px" }}>
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
              <div className="table-responsive">
                <table className="table table-bordered border-primary mb-0">
                  <thead>
                    <tr>
                      <th>ProductId</th>
                      <th>name</th>
                      <th>Price</th>
                      <th>Price After Discount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.products?.map((p, i) => (
                      <tr key={i}>
                        <th scope="row">{p}</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <div className="col ms-auto text-end">
          <div className="d-flex flex-reverse flex-wrap gap-2">
            <button className="btn btn-danger" onClick={() => close(false)}>
              <i className="uil uil-times me-1"></i> Cancel
            </button>
            <button className="btn btn-success">
              {" "}
              <i className="uil uil-file-alt me-1"></i> Save{" "}
            </button>
          </div>
        </div>
      </Row>
    </>
  )
}

export default EditCoupon
