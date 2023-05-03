import React, { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Container, Table, UncontrolledTooltip } from "reactstrap"
import { fetchRequest } from "../../helpers/api_helper"
import { useToast } from "../../helpers/Notifcation/useToast"
import { setSelectedShop } from "../../store/e-commerce/actions"
import { handleError, handleSuccess } from "../../helpers/Notifcation/SweetAlert"

const Dashboard = () => {
  const dispatch = useDispatch()
  const { showToast, RenderToast } = useToast()

  const [shops, setShops] = useState([])
  const [shopCount, setShopCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [openForm, setOpenForm] = useState(false)

  const [shopUser, setShopUser] = useState(JSON.parse(localStorage.getItem("authUser")))

  // form details
  const [shopname, setShopname] = useState("")
  const [description, setDescription] = useState("")

  const fetchShops = useCallback(async () => {
    try {
      setLoading(true)
      const url = `/shops/fetch/?limit=8&deleted=0&username=${shopUser.user.username}`
      const rs = await fetchRequest(url, "GET", false)

      const { rows, count } = rs.result
      setShops(rows)
      setShopCount(count)
      setLoading(false)
    } catch (error) {
      handleError(error.message || "an error occurred while fetching shops")
    }
  }, [shopUser?.user?.username, showToast])

  const onSubmit = async e => {
    e.preventDefault()
    try {
      const values = { name: shopname, description: description }
      const registerUrl = `/shops/create`

      const rs = await fetchRequest(registerUrl, "POST", true, values)
      console.log(rs)
      if (rs.success) {
        handleSuccess("shop created successfully")
        setShopname("")
        setDescription("")
        fetchShops()
      } else {
        handleError(rs.message)
      }
    } catch (error) {
      setLoading(false)
      return handleError(error.message || "an error occurred while creating shop")
    }
  }

  const selectShop = shop => {
    dispatch(setSelectedShop(shop))
  }

  const deleteShop = async id => {
    try {
      const url = `/shops/disable?id=${id}`
      const rs = await fetchRequest(url, "PATCH", true)
      console.log("shop deleted successfully", rs)
      if (rs.success) {
        handleSuccess("shop disabled successfully")
        fetchShops()
      }
    } catch (error) {
      handleError(error.message || "unable to delete shop")
    }
  }

  useEffect(() => {
    if (loading) {
      fetchShops()
    }
  }, [loading])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="row">
            <div className="col-12 col">
              <RenderToast />
              <div className="row">
                <div className="col-lg-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-grid">
                        <button type="button" id="btn-new-event" className="btn font-16 btn-primary btn btn-primary" onClick={() => setOpenForm(!openForm)}>
                          {!openForm ? (
                            <>
                              <i className="mdi mdi-plus-circle-outline me-1"></i>
                              Create New Shop
                            </>
                          ) : (
                            <>
                              <i className="mdi mdi-minus-circle-outline me-1"></i>
                              Close Shop Form
                            </>
                          )}
                        </button>
                      </div>
                      <div className="justify-content-center mt-2 row">
                        {openForm ? (
                          <form className="needs-validation" onSubmit={onSubmit}>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="mb-3 mb-3">
                                  <label htmlFor="validationCustom02" className="form-label">
                                    Shop name
                                  </label>
                                  <input
                                    name="name"
                                    placeholder="name"
                                    id="validationCustom02"
                                    type="text"
                                    className="form-control form-control"
                                    aria-invalid="false"
                                    value={shopname}
                                    onChange={e => setShopname(e.target.value)}
                                  />
                                </div>
                                <div className="mb-3 mb-3">
                                  <label htmlFor="validationCustom02" className="form-label">
                                    Description
                                  </label>
                                  <input
                                    name="description"
                                    placeholder="description"
                                    id="validationCustom02"
                                    type="text"
                                    className="form-control form-control"
                                    aria-invalid="false"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>

                            <button type="submit" className="btn btn-primary">
                              Create Shop
                            </button>
                          </form>
                        ) : (
                          <img src="https://logosandtypes.com/wp-content/uploads/2020/11/Shopify.png" alt="" className="img-fluid d-block" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Another CArd */}
                <div className="col-lg-8">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-6 col-md-4">
                          <h5 className="font-size-16 mb-1 text-truncate">
                            <a className="text-dark" href="/chat">
                              My shops
                            </a>
                          </h5>

                          <p className="text-muted text-truncate mb-0">
                            <i className="bx bx-clinic"></i> {shopCount} shops
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="px-lg-2">
                      <div>
                        <Table className="table-borderless table-centered table-nowrap">
                          {loading ? (
                            <div>loading....</div>
                          ) : (
                            <tbody>
                              {shops.map((shop, i) => (
                                <tr key={i}>
                                  <td>
                                    <h6 className="font-size-15 mb-1 fw-normal">{shop?.name}</h6>
                                    <p className="text-muted font-size-13 mb-0">
                                      <i className="uil-dollar-alt"></i> {shop?.shopcredit} Credit
                                    </p>
                                  </td>
                                  <td>
                                    {shop.deleted ? (
                                      <span className="badge bg-soft-danger font-size-12">Disabled</span>
                                    ) : (
                                      <span className="badge bg-soft-success font-size-12">Active</span>
                                    )}
                                  </td>

                                  <td className="text-danger cursor-pointer">
                                    <i className="uil uil-trash-alt font-size-18" id="deletetooltip" onClick={() => deleteShop(shop.id)} />
                                    <UncontrolledTooltip placement="top" target="deletetooltip">
                                      Delete
                                    </UncontrolledTooltip>
                                  </td>
                                  <td className="text-primary cursor-pointer">
                                    <i className="uil-eye font-size-18" id="viewtooltip" onClick={() => selectShop(shop)}></i>
                                    <UncontrolledTooltip placement="top" target="viewtooltip">
                                      View
                                    </UncontrolledTooltip>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          )}
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
