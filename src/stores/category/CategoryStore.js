import { flow, types } from 'mobx-state-tree';
import { apiGetProductsByCategoryId } from '../../utils/api';
import {
  productManagement,
  productSortManagement,
} from '../../utils/dataManagement';
import { CategoryStoreProductModel } from '../models/ProductModel';
import * as _ from 'lodash';

const Category = types
  .model('CategoryStore', {
    products: types.array(CategoryStoreProductModel),

    loading: types.optional(types.boolean, false),
  })
  .actions(self => {
    const clearStore = () => {
      self.products.clear();

      self.loading = false;
    };

    const setProducts = data => {
      self.products.clear();
      // console.log(data);

      const products = productManagement(data);

      if (products.length) {
        const productSort = _.orderBy(products, ['name'], ['asc']);

        for (const product of productSort) {
          self.products.push(product);
        }
      }
    };
    const toggleSortName = isSortAsc => {
      const productSort = _.orderBy(
        productSortManagement(self.products),
        ['name'],
        [isSortAsc ? 'asc' : 'desc'],
      );

      self.products.clear();

      for (const product of productSort) {
        self.products.push(product);
      }
    };

    const toggleSortPrice = isSortLowestPrice => {
      const productSort = _.orderBy(
        productSortManagement(self.products),
        ['price'],
        [isSortLowestPrice ? 'asc' : 'desc'],
      );

      self.products.clear();

      for (const product of productSort) {
        self.products.push(product);
      }
    };

    const setProductsSort = products => {
      self.products.clear();

      if (products.length) {
        for (const product of products) {
          self.products.push(product);
        }
      }
    };

    const fetchProductsByCategory = flow(function*(categoryId) {
      try {
        self.loading = true;
        const response = yield apiGetProductsByCategoryId(categoryId);

        if (response.data.length) {
          setProducts(response.data);
        }
      } catch (error) {
        return null;
      } finally {
        self.loading = false;
      }
    });

    return {
      clearStore,
      setProducts,
      setProductsSort,
      fetchProductsByCategory,
      toggleSortName,
      toggleSortPrice,
    };
  });

const CategoryStore = Category.create({
  products: [],

  loading: false,
});

export default CategoryStore;
