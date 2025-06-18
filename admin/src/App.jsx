import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import ExistingRecipes from "./pages/ExistingRecipes";
import PendingRecipes from "./pages/PendingRecipes";
import ApprovedRecipes from "./pages/ApprovedRecipes";
import AddRecipe from "./pages/AddRecipe";
import RemoveRecipe from "./pages/RemoveRecipe";

export default function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/pending" replace />} />
              <Route path="/existing" element={<ExistingRecipes />} />
              <Route path="/pending" element={<PendingRecipes />} />
              <Route path="/approved" element={<ApprovedRecipes />} />
              <Route path="/add" element={<AddRecipe />} />
              <Route path="/remove" element={<RemoveRecipe />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
