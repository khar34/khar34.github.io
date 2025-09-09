// Custom theme switcher button functionality
document.addEventListener('DOMContentLoaded', function() {
  // Create the theme toggle button
  const themeToggle = document.createElement('button');
  themeToggle.id = 'theme-toggle';
  themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
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
  
  
  // Add hover effect
  themeToggle.addEventListener('mouseenter', function() {
    this.style.transform = 'rotate(15deg)';
  });
  
  themeToggle.addEventListener('mouseleave', function() {
    this.style.transform = 'rotate(0)';
  });
  
  // Add the button directly to the body for fixed positioning
  document.body.appendChild(themeToggle);
  
  // Toggle dark/light mode when button is clicked
  themeToggle.addEventListener('click', function() {
    if (document.body.classList.contains('auto')) {
      // If in auto mode, first set it to the current mode
      document.body.classList.remove('auto');
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.add('light');
      }
    }
    
    // Then toggle between dark and light
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
    
    // Store the theme preference in localStorage
    const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme-preference', currentTheme);
    
    // Update the button appearance
    updateButtonAppearance();
  });
  
  // Function to update button appearance based on current theme
  function updateButtonAppearance() {
    const isDarkMode = document.body.classList.contains('dark');
    const lightIcon = themeToggle.querySelector('.theme-icon-light');
    const darkIcon = themeToggle.querySelector('.theme-icon-dark');
    
    if (isDarkMode) {
      lightIcon.style.display = 'block';
      darkIcon.style.display = 'none';
    } else {
      lightIcon.style.display = 'none';
      darkIcon.style.display = 'block';
    }
  }
  
  // Initial button appearance update
  updateButtonAppearance();
  
  // Restore theme preference from localStorage on page load
  const savedTheme = localStorage.getItem('theme-preference');
  if (savedTheme) {
    document.body.classList.remove('auto', 'dark', 'light');
    document.body.classList.add(savedTheme);
    updateButtonAppearance();
  }
});
