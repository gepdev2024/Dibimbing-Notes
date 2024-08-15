// src/app/seed/route.js
import { config } from 'dotenv';
config(); // Load environment variables

import { db } from '@vercel/postgres';

const seedNotes = async () => {
  try {
    // Create the notes table if it doesn't exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        body TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insert seed data into the notes table
    await db.query(`
      INSERT INTO notes (title, body) VALUES 
      ('First Note', 'This is the body of the first note.'),
      ('Second Note', 'This is the body of the second note.'),
      ('Third Note', 'This is the body of the third note.');
    `);

    console.log("Table creation and seeding completed successfully.");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    // Note: Closing the connection is not necessary for @vercel/postgres
    // but you can use `await db.end();` if needed
  }
};

seedNotes();
