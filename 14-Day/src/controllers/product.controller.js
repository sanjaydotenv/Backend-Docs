import productModel from "../models/product.model.js";
import uploadFile from "../services/storage.service.js";

const createProduct = async (req, res) => {
  const { title, description, price, sizes } = req.body;

  const files = req.files;

  const filesUrls = [];

  for (let i = 0; i < files.length; i++) {
    const response = await uploadFile(files[i].buffer, files[i].originalname);

    filesUrls.push(response.url);
  }

  const product = await productModel.create({
    title,
    description,
    price: {
      amount: price.amount,
      currency: price.currency,
    },
    sizes,
    images: filesUrls,
    seller: req.userProfile._id,
  });

  res.status(201).json({
    message: "Product created successfully",
    data: {
      product,
    },
  });
};

const listAllProducts = async (req, res) => {
  const products = await productModel.find({ publish: true });

  res.status(200).json({
    message: "Products data fetched successfully",
    data: {
      products,
    },
  });
};

const listAllProductsToSeller = async (req, res) => {
  const products = await productModel.find({});

  return res.status(200).json({
    message: "All products fetched successfully",
    data: {
      products,
    },
  });
};

const unlistProduct = async (req, res) => {
  const { productID } = req.params;

  const product = await productModel.findById(productID);

  if (!product) {
    return res.status(404).json({
      message: "product not found by id",
    });
  }

  await productModel.findByIdAndUpdate(id, {
    published: false,
  });

  return res.status(200).json({
    message: "Product unpublished successfully",
  });
};

const listProduct = async (req, res) => {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "product not found by id",
    });
  }

  // –––––––––––––––––– make product unPublished –––––––––––––––––––––
  await productModel.findByIdAndUpdate(id, {
    published: true,
  });

  return res.status(200).json({
    message: "Product published successfully",
  });
};

export default {
  createProduct,
  listAllProducts,
  listAllProductsToSeller,
  unlistProduct,
  listProduct
};
