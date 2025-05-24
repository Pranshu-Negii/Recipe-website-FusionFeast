import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { recipes as staticRecipes } from "../../../shared/recipes";
import { FaStar } from "react-icons/fa";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const isNumericId = !isNaN(id);

    if (isNumericId) {
      const staticRecipe = staticRecipes.find((r) => r.id === parseInt(id));
      if (staticRecipe) {
        setRecipe(staticRecipe);
        return;
      }
    }

    axios
      .get(`http://localhost:5000/api/recipes/${id}`)
      .then((res) => setRecipe(res.data))
      .catch((err) => {
        console.error("Failed to fetch recipe:", err);
        setRecipe({ notFound: true });
      });
  }, [id]);

  if (!recipe) {
    return <div className="p-6 text-gray-600">Loading recipe...</div>;
  }

  if (recipe.notFound) {
    return <div className="p-6 text-red-600 font-semibold">Recipe not found.</div>;
  }

  const imageUrl = recipe.image?.startsWith("http")
    ? recipe.image
    : `http://localhost:5000${recipe.image}`;

    const steps =
    recipe.steps ||
    recipe.instructions ||
    (recipe.howToCook ? recipe.howToCook.split("\n") : []);
  

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Link to="/" className="text-blue-500 hover:underline block mb-4">
        ← Back to Recipes
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src={imageUrl}
            alt={recipe.name}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Details Section */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-3">{recipe.name}</h1>
          <div className="space-y-1 text-gray-800">
            <p><strong>Cuisine:</strong> {recipe.cuisine || "N/A"}</p>
            <p><strong>Dietary:</strong> {recipe.dietary || "N/A"}</p>
            <p><strong>Preparation Time:</strong> {recipe.prepTime || "N/A"}</p>
            {recipe.rating && (
              <p className="flex items-center gap-1">
                <strong>Rating:</strong> <FaStar className="text-yellow-500" /> {recipe.rating}
              </p>
            )}
          </div>

          {/* Introduction */}
          {(recipe.introduction || recipe.description) && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Introduction</h2>
              <p className="text-gray-700">{recipe.introduction || recipe.description}</p>
            </div>
          )}

          {/* Ingredients */}
          {recipe.ingredients?.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {recipe.ingredients.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Cooking Steps */}
          {steps.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">How to Cook</h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                {steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
