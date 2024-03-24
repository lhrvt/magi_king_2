import * as THREE from './build/three.module.js'
import {GLTFLoader} from './build/GLTFLoader.js'


let actual_color;
var color_change = false;






let mixer  ;     




const raycaster = new THREE.Raycaster();
document.addEventListener('mousedown', onMouseDown);

function onMouseDown(event) {
    const coords = new THREE.Vector2(
      (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
      -((event.clientY / renderer.domElement.clientHeight) * 2 - 1),
    );


raycaster.setFromCamera(coords, camera);

  const intersections = raycaster.intersectObjects(scene.children, true);
  if (intersections.length > 0) {
    console.log(color_change)
    const selectedObject = intersections[0].object;
    if(color_change == true){
    selectedObject.material.color.set(actual_color )
    }
    //console.log(selectedObject.name + "was clicked!");
    
    console.log(selectedObject)
  }

}

const canvas  = document.querySelector('.webgl')
const scene = new THREE.Scene()


 const loader = new GLTFLoader()

 let magi;
 
 let balade;

 loader.load('asset/magi.glb', function(gltf ){
    console.log(gltf )
    
    
    mixer = new THREE.AnimationMixer( gltf.scene );
    balade = gltf.animations[0] ; 
    
    mixer.clipAction(balade).play()
    //mixer.clipAction(placard).play()
    //TEXT = gltf.scene.getObjectByName('Text_rm');
    
    // TEXT.material = toonmat
    // TEXT.material.wireframe = true
    magi = gltf .scene;
    
    //magi.position.set(0,0,0)
    
    magi.rotation.y = -Math.PI 
    magi.scale.set(0.3,0.3,0.3)
   

    scene.add(magi);
  
    
    
 }, function(xhr){
    console.log(xhr.loaded/xhr.total * 100 + "% loaded")
  }, function(error){
     console.log('An error')
 } 
 );

 let fond_;

 loader.load('asset/fond_.glb', function(gltf ){
  console.log(gltf )
  
  fond_= gltf .scene;
  
  fond_.position.set(-5,3,0)
  
 

  scene.add(fond_);

  
  
}, function(xhr){
  console.log(xhr.loaded/xhr.total * 100 + "% loaded")
}, function(error){
   console.log('An error')
} 
);


 


const light = new THREE.DirectionalLight(0xffffff, 1)

light.intensity = 1;

const ambientLight = new THREE.AmbientLight(0xfffffff);
scene.add(ambientLight);   
scene.add(light) 


const sizes = {
    width : window.innerWidth,
    height : window.innerHeight 
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100);
camera.position.set(0,0.7,4);
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas : canvas 
})


renderer.setSize(sizes.width , sizes.height )


renderer.setPixelRatio(window.devicePixelRatio)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 
renderer.gammaOutput= true











// Ajout d'un écouteur d'événement pour détecter le mouvement de la souris


let pos_x;
let pos_y ;
let pos_z;
// Fonction pour générer aléatoirement une position x et y
function generateRandomPosition(min, max) {
  pos_x = Math.random() * (max - min) + min; // Génère une valeur aléatoire entre 0 et 10 pour la position x
  pos_y = Math.random() *(max - min) + min;
  pos_z = Math.random() *(max - min) + min; // Génère une valeur aléatoire entre 0 et 10 pour la position y
  return { pos_x, pos_y, pos_z };
}

// Fonction pour afficher la position générée
function displayPosition() {
  const position = generateRandomPosition(-1.5, 1.5);
  console.log(`Nouvelle position générée - x: ${position.pos_x}, y: ${position.pos_y}`);
  gsap.to(magi.position, {
    x: pos_x, y: pos_y, z: pos_z, // Rotation vers l'angle cible
    duration: 2, // Durée de l'animation en secondes
    ease: "linear" // Fonction d'interpolation pour une transition douce
  });

}

// Appel de la fonction displayPosition toutes les 3 secondes
setInterval(displayPosition, 2000);



function animate(){
    requestAnimationFrame(animate)
    
    if (magi){
    const time = Date.now() * 0.001;
    magi.rotation.y = time;
    light.position.set(Math.sin(time),1,1)
    light.rotation.y = time;
    //root.position.set(Math.sin(time ) *0.1 - 0.2, -0.4, 2)
    //console.log(time_light)
    
    renderer.render(scene,camera)
    
    
    mixer.update(0.01 );
    }
}




animate()


