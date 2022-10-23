import Navbar from "./components/Navbar";

import About from "./routes/About";
import Career from "./routes/Career";
import Contact from "./routes/Contact";
import Gallery from "./routes/Gallery";
import Home from "./routes/Home";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import GalleryAdmin from "./routes/GalleryAdmin";
import CareerAdmin from "./components/CareerAdmin";
import Admin from "./routes/Admin";
import AdminNavbar from "./components/AdminNavbar";
import AdminLoginForm from "./components/AdminLoginForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="career" element={<Career />} />
          <Route path="contact" element={<Contact />} />
          <Route path="gallery" element={<Gallery />} />
        </Route>
        <Route path="adminlogin" element={<AdminLoginForm />} />
        <Route path="admin" element={<AdminNavbar />}>
          <Route index element={<Admin />} />
          <Route path="galleryadmin" element={<GalleryAdmin />} />
          <Route path="careeradmin" element={<CareerAdmin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
