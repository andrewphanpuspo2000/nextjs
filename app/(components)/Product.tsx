import Image from "next/image";
import Link from "next/link";

export default function Product() {
  const products = ["", "", "", ""];
  return (
    <div
      id="product"
      className="px-4 md:px-12 py-5 md:py-10 flex justify-center items-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((prod, index) => (
          <Link href="/product/123" key={index}>
            <Image
              src="/watch.jpg"
              alt="product"
              width={1000}
              height={1000}
              className="max-w-[17rem] h-72 object-cover object-center rounded-lg"
            />
            <div className="mt-4">
              <h2 className="font-semibold">A very good watch</h2>
              <p>$1200</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
