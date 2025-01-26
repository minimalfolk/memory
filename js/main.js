// Global variable to store currently selected memory index
let selectedMemoryIndex = null;

// Function to show the options box
function showOptionsBox(index, event) {
  const optionsBox = document.getElementById("options-box");
  selectedMemoryIndex = index;

  // Position the options box near the clicked button
  optionsBox.style.top = `${event.clientY}px`;
  optionsBox.style.left = `${event.clientX}px`;
  optionsBox.style.display = "block";
}

// Function to hide the options box
function hideOptionsBox() {
  const optionsBox = document.getElementById("options-box");
  optionsBox.style.display = "none";
}

// Function to edit a memory
function editMemoryFromOptions() {
  const memories = JSON.parse(localStorage.getItem("memories")) || [];

  if (selectedMemoryIndex !== null && memories[selectedMemoryIndex]) {
    const memory = memories[selectedMemoryIndex];

    // Redirect to index.html with memory data pre-filled
    const queryString = `?edit=true&index=${selectedMemoryIndex}&category=${encodeURIComponent(
      memory.category
    )}&topic=${encodeURIComponent(memory.topic)}&details=${encodeURIComponent(
      memory.details
    )}&tags=${encodeURIComponent(memory.tags || "")}`;
    window.location.href = `index.html${queryString}`;
  }

  hideOptionsBox();
}

// Function to delete a memory
function deleteMemoryFromOptions() {
  const memories = JSON.parse(localStorage.getItem("memories")) || [];

  if (selectedMemoryIndex !== null && memories[selectedMemoryIndex]) {
    memories.splice(selectedMemoryIndex, 1);
    localStorage.setItem("memories", JSON.stringify(memories));

    // Reload the current page to reflect the changes
    if (window.location.pathname.includes("all-memory.html")) {
      loadAllMemories();
    }
  }

  hideOptionsBox();
}

// Function to toggle a memory as favorite
function toggleFavoriteFromOptions() {
  const memories = JSON.parse(localStorage.getItem("memories")) || [];

  if (selectedMemoryIndex !== null && memories[selectedMemoryIndex]) {
    memories[selectedMemoryIndex].isFavorite =
      !memories[selectedMemoryIndex].isFavorite;
    localStorage.setItem("memories", JSON.stringify(memories));

    // Reload the page if on all-memory.html
    if (window.location.pathname.includes("all-memory.html")) {
      loadAllMemories();
    }

    // Update the favorite list if on index.html
    if (window.location.pathname.includes("index.html")) {
      loadFavoriteMemories();
    }
  }

  hideOptionsBox();
}

// Utility function to pre-fill form when editing a memory (on index.html)
function prefillFormIfEditing() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("edit") === "true") {
    const index = urlParams.get("index");
    const category = urlParams.get("category");
    const topic = urlParams.get("topic");
    const details = urlParams.get("details");
    const tags = urlParams.get("tags");

    // Populate the form fields with the memory data
    document.getElementById("memory-category").value = category || "";
    document.getElementById("memory-topic").value = topic || "";
    document.getElementById("memory-details").value = details || "";
    document.getElementById("memory-tags").value = tags || "";

    // Remove edit-related query parameters after pre-filling
    history.replaceState(null, null, window.location.pathname);
  }
}

// Event listener for clicking outside the options box
document.addEventListener("click", (event) => {
  const optionsBox = document.getElementById("options-box");
  if (optionsBox && !optionsBox.contains(event.target)) {
    hideOptionsBox();
  }
});

// Pre-fill the form if editing a memory (only applies to index.html)
if (window.location.pathname.includes("index.html")) {
  document.addEventListener("DOMContentLoaded", prefillFormIfEditing);
}
