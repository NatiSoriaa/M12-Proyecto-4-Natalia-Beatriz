import * as THREE from "https://esm.sh/three";
import { OrbitControls } from "https://esm.sh/three/addons/controls/OrbitControls.js";


// MAPA MUNDO 


const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(2, 2, 2);

scene.add(ambientLight, directionalLight);

const geometry = new THREE.SphereGeometry(1, 64, 35);
const texture = new THREE.TextureLoader().load('https://i.ibb.co/mJvHfvp/color.jpg');
const material = new THREE.MeshStandardMaterial({ map: texture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const geometryPoint = new THREE.BufferGeometry();
const materiaPoints = new THREE.PointsMaterial({ size: 0.005 });

const starsAmount = 1000;
const positions = new Float32Array(starsAmount * 3);

for (let i = 0; i < starsAmount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 5;
}
const attribute = new THREE.BufferAttribute(positions, 3);
geometryPoint.setAttribute('position', attribute);
const points = new THREE.Points(geometryPoint, materiaPoints);
scene.add(points);

const aspect = { width: innerWidth, height: innerHeight };
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 3;
scene.add(camera);

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);

window.addEventListener('resize', () => {
  aspect.width = innerWidth;
  aspect.height = innerHeight;
  camera.aspect = aspect.width / aspect.height;
  camera.updateProjectionMatrix();
  renderer.setSize(aspect.width, aspect.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const orbitControls = new OrbitControls(camera, canvas);
orbitControls.autoRotate = true;
orbitControls.enableDamping = true;
orbitControls.enableZoom = false;

const animation = () => {
  orbitControls.update();
  requestAnimationFrame(animation);
  renderer.render(scene, camera);
};
requestAnimationFrame(animation);

function latLonToVector3(lat, lon, radius = 1) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}




const markers = []; // Array para almacenar los marcadores

function createMarker(lat, lon, name, color = 0xff0000) {
  const position = latLonToVector3(lat, lon);
  const markerGeometry = new THREE.SphereGeometry(0.02, 16, 16);
  const markerMaterial = new THREE.MeshBasicMaterial({ color });
  const marker = new THREE.Mesh(markerGeometry, markerMaterial);
  marker.position.copy(position);
  marker.userData = { name, lat, lon }; // Guardar datos del marcador
  scene.add(marker);

  markers.push(marker); // Agregar el marcador al array
  createLabel(name, position);

  // Hacer que el marcador sea interactivo
  marker.callback = () => {
    openModal(marker.userData); // Abrir el modal con los datos del marcador
  };
}

  // Agregar evento de clic al marcador
  // Agregar evento de clic al marcador
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(markers);
  // console.log('Intersecciones detectadas:', intersects); // Depuración

  if (intersects.length > 0) {
    const marker = intersects[0].object;
    // console.log('Marcador clickeado:', marker.userData); // Depuración
    marker.callback();
  }
});


// Función para abrir el modal con contenido dinámico
function openModal(data) {
    const modal = document.getElementById('infoModal');
    modal.setAttribute('style', 'display: flex !important;');

    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
      <h2>${data.name}</h2>
      <p>Latitud: ${data.lat}</p>
      <p>Longitud: ${data.lon}</p>
    `;

    // Agregar eventos a los botones
    document.getElementById('infoButton').addEventListener('click', () => {
      showInfo(data); // Mostrar información del país
    });

    document.getElementById('imagesButton').addEventListener('click', () => {
      showImages(data); // Mostrar imágenes del país
    });
}

// Función para cerrar el modal al hacer clic en el botón de cierre
document.querySelector('#infoModal .close').addEventListener('click', () => {
  document.getElementById('infoModal').style.display = 'none';
});

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener('click', (event) => {
  const modal = document.getElementById('infoModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});


// Función para mostrar información del país
function showInfo(data) {
  alert(`Mostrando información de: ${data.name}`);
}

// Función para mostrar imágenes del país
function showImages(data) {
  alert(`Mostrando imágenes de: ${data.name}`);
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

async function searchCountryLocation(country) {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(country)}`);
  const data = await response.json();
  if (data.length > 0) {
    const { lat, lon } = data[0];
    const markerPosition = latLonToVector3(parseFloat(lat), parseFloat(lon));

    // Crear el marcador en el mapa
    createMarker(parseFloat(lat), parseFloat(lon), country);

    // Detener la rotación del mundo
    orbitControls.autoRotate = false;

    // Mover la cámara hacia el marcador con un poco de zoom
    const zoomLevel = 1.2; // Ajusta el nivel de zoom
    camera.position.set(
      markerPosition.x * zoomLevel,
      markerPosition.y * zoomLevel,
      markerPosition.z * zoomLevel
    );

    // Apuntar la cámara hacia el marcador
    camera.lookAt(markerPosition);

    console.log(`Marcador creado para ${country} en latitud ${lat} y longitud ${lon}`);
  } else {
    alert('País no encontrado');
  }
}

