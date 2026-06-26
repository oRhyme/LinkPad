console.log("=== LinkBoard popup.js LOADED ===");

document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.getElementById("saveBtn");
  const statusEl = document.getElementById("bookmarks");
  const folderSelect = document.getElementById("folderSelect");
  const titleInput = document.getElementById("titleInput");
  const urlInput = document.getElementById("urlInput");
  const descInput = document.getElementById("descInput");

  function setStatus(msg) {
    if (statusEl) statusEl.textContent = msg;
    console.log("LinkBoard:", msg);
  }

  /** Build cookie header from all localhost cookies */
  async function getCookieHeader() {
    const allCookies = await chrome.cookies.getAll({ domain: "localhost" });
    if (allCookies.length === 0) return null;
    return allCookies.map(c => `${c.name}=${c.value}`).join("; ");
  }

  /** Fetch folders from the API and populate the dropdown */
  async function loadFolders() {
    try {
      const cookieHeader = await getCookieHeader();
      if (!cookieHeader) {
        folderSelect.innerHTML = '<option value="" disabled selected>Not logged in</option>';
        return;
      }

      const response = await fetch("https://localhost:3000/api/getFoldersExt", {
        method: "GET",
        headers: { "Cookie": cookieHeader },
      });

      const data = await response.json();
      console.log("Folders response:", data);

      if (data.success && data.folders.length > 0) {
        folderSelect.innerHTML = '<option value="" disabled selected>Select a folder</option>';
        data.folders.forEach(folder => {
          const option = document.createElement("option");
          option.value = folder.id;
          option.textContent = folder.folderName;
          folderSelect.appendChild(option);
        });
      } else {
        folderSelect.innerHTML = '<option value="" disabled selected>No folders found</option>';
      }
    } catch (err) {
      console.error("Failed to load folders:", err);
      folderSelect.innerHTML = '<option value="" disabled selected>Error loading folders</option>';
    }
  }

  // Load folders when popup opens
  loadFolders();

  if (saveBtn) {
    saveBtn.addEventListener("click", async () => {
      const title = titleInput?.value?.trim();
      const url = urlInput?.value?.trim();
      const description = descInput?.value?.trim();
      const folderId = folderSelect?.value;

      if (!title) { setStatus("Please enter a title"); return; }
      if (!folderId) { setStatus("Please select a folder"); return; }

      setStatus("Saving...");

      try {
        const cookieHeader = await getCookieHeader();
        if (!cookieHeader) {
          setStatus("Not logged in — log in at localhost:3000 first.");
          return;
        }

        const response = await fetch("https://localhost:3000/api/saveCardExt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cookie": cookieHeader,
          },
          body: JSON.stringify({ title, url, description, folderId: Number(folderId) }),
        });

        const data = await response.json();
        console.log("LinkBoard response:", data);

        if (data.success || data.Success) {
          setStatus("Saved successfully!");
          // Clear inputs after save
          if (titleInput) titleInput.value = "";
          if (urlInput) urlInput.value = "";
          if (descInput) descInput.value = "";
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
