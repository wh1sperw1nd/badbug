function PlayDragon() {}
PlayDragon.prototype.init = function () {

//THREEJS RELATED VARIABLES
    this.scene;
    this.camera;
    this.controls;
    this.fieldOfView;
    this.aspectRatio;
    this.nearPlane;
    this.farPlane;
    this.shadowLight;
    this.backLight;
    this.light;
    this.renderer;
    this.container;

//SCENE
    this.env;
    this.floor;
    this.dragon;
    this.pepperBottle;
    this.sneezingRate = 0;
    this.fireRate = 0;
    this.maxSneezingRate = 8;
    this.sneezeDelay = 500;
    this.awaitingSmokeParticles = [];
    this.timeSmoke = 0;
    this.timeFire = 0;
    this.globalSpeedRate = 1;
    this.sneezeTimeout;
    this.powerField;

//SCREEN VARIABLES

    this.HEIGHT;
    this.WIDTH;
    this.windowHalfX;
    this.windowHalfY;
    this.mousePos = {x: 0,y: 0};

//INIT THREE JS, SCREEN AND MOUSE EVENTS

    this.initScreenAnd3D();
    this.createLights();
    this.createFloor();
    this.createDragon();
    //this.loop();
}
PlayDragon.prototype.initScreenAnd3D = function(){

    this.powerField = document.getElementById('power');

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x652e37, 350, 500);

    this.HEIGHT = window.innerHeight;
    this.WIDTH = window.innerWidth;
    this.aspectRatio = this.WIDTH / this.HEIGHT;
    this.fieldOfView = 60;
    this.nearPlane = 1;
    this.farPlane = 2000;
    this.camera = new THREE.PerspectiveCamera(
        this.fieldOfView,
        this.aspectRatio,
        this.nearPlane,
        this.farPlane
    );
    this.camera.position.x = -300;
    this.camera.position.z = 300;
    this.camera.position.y = 100;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.renderer = new THREE.WebGLRenderer({alpha: true,antialias: true});
    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    this.renderer.shadowMapEnabled = true;
    this.container = document.getElementById('dragonWorld');
    this.container.appendChild(this.renderer.domElement);
    this.renderer.domElement.setAttribute("id","dragonWorldCanvas");
    var canvas = this.renderer.domElement;
    this.windowHalfX = this.WIDTH / 2;
    this.windowHalfY = this.HEIGHT / 2;

    window.addEventListener('resize', this.onWindowResize, false);
    canvas.addEventListener('mouseup', function(event){
        this.handleMouseUp(event);
    }.bind(this), false);
    canvas.addEventListener('touchend', function(event){
        this.handleTouchEnd(event);
    }.bind(this), false);
    //*
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minPolarAngle = -Math.PI / 2;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.noZoom = true;
    this.controls.noPan = true;
    //*/
}

PlayDragon.prototype.onWindowResize = function() {
    this.HEIGHT = this.window.innerHeight;
    this.WIDTH = this.window.innerWidth;
    this.windowHalfX = this.WIDTH / 2;
    this.windowHalfY = this.HEIGHT / 2;
    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    this.camera.aspect = this.WIDTH / this.HEIGHT;
    this.camera.updateProjectionMatrix();
}

PlayDragon.prototype.handleMouseUp = function(event) {
    var self = this;
    if (this.sneezeTimeout) clearTimeout(this.sneezeTimeout);
    this.sneezingRate += (this.maxSneezingRate - this.sneezingRate) / 10;
    this.powerField.innerHTML = parseInt(this.sneezingRate * 100 / this.maxSneezingRate);
    this.dragon.prepareToSneeze(this.sneezingRate);
    this.sneezeTimeout = setTimeout(function(){
        this.sneeze();
    }.bind(this),this.sneezeDelay * self.globalSpeedRate);
    this.dragon.isSneezing = true;
}

PlayDragon.prototype.sneeze = function() {
    this.dragon.sneeze(this.sneezingRate);
    this.sneezingRate = 0;
    this.powerField.innerHTML = "00";
}

