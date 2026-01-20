import { useContext, useEffect, useState } from "react";
import { ConfigContext } from "../../utils/configContext";

function ThemeSwitcher() {
  const config = useContext(ConfigContext);
  const [mode, setMode] = useState<string>();

  // Determine the dark theme name based on the configured light theme
  const lightTheme = config?.theme ?? "travel";
  const darkTheme = `${lightTheme}-dark`;

  useEffect(() => {
    function getPreferredColorScheme() {
      if (!window.matchMedia) {
        return;
      }
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return darkTheme;
      }
    }
    const theme = localStorage.getItem("theme") ?? getPreferredColorScheme();
    if (!theme) return;
    setMode(theme);
  }, [darkTheme]);

  const isDarkMode = mode === darkTheme;

  return (
    <label className="flex cursor-pointer gap-2 items-center mr-4 md:mr-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </svg>
      <input
        type="checkbox"
        autoComplete="off"
        checked={isDarkMode}
        aria-label="Toggle dark mode"
        className="toggle toggle-sm"
        onChange={(event) => {
          const newMode = event.currentTarget.checked ? darkTheme : lightTheme;
          document.documentElement.setAttribute("data-theme", newMode);
          localStorage.setItem("theme", newMode);
          setMode(newMode);
        }}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </label>
  );
}

export default ThemeSwitcher;
