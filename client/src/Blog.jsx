import { useState } from "react";

const Blog = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState([]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, text }),
      });
      if (response.ok) {
        console.log("Nota guardada correctamente");
        // Agregar la nueva nota al principio del array
        setNotes([{ title, text }, ...notes]);
        setTitle("");
        setText("");
      } else {
        console.error("Error al guardar la nota");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Título:
          </label>
          <input
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="text"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Texto:
          </label>
          <textarea
            id="text"
            name="text"
            value={text}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Guardar
        </button>
      </form>

      <div className="mt-8 max-w-md mx-auto">
        {notes.map((note, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold">{note.title}</h3>
            <p className="text-gray-700">{note.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
