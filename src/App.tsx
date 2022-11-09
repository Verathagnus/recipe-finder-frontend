import Navbar from "./components/Navbar";

import About from "./routes/About";
import Contact from "./routes/Contact";
import Gallery from "./routes/Gallery";
import Home from "./routes/Home";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import GalleryAdmin from "./routes/GalleryAdmin";
import Admin from "./routes/Admin";
import AdminNavbar from "./components/AdminNavbar";
import AdminProfile from "./components/AdminProfile";
import AdminLoginForm from "./components/AdminLoginForm";
import Recipes from "./routes/Recipes";
import Ingredients from "./routes/Ingredients";
import IngredientsAdmin from "./components/IngredientsAdmin";
import { useEffect } from "react";
import Recipe from "./routes/Recipe";
import Ingredient from "./routes/Ingredient";
import RecipesAdmin from "./components/RecipesAdmin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="recipes/:id" element={<Recipe/>}/>
          <Route path="ingredients" element={<Ingredients />} />
          <Route path="ingredients/:id" element={<Ingredient />} />
          <Route path="contact" element={<Contact />} />
          <Route path="gallery" element={<Gallery />} />
        </Route>
        <Route path="adminlogin" element={<AdminLoginForm />} />
        <Route path="admin" element={<AdminNavbar />}>
          <Route index element={<Admin />} />
          <Route path="adminprofile" element={<AdminProfile />} />
          <Route path="galleryadmin" element={<GalleryAdmin />} />
          <Route path="recipesadmin" element={<RecipesAdmin />} />
          <Route path="ingredientsadmin" element={<IngredientsAdmin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