PlayDragon.prototype.handleTouchEnd = function(event) {
    var self = this;
    if (this.sneezeTimeout) clearTimeout(this.sneezeTimeout);
    this.sneezingRate += (this.maxSneezingRate - this.sneezingRate) / 10;
    this.powerField.innerHTML = parseInt(this.sneezingRate * 100 / this.maxSneezingRate);
    this.dragon.prepareToSneeze(this.sneezingRate);
    this.sneezeTimeout = setTimeout(function(){
        this.sneeze();
    }.bind(this),this.sneezeDelay * this.globalSpeedRate);
    this.dragon.isSneezing = true;
}

PlayDragon.prototype.createLights = function() {
    this.light = new THREE.HemisphereLight(0xffffff, 0xb3858c, .8);

    this.shadowLight = new THREE.DirectionalLight(0xffffff, .8);
    this.shadowLight.position.set(-100, 100, 50);
    this.shadowLight.castShadow = true;
    this.shadowLight.shadowDarkness = .15;

    this.backLight = new THREE.DirectionalLight(0xffffff, .4);
    this.backLight.position.set(200, 100, 100);
    this.backLight.shadowDarkness = .1;
    this.backLight.castShadow = true;

    this.scene.add(this.backLight);
    this.scene.add(this.light);
    this.scene.add(this.shadowLight);
}

