import React, { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import { BsStarFill } from "react-icons/bs";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableHeader,
} from "react-bs-datatable";
import { Col, Row, Table } from "react-bootstrap";
import meanBy from "lodash/meanBy";
import axios from "axios";
import moment from "moment";

export default function Reviews() {
  const STORY_HEADERS = [
    {
      prop: "rating",
      title: "Ratings",
      isSortable: true,
      cell: (row) => (
        <>
          {row.rating} <BsStarFill color="red" />
        </>
      ),
    },
    {
      prop: "name",
      title: "Name",
      isFilterable: true,
      isSortable: true,
    },
    {
      prop: "content",
      title: "Reviews",
      isSortable: true,
      isFilterable: true,
    },
    {
      prop: "date",
      title: "Reviewed On",
      isSortable: true,
      isFilterable: true,
      cell: (row) => moment(row.date).format("MMMM Do YYYY, h:mm:ss a"),
    },
  ];

  const [reviews, setReviews] = useState([]);

  useEffect(() => {

    document.body.style.backgroundColor = '#f7f7f7'

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/review/place/${localStorage.getItem(
          "place"
        )}`
      )
      .then((res) => {
        console.log(res.data);
        setReviews(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <NavigationBar />
      <div
        className="container-fluid"
        style={{
          padding: "2rem 0 0 0",
        }}
      >
        <div className="d-flex flex-row justify-content-start">
          <div
            className="bg-danger me-3 mt-2"
            style={{ width: "1rem", height: "1rem" }}
          >
            {" "}
          </div>
          <h4 style={{ fontWeight: "700" }}>
            Reviews &nbsp;{" "}
            {reviews.length > 9 ? meanBy(reviews, "rating") : "4.0"}
          </h4>

          <BsStarFill color="red" className="ms-2" size="28px" />
        </div>
        <div className="container">
          <div className="mt-3">
            <DatatableWrapper
              body={reviews}
              headers={STORY_HEADERS}
              paginationOptionsProps={{
                initialState: {
                  rowsPerPage: 10,
                  options: [5, 10, 15, 20],
                },
              }}
            >
              <Row className="mb-4 p-2">
                <Col
                  xs={12}
                  lg={4}
                  className="d-flex flex-col justify-content-end align-items-end"
                >
                  <Filter classes={{ clearButton: "btn-danger" }} />
                </Col>
                <Col
                  xs={12}
                  sm={6}
                  lg={4}
                  className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
                >
                  <PaginationOptions alwaysShowPagination="true" />
                </Col>
                <Col
                  xs={12}
                  sm={6}
                  lg={4}
                  className="d-flex flex-col justify-content-end align-items-end"
                >
                  <Pagination classes={{ button: "btn-danger" }} />
                </Col>
              </Row>
              <Table>
                <TableHeader />
                <TableBody />
              </Table>
            </DatatableWrapper>
          </div>
        </div>
      </div>
    </>
  );
}
