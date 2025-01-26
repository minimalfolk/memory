let memories = JSON.parse(localStorage.getItem('memories')) || [];

// Function to render all memories
function renderMemories() {
  const memoryContainer = document.getElementById('memories');
  memoryContainer.innerHTML = '';

  memories.forEach((memory, index) => {
    const memoryDiv = document.createElement('div');
    memoryDiv.className = 'memory';
    memoryDiv.innerHTML = `
      <p><strong>Category:</strong> ${memory.category}</p>
      <p><strong>Date:</strong> ${memory.date}</p>
      <p><strong>Topic:</strong> ${memory.topic}</p>
      <p>${memory.details}</p>
      <p><strong>Tag:</strong> ${memory.tag || 'N/A'}</p>
      <button onclick="editMemory(${index})">Edit</button>
      <button onclick="deleteMemory(${index})">Delete</button>
      <button onclick="toggleFavorite(${index})">
        ${memory.favorite ? 'Unfavorite' : 'Favorite'}
      </button>
    `;
    memoryContainer.appendChild(memoryDiv);
  });
  renderFavoriteMemories();
}

// Function to render favorite memories
function renderFavoriteMemories() {
  const favoriteContainer = document.getElementById('favoriteMemories');
  const favoriteList = document.getElementById('favorites');
  const favoriteMemories = memories.filter(memory => memory.favorite);

  if (favoriteMemories.length > 0) {
    favoriteContainer.style.display = 'block';
    favoriteList.innerHTML = '';
    favoriteMemories.forEach((memory, index) => {
      const memoryDiv = document.createElement('div');
      memoryDiv.className = 'favorite';
      memoryDiv.innerHTML = `
        <p><strong>Category:</strong> ${memory.category}</p>
        <p><strong>Date:</strong> ${memory.date}</p>
        <p><strong>Topic:</strong> ${memory.topic}</p>
        <p>${memory.details}</p>
        <p><strong>Tag:</strong> ${memory.tag || 'N/A'}</p>
        <button onclick="toggleFavorite(${index}, true)">Unfavorite</button>
      `;
      favoriteList.appendChild(memoryDiv);
    });
  } else {
    favoriteContainer.style.display = 'none';
  }
}

// Save memory to localStorage
function saveMemory(memory) {
  memories.push(memory);
  localStorage.setItem('memories', JSON.stringify(memories));
  renderMemories();
}

// Function to toggle favorite status
function toggleFavorite(index, isFavoriteView = false) {
  // Adjust index for favorite view if needed
  if (isFavoriteView) {
    const favoriteMemories = memories.filter(memory => memory.favorite);
    const originalIndex = memories.indexOf(favoriteMemories[index]);
    memories[originalIndex].favorite = !memories[originalIndex].favorite;
  } else {
    memories[index].favorite = !memories[index].favorite;
  }

  localStorage.setItem('memories', JSON.stringify(memories));
  renderMemories();
}

// Function to delete memory
function deleteMemory(index) {
  if (confirm('Do you want to delete this memory?')) {
    memories.splice(index, 1);
    localStorage.setItem('memories', JSON.stringify(memories));
    renderMemories();
  }
}

// Handle form submission
document.getElementById('memoryForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const category = document.getElementById('category').value;
  const topic = document.getElementById('topic').value;
  const details = document.getElementById('details').value;
  const tag = document.getElementById('tag').value;

  const memory = {
    category,
    topic,
    details,
    tag,
    date: new Date().toLocaleString(),
    favorite: false,
  };

  saveMemory(memory);
  this.reset();
});

// Load memories from localStorage and render on page load
renderMemories();
