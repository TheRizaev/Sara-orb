import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// Создаем сцену Three.JS
const scene = new THREE.Scene();

// Создаем камеру
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 9;

// Создаем рендерер и устанавливаем его размер
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

// Добавляем мягкий белый свет (Ambient Light) для подсветки всей сцены
const ambientLight = new THREE.AmbientLight(0x009999, 300, 100); // Мягкий белый свет
ambientLight.position.set(0, 0, 0);
scene.add(ambientLight);

const ambientLight1 = new THREE.AmbientLight(0x009999, 10, 20); // Мягкий белый свет
ambientLight1.position.set(1, 1, 1);
scene.add(ambientLight1);

const ambientLight2 = new THREE.AmbientLight(0x009999, 20, 100); // Мягкий белый свет
ambientLight2.position.set(0, 0, 0);
scene.add(ambientLight2);

const ambientLight3 = new THREE.AmbientLight(0x9802a7, 50); // Мягкий белый свет
ambientLight3.position.set(40, 40, 40);
scene.add(ambientLight3);

const ambientLightA = new THREE.AmbientLight(0x009999, 5000); // Мягкий белый свет
ambientLightA.position.set(1, 0, 0);
scene.add(ambientLightA);

const ambientLightB = new THREE.AmbientLight(0x009999, 5000); // Мягкий белый свет
ambientLightB.position.set(0, 1, 0);
scene.add(ambientLightB);

const ambientLightC = new THREE.AmbientLight(0x009999, 5000); // Мягкий белый свет
ambientLightC.position.set(0, 0, 1);
scene.add(ambientLightC);


// Добавляем управление орбитой (OrbitControls) для управления моделью с помощью мыши
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Добавляем плавность при управлении
controls.dampingFactor = 0.05;

// Инициализируем загрузчик и миксер анимации
const loader = new GLTFLoader();
let mixer;
let model;

loader.load(
  'models/sphere/scene.gltf',  // Путь к вашему GLTF файлу
  function (gltf) {
    model = gltf.scene;
    scene.add(model);

    // Создаем миксер анимации и запускаем все анимации
    mixer = new THREE.AnimationMixer(model);
    gltf.animations.forEach((clip) => {
      mixer.clipAction(clip).play();
    });
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Функция для рендеринга сцены и обновления анимаций
function animate() {
  requestAnimationFrame(animate);

  // Вращаем модель вокруг осей X, Y и Z
  if (model) {
    model.rotation.x += 0.01; // Скорость вращения вокруг оси X
    model.rotation.y += 0.01; // Скорость вращения вокруг оси Y
    model.rotation.z += 0.01; // Скорость вращения вокруг оси Z
  }

  // Обновляем миксер для продвижения анимаций
  if (mixer) {
    mixer.update(0.01); // Аргумент для управления скоростью анимации
  }

  controls.update(); // Обновляем управление камерой
  renderer.render(scene, camera);
}

// Настраиваем камеру и рендерер при изменении размера окна
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Запускаем цикл анимации
animate();