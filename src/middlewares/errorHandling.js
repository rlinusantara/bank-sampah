import ResponseErr from "@/helpers/responseErr";
import Joi from "joi";

const errorHandling = (err) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseErr) {
    return Response.json({ errors: [err.message] }, { status: err.getStatus });
  } else if (err instanceof Joi.ValidationError) {
    return Response.json({ errors: err.message.split(".") }, { status: 400 });
  }

  return Response.json({ errors: [err.message] }, { status: 500 });
};

export default errorHandling;
