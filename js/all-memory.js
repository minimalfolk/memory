// Display all memories and allow filtering on all-memory.html
function displayAllMemories(memories) {
  const memoryList = document.getElementById('memory-list');
  memoryList.innerHTML = ''; // Clear previous list

  const searchTerm = document.getElementById('search-bar').value.toLowerCase();
  const filteredMemories = memories.filter(memory => {
    return (
      memory.topic.toLowerCase().includes(searchTerm) ||
      memory.details.toLowerCase().includes(searchTerm) ||
      memory.category.toLowerCase().includes(searchTerm) ||
      memory.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  });

  filteredMemories.forEach((memory, index) => {
    const memoryDiv = document.createElement('div');
    memoryDiv.classList.add('memory-item');
    memoryDiv.innerHTML = `
      <div class="memory-header">
        <p><strong>Category:</strong> ${memory.category}</p>
        <p><strong>Date:</strong> ${memory.date}</p>
        <p><strong>Tags:</strong> ${memory.tags.join(', ')}</p>
      </div>
      <h4>${memory.topic}</h4>
      <p><strong>Details:</strong> ${shortenText(memory.details, index)}</p>
      <div class="memory-actions">
        <button onclick="showOptionsBox(${index})">Options</button>
        <button onclick="deleteMemory(${index})">🗑️</button>
        <button onclick="toggleFavorite(${index})">${memory.favorite ? '❤️' : '🤍'}</button>
      </div>
    `;
    memoryList.appendChild(memoryDiv);
  });
}

// Filter memories by category or other criteria on search input change
document.getElementById('search-bar').addEventListener('input', function () {
  displayAllMemories(getMemories());
});

// Initial call to display all memories on all-memory.html
if (document.body.contains(document.getElementById('memory-list'))) {
  displayAllMemories(getMemories());
}
