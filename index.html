document.addEventListener('DOMContentLoaded', () => {
  const memoryForm = document.getElementById('memory-form');
  const favoriteList = document.getElementById('favorite-list');
  const favoriteMemoriesSection = document.getElementById('favorite-memories');
  
  // Helper function to load memories from localStorage
  const loadMemories = () => {
    const memories = JSON.parse(localStorage.getItem('memories')) || [];
    const favoriteMemories = memories.filter(memory => memory.favorite);
    
    if (favoriteMemoriesSection) {
      favoriteMemoriesSection.style.display = favoriteMemories.length > 0 ? 'block' : 'none';
      favoriteList.innerHTML = ''; // Clear previous list

      favoriteMemories.forEach((memory, index) => {
        const memoryItem = document.createElement('div');
        memoryItem.classList.add('memory-card');
        memoryItem.innerHTML = `
          <p><strong>Category:</strong> ${memory.category || 'N/A'} | <strong>Tags:</strong> ${memory.tags.join(', ') || 'N/A'} | <strong>Date:</strong> ${memory.date}</p>
          <h3>${memory.topic}</h3>
          <p>${truncateText(memory.details)}</p>
          <button class="view-more" data-index="${index}">View More</button>
        `;
        favoriteList.appendChild(memoryItem);
      });

      // Add event listener for "View More" buttons
      document.querySelectorAll('.view-more').forEach(button => {
        button.addEventListener('click', viewMore);
      });
    }
  };

  // Truncate long text and add a "View More" option
  const truncateText = (text) => {
    const maxLength = 100;
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  // View more details for a memory
  const viewMore = (event) => {
    const index = event.target.dataset.index;
    const memories = JSON.parse(localStorage.getItem('memories')) || [];
    const memory = memories[index];
    
    alert(`Memory Details:\n\n${memory.details}`); // Show full details in alert (or in a modal if needed)
  };

  // Add new memory to local storage
  memoryForm && memoryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newMemory = {
      category: document.getElementById('memory-category').value,
      topic: document.getElementById('memory-topic').value,
      details: document.getElementById('memory-details').value,
      tags: document.getElementById('memory-tags').value.split(',').map(tag => tag.trim()),
      date: new Date().toLocaleString(),
      favorite: false
    };

    const memories = JSON.parse(localStorage.getItem('memories')) || [];
    memories.push(newMemory);
    localStorage.setItem('memories', JSON.stringify(memories));

    // Clear form after submission
    memoryForm.reset();

    // Reload memories to update the list on the page
    loadMemories();
  });

  // Toggle favorite status of a memory
  const toggleFavorite = (event) => {
    const index = event.target.dataset.index;
    const memories = JSON.parse(localStorage.getItem('memories')) || [];
    const memory = memories[index];

    if (memory) {
      memory.favorite = !memory.favorite;
      memories[index] = memory;
      localStorage.setItem('memories', JSON.stringify(memories));
      
      // Reload the memories to update UI
      loadMemories();
    }
  };

  // Delete memory from localStorage
  const deleteMemory = (index) => {
    const memories = JSON.parse(localStorage.getItem('memories')) || [];
    memories.splice(index, 1); // Remove memory at given index
    localStorage.setItem('memories', JSON.stringify(memories));
    
    loadMemories();
  };

  // Filter memories based on search query
  const searchMemories = (query) => {
    const memories = JSON.parse(localStorage.getItem('memories')) || [];
    const filteredMemories = memories.filter(memory => 
      memory.category.toLowerCase().includes(query.toLowerCase()) ||
      memory.topic.toLowerCase().includes(query.toLowerCase()) ||
      memory.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    
    displayFilteredMemories(filteredMemories);
  };

  // Display filtered memories
  const displayFilteredMemories = (filteredMemories) => {
    const memoryList = document.getElementById('memory-list');
    memoryList.innerHTML = '';

    filteredMemories.forEach((memory, index) => {
      const memoryCard = document.createElement('div');
      memoryCard.classList.add('memory-card');
      memoryCard.innerHTML = `
        <p><strong>Category:</strong> ${memory.category || 'N/A'} | <strong>Tags:</strong> ${memory.tags.join(', ') || 'N/A'} | <strong>Date:</strong> ${memory.date}</p>
        <h3>${memory.topic}</h3>
        <p>${truncateText(memory.details)}</p>
        <button class="view-more" data-index="${index}">View More</button>
        <button class="edit-memory" data-index="${index}">Edit</button>
        <button class="delete-memory" data-index="${index}">Delete</button>
        <button class="favorite-memory" data-index="${index}">${memory.favorite ? 'Unfavorite' : 'Favorite'}</button>
      `;
      memoryList.appendChild(memoryCard);
    });

    // Add event listeners for buttons
    document.querySelectorAll('.view-more').forEach(button => {
      button.addEventListener('click', viewMore);
    });

    document.querySelectorAll('.edit-memory').forEach(button => {
      button.addEventListener('click', editMemory);
    });

    document.querySelectorAll('.delete-memory').forEach(button => {
      button.addEventListener('click', deleteMemoryPrompt);
    });

    document.querySelectorAll('.favorite-memory').forEach(button => {
      button.addEventListener('click', toggleFavorite);
    });
  };

  // Edit memory
  const editMemory = (event) => {
    const index = event.target.dataset.index;
    const memories = JSON.parse(localStorage.getItem('memories')) || [];
    const memory = memories[index];

    const newTopic = prompt("Edit Topic:", memory.topic);
    if (newTopic !== null) {
      memory.topic = newTopic;
      memory.tags = prompt("Edit Tags (comma separated):", memory.tags.join(', ')).split(',').map(tag => tag.trim());
      memories[index] = memory;
      localStorage.setItem('memories', JSON.stringify(memories));

      // Reload memories to update UI
      loadMemories();
      displayFilteredMemories(memories);
    }
  };

  // Delete memory prompt
  const deleteMemoryPrompt = (event) => {
    const index = event.target.dataset.index;
    if (confirm("Do you want to delete this memory?")) {
      deleteMemory(index);
    }
  };

  // Set up search bar for live filtering
  const searchInput = document.getElementById('search-bar');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchMemories(e.target.value);
    });
  }

  // Initialize memory display
  if (document.getElementById('memory-list')) {
    loadMemories();
  }

  // For user.html - Show all memories (including favorites)
  if (document.getElementById('memory-list')) {
    loadMemories();
  }

  // For index.html - Show only favorites
  if (favoriteMemoriesSection) {
    loadMemories();
  }
});
