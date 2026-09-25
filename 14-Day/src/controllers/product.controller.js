const createProduct = (req, res) => {
  console.log(req.body);
  console.log(req.files);

  res.status(201).json({
    message: "DONE",
  });
};

export default {
  createProduct,
};
