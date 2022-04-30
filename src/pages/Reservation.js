import React, { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import axios from 'axios'
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableHeader,
} from "react-bs-datatable";
import { Col, Row, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import BookingDrawer from "../components/BookingDrawer";

export default function Reservation() {
  const STORY_HEADERS = [
    {
      prop: "name",
      title: "Name",
      isFilterable: true,
      isSortable: true,
    },
    {
      prop: "username",
      title: "Username",
      isSortable: true,
    },
    {
      prop: "location",
      title: "Location",
      isSortable: true,
    },
    {
      prop: "date",
      title: "Last Update",
      isSortable: true,
    },
    {
      prop: "score",
      title: "Score",
      isSortable: true,
    },
  ];

  const [reservation, setReservation] = useState([])

  useEffect(() => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios.get(`${process.env.REACT_APP_API_URL}/reservation/place/${localStorage.getItem('place')}`)
      .then((res) => setReservation(res.data))
      .catch((err) => console.log(err))
  },[])

  return (
    <>
      <NavigationBar />
      <div
        className="container-fluid"
        style={{
          background: "#f7f7f7",
          height: "100vh",
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
          <h4 style={{ fontWeight: "700" }}>Reservation</h4>
          <BookingDrawer/>
        </div>
        <div className="container">
          <div className="mt-3">
            <DatatableWrapper
              body={reservation}
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
                  <Filter classes={{clearButton: 'btn-danger'}} />
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
                  <Pagination classes={{ button: 'btn-danger' }} />
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