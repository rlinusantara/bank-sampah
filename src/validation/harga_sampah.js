import Joi from "joi";

class Schema {
  static get addSchema() {
    return Joi.object({
      harga_satuan: Joi.number().required().strict(),
    });
  }
}

class HargaSampahValidation extends Schema {
  static add(body) {
    return this.addSchema.validateAsync(body, {
      abortEarly: false,
    });
  }
}

export default HargaSampahValidation;
