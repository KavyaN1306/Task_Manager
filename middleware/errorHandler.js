const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "CastError") {
    return res.status(404).json({ message: "Resource not found" });
  }

  res.status(500).json({ message: "Internal Server Error" });
};

module.exports = errorHandler;
