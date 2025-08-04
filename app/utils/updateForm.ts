"use server";
import { connectDb } from "../api/db/connectdb";
import Product from "../api/model/productModel";
import cloudinary from "./cloudinary";

export const updateAction = async (id: string, formData: FormData) => {
  try {
    console.log("this is step 1");
    const image = formData.get("image") as File;
    const name = formData.get("name");
    const price = formData.get("price");
    const link = formData.get("link");
    const description = formData.get("description");

    if (!name || !price || !link || !description) {
      console.log("All fields are required");

      return { error: "All fields are required" };
    }

    await connectDb();

    const product = await Product.findById(id);

    if (!product) {
      return { error: "product does not exist" };
    }

    if (image.size === 0) {
      //update without image
      await Product.findByIdAndUpdate(id, { name, price, link, description });
      return { success: "Product has been updated" };
    } else {
      const filename = product.image.split("/");
      const parts = filename[filename.length - 1];
      const imageId = parts.split(".")[0];

      const deleteImage = await cloudinary.uploader.destroy(
        `watches/${imageId}`
      );
      console.log("result delete image:", deleteImage);

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

      await Product.findByIdAndUpdate(id, {
        image: imageResponse.secure_url,
        name,
        price,
        link,
        description,
      });
      return { success: "product update successfuly " };
    }
  } catch (err) {
    return { error: "something wrong" };
  }
};
