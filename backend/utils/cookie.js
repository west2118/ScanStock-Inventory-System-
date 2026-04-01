export const cookieOptions = {
  httpOnly: false,
  secure: false,
  sameSite: "strict",
};

export const accessTokenCookie = {
  ...cookieOptions,
  maxAge: 15 * 60 * 1000,
};

export const refreshTokenCookie = {
  ...cookieOptions,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
