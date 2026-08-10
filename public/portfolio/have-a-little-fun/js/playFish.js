function PlayFish() {}
PlayFish.prototype.init = function () {
//THREEJS RELATED VARIABLES

    this.scene;
    this.camera;
    this.fieldOfView;
    this.aspectRatio;
    this.nearPlane;
    this.farPlane;
    this.shadowLight;
    this.light;
    this.renderer;
    this.container;

//SCREEN VARIABLES 
    this.HEIGHT;
    this.WIDTH;
    this.windowHalfX;
    this.windowHalfY;
    this.xLimit;
    this.yLimit;

// FISH BODY PARTS
    this.fish;
    this.bodyFish;
    this.tailFish;
    this.topFish;
    this.rightIris;
    this.leftIris;
    this.rightEye;
    this.leftEye;
    this.lipsFish;
    this.tooth1;
    this.tooth2;
    this.tooth3;
    this.tooth4;
    this.tooth5;

// FISH SPEED
// the colors are splitted into rgb values to facilitate the transition of the color
    this.fishFastColor = {r: 255, g: 0, b: 224}; // pastel blue
    this.fishSlowColor = {r: 0, g: 207, b: 255}; // purple
    this.angleFin = 0; // angle used to move the fishtail

// PARTICLES COLORS
// array used to store a color scheme to randomly tint the particles 
    this.colors = ['#dff69e',
        '#00ceff',
        '#002bca',
        '#ff00e0',
        '#3f159f',
        '#71b583',
        '#00a2ff'];

// PARTICLES
// as the particles are recycled, I use 2 arrays to store them
// flyingParticles used to update the flying particles and waitingParticles used to store the "unused" particles until we need them;
    this.flyingParticles = [];
    this.waitingParticles = [];
// maximum z position for a particle
    this.maxParticlesZ = 600;

// SPEED
    this.speed = {x: 0, y: 0};
    this.smoothing = 10;

// MISC
    this.mousePos = {x: 0, y: 0};
    this.halfPI = Math.PI / 2;


    this.initScreenAnd3D();

    this.createLight();
    this.createFish();
    this.createParticle();
    //this.loop();
    setInterval(function(){
        this.flyParticle();
    }.bind(this), 70); // launch a new particle every 70ms

}
PlayFish.prototype.initScreenAnd3D = function() {
    // To work with THREEJS, you need a scene, a camera, and a renderer

    // create the scene;
    this.scene = new THREE.Scene();

    // create the camera
    this.HEIGHT = window.innerHeight;
    this.WIDTH = window.innerWidth;
    this.aspectRatio = this.WIDTH / this.HEIGHT;
    this.fieldOfView = 60;
    this.nearPlane = 1; // the camera won't "see" any object placed in front of this plane
    this.farPlane = 2000; // the camera wont't see any object placed further than this plane
    this.camera = new THREE.PerspectiveCamera(
        this.fieldOfView,
        this.aspectRatio,
        this.nearPlane,
        this.farPlane
    );
    this.camera.position.z = 1000;


    //create the renderer
    this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    this.container = document.getElementById('fishWorld');
    this.container.appendChild(this.renderer.domElement);
    this.renderer.domElement.setAttribute("id","fishWorldCanvas");
    var canvas = this.renderer.domElement;
    /*
     As I will recycle the particles, I need to know the left and right limits they can fly without disappearing from the camera field of view.
     As soon as a particle is out of the camera view, I can recycle it : remove it from the flyingParticles array and push it back in the waitingParticles array.
     I guess I can do that by raycasting each particle each frame, but I think this will be too heavy. Instead I prefer to precalculate the x coordinate from which a particle is not visible anymore. But this depends on the z position of the particle.
     Here I decided to use the furthest possible z position for a particle, to be sure that all the particles won't be recycled before they are out of the camera view. But this could be much more precise, by precalculating the x limit for each particle depending on its z position and store it in the particle when it is "fired". But today, I'll keep it simple :)
     !!!!!! I'm really not sure this is the best way to do it. If you find a better solution, please tell me
     */

    // convert the field of view to radians
    var ang = (this.fieldOfView / 2) * Math.PI / 180;
    // calculate the max y position seen by the camera related to the maxParticlesZ position, I start by calculating the y limit because fielOfView is a vertical field of view. I then calculate the x Limit
    this.yLimit = (this.camera.position.z + this.maxParticlesZ) * Math.tan(ang); // this is a formula I found, don't ask me why it works, it just does :)
    // Calculate the max x position seen by the camera related to the y Limit position
    this.xLimit = this.yLimit * this.camera.aspect;

    // precalculate the center of the screen, used to update the speed depending on the mouse position
    this.windowHalfX = this.WIDTH / 2;
    this.windowHalfY = this.HEIGHT / 2;


    // handling resize and mouse move events
    window.addEventListener('resize', this.onWindowResize, false);
    canvas.addEventListener('mousemove', function(event){
        this.handleMouseMove(event)
    }.bind(this), false);
    // let's make it work on mobile too
    canvas.addEventListener('touchstart', function(event){
        this.handleTouchStart(event)
    }.bind(this), false);
    canvas.addEventListener('touchend', function(event){
        this.handleTouchEnd(event)
    }.bind(this), false);
    canvas.addEventListener('touchmove', function(event){
        this.handleTouchMove(event)
    }.bind(this), false);
}

