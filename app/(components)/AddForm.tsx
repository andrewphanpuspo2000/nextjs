"use client";
import React, { ChangeEvent, useState } from "react";
import { addAction } from "../utils/addForm";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

const AddForm: React.FC = () => {
  const router = useRouter();
  const maxFileSize = 1024;
  const [imageURL, setImageURL] = useState("");

  async function clientAddAction(formData: FormData) {
    const { error, success } = await addAction(formData);

    if (error) {
      toast.error(error);
      setImageURL("");
    }

    if (success) {
      toast.success(success);
      router.push("/");
      setImageURL("");
    }
  }

  const handleImageOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const fileSize = file.size;
      if (Math.round(fileSize / maxFileSize) > maxFileSize) {
        toast.error("Image file size is exceeding 1mb");
      } else {
        setImageURL(URL.createObjectURL(file));
      }
    }
  };

  return (
    <form
      action={clientAddAction}
      className="w-full max-w-xl mx-auto flex flex-col justify-center items-center space-y-4 mt-3 md:mt-5"
    >
      <div className="w-full flex flex-col">
        {imageURL && (
          <Image
            src={imageURL}
            alt="image"
            width={1000}
            height={1000}
            className="max-w-full max-h-72 object-cover object-center rounded-lg"
          />
        )}
        <label>Product Image:</label>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleImageOnChange}
          className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border border-gray-500"
        />
      </div>
      <div className="w-full flex flex-col">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="enter your product name"
          className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border border-gray-500"
        />
      </div>
      <div className="w-full flex flex-col">
        <label>Price:</label>
        <input
          type="number"
          name="price"
          placeholder="enter your product price"
          className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border border-gray-500"
        />
      </div>
      <div className="w-full flex flex-col">
        <label>Seller Link:</label>
        <input
          type="text"
          name="link"
          placeholder="Link to buyers"
          className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border border-gray-500"
        />
      </div>
      <div className="w-full flex flex-col">
        <label>Description:</label>
        <textarea
          name="description"
          placeholder="Description"
          rows={4}
          className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border border-gray-500"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-[#212529] text-white py-2 rounded-md cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
};

export default AddForm;
