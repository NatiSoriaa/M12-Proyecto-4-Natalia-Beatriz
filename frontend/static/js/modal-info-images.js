// Función para abrir el modal con contenido dinámico
function openModal(data) {
    const modal = document.getElementById('infoModal');
    modal.setAttribute('style', 'display: flex !important;');

    const modalContent = document.getElementById('infoModalContent');
    modalContent.innerHTML = `
      <h2>${data.name}</h2>
      <p>Latitud: ${data.lat}</p>
      <p>Longitud: ${data.lon}</p>
    `;

    // Agregar eventos a los botones
    document.getElementById('infoButton').addEventListener('click', () => {
      showInfo(data); // Mostrar información del país
      document.querySelector('#infoModal').style.display = 'none';

      document.getElementById('infoModalContent').innerHTML = '';

    });

    document.getElementById('imagesButton').addEventListener('click', () => {
      showImages(data); 
      // vaciar contenido del modal para mostrar images
      document.querySelector('#infoModal').style.display = 'none';

    });
}

// Función para mostrar información del país
function showInfo(data) {
  toastr.info(`${data.name}`, `Información de`);
  console.log(`Mostrando información de: ${data.name}`);
}

// Función para mostrar imágenes del país
function showImages(data) {
  toastr.info(`${data.name}`,`Imágenes de` );
  console.log(`Mostrando imágenes de: ${data.name}`);
}

function createLabel(text, position) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = '30px Arial';
  context.fillStyle = 'white';
  context.fillText(text, 0, 30);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(material);
  sprite.position.copy(position);
  sprite.scale.set(0.5, 0.25, 1);
  scene.add(sprite);
}

export {createLabel};