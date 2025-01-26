// Constants and Selectors
const memoryForm = document.getElementById('memory-form');
const favoriteList = document.getElementById('favorite-list');
const noFavoritesMessage = document.getElementById('no-favorites-message');
const memoryCategory = document.getElementById('memory-category');
const memoryTopic = document.getElementById('memory-topic');
const memoryDetails = document.getElementById('memory-details');
const memoryTags = document.getElementById('memory-tags');

// Local Storage Key
const MEMORY_STORAGE_KEY = 'memojar_memories';

// Utility Functions
const loadMemories = () => {
  const storedMemories = localStorage.getItem(MEMORY_STORAGE_KEY);
  return storedMemories ? JSON.parse(storedMemories) : [];
};

const saveMemories = (memories) => {
  localStorage.setItem(MEMORY_STORAGE_KEY, JSON.stringify(memories));
};

const generateMemoryId = () => `memory-${Date.now()}`;

// Add Memory
memoryForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const category = memoryCategory.value;
  const topic = memoryTopic.value.trim();
  const details = memoryDetails.value.trim();
  const tags = memoryTags.value.trim().split(',').map(tag => tag.trim()).filter(tag => tag !== '');

  if (!topic || !details) {
    alert('Please fill out the topic and details fields.');
    return;
  }

  const newMemory = {
    id: generateMemoryId(),
    category,
    topic,
    details,
    tags,
    favorite: false,
    createdAt: new Date().toISOString(),
  };

  const memories = loadMemories();
  memories.push(newMemory);
  saveMemories(memories);

  memoryForm.reset();
  alert('Memory saved successfully!');
  updateFavoriteList(); // Update the favorites if needed
});

// Update Favorite List
const updateFavoriteList = () => {
  const memories = loadMemories();
  const favoriteMemories = memories.filter(memory => memory.favorite);

  favoriteList.innerHTML = '';

  if (favoriteMemories.length === 0) {
    noFavoritesMessage.style.display = 'block';
    return;
  }

  noFavoritesMessage.style.display = 'none';

  favoriteMemories.forEach(memory => {
    const memoryDiv = document.createElement('div');
    memoryDiv.className = 'favorite-memory';
    memoryDiv.innerHTML = `
      <h4>${memory.topic}</h4>
      <p>${memory.details}</p>
      <span class="category">Category: ${memory.category}</span>
    `;
    favoriteList.appendChild(memoryDiv);
  });
};

// Toggle Favorite Memory
const toggleFavorite = (id) => {
  const memories = loadMemories();
  const memoryIndex = memories.findIndex(memory => memory.id === id);

  if (memoryIndex > -1) {
    memories[memoryIndex].favorite = !memories[memoryIndex].favorite;
    saveMemories(memories);
    updateFavoriteList();
  }
};

// On Page Load
document.addEventListener('DOMContentLoaded', () => {
  updateFavoriteList();
});
