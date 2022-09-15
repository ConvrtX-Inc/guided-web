import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import left from "../../assets/admin/left2.png";
import right from "../../assets/admin/right.png";
import Navbar from "react-bootstrap/Navbar";

interface Props {
    itemPerPage: number,
    currentPage: number,
    pageCount: number,
    totalItems: number,
    setItemPerPage: (page: number) => any;
    setCurentPage: (page: number) => any;
    [key: string]: any;
}
export const Paginator = (props: Props) => {

    const goToPreviousPage = () => {
        const previousPage: number = props.currentPage - 1;
        if (previousPage > 0) {
            props.setCurentPage(previousPage);
        }
    };

    const goToNextPage = () => {
        const nextPage: number = props.currentPage + 1;
        if (nextPage <= props.pageCount) {
            props.setCurentPage(nextPage);
        }
    };

    return (
        <Navbar className="navigation justify-content-end">
            <Form.Label className="me-2 mt-2">Rows per page:</Form.Label>
            <Col xs={1}>
                <Form.Select className="me-1" as="select" onChange={event => props.setItemPerPage(+event.target.value)}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </Form.Select>
            </Col>
            <Form.Label className="ms-5 mt-2 me-2">
                {props.currentPage} - {props.pageCount} of {props.totalItems}:
            </Form.Label>
            <Button className="btn btn-light me-1" onClick={goToPreviousPage}>
                <Image src={left} alt="" />
            </Button>
            <Button className="btn btn-light me-4">
                <Image src={right} alt="" onClick={goToNextPage}/>
            </Button>
        </Navbar>
    );
}
