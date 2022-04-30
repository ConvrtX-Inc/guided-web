import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import Logs from "./Logs";
import FAQItems from "./FAQItems";

//import "./FAQ.scss";
import GuidelinesService from "../../../services/guidelines/Guidelines.Service";
import Spinner from "../../ui/Spinner";

const FAQ = () => {
  const [data, setData] = useState([]);
  const [isPending, setisPending] = useState(true);

  const loadData = async () => {
    try {
      setisPending(true);
      await GuidelinesService.loadFAQs().then(
        (res) => {
          setData(res);
          setisPending(false);
        },
        (error) => {
          setisPending(false);
        }
      );
    } catch (err) {
      console.log(err);
      setisPending(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();
  };

  const onInputChange = (e: any) => {
    console.log(e.target.value);
  };

  return (
    <Row className="mt-3">
      <Col className="ms-4 me-4 faq-content">
        <Row>
          <Col className="col-8 left-col">
            <p className="mt-4 ms-4">
              How can we help you to improve your service
            </p>
            {!isPending && (
              <Form className="mt-5" onSubmit={(e) => onSubmit(e)}>
                {data.map((faqItem: any, index) => (
                  <Row key={faqItem.id} className="mb-3">
                    <Col>
                      <FAQItems
                        inputChange={onInputChange}
                        seq={index}
                        items={faqItem}
                      />
                    </Col>
                  </Row>
                ))}
                <Row className="ps-4">
                  <Col className="mt-4">
                    <Button type="submit" className="btn btn-primary btn-save">
                      Save
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
            {isPending && <Spinner />}
          </Col>
          <Logs items={data} />
        </Row>
      </Col>
    </Row>
  );
};

export default FAQ;
