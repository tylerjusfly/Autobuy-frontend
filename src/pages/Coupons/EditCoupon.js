import React, { useEffect, useState, useCallback } from "react"
import { Button, Card, CardBody, Col, Form, Input, Label, Modal, Row } from "reactstrap"

import { fetchRequest } from "../../helpers/api_helper"
import { Link } from "react-router-dom"
import { paginate } from "../../constants/layout"

import { useToast } from "../../helpers/Notifcation/useToast"
import { PaginationTab } from "../../components/Common/Pagination"

const EditCoupon = ({ data, close }) => {
  const { showToast, RenderToast } = useToast()
  const [viewProds, setViewProds] = useState(false)
  const [productArray, setProductArray] = useState([])
  const [couponProducts, setCouponProducts] = useState([])
  const [meta, setMeta] = useState({ ...paginate })

  const tog_large = useCallback(() => {
    viewProds ? setViewProds(false) : setViewProds(true)
  }, [viewProds])

  const fetchProducts = async page => {
    let p = page || 1
    try {
      const url = `/coupons/get-products/?shop_id=${data.shopId}&limit=10&page=${p}`
      const rs = await fetchRequest(url, "GET", true)

      if (rs.success) {
        const { result, paging } = rs

        setProductArray(result)
        setMeta(paging)
      }
    } catch (error) {
      // showToast("error fetching products", "danger", 6000)
      console.log(error)
    }
  }

  const fetchProductsWithCoupon = async page => {
    try {
      const url = `/coupons/fetchproducts?coupon_id=${data.id}&shop_id=${data.shopId}`
      const rs = await fetchRequest(url, "GET", true)

      if (rs.success) {
        const { result } = rs

        setCouponProducts(result)
      }
    } catch (error) {
      showToast("error fetching products with coupon", "danger", 6000)
      console.log(error)
    }
  }

  const remove = async id => {
    try {
      const url = `/coupons/remove-coupon/?product_id=${id}&coupon_id=${data.id}`

      const rs = await fetchRequest(url, "DELETE", true)

      if (rs.success) {
        showToast("product removed successfully", "success")
        fetchProductsWithCoupon()
      }
    } catch (error) {
      showToast("error removing product", "danger", 6000)
      console.log(error)
    }
  }

  const addToCoupon = async productid => {
    try {
      const url = `/coupons/add-products?coupon_id=${data.id}&product_id=${productid}`

      const rs = await fetchRequest(url, "POST", true)
      if (rs.success) {
        showToast("product added successfully", "success")
        fetchProductsWithCoupon()
        fetchProducts()
        console.log("adding to coupon")
      }
    } catch (error) {
      showToast(error.message || "error adding to coupon", "danger", 6000)
      console.log(error)
    }
  }

  useEffect(() => {
    if (viewProds) {
      fetchProducts()
    }
  }, [viewProds])

  useEffect(() => {
    fetchProductsWithCoupon()
  }, [])

  const handlePageClick = page => {
    setMeta(prev => {
      return {
        ...prev,
        page: page,
      }
    })
    fetchProducts(page)
  }

  return (
    <>
      <Row>
        <RenderToast />
        <Col lg={12}>
          <Card>
            <CardBody>
              <div className="text-sm-end">
                <Button type="button" color="success" className="waves-effect waves-light mb-3 btn btn-success" onClick={tog_large}>
                  <i className="mdi mdi-plus me-1" />
                  Add products
                </Button>
              </div>
              <form
                onSubmit={e => {
                  e.preventDefault()
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
                    {couponProducts?.map((p, i) => (
                      <tr key={i}>
                        <th scope="row">{p.unique_id}</th>
                        <td>{p.product_name}</td>
                        <td>{p.product_price}</td>
                        <td>300</td>
                        <td className="text-danger cursor-pointer">
                          <i className="uil uil-trash-alt font-size-18" onClick={() => remove(p.id)} />
                        </td>
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
              <i className="uil uil-times me-1"></i> Close
            </button>
            {/* <button className="btn btn-success">
              <i className="uil uil-file-alt me-1"></i> Save
            </button> */}
          </div>
        </div>
      </Row>

      <Modal
        size="lg"
        isOpen={viewProds}
        toggle={() => {
          tog_large()
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myLargeModalLabel">
            add products to coupon
          </h5>
          <button
            onClick={() => {
              setViewProds(false)
            }}
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body table-responsive">
          <table className="table table-striped mb-0">
            <tbody>
              {productArray.map((product, i) => (
                <tr key={i}>
                  <th scope="row">{product.unique_id}</th>
                  <td>{product.product_name}</td>
                  <td>{product.product_price}</td>
                  <td>@mdo</td>
                  <td>
                    <a onClick={() => addToCoupon(product.product_id)} className="text-success">
                      <i className="mdi mdi-plus me-1" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {meta && (
          <Row>
            <PaginationTab meta={meta} handlePageClick={handlePageClick} />
          </Row>
        )}
      </Modal>
    </>
  )
}

export default EditCoupon
