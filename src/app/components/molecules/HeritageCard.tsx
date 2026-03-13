import Image from "next/image";
import Link from "next/link";
import { Spot } from "@/types";

export const HeritageCard = ({ spot }: { spot: Spot }) => {
  // Simplified image logic: works for both local and production
  const imageSrc = spot.image.startsWith("http")
    ? spot.image
    : spot.image.startsWith("/")
      ? spot.image
      : `/${spot.image}`;

  return (
    <Link
      href={`/view-spot/${spot.id}`}
      className="group block w-80 flex-shrink-0"
    >
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-xl">
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={spot.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            unoptimized
          />
          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-blue-600 shadow-sm backdrop-blur">
              {spot.category || "Heritage"}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
            {spot.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-500">
            {spot.description}
          </p>
          <div className="mt-4 text-xs font-bold uppercase tracking-wider text-blue-500 transition-colors group-hover:text-blue-700">
            Discover More →
          </div>
        </div>
      </div>
    </Link>
  );
};
