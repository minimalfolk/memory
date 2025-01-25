document.addEventListener('DOMContentLoaded', () => {
  const memoryForm = document.getElementById('memory-form');
  const favoriteList = document.getElementById('favorite-list');
  const memoryList = document.getElementById('memory-list');
  const favoriteMemoriesSection = document.getElementById('favorite-memories');
  const searchInput = document.getElementById('search-bar');

  let isFavoritePage = false; // To check whether it's index.html or user.html

  // Helper function to load and display memories (all or favorites)
  const loadMemories = (isFavoriteOnly = false) => {
    const memories = JSON.parse(localStorage.getItem('memories')) || [];
    const filteredMemories = isFavoriteOnly
      ? memories.filter(memory => memory.favorite)
      : memories;

    // Display filtered memories based on whether it's the favorites view or all memories
    if (isFavoriteOnly && favoriteMemoriesSection) {
      favoriteMemoriesSection.style.display = filteredMemories.length > 0 ? 'block' : 'none';
      favoriteList.innerHTML = ''; // Clear favorite list

      filteredMemories.forEach((memory, index) => {
        const memoryItem = createMemoryCard(memory, index, true);
        favoriteList.appendChild(memoryItem);
      });

      if (filteredMemories.length === 0) {
        favoriteList.innerHTML = `<p class="no-memories">No favorite memories added yet.</p>`;
      }
    }

    if (!isFavoriteOnly && memoryList) {
      memoryList.innerHTML = ''; // Clear all memories list

      filteredMemories.forEach((memory, index) => {
        const memoryItem = createMemoryCard(memory, index, false);
        memoryList.appendChild(memoryItem);
      });

      if (filteredMemories.length === 0) {
        memoryList.innerHTML = `<p class="no-memories">No memories added yet.</p>`;
      }
    }
  };

  // Create memory card element
  const createMemoryCard = (memory, index, isFavoriteView) => {
    const memoryCard = document.createElement('div');
    memoryCard.classList.add('memory-card');
    memoryCard.innerHTML = `
      <p><strong>Category:</strong> ${memory.category || 'N/A'} | <strong>Tags:</strong> ${memory.tags.join(', ') || 'N/A'} | <strong>Date:</strong> ${memory.date}</p>
      <h3>${memory.topic}</h3>
      <p>${truncateText(memory.details)}</p>
      <button class="view-more" data-index="${index}">View More</button>
      ${
        !isFavoriteView
          ? `<button class="edit-memory" data-index="${index}">Edit</button>
             <button class="delete-memory" data-index="${index}">Delete</button>
             <button class="favorite-memory" data-index="${index}">${memory.favorite ? 'Unfavorite' : 'Favorite'}</button>`
          : ''
      }
    `;

    // Add event listeners
    memoryCard.querySelector('.view-more').addEventListener('click', () => viewMore(index));
    if (!isFavoriteView) {
      memoryCard.querySelector('.edit-memory').addEventListener('click', () => editMemory(index));
      memoryCard.querySelector('.delete-memory').addEventListener('click', () => deleteMemoryPrompt(index));
      memoryCard.querySelector('.favorite-memory').addEventListener('click', () => toggleFavorite(index));
    }

    return memoryCard;
  };

  // Truncate text for display
  const truncateText = (text, maxLength = 100) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // View more details for a memory
  const viewMore = (index) => {
    const memories = JSON.parse(localStorage.getItem('memories')) || [];
    const memory = memories[index];
    alert(`Memory Details:\n\n${memory.details}`);
  };

  // Add new memory
  memoryForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const newMemory = {
      category: document.getElementById('memory-category').value,
      topic: document.getElementById('memory-topic').value,
      details: document.getElementById('memory-details').value,
      tags: document.getElementById('memory-tags').value.split(',').map(tag => tag.trim()),
      date: new Date().toLocaleString(),
      favorite: false,
    };

    const memories = JSON.parse(localStorage.getItem('memories')) || [];
    memories.push(newMemory);
    localStorage.setItem('memories', JSON.stringify(memories));

    memoryForm.reset();
    loadMemories(isFavoritePage); // Reload memories based on page view (favorites or all)
  });

  // Edit memory
  const editMemory = (index) => {
    const memories = JSON.parse(localStorage.getItem('memories')) || [];
    const memory = memories[index];

    const newTopic = prompt('Edit Topic:', memory.topic);
    if (newTopic !== null) {
      memory.topic = newTopic;
      memory.tags = prompt('Edit Tags (comma-separated):', memory.tags.join(', ')).split(',').map(tag => tag.trim());
      memories[index] = memory;
      localStorage.setItem('memories', JSON.stringify(memories));
      loadMemories(isFavoritePage); // Reload memories based on page view
    }
  };

  // Toggle favorite status
  const toggleFavorite = (index) => {
    const memories = JSON.parse(localStorage.getItem('memories')) || [];
    memories[index].favorite = !memories[index].favorite;
    localStorage.setItem('memories', JSON.stringify(memories));
    loadMemories(isFavoritePage); // Reload memories based on page view
  };

  // Delete memory
  const deleteMemory = (index) => {
    const memories = JSON.parse(localStorage.getItem('memories')) || [];
    memories.splice(index, 1);
    localStorage.setItem('memories', JSON.stringify(memories));
    loadMemories(isFavoritePage); // Reload memories based on page view
  };

  // Confirm delete memory
  const deleteMemoryPrompt = (index) => {
    if (confirm('Do you want to delete this memory?')) {
      deleteMemory(index);
    }
  };

  // Search memories based on query (filter by category, topic, tags)
  const searchMemories = (query) => {
    const memories = JSON.parse(localStorage.getItem('memories')) || [];
    const filteredMemories = memories.filter(memory =>
      memory.category.toLowerCase().includes(query.toLowerCase()) ||
      memory.topic.toLowerCase().includes(query.toLowerCase()) ||
      memory.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    loadMemories(filteredMemories);
  };

  // Live search functionality
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchMemories(e.target.value);
    });
  }

  // Initialize based on page type (index.html for favorites, user.html for all)
  if (favoriteMemoriesSection) {
    isFavoritePage = true;
    loadMemories(true); // Index page - only favorites
  } else if (memoryList) {
    isFavoritePage = false;
    loadMemories(); // User page - all memories
  }
});
