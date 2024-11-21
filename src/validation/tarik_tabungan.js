import Joi from "joi";
import mongoose from "mongoose";

class Schema {
  static get tabunganSchema() {
    return Joi.object({
      saldo: Joi.number().strict().min(1).required(),
      id_nasabah: Joi.custom((value, helper) => {
        if (!mongoose.isValidObjectId(value)) {
          return helper.error("any.id_invalid");
        }
        return true;
      }).messages({
        "any.id_invalid": "Invalid id nasabah",
      }),
    });
  }
}

class TarikTabunganValidation extends Schema {
  static saldo(body) {
    return this.tabunganSchema.validateAsync(body, {
      abortEarly: false,
    });
  }
}

export default TarikTabunganValidation;
