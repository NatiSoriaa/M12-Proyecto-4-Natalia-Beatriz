import { createMarker } from "./markers.js";
import { latLonToVector3 } from "./utils.js";
import { camera } from "./scene.js";
import { orbitControls } from "./controls.js";

async function searchCountryLocation(country) {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(country)}`);
  const data = await response.json();
  if (data.length > 0) {
    const { lat, lon } = data[0];
    const markerPosition = latLonToVector3(parseFloat(lat), parseFloat(lon));

    createMarker(parseFloat(lat), parseFloat(lon), country);

    orbitControls.autoRotate = false;

    const zoomLevel = 1.5;
    camera.position.set(
      markerPosition.x * zoomLevel,
      markerPosition.y * zoomLevel,
      markerPosition.z * zoomLevel
    );
    camera.lookAt(markerPosition);
  } else {
    alert('País no encontrado');
  }
}

export { searchCountryLocation };