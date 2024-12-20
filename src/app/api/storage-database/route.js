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
      dataSize: `${(stats.dataSize / 1024).toFixed(2)} KB`,
      storageSize: `${(stats.storageSize / 1024).toFixed(2)} KB`,
      indexSize: `${(stats.indexSize / 1024).toFixed(2)} KB`,
      totalSize: `${totalSizeMB.toFixed(2)} MB`,
    };

    return Response.json(
      { message: "Data storage", data: formattedStats },
      { status: 200 }
    );
  } catch (error) {
    return errorHandling(error);
  }
};

export const GET = (req) => storageDatabase(req);
