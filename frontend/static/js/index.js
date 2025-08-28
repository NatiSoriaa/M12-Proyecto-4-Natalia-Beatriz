import * as THREE from "https://esm.sh/three";
import { OrbitControls } from "https://esm.sh/three/addons/controls/OrbitControls.js";
import { loadToastr } from "./toastr.js";
import { restCountryInfo } from "./randomCountryApi.js";
import { generatePDF } from "./llamada-apis.js";
import { checkSession } from "./login-register.js";



// SUBMENU




export function Menu() {

  // fav menu
  const favoritesMenu = document.getElementById("favoritesMenu");
  const favoritesToggle = favoritesMenu.querySelector("#menuToggle");
  const favoritesContent = favoritesMenu.querySelector(".menu-content");
  
  // user menu
  const userMenu = document.getElementById("menuUsuario");
  const userToggle = userMenu.querySelector("#userToggle");
  const userContent = userMenu.querySelector(".menu-content");
  
  // uses gsap library to show or hide menu
  function showMenu(menuContent) {
      gsap.to(menuContent, {
          duration: 0.05,
          opacity: 1,
          y: 0,
          display: "block",
          ease: "power2.out"
      });
  }
  
  function hideMenu(menuContent) {
      gsap.to(menuContent, {
          duration: 0.05,
          opacity: 0,
          y: 10,
          display: "none",
          ease: "power2.in"
      });
  }
  
  favoritesMenu.addEventListener("mouseenter", () => {
      showMenu(favoritesContent);
  });
  
  favoritesMenu.addEventListener("mouseleave", () => {
      hideMenu(favoritesContent);
  });
  
  userMenu.addEventListener("mouseenter", () => {
      showMenu(userContent);
  });
  
  userMenu.addEventListener("mouseleave", () => {
      hideMenu(userContent);
  });

};

Menu();




// ESCENA MUNDO




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
// configuracion de animacion del planeta
orbitControls.autoRotate = true;
orbitControls.autoRotateSpeed = 0.5; 
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.05;
orbitControls.minDistance = 1.2; 
orbitControls.maxDistance = 5; 
orbitControls.enableZoom = true;

