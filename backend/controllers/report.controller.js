import { getReportsService } from "../services/report.service.js";
import { VALID_MODES } from "../utils/constants.js";

export const getReports = async (req, res) => {
  const mode = VALID_MODES.includes(req.query.mode) ? req.query.mode : "daily";

  const year =
    req.query.year && !isNaN(req.query.year) ? Number(req.query.year) : null;

  const { reportType, startDate, endDate } = req.query;

  try {
    if (mode === "range") {
      if (!startDate || !endDate) {
        return res.status(400).json({
          message: "Start date and end date are required for custom range.",
        });
      }
    }

    const data = await getReportsService(
      mode,
      year,
      startDate,
      endDate,
      reportType,
    );

    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
};
