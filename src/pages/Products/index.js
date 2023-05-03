import React, { useCallback, useEffect, useState } from "react"

import { Button, Card, CardBody, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row, UncontrolledTooltip } from "reactstrap"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"

import { handleError, handleSuccess } from "../../helpers/Notifcation/SweetAlert"

import Breadcrumbs from "../../components/Common/Breadcrumb"
import * as Yup from "yup"
import { useFormik } from "formik"
import { fetchRequest } from "../../helpers/api_helper"
import { useSelector } from "react-redux"
import TableLoading from "../../components/Common/TableLoading"
import { Link } from "react-router-dom"
import { useToast } from "../../helpers/Notifcation/useToast"
import waiting from "../../assets/images/waiting.gif"
import { paginate } from "../../constants/layout"
import { PaginationTab } from "../../components/Common/Pagination"
import DeleteModal from "../../components/Common/DeleteModal"
import moment from "moment"

const ShopProducts = () => {
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [loaded, setLoaded] = useState(true)
  const [ShopProducts, setShopProducts] = useState([])
  const { selectedshop } = useSelector(state => state.ecommerce)
  const [meta, setMeta] = useState({ ...paginate })

  const [productId, setProductId] = useState("")

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
          setMeta(paging)
          setLoaded(false)
        }
      } catch (error) {
        handleError(error.message || "error fetching products")
        setLoaded(false)
      }
    },
    [selectedshop, showToast]
  )

  useEffect(() => {
    if (loaded) {
      fetchProducts()
    }
  }, [])

  const dropProduct = async id => {
    try {
      const url = `/products/delete?id=${productId}`
      const rs = await fetchRequest(url, "DELETE", true)

      if (rs.success) {
        setDeleteModal(false)
        fetchProducts()
        return handleSuccess("Product Deleted successfully ")
      }
    } catch (error) {
      handleError(error.message || "error deleting products")
      setDeleteModal(false)
    }
  }

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
          // showToast("Product created successfully", "success")
          handleSuccess("Product created successfully")
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
    <React.Fragment>
      <DeleteModal show={deleteModal} onDeleteClick={dropProduct} onCloseClick={() => setDeleteModal(false)} />
      <div className="page-content">
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
                                <Td>{moment(product?.createdAt).format("DD-MM-YYYY")}</Td>
                                <Td className="cursor-pointer">
                                  <div className="d-flex gap-3 ">
                                    <Link
                                      to={{
                                        pathname: "/shop-product/edit",
                                        state: { from: "/shop-products", product },
                                      }}
                                    >
                                      <i className="mdi mdi-pencil font-size-18 text-primary" id="edittooltip" />
                                    </Link>
                                    <span>
                                      <i
                                        className="mdi mdi-delete font-size-18 text-danger"
                                        id="deltooltip"
                                        onClick={() => {
                                          setProductId(product.id)
                                          setDeleteModal(true)
                                        }}
                                      />
                                      <UncontrolledTooltip placement="top" target="deltooltip">
                                        Delete
                                      </UncontrolledTooltip>
                                    </span>
                                  </div>
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
              {/* PAgination Starts */}
              {meta && <PaginationTab meta={meta} handlePageClick={handlePageClick} />}
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
                        {submitting ? <img src={waiting} alt="waiting.." /> : "Save Product"}
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ShopProducts
