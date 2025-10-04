function isAuto() {
  return document.body.classList.contains("auto");
}

function getThemeClass() {
  if (document.body.classList.contains("dark")) {
    return "dark";
  } else if (document.body.classList.contains("light")) {
    return "light";
  }
  return "auto";
}

function setTheme() {
  if (!isAuto()) {
    return;
  }

  document.body.classList.remove("auto");
  document.documentElement.classList.remove("auto");

  let cls = "light";
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    cls = "dark";
  }

  document.body.classList.add(cls);
  document.documentElement.classList.add(cls);
}

function toggleTheme() {
  // Remove auto class if present
  document.body.classList.remove("auto");
  document.documentElement.classList.remove("auto");

  // Toggle between dark and light
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    document.documentElement.classList.remove("dark");
    document.body.classList.add("light");
    document.documentElement.classList.add("light");
  } else {
    document.body.classList.remove("light");
    document.documentElement.classList.remove("light");
    document.body.classList.add("dark");
    document.documentElement.classList.add("dark");
  }
}

function handleSystemThemeChange() {
  // Only respond to system theme changes if we're not in manual override mode
  if (isAuto()) {
    setTheme();
  }
}

// Initialize theme on load (fallback if inline script didn't work)
document.addEventListener("DOMContentLoaded", function () {
  setTheme();
});

// Listen for system theme changes
if (window.matchMedia) {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addListener(handleSystemThemeChange);
}

// Add theme-loaded class to re-enable transitions
function addThemeLoadedClass() {
  document.body.classList.add("theme-loaded");
  document.documentElement.classList.add("theme-loaded");
}

// Initial theme setup
setTheme();

// Add theme-loaded class after a brief delay to ensure theme is set
setTimeout(addThemeLoadedClass, 50);
