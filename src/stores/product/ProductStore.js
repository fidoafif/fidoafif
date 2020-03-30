import { flow, types } from "mobx-state-tree";
import { apiGetProductById } from "../../utils/api";
import { productModel } from "../models/ProductModel";

const Product = types
  .model("ProductStore", {
    ...productModel,
    images: types.array(
      types.model("ProductStore_ProductModel_ImagesModel", {
        uri: types.optional(types.string, "")
      })
    ),

    loading: types.optional(types.boolean, false)
  })
  .actions(self => {
    const clearStore = () => {
      self.loading = false;
    };

    const setProduct = data => {
      self.id = data.id_product;
      self.id_category = data.id_category;
      self.name = data.name;
      self.description = data.description;
      self.sku = data.sku;
      self.stock = data.stock;
      self.price = data.price;
      self.weight = data.weight;
      self.image = data.images.substring(1);
    };

    const fetchProductsById = flow(function*(productId) {
      try {
        self.loading = true;
        const response = yield apiGetProductById(productId);

        return response.data;
        // if (response.data) setProduct(response.data);
      } catch (error) {
        return null;
      } finally {
        self.loading = false;
      }
    });

    return {
      clearStore,

      setProduct,
      fetchProductsById
    };
  });

const ProductStore = Product.create({
  id: "",
  loading: false
});

export default ProductStore;
