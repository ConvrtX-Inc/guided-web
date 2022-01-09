import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

const MostActive = (props: any) => {
  return props.mostactive.map((mostactive: any) => (
    <Col className="col-sm" key={mostactive.id}>
      <Card className="most-active">
        <Card.Body>
          <div className="text-center">
            <Image className="mb-2 mt-1" src={mostactive.img} alt="" />
            <h4>{mostactive.name}</h4>
            <p>{mostactive.email}</p>
            <p>{mostactive.contactnumber}</p>
          </div>
        </Card.Body>
      </Card>
    </Col>
  ));
};

export default MostActive;
