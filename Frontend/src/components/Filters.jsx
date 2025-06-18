export default function Filters({ selectedFilters, setSelectedFilters }) {
  const categories = {
    Cuisine: ["Italian", "Mexican", "Indian", "Chinese", "Thai"],
    "Dietary Preferences": ["Vegetarian", "Non-Vegetarian"],
    "Preparation Time": ["< 30 minutes", "< 1 hour", "> 1 hour"],
  };

  const handleCheckboxChange = (category, option) => {
    const updatedCategoryFilters = selectedFilters[category].includes(option)
      ? selectedFilters[category].filter((item) => item !== option)
      : [...selectedFilters[category], option];

    setSelectedFilters({
      ...selectedFilters,
      [category]: updatedCategoryFilters,
    });
  };

  return (
    <div className="w-64 p-4 bg-white rounded shadow">
      {Object.entries(categories).map(([category, options]) => (
        <div key={category} className="mb-4">
          <h3 className="font-semibold mb-2">{category}</h3>
          {options.map((option) => (
            <label key={option} className="block mb-1">
              <input
                type="checkbox"
                checked={selectedFilters[category].includes(option)}
                onChange={() => handleCheckboxChange(category, option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}
