module.exports = (req, res, next) => {
  const resObj = {
    message: "This endpoint does not exists. Event has been logged.",
    data: {
      timestamp: new Date(),
      method: req.method,
      url: req.originalUrl,
    }
  };
  if (process.env.NODE_ENV === "development") {
    console.warn(resObj);
  }
  res
    .status(404)
    .setHeader("Content-Type", "application/json")
    .json(resObj);
};
