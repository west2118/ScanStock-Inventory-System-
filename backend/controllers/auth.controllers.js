import {
  loginService,
  meService,
  refreshTokenService,
  registerService,
  revokeRefreshTokenService,
} from "../services/auth.service.js";
import { accessTokenCookie, refreshTokenCookie } from "../utils/cookie.js";

export const register = async (req, res) => {
  const { name, username, role, status, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ success: false, message: "Password didn't matched" });

    const user = await registerService(name, username, role, status, password);

    res.status(201).json({ message: "User created successfully!", user });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const { user, accessToken, refreshToken } = await loginService({
      username,
      password,
    });

    res
      .cookie("accessToken", accessToken, accessTokenCookie)
      .cookie("refreshToken", refreshToken, refreshTokenCookie)
      .status(200)
      .json({
        message: "Logged in successfully!",
        user,
      });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const accessToken = await refreshTokenService(refreshToken);

    res
      .cookie("accessToken", accessToken, accessTokenCookie)
      .json({ success: true });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await revokeRefreshTokenService(refreshToken);
    }

    res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json({ message: "Logout successfully!" });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const me = async (req, res) => {
  try {
    const result = await meService(req.user.id);

    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
