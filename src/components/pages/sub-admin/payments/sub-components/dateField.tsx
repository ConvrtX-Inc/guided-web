import Form from "react-bootstrap/Form";

interface IDateField {
  placeholder: string;
  name: string;
};

const dateField = ({ placeholder, name } : IDateField) => {
  return (
    <div className='inline-display'>
      <Form.Control
        required
        type="date"
        className="input-date guided-sub-payment-date"
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
};

export default dateField;
