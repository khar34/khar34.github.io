// Custom theme switcher button functionality with flash prevention
document.addEventListener("DOMContentLoaded", function () {
  // Create the theme toggle button
  const themeToggle = document.createElement("button");
  themeToggle.id = "theme-toggle";
  themeToggle.setAttribute("aria-label", "Toggle dark/light mode");
  themeToggle.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="theme-icon theme-icon-light" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" class="theme-icon theme-icon-dark" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  `;

  // Add the button directly to the body for fixed positioning
  document.body.appendChild(themeToggle);

  // Function to get current theme
  function getCurrentTheme() {
    if (document.body.classList.contains("dark")) {
      return "dark";
    } else if (document.body.classList.contains("light")) {
      return "light";
    }
    return "auto";
  }

  // Function to set theme
  function setTheme(theme) {
    // Remove all theme classes
    document.body.classList.remove("auto", "dark", "light");
    document.documentElement.classList.remove("auto", "dark", "light");

    // Add the new theme class
    document.body.classList.add(theme);
    document.documentElement.classList.add(theme);

    // Update button appearance
    updateButtonAppearance();

    // Store preference (except for auto)
    if (theme !== "auto") {
      localStorage.setItem("theme-preference", theme);
    } else {
      localStorage.removeItem("theme-preference");
    }
  }

  // Toggle dark/light mode when button is clicked
  themeToggle.addEventListener("click", function () {
    const currentTheme = getCurrentTheme();

    if (currentTheme === "auto") {
      // If in auto mode, determine current system preference and switch to opposite
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      const newTheme = prefersDark ? "light" : "dark";
      setTheme(newTheme);
    } else {
      // Toggle between dark and light
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    }
  });

  // Function to update button appearance based on current theme
  function updateButtonAppearance() {
    const lightIcon = themeToggle.querySelector(".theme-icon-light");
    const darkIcon = themeToggle.querySelector(".theme-icon-dark");

    const currentTheme = getCurrentTheme();

    if (currentTheme === "dark") {
      lightIcon.style.display = "block";
      darkIcon.style.display = "none";
    } else if (currentTheme === "light") {
      lightIcon.style.display = "none";
      darkIcon.style.display = "block";
    } else {
      // Auto mode - show both icons with reduced opacity
      lightIcon.style.display = "block";
      darkIcon.style.display = "block";
      lightIcon.style.opacity = "0.5";
      darkIcon.style.opacity = "0.5";
    }
  }

  // Initialize theme and button appearance
  updateButtonAppearance();

  // Listen for system theme changes when in auto mode
  if (window.matchMedia) {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", function (e) {
        const currentTheme = getCurrentTheme();
        if (currentTheme === "auto") {
          updateButtonAppearance();
        }
      });
  }
});
