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
                
                // toastr.success('Favoritos cargados');
            
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

// Añadir a favoritos 

const iconoFavoritos = document.getElementById('paises-favoritos');
iconoFavoritos.addEventListener('click', async () => {
    if (!session.logged) {
        toastr.warning('Debes iniciar sesión para guardar favoritos');
        return;
    }
    const country = document.querySelector('#input').value.trim();
    if (!country) {
      toastr.warning('Debes ingresar un país');
      return;
    }
    // IMÁGENES
    const imagesModal = document.getElementById('imagesModal');
    if (!imagesModal) return console.error('No se encontró el modal');

    const countryName = imagesModal.querySelector('.images-title')?.textContent.replace('Imágenes de ', '');
    const imgElement = imagesModal.querySelector('img');
    const imageUrl = imgElement?.src || null;

    // NOMBRE PAIS
    const infoModal = document.getElementById('infoModal');
    if (!infoModal) return console.error("No se ha encontrado el modal");
    const countryDescription = document.querySelector('#infoModalContent').innerHTML;

    country.replace('Nombre del país: ', '');
    try {
        const response = await fetch('http://localhost/M12-Proyecto-4-Natalia-Beatriz/backend/public/index.php?action=añadirFavorito', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                nom: countryName || country,
                descripcio: countryDescription,
                categoria: 'País',
                url: imageUrl
            })
        });

        const responseText = await response.text();
        console.log('Raw server response:', responseText);
        
        let result;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            console.error('Failed to parse JSON:', e);
            throw new Error('Invalid server response');
        }

        if (!response.ok) {
            throw new Error(result.message || `HTTP error! status: ${response.status}`);
        }

        if (result.status === 'success') {
            toastr.success(result.message || 'País añadido a favoritos');
            iconoFavoritos.classList.add('active');
        } else {
            throw new Error(result.message || 'No se pudo guardar el país');
        }
    } catch (err) {
        if (err.message && err.message.includes("Integrity constraint violation")) {
            toastr.warning("Ya está en tus favoritos!");
        } else {
            toastr.error(err.message || 'Error al conectar con el servidor');
        }
        console.error('Error guardando favorito:', err);
    }
});
function actualizarMenuFavoritos() {
  const menuFavoritos = document.getElementById('menuFavoritos');
  menuFavoritos.innerHTML = ''; 

  favoritos.forEach((pais) => {
    const listItem = document.createElement('li');
    listItem.textContent = pais;
    menuFavoritos.appendChild(listItem);
  });
}

// DELETE ALL FAVORITES (SELECT ALL)
async function deleteAllFavoritos() {
    if (!confirm('¿Estás seguro de querer eliminar todos los favoritos?')) {
      return;
  }
  try {
    const response = await fetch(`http://localhost/M12-Proyecto-4-Natalia-Beatriz/backend/public/index.php?action=eliminarAllFavoritos`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({id:favoritoId})
    });
    
    if (response.status === 204) {
      toastr.success('Todos tus favoritos se han eliminado');
      await getFavorites();
      return;
    }

    if (!response.ok) {
      throw new Error(result.message || `Error ${response.status}`);
    }

    toastr.success(result.message || 'Favoritos eliminados');
    await getFavorites();
    } catch (error) {
      console.error('Delete error:', error);
      
      if (error.message.includes('servidor')) {
          toastr.error('Error del servidor. Intente más tarde.');
      } else {
          toastr.error(error.message || 'Error al eliminar favorito');
      }
      
      if (confirm('¿Ver detalles del error?')) {
          alert(`Error completo:\n${error.stack}`);
    }
  }
}

// DELETE FAVORITE 
async function deleteFavorito(favoritoId) {
//   if (!confirm('¿Estás seguro de querer eliminar este favorito?')) {
//     return;
// }
  try {
      const response = await fetch(
          `http://localhost/M12-Proyecto-4-Natalia-Beatriz/backend/public/index.php?action=eliminarFavorito`, 
          {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              },
              credentials: 'include',
              body: JSON.stringify({ id: favoritoId })
          }
      );

      if (response.status === 204) {
          toastr.success('Favorito eliminado');
          await getFavorites();
          return;
      }

      const responseText = await response.text();
      
      if (!responseText) {
          throw new Error('El servidor no respondió correctamente');
      }

      const result = JSON.parse(responseText);
      
      if (!response.ok) {
          throw new Error(result.message || `Error ${response.status}`);
      }

      toastr.success(result.message || 'Favorito eliminado');
      await getFavorites();
      
  } catch (error) {
      console.error('Delete error:', error);
      
      if (error.message.includes('servidor')) {
          toastr.error('Error del servidor. Intente más tarde.');
      } else {
          toastr.error(error.message || 'Error al eliminar favorito');
      }
      
      if (confirm('¿Ver detalles del error?')) {
          alert(`Error completo:\n${error.stack}`);
      }
  }
}

export {deleteFavorito};

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-favorite')) {
    const favoritoId = event.target.getAttribute('data-id');
    if (favoritoId) {
      deleteFavorito(favoritoId);
    }
  }
})
