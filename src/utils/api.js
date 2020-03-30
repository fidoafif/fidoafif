import axios from 'axios';
import {
  API_ADDRESS,
  API_AGENT,
  API_AGENT_META,
  API_BANNER,
  API_BECOME_AGENT,
  API_CATEGORIES,
  API_CITY,
  API_DELETE_PROMO,
  API_DELIVERY,
  API_DETAIL_PROMO,
  API_DETAIL_TRANSACTION,
  API_DISTRICT,
  API_EDIT_PROMO,
  API_FCM,
  API_GET_BECOME_AGENT,
  API_GET_CITY,
  API_LOGIN,
  API_PRODUCT_BY_ID,
  API_PRODUCTS,
  API_PRODUCTS_BY_CATEGORY_ID,
  API_PROFILE,
  API_PROFILE_EDIT,
  API_PROMO,
  API_PROVINCE,
  API_REGISTER,
  API_SALES,
  API_TRANSACTION,
  API_UPDATE_TRANSACTION,
  API_VERIFY_TRANSFER,
  API_WISHLIST,
  BASE_URL,
  API_DASHBOARD,
  API_SEARCH_PRODUCT,
  API_TRACKING,
  API_EDIT_DISCOUNT,
  API_DISCOUNT,
  API_DETAIL_DISCOUNT,
  API_FORGOT_PASSWORD,
} from '../config';
import { getUserData } from './authentication';

// Post Login
const apiLogin = async (phone, password) => {
  const response = await axios.post(`${BASE_URL}${API_LOGIN}`, {
    phone,
    password,
  });

  const JSONResponse = JSON.parse(JSON.stringify(response));

  return JSONResponse;
};

// Post Register
const apiRegister = async (name, phone, email, password) => {
  const response = await axios.post(`${BASE_URL}${API_REGISTER}`, {
    name,
    phone,
    email,
    password,
  });

  const JSONResponse = JSON.parse(JSON.stringify(response));

  return JSONResponse;
};

// Post Register
const apiForgotPassword = async email => {
  const response = await axios.post(`${BASE_URL}${API_FORGOT_PASSWORD}`, {
    email,
  });

  const JSONResponse = JSON.parse(JSON.stringify(response));

  return JSONResponse;
};

