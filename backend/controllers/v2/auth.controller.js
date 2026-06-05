import {
  loginService,
  meService,
  refreshTokenService,
  registerService,
  revokeRefreshTokenService,
} from "../../services/auth.service.js";
import { accessTokenCookie, refreshTokenCookie } from "../../utils/cookie.js";
import { asyncHandler } from "../../utils/helper.js";

export const register = asyncHandler(async (req, res) => {
  const user = await registerService(req.validatedBody);

  res.status(201).json({
    success: true,
    message: "User created successfully!",
    data: user,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await loginService(req.body);

  res
    .cookie("accessToken", accessToken, accessTokenCookie)
    .cookie("refreshToken", refreshToken, refreshTokenCookie)
    .status(200)
    .json({
      message: "Logged in successfully!",
      user,
    });
});

export const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  const { accessToken, refreshToken: newRefreshToken } =
    await refreshTokenService(refreshToken);

  res
    .cookie("accessToken", accessToken, accessTokenCookie)
    .cookie("refreshToken", newRefreshToken, refreshTokenCookie)
    .json({ success: true });
});

export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    await revokeRefreshTokenService(refreshToken);
  }

  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json({ message: "Logout successfully!" });
});

export const me = asyncHandler(async (req, res) => {
  const result = await meService(req.user.id);

  res.status(200).json(result);
});
