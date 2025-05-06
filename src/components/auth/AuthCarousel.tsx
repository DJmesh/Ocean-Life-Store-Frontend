"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const slides = [
  {
    title: "Produtos eco‑sustentáveis",
    text: "Cada item na Ocean Life Store é escolhido para causar o menor impacto ambiental possível.",
  },
  {
    title: "Compromisso social",
    text: "1 % do faturamento é destinado a ONGs que protegem os oceanos.",
  },
  {
    title: "Logística verde",
    text: "Embalagens recicláveis e compensação da pegada de carbono de cada entrega.",
  },
];

export default function AuthCarousel() {
  return (
    <Carousel className="w-full max-w-[420px]">
      <CarouselContent>
        {slides.map((s, i) => (
          <CarouselItem key={i}>
            <Card className="bg-gradient-to-br from-teal-600 to-cyan-700 text-white shadow-xl">
              <CardContent className="p-6 flex flex-col gap-2">
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="text-sm opacity-90">{s.text}</p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
