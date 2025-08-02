import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="min-h-[70vh] md:min-h-[50vh] lg:min-h-[90vh] flex flex-col md:flex-row justify-center items-center bg-white px-4 md:px-12 text-black">
      <div className="max-w-2xl">
        <h1 className="text-5xl pt-6 md:pt-0 md:text-7xl leading-tight font-semibold">
          Timeless Elegance on Your Wrist
        </h1>
        <p className="text-[#495097] mt-4">
          Discover our curated collections of premium watches, crafted for those
          sophistication and precision
        </p>
        <Link href="#product">
          <button className="bg-[#212529] mt-3 text-white px-3 py-2 rounded-md cursor-pointer">
            Shop the Collection
          </button>
        </Link>
      </div>
      <div>
        <Image src="/image.jpg" alt="img" width={500} height={500} />
      </div>
    </div>
  );
}
