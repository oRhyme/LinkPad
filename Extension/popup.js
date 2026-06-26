console.log("=== LinkBoard popup.js LOADED ===");

document.addEventListener("DOMContentLoaded", () => {
  console.log("=== DOMContentLoaded fired ===");

  const saveBtn = document.getElementById("saveBtn");
  const statusEl = document.getElementById("bookmarks");

  function setStatus(msg) {
    if (statusEl) statusEl.textContent = msg;
    console.log("LinkBoard:", msg);
  }

  // Debug: list all cookies on load
  async function debugCookies() {
    try {
      const byDomain = await chrome.cookies.getAll({ domain: "localhost" });
      console.log("All localhost cookies:", byDomain.map(c => ({
        name: c.name, secure: c.secure, httpOnly: c.httpOnly, path: c.path
      })));
    } catch (err) {
      console.error("Cookie debug error:", err);
    }
  }
  debugCookies();

  if (saveBtn) {
    saveBtn.addEventListener("click", async () => {
      setStatus("Saving...");

      try {
        // Get ALL cookies for localhost — the server needs multiple cookies
        // (session_token for auth, session_data as local cache, etc.)
        const allCookies = await chrome.cookies.getAll({ domain: "localhost" });

        if (allCookies.length === 0) {
          setStatus("Not logged in — no cookies found. Log in at localhost:3000 first.");
          return;
        }

        // Build a full Cookie header string with ALL cookies
        const cookieHeader = allCookies.map(c => `${c.name}=${c.value}`).join("; ");
        console.log("Sending cookies:", allCookies.map(c => c.name));

        const response = await fetch("https://localhost:3000/api/saveCardExt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cookie": cookieHeader,
          },
          body: JSON.stringify({
            title: "Hello",
            url: "This is a test",
            description: "This is a test description",
          }),
        });

        const data = await response.json();
        console.log("LinkBoard response:", data);

        if (data.success || data.Success) {
          setStatus("Saved successfully!");
        } else {
          setStatus("Error: " + (data.message || "Unknown error"));
        }
      } catch (err) {
        console.error("LinkBoard error:", err);
        setStatus("Network error: " + err.message);
      }
    });
  }
});
