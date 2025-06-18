import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import AddYourRecipe from "./pages/AddYourRecipe";

export default function App() {
  return (
    <div className="font-sans text-gray-800">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <Home />
            </>
          }
        />
        <Route path="/recipes/:id" element={<RecipeDetail />} /> 
        <Route path="/submit-recipe" element={<AddYourRecipe />} />
      </Routes>

      <Footer />
    </div>
  );
}
