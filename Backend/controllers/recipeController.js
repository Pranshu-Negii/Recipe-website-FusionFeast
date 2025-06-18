import Recipe from "../models/Recipe.js";
import path from "path";

// Submit from frontend 
export const submitRecipe = async (req, res) => {
  try {
    const {
      name,
      cuisine,
      dietary,
      prepTime,
      introduction,
      ingredients,
      howToCook,
    } = req.body;

    // Handle uploaded image
    const image = req.file ? `/uploads/${req.file.filename}` : "";


    const newRecipe = new Recipe({
      name,
      image,
      cuisine,
      dietary,
      prepTime,
      introduction,
      ingredients: Array.isArray(ingredients)
        ? ingredients
        : ingredients.split(",").map((item) => item.trim()),
      howToCook,
      status: "pending",
    });

    await newRecipe.save();
    res.status(201).json({ message: "Recipe submitted for review" });
  } catch (err) {
    console.error("Submit Error:", err.message, err.stack, req.body, req.file);
    res.status(500).json({ error: "Failed to submit recipe" });
  }
};

// Admin: fetch recipes by status
export const getRecipesByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const recipes = await Recipe.find(filter);
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
};

// Admin: approve recipe
export const approveRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndUpdate(req.params.id, { status: "approved" });
    res.json({ message: "Recipe approved" });
  } catch (err) {
    res.status(500).json({ error: "Approval failed" });
  }
};

// Admin: reject recipe
export const rejectRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndUpdate(req.params.id, { status: "rejected" });
    res.json({ message: "Recipe rejected" });
  } catch (err) {
    res.status(500).json({ error: "Rejection failed" });
  }
};

// Admin: delete recipe
export const deleteRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "Recipe deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};

// Admin: manual recipe add

export const addRecipeManually = async (req, res) => {
  try {
    const {
      name,
      cuisine,
      dietary,
      prepTime,
      introduction,
      ingredients,
      howToCook,
    } = req.body;

    const newRecipe = new Recipe({
      name,
      cuisine,
      dietary,
      prepTime,
      introduction,
      ingredients: ingredients.split(",").map(i => i.trim()),
      howToCook,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      status: "approved", // Admin-added recipes are auto-approved
    });

    await newRecipe.save();
    res.status(201).json({ message: "Recipe added successfully", recipe: newRecipe });
  } catch (error) {
    console.error("Error adding recipe manually:", error);
    res.status(500).json({ error: "Failed to add recipe manually" });
  }
};

// Get single recipe by ID
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch recipe" });
  }
};

