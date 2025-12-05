import * as authService from "../services/authService.js";

export async function register(req, res) {
  const { name, email, phone, city, state, password } = req.body;

  if (!name || !email || !phone || !city || !state || !password) {
    return res.status(400).json({
      message: "All fields are requided.",
    });
  }

  try {
    const result = await authService.registerUser({
      name,
      email,
      phone,
      city,
      state,
      password,
    });
    return res.status(201).json({
      message: "Usuário criado com sucesso!",
      data: result,
    });
  } catch (error) {
    console.error("error creating user:", error);
    return res.status(400).json({
      message: error.message,
    });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and passwords are requided.",
    });
  }

  try {
    const result = await authService.loginUser({ email, password });

    return res.json({
      message: "Login realizado com sucesso",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    console.error("error login:", error);
    return res.status(400).json({
      message: error.message,
    });
  }
}

export async function logout(req, res) {
  return res.json({
    message: "logout feito com sucesso",
  });
}
