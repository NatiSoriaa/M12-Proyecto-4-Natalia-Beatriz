import { OrbitControls } from "https://esm.sh/three/addons/controls/OrbitControls.js";
import { camera, renderer } from "./scene.js";

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.autoRotate = true;
orbitControls.enableDamping = true;
orbitControls.enableZoom = false;

export { orbitControls };