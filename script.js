document.addEventListener('DOMContentLoaded', () => {
  // Load and display memories
  const loadMemories = () => {
    const memories = JSON.parse(localStorage.getItem('memories')) || [];
    const memoryList = document.getElementById('memory-list');
    memoryList.innerHTML = '';

    if (memories.length === 0) {
      memoryList.innerHTML = '<p>No memories saved yet!</p>';
      return;
    }

    memories.forEach((memory, index) => {
      const memoryItem = document.createElement('div');
      memoryItem.classList.add('memory-card');
      memoryItem.innerHTML = `
        <p><strong>Category:</strong> ${memory.category || 'N/A'} | <strong>Tags:</strong> ${memory.tags.join(', ') || 'N/A'} | <strong>Date:</strong> ${memory.date}</p>
        <h3>${memory.topic}</h3>
        <p>${memory.details}</p>
        <button class="edit-btn" data-index="${index}">Edit</button>
        <button class="delete-btn" data-index="${index}">Delete</button>
        <button class="fav-btn" data-index="${index}">${memory.favorite ? 'Unfavorite' : 'Favorite'}</button>
      `;
      memoryList.appendChild(memoryItem);
    });

    // Attach event listeners for edit, delete, and favorite buttons
    document.querySelectorAll('.edit-btn').forEach(button => button.addEventListener('click', editMemory));
    document.querySelectorAll('.delete-btn').forEach(button => button.addEventListener('click', deleteMemory));
    document.querySelectorAll('.fav-btn').forEach(button => button.addEventListener('click', toggleFavorite));
  };

  // Edit memory
  const editMemory = (event) => {
    const index = event.target.dataset.index;
    const memories = JSON.parse(localStorage.getItem('memories')) || [];
    const memory = memories[index];

    const newTopic = prompt('Edit Topic:', memory.topic);
    const newTags = prompt('Edit Tags (comma separated):', memory.tags.join(', '));

    if (newTopic !== null) memory.topic = newTopic;
    if (newTags !== null) memory.tags = newTags.split(',').map(tag => tag.trim());

    memories[index] = memory;
    localStorage.setItem('memories', JSON.stringify(memories));
    loadMemories();
  };

  // Delete memory
  const deleteMemory = (event) => {
    if (confirm('Do you want to delete your memory?')) {
      const index = event.target.dataset.index;
      const memories = JSON.parse(localStorage.getItem('memories')) || [];
      memories.splice(index, 1);
      localStorage.setItem('memories', JSON.stringify(memories));
      loadMemories();
    }
  };

  // Toggle favorite status
  const toggleFavorite = (event) => {
    if (confirm('Do you want this memory to be your favorite memory?')) {
      const index = event.target.dataset.index;
      const memories = JSON.parse(localStorage.getItem('memories')) || [];
      const memory = memories[index];
      memory.favorite = !memory.favorite;
      memories[index] = memory;
      localStorage.setItem('memories', JSON.stringify(memories));
      loadMemories();
    }
  };

  // Handle search bar input (real-time filtering)
  const searchBar = document.getElementById('search-bar');
  searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    const memories = JSON.parse(localStorage.getItem('memories')) || [];
    const filteredMemories = memories.filter(memory =>
      memory.topic.toLowerCase().includes(query) ||
      memory.category.toLowerCase().includes(query) ||
      memory.tags.some(tag => tag.toLowerCase().includes(query))
    );
    displayFilteredMemories(filteredMemories);
  });

  // Display filtered memories
  const displayFilteredMemories = (memories) => {
    const memoryList = document.getElementById('memory-list');
    memoryList.innerHTML = '';

    if (memories.length === 0) {
      memoryList.innerHTML = '<p>No matching memories found.</p>';
      return;
    }

    memories.forEach((memory, index) => {
      const memoryItem = document.createElement('div');
      memoryItem.classList.add('memory-card');
      memoryItem.innerHTML = `
        <p><strong>Category:</strong> ${memory.category || 'N/A'} | <strong>Tags:</strong> ${memory.tags.join(', ') || 'N/A'} | <strong>Date:</strong> ${memory.date}</p>
        <h3>${memory.topic}</h3>
        <p>${memory.details}</p>
        <button class="edit-btn" data-index="${index}">Edit</button>
        <button class="delete-btn" data-index="${index}">Delete</button>
        <button class="fav-btn" data-index="${index}">${memory.favorite ? 'Unfavorite' : 'Favorite'}</button>
      `;
      memoryList.appendChild(memoryItem);
    });

    // Attach event listeners for edit, delete, and favorite buttons
    document.querySelectorAll('.edit-btn').forEach(button => button.addEventListener('click', editMemory));
    document.querySelectorAll('.delete-btn').forEach(button => button.addEventListener('click', deleteMemory));
    document.querySelectorAll('.fav-btn').forEach(button => button.addEventListener('click', toggleFavorite));
  };

  // Load memories when page loads
  loadMemories();
});
