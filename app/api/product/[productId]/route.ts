import cloudinary from "@/app/utils/cloudinary";
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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  await connectDb();
  const productId = (await params).productId;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return Response.json({ message: "Product not found." }, { status: 400 });
    }

    // Delete the image in cloudinary first
    const parts = product.image.split("/");
    const fileName = parts[parts.length - 1];
    const imageId = fileName.split(".")[0];

    cloudinary.uploader
      .destroy(`watches/${imageId}`)
      .then((result) => console.log("Result", result));

    // Delete from database

    await Product.findByIdAndDelete(productId);

    return Response.json(
      { message: "Product deleted successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}
