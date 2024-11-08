const { default: onlyLogin } = require("@/middlewares/onlyLogin");

async function register(req) {
  try {
    return Response.json({ message: "Berhasil register" }, { status: 200 });
  } catch (error) {
    errorHandling(error, req, Response);
  }
}

export const POST = (req) => onlyLogin(register, req);
