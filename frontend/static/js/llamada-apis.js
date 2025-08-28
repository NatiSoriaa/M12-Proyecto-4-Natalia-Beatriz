import { checkSession } from './login-register.js';
const session = await checkSession();




// FUNCION PARA OBTENER INFORMACION DEL PAIS DESDE WIKIPEDIA




async function getCountryInfo(countryName) {
    try {
        const response = await fetch(
            `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&exintro&explaintext&titles=${encodeURIComponent(countryName)}`
        );
        const data = await response.json();

        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        const countryInfo = pages[pageId].extract;

        return countryInfo || "No se encontró información para este país.";
    } catch (error) {
        toastr.error("Error al obtener información del país:", error);
        return "Hubo un error al obtener la información.";
    }
}

export { getCountryInfo };




// FUNCION PARA GENERAR PDF DE LA INFORMACION MOSTRADA




function generatePDF() {
    const element = document.getElementById('exportOnly');
    if (!element) {
        toastr.error('Nada por exportar');
        return;
    }
    const opt = {
        margin:       0.5,
        filename:     'pais-info.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}

export { generatePDF };




// BOTON DE BUSQUEDA DE IMAGENES (por nombre del pais)




const imagesButton = document.getElementById('imagesButton');
const searchInput = document.getElementById('input');
imagesButton.addEventListener('click', () => {
    const location = searchInput.value;
    searchByLocation(location);
});




// FUNCION PARA BUSCAR IMAGENES DE UN PAIS EN WIKIMEDIA COMMONS




const searchByLocation = async (location) => {
    const imagesModal = document.getElementById('imagesModal');
    const imagesGrid = document.querySelector('.images-grid');
    const imagesTitle = document.querySelector('.images-title');

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
        showImagesMessage('Error al buscar imágenes. Intente más tarde.', imagesGrid);
    }
};




// FUNCION PARA CREAR TARJETAS DE IMAGEN CON BOTONES DE ACCIONES




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

    const copyButton = createActionButton('📋', 'Copiar URL', () => {
        navigator.clipboard.writeText(imageUrl)
            .then(() => toastr.success('URL copiada al portapapeles'))
            .catch(err => console.error('Error al copiar:', err));
    });
    actions.appendChild(copyButton);

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

    const fullscreenButton = createActionButton('🔍', 'Pantalla completa', () => {
        if (img.requestFullscreen) {
            img.requestFullscreen();
        } else if (img.webkitRequestFullscreen) {
            img.webkitRequestFullscreen();
        }
    });
    actions.appendChild(fullscreenButton);

    const addToFavoritesButton = createButton("🤍", "Añadir a favoritos", async () => {
        if (!session.logged) {
            toastr.warning('Debes iniciar sesión para guardar favoritos');
            return;
        }

        try {
            const response = await fetch("https://earth-project-backend.onrender.com/index.php?action=añadirFavorito", {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    nom: altText,
                    descripcio: `Imagen: ${altText}`,
                    categoria: 'imagen',
                    url: imageUrl
                })
            });

            if (!response.ok) {
                throw new Error('Request failed');
            }

            addToFavoritesButton.textContent = "❤️";
            toastr.success('Añadido a favoritos', 'Éxito');

        } catch (error) {
            console.error('Error:', error);
            addToFavoritesButton.textContent = "🤍";
            toastr.error(error.message || 'Error al guardar favorito');
        }
    });

    actions.appendChild(addToFavoritesButton);

    card.appendChild(actions);
    container.appendChild(card);
}




// FUNCION PARA CREAR BOTONES DE ACCION




function createActionButton(icon, tooltip, onClick) {
    const button = document.createElement('button');
    button.innerHTML = icon;
    button.title = tooltip;
    button.addEventListener('click', onClick);
    return button;
}




// FUNCION PARA MOSTRAR MENSAJES CUANDO NO HAY IMAGENES




function showImagesMessage(message, container) {
    const messageElement = document.createElement('div');
    messageElement.className = 'images-message';
    messageElement.textContent = message;
    container.appendChild(messageElement);
}




// VERIFICAR QUE HAY UN PAIS INGRESADO




document.getElementById('imagesButton').addEventListener('click', () => {
    const country = document.querySelector('#input').value;
    if (country) {
        searchByLocation(country);
    } else {
        toastr.warning('Por favor, ingrese un país primero');
    }
});




// FUNCION PARA CREAR BOTONES GENERALES




function createButton(icon, tooltip, onClick) {
    const button = document.createElement("button");
    button.innerHTML = icon;
    button.title = tooltip;
    button.addEventListener("click", onClick);
    return button;
}

export { searchByLocation };
