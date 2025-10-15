export function AboutSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src="/images/athens-acropolis.png"
                alt="Athens, Greece - The heart of Greek culture and cuisine"
                className="w-full h-full object-cover"
                data-testid="img-about-story"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-base md:text-lg">
                Poseidon's Catch is a family-owned Greek seafood restaurant bringing the authentic flavors of the Mediterranean coast to Chicago. Founded in 1987 by the Papadopoulos family, we've been sourcing the freshest catch from Aegean waters for over three decades.
              </p>
              <p className="text-base md:text-lg">
                Our chef, Nikos, comes from a long line of Greek fishermen and cooks. Growing up on the island of Crete, he learned the traditional methods of preparing seafood - from grilling octopus to perfecting saganaki prawns. Every dish tells a story of coastal Greek heritage.
              </p>
              <p className="text-base md:text-lg">
                We're committed to sustainable fishing practices and work directly with trusted suppliers to ensure the highest quality seafood reaches your table. At Poseidon's Catch, we don't just serve food - we share the spirit of Greek island hospitality.
              </p>
            </div>
            <div className="mt-8 p-6 bg-accent/20 rounded-lg border border-accent-border">
              <p className="font-accent italic text-lg text-foreground">
                "The sea provides everything - we honor it with every dish we serve."
              </p>
              <p className="text-sm text-muted-foreground mt-2">— Nikos Papadopoulos, Owner & Head Chef</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