PlayFish.prototype.onWindowResize = function() {
    this.HEIGHT = window.innerHeight;
    this.WIDTH = window.innerWidth;
    this.windowHalfX = this.WIDTH / 2;
    this.windowHalfY = this.HEIGHT / 2;
    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    this.camera.aspect = this.WIDTH / this.HEIGHT;
    this.camera.updateProjectionMatrix(); // force the camera to update its aspect ratio
    // recalculate the limits
    var ang = (this.fieldOfView / 2) * Math.PI / 180;
    this.yLimit = (this.camera.position.z + this.maxParticlesZ) * Math.tan(ang);
    this.xLimit = this.yLimit * this.camera.aspect;
}

PlayFish.prototype.handleMouseMove = function(event) {
    this.mousePos = {x: event.clientX, y: event.clientY};
    this.updateSpeed();
}

PlayFish.prototype.handleTouchStart = function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
        this.mousePos = {x: event.touches[0].pageX, y: event.touches[0].pageY};
        this.updateSpeed();
    }
}

PlayFish.prototype.handleTouchEnd = function(event) {
    this.mousePos = {x: this.windowHalfX, y: this.windowHalfY};
    this.updateSpeed();
}

PlayFish.prototype.handleTouchMove = function(event) {
    if (event.touches.length == 1) {
        event.preventDefault();
        this.mousePos = {x: event.touches[0].pageX, y: event.touches[0].pageY};
        this.updateSpeed();
    }
}

PlayFish.prototype.updateSpeed = function() {
    this.speed.x = (this.mousePos.x / this.WIDTH) * 100;
    this.speed.y = (this.mousePos.y - this.windowHalfY) / 10;
}

