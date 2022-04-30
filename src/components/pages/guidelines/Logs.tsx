import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";
import GuidelinesService from "../../../services/guidelines/Guidelines.Service";
//import "./Logs.scss";
import { useEffect, useState } from "react";

const Logs = (props: any) => {
  const [isExist, setisExist] = useState(false);
  const [isPending, setisPending] = useState(false);
  const [data, setData] = useState([] as any[]);

  const loadData = async () => {
    try {
      setisPending(true);
      await GuidelinesService.loadLogs().then(
        (res) => {
          if (res.length > 0) {
            setData(res);
            setisExist(true);
          } else {
            setisExist(false);
          }
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

  const displayData = data.map((item: any) => {
    if (item.type_name === 'FAQ') {
      const faq_date = props.items.updated_date === 'FAQ'
        ? props.items.updated_data
        : item.updated_data;

      return (<Row key={item.id}>
        <Col>
          <p className="p-dates">{moment(faq_date).format("MM/DD/Y")}</p>
          <p className="p-desc">FAQ</p>
          <hr />
        </Col>
      </Row>
      )
    }
    if (item.type_name === 'Terms & Conditions') {
      const tnc_date = props.items.updated_date === 'Terms & Conditions'
        ? props.items.updated_data
        : item.updated_data;

      return (<Row key={item.id}>
        <Col>
          <p className="p-dates">{moment(tnc_date).format("MM/DD/Y")}</p>
          <p className="p-desc">Terms & Conditions</p>
          <hr />
        </Col>
      </Row>
      )
    }
    if (item.type_name === 'Traveler Release & Waiver Form') {
      const trwf_date = props.items.updated_date === 'Traveler Release & Waiver Form'
        ? props.items.updated_data
        : item.updated_data;

      return (<Row key={item.id}>
        <Col>
          <p className="p-dates">{moment(trwf_date).format("MM/DD/Y")}</p>
          <p className="p-desc">Traveler Release & Waiver Form</p>
          <hr />
        </Col>
      </Row>
      )
    }
    if (item.type_name === 'Cancellation Policy') {
      const cancellation_date = props.items.updated_date === 'Cancellation Policy'
        ? props.items.updated_data
        : item.updated_data;

      return (<Row key={item.id}>
        <Col>
          <p className="p-dates">{moment(cancellation_date).format("MM/DD/Y")}</p>
          <p className="p-desc">Cancellation Policy</p>
          <hr />
        </Col>
      </Row>
      )
    }
    if (item.type_name === 'Guided Payment') {
      const gp_date = props.items.updated_date === 'Guided Payment'
        ? props.items.updated_data
        : item.updated_data;

      return (<Row key={item.id}>
        <Col>
          <p className="p-dates">{moment(gp_date).format("MM/DD/Y")}</p>
          <p className="p-desc">GuidED Payment & Payout Terms</p>
          <hr />
        </Col>
      </Row>
      )
    }
    if (item.type_name === 'Local Laws') {
      const local_law_date = props.items.updated_date === 'Local Laws'
        ? props.items.updated_data
        : item.updated_data;

      return (<Row key={item.id}>
        <Col>
          <p className="p-dates">{moment(local_law_date).format("MM/DD/Y")}</p>
          <p className="p-desc">Local Laws</p>
          <hr />
        </Col>
      </Row>
      )
    }
  });

  return (
    <Col className="ps-4 pe-4 col-logs" >
      <Row className="mt-5" >
        <Row>
          <Col>
            <h2>{moment(props.items.updated_date).format("MMMM DD Y")}</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <h6>Update Logs</h6>
            <hr />
          </Col>
        </Row>
        {displayData}
      </Row>
    </Col >
  );
};

export default Logs;
