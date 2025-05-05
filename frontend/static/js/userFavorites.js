import {loadToastr} from './toastr.js';
import { checkSession } from './login-register.js';

loadToastr();
const session = await checkSession();

async function getFavorites() {
    if (session.logged) {
        try {
            const response = await fetch("http://localhost/M12-Proyecto-4-Natalia-Beatriz/backend/public/index.php?action=obtenerFavoritos", {
                method: 'GET',
                credentials: 'include'
            });
        
            const data = await response.json();
            if(response.ok && data.success) {

                // show images on modal
                const infoModal = document.getElementById('favoritosContainer');              
                infoModal.style.display = 'flex';
                
                displayFavorites(data.data);
                
                toastr.success('Favoritos cargados');
            
            } else {
                toastr.warning('No tienes favoritos guardados');
            }
        } catch (error) {
            toastr.error('Error al cargar favoritos');
            console.error(error);
        }
    } else {
        toastr.warning('Debes iniciar sesión para ver favoritos');
    }
}

function displayFavorites(favorites) {
    const modalContent = document.querySelector('.fav-content');
    
    const title = modalContent.querySelector('.fav-title');
    title.textContent = 'Mis Favoritos';

    if (!favorites || favorites.length === 0) {
        title.textContent = 'No tienes favoritos';
        return;
    }

    const existingFavoritesContainer = modalContent.querySelector('.favorites-container');
    if (existingFavoritesContainer) {
        existingFavoritesContainer.remove();
    }

    // nuevo contenedor favoritos
    const favoritesContainer = document.createElement('div');
    favoritesContainer.className = 'favorites-container';
    
    favorites.forEach(fav => {
        const favElement = document.createElement('div');
        favElement.className = 'favorite-item';
        favElement.innerHTML = `
            <h3>${fav.nom}</h3>
            <p>${fav.descripcio || 'Sin descripción'}</p>
            <p><strong>Categoría:</strong> ${fav.categoria}</p>
            <button class="delete-favorite" data-id="${fav.id}">Eliminar</button>
        `;
        favoritesContainer.appendChild(favElement);
    });
    
    modalContent.appendChild(favoritesContainer);
}

document.querySelector('#favoritos').addEventListener('click', () => {
    getFavorites();
});

// Cerrar al hacer click fuera
const favoritosContainer = document.getElementById('favoritosContainer');
favoritosContainer.addEventListener('click', (event) => {
    const modalContent = document.querySelector('.fav-content');
    if (!modalContent.contains(event.target)) {
        favoritosContainer.style.display = 'none';
    }
});

// Add to favorites

const iconoFavoritos = document.getElementById('paises-favoritos');
iconoFavoritos.addEventListener('click', async () => {
    if (!session.logged) {
        toastr.warning('Debes iniciar sesión para guardar favoritos');
        return;
    }

    const imagesModal = document.getElementById('imagesModal');
    if (!imagesModal) return console.error('No se encontró el modal');

    const countryName = imagesModal.querySelector('.images-title')?.textContent.replace('Imágenes de ', '');
    const imgElement = imagesModal.querySelector('img');
    const imageUrl = imgElement?.src || null;

    try {
        const response = await fetch('http://localhost/M12-Proyecto-4-Natalia-Beatriz/backend/public/index.php?action=añadirFavorito', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                nom: countryName,
                descripcio: `País: ${countryName}`,
                categoria: 'país',
                url: imageUrl
            })
        });

        if (response.ok && result.status === 'success') {
            toastr.success(result.message || 'País añadido a favoritos');
            iconoFavoritos.classList.add('active');
        } else {
            throw new Error(result.message || 'No se pudo guardar el país');
        }
    } catch (err) {
        console.error('Error guardando favorito:', err);
        toastr.error(err.message || 'Error al conectar con el servidor');
    }
});
// function actualizarMenuFavoritos() {
//   const menuFavoritos = document.getElementById('menuFavoritos');
//   menuFavoritos.innerHTML = ''; 

//   favoritos.forEach((pais) => {
//     const listItem = document.createElement('li');
//     listItem.textContent = pais;
//     menuFavoritos.appendChild(listItem);
//   });
// }