PlayFish.prototype.loop = function() {

    // Update fish position, rotation, scale... depending on the mouse position
    // To make a smooth update of each value I use this formula :
    // currentValue += (targetValue - currentValue) / smoothing

    // make the fish swing according to the mouse direction
    this.fish.rotation.z += ((-this.speed.y / 50) - this.fish.rotation.z) / this.smoothing;
    this.fish.rotation.x += ((-this.speed.y / 50) - this.fish.rotation.x) / this.smoothing;
    this.fish.rotation.y += ((-this.speed.y / 50) - this.fish.rotation.y) / this.smoothing;

    // make the fish move according to the mouse direction
    this.fish.position.x += (((this.mousePos.x - this.windowHalfX)) - this.fish.position.x) / this.smoothing;
    this.fish.position.y += ((-this.speed.y * 10) - this.fish.position.y) / this.smoothing;

    // make the eyes follow the mouse direction
    this.rightEye.rotation.z = this.leftEye.rotation.z = -this.speed.y / 150;
    this.rightIris.position.x = this.leftIris.position.y = -10 - this.speed.y / 2;

    // make it look angry when the speed increases by narrowing the eyes
    this.rightEye.scale.set(1, 1 - (this.speed.x / 150), 1);
    this.leftEye.scale.set(1, 1 - (this.speed.x / 150), 1);

    // in order to optimize, I precalculate a smaller speed values depending on speed.x
    // these variables will be used to update the wagging of the tail, the color of the fish and the scale of the fish
    var s2 = this.speed.x / 100; // used for the wagging speed and color
    var s3 = this.speed.x / 300; // used for the scale

    // I use an angle that I increment, and then use its cosine and sine to make the tail wag in a cyclic movement. The speed of the wagging depends on the global speed
    this.angleFin += s2;
    // for a better optimization, precalculate sine and cosines
    var backTailCycle = Math.cos(this.angleFin);
    var sideFinsCycle = Math.sin(this.angleFin / 5);

    this.tailFish.rotation.y = backTailCycle * .5;
    this.topFish.rotation.x = sideFinsCycle * .5;
    this.sideRightFish.rotation.x = this.halfPI + sideFinsCycle * .2;
    this.sideLeftFish.rotation.x = this.halfPI + sideFinsCycle * .2;

    // color update depending on the speed
    var rvalue = (this.fishSlowColor.r + (this.fishFastColor.r - this.fishSlowColor.r) * s2) / 255;
    var gvalue = (this.fishSlowColor.g + (this.fishFastColor.g - this.fishSlowColor.g) * s2) / 255;
    var bvalue = (this.fishSlowColor.b + (this.fishFastColor.b - this.fishSlowColor.b) * s2) / 255;
    this.bodyFish.material.color.setRGB(rvalue, gvalue, bvalue);
    this.lipsFish.material.color.setRGB(rvalue, gvalue, bvalue);

    //scale update depending on the speed => make the fish struggling to progress
    this.fish.scale.set(1 + s3, 1 - s3, 1 - s3);

    // particles update
    for (var i = 0; i < this.flyingParticles.length; i++) {
        var particle = this.flyingParticles[i];
        particle.rotation.y += (1 / particle.scale.x) * .05;
        particle.rotation.x += (1 / particle.scale.x) * .05;
        particle.rotation.z += (1 / particle.scale.x) * .05;
        particle.position.x += -10 - (1 / particle.scale.x) * this.speed.x * .2;
        particle.position.y += (1 / particle.scale.x) * this.speed.y * .2;
        if (particle.position.x < -this.xLimit - 80) { // check if the particle is out of the field of view
            this.scene.remove(particle);
            this.waitingParticles.push(this.flyingParticles.splice(i, 1)[0]); // recycle the particle
            i--;
        }
    }
    this.renderer.render(this.scene, this.camera);
//    requestAnimationFrame(function(){
//        this.loop();
//    }.bind(this));

//    var requestAnimFish = requestAnimationFrame(function(){
//        if(currentPage){
//            currentPage.loop();
//            console.log("fish");
//        }
//    });
    requestAnimation();
}


// Lights
// I use 2 lights, an hemisphere to give a global ambient light
// And a harder light to add some shadows
PlayFish.prototype.createLight = function() {
    this.light = new THREE.HemisphereLight(0xffffff, 0xffffff, .3)
    this.scene.add(this.light);
    this.shadowLight = new THREE.DirectionalLight(0xffffff, .8);
    this.shadowLight.position.set(1, 1, 1);
    this.scene.add(this.shadowLight);
}