Dragon = function () {
    this.tailAmplitude = 3;
    this.tailAngle = 0;
    this.tailSpeed = .07;

    this.wingAmplitude = Math.PI / 8;
    this.wingAngle = 0;
    this.wingSpeed = 0.1
    this.isSneezing = false;

    this.threegroup = new THREE.Group(); // this is a sort of container that will hold all the meshes and will be added to the scene;

    // Materials
    var greenMat = new THREE.MeshLambertMaterial({
        color: 0x5da683,
        shading: THREE.FlatShading
    });
    var lightGreenMat = new THREE.MeshLambertMaterial({
        color: 0x95c088,
        shading: THREE.FlatShading
    });

    var yellowMat = new THREE.MeshLambertMaterial({
        color: 0xfdde8c,
        shading: THREE.FlatShading
    });

    var redMat = new THREE.MeshLambertMaterial({
        color: 0xcb3e4c,
        shading: THREE.FlatShading
    });

    var whiteMat = new THREE.MeshLambertMaterial({
        color: 0xfaf3d7,
        shading: THREE.FlatShading
    });

    var brownMat = new THREE.MeshLambertMaterial({
        color: 0x874a5c,
        shading: THREE.FlatShading
    });

    var blackMat = new THREE.MeshLambertMaterial({
        color: 0x403133,
        shading: THREE.FlatShading
    });
    var pinkMat = new THREE.MeshLambertMaterial({
        color: 0xd0838e,
        shading: THREE.FlatShading
    });

    // body
    this.body = new THREE.Group();
    this.belly = currentPage.makeCube(greenMat, 30, 30, 40, 0, 0, 0, 0, 0, Math.PI / 4);

    // Wings
    this.wingL = currentPage.makeCube(yellowMat, 5, 30, 20, 15, 15, 0, -Math.PI / 4, 0, -Math.PI / 4);
    this.wingL.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 15, 10));
    this.wingR = this.wingL.clone();
    this.wingR.position.x = -this.wingL.position.x;
    this.wingR.rotation.z = -this.wingL.rotation.z;

    // pike body
    var pikeBodyGeom = new THREE.CylinderGeometry(0, 10, 10, 4, 1);
    this.pikeBody1 = new THREE.Mesh(pikeBodyGeom, greenMat);
    this.pikeBody1.scale.set(.2, 1, 1);
    this.pikeBody1.position.z = 10;
    this.pikeBody1.position.y = 26;

    this.pikeBody2 = this.pikeBody1.clone();
    this.pikeBody2.position.z = 0
    this.pikeBody3 = this.pikeBody1.clone();
    this.pikeBody3.position.z = -10;

    // tail
    this.tail = new THREE.Group();
    this.tail.position.z = -20;
    this.tail.position.y = 10;

    var tailMat = new THREE.LineBasicMaterial({
        color: 0x5da683,
        linewidth: 5
    });

    var tailGeom = new THREE.Geometry();
    tailGeom.vertices.push(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 5, -10),
        new THREE.Vector3(0, -5, -20),
        new THREE.Vector3(0, 0, -30)
    );

    this.tailLine = new THREE.Line(tailGeom, tailMat);

    // pike
    var pikeGeom = new THREE.CylinderGeometry(0, 10, 10, 4, 1);
    pikeGeom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
    this.tailPike = new THREE.Mesh(pikeGeom, yellowMat);
    this.tailPike.scale.set(.2, 1, 1);
    this.tailPike.position.z = -35;
    this.tailPike.position.y = 0;

    this.tail.add(this.tailLine);
    this.tail.add(this.tailPike);

    this.body.add(this.belly);
    this.body.add(this.wingL);
    this.body.add(this.wingR);
    this.body.add(this.tail);
    this.body.add(this.pikeBody1);
    this.body.add(this.pikeBody2);
    this.body.add(this.pikeBody3);

    // head
    this.head = new THREE.Group();

    // head face
    this.face = currentPage.makeCube(greenMat, 60, 50, 80, 0, 25, 40, 0, 0, 0);


    // head horn
    var hornGeom = new THREE.CylinderGeometry(0, 6, 10, 4, 1);
    this.hornL = new THREE.Mesh(hornGeom, yellowMat);
    this.hornL.position.y = 55;
    this.hornL.position.z = 10;
    this.hornL.position.x = 10;

    this.hornR = this.hornL.clone();
    this.hornR.position.x = -10;

    // head ears
    this.earL = currentPage.makeCube(greenMat, 5, 10, 20, 32, 42, 2, 0, 0, 0);
    this.earL.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 5, -10));
    this.earL.geometry.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 4));
    this.earL.geometry.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI / 4));

    this.earR = currentPage.makeCube(greenMat, 5, 10, 20, -32, 42, 2, 0, 0, 0);
    this.earR.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 5, -10));
    this.earR.geometry.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 4));
    this.earR.geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 4));

    // head mouth
    this.mouth = new THREE.Group();
    this.mouth.position.z = 50;
    this.mouth.position.y = 3;
    this.mouth.rotation.x = 0//Math.PI / 8;

    // head mouth jaw
    this.jaw = currentPage.makeCube(greenMat, 30, 10, 30, 0, -5, 15, 0, 0, 0);
    this.mouth.add(this.jaw);

    // head mouth tongue
    this.tongue = currentPage.makeCube(redMat, 20, 10, 20, 0, -3, 15, 0, 0, 0);
    this.mouth.add(this.tongue);

    // head smile
    var smileGeom = new THREE.TorusGeometry(6, 2, 2, 10, Math.PI);
    this.smile = new THREE.Mesh(smileGeom, blackMat);
    this.smile.position.z = 82;
    this.smile.position.y = 5;
    this.smile.rotation.z = -Math.PI;


    // head cheek
    this.cheekL = currentPage.makeCube(lightGreenMat, 4, 20, 20, 30, 18, 55, 0, 0, 0);
    this.cheekR = this.cheekL.clone();
    this.cheekR.position.x = -this.cheekL.position.x;

    //head spots
    this.spot1 = currentPage.makeCube(lightGreenMat, 2, 2, 2, 20, 16, 80, 0, 0, 0);

    this.spot2 = this.spot1.clone();
    this.spot2.position.x = 15;
    this.spot2.position.y = 14;

    this.spot3 = this.spot1.clone();
    this.spot3.position.x = 16;
    this.spot3.position.y = 20;

    this.spot4 = this.spot1.clone();
    this.spot4.position.x = 12;
    this.spot4.position.y = 18;


    this.spot5 = this.spot1.clone();
    this.spot5.position.x = -15;
    this.spot5.position.y = 14;

    this.spot6 = this.spot1.clone();
    this.spot6.position.x = -14;
    this.spot6.position.y = 20;

    this.spot7 = this.spot1.clone();
    this.spot7.position.x = -19;
    this.spot7.position.y = 17;

    this.spot8 = this.spot1.clone();
    this.spot8.position.x = -11;
    this.spot8.position.y = 17;


    // head eye
    this.eyeL = currentPage.makeCube(whiteMat, 10, 22, 22, 27, 34, 18, 0, 0, 0);
    this.eyeR = this.eyeL.clone();
    this.eyeR.position.x = -27;

    // head iris
    this.irisL = currentPage.makeCube(brownMat, 10, 12, 12, 28, 30, 24, 0, 0, 0);
    this.irisR = this.irisL.clone();
    this.irisR.position.x = -this.irisL.position.x;

    // head nose
    this.noseL = currentPage.makeCube(blackMat, 5, 5, 8, 5, 40, 77, 0, 0, 0);
    this.noseR = this.noseL.clone();
    this.noseR.position.x = -this.noseL.position.x;

    this.head.position.z = 30;
    this.head.add(this.face);
    this.head.add(this.hornL);
    this.head.add(this.hornR);
    this.head.add(this.earL);
    this.head.add(this.earR);
    this.head.add(this.mouth);
    this.head.add(this.eyeL);
    this.head.add(this.eyeR);
    this.head.add(this.irisL);
    this.head.add(this.irisR);
    this.head.add(this.noseL);
    this.head.add(this.noseR);
    this.head.add(this.cheekL);
    this.head.add(this.cheekR);
    this.head.add(this.smile);
    /*
     this.head.add(this.spot1);
     this.head.add(this.spot2);
     this.head.add(this.spot3);
     this.head.add(this.spot4);
     this.head.add(this.spot5);
     this.head.add(this.spot6);
     this.head.add(this.spot7);
     this.head.add(this.spot8);
     */
    // legs
    this.legFL = currentPage.makeCube(greenMat, 20, 10, 20, 20, -30, 15, 0, 0, 0);
    this.legFR = this.legFL.clone();
    this.legFR.position.x = -30;
    this.legBL = this.legFL.clone();
    this.legBL.position.z = -15;
    this.legBR = this.legBL.clone();
    this.legBR.position.x = -30;

    this.threegroup.add(this.body);
    this.threegroup.add(this.head);
    this.threegroup.add(this.legFL);
    this.threegroup.add(this.legFR);
    this.threegroup.add(this.legBL);
    this.threegroup.add(this.legBR);
    //this.threegroup.add(this.pike);

    this.threegroup.traverse(function (object) {
        if (object instanceof THREE.Mesh) {
            object.castShadow = true;
            object.receiveShadow = true;
        }
    });
}

