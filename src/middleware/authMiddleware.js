import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwtConfig.js";

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Acesso negado. O token não foi enviado" });
  }

  let token;

  if (authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else {
    res.status(401).json({ message: "Envie o Bearer Token" });
  }

  jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Envie um token válido" });
    }

    req.user = decoded;

    next();
  });
}
