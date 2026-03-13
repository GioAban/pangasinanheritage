import { getDbData } from "@/lib/data-fetcher";
import { Spot } from "@/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import BackButton from "@/app/components/atoms/BackButton";
import Button from "@/app/components/atoms/Button";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const data = await getDbData();
  return data.spots.map((spot: Spot) => ({
    id: spot.id.toString(),
  }));
}

export default async function ViewSpotPage({ params }: PageProps) {
  const resolvedParams = await params;
  const data = await getDbData();
  const spot = data.spots.find(
    (s: Spot) => s.id.toString() === resolvedParams.id,
  );

  if (!spot) return notFound();

  // CLEAN LOGIC: Inalis na ang basePath at hardcoded localhost link
  const imageSrc = spot.image.startsWith("http")
    ? spot.image
    : spot.image.startsWith("/")
      ? spot.image
      : `/${spot.image}`;

  return (
    <main className="min-h-screen bg-white">
      <div className="relative h-[50vh] min-h-[400px] w-full lg:h-[70vh]">
        <Image
          src={imageSrc}
          alt={spot.title}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6 text-white sm:p-10 md:p-16 lg:p-24">
          <BackButton />
          <h1 className="mt-4 text-[clamp(2.5rem,8vw,8rem)] font-black leading-[0.9] tracking-tighter">
            {spot.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-6">
            <span className="rounded-full bg-blue-600 px-4 py-1.5 text-[clamp(0.6rem,1vw,0.75rem)] font-black uppercase tracking-[0.2em] shadow-lg">
              {spot.category}
            </span>
            <span className="text-[clamp(0.75rem,1.2vw,0.875rem)] font-bold uppercase tracking-widest text-slate-300">
              {spot.location}
            </span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="text-[clamp(0.7rem,1vw,0.8rem)] font-black uppercase tracking-[0.3em] text-blue-600">
              Overview
            </h2>
            <p className="mt-6 text-[clamp(1.1rem,1.5vw,1.5rem)] font-medium leading-relaxed text-slate-600">
              {spot.description}
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-8 h-fit rounded-[2rem] border border-slate-100 bg-slate-50 p-8 shadow-sm md:p-10">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Location Details
              </h4>
              <div className="mt-6">
                <p className="text-xl font-bold leading-tight text-slate-900">
                  {spot.location}
                </p>
                <p className="mt-2 text-sm font-medium italic text-slate-500">
                  Pangasinan, Philippines
                </p>
              </div>

              <div className="mt-8">
                {spot.mapUrl ? (
                  <a
                    href={spot.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button variant="blue" className="w-full py-4 text-lg">
                      Get Directions
                    </Button>
                  </a>
                ) : (
                  <Button
                    variant="solid"
                    className="w-full cursor-not-allowed bg-slate-200 py-4 text-lg text-slate-400"
                  >
                    No Map Available
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
