import { destroy, flow, types } from 'mobx-state-tree';
import AsyncStorage from '@react-native-community/async-storage';
import { productCartManagement } from '../../utils/dataManagement';
import { CartStoreProductModel } from '../models/ProductModel';
import { apiGetProductById } from '../../utils/api';

const LAURENT_CATEGORY_ID = '25';
const Cart = types
  .model('CartItemList', {
    products: types.array(CartStoreProductModel),
    totalItems: types.optional(types.number, 0),
    totalPrice: types.optional(types.number, 0),

    loading: types.optional(types.boolean, false),
  })
  .actions(self => {
    const clearStore = () => {
      self.products.clear();
      self.totalItems = 0;

      self.loading = false;
    };

    const validatingData = () => {
      for (const product of self.products) {
        product.onBlur();
      }
      setTotalItems();
    };

    const useAgentPrice = agent => {
      for (const product of self.products) {
        if (
          agent.price_option === '0' &&
          product.id_category === LAURENT_CATEGORY_ID
        ) {
          const price = product.javaPrice;
          const discPrice = discountPrice(agent.laurent, price);

          if (Number(discPrice) > 0) {
            product.price = discPrice + '';
          }
        } else if (
          agent.price_option === '0' &&
          product.id_category !== LAURENT_CATEGORY_ID
        ) {
          const price = product.javaPrice;
          const discPrice = discountPrice(agent.none_laurent, price);

          if (Number(discPrice) > 0) {
            product.price = discPrice + '';
          }
        } else if (
          agent.price_option !== '0' &&
          product.id_category === LAURENT_CATEGORY_ID
        ) {
          const price = product.nonJavaPrice;
          const discPrice = discountPrice(agent.laurent, price);

          if (Number(discPrice) > 0) {
            product.price = discPrice + '';
          }
        } else {
          const price = product.nonJavaPrice;
          const discPrice = discountPrice(agent.none_laurent, price);

          if (Number(discPrice) > 0) {
            product.price = discPrice + '';
          }
        }
      }
      setTotalItems();
    };

    const validateDiscount = flow(function*() {
      for (const product of self.products) {
        const detailProduct = yield fetchProductsById(product.id);

        product.discount =
          detailProduct && detailProduct.promo ? detailProduct.promo : '0';
        if (Number(product.discount) > 0) {
          const discPrice = (product.price * product.discount) / 100;
          product.price = product.price - discPrice;
        }
      }
      setTotalItems();
    });

    const fetchProductsById = flow(function*(productId) {
      try {
        self.loading = true;
        const response = yield apiGetProductById(productId);

        return response.data;
      } catch (error) {
        return null;
      } finally {
        self.loading = false;
      }
    });

    const discountPrice = (data, price) => {
      const params = data.split('+');
      let finalPrice = Number(price);
      if (params && params.length) {
        params.forEach(value => {
          const discPrice = (Number(value) / 100) * finalPrice;

          finalPrice = finalPrice - discPrice;
        });
      }

      return finalPrice.toFixed(0);
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
      setTotalItems();
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
      setTotalItems();
    };

    const removeAll = () => {
      self.products.clear();

      saveItems();
      setTotalItems();
    };

    const setTotalItems = () => {
      // let totalItems = 0;
      // _.forEach(self.products, product => {
      //   if (product.checked) {
      //     totalItems += product.qty;
      //   }
      // });
      self.totalItems = 0;
      self.totalItems = Number(self.products.length);
      if (self.totalItems) {
        countTotalPrice();
      }
    };

    const countTotalPrice = () => {
      self.totalPrice = 0;
      for (const product of self.products) {
        const qty = Number(product.qty);
        const price = Number(product.price);

        const total = qty * price;
        self.totalPrice += total;
      }
    };

    const saveItems = flow(function*() {
      // const user = await getUser();
      // await saveProduct(user.id, self.products);
      yield AsyncStorage.setItem('USERKEY', JSON.stringify(self.products));
    });

    const getProductFromAsyncStorage = flow(function*() {
      // const user = await getUser();
      const response = yield AsyncStorage.getItem('USERKEY');

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

        setTotalItems();
      }
    };

    return {
      clearStore,

      addProduct,
      removeProduct,
      removeAll,
      saveItems,
      setTotalItems,
      countTotalPrice,
      useAgentPrice,
      validatingData,
      validateDiscount,

      getProductFromAsyncStorage,
    };
  });

const CartStore = Cart.create({
  totalItems: 0,
});

export default CartStore;
