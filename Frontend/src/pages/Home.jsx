import { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import Filters from "../components/Filters";
import { recipes as staticRecipes } from "../../../shared/recipes";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    Cuisine: [],
    "Dietary Preferences": [],
    "Preparation Time": [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/recipes?status=approved")
      .then((res) => {
        const approvedRecipes = res.data;
        const combinedRecipes = [...staticRecipes, ...approvedRecipes];

        const uniqueRecipes = Array.from(
          new Map(combinedRecipes.map((item) => [item.name, item])).values()
        );

        setRecipes(uniqueRecipes);
      })
      .catch((err) => {
        console.error("Error fetching approved recipes:", err);
        setRecipes(staticRecipes);
      });
  }, []);

  const getRecipeTimeInMinutes = (timeStr) => {
    if (timeStr === "< 30 minutes") return 20;
    if (timeStr === "30-60 minutes" || timeStr === "< 1 hour") return 45;
    if (timeStr === "> 1 hour") return 75;
    return 0;
  };

  const suggestions = recipes
    .filter((recipe) =>
      recipe.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((recipe) => recipe.name)
    .slice(0, 5);

  const filteredRecipes = recipes.filter((recipe) => {
    const name = recipe.name?.toLowerCase() || "";
    const cuisine = recipe.cuisine || "";
    const dietary = recipe.dietary || "";
    const prepTime = recipe.prepTime || "";

    const matchesSearch = name.includes(searchTerm.toLowerCase());

    const matchesCuisine =
      selectedFilters.Cuisine.length === 0 ||
      selectedFilters.Cuisine.includes(cuisine);

    const matchesDiet =
      selectedFilters["Dietary Preferences"].length === 0 ||
      selectedFilters["Dietary Preferences"].includes(dietary);

    const matchesTime =
      selectedFilters["Preparation Time"].length === 0 ||
      selectedFilters["Preparation Time"].some((selectedTime) => {
        const recipeTime = getRecipeTimeInMinutes(prepTime);
        if (selectedTime === "< 30 minutes") return recipeTime < 30;
        if (selectedTime === "< 1 hour") return recipeTime <= 60;
        if (selectedTime === "> 1 hour") return recipeTime > 60;
        return true;
      });

    return matchesSearch && matchesCuisine && matchesDiet && matchesTime;
  });

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="flex px-6 mt-6">
      <div className="w-64 relative">
        <Filters
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />

        <input
          type="text"
          placeholder="Search recipes..."
          className="mt-4 w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}
        />

        {showSuggestions && searchTerm.length > 0 && (
          <ul className="absolute mt-1 w-full bg-white border rounded shadow z-10 max-h-40 overflow-y-auto">
            {suggestions.length > 0 ? (
              suggestions.map((sug, index) => (
                <li
                  key={index}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(sug)}
                >
                  {sug}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500">No matches found</li>
            )}
          </ul>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 ml-6">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe._id || recipe.id}
            id={recipe._id || recipe.id}
            name={recipe.name}
            image={recipe.image}
            rating={recipe.rating}
          />
        ))}
      </div>
    </div>
  );
}
