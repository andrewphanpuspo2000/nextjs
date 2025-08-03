import { NextRequest } from "next/server";
import { connectDb } from "../db/connectdb";
import Product from "../model/productModel";

export const GET = async (request: NextRequest) => {
  try {
    await connectDb();
    const searchParams = request.nextUrl.searchParams;
    const searchTerm = searchParams.get("searchTerm");

    const products = await Product.find({
      name: { $regex: searchTerm, $options: "i" },
    }).sort({ createdAt: -1 });

    return Response.json({ products, status: "success" }, { status: 200 });
  } catch (err: any) {
    return Response.json(
      { message: err.message, status: "failed" },
      { status: 400 }
    );
  }
};
