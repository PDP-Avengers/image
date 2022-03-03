const ImageBase = require("../models/images");
const { Router } = require("express");
const upload = require("../middlewares/upload-image");
const router = Router();
const imageController = require("../controller/imageController");
router.post("/add", upload, async (req, res) => {
  const images = new ImageBase({
    image: req.file.originalname,
  });

  try {
    await images.save();
    res.json({
      path: "http://localhost:5000/images/" + req.file.originalname,
      message: "Success",
    });
  } catch (error) {
    res.json(error);
  }
});

router.get("/:path", (req, res) => {
  res.download(imageController.getFile(req.params.path));
});

module.exports = router;
