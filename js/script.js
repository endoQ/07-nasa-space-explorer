document.addEventListener('DOMContentLoaded', () => {
// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const button = document.getElementById('get_images_button');
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalExplanation = document.getElementById('modalExplanation');
const closeModal = document.getElementById('closeModal');

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);
const API_KEY = 'hICmplEOkqH5sOWJWudqoR67CjcMeSdi4SfeQw1h';

button.addEventListener('click', async () => {
  const startDate = startInput.value;
  const endDate = endInput.value;
  gallery.innerHTML = '<p>Loading...</p>';
  try{
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`
    );
    const data = await response.json();
    data.reverse(); // Shows most recent images first
    gallery.innerHTML = '';
    data.forEach(item => {
      if(item.media_type !== 'image') return;
      const card = document.createElement('div');
      card.classList.add('gallery-item');
      card.innerHTML = `
        <img src="${item.url}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.date}</p>
      `;
      card.addEventListener('click', () => {
        modalImg.src = item.url;
        modalTitle.textContent = item.title;
        modalDate.textContent = item.date;
        modalExplanation.textContent = item.explanation;

        modal.classList.remove('hidden');
      });
      gallery.appendChild(card);
    });
    }catch(error){
      gallery.innerHTML = '<p>Error loading images. Try again.</p>';
      console.error(error);
    }
});

closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Close when clicking outside content
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.classList.add('hidden');
  }
});
});