// Seleccionar el botón de búsqueda
const searchButton = document.querySelector('#searchButton');

// Agregar evento al botón de busqueda
searchButton.addEventListener('click', () => {
  const country = document.querySelector('#input').value; // Obtener el valor del input
  if (country.trim() !== '') {
    searchCountryLocation(country); // Llamar a la funcion de busqueda
  } else {
    alert('Por favor, ingresa un país para buscar.');
  }
});


// Seleccionar el campo de entrada
const inputField = document.querySelector('#input');

// Agregar evento al hacer clic en el campo de entrada
inputField.addEventListener('focus', () => {
  // Reanudar la rotación del mundo
  orbitControls.autoRotate = true;

  // Restablecer la posición y el zoom de la cámara
  camera.position.set(0, 0, 3); // Ajusta la posición inicial de la cámara
  camera.lookAt(0, 0, 0); // Apuntar al centro del mundo

  // Eliminar el marcador del país seleccionado
  removeMarkers();
});


function removeMarkers() {
  const markers = [];
  const labels = [];

  // Recorrer todos los objetos en la escena
  scene.traverse((object) => {
    // Buscar marcadores (esferas rojas)
    if (object.isMesh && object.geometry.type === 'SphereGeometry' && object.material.color.getHex() === 0xff0000) {
      markers.push(object);
    }

    // Buscar etiquetas (sprites)
    if (object.isSprite) {
      labels.push(object);
    }
  });

  // Eliminar marcadores
  markers.forEach((marker) => {
    scene.remove(marker);
  });

  // Eliminar etiquetas
  labels.forEach((label) => {
    scene.remove(label);
  });
}

window.requestAnimationFrame(animation);


// AÑADIR A FAVORITOS Y CAMBIO DE COLOR ICONO AL HACER CLIC

// Inicializar lista de favoritos
const favoritos = [];

// Seleccionar el ícono del corazón
const iconoFavoritos = document.getElementById('paises-favoritos');

// Manejar el clic en el clic del corazon
iconoFavoritos.addEventListener('click', () => {
  const countryName = document.getElementById('modalContent').querySelector('h2').textContent;

  if (!favoritos.includes(countryName)) {
    // Agregar a favoritos
    favoritos.push(countryName);
    iconoFavoritos.classList.add('active'); // Cambiar a rojo
    actualizarMenuFavoritos();
  } else {
    // Eliminar de favoritos
    const index = favoritos.indexOf(countryName);
    favoritos.splice(index, 1);
    iconoFavoritos.classList.remove('active'); // Cambiar a blanco
    actualizarMenuFavoritos();
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




// CAMBIO ICONO PAIS VISITADO O NO VISITADO 

const visitToggle = document.getElementById('visitado');
const visitIcon = visitToggle.querySelector('img');

visitToggle.addEventListener('click', () => {
  if (visitIcon.src.includes('pendiente-visitar.png')) {
    visitIcon.src = '../static/img/check-visitado.png'; 
    visitIcon.alt = 'check visitado';
  } else {
    visitIcon.src = '../static/img/pendiente-visitar.png'; 
    visitIcon.alt = 'pendiente por visitar';
  }
});



import { getCountryInfo } from './llamada-apis.js';

// Seleccionar el botón de información
const infoButton = document.getElementById('infoButton');

// Manejar el clic en el botón de información
infoButton.addEventListener('click', async () => {
  const countryName = document.getElementById('modalContent').querySelector('h2').textContent;

  // Obtener información del país
  const countryInfo = await getCountryInfo(countryName);

  // Mostrar el modal con la información
  openInfoModal(countryName, countryInfo);
});

// Función para abrir el modal de información
function openInfoModal(countryName, countryInfo) {
  const infoModal = document.createElement('div');
  infoModal.classList.add('modal');
  infoModal.setAttribute('id', 'countryInfoModal');
  infoModal.innerHTML = `
    <div class="modal-content2">
      <span class="close" id="closeInfoModal">&times;</span>
      <h2>${countryName}</h2>
      <p>${countryInfo}</p>
    </div>
  `;

  document.body.appendChild(infoModal);

  // Mostrar el modal
  infoModal.style.display = 'flex';

  // Cerrar el modal al hacer clic en la "X"
  document.getElementById('closeInfoModal').addEventListener('click', () => {
    infoModal.remove();
  });

  // Cerrar el modal al hacer clic fuera del contenido
  window.addEventListener('click', (event) => {
    if (event.target === infoModal) {
      infoModal.remove();
    }
  });
}


