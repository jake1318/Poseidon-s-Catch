import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

async function seed() {
  console.log("🌱 Seeding database...");

  // Sample menu items
  const menuItemsData = [
    {
      name: "Trilece",
      category: "desserts",
      description: "Traditional Albanian three-milk cake with caramel topping",
      price: "$5.00",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
      dietary: ["vegetarian"],
      featured: true,
    },
    {
      name: "Grilled Lamb Chops",
      category: "mains",
      description: "Tender lamb chops marinated in Mediterranean herbs, served with roasted vegetables",
      price: "$28.00",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
      dietary: ["gluten-free"],
      featured: true,
    },
    {
      name: "Mediterranean Hummus",
      category: "appetizers",
      description: "Creamy chickpea dip with tahini, olive oil, and fresh pita bread",
      price: "$8.00",
      image: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop",
      dietary: ["vegan", "vegetarian"],
      featured: false,
    },
    {
      name: "Byrek with Spinach",
      category: "appetizers",
      description: "Flaky phyllo pastry filled with fresh spinach and feta cheese",
      price: "$6.00",
      image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop",
      dietary: ["vegetarian"],
      featured: true,
    },
    {
      name: "Tavë Kosi",
      category: "mains",
      description: "Traditional baked lamb with rice in a creamy yogurt sauce",
      price: "$24.00",
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop",
      dietary: ["gluten-free"],
      featured: true,
    },
    {
      name: "Grilled Octopus",
      category: "mains",
      description: "Tender grilled octopus with olive oil, lemon, and herbs",
      price: "$26.00",
      image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop",
      dietary: ["gluten-free"],
      featured: false,
    },
    {
      name: "Baklava",
      category: "desserts",
      description: "Layers of phyllo pastry with honey and walnuts",
      price: "$6.00",
      image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400&h=300&fit=crop",
      dietary: ["vegetarian"],
      featured: false,
    },
    {
      name: "Albanian Raki",
      category: "drinks",
      description: "Traditional Albanian grape brandy",
      price: "$8.00",
      image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=300&fit=crop",
      dietary: [],
      featured: false,
    },
    {
      name: "Mediterranean Salad",
      category: "appetizers",
      description: "Fresh greens, tomatoes, cucumbers, olives, and feta cheese",
      price: "$9.00",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
      dietary: ["vegetarian", "gluten-free"],
      featured: false,
    },
  ];

  // Sample testimonials
  const testimonialsData = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "The Trilece dessert is absolutely divine! The atmosphere is warm and inviting. This is our new favorite spot for family dinners.",
      avatar: null,
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment: "Authentic Albanian cuisine at its finest. Adrian's passion for traditional recipes shines through every dish. Highly recommend!",
      avatar: null,
    },
    {
      name: "Emily Rodriguez",
      rating: 5,
      comment: "The ambiance and food quality are exceptional. The staff is friendly and knowledgeable. A true gem in Chicago!",
      avatar: null,
    },
    {
      name: "David Thompson",
      rating: 5,
      comment: "Best Mediterranean restaurant in the city! The grilled lamb chops are perfection.",
      avatar: null,
    },
  ];

  try {
    // Insert menu items
    await db.insert(schema.menuItems).values(menuItemsData);
    console.log(`✅ Inserted ${menuItemsData.length} menu items`);

    // Insert testimonials
    await db.insert(schema.testimonials).values(testimonialsData);
    console.log(`✅ Inserted ${testimonialsData.length} testimonials`);

    console.log("🎉 Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

seed();
