import React from "react"
import { Col, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap"
import { map } from "lodash"

export const PaginationTab = ({ meta, handlePageClick }) => {
  return (
    <Row className="mt-4">
      <Col sm={6}>
        <div style={{ marginRight: "20px", marginLeft: "20px" }}>
          <p className="mb-sm-0">{`Total ${meta.total} Items`}</p>
        </div>
      </Col>
      <Col sm={6}>
        <div className="float-sm-end">
          <Pagination className="pagination pagination-rounded mb-sm-0">
            <PaginationItem disabled={meta.page === 1}>
              <PaginationLink previous to="#" onClick={() => handlePageClick(meta.page - 1)} />
            </PaginationItem>
            {map(Array(meta.pages), (item, i) => (
              <PaginationItem active={i + 1 === meta.page} key={"_pagination_" + i}>
                <PaginationLink onClick={() => handlePageClick(i + 1)} to="#">
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem disabled={meta.page === meta.pages}>
              <PaginationLink next to="#" onClick={() => handlePageClick(meta.page + 1)} />
            </PaginationItem>
          </Pagination>
        </div>
      </Col>
    </Row>
  )
}
