import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
//import { OrbitControls } from '@/node_modules/three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

//Render Setup
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.y = 0;
camera.position.setX(-3);

renderer.render(scene, camera);

//Torus Ring 
const ringTexture = new THREE.TextureLoader().load('ring.jpeg');

const geometry = new THREE.TorusGeometry(10, 1, 16, 100);
const material = new THREE.MeshPhongMaterial({ map: ringTexture });
const torus = new THREE.Mesh(geometry, material);

torus.position.x = 2;
torus.position.y = -1;
torus.position.z = -4;

scene.add(torus);

//Lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0,6);
directionalLight.position.set(0, 10, 0);
directionalLight.target.position.set(-5, 0, 0);

scene.add(pointLight, ambientLight, directionalLight, directionalLight.target);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// const lightHelper2 = new THREE.PointLightHelper(directionalLight);

// scene.add(lightHelper, gridHelper, lightHelper2);


//const controls = new OrbitControls(camera, renderer.domElement);

//Adding lots of stars into the galaxy
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Avatar
const myTexture = new THREE.TextureLoader().load('me.jpg');

const me = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: myTexture })
)

me.position.x = 2;
me.position.z = -5;

//moon
const moonTexture = new THREE.TextureLoader().load('moon.jpeg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);
scene.add(moon, me);

// moon.position.setX(-10);
// moon.position.setZ(35);

moon.position.setX(-10);
moon.position.setZ(40);

//Background
const spaceTexture = new THREE.TextureLoader().load('bg.jpeg');
scene.background = spaceTexture;

//Scroll animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  me.rotation.y += 0.01;
  me.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

//Loop to animate
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;
  moon.rotation.z += 0.006;

  //controls.update();

  renderer.render(scene, camera);
}

animate();
