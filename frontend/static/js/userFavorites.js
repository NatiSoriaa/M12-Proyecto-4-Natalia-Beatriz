import {loadToastr} from './toastr.js';
import { checkSession } from './login-register.js';

loadToastr();
checkSession();

async function getFavorites() {
    // const session = await checkSession();
    // if (session.logged) {
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
    // } else {
    //     toastr.warning('Debes iniciar sesión para ver favoritos');
    // }
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

