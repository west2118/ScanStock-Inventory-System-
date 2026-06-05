import { asyncHandler } from "../../utils/helper";

export const getHome = asyncHandler(async (req, res) => {
  const home = await getHomeService();

  return res.status(200).json({
    success: true,
    data: home,
  });
});
