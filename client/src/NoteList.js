import React, { useState } from 'react';
import NoteForm from './NoteForm';

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [showNotes, setShowNotes] = useState(true);
  const [sortOrder, setSortOrder] = useState('latest');
  const [search, setSearch] = useState('');

  const addNote = (note) => {
    setNotes([note, ...notes]);
  };

  const deleteNote = (idx) => {
    setNotes(notes.filter((_, i) => i !== idx));
  };

  const filteredNotes = notes
    .filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.description.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      // Use ISO date for reliable sorting
      const dateA = new Date(a.isoDate);
      const dateB = new Date(b.isoDate);
      return sortOrder === 'latest' ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="notes-container">
      <NoteForm onAddNote={addNote} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <button onClick={() => setShowNotes((v) => !v)} style={{ padding: '6px 16px', borderRadius: 6, border: 'none', background: '#6366f1', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>
          {showNotes ? 'Hide Notes' : 'View All Notes'}
        </button>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: '1em' }}
          />
          <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: '1em' }}>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      {showNotes && (
        <div className="notes-list">
          <h3 style={{marginBottom: '18px'}}>All Notes</h3>
          {filteredNotes.length === 0 ? (
            <p style={{color: '#888'}}>No notes found.</p>
          ) : (
            <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
              {filteredNotes.map((note, idx) => (
                <li key={idx} className="note-item" style={{ position: 'relative' }}>
                  <button
                    onClick={() => deleteNote(notes.indexOf(note))}
                    style={{ position: 'absolute', top: 10, right: 10, background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Delete
                  </button>
                  <p><strong>Title:</strong> {note.title}</p>
                  <p><strong>Description:</strong> {note.description}</p>
                  <p style={{fontSize: '0.95em', color: '#6366f1'}}>
                    {note.date} &bull; {note.time}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default NoteList;
