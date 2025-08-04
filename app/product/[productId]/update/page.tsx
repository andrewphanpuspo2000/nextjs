"use client";
import UpdateForm from "@/app/(components)/UpdateForm";
import { useParams } from "next/navigation";

export default function UpdateProductPage() {
  const params = useParams();

  return (
    <div className="px-4 md:px-12 bg-[#F8F9FA] pb-8">
      <h2 className="text-center font-semibold pt-8 text-xl md:text-2xl w-full mx-autp">
        Update Product Page
      </h2>
      <UpdateForm productId={params.productId as string} />
    </div>
  );
}
