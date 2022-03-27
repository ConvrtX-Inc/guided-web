import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

const PostItems = (props: any) => {
  const displayData = props.items.map((postItem: any) => (
    <tr key={postItem.id}>
      <td>{postItem.title}</td>
      <td>{postItem.views}</td>
      <td>{postItem.created_date}</td>
      <td>{postItem.paid}</td>
      <td>
        <button>view post</button>
      </td>
    </tr>
  ));
  return (
    <Col>
      <Table responsive borderless className="mt-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>Views</th>
            <th>Created Date</th>
            <th>Paid</th>
            <th>Post</th>
          </tr>
        </thead>
        <tbody>{displayData}</tbody>
      </Table>
    </Col>
  );
};

export default PostItems;
