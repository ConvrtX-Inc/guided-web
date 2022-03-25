import "./PageNotFound.scss";
const PageNotFound = () => {
  return (
    <div className="container">
      <div className="page-wrap d-flex flex-row align-items-center">
        <div className="container div-404">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center">
              <span className="display-1 d-block">404</span>
              <div className="mb-4 lead">
                The page you are looking for was not found.
              </div>
              <button className="btn btn-link btn-bck-2home">
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
