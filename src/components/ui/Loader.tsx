import "./Loader.scss";
const BlockUI = (props: any) => {
  return (
    <div className="block-ui-container">
      <div className="block-ui-overlay" />
      <div className="block-ui-message-container">
        <div className="block-ui-message">
          <h6>{props.title}</h6>
          <div className="loading-indicator">
            <svg id="indicator" viewBox="0 0 100 100">
              <circle id="circle" cx="50" cy="50" r="45" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlockUI;
