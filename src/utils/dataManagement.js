const productManagement = products => {
  const response = [];

  products.forEach((product, index) => {
    const images = [];

    if (product.images.length) {
      product.images.forEach(element => {
        images.push({ uri: element });
      });
    }

    const het = product.het;

    response.push({
      id: product.id_product,
      id_category: product.id_category,
      name: product.name,
      description: product.description,
      sku: product.sku,
      image: product.images.length ? product.images[0] : '',
      images,
      javaPrice: product.harga_jawa ? product.harga_jawa + '' : '0',
      nonJavaPrice: product.harga_luar_jawa
        ? product.harga_luar_jawa + ''
        : '0',
      price: het
        ? het
        : product.harga_luar_jawa
        ? product.harga_luar_jawa + ''
        : '0',
      stock: product.stock,
      weight: product.weight,
      rate: product.rate,
      review: product.review,
    });
  });

  return response;
};
const productSortManagement = products => {
  const response = [];
  const datas = [...products];
  datas.forEach((product, index) => {
    const images = [];

    if (product.images.length) {
      product.images.forEach(element => {
        images.push({ uri: element.uri });
      });
    }

    response.push({
      id: product.id,
      id_category: product.id_category,
      name: product.name,
      description: product.description,
      sku: product.sku,
      image: product.image,
      images,
      javaPrice: product.javaPrice,
      nonJavaPrice: product.nonJavaPrice,
      price: product.price,
      stock: product.stock,
      weight: product.weight,
      rate: product.rate,
      review: product.review,
      isWishlist: product.isWishlist,
    });
  });

  return response;
};
const productCartManagement = product => {
  const response = {
    id: product.id,
    id_category: product.id_category,
    name: product.name,
    description: product.description,
    sku: product.sku,
    image: product.image,
    price: product.price + '',
    javaPrice: product.javaPrice,
    nonJavaPrice: product.nonJavaPrice,
    stock: product.stock,
    weight: product.weight,
    qty: 1,
  };

  return response;
};

export { productManagement, productCartManagement, productSortManagement };