PlayFish.prototype.createFish = function() {
    // A group that will contain each part of the fish
    this.fish = new THREE.Group();
    // each part needs a geometry, a material, and a mesh

    // Body
    var bodyGeom = new THREE.BoxGeometry(120, 120, 120);
    var bodyMat = new THREE.MeshLambertMaterial({
        color: 0x80f5fe,
        shading: THREE.FlatShading
    });
    this.bodyFish = new THREE.Mesh(bodyGeom, bodyMat);

    // Tail
    var tailGeom = new THREE.CylinderGeometry(0, 60, 60, 4, false);
    var tailMat = new THREE.MeshLambertMaterial({
        color: 0xff00dc,
        shading: THREE.FlatShading
    });

    this.tailFish = new THREE.Mesh(tailGeom, tailMat);
    this.tailFish.scale.set(.8, 1, .1);
    this.tailFish.position.x = -60;
    this.tailFish.rotation.z = -this.halfPI;

    // Lips
    var lipsGeom = new THREE.BoxGeometry(25, 10, 120);
    var lipsMat = new THREE.MeshLambertMaterial({
        color: 0x80f5fe,
        shading: THREE.FlatShading
    });
    this.lipsFish = new THREE.Mesh(lipsGeom, lipsMat);
    this.lipsFish.position.x = 65;
    this.lipsFish.position.y = -47;
    this.lipsFish.rotation.z = this.halfPI;

    // Fins
    this.topFish = new THREE.Mesh(tailGeom, tailMat);
    this.topFish.scale.set(.8, 1, .1);
    this.topFish.position.x = -20;
    this.topFish.position.y = 60;
    this.topFish.rotation.z = -this.halfPI;

    this.sideRightFish = new THREE.Mesh(tailGeom, tailMat);
    this.sideRightFish.scale.set(.8, 1, .1);
    this.sideRightFish.rotation.x = this.halfPI;
    this.sideRightFish.rotation.z = -this.halfPI;
    this.sideRightFish.position.x = 0;
    this.sideRightFish.position.y = -50;
    this.sideRightFish.position.z = -60;

    this.sideLeftFish = new THREE.Mesh(tailGeom, tailMat);
    this.sideLeftFish.scale.set(.8, 1, .1);
    this.sideLeftFish.rotation.x = this.halfPI;
    this.sideLeftFish.rotation.z = -this.halfPI;
    this.sideLeftFish.position.x = 0;
    this.sideLeftFish.position.y = -50;
    this.sideLeftFish.position.z = 60;

    // Eyes
    var eyeGeom = new THREE.BoxGeometry(40, 40, 5);
    var eyeMat = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        shading: THREE.FlatShading
    });

    this.rightEye = new THREE.Mesh(eyeGeom, eyeMat);
    this.rightEye.position.z = -60;
    this.rightEye.position.x = 25;
    this.rightEye.position.y = -10;

    var irisGeom = new THREE.BoxGeometry(10, 10, 3);
    var irisMat = new THREE.MeshLambertMaterial({
        color: 0x330000,
        shading: THREE.FlatShading
    });

    this.rightIris = new THREE.Mesh(irisGeom, irisMat);
    this.rightIris.position.z = -65;
    this.rightIris.position.x = 35;
    this.rightIris.position.y = -10;

    this.leftEye = new THREE.Mesh(eyeGeom, eyeMat);
    this.leftEye.position.z = 60;
    this.leftEye.position.x = 25;
    this.leftEye.position.y = -10;

    this.leftIris = new THREE.Mesh(irisGeom, irisMat);
    this.leftIris.position.z = 65;
    this.leftIris.position.x = 35;
    this.leftIris.position.y = -10;

    var toothGeom = new THREE.BoxGeometry(20, 4, 20);
    var toothMat = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        shading: THREE.FlatShading
    });

    // Teeth
    this.tooth1 = new THREE.Mesh(toothGeom, toothMat);
    this.tooth1.position.x = 65;
    this.tooth1.position.y = -35;
    this.tooth1.position.z = -50;
    this.tooth1.rotation.z = this.halfPI;
    this.tooth1.rotation.x = -this.halfPI;

    this.tooth2 = new THREE.Mesh(toothGeom, toothMat);
    this.tooth2.position.x = 65;
    this.tooth2.position.y = -30;
    this.tooth2.position.z = -25;
    this.tooth2.rotation.z = this.halfPI;
    this.tooth2.rotation.x = -Math.PI / 12;

    this.tooth3 = new THREE.Mesh(toothGeom, toothMat);
    this.tooth3.position.x = 65;
    this.tooth3.position.y = -25;
    this.tooth3.position.z = 0;
    this.tooth3.rotation.z = this.halfPI;

    this.tooth4 = new THREE.Mesh(toothGeom, toothMat);
    this.tooth4.position.x = 65;
    this.tooth4.position.y = -30;
    this.tooth4.position.z = 25;
    this.tooth4.rotation.z = this.halfPI;
    this.tooth4.rotation.x = Math.PI / 12;

    this.tooth5 = new THREE.Mesh(toothGeom, toothMat);
    this.tooth5.position.x = 65;
    this.tooth5.position.y = -35;
    this.tooth5.position.z = 50;
    this.tooth5.rotation.z = this.halfPI;
    this.tooth5.rotation.x = Math.PI / 8;


    this.fish.add(this.bodyFish);
    this.fish.add(this.tailFish);
    this.fish.add(this.topFish);
    this.fish.add(this.sideRightFish);
    this.fish.add(this.sideLeftFish);
    this.fish.add(this.rightEye);
    this.fish.add(this.rightIris);
    this.fish.add(this.leftEye);
    this.fish.add(this.leftIris);
    this.fish.add(this.tooth1);
    this.fish.add(this.tooth2);
    this.fish.add(this.tooth3);
    this.fish.add(this.tooth4);
    this.fish.add(this.tooth5);
    this.fish.add(this.lipsFish);

    this.fish.rotation.y = -Math.PI / 4;
    this.scene.add(this.fish);
}


