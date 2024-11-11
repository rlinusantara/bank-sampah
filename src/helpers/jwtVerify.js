import jwt from "jsonwebtoken";

const jwtVerify = (secret, token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        reject(err);
        return;
      }

      resolve(decoded);
      return;
    });
  });
};

export default jwtVerify;
