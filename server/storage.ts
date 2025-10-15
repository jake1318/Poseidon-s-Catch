import { type User, type InsertUser, type MenuItem, type InsertMenuItem, type Reservation, type InsertReservation, type Testimonial, type InsertTestimonial } from "@shared/schema";
import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { eq } from "drizzle-orm";
import * as schema from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Menu Item methods
  getAllMenuItems(): Promise<MenuItem[]>;
  getMenuItemById(id: string): Promise<MenuItem | undefined>;
  getMenuItemsByCategory(category: string): Promise<MenuItem[]>;
  getFeaturedMenuItems(): Promise<MenuItem[]>;
  
  // Reservation methods
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  getAllReservations(): Promise<Reservation[]>;
  getReservationById(id: string): Promise<Reservation | undefined>;
  
  // Testimonial methods
  getAllTestimonials(): Promise<Testimonial[]>;
  getTestimonialById(id: string): Promise<Testimonial | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private menuItems: Map<string, MenuItem>;
  private reservations: Map<string, Reservation>;
  private testimonials: Map<string, Testimonial>;

  constructor() {
    this.users = new Map();
    this.menuItems = new Map();
    this.reservations = new Map();
    this.testimonials = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample menu items - using placeholder image service for now
    const sampleMenuItems: Omit<MenuItem, 'id'>[] = [
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
    ];

    sampleMenuItems.forEach(item => {
      const id = randomUUID();
      this.menuItems.set(id, { ...item, id });
    });

    // Sample testimonials
    const sampleTestimonials: Omit<Testimonial, 'id'>[] = [
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
    ];

    sampleTestimonials.forEach(testimonial => {
      const id = randomUUID();
      this.testimonials.set(id, { ...testimonial, id });
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Menu Item methods
  async getAllMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values());
  }

  async getMenuItemById(id: string): Promise<MenuItem | undefined> {
    return this.menuItems.get(id);
  }

  async getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values()).filter(
      (item) => item.category === category,
    );
  }

  async getFeaturedMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values()).filter(
      (item) => item.featured === true,
    );
  }

  // Reservation methods
  async createReservation(insertReservation: InsertReservation): Promise<Reservation> {
    const id = randomUUID();
    const reservation: Reservation = {
      ...insertReservation,
      id,
      createdAt: new Date(),
      specialRequests: insertReservation.specialRequests ?? null,
    };
    this.reservations.set(id, reservation);
    return reservation;
  }

  async getAllReservations(): Promise<Reservation[]> {
    return Array.from(this.reservations.values());
  }

  async getReservationById(id: string): Promise<Reservation | undefined> {
    return this.reservations.get(id);
  }

  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getTestimonialById(id: string): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }
}

// Database Storage Implementation
export class DbStorage implements IStorage {
  private db;

  constructor() {
    neonConfig.webSocketConstructor = ws;
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    this.db = drizzle(pool, { schema });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await this.db.query.users.findFirst({
      where: eq(schema.users.id, id),
    });
    return result;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.query.users.findFirst({
      where: eq(schema.users.username, username),
    });
    return result;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await this.db.insert(schema.users).values(insertUser).returning();
    return user;
  }

  // Menu Item methods
  async getAllMenuItems(): Promise<MenuItem[]> {
    return await this.db.query.menuItems.findMany();
  }

  async getMenuItemById(id: string): Promise<MenuItem | undefined> {
    const result = await this.db.query.menuItems.findFirst({
      where: eq(schema.menuItems.id, id),
    });
    return result;
  }

  async getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
    return await this.db.query.menuItems.findMany({
      where: eq(schema.menuItems.category, category),
    });
  }

  async getFeaturedMenuItems(): Promise<MenuItem[]> {
    return await this.db.query.menuItems.findMany({
      where: eq(schema.menuItems.featured, true),
    });
  }

  // Reservation methods
  async createReservation(insertReservation: InsertReservation): Promise<Reservation> {
    const [reservation] = await this.db
      .insert(schema.reservations)
      .values(insertReservation)
      .returning();
    return reservation;
  }

  async getAllReservations(): Promise<Reservation[]> {
    return await this.db.query.reservations.findMany();
  }

  async getReservationById(id: string): Promise<Reservation | undefined> {
    const result = await this.db.query.reservations.findFirst({
      where: eq(schema.reservations.id, id),
    });
    return result;
  }

  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return await this.db.query.testimonials.findMany();
  }

  async getTestimonialById(id: string): Promise<Testimonial | undefined> {
    const result = await this.db.query.testimonials.findFirst({
      where: eq(schema.testimonials.id, id),
    });
    return result;
  }
}

// Use database storage in production, memory storage for local dev if needed
export const storage = new DbStorage();
