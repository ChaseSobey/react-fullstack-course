import Note from './components/Notes';
import { useState, useEffect } from 'react';
import noteService from './services/notes';

function App(props) {
  const [ notes, setNotes ] = useState([]);
  const [ newNote, setNewNote ] = useState('a new note...');
  const [ showAll, setShowAll ] = useState(true);

  function hook() {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes);
    });
  }
  useEffect(hook, []);

  function toggleImportance(id) {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService.update(id, changedNote).then(returnedNote => {
      setNotes(notes.map(note => note.id === id ? returnedNote : note ));
    });
  };

  function addNote(event) {
    event.preventDefault();
    const noteObj = {
      content: newNote,
      important: Math.random() > 0.5,
    };

    noteService.create(noteObj).then(newNote => {
      setNotes(notes.concat(newNote));
      setNewNote('');
    });
  }
  function handleNoteChange(event) {
    setNewNote(event.target.value);
  }

  const notesToShow = showAll ?
    notes : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show { showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App;