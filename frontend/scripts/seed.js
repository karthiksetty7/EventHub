import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { createClient } from "@libsql/client";

// Get current file directory to resolve .env path reliably
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly point to the .env file in the backend root directory
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Initialize the database client
const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const seedData = async () => {
  try {
    console.log("🌱 Starting database seed...");

    // 1. Clear existing event data to prevent duplicates
    await db.execute("DELETE FROM seat_inventory");
    await db.execute("DELETE FROM events");

    console.log("🧹 Old event data cleared.");

    // 2. Insert new seed events
    // Ensure 'organizer_id' matches your 'Event Organizer' ID (which is 6)
    const insertQuery = `
      INSERT INTO events 
      (organizer_id, title, description, category, location, event_date, event_time, total_seats, available_seats, base_price, current_price, image_url) 
      VALUES 
      (8, 'React Developer Conference', 'A full day conference on modern web development', 'Technology', 'Hyderabad', '2026-08-15', '10:00 AM', 50, 50, 999, 999, 'https://images.unsplash.com/photo-1511578314322-379afb476865'),
      (8, 'Music Fiesta Night', 'An electrifying live music concert', 'Music', 'Bangalore', '2026-09-05', '07:00 PM', 100, 100, 1499, 1499, 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a'),
      (8, 'Startup Networking Meetup', 'Connect with industry founders and peers', 'Business', 'Chennai', '2026-07-22', '05:00 PM', 75, 75, 799, 799, 'https://images.unsplash.com/photo-1515169067868-5387ec356754')
    `;

    await db.execute(insertQuery);

    console.log("✅ Events seeded successfully! Refresh your Admin Dashboard.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
