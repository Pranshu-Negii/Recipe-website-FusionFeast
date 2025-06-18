import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: String,
  image: String,
  cuisine: String,
  dietary: String,
  prepTime: String,
  introduction: String,
  ingredients: [String],
  howToCook: String,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
}, { timestamps: true });

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
