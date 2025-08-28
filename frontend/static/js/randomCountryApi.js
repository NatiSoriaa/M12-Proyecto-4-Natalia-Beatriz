// EVENTOS AL CARGAR DOM Y BOTONES DEL MODAL ALEATORIO

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




// FUNCION PARA OBTENER UN PAIS ALEATORIO Y MOSTRARLO EN EL MODAL




async function getRandomCountry() {
  try {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,region,flags');
      const countries = await response.json();

      const randomIndex = Math.floor(Math.random() * countries.length);
      const country = countries[randomIndex];

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




// FUNCION PARA CERRAR EL MODAL DE PAIS ALEATORIO




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




// FUNCION PARA BUSCAR INFORMACION DE UN PAIS DESDE LA API DE RESTCOUNTRIES




async function restCountryInfo(countryName) {
  try {
      let response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`);

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
