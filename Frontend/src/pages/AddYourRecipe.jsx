import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

export default function AddYourRecipe() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    cuisine: "",
    dietary: "",
    prepTime: "",
    introduction: "",
    ingredients: "",
    howToCook: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "ingredients") {
          form.append(key, JSON.stringify(value.split(",").map(i => i.trim())));
        } else {
          form.append(key, value);
        }
      });
      if (imageFile) {
        form.append("image", imageFile);
      }

      await axios.post("http://localhost:5000/api/recipes/submit", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Recipe submitted for approval!");

      //Reset form
      setFormData({
        name: "",
        cuisine: "",
        dietary: "",
        prepTime: "",
        introduction: "",
        ingredients: "",
        howToCook: "",
      });
      setImageFile(null);
      e.target.reset();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit recipe.");
    }
  };

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Submit Your Recipe</h2>

      <button onClick={handleBack} className="mb-8 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
        ← Back
      </button>

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="w-full border p-2" />

        <input type="file" name="image" onChange={handleFileChange} accept="image/*" required className="w-full border p-2" />

        <select name="cuisine" onChange={handleChange} required className="w-full border p-2">
          <option value="">Select Cuisine</option>
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
          <option value="Indian">Indian</option>
          <option value="Chinese">Chinese</option>
          <option value="Thai">Thai</option>
        </select>

        <select name="dietary" onChange={handleChange} required className="w-full border p-2">
          <option value="">Select Dietary Preference</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
        </select>

        <select name="prepTime" onChange={handleChange} required className="w-full border p-2">
          <option value="">Select Preparation Time</option>
          <option value="< 30 minutes">&lt; 30 minutes</option>
          <option value="< 1 hour">&lt; 1 hour</option>
          <option value="> 1 hour">&gt; 1 hour</option>
        </select>

        <textarea name="introduction" placeholder="Introduction" onChange={handleChange} required className="w-full border p-2" />
        <textarea name="ingredients" placeholder="Ingredients (comma separated)" onChange={handleChange} required className="w-full border p-2" />
        <textarea name="howToCook" placeholder="How to Cook" onChange={handleChange} required className="w-full border p-2" />

        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
}
