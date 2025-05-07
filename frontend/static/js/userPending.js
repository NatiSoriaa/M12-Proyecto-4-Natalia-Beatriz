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
  