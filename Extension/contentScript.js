(() => {
  // Content scripts run in the context of the web page.
  // Any UI-related extension interactions (like clicking a Save button in the popup)
  // belong in popup.js, not here.
})();
