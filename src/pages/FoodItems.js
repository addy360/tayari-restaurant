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
import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaPen } from "react-icons/fa";

export default function FoodItems() {
  const STORY_HEADERS = [
    {
      prop: "menu_name",
      title: "Name",
      isFilterable: true,
      isSortable: true,
    },
    {
      prop: "time_takes_to_make",
      title: "Time",
      isSortable: true,
      isFilterable: true,
    },
    {
      prop: "price",
      title: "Price",
      isSortable: true,
      isFilterable: true,
    },
    {
      prop: "id",
      title: "Actions",
      cell: (row) => (
        <>
          <FaPen
            color="black"
            onClick={() => openDeleteModal(row)}
            className="me-4"
          />
          <FaTrashAlt color="red" onClick={() => openDeleteModal(row)} />
        </>
      ),
    },
  ];

  const [food, setFood] = useState([]);
  const [item, setItem] = useState({});

  useEffect(() => {

    document.body.style.background = '#f7f7f7'

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/menu/place/${localStorage.getItem(
          "place"
        )}`
      )
      .then((res) => setFood(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addbuttonStyle = {
    background: "red",
    padding: "0.3rem 1.8rem",
    color: "white",
    marginLeft: "2rem",
    fontWeight: "700",
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const openDeleteModal = (x) => {
    setItem(x);
    handleShowDeleteModal();
  };

  const handleDelete = () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/menu/delete/${item.id}`,
    }).then(() => {
      handleCloseDeleteModal()
      window.location.reload()
    });
  };

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
          <h4 style={{ fontWeight: "700" }}>Food Items</h4>

          <Link className="btn" to="/addItem" style={addbuttonStyle}>
            Add new
          </Link>
        </div>
        <div className="container">
          <div className="mt-3">
            <DatatableWrapper
              body={food}
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

      {/* Delete food item modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {item.menu_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {item.menu_name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
