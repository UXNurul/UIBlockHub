
interface HeaderProps {
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  darkMode: boolean;
}

export default function Header({ toggleSidebar, toggleDarkMode, darkMode }: HeaderProps) {
  return (
    <header className="p-4 flex justify-between items-center border-b border-gray-300 dark:border-gray-700">
      <h1 className="text-xl font-bold">UIBlockHub</h1>
      <div className="flex gap-2">
        <button onClick={toggleSidebar}>Toggle Sidebar</button>
        <button onClick={toggleDarkMode}>{darkMode ? "Light Mode" : "Dark Mode"}</button>
      </div>
    </header>
  );
}
