export const GetCategoryName = (category_id: number) => {
  let categoryName: string | "" = "";
  if (category_id === 3) {
    categoryName = "Event";
  } else if (category_id === 1) {
    categoryName = "Activity-Package";
  } else if (category_id === 2) {
    categoryName = "News Feed";
  } else if (category_id === 4) {
    categoryName = "Article";
  } else if (category_id === 5) {
    categoryName = "Advertisement";
  } else if (category_id === 6) {
    categoryName = "Outfitter";
  }
  return categoryName;
};
