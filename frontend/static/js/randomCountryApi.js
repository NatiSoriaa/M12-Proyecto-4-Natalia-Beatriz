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
  try {
    // busqueda exacta
    let response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`);
    
    // busqueda parcial
    if (!response.ok) {
      response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`);
    }
    
    if (!response.ok) {
      toastr.error("No se ha encontrado información del país");
    }

    const data = await response.json();
    return data[0]; 

  } catch (error) {
    toastr.error("Error del servidor");
    return null;
  }
}

export { restCountryInfo };