import './style.css'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import TextSprite from '@seregpie/three.text-sprite';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

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


// // Objects
// const geometry = new THREE.BoxGeometry(3, 3, 3)

// // Materials

// const textureConan = new THREE.TextureLoader().load( "./ConanOBrienNeedsAFriend.jpeg" );
// const materialConan = new THREE.MeshPhongMaterial({
//     map: textureConan
// })

// const texture2Bears1Cave = new THREE.TextureLoader().load( "./2Bears1Cave.jpeg" );
// const material2Bears1Cave = new THREE.MeshPhongMaterial({
//     map: texture2Bears1Cave
// })

// // Mesh
// const boxConan = new THREE.Mesh(geometry,materialConan)
// boxConan.position.x = Math.random() * 60 - 40;
// boxConan.position.y = Math.random() * 60 - 40;
// boxConan.position.z = Math.random() * 60 - 40;
// scene.add(boxConan)

// const box2Bears1Cave = new THREE.Mesh(geometry,material2Bears1Cave)
// // box2Bears1Cave.position.y = 8
// // box2Bears1Cave.position.x = 8
// // box2Bears1Cave.position.z = 8

// box2Bears1Cave.position.x = Math.random() * 60 - 40;
// box2Bears1Cave.position.y = Math.random() * 60 - 40;
// box2Bears1Cave.position.z = Math.random() * 60 - 40;

// scene.add(box2Bears1Cave)



// // Lights

const light = new THREE.AmbientLight(0xffffff, 1)
light.position.x = 0
light.position.y = 0
light.position.z = 0
scene.add(light)

// // Text
// let instanceConan = new TextSprite({
//     alignment: 'center',
//     color: '#fff',
//     fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
//     fontSize: 0.51,
//     fontStyle: 'normal',
//     fontWeight: 'bold',
//     text: 'CONAN O\'BRIEN NEEDS A FRIEND',
//   });

// instanceConan.position.x = boxConan.position.x;
// instanceConan.position.y = boxConan.position.y -3;
// instanceConan.position.z = boxConan.position.z;

// scene.add(instanceConan);


// let instance2Bears1Cave = new TextSprite({
//     alignment: 'center',
//     color: '#fff',
//     fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
//     fontSize: 0.51,
//     fontStyle: 'normal',
//     fontWeight: 'bold',
//     text: '2 BEARS, 1 CAVE',
//   });

// instance2Bears1Cave.position.x = box2Bears1Cave.position.x;
// instance2Bears1Cave.position.y = box2Bears1Cave.position.y -3;
// instance2Bears1Cave.position.z = box2Bears1Cave.position.z;

// scene.add(instance2Bears1Cave);


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
camera.position.x = 14
camera.position.y = 2
camera.position.z = -15
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

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



/**
 * VR
 */
document.body.appendChild( VRButton.createButton( renderer ) );
renderer.xr.enabled = true;





/**
 * Animate
 */

const clock = new THREE.Clock()

function animate() {
    renderer.setAnimationLoop( animate );

    const elapsedTime = clock.getElapsedTime()

    // // Update objects
    // boxConan.rotation.y = .5 * elapsedTime
    // boxConan.rotation.x = .5 * elapsedTime

    // box2Bears1Cave.rotation.y = .3 * elapsedTime
    // box2Bears1Cave.rotation.x = .3 * elapsedTime


    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    // window.requestAnimationFrame(animate)


    for (var i = 0; i < rotateMe.length; i++) {
        // rotateMe[i].rotation.x +=0.003;
        rotateMe[i].rotation.y +=0.003;
    }

    stats.update()
}

// const tick = () =>
// {
//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     // window.requestAnimationFrame(tick)
// }

// tick()
animate();


