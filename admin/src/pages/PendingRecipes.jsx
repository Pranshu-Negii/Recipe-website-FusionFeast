import React, { useEffect, useState } from "react";
import axios from "axios";

const PendingRecipes = () => {
  const [pendingRecipes, setPendingRecipes] = useState([]);

  useEffect(() => {
    fetchPendingRecipes();

    const interval = setInterval(fetchPendingRecipes, 5000);
    return () => clearInterval(interval); 
  }, []);

  const fetchPendingRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/recipes?status=pending");
      setPendingRecipes(res.data);
    } catch (error) {
      console.error("Error fetching pending recipes:", error);
    }
  };

  const handleApprove = async (recipe) => {
    try {
      await axios.patch(`http://localhost:5000/api/recipes/${recipe._id}/approve`);
      fetchPendingRecipes();
    } catch (error) {
      console.error("Error approving recipe:", error);
    }
  };
  

  const handleReject = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/recipes/${id}/reject`);
      setPendingRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
    } catch (error) {
      console.error("Error rejecting recipe:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Recipes</h2>
      {pendingRecipes.length === 0 ? (
        <p>No pending recipes.</p>
      ) : (
        <div className="grid gap-4">
          {pendingRecipes.map((recipe) => (
            <div key={recipe._id} className="border rounded p-4 shadow bg-white">
              <h3 className="text-2xl font-semibold mb-1">{recipe.name || "No Name"}</h3>
              {recipe.image && (
                <img
                src={`http://localhost:5000${recipe.image}`}
                alt={recipe.name}
                className="w-full max-w-sm mb-4 rounded"
              />              
              )}
              <p><strong>Cuisine:</strong> {recipe.cuisine || "N/A"}</p>
              <p><strong>Dietary:</strong> {recipe.dietary || "N/A"}</p>
              <p><strong>Preparation Time:</strong> {recipe.prepTime || "N/A"}</p>
              <p><strong>Introduction:</strong> {recipe.introduction || "N/A"}</p>
              <p><strong>Ingredients:</strong> {(recipe.ingredients || []).join(", ")}</p>
              <p><strong>How to Cook:</strong> {recipe.howToCook || "N/A"}</p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleApprove(recipe)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(recipe._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingRecipes;
