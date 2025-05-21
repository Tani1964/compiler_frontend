import { useState, useEffect } from "react";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { DataContextProvider } from "./components/contexts/DataContext";

const App = () => {
  const [theme, setTheme] = useState("light");
  const [isLoading, setIsLoading] = useState(true);

  // Check for user's preferred theme on initial load
  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem("compiler-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme("dark");
    }
    
    // Simulate loading state for better user experience
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("compiler-theme", newTheme);
  };

  // Apply theme class to the document
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <DataContextProvider>
      {isLoading ? (
        <div className="fixed inset-0 bg-gray-50 dark:bg-gray-900 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              Loading Compiler...
            </h2>
          </div>
        </div>
      ) : (
        <div className={`min-h-screen flex flex-col justify-between transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
        }`}>
          <Header theme={theme} toggleTheme={toggleTheme} />
          <Body />
          <Footer theme={theme} />
        </div>
      )}
    </DataContextProvider>
  );
};

export default App;