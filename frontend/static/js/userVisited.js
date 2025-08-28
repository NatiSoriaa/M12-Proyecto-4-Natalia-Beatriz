



// IMPORTACIONES Y CONFIGURACIÓN INICIAL




import {loadToastr} from './toastr.js';
import { checkSession } from './login-register.js';
// import { initializeStarRating } from './starRating.js';

const session = await checkSession();
loadToastr();

const visitToggle = document.getElementById('visitado');
const visitIcon = visitToggle.querySelector('img');




// EVENTO CLICK PARA MARCAR/QUITAR "VISITADO"




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
    const isVisited = visitIcon.src.endsWith('check-visitado.png');
    const newVisitStatus = isVisited ? 0 : 1;

    // update state
    const response = await fetch(
      'https://earth-project-backend.onrender.com/index.php?action=actualizarEstadoVisita', 
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




// FUNCIÓN PARA OBTENER LUGARES VISITADOS




async function getVisited() {
  if (session.logged) {
      try {
          const response = await fetch("https://earth-project-backend.onrender.com/index.php?action=obtenerVisitados", {
              method: 'GET',
              credentials: 'include'
          });
      
          const data = await response.json();
          if(response.ok && data.success) {
              const infoModal = document.getElementById('favoritosContainer');              
              infoModal.style.display = 'flex';
              displayVisited(data.data);
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




// FUNCIÓN PARA MOSTRAR VISITADOS EN MODAL




async function displayVisited(visited) {
  const modalContent = document.querySelector('.fav-content');
  gsap.fromTo(modalContent, { opacity: 0 }, { opacity: 1, duration: 0.5 });

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

  const visitadosContainer = document.createElement('div');
  visitadosContainer.className = 'favorites-container';
  
  visited.forEach(v => {
    const visitedElement = document.createElement('div');
    visitedElement.className = 'visited-item';
    
    const puntuacion = v.puntuacion || 0;

    const emojiHTML = [1, 2, 3, 4, 5].map(rating => {
      const emojiIcons = ['😞','😐','🙂','😊','😁'];
      const selectedClass = puntuacion == rating ? 'selected' : '';
      return `<span class="emoji ${selectedClass}" data-rating="${rating}">${emojiIcons[rating - 1]}</span>`;
    }).join('');

    visitedElement.innerHTML = `
        <p>${v.descripcio || 'Sin descripción'}</p>
        <p><strong>Categoría:</strong> ${v.categoria}</p>
        <div class="emoji-rating" data-id="${v.id}">
          ${emojiHTML}
        </div>
        <button class="delete-visitado" data-id="${v.id}" data-nom=${v.nom}>Eliminar</button>
    `;

    visitadosContainer.appendChild(visitedElement);
  });

  modalContent.appendChild(visitadosContainer);
  setupEmojiListeners();
  setupDeleteVisitedListeners();
}




// EVENTO PARA ABRIR MODAL DE VISITADOS




document.querySelector('#paisesVisitados').addEventListener('click', () => {
  getVisited();
});




// FUNCIÓN PARA GUARDAR RATING EMOJI EN DB




function setupEmojiListeners() {
  document.querySelectorAll('.emoji-rating').forEach(container => {
    if (!session?.logged) {
      toastr.warning('Debes iniciar sesión para calificar');
      return;
    }

    const id = container.getAttribute('data-id');
    const emojis = container.querySelectorAll('.emoji');

    emojis.forEach(emoji => {
      emoji.addEventListener('click', () => {
        const rating = emoji.getAttribute('data-rating');

        emojis.forEach(e => e.classList.remove('selected'));
        emoji.classList.add('selected');

        fetch("https://earth-project-backend.onrender.com/index.php?action=saveRating", {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: id,
            puntuacion: rating
          })
        })
        .then(async res => {
          const text = await res.text(); 
          try {
            return JSON.parse(text); 
          } catch (e) {
            console.error("Respuesta no es JSON:", text);
            throw new Error("Respuesta no válida del servidor");
          }
        })
        .then(data => {
          console.log('Respuesta completa:', data);
          if (data.status === 'success' || data.success) {
              toastr.success(data.message || 'Puntuación guardada');
          } else {
              toastr.error(data.message || 'Error al guardar puntuación');
          }
        })
        .catch(err => {
          console.error(err);
          toastr.error('Error de red al guardar puntuación');
        });
      });
    });
  });
}




// FUNCIÓN PARA ELIMINAR VISITADO (desmarcar)




function setupDeleteVisitedListeners() {
  document.querySelector('.fav-content').addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-visitado')) {
      const button = event.target;

      if (!confirm('¿Estás seguro de querer eliminar este visitado?')) {
        return;
      }

      try {
        const response = await fetch('https://earth-project-backend.onrender.com/index.php?action=actualizarEstadoVisita', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            nom: '',
            visitado: 0
          })
        });

        const result = await response.json();

        if (!result.success) {
          toastr.error(result.message || 'Error al eliminar visitado');
          return;
        }

        button.closest('.visited-item').remove();
        toastr.success('Desmarcado como visitado');

      } catch (error) {
        console.error(error);
        toastr.error('Error al comunicarse con el servidor');
      }
    }
  });
}
