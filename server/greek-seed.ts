import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

async function seed() {
  console.log("🌊 Seeding Greek seafood restaurant database...");

  // Greek seafood menu items
  const menuItemsData = [
    {
      name: "Grilled Octopus (Htapodi)",
      category: "appetizers",
      description: "Tender chargrilled octopus with olive oil, lemon, oregano, and capers",
      price: "$18.00",
      image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop",
      dietary: ["gluten-free"],
      featured: true,
    },
    {
      name: "Whole Grilled Sea Bass",
      category: "mains",
      description: "Fresh Mediterranean sea bass grilled whole with herbs, olive oil, and lemon",
      price: "$34.00",
      image: "https://images.unsplash.com/photo-1580959375944-c6f5f8c49bfc?w=400&h=300&fit=crop",
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
      name: "Taramosalata",
      category: "appetizers",
      description: "Traditional Greek fish roe dip with olive oil, lemon, and toasted pita",
      price: "$10.00",
      image: "https://images.unsplash.com/photo-1621852004158-f3bc188ace2d?w=400&h=300&fit=crop",
      dietary: ["vegetarian"],
      featured: false,
    },
    {
      name: "Grilled Calamari",
      category: "appetizers",
      description: "Tender squid grilled with garlic, parsley, and drizzled with lemon",
      price: "$16.00",
      image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400&h=300&fit=crop",
      dietary: ["gluten-free"],
      featured: true,
    },
    {
      name: "Lobster Pasta",
      category: "mains",
      description: "Fresh lobster with handmade pasta, tomato sauce, and Aegean herbs",
      price: "$42.00",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
      dietary: [],
      featured: false,
    },
    {
      name: "Greek Salad (Horiatiki)",
      category: "appetizers",
      description: "Tomatoes, cucumbers, olives, feta, onions with oregano and olive oil",
      price: "$12.00",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
      dietary: ["vegetarian", "gluten-free"],
      featured: false,
    },
    {
      name: "Seafood Moussaka",
      category: "mains",
      description: "Layered eggplant, mixed seafood, and béchamel sauce baked golden",
      price: "$26.00",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
      dietary: [],
      featured: false,
    },
    {
      name: "Baklava",
      category: "desserts",
      description: "Layers of phyllo with honey, walnuts, and Greek cinnamon",
      price: "$8.00",
      image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400&h=300&fit=crop",
      dietary: ["vegetarian"],
      featured: false,
    },
    {
      name: "Ouzo",
      category: "drinks",
      description: "Traditional Greek anise-flavored aperitif, served chilled",
      price: "$9.00",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop",
      dietary: [],
      featured: false,
    },
    {
      name: "Red Mullet (Barbouni)",
      category: "mains",
      description: "Pan-fried Aegean red mullet with ladolemono sauce and greens",
      price: "$29.00",
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop",
      dietary: ["gluten-free"],
      featured: false,
    },
  ];

  // Greek-themed testimonials
  const testimonialsData = [
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
  ];

  try {
    // Clear existing data
    await db.delete(schema.menuItems);
    await db.delete(schema.testimonials);
    console.log("✅ Cleared existing data");

    // Insert Greek seafood menu
    await db.insert(schema.menuItems).values(menuItemsData);
    console.log(`✅ Inserted ${menuItemsData.length} Greek seafood items`);

    // Insert testimonials
    await db.insert(schema.testimonials).values(testimonialsData);
    console.log(`✅ Inserted ${testimonialsData.length} testimonials`);

    console.log("🎉 Greek seafood restaurant database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

seed();
