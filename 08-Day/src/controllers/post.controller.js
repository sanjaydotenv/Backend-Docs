const createPostcontroller = (req, res) => {
  const { userName, caption } = req.body;
  const file = req.file

  console.log(userName , caption)
  console.log(file)
};

module.exports = { createPostcontroller };
