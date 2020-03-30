import { flow, types } from 'mobx-state-tree';
import { apiPostWishlist } from '../../utils/api';

export const UNIT_TYPE = {
  pcs: 'PCS',
  dozen: 'LUSIN',
};

const productModel = {
  id: types.string,
  id_category: types.optional(types.string, ''),
  name: types.optional(types.string, ''),
  image: types.optional(types.string, ''),

  description: types.optional(types.string, ''),
  sku: types.optional(types.string, ''),
  javaPrice: types.optional(types.string, ''),
  nonJavaPrice: types.optional(types.string, ''),
  price: types.optional(types.string, ''),
  stock: types.optional(types.string, ''),
  weight: types.optional(types.string, ''),
};

const HomeStoreProductModel = types
  .model('HomeStore_ProductModel', {
    ...productModel,
    images: types.array(
      types.model('HomeStore_ProductModel_ImagesModel', {
        uri: types.optional(types.string, ''),
      }),
    ),
    rate: types.optional(types.number, 0),
    review: types.optional(types.number, 0),
    loading: types.optional(types.boolean, false),
    isWishlist: types.optional(types.boolean, false),
  })
  .actions(self => {
    const fetchWishlist = flow(function*() {
      try {
        self.loading = true;

        // const response = yield apiPostWishlist(self.id);

        // if (response) {
        //   self.isWishlist = true;
        // }
        // return self.isWishlist;
        self.isWishlist = !self.isWishlist;

        console.warn('ok', self.isWishlist);
      } catch (error) {
        return null;
      } finally {
        self.loading = false;
      }
    });

    return {
      fetchWishlist,
    };
  });

const CategoryStoreProductModel = types
  .model('CategoryStore_ProductModel', {
    ...productModel,
    images: types.array(
      types.model('CategoryStore_ProductModel_ImagesModel', {
        uri: types.optional(types.string, ''),
      }),
    ),
    rate: types.optional(types.number, 0),
    review: types.optional(types.number, 0),
    loading: types.optional(types.boolean, false),
    isWishlist: types.optional(types.boolean, false),
    error: types.optional(types.string, ''),
  })
  .actions(self => {
    const fetchWishlist = flow(function*() {
      try {
        // self.loading = true;
        // const response = yield apiPostWishlist(self.id);

        // if (response) {
        //   self.isWishlist = true;
        // }
        // return self.isWishlist;
        self.isWishlist = !self.isWishlist;
      } catch (error) {
        return null;
      } finally {
        self.loading = false;
      }
    });

    return {
      fetchWishlist,
    };
  });

const CartStoreProductModel = types
  .model('CartStore_ProductModel', {
    ...productModel,
    qty: types.optional(types.number, 1),
    unitQty: types.optional(types.number, 1),
    unit: types.optional(types.string, UNIT_TYPE.pcs),
    discount: types.optional(types.string, ''),
  })
  .actions(self => {
    const setQty = value => {
      const incomingQty =
        self.unit === UNIT_TYPE.dozen ? Number(value) * 12 : Number(value);

      if (incomingQty > Number(self.stock)) {
        self.unitQty =
          self.unit === UNIT_TYPE.dozen
            ? Number(Number(self.stock / 12).toFixed())
            : Number(self.stock);

        self.qty =
          self.unit === UNIT_TYPE.dozen ? self.unitQty * 12 : self.unitQty;
      } else {
        self.unitQty = Number(value);
        self.qty = incomingQty;
      }
    };

    const onBlur = () => {
      if (self.unitQty <= 0 || self.unitQty === '' || self.unitQty === null) {
        self.unitQty = 1;
        self.qty =
          self.unit === UNIT_TYPE.dozen ? self.unitQty * 12 : self.unitQty;
      }
    };

    const addition = () => {
      const tempUnitQty = self.unitQty + 1;
      const tempQty =
        self.unit === UNIT_TYPE.dozen ? tempUnitQty * 12 : tempUnitQty;
      if (tempQty < Number(self.stock)) {
        self.unitQty += 1;

        self.qty =
          self.unit === UNIT_TYPE.dozen ? self.unitQty * 12 : self.unitQty;
      } else {
        self.error = `Sisa stok adalah ${self.stock}`;
      }
    };

    const subtraction = () => {
      if (Number(self.qty) > 1) {
        self.unitQty -= 1;

        self.qty =
          self.unit === UNIT_TYPE.dozen ? self.unitQty * 12 : self.unitQty;
      }
    };

    const toggleUnit = () => {
      self.unit =
        self.unit === UNIT_TYPE.dozen ? UNIT_TYPE.qty : UNIT_TYPE.dozen;

      const oldQty =
        self.unit === UNIT_TYPE.dozen ? self.unitQty * 12 : self.unitQty;

      if (oldQty > Number(self.stock)) {
        self.unitQty = Number(Number(self.stock / 12).toFixed());

        self.qty =
          self.unit === UNIT_TYPE.dozen ? self.unitQty * 12 : self.unitQty;
      } else {
        self.qty = oldQty;
      }
    };

    return {
      setQty,
      addition,
      subtraction,
      toggleUnit,
      onBlur,
    };
  });

export {
  productModel,
  HomeStoreProductModel,
  CategoryStoreProductModel,
  CartStoreProductModel,
};
