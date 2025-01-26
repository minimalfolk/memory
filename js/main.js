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

// Show options box when clicking the "Options" button
function showOptionsBox(index) {
  selectedMemoryIndex = index; // Set the selected memory index
  document.getElementById('options-box').style.display = 'block';
}

// Hide options box when clicking outside
window.onclick = function(event) {
  const box = document.getElementById('options-box');
  if (event.target !== box && !box.contains(event.target)) {
    box.style.display = 'none';
  }
}

// Edit memory from options
function editMemoryFromOptions() {
  editMemory(selectedMemoryIndex);
  document.getElementById('options-box').style.display = 'none';
}

// Delete memory from options
function deleteMemoryFromOptions() {
  deleteMemory(selectedMemoryIndex);
  document.getElementById('options-box').style.display = 'none';
}

// Toggle favorite from options
function toggleFavoriteFromOptions() {
  toggleFavorite(selectedMemoryIndex);
  document.getElementById('options-box').style.display = 'none';
}
