import Form from "react-bootstrap/Form";
import { UserAccess } from "../../../shared/interfaces/UserAccess.interface";

const SelectCategoryList = ({
  userAccess,
  categoryType,
  setCategoryType,
  disabled,
}: {
  userAccess: UserAccess;
  categoryType: number;
  setCategoryType: any;
  disabled?: boolean | false;
}) => {
  let categoryList = [] as any[];
  if (userAccess.user_type_name === "SubAdmin") {
    if (userAccess.is_subadmin_others) {
      categoryList = [
        { id: 1, text: "Activity/Package" },
        { id: 3, text: "Event" },
        { id: 4, text: "Article" },
        { id: 2, text: "News Feed" },
        { id: 5, text: "Advertisement" },
        { id: 6, text: "Outfitter" },
      ];
    } else if (userAccess.is_subadmin_nonprofit) {
      categoryList = [
        { id: 1, text: "Activity/Package" },
        { id: 3, text: "Event" },
        { id: 4, text: "Article" },
        { id: 2, text: "News Feed" },
      ];
    } else if (userAccess.is_subadmin_guide) {
      categoryList = [
        { id: 4, text: "Article" },
        { id: 2, text: "News Feed" },
      ];
    }
  } else if (userAccess.user_type_name === "Admin") {
    categoryList = [
      { id: 1, text: "Activity/Package" },
      { id: 3, text: "Event" },
      { id: 4, text: "Article" },
      { id: 2, text: "News Feed" },
      { id: 5, text: "Advertisement" },
      { id: 6, text: "Outfitter" },
    ];
  }
  return (
    <Form.Select
      className="select-category"
      aria-label="Default select example"
      name="post_category_id"
      value={categoryType}
      onChange={setCategoryType}
      disabled={disabled}
    >
      {categoryList.map((item: any) => (
        <option key={item.id} value={item.id}>
          {item.text}
        </option>
      ))}
    </Form.Select>
  );
};
export default SelectCategoryList;
