import Joi from "joi";

class Schema {
  static get registerSchema() {
    return Joi.object({
      username: Joi.string().trim().min(3).required(),
      password: Joi.string().trim().min(5).required(),
    });
  }
  static get LoginSchema() {
    return Joi.object({
      username: Joi.string().trim().required(),
      password: Joi.string().trim().required(),
    });
  }
}

class AuthValidation extends Schema {
  static register(body) {
    return this.registerSchema.validateAsync(body, {
      abortEarly: false,
    });
  }
  static login(body) {
    return this.LoginSchema.validateAsync(body, {
      abortEarly: false,
    });
  }
}

export default AuthValidation;
