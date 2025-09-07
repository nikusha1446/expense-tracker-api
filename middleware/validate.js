const validate =
  (schema, source = 'body') =>
  (req, res, next) => {
    const dataToValidate = source === 'query' ? req.query : req.body;
    const { error } = schema.validate(dataToValidate, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        error: error.details.map((detail) => detail.message.replace(/"/g, '')),
      });
    }

    next();
  };
module.exports = validate;
