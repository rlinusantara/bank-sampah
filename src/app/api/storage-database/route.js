import dbConnect from "@/db/connection";

const { default: errorHandling } = require("@/app/middlewares/errorHandling");

const storageDatabase = async (req) => {
  try {
    const mongdb = await dbConnect();
    const db = mongdb.connection.db;

    const stats = await db.stats();

    const totalSizeMB = (stats.storageSize + stats.indexSize) / (1024 * 1024);
    const formattedStats = {
      db: stats.db,
      collections: stats.collections,
      documents: stats.objects,
      penyimpananTerpakai: `${totalSizeMB.toFixed(2)} MB`,
    };

    return Response.json(
      { message: "Data storage", data: formattedStats },
      { status: 200 }
    );
  } catch (error) {
    return errorHandling(error);
  }
};

export const GET = async (req) => {
  try {
    if (!process.env.SECRET_KEY) {
      throw new ResponseErr(500, "Env error");
    }
    return await onlyLogin(storageDatabase, req, process.env.SECRET_KEY);
  } catch (error) {
    return errorHandling(error);
  }
};
