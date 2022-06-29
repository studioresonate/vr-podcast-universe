import './style.css'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import TextSprite from '@seregpie/three.text-sprite';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import ImmersiveControls from '@depasquale/three-immersive-controls';


import * as dat from 'dat.gui'

let rotateMe = []

// Debug
const gui = new dat.GUI()
const stats = Stats()
document.body.appendChild(stats.dom)

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


const addNewBoxMesh = (positionX, positionY, positionZ, material, title) => {
    const boxGeometry = new THREE.BoxGeometry(3, 3, 3)
    const loader = new THREE.TextureLoader().load( './' + material + '.jpeg' );
    const boxMaterial = new THREE.MeshPhongMaterial({
        map: loader,
        shininess: 10,
        opacity: 1
    })
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.position.set(positionX, positionY, positionZ);
    const instance = new TextSprite({
        alignment: 'center',
        color: '#fff',
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        fontSize: 0.51,
        fontStyle: 'normal',
        fontWeight: 'bold',
        padding: 0.5,
        text: title,
    });
    instance.position.set(positionX, positionY -3, positionZ);

    rotateMe.push(boxMesh);

    scene.add(instance);
    scene.add(boxMesh);


}

addNewBoxMesh(3,4,6,'ConanOBrienNeedsAFriend', 'Conan OBrien Needs A Friend')
addNewBoxMesh(6,1,16,'2Bears1Cave', '2 Bears, 1 Cave')


// // Lights

const light = new THREE.AmbientLight(0xffffff, 1)
light.position.x = 0
light.position.y = 0
light.position.z = 0
scene.add(light)


/**
 * Room
 */

const room = new THREE.LineSegments(
    new BoxLineGeometry( 200, 200, 200, 10, 10, 10 ).translate( 0, 3, 0 ),
    new THREE.LineBasicMaterial( { color: 0x808080 } )
);

scene.add( room );


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})



/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
// camera.position.x = 14
// camera.position.y = 2
// camera.position.z = -15
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'z', -100, 100)
cameraFolder.add(camera.position, 'y', -100, 100)
cameraFolder.add(camera.position, 'x', -100, 100)
// cameraFolder.add(camera.rotation, 'x', 0, Math.PI * 2)
cameraFolder.open()


// VR Controls
const controls = new ImmersiveControls(camera, renderer, scene, {
    initialPosition: new THREE.Vector3(4, 2, 22),
    gravity: false,
    floor: false,
    showExitVRButton: false
});

/**
 * VR
 */
document.body.appendChild( VRButton.createButton( renderer ) );
renderer.xr.enabled = true;


document.body.insertAdjacentHTML('afterbegin', `
    <p class="instructions">Move with <span class="circle">L</span> thumbstick in VR or <span>W</span>, <span>A</span>, <span>S</span>, and <span>D</span> keys. Rotate with <span class="circle">R</span> thumbstick in VR or arrow keys. &larr; &uarr; &rarr;	&darr;</p>
`)


/**
 * Animate
 */

const clock = new THREE.Clock()

function animate() {
    renderer.setAnimationLoop( animate );

    const elapsedTime = clock.getElapsedTime()

    // Update Orbital Controls
    controls.update()


    // Render
    renderer.render(scene, camera)

    for (var i = 0; i < rotateMe.length; i++) {
        // rotateMe[i].rotation.x +=0.003;
        rotateMe[i].rotation.y +=0.003;
    }

    stats.update()
}

animate();


