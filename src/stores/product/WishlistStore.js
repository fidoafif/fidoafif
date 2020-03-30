import { destroy, flow, types } from 'mobx-state-tree';
import AsyncStorage from '@react-native-community/async-storage';
import { productCartManagement } from '../../utils/dataManagement';
import { CartStoreProductModel } from '../models/ProductModel';

const Wishlist = types
  .model('WishlistItemList', {
    products: types.array(CartStoreProductModel),

    loading: types.optional(types.boolean, false),
  })
  .actions(self => {
    const clearStore = () => {
      self.products.clear();

      self.loading = false;
    };

    const addProduct = async item => {
      const productIndex = self.products.findIndex(product => {
        return product.id === item.id;
      });

      if (productIndex === -1) {
        const destructItem = productCartManagement(item);
        // console.log(destructItem);
        self.products.push(destructItem);
      } else {
        const destructItem = productCartManagement(item);
        self.products.splice(productIndex, 1, destructItem);
      }

      saveItems();
    };

    const removeProduct = async (product, productId) => {
      if (productId) {
        const productIndex = self.products.findIndex(dataProduct => {
          return dataProduct.id === product.id;
        });

        if (productIndex !== -1) {
          self.products.splice(productIndex, 1);
        }
      } else {
        destroy(product);
      }

      saveItems();
    };

    const removeAll = () => {
      self.products.clear();

      saveItems();
    };

    const saveItems = flow(function*() {
      yield AsyncStorage.setItem(
        'USERKEY@WISHLIST',
        JSON.stringify(self.products),
      );
    });

    const getProductFromAsyncStorage = flow(function*() {
      const response = yield AsyncStorage.getItem('USERKEY@WISHLIST');

      if (response) {
        const productJSON = JSON.parse(response);

        addFromStorage(productJSON);
      }
    });

    const addFromStorage = data => {
      if (data.length) {
        for (const item of data) {
          const productIndex = self.products.findIndex(product => {
            return product.id === item.id;
          });

          if (productIndex === -1) {
            self.products.push(item);
          } else {
            self.products.splice(productIndex, 1);
            self.products.push(item);
          }
        }
      }
    };

    return {
      clearStore,

      addProduct,
      removeProduct,
      removeAll,
      saveItems,

      getProductFromAsyncStorage,
    };
  });

const WishlistStore = Wishlist.create({});

export default WishlistStore;
