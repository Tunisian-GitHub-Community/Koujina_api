const router = require("express").Router();
const multer = require("multer");

const Recipe = require("../models/Recipe");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
router.post("/:id", upload.single("file"), async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    recipe.photo = buffer;
    await recipe.save();

    res.status(200).json("File has been uploaded");
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: err.message });
  }
});

module.exports = router;
