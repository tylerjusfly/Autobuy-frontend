import React, { useCallback, useEffect, useState } from "react"

import { Alert, Button, Card, CardBody, CardTitle, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row, UncontrolledTooltip } from "reactstrap"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"

import Breadcrumbs from "../../components/Common/Breadcrumb"
import * as Yup from "yup"
import { useFormik } from "formik"
import { fetchRequest } from "../../helpers/api_helper"
import { useSelector } from "react-redux"
import TableLoading from "../../components/Common/TableLoading"
import { Link, Redirect } from "react-router-dom"
import ProductEdit from "./ProductEdit"
import { useToast } from "../../helpers/Notifcation/useToast"
import { ScaleLoader } from "react-spinners"

const ShopProducts = () => {
  const [modal, setModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [loaded, setLoaded] = useState(true)
  const [ShopProducts, setShopProducts] = useState([])
  const { selectedshop } = useSelector(state => state.ecommerce)

  const { showToast, RenderToast } = useToast()

  const fetchProducts = useCallback(
    async page => {
      const p = page || 1

      try {
        setLoaded(true)
        const url = `/products/fetch?page=${p}&limit=10&shop_id=${selectedshop?.id}`
        const rs = await fetchRequest(url, "GET", false)

        if (rs.success) {
          const { result, paging } = rs

          setShopProducts(result)
          setLoaded(false)
        }
      } catch (error) {
        showToast(error.message || "error fetching products", "danger", 6000)
        setLoaded(false)
      }
    },
    [selectedshop]
  )

  useEffect(() => {
    if (loaded) {
      fetchProducts()
    }
  }, [])

  console.log(ShopProducts)

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      productname: "",
    },

    validationSchema: Yup.object({
      productname: Yup.string().required("Please Enter A Product Name"),
    }),

    onSubmit: async values => {
      const newProduct = {
        name: values.productname,
        shop_id: selectedshop?.id,
      }

      //Send To backend
      try {
        setSubmitting(true)
        const url = "/products/create"

        const rs = await fetchRequest(url, "POST", true, newProduct)
        if (rs.success) {
          showToast("Product created successfully", "success")
          setSubmitting(false)
          fetchProducts()
        }
      } catch (error) {
        showToast(error.message || "error creating product", "danger", 6000)
        setSubmitting(false)
      }

      validation.resetForm()
      toggle()
    },
  })

  const toggle = useCallback(() => {
    modal ? setModal(false) : setModal(true)
  }, [modal])

  const editToggle = useCallback(() => {
    editModal ? setEditModal(false) : setEditModal(true)
  }, [editModal])

  return (
    <React.Fragment>
      <div className="page-content">
        {/* the end */}
        <div className="container-fluid">
          <Breadcrumbs breadcrumbItem="Products" />
          <RenderToast />

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <div className="text-sm-end">
                    <Button type="button" color="success" className="waves-effect waves-light mb-3 btn btn-success" onClick={toggle}>
                      <i className="mdi mdi-plus me-1" />
                      New Product
                    </Button>
                  </div>

                  {loaded ? (
                    <TableLoading />
                  ) : (
                    <div className="table-rep-plugin">
                      <div className="table-responsive mb-0" data-pattern="priority-columns">
                        <Table id="tech-companies-1" className="table table-striped table-bordered">
                          <Thead>
                            <Tr>
                              <Th>ProductId</Th>
                              <Th data-priority="1">Name</Th>
                              <Th data-priority="3">Price</Th>
                              <Th data-priority="2">Stock</Th>
                              <Th data-priority="6">Created At</Th>
                              <Th data-priority="6">Actions</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {ShopProducts.map((product, i) => (
                              <Tr key={i}>
                                <Th>
                                  <span className="co-name">{product?.unique_id}</span>
                                </Th>
                                <Td>{product?.product_name}</Td>
                                <Td>${product?.product_price}</Td>
                                <Td>{product.stock_count}</Td>
                                <Td>12:12PM</Td>
                                <Td className="text-primary cursor-pointer">
                                  <Link
                                    to={{
                                      pathname: "/shop-product/edit",
                                      state: { from: "/shop-products", product },
                                    }}
                                  >
                                    <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                                  </Link>
                                </Td>
                                <Td>
                                  <span>
                                    <i className="mdi mdi-delete font-size-18" id="deltooltip" onClick={() => showToast("Your custom toast message", "danger")} />
                                    <UncontrolledTooltip placement="top" target="deltooltip">
                                      Delete
                                    </UncontrolledTooltip>
                                  </span>
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* Create Product Modal */}
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} tag="h6">
              {"Add Product"}
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={e => {
                  e.preventDefault()
                  validation.handleSubmit()
                  return false
                }}
              >
                <Row>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Name</Label>
                      <Input
                        name="productname"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.productname || ""}
                        invalid={validation.touched.productname && validation.errors.productname ? true : false}
                      />
                      {validation.touched.productname && validation.errors.productname ? (
                        <FormFeedback type="invalid">{validation.errors.productname}</FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      <button type="submit" className="btn btn-success save-user">
                        {submitting ? <ScaleLoader size={10} /> : "Save Product"}
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>

          {/* EDIT PRODUCT MODAL */}
          <Modal isOpen={editModal} toggle={editToggle}>
            <ModalHeader toggle={editToggle} tag="h6">
              Edit Product
            </ModalHeader>

            <ModalBody>
              <ProductEdit />
            </ModalBody>
          </Modal>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ShopProducts
