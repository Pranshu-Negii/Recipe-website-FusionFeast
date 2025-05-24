import { Link } from "react-router-dom";

export default function RecipeCard({ id, name, image, rating }) {
  if (!id) return null;

  const imageUrl = image?.startsWith("http")
    ? image
    : `http://localhost:5000${image}`;

  return (
    <Link to={`/recipes/${id}`} className="block">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-80 object-cover rounded"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold">{name}</h3>
          {rating && (
            <p className="text-sm text-gray-600">⭐ {rating}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
