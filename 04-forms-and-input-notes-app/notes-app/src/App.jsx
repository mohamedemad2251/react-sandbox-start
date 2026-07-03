import { useState } from "react";
import NotesForm from "./components/NotesForm";
import Note from "./components/Note";
import { useEffect } from "react";

const App = () => {
  // For production, you'd use contextAPI or a global state management 3rd party like Redux, Zustand to handle global states. For this small project, we'll just create the global state here.
  // UPDATE: Instead of creating a new state (isInitialized), we can pass in to the default state a callback function that gets the notes from the localStorage (solves the problem as well)
  const [isInitialized, setIsInitialized] = useState(false);
  const [notes, setNotes] = useState([]);
  // NOTE: For deleteNote(), we did "prop drilling".
  // Prop drilling = sending the same props in multiple levels. Meaning, you send deleteNode, a callback function, as a prop into a child -> child -> child -> etc. This is not recommended. If the levels get too deep, use contextAPI (we don't know it yet. But it's something we should keep in mind)
  function deleteNote(note) {
    const updatedNotes = notes.filter((oldNote) => oldNote !== note);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?",
    );
    if (confirmDelete) {
      setNotes(updatedNotes);
    }
  }
  // LOCAL STORAGE IMPLEMENTATION
  useEffect(() => {
    const localNotes = JSON.parse(localStorage.getItem("notes"));
    setNotes(localNotes);

    setIsInitialized(true);

    return () => {
      setIsInitialized(false);
    };
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  return (
    <div className="w-2xl mt-10 mx-auto p-6 bg-gray-100 rounded-lg shadow-lg ">
      <h1 className="text-2xl font-bold text-center mb-5">📝 Notes App</h1>
      <NotesForm notes={notes} setNotes={setNotes} />
      <div className="flex flex-col gap-5">
        {notes.map((note) => (
          <Note key={note.id} note={note} deleteNote={deleteNote} />
        ))}
      </div>
    </div>
  );
};

export default App;
