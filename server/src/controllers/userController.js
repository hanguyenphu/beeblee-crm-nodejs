const User = require("../models/user");

exports.createUser = async (req, res) => {
  var user = new User(req.body);
  user.password = "123456789";
  try {
    await user.save();
    // const token = await user.generateAuthToken();
    res.status(201).send({ user });
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const userId = req.body.userId;
    user = await User.findById(userId);
    if (!user) {
      res.status(400).send("Cannot find the user");
    }
    user.password = "123456789";
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send("An error has been occurred");
  }
};

exports.loginUser = async (req, res) => {

  try {
    const user = await User.findByCredential(req.body.email, req.body.password);

    if (!user.active) {
      return res.status(400).send({ message: "Not Authorized" });
    }
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(500).send();
  }
};

exports.logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.send("Logout");
  } catch (err) {
    res.status(500).send();
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.getUserProfile = async (req, res) => {
  const _id = req.user._id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.updateUserPassword = async (req, res) => {
  const updates = Object.keys(req.body.data);
  const allowedUpdates = ["currentPassword", "newPassword"];

  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = await User.findByCredential(
      req.user.email,
      req.body.data.currentPassword
    );

    user.password = req.body.data.newPassword;
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateUserProfile = async (req, res) => {
  const updates = Object.keys(req.body.data);
  const allowedUpdates = ["name", "email", "phone", "active"];

  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const user = req.user;
    updates.forEach(async update => {
      if (!!req.body.data[update]) {
        user[update] = req.body.data[update];
      }
    });
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.adminUpdateUserProfile = async (req, res) => {
  const allowedUpdates = ["name", "email", "phone", "active", "role"];
  try {
    var user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ message: "Cannot Find User" });
    }
    allowedUpdates.forEach(async update => {
      if (!!req.body[update]) {
        user[update] = req.body[update];
      }
    });
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};