Dragon.prototype.update = function () {

    this.tailAngle += this.tailSpeed / currentPage.globalSpeedRate;
    this.wingAngle += this.wingSpeed / currentPage.globalSpeedRate;
    for (var i = 0; i < this.tailLine.geometry.vertices.length; i++) {
        var v = this.tailLine.geometry.vertices[i];
        v.y = Math.sin(this.tailAngle - (Math.PI / 3) * i) * this.tailAmplitude * i * i;
        v.x = Math.cos(this.tailAngle / 2 + (Math.PI / 10) * i) * this.tailAmplitude * i * i;
        if (i == this.tailLine.geometry.vertices.length - 1) {
            this.tailPike.position.x = v.x;
            this.tailPike.position.y = v.y;
            this.tailPike.rotation.x = (v.y / 30);
        }
    }
    this.tailLine.geometry.verticesNeedUpdate = true;

    this.wingL.rotation.z = -Math.PI / 4 + Math.cos(this.wingAngle) * this.wingAmplitude;
    this.wingR.rotation.z = Math.PI / 4 - Math.cos(this.wingAngle) * this.wingAmplitude;
}

Dragon.prototype.prepareToSneeze = function (s) {
    var _this = this;
    var speed = .7 * currentPage.globalSpeedRate;
    TweenLite.to(this.head.rotation, speed, {
        x: -s * .12,
        ease: Back.easeOut
    });
    TweenLite.to(this.head.position, speed, {
        z: 30 - s * 2.2,
        y: s * 2.2,
        ease: Back.easeOut
    });
    TweenLite.to(this.mouth.rotation, speed, {
        x: s * .18,
        ease: Back.easeOut
    });

    TweenLite.to(this.smile.position, speed / 2, {
        z: 75,
        y: 10,
        ease: Back.easeOut
    });
    TweenLite.to(this.smile.scale, speed / 2, {
        x: 0, y: 0,
        ease: Back.easeOut
    });

    TweenMax.to(this.noseL.scale, speed, {
        x: 1 + s * .1,
        y: 1 + s * .1,
        ease: Back.easeOut
    });
    TweenMax.to(this.noseR.scale, speed, {
        x: 1 + s * .1,
        y: 1 + s * .1,
        ease: Back.easeOut
    });
    TweenMax.to(this.eyeL.scale, speed, {
        y: 1 + s * .01,
        ease: Back.easeOut
    });
    TweenMax.to(this.eyeR.scale, speed, {
        y: 1 + s * .01,
        ease: Back.easeOut
    });
    TweenMax.to(this.irisL.scale, speed, {
        y: 1 + s * .05,
        z: 1 + s * .05,
        ease: Back.easeOut
    });
    TweenMax.to(this.irisR.scale, speed, {
        y: 1 + s * .05,
        z: 1 + s * .05,
        ease: Back.easeOut
    });
    TweenMax.to(this.irisL.position, speed, {
        y: 30 + s * .8,
        z: 24 - s * .4,
        ease: Back.easeOut
    });
    TweenMax.to(this.irisR.position, speed, {
        y: 30 + s * .8,
        z: 24 - s * .4,
        ease: Back.easeOut
    });
    TweenMax.to(this.earL.rotation, speed, {
        x: -s * .1,
        y: -s * .1,
        ease: Back.easeOut
    });
    TweenMax.to(this.earR.rotation, speed, {
        x: -s * .1,
        y: s * .1,
        ease: Back.easeOut
    });
    TweenMax.to(this.wingL.rotation, speed, {
        z: -Math.PI / 4 - s * .1,
        ease: Back.easeOut
    });
    TweenMax.to(this.wingR.rotation, speed, {
        z: Math.PI / 4 + s * .1,
        ease: Back.easeOut
    });
    TweenMax.to(this.body.rotation, speed, {
        x: -s * .05,
        ease: Back.easeOut
    });
    TweenMax.to(this.body.scale, speed, {
        y: 1 + s * .01,
        ease: Back.easeOut
    });
    TweenMax.to(this.body.position, speed, {
        z: -s * 2,
        ease: Back.easeOut
    });

    TweenMax.to(this.tail.rotation, speed, {
        x: s * 0.1,
        ease: Back.easeOut
    });

}

