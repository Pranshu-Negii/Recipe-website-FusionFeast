import { useNavigate } from "react-router-dom";

export default function Banner() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/Recipe-website-FusionFeast/BannerVideoo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start px-10">
        <h2 className="text-white text-5xl font-bold mb-6">Discover Delicious Recipes</h2>
        <div className="space-x-4">
          <button className="bg-orange-500 text-white px-6 py-2 rounded text-lg font-semibold">
            Explore Recipes
          </button>
          <button
            onClick={() => navigate("/submit-recipe")}
            className="bg-white text-black px-6 py-2 rounded text-lg font-semibold"
          >
            Add Your Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