// Post Edit Profile
const apiEditUser = async (name, phone, email, password) => {
  const user = await getUserData();

  const response = await axios.post(
    `${BASE_URL}${API_PROFILE_EDIT}`,
    { name, email, phone, password },
    {
      headers: {
        Authorization: user.token,
      },
    },
  );

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 201 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Get Profile
const apiGetProfile = async () => {
  const user = await getUserData();

  const response = await axios.get(`${BASE_URL}${API_PROFILE}`, {
    headers: {
      Authorization: user.token,
    },
  });

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Get Agent Profile for sales
const apiSalesGetAgentProfile = async token => {
  const response = await axios.get(`${BASE_URL}${API_PROFILE}`, {
    headers: {
      Authorization: token,
    },
  });

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Post Become Agent
const apiPostBecomeAgent = async (
  name,
  address,
  city,
  siup_owner,
  nik_owner,
  contact,
  phone,
  email,
  telp,
  merchant_status,
  npwp,
  // code,
) => {
  const user = await getUserData();

  const response = await axios.post(
    `${BASE_URL}${API_BECOME_AGENT}`,
    {
      name,
      address,
      city,
      siup_owner,
      nik_owner,
      contact,
      phone,
      telp,
      email,
      merchant_status,
      npwp,
      // code,
    },
    {
      headers: {
        Authorization: user.token,
      },
    },
  );

  const responseJSON = JSON.parse(JSON.stringify(response));
  console.log(responseJSON);
  if (responseJSON.status === 201 && responseJSON.data) {
    return JSON.parse(JSON.stringify(responseJSON.data));
  }

  return null;
};

// Get Category
const apiGetCategories = async () => {
  const user = await getUserData();

  const response = await axios.get(`${BASE_URL}${API_CATEGORIES}`, {
    headers: {
      Authorization: user.token,
    },
  });

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Get Dashboard
const apiGetDashBoard = async () => {
  const user = await getUserData();

  const response = await axios.get(`${BASE_URL}${API_DASHBOARD}`, {
    headers: {
      Authorization: user.token,
    },
  });

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Get Product
const apiGetProducts = async () => {
  const user = await getUserData();

  const response = await axios.get(`${BASE_URL}${API_PRODUCTS}`, {
    headers: {
      Authorization: user.token,
    },
  });

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Post Product
const apiAddProduct = async (
  name,
  sku,
  description,
  id_category,
  weight,
  stock,
  het,
  price,
  javaPrice,
  images,
) => {
  const user = await getUserData();

  const data = new FormData();

  data.append('name', name);
  data.append('sku', sku);
  data.append('description', description);
  data.append('id_category', id_category);
  data.append('weight', weight);
  data.append('stock', stock);
  data.append('harga_luar_jawa', price);
  data.append('harga_jawa', javaPrice);
  data.append('het', het);

  if (images && images.length) {
    images.forEach((uri, index) => {
      const uriParts = uri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      const newFile = {
        uri,
        name: `${name}_${index}.${fileType}`,
        type: `image/${fileType}`,
      };
      data.append(`images[${index}]`, newFile);
    });
  }

  const response = await axios.post(
    `${BASE_URL}${API_PRODUCTS}`,
    // { name, sku, description, id_category, weight, stock, price, images },
    data,
    {
      headers: {
        Authorization: user.token,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 201 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Post Edit Product
const apiEditProduct = async (
  id,
  name,
  sku,
  description,
  id_category,
  weight,
  stock,
  price,
  javaPrice,
) => {
  const user = await getUserData();

  const response = await axios.post(
    `${BASE_URL}${API_PRODUCTS}/edit`,
    {
      id,
      name,
      sku,
      description,
      id_category,
      weight,
      stock,
      harga_jawa: javaPrice,
      harga_luar_jawa: price,
    },
    {
      headers: {
        Authorization: user.token,
      },
    },
  );

  const responseJSON = JSON.parse(JSON.stringify(response));
  if (responseJSON.status === 201 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Get Product by category
const apiGetProductsByCategoryId = async categoryId => {
  const user = await getUserData();

  const response = await axios.get(
    `${BASE_URL}${API_PRODUCTS_BY_CATEGORY_ID}${categoryId}`,
    {
      headers: {
        Authorization: user.token,
      },
    },
  );

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Get Product Detail
const apiGetProductById = async productId => {
  const user = await getUserData();
  // console.log(productId);
  // console.log(user);

  const response = await axios.get(
    `${BASE_URL}${API_PRODUCT_BY_ID}${productId}`,
    {
      headers: {
        Authorization: user.token,
      },
    },
  );

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Post FCM
const apiFCM = async (token, device, imei) => {
  const user = await getUserData();

  const response = await axios.post(
    `${BASE_URL}${API_FCM}`,
    {
      token,
      device,
      imei,
    },
    {
      headers: {
        Authorization: user.token,
      },
    },
  );

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 201) {
    return responseJSON;
  }

  return null;
};

// Get Province
const apiGetProvince = async () => {
  const response = await axios.get(`${BASE_URL}${API_PROVINCE}`);

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Get City
const apiGetCity = async provinceId => {
  const response = await axios.get(`${BASE_URL}${API_CITY}${provinceId}`);

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Get District
const apiGetDistrict = async cityId => {
  const response = await axios.get(`${BASE_URL}${API_DISTRICT}${cityId}`);

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Get Add Address
const apiAddAddress = async (
  name,
  phone,
  address,
  province,
  city,
  district,
  postal,
) => {
  const user = await getUserData();

  const response = await axios.post(
    `${BASE_URL}${API_ADDRESS}`,
    {
      name,
      phone,
      address,
      province,
      city,
      district,
      postal,
    },
    {
      headers: {
        Authorization: user.token,
      },
    },
  );

  const responseJSON = JSON.parse(JSON.stringify(response));
  if (responseJSON.status === 201 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Post Sales Agent Add Address
const apiSalesAgentAddAddress = async (
  token,
  name,
  phone,
  address,
  province,
  city,
  district,
  postal,
) => {
  const response = await axios.post(
    `${BASE_URL}${API_ADDRESS}`,
    {
      name,
      phone,
      address,
      province,
      city,
      district,
      postal,
    },
    {
      headers: {
        Authorization: token,
      },
    },
  );

  const responseJSON = JSON.parse(JSON.stringify(response));
  if (responseJSON.status === 201 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Get List address
const apiListAddress = async () => {
  const user = await getUserData();

  const response = await axios.get(`${BASE_URL}${API_ADDRESS}`, {
    headers: {
      Authorization: user.token,
    },
  });

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};
// Get Sales Agen List address
const apiSalesAgentListAddress = async token => {
  const response = await axios.get(`${BASE_URL}${API_ADDRESS}`, {
    headers: {
      Authorization: token,
    },
  });

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Post Transaction
const apiTransaction = async (
  token,
  address,
  shipping,
  ongkir,
  subtotal,
  total,
  payment,
  bank,
  detail,
) => {
  const user = await getUserData();

  const response = await axios.post(
    `${BASE_URL}${API_TRANSACTION}`,
    {
      address,
      shipping,
      ongkir,
      subtotal,
      total,
      payment,
      detail: detail ? detail : [],
      bank,
    },
    {
      headers: {
        Authorization: token ? token : user.token,
      },
    },
  );

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.data) {
    return JSON.parse(JSON.stringify(responseJSON.data));
  }

  return null;
};

// Post Update Transaction
const apiUpdateTransaction = async (id, tracking_number, status) => {
  const user = await getUserData();

  const response = await axios.post(
    `${BASE_URL}${API_UPDATE_TRANSACTION}`,
    {
      id,
      tracking_number,
      status,
    },
    {
      headers: {
        Authorization: user.token,
      },
    },
  );

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.data) {
    return JSON.parse(JSON.stringify(responseJSON.data));
  }

  return null;
};

// Get List Transaction
const apiListTransaction = async () => {
  const user = await getUserData();

  const response = await axios.get(`${BASE_URL}${API_TRANSACTION}`, {
    headers: {
      Authorization: user.token,
    },
  });

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Get Detail Transaction
const apiDetailTransaction = async id => {
  const user = await getUserData();

  const response = await axios.get(
    `${BASE_URL}${API_DETAIL_TRANSACTION}${id}`,
    {
      headers: {
        Authorization: user.token,
      },
    },
  );

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Get Shipping Cost
const apiShippingCost = async (token, param1, param2) => {
  const user = await getUserData();
  const response = await axios.get(
    `${BASE_URL}${API_DELIVERY}${param1}/${param2}`,
    {
      headers: {
        Authorization: token ? token : user.token,
      },
    },
  );

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Get Banner
const apiBanner = async () => {
  const response = await axios.get(`${BASE_URL}${API_BANNER}`);

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Post Wishlist
const apiPostWishlist = async id_product => {
  const user = await getUserData();

  const response = await axios.post(
    `${BASE_URL}${API_WISHLIST}`,
    {
      id_product,
    },
    {
      headers: {
        Authorization: user.token,
      },
    },
  );

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 201 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Get List Sales
const apiGetSales = async () => {
  const user = await getUserData();

  const response = await axios.get(`${BASE_URL}${API_SALES}`, {
    headers: {
      Authorization: user.token,
    },
  });

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Post Add Sales
const apiAddSales = async (
  name,
  email,
  password,
  phone,
  address,
  city,
  dob,
  telp,
  nik,
  area,
  note,
) => {
  const user = await getUserData();

  const response = await axios.post(
    `${BASE_URL}${API_SALES}`,
    {
      name,
      email,
      password,
      phone,
      address,
      city,
      dob,
      telp,
      nik,
      kode_area: area,
      note,
      type: 2,
    },
    {
      headers: {
        Authorization: user.token,
      },
    },
  );

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 201 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Post Wishlist
const apiPostAgentMeta = async (
  agent,
  price_option,
  laurent,
  none_laurent,
  kode_area,
) => {
  const user = await getUserData();

  const response = await axios.post(
    `${BASE_URL}${API_AGENT_META}`,
    {
      agent,
      price_option,
      laurent,
      none_laurent,
      kode_area,
    },
    {
      headers: {
        Authorization: user.token,
      },
    },
  );

  const responseJSON = JSON.parse(JSON.stringify(response));
  if (responseJSON.status === 201 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Get List Agent
const apiGetAgent = async () => {
  const user = await getUserData();

  const response = await axios.get(`${BASE_URL}${API_AGENT}`, {
    headers: {
      Authorization: user.token,
    },
  });

  const responseJSON = JSON.parse(JSON.stringify(response));
  console.log(responseJSON);
  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Get List Search Product
const apiGetSearchProduct = async query => {
  const user = await getUserData();

  const response = await axios.get(
    `${BASE_URL}${API_SEARCH_PRODUCT}/${query}`,
    {
      headers: {
        Authorization: user.token,
      },
    },
  );

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Get List Agent
const apiGetBecomeAgent = async () => {
  const user = await getUserData();

  const response = await axios.get(`${BASE_URL}${API_GET_BECOME_AGENT}`, {
    headers: {
      Authorization: user.token,
    },
  });

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Post Wishlist
const apiPostVerifyTransfer = async (
  transfer_date,
  bank,
  account_number,
  image,
  id_transaction,
) => {
  const user = await getUserData();

  const data = new FormData();

  data.append(`transfer_date`, transfer_date);
  data.append(`bank`, bank);
  data.append(`account_number`, account_number);
  const uriParts = image.split('.');
  const fileType = uriParts[uriParts.length - 1];
  const newFile = {
    uri: image,
    name: `struck.${fileType}`,
    type: `image/${fileType}`,
  };

  data.append(`image`, newFile);
  data.append(`id_transaction`, id_transaction);

  const response = await axios.post(`${BASE_URL}${API_VERIFY_TRANSFER}`, data, {
    headers: {
      Authorization: user.token,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 201) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Get List Promo
const apiListPromo = async () => {
  const user = await getUserData();

  const response = await axios.get(`${BASE_URL}${API_PROMO}`, {
    headers: {
      Authorization: user.token,
    },
  });

  const responseJSON = JSON.parse(JSON.stringify(response));

  console.log('responseJSON', responseJSON);
  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Get Detail Promo
const apiDetailPromo = async index => {
  const user = await getUserData();

  const response = await axios.get(`${BASE_URL}${API_DETAIL_PROMO}/${index}`, {
    headers: {
      Authorization: user.token,
    },
  });

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Get Cities
const apiGetCities = async () => {
  const user = await getUserData();

  const response = await axios.get(`${BASE_URL}${API_GET_CITY}`, {
    headers: {
      Authorization: user.token,
    },
  });

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Get Cities
const apiGetAllCity = async () => {
  const user = await getUserData();

  const response = await axios.get(`${BASE_URL}${API_CITY}`, {
    headers: {
      Authorization: user.token,
    },
  });

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Post Create Promo
const apiCreatePromo = async (product, price, city) => {
  const user = await getUserData();

  const response = await axios.post(
    `${BASE_URL}${API_PROMO}`,
    {
      city,
      product,
      price,
    },
    {
      headers: {
        Authorization: user.token,
      },
    },
  );

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 201 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Post Edit Promo
const apiEditPromo = async (id_promo, product, price, city) => {
  const user = await getUserData();

  const response = await axios.post(
    `${BASE_URL}${API_EDIT_PROMO}`,
    {
      city,
      product,
      price,
      id_promo,
    },
    {
      headers: {
        Authorization: user.token,
      },
    },
  );

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 201 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};
// Post Delete Promo
const apiDeletePromo = async id_promo => {
  const user = await getUserData();

  const response = await axios.post(
    `${BASE_URL}${API_DELETE_PROMO}`,
    {
      id_promo,
    },
    {
      headers: {
        Authorization: user.token,
      },
    },
  );

  const responseJSON = JSON.parse(JSON.stringify(response));
  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Get List Discount
const apiListDiscount = async () => {
  const user = await getUserData();

  const response = await axios.get(`${BASE_URL}${API_DISCOUNT}`, {
    headers: {
      Authorization: user.token,
    },
  });

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Get Detail Discount
const apiDetailDiscount = async index => {
  const user = await getUserData();

  const response = await axios.get(
    `${BASE_URL}${API_DETAIL_DISCOUNT}/${index}`,
    {
      headers: {
        Authorization: user.token,
      },
    },
  );

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Post Create Discount
const apiCreateDiscount = async (category, discount) => {
  const user = await getUserData();

  const response = await axios.post(
    `${BASE_URL}${API_DISCOUNT}`,
    {
      role: 1,
      category,
      discount,
    },
    {
      headers: {
        Authorization: user.token,
      },
    },
  );

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 201 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Post Edit Discount
const apiEditDiscount = async (id_discount, category, discount) => {
  const user = await getUserData();

  const response = await axios.post(
    `${BASE_URL}${API_EDIT_DISCOUNT}`,
    {
      id: id_discount,
      category,
      role: 1,
      discount,
    },
    {
      headers: {
        Authorization: user.token,
      },
    },
  );

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 201 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};
// Post Delete Discount
// const apiDeleteDiscount = async id_promo => {
//   const user = await getUserData();

//   const response = await axios.post(
//     `${BASE_URL}${API_DELETE_PROMO}`,
//     {
//       id_promo,
//     },
//     {
//       headers: {
//         Authorization: user.token,
//       },
//     },
//   );

//   const responseJSON = JSON.parse(JSON.stringify(response));
//   if (responseJSON.status === 200 && responseJSON.data) {
//     return JSON.parse(JSON.stringify(response.data));
//   }

//   return null;
// };

// Get Tracking
const apiGetTracking = async id_transaction => {
  const user = await getUserData();

  const response = await axios.get(
    `${BASE_URL}${API_TRACKING}${id_transaction}`,
    {
      headers: {
        Authorization: user.token,
      },
    },
  );

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (
    responseJSON.status === 200 &&
    responseJSON.data &&
    responseJSON.data.rajaongkir &&
    responseJSON.data.rajaongkir.result
  ) {
    return responseJSON.data.rajaongkir.result;
  }

  return null;
};

//Faq
const apiGetFaq = async () => {
  const response = await axios.get(`${BASE_URL}/faq`);

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 200) {
    return responseJSON.data;
  }

  return null;
};

export {
  apiGetFaq,
  apiLogin,
  apiRegister,
  apiForgotPassword,
  apiEditUser,
  apiGetProfile,
  apiSalesGetAgentProfile,
  apiPostBecomeAgent,
  apiGetCategories,
  apiGetDashBoard,
  apiGetProducts,
  apiAddProduct,
  apiEditProduct,
  apiGetProductsByCategoryId,
  apiGetProductById,
  apiFCM,
  apiGetSearchProduct,
  apiGetProvince,
  apiGetCity,
  apiGetAllCity,
  apiGetDistrict,
  apiAddAddress,
  apiSalesAgentAddAddress,
  apiListAddress,
  apiSalesAgentListAddress,
  apiTransaction,
  apiUpdateTransaction,
  apiListTransaction,
  apiShippingCost,
  apiBanner,
  apiPostWishlist,
  apiDetailTransaction,
  apiGetSales,
  apiAddSales,
  apiPostAgentMeta,
  apiGetAgent,
  apiGetBecomeAgent,
  apiPostVerifyTransfer,
  apiListPromo,
  apiDetailPromo,
  apiGetCities,
  apiCreatePromo,
  apiEditPromo,
  apiDeletePromo,
  apiGetTracking,
  apiListDiscount,
  apiDetailDiscount,
  apiCreateDiscount,
  apiEditDiscount,
};
