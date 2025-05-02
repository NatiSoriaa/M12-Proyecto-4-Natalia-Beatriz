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
    const apiModalContent = document.getElementById("modalContent");
    apiModalContent.innerHTML = ""; 

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
                    createImageCard(page.imageinfo[0].url, page.title, apiModalContent);
                }
            });

            if (!imagesFound) {
                console.log("No se encontraron imágenes en Commons. Buscando en SerpAPI...");
                apiModalContent.innerHTML = `<h3>No he encontrado imágenes en Commons. Voy a buscar en Serpapi...</h3>`;
                // await fetchSerpApi(location, apiModal);
            }
        } else {
            console.log("No se encontraron imágenes en Commons. Buscando en SerpAPI...");
            apiModalContent.innerHTML = `<h3>No he encontrado imágenes en Commons. Voy a buscar en Serpapi...</h3>`;
            // await fetchSerpApi(location, apiModal);
        }
    } catch (error) {
        console.error("Error buscando imágenes en Commons", error);
        apiModalContent.innerHTML = `<h3>Error buscando en Commons...</h3>`;
        // await fetchSerpApi(location, apiModal);
    }
}
function createImageCard(imageUrl, altText, container) {
    const card = document.createElement("div");
    card.className = "image-card";
    // card.style.padding = "10px";
    // card.style.margin = "10px";
    card.style.textAlign = "center";

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = altText;
    img.style.width = "300px"; 
    img.style.height = "230px";
    img.style.borderRadius = "5px";
    img.loading = "lazy"; //mejora el rendimiento
    card.appendChild(img);

    //boton donde metemos las tres funciones
    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "center";
    buttonContainer.style.gap = "10px";
    buttonContainer.style.padding = "10px";

    //API CLIPBOARD
    const copyButton = createButton("📋", "Copiar URL", () => {
        navigator.clipboard.writeText(img.src).then(() => {
            alert("URL copiada al portapapeles: " + img.src);
        });
    });
    buttonContainer.appendChild(copyButton);

    //API SHARE
    const shareButton = createButton("🔗", "Compartir", () => {
        navigator.share({
            title: "Imagen de " + altText,
            url: img.src,
        }).catch((error) => {
            console.error("Error al compartir la imagen", error);
        });
    });
    buttonContainer.appendChild(shareButton);

    //API FULLSCREEN para los distintos navegadores
    const fullscreenButton = createButton("🔍", "Pantalla completa", () => {
        if (img.requestFullscreen) {
            img.requestFullscreen();
        } else if (img.mozRequestFullScreen) { //firefox
            img.mozRequestFullScreen();
        } else if (img.webkitRequestFullscreen) { //chrome, safari, opera
            img.webkitRequestFullscreen();
        } else if (img.msRequestFullscreen) { //ie/edge
            img.msRequestFullscreen();
        }
    });
    buttonContainer.appendChild(fullscreenButton);

    card.appendChild(buttonContainer);
    container.appendChild(card);
}
function createButton(icon, tooltip, onClick) {
    const button = document.createElement("button");
    button.innerHTML = icon;
    button.title = tooltip;
    button.style.border = "none";
    button.style.background = "none";
    button.style.cursor = "pointer";
    button.style.fontSize = "20px";
    button.addEventListener("click", onClick);
    return button;
}