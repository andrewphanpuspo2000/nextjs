import { connectDb } from "../db/connectdb";
import Product from "../model/productModel";

export const GET = async (request: Request) => {
  await connectDb();
  try {
    const result = await Product.find({}).sort({ createdAt: -1 });

    return Response.json({ result, status: "success" }, { status: 200 });
  } catch (err: any) {
    console.log("error in fetching");
    return Response.json(
      { message: err.message, status: "failed" },
      { status: 400 }
    );
  }
};
