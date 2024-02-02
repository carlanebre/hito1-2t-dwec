import { useState, useEffect } from "react";
import axios from "axios";

const UpdateNote = () => {
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedNoteTitle, setEditedNoteTitle] = useState("");

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

  const editNote = (id, title) => {
    setEditingNoteId(id);
    setEditedNoteTitle(title);
  };

  const updateNote = async (id) => {
    try {
      await axios.put(`/api/notes/${id}`, { title: editedNoteTitle });
      setEditingNoteId(null);
      setEditedNoteTitle("");
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
            {editingNoteId === note._id ? (
              <input
                type="text"
                value={editedNoteTitle}
                onChange={(e) => setEditedNoteTitle(e.target.value)}
                className="text-lg font-semibold"
              />
            ) : (
              <span className="text-lg font-semibold">{note.title}</span>
            )}
            <div>
              {editingNoteId === note._id ? (
                <button
                  onClick={() => updateNote(note._id)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => editNote(note._id, note.title)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteNote(note._id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdateNote;
