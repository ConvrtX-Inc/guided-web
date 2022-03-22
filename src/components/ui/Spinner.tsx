const Spinner = () => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
