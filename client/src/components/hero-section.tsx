import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import restaurantImg from "@assets/images/restaurant-inside.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Enhanced Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[10s]"
        style={{ backgroundImage: `url(${restaurantImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-accent/20 to-primary/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 drop-shadow-2xl tracking-tight">
            Poseidon's Catch
          </h1>
          <p className="text-2xl md:text-3xl text-white/95 max-w-3xl mx-auto mb-6 drop-shadow-lg font-light">
            Authentic Greek seafood fresh from the Mediterranean
          </p>
          <p className="text-lg md:text-xl text-white/90 mb-12 drop-shadow-md font-medium">
            Family tradition since 1987 • Fresh from Aegean waters daily
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <Link href="/reservations">
            <Button
              size="lg"
              className="text-lg px-10 py-7 min-h-14 font-semibold shadow-2xl shadow-primary/50 hover:shadow-primary/70 transition-shadow"
              data-testid="button-hero-reserve"
            >
              Reserve a Table
            </Button>
          </Link>
          <Link href="/menu">
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-7 min-h-14 bg-white/10 backdrop-blur-md border-2 border-white/40 text-white hover:bg-white/20 font-semibold shadow-xl transition-all"
              data-testid="button-hero-menu"
            >
              View Menu
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
