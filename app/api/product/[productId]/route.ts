import { connectDb } from "../../db/connectdb";
import Product from "../../model/productModel";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) => {
  await connectDb();
  const productId = (await params).productId;
  console.log(productId);
  try {
    const product = await Product.findById(productId);
    console.log(product);
    if (!product) {
      return Response.json({ message: "product not found" }, { status: 400 });
    }

    return Response.json({ product }, { status: 200 });
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 400 });
  }
};
