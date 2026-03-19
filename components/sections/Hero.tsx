import Image from "next/image";
import { Button } from "../ui/Button";

type FeatureCardProps = {
  title: string;
  description: string;
};

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <article className="glass-panel h-[180px] rounded-3xl md:rounded-4xl px-5 py-4 md:px-6 md:py-5 text-left text-sm md:text-base text-white/80">
      <h3 className="mb-1.5 text-base md:text-lg font-semibold text-white">
        {title}
      </h3>
      <p className="text-xs md:text-sm text-white/70 leading-relaxed">
        {description}
      </p>
    </article>
  );
}

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden min-h-screen pt-28 pb-20 md:pt-28 md:pb-24 lg:pt-32 lg:pb-28"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/IMG_1313.JPG"
          alt="Marokand sahnasidagi katta LED ekran"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-[#05020B]/85" />
      </div>

      {/* Soft vignette */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-[#05020B] via-[#05020B]/70 to-transparent" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 md:px-6 lg:px-8">
        {/* Hero copy */}
        <div className="max-w-xl md:max-w-2xl lg:max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-200">
            Konsert zali • Madaniyat maskani
          </p>
          <h1
            id="hero-heading"
            className="text-[2.2rem] leading-tight font-semibold tracking-tight text-white drop-shadow-[0_18px_60px_rgba(0,0,0,0.5)] sm:text-[2.4rem] md:text-[3rem] md:leading-[1.05]"
          >
            <span className="block">MAROKAND Konsert Zali.</span>
            <span className="block">
              <span className="block">Konsert Va Tadbirlar</span>
              <span className="block">Uchun</span>
            </span>
          </h1>

          <p className="mt-4 max-w-[676px] text-sm md:text-base leading-relaxed text-white/80">
            Marokand — zamonaviy texnologiyalar va qadimiy shaharning ruhi
            uyg‘unlashgan konsert maydoni. Siz bu yerda jonli musiqa,
            teatrlashtirilgan tomoshalar va nufuzli tadbirlarni bir sahnada
            his qilasiz.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Button size="lg">Batafsil</Button>
          </div>
        </div>

        {/* Feature cards row */}
        <div className="mt-10 md:mt-16 lg:mt-20">
          <div className="mx-auto flex max-w-6xl justify-center px-4 md:justify-end md:px-6 lg:px-8">
            <div className="card-row-mask grid w-full max-w-3xl grid-cols-1 gap-3 md:grid-cols-3 md:gap-5">
              <FeatureCard
                title="Zal haqida"
                description="Sayohat qilish orqali yurtni chuqurroq anglaysiz."
              />
              <FeatureCard
                title="Konsertlar"
                description="Mahalliy go‘zalliklarni yaqindan kashf eting."
              />
              <FeatureCard
                title="Ichki muhit"
                description="Qulay, xavfsiz, unutilmas safar tajribasi."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

