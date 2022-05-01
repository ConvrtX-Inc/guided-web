import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import EditPostLinks from "../sub-admin/post/EditPostLinks";
//import { format, parse } from "date-fns";

const PostItemsAdmin = (props: any) => {
  //console.log(props.items);
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
              {postItem.activityBadge && (
                <img
                  className="post-img-badge"
                  src={`${"data:image/png;base64,"}${
                    postItem.activityBadge.img_icon
                  }`}
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
        {/*<Link
          to={`/post/${postItem.id}`}
          state={{
            post: postItem,
          }}
          className="btn btn-view-post"
        >
          view post
        </Link>*/}
        <EditPostLinks items={postItem} />
      </td>
    </tr>
  ));
  return (
    <Col>
      <Table responsive borderless className="mt-4 post-table">
        <thead>
          <tr>
            <th className="col-4 p-4">Title</th>
            <th className="p-4">Views</th>
            <th className="p-4">Created Date</th>
            <th className="p-4">Paid</th>
            <th className="p-4">Post</th>
          </tr>
        </thead>
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
      </Table>
    </Col>
  );
};

export default PostItemsAdmin;
