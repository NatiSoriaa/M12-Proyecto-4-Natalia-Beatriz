import { scene, camera, renderer } from "./scene.js";
import { orbitControls } from "./controls.js";
import { searchCountryLocation } from "./search.js";

const animation = () => {
  orbitControls.update();
  requestAnimationFrame(animation);
  renderer.render(scene, camera);
};
requestAnimationFrame(animation);

const searchButton = document.querySelector('#searchButton');
searchButton.addEventListener('click', () => {
  const country = document.querySelector('#input').value;
  if (country.trim() !== '') {
    searchCountryLocation(country);
  } else {
    alert('Por favor, ingresa un país para buscar.');
  }
});