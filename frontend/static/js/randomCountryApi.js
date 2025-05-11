document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('random-country-btn').addEventListener('click', getRandomCountry);

    document.getElementById('closeRandomModal').addEventListener('click', () => {
        closeRandomModal();
    });

    document.getElementById('random-country-modal').addEventListener('click', (event) => {
        if (event.target === document.getElementById('random-country-modal')) {
        closeRandomModal();
        }
    });
});

async function getRandomCountry() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();

    // random country
    const randomIndex = Math.floor(Math.random() * countries.length);
    const country = countries[randomIndex];

    // show info in modal
    document.getElementById('country-name').textContent = country.name.common;
    document.getElementById('country-capital').textContent = country.capital ? country.capital[0] : 'No disponible';
    document.getElementById('country-region').textContent = country.region;
    document.getElementById('country-flag').src = country.flags.svg;
    
    gsap.fromTo(document.getElementById('random-country-modal'), { opacity: 0 }, { opacity: 1, duration: 0.5 });
    document.getElementById('random-country-modal').style.display = 'flex';
  
} catch (error) {
    console.error('Error fetching country data:', error);
  }
}

function closeRandomModal() {
  const modal = document.getElementById('random-country-modal');
  gsap.to(modal, {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      modal.style.display = 'none';
    }
  });
}

// randomCountryApi.js
async function restCountryInfo(countryName) {
  const normalized = countryName.trim().toLowerCase();

  try {
    // Paso 1: buscar traducciones
    let response = await fetch(`https://restcountries.com/v3.1/translation/${encodeURIComponent(normalized)}`);
    let data = [];

    if (response.ok) {
      data = await response.json();

      // Filtrar país cuya traducción sea exacta
      const exactMatch = data.find(country => {
        const translations = country.translations || {};
        return Object.values(translations).some(t =>
          t.common?.toLowerCase() === normalized
        );
      });

      if (exactMatch) return exactMatch;
    }

    // Paso 2: fallback: buscar por nombre parcial
    response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(normalized)}`);
    if (response.ok) {
      data = await response.json();
      return data[0];
    }

    throw new Error('No se encontró el país');

  } catch (error) {
    console.error('Error al obtener datos del país:', error);
    return null;
  }
}


export { restCountryInfo };