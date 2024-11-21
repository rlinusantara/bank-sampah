import Joi from "joi";
import mongoose from "mongoose";

class Schema {
  static get addSchema() {
    return Joi.object({
      tanggal_setoran: Joi.date(),
      jenis_sampah: Joi.string().trim().required(),
      sampah_halus: Joi.number().min(0.1).required().strict(),
      sampah_kasar: Joi.number().min(0.1).required().strict(),
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

  static get addSchemaTotal() {
    return Joi.object({
      tanggal_setoran: Joi.date(),
      jenis_sampah: Joi.string().trim().required(),
      jumlah_setoran: Joi.number().min(0.1).required().strict(),
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

class SetoranMasukValidation extends Schema {
  static add(body) {
    return this.addSchema.validateAsync(body, {
      abortEarly: false,
    });
  }
  static addTotal(body) {
    return this.addSchemaTotal.validateAsync(body, {
      abortEarly: false,
    });
  }
}

export default SetoranMasukValidation;
