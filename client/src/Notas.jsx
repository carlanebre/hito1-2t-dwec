import { useEffect, useState } from "react";
import axios from "axios";

const Notas = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("/api/notes");
        setNotes(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lista de Notas</h1>
      {notes.map((note) => (
        <div key={note._id} className="bg-gray-100 p-4 mb-4">
          <h2 className="text-xl font-bold mb-2">{note.title}</h2>
          <p>{note.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Notas;
