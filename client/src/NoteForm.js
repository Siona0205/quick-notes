import React, { useState } from 'react';
import './NoteForm.css'; // Import the CSS file for styling

function NoteForm({ onAddNote }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date();
    const note = {
      title,
      description,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      isoDate: now.toISOString(), // Add ISO date for reliable sorting
    };
    onAddNote(note);
    setTitle('');
    setDescription('');
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title"
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write your note here..."
          rows={3}
          required
        />
      </div>
      <button type="submit">Add Note</button>
    </form>
  );
}

export default NoteForm;
