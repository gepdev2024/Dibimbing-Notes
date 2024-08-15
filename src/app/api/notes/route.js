import { db } from '@vercel/postgres';

// Handle GET request to fetch all notes
export async function GET() {
  try {
    const result = await db.query('SELECT id, title, body, createdAt FROM notes ORDER BY createdAt DESC');
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching notes:', error);
    return new Response('Failed to fetch notes', { status: 500 });
  }
}

// Handle POST request to create a new note
export async function POST(request) {
  try {
    const { title, body } = await request.json();

    // Validate request body
    if (!title || !body) {
      return new Response(JSON.stringify({ message: 'Title and body are required' }), { status: 400 });
    }

    // Insert new note into the database
    const result = await db.query(
      'INSERT INTO notes (title, body, createdAt) VALUES ($1, $2, $3) RETURNING id, title, body, createdAt',
      [title, body, new Date().toISOString()]
    );

    const newNote = result.rows[0];

    return new Response(JSON.stringify(newNote), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating note:', error);
    return new Response('Failed to create note', { status: 500 });
  }
}