const animation = () => {
  orbitControls.update();
  if (isMeteorShowerActive) {
    animateMeteors();
  }
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




// MARCADORES Y ETIQUETAS EN EL MAPA




const markers = []; 

function createMarker(lat, lon, name, countryInfo = null, color = 0xff0000) {
  const position = latLonToVector3(lat, lon);
  const markerGeometry = new THREE.SphereGeometry(0.02, 16, 16);
  const markerMaterial = new THREE.MeshBasicMaterial({ color });
  const marker = new THREE.Mesh(markerGeometry, markerMaterial);
  marker.position.copy(position);
  marker.userData = { 
    name: typeof name === 'string' ? name : name.name?.common || 'Unknown',
    countryInfo: countryInfo || { name: typeof name === 'string' ? { common: name } : name },
    lat, 
    lon
   }
  scene.add(marker);

  markers.push(marker); 
  createLabel(marker.userData.name, position);

  // animacion rebote
  let bounces = 4;
  let duracionInicial = 0.3;
  let amplitud = 0.03; 

  for (let i = 0; i < bounces; i++) {
    gsap.to(marker.position, {
      y: marker.position.y + amplitud,
      duration: duracionInicial,
      delay: i * duracionInicial * 2,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });
    
    amplitud *= 0.5;
  }
    marker.geometry.computeBoundingSphere();
    marker.userData.isMarker = true;
      // Hacer que el marcador sea interactivo
      marker.callback = function() {
      if (this.userData.countryInfo) {
        openModal(this.userData.countryInfo);
      } else {
        restCountryInfo(this.userData.name)
          .then(info => openModal(info))
          .catch(() => openModal({name: this.userData.name}));
      }
    };
  return marker;
}




// CLIC MARCADOR




function setupMarkerClick() {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function onClick(event) {
    if (event.target !== canvas) return;

    // Calcular posición normalizada del ratón
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Actualizar el raycaster
    raycaster.setFromCamera(mouse, camera);
    
    // Buscar intersecciones con los marcadores
    const intersects = raycaster.intersectObjects(markers, true);
    
    if (intersects.length > 0) {
      const marker = intersects[0].object;
      marker.callback();
      event.stopPropagation();
    }
  }

  canvas.addEventListener('click', onClick, false);
  return () => canvas.removeEventListener('click', onClick);
}

setupMarkerClick();


// global variables
const meteors = [];
let meteorInterval;
let isMeteorShowerActive = false;

// creates a meteor
function createMeteor() {
  const meteorGeometry = new THREE.SphereGeometry(0.05, 8, 8);
  const meteorMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xff4500,
    emissive: 0xff4500,
    emissiveIntensity: 0.5
  });
  const meteor = new THREE.Mesh(meteorGeometry, meteorMaterial);

  // random position
  const radius = 5 + Math.random() * 3;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.random() * Math.PI;
  
  meteor.position.x = radius * Math.sin(phi) * Math.cos(theta);
  meteor.position.y = radius * Math.sin(phi) * Math.sin(theta);
  meteor.position.z = radius * Math.cos(phi);
  
  // adds tail to meteor
  const tailGeometry = new THREE.ConeGeometry(0.02, 0.2, 8);
  const tailMaterial = new THREE.MeshBasicMaterial({ color: 0xff8c00 });
  const tail = new THREE.Mesh(tailGeometry, tailMaterial);
  tail.position.y = -0.1; 
  tail.rotation.x = Math.PI / 2;
  meteor.add(tail);

  // properties
  meteor.userData = {
    speed: 0.05 + Math.random() * 0.05,
    direction: new THREE.Vector3().subVectors(mesh.position, meteor.position).normalize(),
    tail: tail,
    size: 0.05
  };

  scene.add(meteor);
  meteors.push(meteor);
  return meteor;
}

// animation for meteors
function animateMeteors() {
  for (let i = meteors.length - 1; i >= 0; i--) {
    const meteor = meteors[i];
    
    // direction to earth
    meteor.position.addScaledVector(meteor.userData.direction, meteor.userData.speed);
    
    // Hacer que la cola apunte en dirección opuesta al movimiento
    if (meteor.userData.tail) {
      meteor.userData.tail.lookAt(meteor.position.clone().add(meteor.userData.direction.clone().multiplyScalar(-1)));
    }
    
    // increases meteor size
    meteor.userData.size += 0.001;
    meteor.scale.set(meteor.userData.size, meteor.userData.size, meteor.userData.size);
    
    // explosion when the meteor finds earth 
    if (meteor.position.distanceTo(mesh.position) < 1.1) {
          createExplosion(meteor.position);
      
      // remove meteor
      scene.remove(meteor);
      meteors.splice(i, 1);
    }
  }
}

// explosion
function createExplosion(position) {
  const explosionGeometry = new THREE.SphereGeometry(0.1, 16, 16);
  const explosionMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xff4500,
    transparent: true,
    opacity: 0.8
  });
  const explosion = new THREE.Mesh(explosionGeometry, explosionMaterial);
  explosion.position.copy(position);
  scene.add(explosion);
  
  gsap.to(explosion.scale, {
    x: 0.5,
    y: 0.5,
    z: 0.5,
    duration: 0.5,
    onComplete: () => scene.remove(explosion)
  });
  
  gsap.to(explosionMaterial, {
    opacity: 0,
    duration: 0.5
  });
}

