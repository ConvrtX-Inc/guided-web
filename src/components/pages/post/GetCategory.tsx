import { CategoryState } from "../../../shared/interfaces/CategoryState.interface";

export const GetCategory = (category_id: number) => {
  const category = {} as CategoryState;
  category.category = category_id;
  if (category_id === 3) {
    category.categoryName = "Event";
  } else if (category_id === 1) {
    category.categoryName = "Activity-Package";
  } else if (category_id === 2) {
    category.categoryName = "News Feed";
  } else if (category_id === 4) {
    category.categoryName = "Article";
  } else if (category_id === 5) {
    category.categoryName = "Advertisement";
  } else if (category_id === 6) {
    category.categoryName = "Outfitter";
  }
  return category;
};
