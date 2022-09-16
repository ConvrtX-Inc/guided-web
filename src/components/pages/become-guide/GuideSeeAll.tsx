import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { useEffect, useState } from "react";

import ApplicationItem from "./ApplicationItem";

import right from "../../../assets/admin/right.png";
import left from "../../../assets/admin/left2.png";

import UserGuideRequestService from "../../../services/user-guide-request/UserGuideRequest.Service";
import {Paginator} from "../../helper/Paginator";

// TODO: remove soon its use for testing
// const DUMMY_DATA = [
//   {
//     id: 1,
//     name: "Mark Chen",
//     email: "mark@gmail.com",
//     contactnumber: " +1 467 474 9303",
//     img: user2,
//   },
//   {
//     id: 2,
//     name: "John Kristen",
//     email: "johngmail.com",
//     contactnumber: "+1 267 474 9323",
//     img: user2,
//   },
//   {
//     id: 3,
//     name: "Rayan Artecona",
//     email: "rayangmail.com",
//     contactnumber: "+1 437 474 9222",
//     img: user2,
//   },
//   {
//     id: 4,
//     name: "Mark Chen",
//     email: "mark@gmail.com",
//     contactnumber: "+1 698 474 9100",
//     img: user2,
//   },
//   {
//     id: 5,
//     name: "Mark Chen",
//     email: "mark@gmail.com",
//     contactnumber: "+1 698 474 9100",
//     img: user2,
//   },
//   {
//     id: 6,
//     name: "Mark Chen",
//     email: "mark@gmail.com",
//     contactnumber: "+1 698 474 9100",
//     img: user2,
//   },
//   {
//     id: 7,
//     name: "Mark Chen",
//     email: "mark@gmail.com",
//     contactnumber: "+1 698 474 9100",
//     img: user2,
//   },
//   {
//     id: 8,
//     name: "Mark Chen",
//     email: "mark@gmail.com",
//     contactnumber: "+1 698 474 9100",
//     img: user2,
//   },
// ];

const GuideSeeAll = () => {
  const [postData, setPostData] = useState([] as any[]);

    const [itemPerPage, setItemPerPage] = useState(5);
    const [currentPage, setCurentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    const loadUserGuideRequest = async () => {
    try {
      await UserGuideRequestService.getData(
          itemPerPage,
          currentPage
      ).then(
        (res) => {
          setPostData(res.data.data);
          setTotalItems(res.data.total);
          setPageCount(res.data.pageCount);
          },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadUserGuideRequest();
  }, [itemPerPage, currentPage]);

  return (
    <Col>
      <Table responsive borderless className="mt-4 post-table">
       <thead>
          <tr>
            <th className="ps-4">Application Name</th>
            <th className="ps-4">Email</th>
            <th className="ps-4">Contact Number</th>
            <th className="ps-4">Application</th>
            <th className="ps-4">Action</th>
          </tr>
        </thead>
        <tbody>
          <ApplicationItem application={postData} />
        </tbody>
      </Table>
        <Paginator
            itemPerPage={itemPerPage}
            currentPage={currentPage}
            pageCount={pageCount}
            totalItems={totalItems}
            setItemPerPage={setItemPerPage}
            setCurentPage={setCurentPage}
        />
    </Col>
  );
};

export default GuideSeeAll;
