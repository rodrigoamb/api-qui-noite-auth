import * as authRepository from "../repositories/authRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwtConfig.js";

export async function registerUser({
  name,
  email,
  phone,
  city,
  state,
  password,
}) {
  const existingUser = await authRepository.findUserByEmail(email);

  if (existingUser) {
    throw new Error("Email já cadastrado");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await authRepository.createUser({
    name,
    email,
    phone,
    city,
    state,
    passwordHash,
  });

  return user;
}

export async function loginUser({ email, password }) {
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ id: user.id, email: user.email }, jwtConfig.secret, {
    expiresIn: jwtConfig.expireIn,
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}
