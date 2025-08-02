"use server";
import { connectDb } from "../api/db/connectdb";
import Product from "../api/model/productModel";
import cloudinary from "./cloudinary";

export const addAction = async (formData: FormData) => {
  try {
    console.log("this is step 1");
    const image = formData.get("image") as File;
    const name = formData.get("name");
    const price = formData.get("price");
    const link = formData.get("link");
    const description = formData.get("description");

    if (!image || !name || !price || !link || !description) {
      console.log("All fields are required");

      return { error: "All fields are required" };
    }

    await connectDb();

    //image process storage
    const arrayBuffer = await image.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const imageResponse: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            folder: "watches",
          },
          async (error, result) => {
            if (error) {
              return reject(error.message);
            }

            return resolve(result);
          }
        )
        .end(buffer);
    });

    console.log("Image Response:", imageResponse);

    await Product.create({
      image: imageResponse.secure_url,
      name,
      price,
      link,
      description,
    });
    return { success: "product add successfuly " };
  } catch (err) {
    return { error: "something wrong" };
  }
};
