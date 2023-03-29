import React, { useState } from "react"
import { Alert, Button, Card, CardBody, Col, Form, FormFeedback, Input, Label, Row } from "reactstrap"
import Select from "react-select"
import { Link, Redirect, useLocation } from "react-router-dom"
import * as Yup from "yup"
import { useFormik } from "formik"
import { fetchRequest } from "../../helpers/api_helper"
import { useToast } from "../../helpers/Notifcation/useToast"

const ProductEdit = ({ location, history }) => {
  const { showToast, RenderToast } = useToast()

  const { from, product } = location.state

  const [coinbaseEnabled, setCoinBaseEnabled] = useState(product?.coinbase_commerce_enabled)
  const [stripeEnabled, setStripeEnabled] = useState(product?.stripe_enabled)
  const [paypalEnabled, setPaypalEnabled] = useState(product?.paypal_enabled)

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      product_id: product?.id,
      product_name: product?.product_name,
      product_price: product?.product_price,
      product_type: product?.product_type,
      stock_count: product?.stock_count,
      description: product?.description,
    },

    validationSchema: Yup.object({
      product_name: Yup.string().required("please enter a product name"),
      product_price: Yup.number().required("please enter a product price"),
      product_type: Yup.string().required("please enter a product type"),
      stock_count: Yup.number().required("please enter a stock count"),
      description: Yup.string().required("please enter a description"),
    }),

    onSubmit: async values => {
      const toBeUpdated = {
        product_name: values.product_name,
        product_price: values.product_price,
        product_type: values.product_type,
        stock_count: values.stock_count,
        description: values.description,
        stripe_enabled: stripeEnabled,
        paypal_enabled: paypalEnabled,
        coinbase_commerce_enabled: coinbaseEnabled,
      }

      /*Url to update data */
      const url = `/products/patch?product_id=${values.product_id}`
      try {
        const rs = await fetchRequest(url, "PATCH", true, toBeUpdated)
        if (rs.success) {
          console.log(rs)
          history.push(from)
        }
      } catch (error) {
        console.log(error)
        window.scrollTo({ top: 0, behavior: "smooth" })
        showToast(error.message || "error updating product", "danger", 6000)
      }
    },
  })

  return (
    <React.Fragment>
      <div className="page-content">
        {/* form design starts */}
        <Row>
          <Col lg="12">
            <RenderToast />
            <div className="text-sm-end">
              <Link to={from} className="text-white">
                <Button type="button" color="danger" className="waves-effect waves-light mb-3 btn btn-danger">
                  <i class="mdi mdi-close-thick"></i>
                </Button>
              </Link>
            </div>
            <Card>
              <CardBody>
                <Form
                  onSubmit={e => {
                    e.preventDefault()
                    validation.handleSubmit()
                    return false
                  }}
                >
                  <Row>
                    <Col xl={6}>
                      <div className="mb-3">
                        <Label>Product ID</Label>
                        <Input type="text" className="colorpicker-default" value={product?.unique_id} readOnly disabled />
                      </div>
                    </Col>
                    <Col xl={6}>
                      <div className="mb-3">
                        <Label>Name</Label>
                        <Input
                          name="product_name"
                          type="text"
                          className="colorpicker-default"
                          value={validation.values.product_name || ""}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={validation.touched.product_name && validation.errors.product_name ? true : false}
                        />
                        {validation.touched.product_name && validation.errors.product_name ? (
                          <FormFeedback type="invalid">{validation.errors.product_name}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl={6}>
                      <div className="mb-3">
                        <Label>Type</Label>
                        <Input
                          name="product_type"
                          type="text"
                          value={validation.values.product_type || ""}
                          placeholder="Enter a product type..."
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={validation.touched.product_type && validation.errors.product_type ? true : false}
                        />
                        {validation.touched.product_type && validation.errors.product_type ? (
                          <FormFeedback type="invalid">{validation.errors.product_type}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col xl={3}>
                      <div className="mb-3">
                        <Label>Price</Label>
                        <Input
                          name="product_price"
                          type="number"
                          value={validation.values.product_price}
                          placeholder="selling price..."
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={validation.touched.product_price && validation.errors.product_price ? true : false}
                        />
                        {validation.touched.product_price && validation.errors.product_price ? (
                          <FormFeedback type="invalid">{validation.errors.product_price}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col xl={3}>
                      <div className="mb-3">
                        <Label>Stock Count</Label>
                        <Input
                          name="stock_count"
                          type="text"
                          value={validation.values.stock_count}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={validation.touched.stock_count && validation.errors.stock_count ? true : false}
                        />
                        {validation.touched.stock_count && validation.errors.stock_count ? (
                          <FormFeedback type="invalid">{validation.errors.stock_count}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl={6}>
                      <div className="mb-3">
                        <Label>Description</Label>
                        <Input
                          name="description"
                          type="textarea"
                          value={validation.values.description}
                          placeholder="Describe your product..."
                          rows="7"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={validation.touched.description && validation.errors.description ? true : false}
                        />
                        {validation.touched.description && validation.errors.description ? (
                          <FormFeedback type="invalid">{validation.errors.description}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col xl={6}>
                      <div className="mb-3">
                        <Label>Products [Seprate your products with comma ',' ]</Label>
                        <Input type="textarea" value="" placeholder="Insert Products Here..." rows="7" />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl={2}>
                      <div className="square-switch">
                        <Label className="">Coinbase Enabled</Label>

                        <input
                          type="checkbox"
                          name="coinbase_commerce_enabled"
                          id="coinbaseEnabled"
                          switch="none"
                          checked={coinbaseEnabled}
                          onClick={() => setCoinBaseEnabled(!coinbaseEnabled)}
                        />
                        <label htmlFor="coinbaseEnabled" data-on-label="On" data-off-label="Off" />
                      </div>
                    </Col>
                    <Col xl={2}>
                      <div className="square-switch">
                        <Label className="">Paypal Enabled</Label>
                        <input
                          type="checkbox"
                          id="paypalEnabled"
                          switch="none"
                          checked={paypalEnabled}
                          onClick={() => {
                            setPaypalEnabled(!paypalEnabled)
                          }}
                        />
                        <label htmlFor="paypalEnabled" data-on-label="On" data-off-label="Off" />
                      </div>
                    </Col>
                    <Col xl={2}>
                      <div className="square-switch">
                        <Label className="">Stripe Enabled</Label>
                        <input
                          type="checkbox"
                          id="stripeEnabled"
                          switch="none"
                          checked={stripeEnabled}
                          onClick={() => {
                            setStripeEnabled(!stripeEnabled)
                          }}
                        />
                        <label htmlFor="stripeEnabled" data-on-label="On" data-off-label="Off" />
                      </div>
                    </Col>
                    <Col>
                      <div className="text-end">
                        <button type="submit" className="btn btn-success save-user">
                          Save Product
                        </button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  )
}

export default ProductEdit
