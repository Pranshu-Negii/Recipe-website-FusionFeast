import { useEffect, useState } from "react";
import axios from "axios";

export default function ApprovedRecipes() {
  const [approved, setApproved] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/recipes?status=approved")
      .then(res => setApproved(res.data))
      .catch(err => console.error("Error fetching approved:", err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Approved Recipes</h2>
      <ul className="list-disc pl-5">
        {approved.map(recipe => (
          <li key={recipe._id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
}
