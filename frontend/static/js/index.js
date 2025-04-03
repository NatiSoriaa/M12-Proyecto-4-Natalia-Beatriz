import * as THREE from "https://esm.sh/three";
import { OrbitControls } from "https://esm.sh/three/addons/controls/OrbitControls.js";




// REGISTRO Y LOGIN DE USUARIO



document.addEventListener('DOMContentLoaded', () => {
    
  // gets values to login
  document.querySelector('#loginForm').addEventListener('submit',(event)=>{
      event.preventDefault();
      const username = document.getElementById('log-user').value;
      const password = document.getElementById('log-passw').value;
      
      login(email, password);
  });

  // gets values to register
  document.querySelector('#register').addEventListener('submit', (event)=>{
      event.preventDefault();
      const username = document.getElementById('reg-user').value;
      const email = document.getElementById('reg-email').value;
      const password = document.getElementById('reg-passw').value;
      
      createUser(username, email, password);
  });

  // shows login modal
    function showModal() {
        const modal = document.getElementById('loginModal');
        modal.style.display = 'block';
    }
    document.querySelector('.close').addEventListener('click', closeModal);

    function closeModal() {
        const modal = document.getElementById('loginModal');
        modal.style.display = 'none';
    }

    document.getElementById('modal-button').addEventListener('click', () => {
        document.getElementById('loginModal').style.display = 'flex';
      });
      document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('loginModal').style.display = 'none';
      });
      window.addEventListener('click', (event) => {
        const modal = document.getElementById('loginModal');
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });
    
      document.getElementById('loginForm').addEventListener('submit', (event) => {
        event.preventDefault();
        // añadir modal de bienvenida
        alert('Login successful!');
        document.getElementById('loginModal').style.display = 'none';
      });


  //login donde se genera el token

  async function login(email, password){

    try {
        const response = await fetch("http://localhost:5000/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('jwt', data.token);
            const token = data.token;
            // document.getElementById('reg-message').innerText = `TOKEN: ${token}`;
            // Mostrar biblioteca

            console.log(`Ha iniciado sesión correctamente. El token ${data.token} se ha guardado.`);
        } else {
            console.error('Algo ha salido mal. Vuelve a intentarlo unos minutos más tarde');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        mostrarBiblio.style.display = "none";
    }
}

//registration

async function createUser(username, email, password){

  try{
      const res = await fetch("http://localhost:5000/api/register", {
          method:'POST',
          headers:{
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({username, email, password}),
      });
      const data = await res.json();
      if (res.ok){
          console.log('user creado correctamente');
          alert('user creado correctamente');
      } else{
          alert(data.message || 'error en el registro');
      }
  }catch(error){
      console.error('error', error);
  }
}

//auth del token

function getToken() {
  const userToken = localStorage.getItem('jwt');

  const inputToken = document.getElementById('token').value;

  if (!userToken || !inputToken) {
      console.log('Token no proporcionado');
      alert('Por favor, ingresa el token.');
      return null;
  }

  if (userToken !== inputToken) {
      console.log('Token no válido');
      alert('Token no válido. Por favor, ingresa el token correcto.');
      return null;
  }

  return {
      'Authorization': `Bearer ${userToken}`,
      'Content-Type': 'application/json',
  };
}
})




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

function createMarker(lat, lon, name, color = 0xff0000) {
  const position = latLonToVector3(lat, lon);
  const markerGeometry = new THREE.SphereGeometry(0.02, 16, 16);
  const markerMaterial = new THREE.MeshBasicMaterial({ color });
  const marker = new THREE.Mesh(markerGeometry, markerMaterial);
  marker.position.copy(position);
  scene.add(marker);
  createLabel(name, position);
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
    const zoomLevel = 1.5; // Ajusta el nivel de zoom
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




/* BOTONES LOGIN Y REGISTER */




document.addEventListener("DOMContentLoaded", function () {
  // Selección de elementos
  const modal = document.getElementById("loginModal");
  const closeModalBtn = document.querySelector(".close");
  const loginBtn = document.getElementById("showLogin");
  const registerBtn = document.getElementById("showRegister");
  const loginForm = document.getElementById("loginUser");
  const registerForm = document.getElementById("registerUser");

  // Mostrar solo el formulario de registro por defecto
  registerForm.classList.add("active");
  loginForm.classList.remove("active");

  // Alternar a formulario de Login
  loginBtn.addEventListener("click", function () {
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
    loginBtn.classList.add("active");
    registerBtn.classList.remove("active");
  });

  // Alternar a formulario de Register
  registerBtn.addEventListener("click", function () {
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
    registerBtn.classList.add("active");
    loginBtn.classList.remove("active");
  });

  // Función para cerrar el modal
  function closeModal() {
    modal.style.display = "none";
  }

  // Evento para cerrar el modal al hacer clic en la cruz
  closeModalBtn.addEventListener("click", closeModal);

  // Evento para cerrar el modal al hacer clic fuera del contenido
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });
});




// MENU DESPLEGABLE




document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const favoritesMenu = document.getElementById("favoritesMenu");

  // Alternar la visibilidad del menú desplegable
  menuToggle.addEventListener("click", function () {
    favoritesMenu.classList.toggle("active");
  });
});


