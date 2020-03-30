import AuthStore from '../stores/auth/AuthStore';
import RegisterAgentStore from '../stores/auth/RegisterAgentStore';
import RegisterResellerStore from '../stores/auth/RegisterResellerStore';
import RegisterStore from '../stores/auth/RegisterStore';
import UserStore from '../stores/auth/user/UserStore';
import CartStore from '../stores/cart/CartStore';
import CategoryStore from '../stores/category/CategoryStore';
import HomeStore from '../stores/home/HomeStore';
import AddProductStore from '../stores/product/AddProductStore';
import EditProductStore from '../stores/product/EditProductStore';
import ProductStore from '../stores/product/ProductStore';
import AddSalesStore from '../stores/sales/AddSalesStore';
import SalesAgentStore from '../stores/sales/SalesAgent';

const configStore = () => {
  const authStore = AuthStore;
  const userStore = UserStore;
  const salesAgentStore = SalesAgentStore;
  const registerStore = RegisterStore;
  const registerAgentStore = RegisterAgentStore;
  const registerResellerStore = RegisterResellerStore;

  const homeStore = HomeStore;
  const categoryStore = CategoryStore;
  const productStore = ProductStore;
  const cartStore = CartStore;

  const addSalesStore = AddSalesStore;

  const addProductStore = AddProductStore;
  const editProductStore = EditProductStore;
  return {
    authStore,
    userStore,
    salesAgentStore,
    registerStore,
    registerAgentStore,
    registerResellerStore,
    homeStore,
    categoryStore,
    productStore,
    cartStore,
    addSalesStore,
    addProductStore,
    editProductStore,
  };
};

export default configStore;
