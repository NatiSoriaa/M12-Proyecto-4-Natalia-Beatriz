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
// Función para buscar imágenes
const searchByLocation = async (location) => {
    const imagesModal = document.getElementById('modalContent');
    const imagesGrid = document.querySelector('.images-grid');
    const imagesTitle = document.querySelector('.images-title');
    
    // Mostrar el contenedor
    imagesModal.classList.add('active');
    imagesTitle.textContent = `Imágenes de ${location}`;
    imagesGrid.innerHTML = '';

    try {
        const response = await fetch(
            `https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&generator=images&titles=${encodeURIComponent(location)}&gimlimit=10&prop=imageinfo&iiprop=url`
        );
        const data = await response.json();

        if (data.query?.pages) {
            let imagesFound = false;
            
            Object.values(data.query.pages).forEach((page) => {
                if (page.imageinfo?.[0]?.url) {
                    imagesFound = true;
                    createImageCard(page.imageinfo[0].url, page.title, imagesGrid);
                }
            });

            if (!imagesFound) {
                showImagesMessage('No se encontraron imágenes en Wikimedia Commons', imagesGrid);
            }
        } else {
            showImagesMessage('No se encontraron resultados', imagesGrid);
        }
    } catch (error) {
        console.error("Error buscando imágenes:", error);
        showImagesMessage('Error al buscar imágenes. Intente más tarde.', imagesGrid);
    }
};

// Función para crear tarjetas de imagen
function createImageCard(imageUrl, altText, container) {
    const card = document.createElement('div');
    card.className = 'image-card';

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = altText;
    img.loading = 'lazy';
    card.appendChild(img);

    const actions = document.createElement('div');
    actions.className = 'image-actions';

    // Botón copiar
    const copyButton = createActionButton('📋', 'Copiar URL', () => {
        navigator.clipboard.writeText(imageUrl)
            .then(() => toastr.success('URL copiada al portapapeles'))
            .catch(err => console.error('Error al copiar:', err));
    });
    actions.appendChild(copyButton);

    // Botón compartir
    const shareButton = createActionButton('🔗', 'Compartir', () => {
        if (navigator.share) {
            navigator.share({
                title: `Imagen de ${altText}`,
                url: imageUrl
            }).catch(err => console.error('Error al compartir:', err));
        } else {
            toastr.info('La función de compartir no está disponible en este navegador');
        }
    });
    actions.appendChild(shareButton);

    // Botón pantalla completa
    const fullscreenButton = createActionButton('🔍', 'Pantalla completa', () => {
        if (img.requestFullscreen) {
            img.requestFullscreen();
        } else if (img.webkitRequestFullscreen) {
            img.webkitRequestFullscreen();
        }
    });
    actions.appendChild(fullscreenButton);

    const addToFavoritesButton = createButton("🤍", "Añadir a favoritos", () => {
        const isFavorite = addToFavoritesButton.classList.toggle('favorito');
      
        if (isFavorite) {
          addToFavoritesButton.textContent = "❤️"; // Ícono rojo
        } else {
          addToFavoritesButton.textContent = "🤍"; // Ícono blanco
        }
      });
    
    actions.appendChild(addToFavoritesButton);

    card.appendChild(actions);
    container.appendChild(card);
}

// Función auxiliar para crear botones de acción
function createActionButton(icon, tooltip, onClick) {
    const button = document.createElement('button');
    button.innerHTML = icon;
    button.title = tooltip;
    button.addEventListener('click', onClick);
    return button;
}

// Función para mostrar mensajes
function showImagesMessage(message, container) {
    const messageElement = document.createElement('div');
    messageElement.className = 'images-message';
    messageElement.textContent = message;
    container.appendChild(messageElement);
}

// Cerrar el contenedor de imágenes
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('imagesModalContainer').style.display='none';
});

// Evento del botón de imágenes
document.getElementById('imagesButton').addEventListener('click', () => {
    const country = document.querySelector('#input').value;
    if (country) {
        searchByLocation(country);
    } else {
        toastr.warning('Por favor, ingrese un país primero');
    }
});
function createButton(icon, tooltip, onClick) {
    const button = document.createElement("button");
    button.innerHTML = icon;
    button.title = tooltip;
    button.addEventListener("click", onClick);
    return button;
}
export { searchByLocation };