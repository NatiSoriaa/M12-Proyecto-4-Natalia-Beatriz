import {loadToastr} from './toastr.js';
import { checkSession } from './login-register.js';
const session = await checkSession();
loadToastr();
const visitToggle = document.getElementById('visitado');
const visitIcon = visitToggle.querySelector('img');

visitToggle.addEventListener('click', async () => {
  if (!session?.logged) {
    toastr.warning('Debes iniciar sesión para cambiar el estado');
    return;
  }

  const country = document.querySelector('#input')?.value.trim();
  if (!country) {
    toastr.warning('Selecciona un país primero');
    return;
  }

  try {
    visitToggle.disabled = true;
    visitToggle.classList.add('loading');
    
    // check if visited 
    const isCurrentlyVisited = visitIcon.src.includes('check-visitado.png');
    const newVisitStatus = isCurrentlyVisited ? 0 : 1;

    // update state
    const response = await fetch(
      'http://localhost/M12-Proyecto-4-Natalia-Beatriz/backend/public/index.php?action=actualizarEstadoVisita', 
      {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          nom: country,
          visitado: newVisitStatus
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Error ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message);
    }

    // update images when success
      visitIcon.src = newVisitStatus 
        ? '../static/img/check-visitado.png'
        : '../static/img/pendiente-visitar.png';
    
      visitIcon.alt = newVisitStatus 
        ? 'Marcado como visitado' 
        : 'Pendiente por visitar';
    
      visitIcon.classList.toggle('visited', newVisitStatus);
      visitIcon.classList.toggle('pending', !newVisitStatus);

      toastr.success(result.message);

    } catch (error) {
      console.error('Error:', error);
      toastr.error(error.message || 'Error cambiando estado');
      
    } finally {
      visitToggle.disabled = false;
      visitToggle.classList.remove('loading');
    }
});
  
async function getVisited() {
  if (session.logged) {
      try {
          const response = await fetch("http://localhost/M12-Proyecto-4-Natalia-Beatriz/backend/public/index.php?action=obtenerVisitados", {
              method: 'GET',
              credentials: 'include'
          });
      
          const data = await response.json();
          if(response.ok && data.success) {

              // show images on modal
              const infoModal = document.getElementById('favoritosContainer');              
              infoModal.style.display = 'flex';
              
              displayVisited(data.data);
              
              // toastr.success('Favoritos cargados');
          
          } else {
              toastr.warning('No tienes favoritos guardados');
          }
      } catch (error) {
          toastr.error('Error al cargar favoritos');
          console.error(error);
      }
  } else {
      toastr.warning('Debes iniciar sesión para ver tus visitados');
  }
}

async function displayVisited(visited) {
  const modalContent = document.querySelector('.fav-content');
    
    const title = modalContent.querySelector('.fav-title');
    title.textContent = 'Mis visitados';

    if (!visited || visited.length === 0) {
        title.textContent = 'No tienes visitados';
        return;
    }

    const existingFavoritesContainer = modalContent.querySelector('.favorites-container');
    if (existingFavoritesContainer) {
        existingFavoritesContainer.remove();
    }

    // contenedor visitados
    const visitadosContainer = document.createElement('div');
    visitadosContainer.className = 'favorites-container';
    
    // TODO: user can add the date they completed the visit
    visited.forEach(v => {
        const visitedElement = document.createElement('div');
        visitedElement.className = 'visited-item';
        visitedElement.innerHTML = `
            <p>${v.descripcio || 'Sin descripción'}</p>
            <p><strong>Categoría:</strong> ${v.categoria}</p>
            <p><strong>Fecha completado:</strong> ${v.data_completat}</p>
            <button class="delete-visitado" data-id="${v.id}">Eliminar</button>
        `;
        visitadosContainer.appendChild(visitedElement);
    });
    
    modalContent.appendChild(visitadosContainer);
}


document.querySelector('#paisesVisitados').addEventListener('click', () => {
  getVisited();
});

async function cargarPendientes() {
  try {
      const response = await fetch(
          'http://localhost/M12-Proyecto-4-Natalia-Beatriz/backend/public/index.php?action=obtenerPendientes',
          {
              method: 'GET',
              credentials: 'include'
          }
      );

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          throw new Error(`Respuesta inesperada: ${text.substring(0, 100)}...`);
      }

      const data = await response.json();
      
      if (!data.success) {
          throw new Error(data.message || 'Error al obtener pendientes');
      }
      const infoModal = document.getElementById('favoritosContainer');              
      infoModal.style.display = 'flex';
      
      displayPendiente(data.data);
      
  } catch (error) {
      console.error('Error al cargar pendientes:', error);
      toastr.error(error.message || 'Error al cargar pendientes');
  }
}

async function displayPendiente(pendientes) {
  const modalContent = document.querySelector('.fav-content');
    
    const title = modalContent.querySelector('.fav-title');
    title.textContent = 'Mis pendientes';

    if (!pendientes || pendientes.length === 0) {
        title.textContent = 'No tienes pendientes';
        return;
    }

    const existingFavoritesContainer = modalContent.querySelector('.favorites-container');
    if (existingFavoritesContainer) {
        existingFavoritesContainer.remove();
    }

    const pendientesContainer = document.createElement('div');
    pendientesContainer.className = 'favorites-container';
    
    pendientes.forEach(v => {
        const pendientesElement = document.createElement('div');
        pendientesElement.className = 'pendientes-item';
        pendientesElement.innerHTML = `
            <p>${v.descripcio || 'Sin descripción'}</p>
            <p><strong>Categoría:</strong> ${v.categoria}</p>
            <p><strong>Fecha añadido:</strong> ${v.data_afegit}</p>
            <button class="delete-pendiente" data-id="${v.id}">Eliminar</button>
        `;
        pendientesContainer.appendChild(pendientesElement);
    });
    
    modalContent.appendChild(pendientesContainer);
}