import Breadcrumbs from "../../components/Common/Breadcrumb"
import React, { useCallback, useEffect, useState } from "react"
import AllCoupons from "./AllCoupons"
import { Card, CardBody, Col, Modal, Row } from "reactstrap"

import { fetchRequest } from "../../helpers/api_helper"
import EditCoupon from "./EditCoupon"

const CouponHome = () => {
  const [showEditBox, setShowEditBox] = useState(false)
  const [couponData, setCouponData] = useState({})

  const grabCoupondata = data => {
    setShowEditBox(true)
    setCouponData(data)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs breadcrumbItem="Coupons" />
          {!showEditBox && <AllCoupons setShowEditBox={grabCoupondata} />}
          {showEditBox && <EditCoupon data={couponData} />}
        </div>
      </div>
    </React.Fragment>
  )
}

export default CouponHome
