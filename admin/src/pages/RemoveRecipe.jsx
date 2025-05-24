import { useEffect, useState } from "react";
import axios from "axios";
import { recipes as staticRecipes } from "../../../shared/recipes";

export default function RemoveRecipe() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/recipes");
        const backendRecipes = response.data;

        const merged = [
          ...staticRecipes.map((r) => ({ ...r, source: "static" })),
          ...backendRecipes.map((r) => ({ ...r, source: "backend" })),
        ];

        setRecipes(merged);
      } catch (err) {
        console.error("Failed to fetch recipes:", err);
        setRecipes(staticRecipes);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleDelete = async (recipe) => {
    const updatedList = recipes.filter((r) =>
      recipe.source === "static" ? r.id !== recipe.id : r._id !== recipe._id
    );


    setRecipes(updatedList);
    setDeletingId(recipe._id || recipe.id);

    if (recipe.source === "backend") {
      try {
        await axios.delete(`http://localhost:5000/api/admin/recipes/${recipe._id}`);
      } catch (err) {
        console.error("Failed to delete backend recipe:", err);
        alert("Failed to delete. Please try again.");


        setRecipes(recipes);
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (loading) return <p className="text-center mt-6">Loading recipes...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Remove Recipes</h2>
      {recipes.length === 0 ? (
        <p className="text-gray-500">No recipes available.</p>
      ) : (
        <ul className="space-y-2">
          {recipes.map((recipe) => (
            <li
              key={recipe._id || recipe.id}
              className="flex items-center justify-between bg-white p-4 rounded-xl shadow hover:shadow-md transition"
            >
              <span>{recipe.name}</span>
              <button
                onClick={() => handleDelete(recipe)}
                disabled={deletingId === (recipe._id || recipe.id)}
                className={`${
                  deletingId === (recipe._id || recipe.id)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                } text-white px-3 py-1 rounded transition`}
              >
                {deletingId === (recipe._id || recipe.id) ? "Deleting..." : "Delete"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
