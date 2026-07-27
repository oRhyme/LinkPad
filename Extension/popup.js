console.log("=== LinkPad popup.js LOADED ===");

document.addEventListener("DOMContentLoaded", () => {
  const linkForm = document.getElementById("linkForm");
  const saveBtn = document.getElementById("saveBtn");
  const folderSelect = document.getElementById("folderSelect");
  const titleInput = document.getElementById("titleInput");
  const urlInput = document.getElementById("urlInput");
  const descInput = document.getElementById("descInput");

  // Status banner elements
  const statusBanner = document.getElementById("statusBanner");
  const statusIcon = document.getElementById("statusIcon");
  const statusText = document.getElementById("statusText");

  let statusTimer = null;

  /**
   * Show a status banner with a type: "success" | "error" | "info"
   */
  function showStatus(msg, type = "info", autoDismiss = true) {
    // Clear previous timer
    if (statusTimer) clearTimeout(statusTimer);

    // Set icon
    const icons = { success: "✓", error: "✕", info: "ℹ" };
    statusIcon.textContent = icons[type] || icons.info;

    // Set text
    statusText.textContent = msg;

    // Set class
    statusBanner.className = "status-banner " + type;

    // Auto-dismiss after 4s
    if (autoDismiss) {
      statusTimer = setTimeout(() => {
        statusBanner.className = "status-banner hidden";
      }, 4000);
    }

    console.log(`LinkPad [${type}]:`, msg);
  }

  /** Build cookie header from all localhost cookies */
  async function getCookieHeader() {
    const allCookies = await chrome.cookies.getAll({ domain: "localhost" });
    if (allCookies.length === 0) return null;
    return allCookies.map(c => `${c.name}=${c.value}`).join("; ");
  }

  /** Fetch folders from the API and populate the dropdown */
  async function loadFolders() {
    // Auto-fill current tab info
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    if (tab) {
      urlInput.value = tab.url || "";
      titleInput.value = tab.title || "";
    }

    try {
      const cookieHeader = await getCookieHeader();
      if (!cookieHeader) {
        folderSelect.innerHTML = '<option value="" disabled selected>Not logged in</option>';
        showStatus("Log in at localhost:3000 first", "error", false);
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

  // Handle form submission
  linkForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = titleInput?.value?.trim();
    const url = urlInput?.value?.trim();
    const description = descInput?.value?.trim();
    const folderId = folderSelect?.value;

    if (!title) { showStatus("Please enter a title", "error"); return; }
    if (!folderId) { showStatus("Please select a folder", "error"); return; }

    // Disable button while saving
    saveBtn.disabled = true;
    saveBtn.querySelector(".btn-icon")?.setAttribute("style", "opacity:0.6");
    showStatus("Saving…", "info", false);

    try {
      const cookieHeader = await getCookieHeader();
      if (!cookieHeader) {
        showStatus("Not logged in — log in at localhost:3000 first.", "error");
        saveBtn.disabled = false;
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
      console.log("LinkPad response:", data);

      if (data.success || data.Success) {
        showStatus("Link saved successfully!", "success");
        // Clear inputs after save
        titleInput.value = "";
        urlInput.value = "";
        descInput.value = "";
      } else {
        showStatus("Error: " + (data.message || "Unknown error"), "error");
      }
    } catch (err) {
      console.error("LinkPad error:", err);
      showStatus("Network error: " + err.message, "error");
    } finally {
      saveBtn.disabled = false;
      saveBtn.querySelector(".btn-icon")?.removeAttribute("style");
    }
  });
});
