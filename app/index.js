var THREE = require('three/build/three');

var camera, scene, renderer;
var cube, sphere, text;

init();
initText();
animate();

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xeeeeee);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    var axes = new THREE.AxisHelper(20);
    scene.add(axes);

    var planeGeometry = new THREE.PlaneGeometry(60, 20);
    var planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.receiveShadow = true;
    scene.add(plane);

    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    cube.castShadow = true;
    scene.add(cube);

    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    sphere.castShadow = true;
    scene.add(sphere);

    var ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( -40, 60, -10 );
    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    scene.add(spotLight);

    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    document.getElementById("app").appendChild(renderer.domElement);

    window.addEventListener( 'resize', onWindowResize, false);
}

function initText() {
    var json = require('json!./helvetiker_bold.typeface.json');
    var font = new THREE.Font(json);

    var textGeo = new THREE.TextGeometry("Three JS", {
        font: font,
        size: 5,
        height: 2,
        curveSegments: 12,
        bevelThickness: 0.2,
        bevelSize: 0.5,
        bevelEnabled: true
    });

    textGeo.computeBoundingBox();
    var bbWidth = textGeo.boundingBox.max.x - textGeo.boundingBox.min.x;
    textGeo.translate(-bbWidth/2, 0, 0);

    var textMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, specular: 0xffffff });
    text = new THREE.Mesh(textGeo, textMaterial);

    text.position.x = 20;
    text.position.y = 2;
    text.castShadow = true;
    scene.add(text);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

var step = 0;

function render() {
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;
    cube.rotation.z += 0.02;

    text.rotation.y += 0.02;

    step += 0.04;
    sphere.position.x = 20 + (10*(Math.cos(step)));
    sphere.position.y = 2 +(10*Math.abs(Math.sin(step)));

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
