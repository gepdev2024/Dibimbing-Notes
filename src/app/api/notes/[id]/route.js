import { db } from '@vercel/postgres';

// Handle GET request to fetch a note by ID
export async function GET(request) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop(); // Extract ID from URL

  try {
    // Debug: Log the ID
    console.log(`Fetching note with ID: ${id}`);

    const result = await db.query('SELECT * FROM notes WHERE id = $1', [id]);
    const note = result.rows[0];

    // Debug: Log the fetched note
    console.log('Fetched note:', note);

    if (!note) {
      return new Response(JSON.stringify({ message: 'Note not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(note), { status: 200 });
  } catch (error) {
    console.error('Error fetching note:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}

// Handle PUT request to update a note by ID
export async function PUT(request) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop(); // Extract ID from URL

  try {
    const { title, body } = await request.json();

    // Debug: Log the incoming data
    console.log(`Updating note with ID: ${id}`);
    console.log('Request data:', { title, body });

    if (!title || !body) {
      return new Response(JSON.stringify({ message: 'Invalid request data' }), { status: 400 });
    }

    const result = await db.query(
      'UPDATE notes SET title = $1, body = $2 WHERE id = $3 RETURNING *',
      [title, body, id]
    );

    const updatedNote = result.rows[0];

    // Debug: Log the updated note
    console.log('Updated note:', updatedNote);

    if (!updatedNote) {
      return new Response(JSON.stringify({ message: 'Note not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(updatedNote), { status: 200 });
  } catch (error) {
    console.error('Error updating note:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}

// Handle DELETE request to delete a note by ID
export async function DELETE(request) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop(); // Extract ID from URL

  try {
    const result = await db.query('DELETE FROM notes WHERE id = $1 RETURNING *', [id]);
    const deletedNote = result.rows[0];

    // Debug: Log the deleted note
    console.log('Deleted note:', deletedNote);

    if (!deletedNote) {
      return new Response(JSON.stringify({ message: 'Note not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(deletedNote), { status: 200 });
  } catch (error) {
    console.error('Error deleting note:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}

