import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import type { MenuItem } from "@shared/schema";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: menuItems = [], isLoading } = useQuery<MenuItem[]>({
    queryKey: ["/api/menu-items"],
  });

  const categories = [
    { value: "all", label: "All" },
    { value: "appetizers", label: "Appetizers" },
    { value: "mains", label: "Mains" },
    { value: "desserts", label: "Desserts" },
    { value: "drinks", label: "Drinks" },
  ];

  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const getDietaryBadgeVariant = (dietary: string) => {
    if (dietary === "vegan") return "default";
    if (dietary === "vegetarian") return "secondary";
    return "outline";
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-accent via-accent/80 to-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Our Menu
          </h1>
          <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto drop-shadow">
            Fresh catches from the Aegean, prepared with traditional Greek techniques
          </p>
        </div>
      </section>

      {/* Menu */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs
            defaultValue="all"
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="w-full"
          >
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-5 mb-16 h-auto p-1 bg-card/50 backdrop-blur-sm">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.value}
                  value={category.value}
                  data-testid={`tab-${category.value}`}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-base md:text-lg py-3 font-medium transition-all"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeCategory} className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="group hover-elevate overflow-hidden border-2 hover:border-primary/30 transition-all duration-300" data-testid={`card-menu-item-${item.id}`}>
                    {item.image && (
                      <div className="aspect-[4/3] overflow-hidden bg-muted">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    )}
                    <CardHeader className="space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="font-heading text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors">
                          {item.name}
                        </CardTitle>
                        <span className="text-2xl font-bold text-primary shrink-0 bg-primary/10 px-4 py-2 rounded-full">
                          {item.price}
                        </span>
                      </div>
                      <CardDescription className="text-base leading-relaxed">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    {item.dietary && item.dietary.length > 0 && (
                      <CardContent className="pt-0">
                        <div className="flex flex-wrap gap-2">
                          {item.dietary.map((diet) => (
                            <Badge
                              key={diet}
                              variant={getDietaryBadgeVariant(diet)}
                              className="text-xs font-medium"
                            >
                              {diet.charAt(0).toUpperCase() + diet.slice(1)}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {isLoading && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-6 w-20" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No items found in this category</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
