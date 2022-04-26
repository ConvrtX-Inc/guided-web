import { Link } from "react-router-dom";

const EditPostLinks = (props: any) => {
  const postData = props.items;
  let path: string | "" = "";
  if (postData.category_type === 3) {
    path = "/post/edit-event";
  } else if (postData.category_type === 1) {
    path = "/post/edit-activity-package";
  } else if (postData.category_type === 2) {
    path = "/post/edit-newsfeed";
  } else if (postData.category_type === 4) {
    path = "/post/edit-article";
  } else if (postData.category_type === 5) {
    path = "/post/edit-advertisement";
  } else if (postData.category_type === 6) {
    path = "/post/edit-outfitter";
  }
  return (
    <Link
      to={`${path}/${postData.id}`}
      state={{
        category: postData.category_type,
        post_id: postData.post_id,
      }}
      className="btn btn-view-post"
    >
      view post
    </Link>
  );
};
export default EditPostLinks;