Dragon.prototype.sneeze = function (s) {
    var _this = this;
    var sneezeEffect = 1 - (s / currentPage.maxSneezingRate);
    var speed = .1 * currentPage.globalSpeedRate;
    currentPage.timeFire = Math.round(s * 10);

    TweenLite.to(this.head.rotation, speed, {
        x: s * .05,
        ease: Back.easeOut
    });
    TweenLite.to(this.head.position, speed, {
        z: 30 + s * 2.4,
        y: -s * .4,
        ease: Back.easeOut
    });

    TweenLite.to(this.mouth.rotation, speed, {
        x: 0,
        ease: Strong.easeOut
    });

    TweenLite.to(this.smile.position, speed * 2, {
        z: 82,
        y: 5,
        ease: Strong.easeIn
    });

    TweenLite.to(this.smile.scale, speed * 2, {
        x: 1,
        y: 1,
        ease: Strong.easeIn
    });


    TweenMax.to(this.noseL.scale, speed, {
        y: sneezeEffect,
        ease: Strong.easeOut
    });
    TweenMax.to(this.noseR.scale, speed, {
        y: sneezeEffect,
        ease: Strong.easeOut
    });
    TweenMax.to(this.noseL.position, speed, {
        y: 40, // - (sneezeEffect * 5),
        ease: Strong.easeOut
    });
    TweenMax.to(this.noseR.position, speed, {
        y: 40, // - (sneezeEffect * 5),
        ease: Strong.easeOut
    });
    TweenMax.to(this.irisL.scale, speed, {
        y: sneezeEffect / 2,
        z: 1,
        ease: Strong.easeOut
    });
    TweenMax.to(this.irisR.scale, speed, {
        y: sneezeEffect / 2,
        z: 1,
        ease: Strong.easeOut
    });
    TweenMax.to(this.eyeL.scale, speed, {
        y: sneezeEffect / 2,
        ease: Back.easeOut
    });
    TweenMax.to(this.eyeR.scale, speed, {
        y: sneezeEffect / 2,
        ease: Back.easeOut
    });

    TweenMax.to(this.wingL.rotation, speed, {
        z: -Math.PI / 4 + s * .15,
        ease: Back.easeOut
    });
    TweenMax.to(this.wingR.rotation, speed, {
        z: Math.PI / 4 - s * .15,
        ease: Back.easeOut
    });

    TweenMax.to(this.body.rotation, speed, {
        x: s * 0.02,
        ease: Back.easeOut
    });
    TweenMax.to(this.body.scale, speed, {
        y: 1 - s * .03,
        ease: Back.easeOut
    });
    TweenMax.to(this.body.position, speed, {
        z: s * 2,
        ease: Back.easeOut
    });

    TweenMax.to(this.irisL.position, speed * 7, {
        y: 35,
        ease: Back.easeOut
    });
    TweenMax.to(this.irisR.position, speed * 7, {
        y: 35,
        ease: Back.easeOut
    });
    TweenMax.to(this.earR.rotation, speed * 3, {
        x: s * .20,
        y: s * .20,
        ease: Back.easeOut
    });
    TweenMax.to(this.earL.rotation, speed * 3, {
        x: s * .20,
        y: -s * .20,
        ease: Back.easeOut,
        onComplete: function () {
            _this.backToNormal(s);
            currentPage.fireRate = s;
//            console.log(currentPage.fireRate);
        }
    });

    TweenMax.to(this.tail.rotation, speed * 3, {
        x: -s * 0.1,
        ease: Back.easeOut
    });

}