// PARTICLES
PlayFish.prototype.createParticle = function() {
    var particle, geometryCore, ray, w, h, d, sh, sv;

    // 3 different shapes are used, chosen randomly
    var rnd = Math.random();

    // BOX
    if (rnd < .33) {
        w = 10 + Math.random() * 30;
        h = 10 + Math.random() * 30;
        d = 10 + Math.random() * 30;
        geometryCore = new THREE.BoxGeometry(w, h, d);
    }
    // TETRAHEDRON
    else if (rnd < .66) {
        ray = 10 + Math.random() * 20;
        geometryCore = new THREE.TetrahedronGeometry(ray);
    }
    // SPHERE... but as I also randomly choose the number of horizontal and vertical segments, it sometimes lead to wierd shapes
    else {
        ray = 5 + Math.random() * 30;
        sh = 2 + Math.floor(Math.random() * 2);
        sv = 2 + Math.floor(Math.random() * 2);
        geometryCore = new THREE.SphereGeometry(ray, sh, sv);
    }

    // Choose a color for each particle and create the mesh
    var materialCore = new THREE.MeshLambertMaterial({
        color: this.getRandomColor(),
        shading: THREE.FlatShading
    });
    particle = new THREE.Mesh(geometryCore, materialCore);
    return particle;
}

// depending if there is particles stored in the waintingParticles array, get one from there or create a new one
PlayFish.prototype.getParticle = function() {
    if (this.waitingParticles.length) {
        return this.waitingParticles.pop();
    } else {
        return this.createParticle();
    }
}

PlayFish.prototype.flyParticle = function() {
    var particle = this.getParticle();
    // set the particle position randomly but keep it out of the field of view, and give it a random scale
    particle.position.x = this.xLimit;
    particle.position.y = -this.yLimit + Math.random() * this.yLimit * 2;
    particle.position.z = Math.random() * this.maxParticlesZ;
    var s = .1 + Math.random();
    particle.scale.set(s, s, s);
    this.flyingParticles.push(particle);
    this.scene.add(particle);
}


PlayFish.prototype.getRandomColor = function() {
    var col = this.hexToRgb(this.colors[Math.floor(Math.random() * this.colors.length)]);
    var threecol = new THREE.Color("rgb(" + col.r + "," + col.g + "," + col.b + ")");
    return threecol;
}

PlayFish.prototype.hexToRgb = function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


//var currentPage = new PlayFish();