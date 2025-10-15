import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

async function seedDatabase() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool, { schema });

  console.log("🌊 Seeding Poseidon's Catch database...");

  // Greek Seafood Menu Items
  const menuItems = [
    {
      name: "Grilled Octopus (Htapodi)",
      category: "appetizers",
      description: "Tender chargrilled octopus with olive oil, lemon, oregano, and capers",
      price: "$18.00",
      image: "/images/grilled-octopus.png",
      dietary: ["gluten-free"],
      featured: true,
    },
    {
      name: "Saganaki Cheese",
      category: "appetizers",
      description: "Pan-fried Greek cheese flambéed with ouzo, served with fresh lemon",
      price: "$12.00",
      image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=300&fit=crop",
      dietary: ["vegetarian"],
      featured: false,
    },
    {
      name: "Grilled Calamari",
      category: "appetizers",
      description: "Tender squid grilled with garlic, parsley, and drizzled with lemon",
      price: "$16.00",
      image: "/images/grilled-calamari.png",
      dietary: ["gluten-free"],
      featured: false,
    },
    {
      name: "Taramosalata",
      category: "appetizers",
      description: "Traditional Greek fish roe dip with olive oil, lemon, and toasted pita",
      price: "$10.00",
      image: "https://images.unsplash.com/photo-1621852004158-f3bc188ace2d?w=400&h=300&fit=crop",
      dietary: ["vegetarian"],
      featured: false,
    },
    {
      name: "Whole Grilled Sea Bass",
      category: "mains",
      description: "Fresh Mediterranean sea bass grilled whole with herbs, olive oil, and lemon",
      price: "$34.00",
      image: "/images/grilled-sea-bass.png",
      dietary: ["gluten-free"],
      featured: true,
    },
    {
      name: "Saganaki Prawns",
      category: "mains",
      description: "Jumbo prawns sautéed with tomatoes, feta, ouzo, and fresh herbs",
      price: "$28.00",
      image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=300&fit=crop",
      dietary: ["gluten-free"],
      featured: true,
    },
    {
      name: "Seafood Moussaka",
      category: "mains",
      description: "Traditional moussaka with layers of eggplant, shrimp, scallops, and béchamel",
      price: "$26.00",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
      dietary: [],
      featured: false,
    },
    {
      name: "Grilled Swordfish",
      category: "mains",
      description: "Fresh swordfish steak marinated in olive oil, oregano, and garlic",
      price: "$32.00",
      image: "/images/grilled-swordfish.png",
      dietary: ["gluten-free"],
      featured: false,
    },
    {
      name: "Baklava",
      category: "desserts",
      description: "Layers of phyllo pastry with honey, walnuts, and pistachios",
      price: "$8.00",
      image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400&h=300&fit=crop",
      dietary: ["vegetarian"],
      featured: false,
    },
    {
      name: "Greek Yogurt with Honey",
      category: "desserts",
      description: "Thick Greek yogurt drizzled with Aegean honey and crushed walnuts",
      price: "$6.00",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",
      dietary: ["vegetarian", "gluten-free"],
      featured: false,
    },
    {
      name: "Ouzo",
      category: "drinks",
      description: "Traditional Greek anise-flavored aperitif, served with ice water",
      price: "$9.00",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop",
      dietary: ["vegan", "gluten-free"],
      featured: false,
    },
    {
      name: "Greek White Wine",
      category: "drinks",
      description: "Assyrtiko from Santorini - crisp, mineral, perfect with seafood",
      price: "$12.00",
      image: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&h=300&fit=crop",
      dietary: ["vegan", "gluten-free"],
      featured: false,
    },
    {
      name: "Lobster Pasta",
      category: "mains",
      description: "Fresh lobster with linguine in a light tomato and white wine sauce",
      price: "$38.00",
      image: "/images/lobster-pasta.png",
      dietary: [],
      featured: true,
    },
  ];

  console.log(`📝 Inserting/updating ${menuItems.length} menu items...`);
  
  // First, clear existing menu items to ensure fresh data
  await db.delete(schema.menuItems);
  
  // Then insert all menu items
  for (const item of menuItems) {
    await db.insert(schema.menuItems).values(item);
  }

  // Customer Testimonials
  const testimonials = [
    {
      name: "Sophia Martinez",
      rating: 5,
      comment: "The grilled octopus was perfection! Transported me straight to the Greek islands. The sea bass was incredibly fresh.",
      avatar: null,
    },
    {
      name: "James Patterson",
      rating: 5,
      comment: "Authentic Greek seafood at its finest. The saganaki prawns with ouzo were divine. Best coastal dining in the city!",
      avatar: null,
    },
    {
      name: "Maria Kostas",
      rating: 5,
      comment: "Finally, a restaurant that captures true Aegean flavors! The whole sea bass reminded me of summers in Santorini.",
      avatar: null,
    },
    {
      name: "Alexander Chen",
      rating: 5,
      comment: "Outstanding fresh seafood and impeccable service. The terrace with ocean views made it a perfect anniversary dinner.",
      avatar: null,
    },
    {
      name: "Elena Papadakis",
      rating: 5,
      comment: "As a Greek native, I can say this is the real deal. The flavors, the preparation, everything is authentic and delicious!",
      avatar: null,
    },
    {
      name: "David Thompson",
      rating: 5,
      comment: "The lobster pasta was incredible! Fresh ingredients, generous portions, and the ambiance is perfect for a romantic dinner.",
      avatar: null,
    },
  ];

  console.log(`💬 Inserting/updating ${testimonials.length} testimonials...`);
  
  // Clear existing testimonials to ensure fresh data
  await db.delete(schema.testimonials);
  
  // Then insert all testimonials
  for (const testimonial of testimonials) {
    await db.insert(schema.testimonials).values(testimonial);
  }

  console.log("✅ Database seeding complete!");
  
  // Verify counts
  const menuCount = await db.select().from(schema.menuItems);
  const testimonialCount = await db.select().from(schema.testimonials);
  
  console.log(`📊 Final counts: ${menuCount.length} menu items, ${testimonialCount.length} testimonials`);
  
  await pool.end();
  process.exit(0);
}

seedDatabase().catch((error) => {
  console.error("❌ Error seeding database:", error);
  process.exit(1);
});
