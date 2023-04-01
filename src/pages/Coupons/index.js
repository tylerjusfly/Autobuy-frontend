import Breadcrumbs from "../../components/Common/Breadcrumb"
import React, { useCallback, useEffect, useState } from "react"
import AllCoupons from "./AllCoupons"
import { Card, CardBody, Col, Modal, Row } from "reactstrap"

import { fetchRequest } from "../../helpers/api_helper"

const CouponHome = () => {
  const [showEditBox, setShowEditBox] = useState(false)

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs breadcrumbItem="Coupons" />

          <AllCoupons />
        </div>
      </div>
    </React.Fragment>
  )
}

export default CouponHome
