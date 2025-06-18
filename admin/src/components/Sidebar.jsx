import { NavLink } from "react-router-dom";
import { BookOpen, Hourglass, CheckCircle, PlusCircle, Trash2 } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r shadow-lg p-6">
      <nav className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-gray-700 mb-2"> Recipes</h2>
          <NavLink to="/existing" className={linkStyle}><BookOpen className="inline mr-2" size={18} /> Existing</NavLink>
          <NavLink to="/pending" className={linkStyle}><Hourglass className="inline mr-2" size={18} /> Pending</NavLink>
          <NavLink to="/approved" className={linkStyle}><CheckCircle className="inline mr-2" size={18} /> Approved</NavLink>
        </div>

        <div className="pt-4">
          <h2 className="text-lg font-bold text-gray-700 mb-2"> Manage</h2>
          <NavLink to="/add" className={linkStyle}><PlusCircle className="inline mr-2" size={18} /> Add Recipe</NavLink>
          <NavLink to="/remove" className={linkStyle}><Trash2 className="inline mr-2" size={18} /> Remove Recipe</NavLink>
        </div>
      </nav>
    </aside>
  );
}

const linkStyle = ({ isActive }) =>
  `flex items-center gap-2 px-4 py-2 rounded-md font-medium ${
    isActive ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-gray-100"
  }`;
