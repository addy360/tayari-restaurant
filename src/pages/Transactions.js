import React, { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableHeader,
} from "react-bs-datatable";
import { Badge, Col, Row, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import TransactionDrawer from "../components/TransactionDrawer";
import { BsEye, BsEyeFill } from "react-icons/bs";
import { FaPen, FaTrashAlt } from "react-icons/fa";

export default function Transactions() {
  const STORY_HEADERS = [
    {
      prop: "id",
      title: "Order Number",
      isFilterable: true,
      isSortable: true,
    },
    {
      prop: "name",
      title: "Name",
      isSortable: true,
      cell: (row) => row.customer.name,
    },
    {
      prop: "cost",
      title: "Amount",
      isSortable: true,
    },
    {
      prop: "food_count",
      title: "Items",
      isSortable: true,
    },
    {
      prop: "payment_method",
      title: "Method of Payment",
      isSortable: true,
      cell: (row) => row.payment_method == 1 ?  <Badge pill bg="primary">
            Cash
          </Badge> :  <Badge pill bg="dark">
           Mobile
          </Badge>
    },
    {
      prop: "type",
      title: "Type",
      isSortable: true,
      cell: (row) =>
        row.type == 1 ? "Pre-order" : row.type == 2 ? "Dine-in" : "Reservation",
    },
    {
      prop: "payment_status",
      title: "Payment Status",
      isSortable: true,
      cell: (row) =>
        row.payment_status ? (
          <Badge pill bg="success">
            Paid
          </Badge>
        ) : (
          <Badge pill bg="danger">
            Not Paid
          </Badge>
        ),
    },
    {
      prop: "actions",
      title: "Actions",
      cell: (row) => (
        <>
          <TransactionDrawer order={row} />
          {/* <FaPen color="black" className="me-4" />
          <FaTrashAlt color="red" /> */}
        </>
      ),
    },
  ];

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/order/place/${localStorage.getItem(
          "place"
        )}`
      )
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
          <h4 style={{ fontWeight: "700" }}>Transactions</h4>
        </div>
        <div className="container">
          <div className="mt-3">
            <DatatableWrapper
              body={orders}
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
                  <PaginationOptions />
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
