import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/listings/${product.id}`}
      className="bg-[#2A2A2A] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[#C0C0C0]/20"
    >
      <div className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
        />
        {product.featured && (
          <div className="absolute top-2 right-2 bg-[#50C878] text-white text-xs px-2 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-1 text-[#C0C0C0]">{product.title}</h3>
        <p className="text-sm text-[#C0C0C0]/80 mb-2">
          Sold By: {product.seller} •
          <span className="text-[#FFD700]"> {product.rep} Rep</span>
        </p>
        <div className="flex justify-between items-baseline">
          <span className="text-lg font-bold text-[#50C878]">
            ${product.price}
          </span>
          <span className="text-sm text-[#C0C0C0]/60">
            +${product.shipping} shipping
          </span>
        </div>
      </div>
    </Link>
  );
}
