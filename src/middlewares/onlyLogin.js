const onlyLogin = (handler, req) => {
  try {
    return handler(req, Response);
  } catch (error) {
    errorHandling(error, req, Response);
  }
};

export default onlyLogin;
