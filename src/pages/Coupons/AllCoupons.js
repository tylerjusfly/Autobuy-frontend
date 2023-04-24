import moment from "moment"
import React, { useState, useEffect, useCallback } from "react"
import { Button, Card, CardBody, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row, Table, UncontrolledTooltip } from "reactstrap"
import TableLoading from "../../components/Common/TableLoading"
import { useSelector } from "react-redux"
import { useToast } from "../../helpers/Notifcation/useToast"
import { fetchRequest } from "../../helpers/api_helper"
import { paginate } from "../../constants/layout"
import * as Yup from "yup"
import { useFormik } from "formik"
import { PaginationTab } from "../../components/Common/Pagination"

import waiting from "../../assets/images/waiting.gif"

const AllCoupons = ({ setShowEditBox }) => {
  const [loading, setLoaded] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [coupons, setCoupons] = useState([])
  const [meta, setMeta] = useState({ ...paginate })
  const { showToast, RenderToast } = useToast()
  const { selectedshop } = useSelector(state => state.ecommerce)

  const [modal, setModal] = useState(false)

  const toggle = useCallback(() => {
    modal ? setModal(false) : setModal(true)
  }, [modal])

  const getAllCoupons = async page => {
    let p = page || 1

    try {
      setLoaded(true)
      const url = `/coupons/find/?page=${p}&limit=10&shop_id=${selectedshop?.id}`

      const rs = await fetchRequest(url, "GET", true)

      if (rs.success) {
        const { result, paging } = rs

        setCoupons(result)
        setMeta(paging)
        setLoaded(false)
      }
    } catch (error) {
      console.log(error)
      setLoaded(false)
      showToast("error fetching coupons", "danger")
    }
  }

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      code: "",
      discount: 0,
      max_use: 1,
    },

    validationSchema: Yup.object({
      code: Yup.string().required("Please enter a coupon code"),
      discount: Yup.number().typeError("discount must be a number").min(1).required("Provide discount").integer(),
      max_use: Yup.number().typeError("max usage must be a number").min(1).required("Provide max usage").integer(),
    }),

    onSubmit: async values => {
      const dataToSend = {
        couponCode: values.code,
        discount: parseInt(values.discount),
        max_use: parseInt(values.max_use, 10),
        shop_id: selectedshop?.id,
      }

      console.log(dataToSend)
      try {
        setSubmitting(true)
        const url = `/coupons/create`
        const rs = await fetchRequest(url, "POST", true, dataToSend)
        if (rs.success) {
          showToast("Coupon created successfully", "success")
          setSubmitting(false)
          getAllCoupons()
        }
      } catch (error) {
        showToast(error.message || "error creating coupon", "danger", 6000)
        setSubmitting(false)
      }
      validation.resetForm()
      toggle()
    },
  })

  const handlePageClick = page => {
    setMeta(prev => {
      return {
        ...prev,
        page: page,
      }
    })
    getAllCoupons(page)
  }

  useEffect(() => {
    if (loading) {
      getAllCoupons()
    }
  }, [])

  return (
    <>
      <RenderToast />
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <div className="text-sm-end">
                <Button type="button" color="success" className="waves-effect waves-light mb-3 btn btn-success" onClick={toggle}>
                  <i className="mdi mdi-plus me-1" />
                  New Coupon
                </Button>
              </div>
              <div className="table-responsive">
                <Table className="table mb-0">
                  <thead>
                    <tr>
                      {/* <th>#</th> */}
                      <th>Date</th>
                      <th>Code</th>
                      <th>Discount</th>
                      <th>Max Use</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <TableLoading />
                    ) : (
                      coupons.map((coupon, i) => (
                        <tr key={i}>
                          {/* <th scope="row">1</th> */}
                          <td>{moment(coupon?.createdAt).format("DD-MM-YYYY h:mmA")}</td>
                          <td>{coupon?.code}</td>
                          <td>{coupon?.discount}</td>
                          <td>{coupon?.max_use}</td>
                          <td className="cursor-pointer">
                            <div className="d-flex gap-3">
                              <span>
                                <i className="mdi mdi-pencil font-size-18" id="edittooltip" onClick={() => setShowEditBox(coupon)} />
                                <UncontrolledTooltip placement="top" target="edittooltip">
                                  Edit
                                </UncontrolledTooltip>
                              </span>
                              <span>
                                <i className="mdi mdi-delete font-size-18" id="deltooltip" />
                                <UncontrolledTooltip placement="top" target="deltooltip">
                                  Delete
                                </UncontrolledTooltip>
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
          <PaginationTab meta={meta} handlePageClick={handlePageClick} />
        </Col>
      </Row>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} tag="h6">
          Add Coupon
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
                  <Label className="form-label">Code</Label>
                  <Input
                    name="code"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.code || ""}
                    invalid={validation.touched.code && validation.errors.code ? true : false}
                  />
                  {validation.touched.code && validation.errors.code ? <FormFeedback type="invalid">{validation.errors.code}</FormFeedback> : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Discount</Label>
                  <Input
                    name="discount"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.discount}
                    invalid={validation.touched.discount && validation.errors.discount ? true : false}
                  />
                  {validation.touched.discount && validation.errors.discount ? <FormFeedback type="invalid">{validation.errors.discount}</FormFeedback> : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Max usage</Label>
                  <Input
                    name="max_use"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.max_use}
                    invalid={validation.touched.max_use && validation.errors.max_use ? true : false}
                  />
                  {validation.touched.max_use && validation.errors.max_use ? <FormFeedback type="invalid">{validation.errors.max_use}</FormFeedback> : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-end">
                  <button type="submit" className="btn btn-success save-user">
                    {submitting ? <img src={waiting} /> : "Save Coupon"}
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </>
  )
}

export default AllCoupons
