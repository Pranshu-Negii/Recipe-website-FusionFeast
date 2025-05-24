import { useEffect, useState } from "react";
import axios from "axios";
import { recipes as staticRecipes } from "../../../shared/recipes"; 

export default function ExistingRecipes() {
  const [dynamicRecipes, setDynamicRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/recipes?status=approved")
      .then((res) => setDynamicRecipes(res.data))
      .catch((err) => console.error("Failed to fetch recipes:", err));
  }, []);

  // Merge static and dynamic recipes
  const allRecipes = [...staticRecipes, ...dynamicRecipes];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Existing Recipes</h2>
      {allRecipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <ul className="space-y-2">
          {allRecipes.map((recipe, index) => (
            <li
              key={recipe._id || recipe.id || index}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
            >
              {recipe.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
