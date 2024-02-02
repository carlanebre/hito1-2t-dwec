import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login"; // Import the Login component
import Blog from "./Blog";
import Borrar from "./Borrar";
import Nav from "./components/nav";
import Users from "./Users";
import Update from "./Update";
import Notas from "./Notas";

function App() {
  return (
    <>
      <Nav />

      <Router>
        <Routes>
          <Route exact path="/*" element={<Login />} />
          <Route exact path="/notas" element={<Notas />} />
          <Route exact path="/blog" element={<Blog />} />
          <Route exact path="/delete" element={<Borrar />} />
          <Route exact path="/update" element={<Update />} />
          <Route exact path="/users" element={<Users />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
