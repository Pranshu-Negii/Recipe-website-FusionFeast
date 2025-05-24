export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-6 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Ready to Discover Tasty Recipes?</h2>
        <p className="mb-4">Join FusionFeast and explore delicious dishes from around the world!</p>
        <a
          href="/signup"
          className="inline-block bg-white text-gray-900 font-semibold px-6 py-2 rounded hover:bg-gray-100 transition"
        >
          Get Started
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-lg font-bold mb-4">FusionFeast</h3>
          <p className="text-sm text-gray-400">
            Bringing the world of flavors to your plate. One recipe at a time.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/recipes" className="hover:text-white">All Recipes</a></li>
            <li><a href="/categories" className="hover:text-white">Categories</a></li>
            <li><a href="/top-rated" className="hover:text-white">Top Rated</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
            <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            <li><a href="/help" className="hover:text-white">Help Center</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-4 text-xl text-gray-400">
            <a href="#" className="hover:text-white">Facebook</a>
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">Twitter</a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()}Copyright 2025 @ FusionFeast.com - All rights Reserved
      </div>
    </footer>
  );
}
