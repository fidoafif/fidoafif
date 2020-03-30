import { types } from "mobx-state-tree";

const categoryModel = {
  id: types.identifier,
  name: types.optional(types.string, ""),
  image: types.optional(types.string, "")
};

const HomeStoreCategoryModel = types.model("HomeStore_CategoryModel", {
  ...categoryModel
});

export { HomeStoreCategoryModel };
