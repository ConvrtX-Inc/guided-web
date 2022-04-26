export const PostFormsNavigate = (category: number, categoryName: string) => {
  const stateCategory = {
    category: category,
    categoryName: categoryName,
  };
  let path: string | "" = "";
  if (category === 3) {
    path = "/post/event";
  } else if (category === 1) {
    path = "/post/activity-package";
  } else if (category === 2) {
    path = "/post/newsfeed";
  } else if (category === 4) {
    path = "/post/article";
  } else if (category === 5) {
    path = "/post/advertisement";
  } else if (category === 6) {
    path = "/post/outfitter";
  }
  return {
    path: path,
    stateCategory: stateCategory,
  };
};
