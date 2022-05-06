import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import EditPostLinks from "../sub-admin/post/EditPostLinks";

const PostItemsAdmin = (props: any) => {
  const displayData = props.items.map((postItem: any) => (
    <tr key={postItem.id}>
      <td className="p-4">
        <Row>
          <Col className="col-4">
            <div className="image-wrapper">
              <img
                className="post-img"
                //src={`${"data:image/png;base64,"}${postItem.snapshot_img}`}
                src={postItem.firebase_snapshot_img}
                alt={postItem.title}
              />
              {postItem.badge_firebase_snapshot_img && (
                <img
                  className="post-img-badge"
                  src={postItem.badge_firebase_snapshot_img}
                  alt={postItem.title}
                />
              )}
            </div>
          </Col>
          <Col>{postItem.title}</Col>
        </Row>
      </td>
      <td className="p-4">{postItem.views}</td>
      <td className="p-4">{String(postItem.created_date).substring(0, 10)}</td>
      <td className="p-4">
        {!postItem.premium_user && "No"}
        {postItem.premium_user && "Yes"}
      </td>
      <td className="p-4">
        <EditPostLinks items={postItem} />
      </td>
    </tr>
  ));
  return (
    <tbody>
      {props.items.length === 0 && (
        <tr>
          <td colSpan={5} className="text-center">
            No data
          </td>
        </tr>
      )}
      {props.items.length > 0 && displayData}
    </tbody>
  );
};

export default PostItemsAdmin;
