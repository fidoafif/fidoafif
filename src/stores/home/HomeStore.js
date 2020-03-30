import { flow, types } from 'mobx-state-tree';
import { apiBanner, apiGetCategories, apiGetProducts } from '../../utils/api';
import { productManagement } from '../../utils/dataManagement';
import { HomeStoreCategoryModel } from '../models/CategoryModel';
import { HomeStoreProductModel } from '../models/ProductModel';

const Home = types
  .model('HomeStore', {
    categories: types.array(HomeStoreCategoryModel),
    products: types.array(HomeStoreProductModel),

    loading: types.optional(types.boolean, false),
  })
  .actions(self => {
    const clearStore = () => {
      self.categories.clear();
      self.products.clear();

      self.loading = false;
    };

    const setCategories = data => {
      self.categories.clear();

      for (const category of data) {
        self.categories.push({
          id: category.id_category,
          name: category.name,
          image: category.image.length ? category.image[0] : '',
        });
      }
    };
    const setProducts = data => {
      self.products.clear();

      const products = productManagement(data);

      if (products.length) {
        for (const product of products) {
          self.products.push(product);
        }
      }
    };

    const fetchCategories = flow(function*() {
      try {
        self.loading = true;
        const response = yield apiGetCategories();

        if (response.data.length) {
          setCategories(response.data);
        }
      } catch (error) {
        return null;
      } finally {
        self.loading = false;
      }
    });

    const fetchProducts = flow(function*() {
      try {
        self.loading = true;
        const response = yield apiGetProducts();
        // console.log(response);
        if (response.data.length) {
          setProducts(response.data);
        }
      } catch (error) {
        return null;
      } finally {
        self.loading = false;
      }
    });

    const fetchBanner = flow(function*() {
      try {
        self.loading = true;
        const response = yield apiBanner();

        if (response.data) {
          return response.data;
        }
      } catch (error) {
        return null;
      } finally {
        self.loading = false;
      }
    });

    return {
      clearStore,
      fetchBanner,
      fetchCategories,
      fetchProducts,
    };
  });

const HomeStore = Home.create({
  categories: [],
  products: [],

  loading: false,
});

export default HomeStore;