Dragon.prototype.backToNormal = function (s) {
    var _this = this;
    var speed = 1 * currentPage.globalSpeedRate;
    TweenLite.to(this.head.rotation, speed, {
        x: 0,
        ease: Strong.easeInOut
    });
    TweenLite.to(this.head.position, speed, {
        z: 30,
        y: 0,
        ease: Back.easeOut
    });
    TweenMax.to(this.noseL.scale, speed, {
        x: 1,
        y: 1,
        ease: Strong.easeInOut
    });
    TweenMax.to(this.noseR.scale, speed, {
        x: 1,
        y: 1,
        ease: Strong.easeInOut
    });
    TweenMax.to(this.noseL.position, speed, {
        y: 40,
        ease: Strong.easeInOut
    });
    TweenMax.to(this.noseR.position, speed, {
        y: 40,
        ease: Strong.easeInOut
    });
    TweenMax.to(this.irisL.scale, speed, {
        y: 1,
        z: 1,
        ease: Back.easeOut
    });
    TweenMax.to(this.irisR.scale, speed, {
        y: 1,
        z: 1,
        ease: Back.easeOut
    });
    TweenMax.to(this.irisL.position, speed * .7, {
        y: 30,
        ease: Back.easeOut
    });
    TweenMax.to(this.irisR.position, speed * .7, {
        y: 30,
        ease: Back.easeOut
    });
    TweenMax.to(this.eyeL.scale, speed, {
        y: 1,
        ease: Strong.easeOut
    });
    TweenMax.to(this.eyeR.scale, speed, {
        y: 1,
        ease: Strong.easeOut
    });
    TweenMax.to(this.body.rotation, speed, {
        x: 0,
        ease: Back.easeOut
    });
    TweenMax.to(this.body.scale, speed, {
        y: 1,
        ease: Back.easeOut
    });
    TweenMax.to(this.body.position, speed, {
        z: 0,
        ease: Back.easeOut
    });

    TweenMax.to(this.wingL.rotation, speed * 1.3, {
        z: -Math.PI / 4,
        ease: Back.easeInOut
    });
    TweenMax.to(this.wingR.rotation, speed * 1.3, {
        z: Math.PI / 4,
        ease: Back.easeInOut
    });

    TweenMax.to(this.earL.rotation, speed * 1.3, {
        x: 0,
        y: 0,
        ease: Back.easeInOut
    });
    TweenMax.to(this.earR.rotation, speed * 1.3, {
        x: 0,
        y: 0,
        ease: Back.easeInOut,
        onComplete: function () {
            _this.isSneezing = false;
            currentPage.timeSmoke = Math.round(s * 5);
        }
    });

    TweenMax.to(this.tail.rotation, speed * 1.3, {
        x: 0,
        ease: Back.easeOut
    });

}

PlayDragon.prototype.makeCube = function(mat, w, h, d, posX, posY, posZ, rotX, rotY, rotZ) {
    var geom = new THREE.BoxGeometry(w, h, d);
    var mesh = new THREE.Mesh(geom, mat);
    mesh.position.x = posX;
    mesh.position.y = posY;
    mesh.position.z = posZ;
    mesh.rotation.x = rotX;
    mesh.rotation.y = rotY;
    mesh.rotation.z = rotZ;
    return mesh;
}

