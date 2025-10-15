import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function ContactSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Visit Us
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience authentic Greek seafood by the coast
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-4">
            <Card className="hover-elevate">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Address</CardTitle>
                  <CardDescription>456 Harbor Drive, Chicago, IL 60611</CardDescription>
                </div>
              </CardHeader>
            </Card>

            <Card className="hover-elevate">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Phone</CardTitle>
                  <CardDescription>(312) 555-0123</CardDescription>
                </div>
              </CardHeader>
            </Card>

            <Card className="hover-elevate">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Email</CardTitle>
                  <CardDescription>info@poseidonscatch.com</CardDescription>
                </div>
              </CardHeader>
            </Card>

            <Card className="hover-elevate">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Hours</CardTitle>
                  <CardDescription>Monday - Sunday: 9:00 AM - 12:00 AM</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Map Placeholder */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                <div className="text-center p-6">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Map location</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    456 Harbor Drive, Chicago, IL 60611
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
