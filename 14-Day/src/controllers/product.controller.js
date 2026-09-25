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

export default {
  createProduct,
};