PlayDragon.prototype.createFloor = function() {
    this.env = new THREE.Group();

    this.floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000, 2000), new THREE.MeshBasicMaterial({
        color: 0X652e37
    }));
    this.floor.rotation.x = -Math.PI / 2;
    this.floor.position.y = -36;
    this.floor.receiveShadow = true;

    this.env.add(this.floor);
    this.scene.add(this.env);
}

PlayDragon.prototype.createDragon = function() {
    this.dragon = new Dragon();
    this.scene.add(this.dragon.threegroup);
}

function SmokeParticle() {
    this.color = {
        r: 0,
        g: 0,
        b: 0
    };
    var particleMat = new THREE.MeshLambertMaterial({
        transparent: true,
        opacity: .5,
        shading: THREE.FlatShading
    });
    this.mesh = currentPage.makeCube(particleMat, 4, 4, 4, 0, 0, 0, 0, 0, 0);
    currentPage.awaitingSmokeParticles.push(this);
}

SmokeParticle.prototype.initialize = function () {
    this.mesh.rotation.x = 0;
    this.mesh.rotation.y = 0;
    this.mesh.rotation.z = 0;

    this.mesh.position.x = 0;
    this.mesh.position.y = 0;
    this.mesh.position.z = 0;

    this.mesh.scale.x = 1;
    this.mesh.scale.y = 1;
    this.mesh.scale.z = 1;

    this.mesh.material.opacity = .5;
    currentPage.awaitingSmokeParticles.push(this);

}

SmokeParticle.prototype.updateColor = function () {
    this.mesh.material.color.setRGB(this.color.r, this.color.g, this.color.b);
}

SmokeParticle.prototype.fly = function () {
    var _this = this;
    var speed = 10 * currentPage.globalSpeedRate;
    var ease = Strong.easeOut;
    var initX = this.mesh.position.x;
    var initY = this.mesh.position.y;
    var initZ = this.mesh.position.z;
    var bezier = {
        type: "cubic",
        values: [{
            x: initX,
            y: initY,
            z: initZ
        }, {
            x: initX + 30 - Math.random() * 10,
            y: initY + 20 + Math.random() * 2,
            z: initZ + 20
        }, {
            x: initX + 10 + Math.random() * 20,
            y: initY + 40 + Math.random() * 5,
            z: initZ - 30
        }, {
            x: initX + 50 - Math.random() * 20,
            y: initY + 70 + Math.random() * 10,
            z: initZ + 20
        }]
    };
    TweenMax.to(this.mesh.position, speed, {
        bezier: bezier,
        ease: ease
    });
    TweenMax.to(this.mesh.rotation, speed, {
        x: Math.random() * Math.PI * 3,
        y: Math.random() * Math.PI * 3,
        ease: ease
    });
    TweenMax.to(this.mesh.scale, speed, {
        x: 5 + Math.random() * 5,
        y: 5 + Math.random() * 5,
        z: 5 + Math.random() * 5,
        ease: ease
    });
    //*
    TweenMax.to(this.mesh.material, speed, {
        opacity: 0,
        ease: ease,
        onComplete: function () {
            _this.initialize();
        }
    });
    //*/
}

