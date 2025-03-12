import { Link } from "react-router-dom";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
    return (
        <>
            {/* Sidebar */}
            <aside
                className={`w-64 bg-gray-800 text-white p-4 transition-transform ${isOpen ? "translate-x-0" : "-translate-x-64"
                    } fixed h-full`}
            >
                <h2 className="text-lg font-bold">UIBlockHub</h2>
                <nav className="mt-4">
                    <ul>
                        <li className="py-2">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="py-2">
                            <Link to="/components">Components</Link>
                        </li>
                        <li className="py-2">
                            <Link to="/about">About</Link>
                        </li>
                    </ul>
                </nav>
            </aside>


            <button
                onClick={toggleSidebar}
                className={`absolute top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110 border hidden md:block cursor-pointer ${isOpen ? "left-60" : "left-0"
                    }`}
            >
                {isOpen ? "←" : "→"}
            </button>
        </>
    );
}
