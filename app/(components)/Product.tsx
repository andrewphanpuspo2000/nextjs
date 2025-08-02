"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
}

export default function Product() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProduct = async () => {
    const { data } = await axios.get("/api/fetch-products");
    const { result, message, status } = data;
    console.log(data);
    if (status == "failed") {
      toast.error(message);
      return;
    }
    setProducts(result);
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div
      id="product"
      className="px-4 md:px-12 py-5 md:py-10 flex justify-center items-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((prod, index) => (
          <Link href={`/product/${prod._id}`} key={index}>
            <Image
              src={prod.image}
              alt="product"
              width={1000}
              height={1000}
              className="max-w-[17rem] h-72 object-cover object-center rounded-lg"
            />
            <div className="mt-4">
              <h2 className="font-semibold">{prod.name}</h2>
              <p>${prod.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