SmokeParticle.prototype.fire = function (f) {
    var _this = this;
    var speed = 1 * currentPage.globalSpeedRate;
    var ease = Strong.easeOut;
    var initX = this.mesh.position.x;
    var initY = this.mesh.position.y;
    var initZ = this.mesh.position.z;

    TweenMax.to(this.mesh.position, speed, {
        x: 0,
        y: initY - 2 * f,
        z: Math.max(initZ + 15 * f, initZ + 40),
        ease: ease
    });
    TweenMax.to(this.mesh.rotation, speed, {
        x: Math.random() * Math.PI * 3,
        y: Math.random() * Math.PI * 3,
        ease: ease
    });

    var bezierScale = [{
        x: 1,
        y: 1,
        z: 1
    }, {
        x: f / currentPage.maxSneezingRate + Math.random() * .3,
        y: f / currentPage.maxSneezingRate + Math.random() * .3,
        z: f * 2 / currentPage.maxSneezingRate + Math.random() * .3
    }, {
        x: f / currentPage.maxSneezingRate + Math.random() * .5,
        y: f / currentPage.maxSneezingRate + Math.random() * .5,
        z: f * 2 / currentPage.maxSneezingRate + Math.random() * .5
    }, {
        x: f * 2 / currentPage.maxSneezingRate + Math.random() * .5,
        y: f * 2 / currentPage.maxSneezingRate + Math.random() * .5,
        z: f * 4 / currentPage.maxSneezingRate + Math.random() * .5
    }, {
        x: f * 2 + Math.random() * 5,
        y: f * 2 + Math.random() * 5,
        z: f * 2 + Math.random() * 5
    }];

    TweenMax.to(this.mesh.scale, speed * 2, {
        bezier: bezierScale,
        ease: ease,
        onComplete: function () {
            _this.initialize();
        }
    });

    TweenMax.to(this.mesh.material, speed, {
        opacity: 0,
        ease: ease
    });
    //*

    var bezierColor = [{
        r: 255 / 255,
        g: 205 / 255,
        b: 74 / 255
    }, {
        r: 255 / 255,
        g: 205 / 255,
        b: 74 / 255
    }, {
        r: 255 / 255,
        g: 205 / 255,
        b: 74 / 255
    }, {
        r: 247 / 255,
        g: 34 / 255,
        b: 50 / 255
    }, {
        r: 0 / 255,
        g: 0 / 255,
        b: 0 / 255
    }];


    TweenMax.to(this.color, speed, {
        bezier: bezierColor,
        ease: Strong.easeOut,
        onUpdate: function () {
            _this.updateColor();
        }
    });
    //*/
}

PlayDragon.prototype.getSmokeParticle = function() {
    var p;
    if (!this.awaitingSmokeParticles.length) {
        p = new SmokeParticle();
    }
    p = this.awaitingSmokeParticles.pop();
    return p;
}

PlayDragon.prototype.loop = function() {
    this.render();
    if (!this.dragon.isSneezing) {
        this.dragon.update();
    }

    if (this.timeSmoke > 0) {
        //if (timeSmoke%2==0){
        var noseTarget = (Math.random() > .5) ? this.dragon.noseL : this.dragon.noseR;
        var p = this.getSmokeParticle();
        var pos = noseTarget.localToWorld(new THREE.Vector3(0, 0, 2));

        p.mesh.position.x = pos.x;
        p.mesh.position.y = pos.y;
        p.mesh.position.z = pos.z;
        p.mesh.material.color.setHex(0x555555);
        p.mesh.material.opacity = .2;

        this.scene.add(p.mesh);
        p.fly();
        //}
        this.timeSmoke--;
    }

    if (this.timeFire > 0) {
        var noseTarget = (Math.random() > .5) ? this.dragon.noseL : this.dragon.noseR;
        var colTarget = (Math.random() > .5) ? 0xfdde8c : 0xcb3e4c;
        var f = this.getSmokeParticle();
        var posF = noseTarget.localToWorld(new THREE.Vector3(0, 0, 2));

        f.mesh.position.x = posF.x;
        f.mesh.position.y = posF.y;
        f.mesh.position.z = posF.z;
        f.color = {
            r: 255 / 255,
            g: 205 / 255,
            b: 74 / 255
        };
        f.mesh.material.color.setRGB(f.color.r, f.color.g, f.color.b);
        f.mesh.material.opacity = 1;

        this.scene.add(f.mesh);
        f.fire(this.fireRate);
        this.timeFire--;
    }

//    requestAnimationFrame(function(){
//        this.loop();
//    }.bind(this));

//    var requestAnimDragon = requestAnimationFrame(function(){
//        if(currentPage){
//            currentPage.loop();
//            console.log("dragon");
//        }
//    });
    requestAnimation();
}

PlayDragon.prototype.render = function() {
    if (this.controls) this.controls.update();
    this.renderer.render(this.scene, this.camera);
}



//dragon.threegroup.rotation.y = Math.PI/4;

PlayDragon.prototype.clamp = function(v, min, max) {
    return Math.min(Math.max(v, min), max);
}

PlayDragon.prototype.rule3 = function(v, vmin, vmax, tmin, tmax) {
    var nv = Math.max(Math.min(v, vmax), vmin);
    var dv = vmax - vmin;
    var pc = (nv - vmin) / dv;
    var dt = tmax - tmin;
    var tv = tmin + (pc * dt);
    return tv;

}

//var currentPage = new PlayDragon();