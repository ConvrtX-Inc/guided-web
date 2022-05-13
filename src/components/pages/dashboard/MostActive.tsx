import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

const MostActive = (props: any) => {
  return props.mostactive.map((mostactive: any) => (
    <Col className="col-3" key={mostactive.id}>
      <Card className="most-active">
        <Card.Body>
          <div className="text-center">
            <Image
              className="mb-2 mt-1"
              style={{ borderRadius: 50 }}
              src={mostactive.profile_photo_firebase_url}
              //alt={mostactive.full_name}
            />
            <h4>{mostactive.full_name}</h4>
            <p>{mostactive.email}</p>
            <p>{mostactive.phone_no}</p>
          </div>
        </Card.Body>
      </Card>
    </Col>
  ));
};

export default MostActive;