// meteor shower
function toggleMeteorShower() {
  isMeteorShowerActive = !isMeteorShowerActive;
  const button = document.getElementById('meteor-btn');
  const icon = button.querySelector('i');

  if (isMeteorShowerActive) {
    toastr.clear();
    toastr.warning("¡Lluvia de meteoritos!");
    icon.style.color = 'red';
    icon.classList.add('blink');

    meteorInterval = setInterval(() => {
      createMeteor();
    }, 500);
  } else {
    toastr.clear();
    toastr.warning("Deteniendo lluvia de meteoritos.");

    icon.style.animation = 'none';
    icon.offsetHeight; 
    icon.style.animation = ''; 
    icon.style.color='';
    icon.classList.remove('blink');

    clearInterval(meteorInterval);
    meteors.forEach(meteor => scene.remove(meteor));
    meteors.length = 0;
  }
}

(async function init() {
  try {
    const session = await checkSession();
    showMeteorBtn(session);
    } catch (error) {
      console.error("error");
      }
})();

// meteor btn
function showMeteorBtn(session) {
  if (session?.logged === true && session?.rol === 'admin') {
    const button = document.querySelector('#meteor-btn');
    button.style.display="flex";
    button.addEventListener('click', toggleMeteorShower);
    }
}

window.addEventListener('click', (event) => {
  const modal = document.getElementById('infoModal');
  if (event.target === modal) {
    gsap.to(modal, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            modal.style.display = 'none';
        }
    });      
    
  }
});




// ABRIR MODAL CON CONTENIDO 




function openModal(country) {
  const modal = document.getElementById('infoModal');
  const name = country.name?.common || 'No disponible';
  const officialName = country.name?.official || 'No disponible';
  const capital = country.capital?.[0] || 'No disponible';
  const region = country.region || 'No disponible';
  const subregion = country.subregion || 'No disponible';
  const population = country.population ? country.population.toLocaleString() : 'No disponible';
  const area = country.area ? `${country.area.toLocaleString()} km²` : 'No disponible';
  const languages = country.languages ? Object.values(country.languages).join(', ') : 'No disponible';
  const flag = country.flags?.svg || country.flags?.png || '';

  document.getElementById('infoModalContent').innerHTML = `
    <div class="country-header">
    
      <h2>${name}</h2>
      ${officialName !== name ? `<p class="official-name">${officialName}</p>` : ''}
      <img src="${flag}" alt="Bandera de ${name}" class="country-flag">
    </div>
    
    <div class="country-details">
      <div class="details-column">
        <p><strong>Capital:</strong> ${capital}</p>
        <p><strong>Región:</strong> ${region}</p>
        <p><strong>Subregión:</strong> ${subregion}</p>
      </div>
      
      <div class="details-column">
        <p><strong>Población:</strong> ${population}</p>
        <p><strong>Área:</strong> ${area}</p>
        <p><strong>Idiomas:</strong> ${languages}</p>
      </div>
    </div>
  `;
  gsap.fromTo(modal, 
    { opacity: 0 },
    { 
      opacity: 1, 
      y: 0,
      duration: 0.8,
      onStart: () => {
        modal.style.display = 'flex';
      }
    }
  );
  document.getElementById('infoButton').addEventListener('click', () => {
    showInfo(country);
    gsap.fromTo(modal, 
    { opacity: 1 },
    { 
      opacity: 0, 
      y: 0,
      duration: 0.8,
      onComplete: () => {
        modal.style.display = 'none';
      }
    }
  );
    
  });

  document.getElementById('imagesButton').addEventListener('click', () => {
    showImages(country);
   gsap.fromTo(modal, 
    { opacity: 1 },
    { 
      opacity: 0, 
      y: 0,
      duration: 0.8,
      onComplete: () => {
        modal.style.display = 'none';
      }
    })
  });
}

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener('click', (event) => {
  const modal = document.getElementById('infoModal');
  if (event.target === modal) {
          gsap.to(modal, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            modal.style.display = 'none';
        }
    });
  }
});




// MOSTRAR INFORMACION E IMAGENES DEL PAIS




