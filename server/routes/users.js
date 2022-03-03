const Users = require("../models/users");
const { Router } = require("express");
const upload = require("../middlewares/upload-image");
const router = Router();
const mapUsers = (users) => {
  return users.map((v, i) => ({
    name: v.name,
    email: v.email,
    age: v.age,
    id: i + 1,
    user_id: v.id,
    image: `/uploads/${v.image}`,
  }));
};

router.post("/add", upload, async (req, res) => {
  const user = new Users({
    email: req.body.email,
    age: req.body.age,
    name: req.body.name,
    image: req.file.originalname,
  });
  try {
    user.save();
    res.json({
      message: "User successfully added",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: "User not added",
      error,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.json(mapUsers(users));
  } catch (error) {
    res.json(error);
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const users = await Users.deleteOne({ _id: req.params.id });
    users.save();
    res.json({ message: "Delete successfully", users });
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const users = await Users.findById(req.params.id);
    const user = {
      id: users._id,
      name: users.name,
      age: users.age,
      email: users.email,
    };
    res.json({ message: "Get successfully", user });
  } catch (error) {
    res.send(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    await Users.findByIdAndUpdate(req.body.id, req.body);
    res.json({ message: "User successfully update" });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
