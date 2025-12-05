import dotenv from "dotenv";

dotenv.config();

export default {
  secret: process.env.JWT_SECRET,
  expireIn: process.env.JWT_EXPIRES_IN,
};