function showInfo(data) {
  const name = data.name?.common || data.name || 'Este país';
  toastr.clear();
  toastr.info(`Información de ${name}`); 
}

function showImages(data) {
  const name = data.name?.common || data.name || 'Este país';
  toastr.clear();
  toastr.info(`Imágenes de ${name}`);
}




// ETIQUETAS EN EL MAPA




function createLabel(text, position) {
    const labelText = typeof text === 'string' ? text : text.name || 'Unknown';
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



// BUSCADOR DE PAISES LLAMANDO A LA API REST Y CALCULO DE COORDENADAS




async function searchCountryLocation(countryName) {
  try {
    searchButton.disabled = true;
    const countryInfo = await restCountryInfo(countryName);
    
    if (!countryInfo) {
      throw new Error('No se encontró información para este país');
    }

    saveVisitedCountry(countryInfo.name.common);

    // coordenadas con api nominatim
    const nominatimResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(countryInfo.name.common)}`);
    const nominatimData = await nominatimResponse.json();
    
    if (nominatimData.length === 0) {
      throw new Error('No se encontraron coordenadas para este país');
    }

    const { lat, lon } = nominatimData[0];
    
    // marcador en el mapa
    createMarker(
      parseFloat(lat),
      parseFloat(lon),
      countryInfo.name.common,
      countryInfo,
      0xff0000
    );

    // Mover cámara al país con animación suave
    const markerPosition = latLonToVector3(parseFloat(lat), parseFloat(lon));
    
    const zoomDistance = 1.8; 
    orbitControls.autoRotate = false;
    
    // animacion encontrar pais
    await new Promise(resolve => {
          gsap.to(camera.position, {
            x: markerPosition.x * zoomDistance,
            y: markerPosition.y * zoomDistance,
            z: markerPosition.z * zoomDistance,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: () => {
              orbitControls.target.copy(markerPosition);
              orbitControls.update();
            },
            onComplete: () => {
              setTimeout(() => {
                camera.lookAt(markerPosition);
                resolve();
              }, 300);
            }
          });
      });
  } catch (error) {
    console.error('Error en la búsqueda:', error);
    toastr.error(error.message, 'Error en la búsqueda');
  } finally {
    searchButton.disabled = false;
  }
}




// BOTON DE BUSQUEDA E INGRESO DE TEXTO




const searchButton = document.querySelector('#searchButton');
const searchInput = document.querySelector('#input');

searchButton.addEventListener('click', () => {
  const country = searchInput.value.trim();
  if (country) {
    removeMarkers();
    searchCountryLocation(country);
  } else {
    toastr.warning('Por favor ingresa un nombre de país');
  }
});

// buscar con enter
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const country = searchInput.value.trim();
    if (country) {
      removeMarkers();
      searchCountryLocation(country);
    }
  }
});




// ELIMINAR MARCADORES Y ETIQUETAS DEL MAPA




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




// ANIMACION DEL PLANETA




window.requestAnimationFrame(animation);




// GENERAR PDF DE INFORMACION DEL PAIS




import { getCountryInfo } from './llamada-apis.js';

// Seleccionar el botón de información
const infoButton = document.getElementById('infoButton');

// Abrir el modal de información
function openInfoModal(countryName, countryInfo) {
  const infoModal = document.createElement('div');
  infoModal.classList.add('modal');
  infoModal.setAttribute('id', 'countryInfoModal');
  infoModal.innerHTML = `
    <div class="modal-content2">
      <span class="close" id="closeInfoModal">&times;</span>
      <div id="exportOnly">
        <h2>${countryName}</h2>
        <p>${countryInfo}</p>
      </div>
      <button id="generatePDF">Descargar en PDF</button>

    </div>
  `;

  document.body.appendChild(infoModal);
  infoModal.style.display = 'flex';
  document.getElementById('generatePDF').addEventListener('click', generatePDF);

  document.getElementById('closeInfoModal').addEventListener('click', () => {
    gsap.fromTo(infoModal, { opacity: 1 }, { opacity: 0, duration: 0.5 });
    infoModal.remove();
  });

  window.addEventListener('click', (event) => {
    if (event.target === infoModal) {
      gsap.to(infoModal, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
              infoModal.remove();
          }
      });      
    }
  });
}




// MOSTRAR INFORMACION RECOGIDA DE API REST




infoButton.addEventListener('click', async () => {
  const modal = document.getElementById('infoModalContent');
  if (modal) {
    const countryName = modal.querySelector('h2')?.textContent;
    if (countryName) {
      try {
        const countryInfo = await getCountryInfo(countryName);
        openInfoModal(countryName, countryInfo);
        document.getElementById('infoModal').style.display = 'none';
        document.getElementById('infoModalContent').innerHTML = '';
      } catch (err) {
        console.error('Error al obtener información del país:', err);
      }
    }
  } else {
    console.error('No se encontró el elemento con id "infoModalContent".');
  }
});

document.getElementById('closeImagesModal').addEventListener('click', () => {
  gsap.fromTo(infoModal, { opacity: 0 }, { opacity: 1, duration: 0.5 });
  document.querySelector('.images-container').classList.remove('active'); 
});

document.getElementById('closeFavoritesModal').addEventListener('click', () => {
  gsap.fromTo(infoModal, { opacity: 0 }, { opacity: 1, duration: 0.5 });
  document.getElementById('favoritosContainer').style.display = 'none';
});




// ALMACENAR PAISES EN LOCALSTORAGE 




function saveVisitedCountry(country) {
  let visitedCountries = JSON.parse(localStorage.getItem('visitedCountries')) || [];
  if (!visitedCountries.includes(country)) {
    visitedCountries.push(country);
    localStorage.setItem('visitedCountries', JSON.stringify(visitedCountries));
  }
}




// MOSTRAR PAISES DE BUSQUEDA RECIENTE EN EL MAPA (TU ACTIVIDAD)




function showVisitedCountries() {
  const visitedCountries = JSON.parse(localStorage.getItem('visitedCountries')) || [];
  visitedCountries.forEach(async (country) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(country)}`);
    const data = await response.json();
    if (data.length > 0) {
      const { lat, lon } = data[0];
      createMarker(parseFloat(lat), parseFloat(lon), country, null, 0xffff00); 
    } else {
      console.warn(`No se pudo encontrar la ubicación para el país: ${country}`);
    }
  });
}




