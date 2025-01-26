// Function to display all memories
function loadAllMemories() {
  const memoryListElement = document.getElementById("memory-list");
  memoryListElement.innerHTML = ""; // Clear the current list

  const savedMemories = JSON.parse(localStorage.getItem("memories")) || [];

  if (savedMemories.length === 0) {
    memoryListElement.innerHTML = `<p class="no-memories">No memories to display.</p>`;
    return;
  }

  savedMemories.forEach((memory, index) => {
    const memoryCard = document.createElement("div");
    memoryCard.classList.add("memory-card");
    memoryCard.dataset.index = index;

    memoryCard.innerHTML = `
      <h4>${memory.topic}</h4>
      <p><strong>Category:</strong> ${memory.category}</p>
      <p><strong>Details:</strong> ${memory.details}</p>
      <p><strong>Tags:</strong> ${memory.tags || "None"}</p>
      <div class="memory-actions">
        <button onclick="showOptionsBox(${index}, event)">Options</button>
      </div>
    `;

    memoryListElement.appendChild(memoryCard);
  });
}

// Function to filter memories based on the search bar input
function filterMemories() {
  const query = document.getElementById("search-bar").value.toLowerCase();
  const memoryCards = document.querySelectorAll(".memory-card");

  memoryCards.forEach((card) => {
    const topic = card.querySelector("h4").textContent.toLowerCase();
    const details = card.querySelector("p:nth-child(3)").textContent.toLowerCase();

    if (topic.includes(query) || details.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Load all memories when the page loads
document.addEventListener("DOMContentLoaded", loadAllMemories);
