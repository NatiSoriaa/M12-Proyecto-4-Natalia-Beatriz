// Función para obtener información del país desde Wikipedia
async function getCountryInfo(countryName) {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&exintro&explaintext&titles=${encodeURIComponent(countryName)}`
      );
      const data = await response.json();
  
      // Extraer la información del país
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      const countryInfo = pages[pageId].extract;
  
      return countryInfo || "No se encontró información para este país.";
    } catch (error) {
      console.error("Error al obtener información del país:", error);
      return "Hubo un error al obtener la información.";
    }
  }
  
  // Exportar la función para usarla en otros archivos
  export { getCountryInfo };


const imagesButton = document.getElementById('imagesButton');
const searchInput = document.getElementById('input');
imagesButton.addEventListener('click', () => {
    const location = searchInput.value;
    searchByLocation(location);
});

//busqueda de imagenes por commons
const searchByLocation = async (location) => {
    const apiModal = document.getElementById("apiModal");
    apiModal.innerHTML = ""; 

    const imagesCommons = `https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&generator=images&titles=${encodeURIComponent(location)}&gimlimit=10&prop=imageinfo&iiprop=url`;

    try {
        const response = await fetch(imagesCommons);
        const data = await response.json();

        if (data.query && data.query.pages) {
            let imagesFound = false;

            Object.values(data.query.pages).forEach((page) => {
                apiModal.innerHTML = `<h3>A la primera!! Estas son imágenes de Commons</h3>`;

                if (page.imageinfo && page.imageinfo[0]) {
                    imagesFound = true;
                    createImageCard(page.imageinfo[0].url, page.title, apiModal);
                }
            });

            if (!imagesFound) {
                console.log("No se encontraron imágenes en Commons. Buscando en SerpAPI...");
                apiModal.innerHTML = `<h3>No he encontrado imágenes en Commons. Voy a buscar en Serpapi...</h3>`;
                // await fetchSerpApi(location, apiModal);
            }
        } else {
            console.log("No se encontraron imágenes en Commons. Buscando en SerpAPI...");
            apiModal.innerHTML = `<h3>No he encontrado imágenes en Commons. Voy a buscar en Serpapi...</h3>`;
            // await fetchSerpApi(location, apiModal);
        }
    } catch (error) {
        console.error("Error buscando imágenes en Commons", error);
        apiModal.innerHTML = `<h3>Error buscando en Commons...</h3>`;
        // await fetchSerpApi(location, apiModal);
    }
}