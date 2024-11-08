const errorHandling = (err, req, res) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseErr) {
    return res.status(err.getStatus).json({ errors: [err.message] });
  } else if (err instanceof Joi.ValidationError) {
    return res.status(400).json({ errors: err.message.split(".") });
  }

  return res.status(500).json({ errors: [err.message] });
};
