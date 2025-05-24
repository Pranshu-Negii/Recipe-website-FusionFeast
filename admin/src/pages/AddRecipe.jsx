import { useState } from "react";
import axios from "axios";

export default function AddRecipe() {
  const [formData, setFormData] = useState({
    name: "",
    cuisine: "",
    dietary: "",
    prepTime: "",
    introduction: "",
    ingredients: "",
    howToCook: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && name === "image") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await axios.post("http://localhost:5000/api/admin/recipes", data);

      //LocalStorage trick to notify other tabs/windows
      localStorage.setItem("recipeAdded", Date.now());

      alert("Recipe added successfully!");

      // Optionally reset form
      setFormData({
        name: "",
        cuisine: "",
        dietary: "",
        prepTime: "",
        introduction: "",
        ingredients: "",
        howToCook: "",
        image: null,
      });
      setImagePreview(null);
    } catch (err) {
      console.error("Submit Error:", err);
      alert("Submission failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4">Add Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={formData.name}
          required
          className="border p-2 w-full"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full"
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-48 object-cover rounded border"
          />
        )}

        <select
          name="cuisine"
          onChange={handleChange}
          value={formData.cuisine}
          required
          className="border p-2 w-full"
        >
          <option value="">Select Cuisine</option>
          <option value="Indian">Indian</option>
          <option value="Italian">Italian</option>
          <option value="Chinese">Chinese</option>
          <option value="Mexican">Mexican</option>
          <option value="Thai">Thai</option>
        </select>


        <select
          name="dietary"
          onChange={handleChange}
          value={formData.dietary}
          required
          className="border p-2 w-full"
        >
          <option value="">Select Dietary Preference</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
        </select>

        <select
          name="prepTime"
          onChange={handleChange}
          value={formData.prepTime}
          required
          className="border p-2 w-full"
        >
          <option value="">Select Preparation Time</option>
          <option value="< 30 minutes">&lt; 30 minutes</option>
          <option value="< 1 hour">&lt; 1 hour</option>
          <option value="> 1 hour">&gt; 1 hour</option>
        </select>


        <textarea
          name="introduction"
          placeholder="Introduction"
          onChange={handleChange}
          value={formData.introduction}
          required
          className="border p-2 w-full"
        />

        <textarea
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          onChange={handleChange}
          value={formData.ingredients}
          required
          className="border p-2 w-full"
        />

        <textarea
          name="howToCook"
          placeholder="How to Cook"
          onChange={handleChange}
          value={formData.howToCook}
          required
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
