import { useState, useEffect } from "react";
import axios from "axios";

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("/api/notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`/api/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Lista de notas</h1>
      <ul className="space-y-4">
        {notes.map((note) => (
          <li
            key={note._id}
            className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between"
          >
            <span className="text-lg font-semibold">{note.title}</span>
            <button
              onClick={() => deleteNote(note._id)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
