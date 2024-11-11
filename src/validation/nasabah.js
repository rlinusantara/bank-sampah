import Joi from "joi";

class Schema {
  static get registerSchema() {
    return Joi.object({
      nama: Joi.string().trim().min(3).required(),
    });
  }
}

class NasabahValidation extends Schema {
  static register(body) {
    return this.registerSchema.validateAsync(body, {
      abortEarly: false,
    });
  }
}

export default NasabahValidation;