// ELIMINAR PAISES DE BUSQUEDA RECIENTE DEL MAPA (OCULTAR ACTIVIDAD)




function removeVisitedMarkers() {
  const visitedMarkers = [];
  const visitedLabels = [];
  
  scene.traverse((object) => {
    // Buscar marcadores (esferas amarillas)
    if (object.isMesh && object.geometry.type === 'SphereGeometry' && object.material.color.getHex() === 0xffff00) {
      visitedMarkers.push(object);
    }

    if (object.isSprite) {
      visitedLabels.push(object);
    }
  });

  // Eliminar marcadores
  visitedMarkers.forEach((marker) => {
    scene.remove(marker);
  });

  // Eliminar etiquetas
  visitedLabels.forEach((label) => {
    scene.remove(label);
  });
}
loadToastr();




// INTERCALAR MENSAJES DE ACTIVIDAD




let showingVisited = false;
const activityButton = document.getElementById('tuActividad');

document.getElementById('tuActividad').addEventListener('click', () => {
  if (!showingVisited) {
    toastr.info('Mostrando actividad');
    showVisitedCountries();
    activityButton.textContent = 'Ocultar actividad';
    showingVisited = true;
  } else {
    toastr.info('Ocultando actividad');
    removeVisitedMarkers();
    activityButton.textContent = 'Tu actividad';
    showingVisited = false;
  }
});
