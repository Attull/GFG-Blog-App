const bcrypt = require("bcryptjs");
const User = require("../model/userModel.js");

async function register(req, res) {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already registered." });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return res.status(201).json({ message: "Registered successfully" });
}

async function login(req, res) {
  const { email, password } = req.body;

  const userData = await User.findOne({ email });

  if (!userData) {
    return res.status(400).json({ message: "Email not found" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, userData.password);

  if (!isPasswordCorrect) {
    return register.status(400).json({ message: "Password is wrond" });
  }

  return res.status(200).json({
    message: "Login Successfully",
    user: {
      id: userData.id,
      name: userData.name,
      email: userData.email,
    },
  });
}

module.exports = {
  register,
  login,
};
