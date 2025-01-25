// script.js

// Retrieve memories from local storage
function getMemories() {
  const memories = JSON.parse(localStorage.getItem('memories')) || [];
  return memories;
}

// Save memory to local storage
function saveMemory(memory) {
  const memories = getMemories();
  memories.push(memory);
  localStorage.setItem('memories', JSON.stringify(memories));
}

// Delete memory
function deleteMemory(index) {
  const memories = getMemories();
  memories.splice(index, 1); // Remove memory at index
  localStorage.setItem('memories', JSON.stringify(memories));
  displayFavorites(); // Refresh the favorites list
  displayAllMemories(getMemories()); // Refresh the all memories list
}

// Edit memory
function editMemory(index) {
  const memories = getMemories();
  const memory = memories[index];
  document.getElementById('memory-category').value = memory.category;
  document.getElementById('memory-topic').value = memory.topic;
  document.getElementById('memory-details').value = memory.details;
  document.getElementById('memory-tags').value = memory.tags.join(', ');

  // Change form submit handler to update memory instead of adding new one
  document.getElementById('memory-form').onsubmit = function (e) {
    e.preventDefault();
    updateMemory(index);
  };
}

// Update memory after editing
function updateMemory(index) {
  const category = document.getElementById('memory-category').value;
  const topic = document.getElementById('memory-topic').value;
  const details = document.getElementById('memory-details').value;
  const tags = document.getElementById('memory-tags').value;

  const memories = getMemories();
  memories[index] = { 
    category, 
    topic, 
    details, 
    tags: tags.split(',').map(tag => tag.trim()),
    date: new Date().toLocaleString(), // Automatically set the current date and time
    favorite: false // Default to not favorited
  };
  localStorage.setItem('memories', JSON.stringify(memories));

  // Reset form and update memory lists
  document.getElementById('memory-form').reset();
  displayFavorites();
  displayAllMemories(getMemories());
}

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
          <button onclick="editMemory(${index})">✏️</button>
          <button onclick="deleteMemory(${index})">🗑️</button>
          <button onclick="toggleFavorite(${index})">${memory.favorite ? '❤️' : '🤍'}</button>
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

// Shorten text for details to show only 4 lines and add "View More" link
function shortenText(text, index) {
  const maxLines = 4; // Max number of lines to show
  const lineHeight = 1.5; // Approximate line height in ems
  const container = document.createElement('div');
  container.style.display = 'inline-block';
  container.style.maxHeight = `${maxLines * lineHeight}em`;
  container.style.overflow = 'hidden';
  container.style.whiteSpace = 'pre-wrap'; // Preserve line breaks in the text

  const shortenedText = text.split('\n').slice(0, maxLines).join('\n');
  container.textContent = shortenedText;

  // Create "View More" link if the content exceeds maxLines
  const viewMoreLink = document.createElement('a');
  viewMoreLink.href = '#';
  viewMoreLink.textContent = 'View More';
  viewMoreLink.onclick = function() {
    viewMore(index, text); // Show full text on click
  };

  if (text.split('\n').length > maxLines) {
    container.appendChild(viewMoreLink);
  }

  return container.outerHTML;
}

// Show full details when 'View More' is clicked
function viewMore(index, fullText) {
  const memoryDiv = document.querySelectorAll('.memory-item')[index];
  const detailsDiv = memoryDiv.querySelector('div');
  detailsDiv.textContent = fullText; // Replace shortened text with full text
  const viewMoreLink = memoryDiv.querySelector('a');
  viewMoreLink.remove(); // Remove 'View More' link
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
        <button onclick="editMemory(${index})">✏️</button>
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

// Initial call to display favorite memories on index.html
if (document.body.contains(document.getElementById('favorite-list'))) {
  displayFavorites();
}

// Initial call to display all memories on all-memory.html
if (document.body.contains(document.getElementById('memory-list'))) {
  displayAllMemories(getMemories());
}
