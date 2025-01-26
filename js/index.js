// Store the selected memory index
let selectedMemoryIndex = null;

// Display favorite memories on index.html
function displayFavorites() {
  const favoritesContainer = document.getElementById('favorite-list');
  const noFavoritesMessage = document.getElementById('no-favorites-message');
  const memories = getMemories();
  favoritesContainer.innerHTML = ''; // Clear previous list

  if (memories.length === 0) {
    noFavoritesMessage.style.display = 'block';
  } else {
    noFavoritesMessage.style.display = 'none';
    memories.forEach((memory, index) => {
      const memoryDiv = document.createElement('div');
      memoryDiv.classList.add('memory-item');
      memoryDiv.innerHTML = `
        <div class="memory-header">
          <p><strong>Category:</strong> ${memory.category}</p>
          <p><strong>Date:</strong> ${memory.date}</p>
          <p><strong>Tags:</strong> ${memory.tags.join(', ')}</p>
        </div>
        <h4>${memory.topic}</h4>
        <div><strong>Details:</strong> ${shortenText(memory.details, index)}</div>
        <div class="memory-actions">
          <button onclick="showOptionsBox(${index})">✏️Edit</button>
          <button onclick="deleteMemory(${index})">🗑️Delete</button>
          <button onclick="toggleFavorite(${index})">${memory.favorite ? '❤️Favorite' : '🤍Unfavorite'}</button>
        </div>
      `;
      favoritesContainer.appendChild(memoryDiv);
    });
  }
}

// Toggle favorite status of a memory
function toggleFavorite(index) {
  const memories = getMemories();
  memories[index].favorite = !memories[index].favorite;
  localStorage.setItem('memories', JSON.stringify(memories));
  displayFavorites(); // Refresh the favorites list
}

// Handle memory form submission
document.getElementById('memory-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const category = document.getElementById('memory-category').value;
  const topic = document.getElementById('memory-topic').value;
  const details = document.getElementById('memory-details').value;
  const tags = document.getElementById('memory-tags').value;

  const newMemory = {
    category,
    topic,
    details,
    tags: tags.split(',').map(tag => tag.trim()), // Split and trim tags
    date: new Date().toLocaleString(), // Automatically set the current date and time
    favorite: false // Default to not favorited
  };

  saveMemory(newMemory);
  displayFavorites(); // Refresh favorite memories list
  this.reset(); // Reset form after submission
});

// Initial call to display favorite memories on index.html
if (document.body.contains(document.getElementById('favorite-list'))) {
  displayFavorites();
}
