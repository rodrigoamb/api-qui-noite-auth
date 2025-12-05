import User from "../models/userModel.js";

export async function findUserByEmail(email) {
  return await User.findOne({ where: { email } });
}

export async function createUser({
  name,
  email,
  phone,
  city,
  state,
  passwordHash,
}) {
  const user = await User.create({
    name,
    email,
    phone,
    city,
    state,
    password: passwordHash,
  });

  const { password, ...userWithoutPassword } = user.toJSON();
  return userWithoutPassword;
}
