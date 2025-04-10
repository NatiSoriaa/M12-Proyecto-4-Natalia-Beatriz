import * as THREE from "https://esm.sh/three";
import { scene } from "./scene.js";
import { latLonToVector3 } from "./utils.js";

const markers = [];

function createMarker(lat, lon, name, color = 0xff0000) {
  const position = latLonToVector3(lat, lon);
  const markerGeometry = new THREE.SphereGeometry(0.02, 16, 16);
  const markerMaterial = new THREE.MeshBasicMaterial({ color });
  const marker = new THREE.Mesh(markerGeometry, markerMaterial);
  marker.position.copy(position);
  marker.userData = { name, lat, lon };
  scene.add(marker);

  markers.push(marker);
  createLabel(name, position);

  marker.callback = () => {
    openModal(marker.userData);
  };
}

function removeMarkers() {
  markers.forEach((marker) => scene.remove(marker));
  markers.length = 0;
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

export { createMarker, removeMarkers };