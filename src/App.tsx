import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import Sidebar from "./components/ui/Sidebar";
import ComponentsPage from "./pages/ComponentsPage";
import AboutPage from "./pages/AboutPage";
import BootstrapButtonsPage from "./pages/bootstrap/BootstrapButtonsPage";
import TailwindButtonsPage from "./pages/tailwind/TailwindButtonsPage";
import TailwindCardsPage from "./pages/tailwind/TailwindCardsPage";


export default function App() {
  const [darkMode, ] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, []);

  return (
    <ThemeProvider defaultTheme={darkMode ? "dark" : "light"}>
      <Router>
        <div className={darkMode ? "dark bg-gray-900 text-white flex" : "bg-white text-gray-900 flex"}>
          {/* Sidebar */}
          <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          {/* Main Content */}
          <div className={`flex-1 transition-all ml-0 ${sidebarOpen ? "md:ml-64" : "md:ml-0"}`}>
            
            <header className="p-4 flex justify-between items-center border-b border-gray-300 dark:border-gray-700">
              <h1 className="text-xl font-bold">UIBlockHub</h1>

              <div className="flex gap-2 items-center">
                {/* {darkMode ?
                  <span onClick={() => setDarkMode(!darkMode)} className="cursor-pointer">&#9790;</span>
                  :
                  <span onClick={() => setDarkMode(!darkMode)} className="cursor-pointer">&#9728;</span>
                } */}

                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="md:hidden px-4 py-2 bg-gray-800 text-white rounded-lg"
                >
                  {sidebarOpen ? "Close" : "Open"}
                </button>
              </div>

            </header>

            <main className="p-8">
              <Routes>
                <Route path="/" element={<ComponentsPage />} />
                <Route path="/tailwind/components/buttons" element={<TailwindButtonsPage />} />
                <Route path="/tailwind/components/cards" element={<TailwindCardsPage />} />

                <Route path="/bootstrap/components/buttons" element={<BootstrapButtonsPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}