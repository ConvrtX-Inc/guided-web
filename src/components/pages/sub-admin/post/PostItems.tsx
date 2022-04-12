import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const PostItems = (props: any) => {
  const displayData = props.items.map((postItem: any) => (
    <tr key={postItem.id}>
      <td className="p-4">
        <Row>
          {/*<Col style={{ backgroundImage: `url(${postItem.img}` }}>*/}
          <Col className="col-4">
            <div className="image-wrapper">
              <img
                className="post-img"
                src={postItem.img}
                alt={postItem.title}
              />
              <img
                className="post-img-badge"
                src={postItem.badge}
                alt={postItem.title}
              />
            </div>
          </Col>
          <Col>{postItem.title}</Col>
        </Row>
      </td>
      <td className="p-4">{postItem.views}</td>
      <td className="p-4">{postItem.created_date}</td>
      <td className="p-4">{postItem.paid}</td>
      <td className="p-4">
        {/*<button type="button" className="btn btn-view-post">
          view post
  </button>*/}
        <Link
          to={`/post/${postItem.id}`}
          state={{
            post: postItem,
          }}
          className="btn btn-view-post"
        >
          view post
        </Link>
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
        <tbody>{displayData}</tbody>
      </Table>
    </Col>
  );
};

export default PostItems;
